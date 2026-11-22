# Amazon Package Pick-Time Analysis

A Bellevue University applied visualization project by Matthew Scarpello, motivated by firsthand experience as an Amazon delivery driver.

[Portfolio case study](https://mjscarpello.github.io/Portfolio-Repository/school/amazon-pick-times.html) · [Original report PDF](../../downloads/amazon-workflow-efficiency-report.pdf)

## Research question
How can visualizations help explain package-search patterns under a workflow that groups boxes and envelopes and picks items as needed? A future comparison with up-front sorting would require a controlled study, including sorting time and route differences.

## Data provenance
The interview describes recording firsthand observations with voice memos. The supplied R source archive also explicitly contains simulation scripts. The monthly workflow is generated, with a gamma base distribution described in the source as calibrated on real observations, randomized bag allocation and adjustments for difficulty, progress, package type and route/month phase. The raw observed dataset, `shape`, `rate`, and initial `daily_controls` are not included in the supplied archives. The exact final script variant used for each exported image has not been established. Reported 4.2 s, 5.6 s and 3.9 s values should be described as original report/model outputs, not verified real-world effects.

## Source inventory
The supplied archive contains 11 top-level R files (plus 9 nested duplicate/version files). Core files include `Bag control.R`, `delivery final 1.R`, `delivery final 2.R`, `test data compare.R`, `violin plot.R`, `Vertical histogramweekly pick times.R`, `multi bag picks scatter.R`, `avg pick times line chart.R`, `pie chart datavis proj.R`, `project data vis vzn3.R`, and `mileston project 1a.R`. The milestone scripts explore initial simulation and visualization. The monthly workbook depends on objects from the original R session and must not be represented as fully reproducible yet.

## Existing original figures
- [Violin plot](../../figures/amazon-pick-distribution.png)
- [Weekly comparison](../../figures/amazon-pick-weekly-comparison.png)
- [Rolling dashboard](../../figures/amazon-pick-rolling-dashboard.png)

This directory documents the existing portfolio project. The complete cleaned source/figure bundle and standalone repository are separate publication steps. Raw voice memos or customer identifiers should not be published.
