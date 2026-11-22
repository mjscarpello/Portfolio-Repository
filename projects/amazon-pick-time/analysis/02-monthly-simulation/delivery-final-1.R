library(dplyr)

set.seed(313)

delivery_final <- delivery_structure %>%
  mutate(
    bag_progress = (remaining_in_bag - 1) / pmax(bag_packages - 1, 1),
    
    base_time = rgamma(n(), shape = shape, rate = rate),
    
    difficulty_bump = case_when(
      bag_difficulty == "easy" ~ -0.5,
      bag_difficulty == "medium" ~ 0.0,
      bag_difficulty == "hard" ~ 1.1
    ),
    
    # envelopes should now be slower on average
    package_type_bump = case_when(
      package_type == "Envelope" ~ 1.0,
      package_type == "Box" ~ -0.2,
      TRUE ~ 0
    ),
    
    # envelopes should also be more variable
    package_noise_sd = case_when(
      package_type == "Envelope" ~ 1.5,
      package_type == "Box" ~ 0.8,
      TRUE ~ 1.0
    ),
    
    package_noise = rnorm(n(), mean = 0, sd = package_noise_sd),
    
    bag_stage_bump = case_when(
      bag_stage == "early" ~ 0.7,
      bag_stage == "middle" ~ 0.2,
      bag_stage == "late" ~ -0.2
    ),
    
    # envelopes respond a little more strongly to a crowded bag
    remaining_bump = case_when(
      package_type == "Envelope" ~ 3.2 * bag_progress,
      package_type == "Box" ~ 2.0 * bag_progress,
      TRUE ~ 2.5 * bag_progress
    ),
    
    phase_noise_sd = case_when(
      month_phase == "volatile_start" ~ 1.2,
      month_phase == "transition" ~ 0.9,
      month_phase == "stable_finish" ~ 0.6
    ),
    
    phase_noise = rnorm(n(), mean = 0, sd = phase_noise_sd),
    
    # lucky finds should happen a bit more for boxes
    lucky_prob = case_when(
      package_type == "Box" & organization_quality == "high" ~ 0.12,
      package_type == "Box" & organization_quality == "medium" ~ 0.09,
      package_type == "Box" & organization_quality == "low" ~ 0.06,
      package_type == "Envelope" & organization_quality == "high" ~ 0.07,
      package_type == "Envelope" & organization_quality == "medium" ~ 0.05,
      package_type == "Envelope" & organization_quality == "low" ~ 0.03,
      TRUE ~ 0.05
    ),
    
    lucky_flag = rbinom(n(), 1, lucky_prob),
    lucky_time = runif(n(), min = 0.8, max = 2.0),
    
    # envelopes get slightly more tail behavior
    disruption_prob = case_when(
      package_type == "Envelope" & bag_exception == "late_disruption" ~ 0.11,
      package_type == "Envelope" & bag_difficulty == "hard" ~ 0.06,
      package_type == "Envelope" ~ 0.025,
      package_type == "Box" & bag_exception == "late_disruption" ~ 0.07,
      package_type == "Box" & bag_difficulty == "hard" ~ 0.03,
      package_type == "Box" ~ 0.01,
      TRUE ~ 0.02
    ),
    
    disruption_flag = rbinom(n(), 1, disruption_prob),
    
    disruption_bump = if_else(
      disruption_flag == 1,
      runif(n(), min = 6, max = 18),
      0
    ),
    
    raw_pick_time =
      base_time +
      difficulty_bump +
      package_type_bump +
      package_noise +
      bag_stage_bump +
      remaining_bump +
      phase_noise +
      disruption_bump,
    
    pick_time_sec = if_else(
      lucky_flag == 1,
      lucky_time,
      raw_pick_time
    ),
    
    pick_time_sec = pmax(pick_time_sec, 0.8),
    pick_time_sec = pmin(pick_time_sec, 35),
    pick_time_sec = round(pick_time_sec, 1)
  ) %>%
  mutate(
    pick_time_sec = case_when(
      remaining_in_bag == 1 & runif(n()) < 0.75 ~ round(runif(n(), 0.8, 2.2), 1),
      TRUE ~ pick_time_sec
    )
  )
