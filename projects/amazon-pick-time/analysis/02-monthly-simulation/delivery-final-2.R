# generate pick times


library(dplyr)

set.seed(313)

# -------------------------------------------------
# helper: convert bag position into normalized progress
# early in bag = high value, late in bag = low value
# -------------------------------------------------
delivery_final <- delivery_structure %>%
  mutate(
    bag_progress = (remaining_in_bag - 1) / pmax(bag_packages - 1, 1)
  )

# -------------------------------------------------
# generate base pick times from real-data calibrated gamma
# shape and rate came from your real observations
# -------------------------------------------------
delivery_final <- delivery_final %>%
  mutate(
    base_time = rgamma(n(), shape = shape, rate = rate),
    
    # bag difficulty effect
    difficulty_bump = case_when(
      bag_difficulty == "easy" ~ -0.6,
      bag_difficulty == "medium" ~ 0.0,
      bag_difficulty == "hard" ~ 1.3
    ),
    
    # package type effect
    package_type_bump = case_when(
      package_type == "Envelope" ~ -0.2,
      package_type == "Box" ~ 0.5,
      TRUE ~ 0
    ),
    
    # bag-stage effect
    bag_stage_bump = case_when(
      bag_stage == "early" ~ 0.8,
      bag_stage == "middle" ~ 0.2,
      bag_stage == "late" ~ -0.3
    ),
    
    # remaining-in-bag effect
    # more remaining packages early in bag = slower
    remaining_bump = 2.8 * bag_progress,
    
    # month-phase noise
    phase_noise_sd = case_when(
      month_phase == "volatile_start" ~ 1.3,
      month_phase == "transition" ~ 0.9,
      month_phase == "stable_finish" ~ 0.6
    ),
    
    phase_noise = rnorm(n(), mean = 0, sd = phase_noise_sd),
    
    # lucky quick finds
    lucky_flag = rbinom(
      n(), 1,
      prob = case_when(
        organization_quality == "high" ~ 0.10,
        organization_quality == "medium" ~ 0.07,
        organization_quality == "low" ~ 0.04
      )
    ),
    
    lucky_time = runif(n(), min = 0.8, max = 2.0),
    
    # disruption events
    disruption_flag = rbinom(
      n(), 1,
      prob = case_when(
        bag_exception == "late_disruption" ~ 0.10,
        bag_difficulty == "hard" & month_phase == "volatile_start" ~ 0.06,
        bag_difficulty == "hard" ~ 0.035,
        TRUE ~ 0.01
      )
    ),
    
    disruption_bump = case_when(
      disruption_flag == 1 ~ runif(n(), min = 6, max = 18),
      TRUE ~ 0
    ),
    
    # combine all components
    raw_pick_time =
      base_time +
      difficulty_bump +
      package_type_bump +
      bag_stage_bump +
      remaining_bump +
      phase_noise +
      disruption_bump,
    
    # apply lucky quick find override sometimes
    pick_time_sec = if_else(
      lucky_flag == 1,
      lucky_time,
      raw_pick_time
    ),
    
    # clamp and round
    pick_time_sec = pmax(pick_time_sec, 0.8),
    pick_time_sec = round(pick_time_sec, 1)
  )

delivery_final <- delivery_final %>%
  mutate(
    pick_time_sec = case_when(
      remaining_in_bag == 1 & runif(n()) < 0.75 ~ round(runif(n(), 0.8, 2.2), 1),
      TRUE ~ pick_time_sec
    )
  )
