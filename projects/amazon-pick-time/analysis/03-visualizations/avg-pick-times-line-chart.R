daily_summary <- delivery_final %>%
  group_by(day_date, day_num, month_phase) %>%
  summarise(
    avg_pick = mean(pick_time_sec),
    .groups = "drop"
  )

ggplot(daily_summary, aes(x = day_num, y = avg_pick, color = month_phase)) +
  geom_line(linewidth = 1.1) +
  geom_point(size = 2) +
  labs(
    title = "Average Pick Time Across January 2026",
    x = "Day of Month",
    y = "Average Pick Time (seconds)",
    color = "Month Phase"
  ) +
  theme_minimal()
