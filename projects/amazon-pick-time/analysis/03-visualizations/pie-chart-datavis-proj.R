ggplot(time_share, aes(x = "", y = share, fill = package_type)) +
  
  geom_col(width = 1, color = "white", size = 1.2) +
  
  coord_polar(theta = "y") +
  
  geom_text(
    aes(label = label),
    position = position_stack(vjust = 0.5),
    size = 6,
    fontface = "bold"
  ) +
  
  labs(
    fill = "Package Type"
  ) +
  
  theme_minimal(base_size = 20) +
  
  theme(
    axis.text = element_blank(),
    axis.title = element_blank(),
    axis.ticks = element_blank(),
    panel.grid = element_blank(),
    legend.position = "none"
  )