# Original media and figure provenance

Charts below are original project images, not newly fabricated or redrawn. Site images live in the paths shown. Screenshots have been re-encoded only for web size, without creative alteration.

## Personal portrait
`assets/matthew-scarpello-portrait.jpg` — converted from the supplied professional photo at the UNMC garden. Cropping for layout happens through CSS (`object-fit`) at display time.

## Project figures

### Predicting Economic Damage from Severe Weather — school
Page: `school/noaa.html`
- `figures/noaa-event-frequency.png` — Frequency is not the same as damage. Original Group 1 figure: common events and damaging events tell different stories.
- `figures/noaa-economic-damage.png` — Recorded dollars by storm type. Hurricane events contribute the largest recorded total even though they are less frequent.
- `figures/noaa-precision-recall.png` — Precision–recall comparison. Average Precision is reported alongside ROC-AUC because the positive class is relatively uncommon.
- `figures/noaa-feature-importance.png` — What contributes to prediction. Event type provided the strongest predictive signal; importance is not causation.

### Forecasting Regional Electricity Demand — school
Page: `school/ercot.html`
- `figures/ercot-demand-month-hour.png` — When demand peaks. Summer afternoons and evenings reach the highest demand; seasonal and hour features are important.
- `figures/ercot-seven-models-mape.png` — Benchmark before complexity. F15 · ERCOT day-ahead led at 2.00% MAPE; Weather XGBoost led team models at 4.18%. This is a retrospective comparison.
- `figures/ercot-accuracy-by-demand.png` — Accuracy under high demand. F17 · The best model changes with demand conditions. The operator forecast remained most consistent.
- `figures/ercot-mae-by-hour.png` — The hourly error pattern. F11 · Even the operator forecast has a clear daily pattern in absolute error.
- `figures/ercot-model-error-correlation.png` — Why try a blend?. F20 · Error differences motivated an exploratory hybrid rather than assuming the models make identical mistakes.
- `figures/ercot-later-period-blend-mae.png` — Test the hybrid on later hours. F22 · A 50/50 blend beat its components on this retrospective period, but did not surpass ERCOT.
- `figures/ercot-blend-by-demand.png` — Where the blend helps. F23 · A blend trades strengths across load levels; the benefit is not uniform.
- `figures/ercot-hourly-model-mae.png` — Different weaknesses at different hours. F26 · Weather XGBoost and Rolling SARIMA have different time-of-day performance patterns.
- `figures/ercot-season-hour-improvement.png` — Season meets time of day. F31 · These are within-model deviations, not a direct cross-model scorecard.
- `figures/ercot-actual-vs-operator-forecast.png` — Measured demand versus published forecast. Original notebook output · A close look at the official benchmark and actual hourly demand.

### DSC 450 — Project 3 — school
Page: `school/capstone-three.html`
- No figures (intentional course placeholder).

### Amazon Package Pick-Time Efficiency — school
Page: `school/amazon-pick-times.html`
- `figures/amazon-pick-distribution.png` — Boxes versus envelopes. Original report · Average box pick 4.2 s; envelope 5.6 s, with wider variability for envelopes.
- `figures/amazon-pick-weekly-comparison.png` — How searches changed by week. Original report · Shifts toward faster picks across weeks suggest experience and organization matter.
- `figures/amazon-pick-rolling-dashboard.png` — A route-level performance signal. Original report · A twelve-pick rolling mean reached 3.9 s on the highlighted route versus a 6 s reference.

### Driver Gear Performance Lab — school
Page: `school/weather-clothing.html`
- `figures/driver-gear-recommendation.jpg` — Clothing recommendation in context. Actual Streamlit prototype · Prediction, confidence, and a practical gear match.
- `figures/driver-gear-route-weather.jpg` — Enter route and live weather. Actual interface · Users can load weather or test a manual scenario.
- `figures/driver-gear-probabilities.jpg` — What the model considered. Prototype · Probability output supports transparent, inspectable model recommendations.
- `figures/driver-gear-feature-check.jpg` — Leakage and feature verification. Validation · 34 model inputs are checked; post-outcome clothing fields are excluded.
- `figures/driver-gear-historical-lookup.jpg` — Historical route lookup. Explore training context with route, season, comfort-risk, and clothing filters.

### Learning Media & Collaboration at UNMC — work
Page: `work/unmc.html`
- `figures/unmc-animated-analytics.jpg` — Animated data storytelling. Work sample · Educational animation combining narration-friendly visuals and data storytelling.
- `figures/unmc-occupational-therapy.jpg` — Occupational therapy animation. Work sample · Complex health topics explained through approachable visual sequences.
- `figures/unmc-lymph-node-animation.jpg` — Lymph node locations. Work sample · Visual simplification for medical and health-science learning.
- `figures/unmc-lab-rat-interface.jpg` — Lab Rat Escape learning game. Work sample · A game interface designed around medical terminology practice.
- `figures/unmc-lab-rat-question.jpg` — Practice through interaction. Work sample · Feedback and quiz interaction inside a game-like scenario.
- `figures/unmc-lab-rat-gameplay.jpg` — Game-based learning scene. Work sample · Interactive gameplay introduces a different way to approach memorization.

### Studio S — Code-Driven Presentation Studio — personal
Page: `personal/studio-s.html`
- `figures/studio-s-timeline.jpg` — Visual editor and timeline. Working prototype · Scenes, named cues, and audiovisual timing share one timeline.
- `figures/studio-s-forecast-scene.jpg` — A real ERCOT presentation scene. Working prototype · The editor is used to assemble visuals from the DSC 450 ERCOT project.

### Mini Bookmaker — personal
Page: `personal/mini-bookmaker.html`
- `figures/minibook-imposition-preview.jpg` — Print-ready sheet preview. Working prototype · A physical imposition preview with front/back sheet navigation.
- `figures/minibook-page-selector.jpg` — Select and arrange pages. Working prototype · Page selection and order control before building the booklet.

## Sources
- NOAA images: original DSC 450 Group 1 Milestone 3 PowerPoint.
- ERCOT: DSC 450 ERCOT executed visualization notebook plus selected original F-series PNG charts supplied separately.
- Amazon pick-time: original violin, weekly histogram, and rolling dashboard PNGs; related final report copied to `downloads/`.
- Driver Gear Performance Lab: Milestone 5 project ZIP, Streamlit screenshots, and model metadata.
- UNMC: original screenshots supplied from educational animation and medical terminology game work samples.
- Studio S, Mini Bookmaker: original application screenshots supplied in the conversation.

Before publishing, verify that the institutional material is authorized to be publicly displayed; no institutional approval was checked by the site builder.
