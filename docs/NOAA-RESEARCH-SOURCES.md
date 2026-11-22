# NOAA capstone research: sources and provenance

This guide documents the completed DSC 450 Project 1 research and separately labels the exploratory Version 3.0 notebook. It is not a replacement for the original team report, presentation, code or cleaned event data.

## Primary source set reviewed

| Document | Authorship / purpose | Relevant portions |
|---|---|---|
| ProjectMilestone2.pdf | Matthew Scarpello, Andrea Barfield, Sarah Parsons; final report, October 4, 2026 | pp. 3–5 research question/EDA; p. 6 results; pp. 7–8 limitations and future work; p. 10 Appendix A; p. 11 relative intensity; pp. 14–15 Q&A |
| DSC450_Milestone3_Presentation.pdf | Same team; 13-slide final presentation | slides 3–6 research question/method; slides 7–8 evaluation/importance; slides 9–11 ethics, next steps, Q&A |
| NOAA_Human_Economic_Impact_Modeling_v3_0(2).ipynb | Extended modeling notebook, October 2026 | cells 6–10 known/unknown target counts; cells 21–28 physical-intensity investigation; cells 29–42 co-occurrence experiment (cell positions zero-based) |
| DSC450_Project1_Visualizations_HaliSarahParsons(1).ipynb | Hali Sarah Parsons, Data Visualizer / Presenter | chart 1 frequency, chart 5 economic totals, chart 9 permutation importance derived from Matthew's model results |

The original four portfolio image assets are already available; the supplied source PDFs and notebooks have been reviewed but are not yet committed as binary/original files. No links to absent files are presented. The cleaned CSV and exact final grouped-episode model training notebook are separate dependencies for independent reproduction.

## Final project findings

**Research target:** whether a completed historical NOAA event record contained any positive property/crop damage; not damage amount, storm occurrence, or human harm.

Report Appendix A: 410,311 total unique events; 307,902 known economic outcomes; 102,409 unknown (24.96%). Known outcomes: 237,603 recorded zero and 70,299 positive (22.83%). Unknowns excluded from economic classification. Predictors: event type, region, season, duration. Related storm episodes grouped using EPISODE_ID for evaluation; the report does not establish a prospectively validated operational forecast.

| Model | Average Precision | ROC-AUC |
|---|---:|---:|
| No-skill baseline | 0.219 | 0.500 |
| Logistic Regression | 0.652 | 0.871 |
| Random Forest | 0.669 | 0.880 |

The full known-outcome prevalence and the reported evaluation no-skill AP are different quantities. Random Forest's improvement is modest. No claim that an ROC-AUC of 0.880 means 88% of individual predictions were correct.

Permutation importance (decrease in validation PR performance after feature shuffle): event type 0.408; region 0.171; log duration 0.079; season 0.023. Importance describes model reliance, not causation. Report p. 11: separate eligible-subset relative-intensity experiment reports AP 0.691 to 0.703; not comparable with the full-population model scores.

## Original figures currently published

- [Frequency vs documented damage](../figures/noaa-event-frequency.png): Sarah Parsons, chart 1; report p. 4; presentation slide 4. Total-event counts include unknown economic outcomes; not true physical damage probabilities.
- [Recorded economic loss totals](../figures/noaa-economic-damage.png): Sarah Parsons, chart 5; report p. 4; presentation slide 5. Aggregate reported property/crop damage, not individual-event expected costs.
- [Precision-recall curves](../figures/noaa-precision-recall.png): team classification results; report p. 6; presentation slide 7.
- [Permutation importance](../figures/noaa-feature-importance.png): Matthew Scarpello's model results, visualized by Sarah Parsons (chart 9); report p. 6; presentation slide 8.
  
## Extended notebook: research beyond the final report

Version 3.0 separates human impacts, binary economic damage and positive-loss severity. It uses event-relative magnitude ranks and other available physical components. In the exploratory tree section, a stratified row-level split and full-population magnitude ranks make this a diagnostic, not equivalent to final grouped-episode evaluation. A shallow tree is used to identify useful components; a weighted candidate index produces held-out ROC-AUC 0.4439 in saved output. This does not support using that index as a validated severity or forecast score.

Later cells investigate same-day regional co-occurrence and compare baseline logistic regression with a co-occurrence enhanced version, grouped by date-region. No final score outputs are saved in the provided version. Do not infer an improvement or causal effect. Training-only feature engineering, temporal validation and prospective feature availability remain prerequisites.

## Reproduction and boundaries

The notebooks reference a cleaned NOAA CSV on Google Drive. A public raw NOAA download alone is not the same cleaned feature table. The exact final training workflow, cleaned CSV and verified software environment are needed to reproduce the reported final results. Do not treat missing values as known zeros. Completed event characteristics (e.g. duration) may not be available at forecast issuance. Historic reporting practices, hazard exposure and vulnerability can affect results. Do not use this retrospective analysis alone to withhold disaster assistance.

- [NOAA NCEI Storm Events Database](https://www.ncei.noaa.gov/access/storm-events-database/)
- [NOAA raw annual CSV files](https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/)
- [FEMA National Risk Index](https://hazards.fema.gov/nri/)
- [IPCC AR6 synthesis report](https://www.ipcc.ch/report/ar6/syr/)

## Planned follow-up

Develop an interactive map to explore historical storm impacts and investigate prospective forecasts using time-appropriate features, exposure and vulnerability data, validated temporal holdouts and uncertainty. This is a development direction, not an existing deployed system.

## Team credits

Matthew Scarpello: data scientist; Andrea Barfield: data wrangler; Hali Sarah Parsons: visualization/presentation. Report and final presentation are collaborative deliverables.
