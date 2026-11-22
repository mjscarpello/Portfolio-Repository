library(ggplot2)
library(ggforce)

plot_density_clean <- ggplot(
  delivery_final,
  aes(x = package_type, y = pick_time_sec)
) +
  
  geom_violin(
    aes(fill = package_type),
    alpha = 0.18,
    width = 0.9,
    color = NA,
    trim = FALSE
  ) +
  
  geom_sina(
    aes(color = package_type),
    maxwidth = 0.55,
    size = 1.8,
    alpha = 0.5
  ) +
  
  coord_cartesian(ylim = c(0, NA)) +
  
  labs(
    x = "Package Type",
    y = "Pick Time (seconds)"
  ) +
  
  theme_minimal(base_size = 18) +
  
  theme(
    # Larger axis labels
    axis.title = element_text(size = 20, face = "bold"),
    
    # Larger category + numeric labels
    axis.text.x = element_text(size = 18, face = "bold"),
    axis.text.y = element_text(size = 16),
    
    # Stronger horizontal reference lines
    panel.grid.major.y = element_line(color = "grey60", linewidth = 0.8),
    panel.grid.major.x = element_blank(),
    panel.grid.minor = element_blank(),
    
    legend.position = "none"
  )

print(plot_density_clean)