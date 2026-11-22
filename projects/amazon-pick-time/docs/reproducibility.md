# Reproducibility and model provenance

## Original source flow

1. The original milestone scripts explored simulation and created visual prototypes.
2. The original calibration script references `df_real`, `shape`, `rate` and `daily_controls`. The raw observations and these calibration inputs were not supplied.
3. Bag allocation creates `delivery_structure` from daily controls.
4. [Generator variant 1](../analysis/02-monthly-simulation/delivery-final-1.R) and [variant 2](../analysis/02-monthly-simulation/delivery-final-2.R) are alternative versions, not sequential pipeline stages. They use gamma random draws, seeded variation and workflow adjustments. The exact variant behind each original image is not established.
5. [Visualization scripts](../analysis/03-visualizations/) depend on session objects such as `delivery_final`, `day_bag_summary` and `time_share`.

## Dependencies

The original scripts use R packages including dplyr, tidyr, purrr, tibble, ggplot2, ggforce, scales and patchwork. Package versions were not supplied. The published subset has not been independently executed. The source scripts are preserved as coursework, not presented as a complete, tested end-to-end pipeline.

## Interpretation and privacy

The research question is informed by firsthand experience, but simulated workflow outputs cannot independently demonstrate real package-type effects, learning effects or the superiority of a picking strategy. Raw voice recordings, tracking numbers, addresses and identifiable operational data should not be published. A future comparison should account for initial sorting time, route conditions, package mix, order effects and driver experience.
