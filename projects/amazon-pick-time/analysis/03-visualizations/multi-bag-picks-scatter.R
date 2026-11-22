plot_day_bags_summary_smooth <- ggplot(
  day_bag_summary,
  aes(x = remaining_in_bag, y = mean_pick, color = package_type)
) +
  geom_point(alpha = 0.55, size = 2.2) +
  geom_smooth(
    se = FALSE,
    method = "loess",
    span = 0.9,
    linewidth = 1.5
  ) +
  facet_wrap(~ bag_label, scales = "free_y", ncol = 4) +
  scale_x_reverse() +
  coord_cartesian(ylim = c(0, NA)) +
  labs(
    x = "Remaining Packages in Bag",
    y = "Average Pick Time (seconds)",
    color = "Package Type"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.minor = element_blank(),
    panel.grid.major = element_line(color = "grey82", linewidth = 0.45),
    
    strip.text = element_text(size = 12, face = "bold"),
    
    axis.title = element_text(size = 13, face = "bold"),
    axis.text = element_text(size = 10),
    
    legend.position = "right",
    legend.title = element_text(size = 12, face = "bold"),
    legend.text = element_text(size = 11),
    
    panel.spacing = unit(1.1, "lines")
  )

print(plot_day_bags_summary_smooth)