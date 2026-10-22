# Authentic figure inventory and provenance

This portfolio uses **original project charts**, not decorative placeholder illustrations.

## Project 1 — NOAA Storm Events (included now)

Source: `DSC450_Milestone3_Presentation.pptx` by DSC 450 Group 1 (Matthew Scarpello, Andrea Barfield, Sarah Parsons), October 2026. These files were copied as the **unmodified PNG bytes embedded in the presentation** using the corresponding `ppt/media` entries; they were not recreated from guessed data.

| Portfolio image | Original media item | What it actually depicts |
| --- | --- | --- |
| `figures/noaa-event-frequency.png` | `ppt/media/image4.png` | Most frequent storm event categories, with count of events having recorded economic damage |
| `figures/noaa-economic-damage.png` | `ppt/media/image5.png` | Top ten event types by aggregate recorded economic damage |
| `figures/noaa-precision-recall.png` | `ppt/media/image6.png` | Precision–recall comparison of Logistic Regression and Random Forest |
| `figures/noaa-feature-importance.png` | `ppt/media/image7.png` | Random Forest permutation importance by predictor group |

Report statistics included on the case-study page: 410,311 event records; ~23% positive class; 0.880 ROC-AUC and 0.669 Average Precision for Random Forest. These are **reported team results**, not a claim that the portfolio independently reran the training.

Limitations: NOAA's presence/absence of recorded economic damage differs from true realized damage; reporting completeness varies by storm type and region. Predictor importance should not be treated as causal effect.

## Project 2 — ERCOT demand forecasting (figures not yet included)

The research narrative is based on the team's DSC 450 Project 2 material and the user's visual-analysis work. No original chart binary was available to incorporate in the package. The `figures` list for this project in `portfolio-data.js` is deliberately empty.

Need the actual exported figures or an **executed and saved** notebook. Preferred chart examples, only if present in real notebook outputs: monthly/hourly demand heatmap; demand vs. temperature bands; a model-comparison graphic that respects common evaluation timestamps; observed vs. predicted curves for the actual holdout; peak-period error analysis. All numerical claims need final report verification.

## Project 3 — recycling contamination (figures not yet included)

Project planned. No data-derived original figures were available, and no metrics have been claimed. Only add figures once the data analysis exists, including its data-quality or label distributions and defensible model evaluation.

## Rule for future changes

1. Obtain the original notebook, image, or chart output from the project owner/team.
2. Prefer original `fig.savefig(..., dpi=200, bbox_inches='tight')` or saved notebook output over cropping screenshots.
3. Add the exported file to `figures/` and add a corresponding image object under the correct `figures` array in `portfolio-data.js`.
4. Write accessible alt text describing the actual plot, a grounded caption, and any important limitations.
5. Inspect the image after deployment; keep axes, units, legends, and baselines readable.
6. For group-generated figures, credit the group and do not claim sole authorship.
