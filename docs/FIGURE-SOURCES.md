# Image provenance and interpretation notes

All chart assets in `figures/` were copied from actual research artifacts. None were generated to decorate the portfolio.

## DSC 450 / NOAA Storm Events (four real figures)

**Source:** Group 1 Milestone 3 presentation `DSC450_Milestone3_Presentation.pptx` (Matthew Scarpello, Andrea Barfield, Hali Sarah Parsons), Fall 2026. Image bytes were extracted from the PowerPoint package. The original reported period was 2020–2025. The figures were not redrawn.

| File | Presentation evidence | Subject |
| --- | --- | --- |
| `noaa-event-frequency.png` | Research question section / slide 4 | Most common event types versus count with recorded economic damage |
| `noaa-economic-damage.png` | Damage comparison / slide 5 | Aggregate recorded damage by storm type |
| `noaa-precision-recall.png` | Model evaluation | Precision and recall trade-offs |
| `noaa-feature-importance.png` | Model interpretation | Permutation feature importance |

Reported Random Forest scores in team presentation: ROC-AUC **0.880**, Average Precision **0.669**. The grouping used storm episodes to reduce correlated train/test records. These are documented reported results, not rerun model training in this package.

## DSC 450 / ERCOT (ten real figures)

**Source:** User-uploaded `DSC450_ERCOT_Visualization_FULLnotebook(1).ipynb`, prepared by Matthew Scarpello (visualization / presenter). The `.ipynb` contained 38 distinct saved PNG output images. Ten chosen figures were copied byte-for-byte from cell outputs; **the website did not regenerate the charts**. Notebook uses Sarah Parsons's cleaned EIA-930/ERCOT data and Andrea Barfield's exported hourly model predictions. The executed notebook explicitly states that these figures are computed from supplied team CSVs, not simulated values.

The cell numbers below are **zero-indexed** positions in the notebook JSON, not the notebook's displayed `In [ ]` execution counts.

| PNG in website | Notebook code cell | Original notebook theme |
| --- | ---: | --- |
| `ercot-demand-month-hour.png` | 16 | F03, observed-demand heatmap by month and local hour |
| `ercot-seasonal-daily-heatmaps.png` | 20 | F03A, four full-season day/hour heatmaps |
| `ercot-historical-monthly-demand.png` | 10 | F01, monthly demand history |
| `ercot-actual-vs-operator-forecast.png` | 45 | Observed demand and operator forecast overlay |
| `ercot-seven-models-mae.png` | 56 | F14, seven forecast series on 8,640 matched evaluation hours |
| `ercot-model-error-correlation.png` | 74 | F20, signed residual relationship between Rolling SARIMA and Weather XGBoost |
| `ercot-blend-validation-weights.png` | 78 | F21, earlier-window blend-weight experiment |
| `ercot-later-period-blend-mae.png` | 80 | F22, 4,320-hour later-window MAE comparison |
| `ercot-peak-week-comparison.png` | 85 | F24, summer-week observed/forecast time series |
| `ercot-model-error-heatmap.png` | 94 | F30, month/hour model error versus each model's own average |

Important: The ERCOT benchmark is **not** a model developed by the students. The seven-series matched-hour comparison reports ERCOT MAE **1,134.80 MWh**, and Weather XGBoost MAE **2,476.68 MWh**. The later 4,320-hour comparison reports ERCOT **1,088.54**, 50/50 blend **1,946.88**, Rolling SARIMA **2,563.89**, and Weather XGBoost **2,690.83 MWh**. The blend combines model predictions *after* fitting; it does not reflect a newly retrained model. The notebook warns that different prediction generation schedules and information availability need an issuance-time audit before operational claims are made.

## Not yet sourced

No figure files are currently supplied for Amazon pick times, weather/clothing predictor, UNMC, Studio S, Mini Bookmaker, or the reserved Capstone Project 3. These project galleries intentionally stay empty until authentic material is available and appropriately shareable.
