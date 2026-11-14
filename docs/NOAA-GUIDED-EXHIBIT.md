# NOAA Guided Exhibit: Implementation Notes

## Intent and scope
This is a scoped revision of school/noaa.html only. The homepage, other case studies, shared JavaScript, original figures, and portfolio navigation remain unchanged. The baseline is commit 3c998b4116e9b6107026a39ac381518ff9715af4 on main.

The page uses a curated sequence: question → approach → discovery → evidence → further exploration. Four authentic PNGs in figures/ are displayed as standalone exhibits with short guidance and links to the full-resolution images. Technical methodology is available in two optional details sections.

## Baseline issues addressed
- The old page led with three oversized numeric callouts before visitors understood the prediction task.
- Four original figures were placed together in a generic gallery after most of the prose.
- The Data Scientist role was named, but techniques and project-specific decisions did not have distinct visual contexts.
- The project page did not link visitors to original charts or NOAA's data source individually.

## Evidence and attribution
The research descriptions, four figure filenames, 2020–2025 period, and team roles were taken from the pre-existing school/noaa.html and portfolio-data.js. The existing site reports Random Forest ROC-AUC 0.880 and Average Precision 0.669. Those values are retained, now positioned after an explanation of the metrics and labeled "reported team evaluation". The underlying model report and notebook are **not currently present in this repository**, so independent numerical reproduction remains pending. Do not claim the notebook was validated or link unrelated portfolio website code as modeling code.

The page differentiates recorded damage from actual damage, associative feature importance from causality, and individual Data Scientist responsibilities from team decisions.

## Original NOAA hero illustration: unresolved asset
The requested ChatGPT mockup illustration ("dramatic editorial illustration thunderstorm clouds over Great Plains landscape vintage atmospheric weather poster") could not be located in the connected repository or available earlier materials.

Do **not** replace it with stock art, another generated poster, an arbitrary landscape, or an analytical chart.

The page includes a reserved hidden figure with id \`noaa-hero-art\`, with scoped presentation styles ready in \`noaa-exhibit.css\`. No missing asset is requested by the browser and no broken image appears.

**After receiving the exact saved illustration**, inspect its actual dimensions, visually review the subject and crop, then:
1. Optimize it as \`assets/noaa-hero.webp\` (or retain the supplied format if conversion would damage it).
2. Populate the reserved \`<figure>\` with a real \`<img src="../assets/noaa-hero.webp" width="..." height="..." alt="...">\` using the image's measured dimensions.
3. Add \`class="noaa-hero has-art"\` to the hero header and remove \`hidden\` from the figure.
4. Add a short figcaption: "Conceptual editorial illustration, not NOAA storm-event evidence".
5. Verify desktop/mobile and the GitHub Pages built asset. Preserve the visual subject and avoid decorative filters.

This explicit asset dependency must not be hidden by pretending a substitute exists.

## Release checks
- Validate HTML IDs, anchors, references, and original PNG filenames in \`tools/validate_portfolio.py\`.
- Run \`tools/build_portfolio.py\`, then validate \`_site\`.
- Review on desktop and mobile, test direct NOAA navigation, original figure links, details disclosure, keyboard navigation, and dark theme.
- Verify the optional hero art only after its exact asset is supplied and committed.
