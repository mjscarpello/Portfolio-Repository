# Next authentic visuals and work samples: what to provide

The new site includes **14 real image files already** (4 NOAA, 10 ERCOT). You do not need to send the ERCOT notebook again for those. The entries below are intentionally waiting for real project material.

## 1. NOAA severe weather — DSC 450 Fall Capstone Project 1

**Already included** from Group 1's Milestone 3 PowerPoint: event frequency vs damage; total economic losses; precision-recall curves; feature importance.

**Optional future additions:** exported charts from any *final* second research/modeling notebook; verified latest results and attribution. Do not publish earlier experimental figures as if they were the final findings.

## 2. ERCOT electricity demand — DSC 450 Fall Capstone Project 2

**Already included from the uploaded executed notebook:** 10 exact PNG outputs covering month/hour demand, four-season heatmaps, monthly trend, operator forecast overlay, common-sample model MAE, residual relationships, validation weight scan, later-period blend test, a peak-week case, and MAE-divergence heatmap.

**Optional future additions:** a final team report with signed-off performance language, notebook updates, and any team-approved figure substitutions. Current descriptions explicitly note that forecast issuance-time comparability and weather availability were not fully audited.

## 3. DSC 450 Fall Capstone Project 3

**Nothing required yet.** Project 3 is a pure placeholder. Later, provide the confirmed title, research question, assigned role, dataset, notebook/figures, team contributions and findings. This version does not mention recycling.

## 4. Amazon delivery pick-time visualization (School)

Please provide the original R Markdown (`.Rmd`), `.R` script, Jupyter notebook, exported PDF, or actual PNG plots. Especially useful:
- Distribution/violin plot of the time it took to locate a package.
- Comparison of boxes, envelopes, bags or obstructed deliveries.
- Daily or bag-level timeline and trends over a month, if the data supports them.

If possible, include your observation-method note: how times were measured, approximate sampling dates, and whether a plot uses firsthand records or simulated values. Do not upload addresses, customer names, tracking numbers or employer-sensitive data.

## 5. Weather-based Amazon clothing predictor (School · DSC 355 Predictive Analytics)

Please provide the modeling notebook, completed presentation, or app screenshots, plus any original performance charts such as class distribution, confusion matrix, feature importance, or interface screenshots. Mark the **synthetic dataset** clearly and give the final exact target definition and evaluation method. Do not infer deployment or production accuracy.

## 6. UNMC E-Learning Internship (Work)

Please share only **approved-for-public-use** material: stills from instructional animations, screenshots of any nonconfidential coding workflow, storyboard frames, and/or a short explanation of your own responsibilities versus the team’s. Avoid patient data, internal systems, copyrighted course content, or unreleased institutional media without permission.

## 7. Studio S (Personal)

Good materials: application screenshot, working timeline or code-driven scene screenshot, demo preview/video if publicly shareable, repository link if public, and a list distinguishing **already working** from **planned** features. The site currently avoids claiming that the full roadmap has been completed.

## 8. Mini Bookmaker (Personal)

Good materials: photographs of printed examples, page-layout screenshots, a sample PDF you made, source code if it exists, and a short note about what it currently does. No functional status beyond a work-in-progress concept is asserted here.

## Export guidance

Export original figures as PNG where possible (often 1600–2400 px wide, or `fig.savefig(..., dpi=200, bbox_inches='tight')`). Keep original labels, data scales, and legible legends. Do not recreate plots with invented values just to fill space. Put finalized files into the repository's `figures/` folder, and add entries in `portfolio-data.js` under the matching project.
