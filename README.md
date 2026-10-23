# Matthew Scarpello — Data Science & Creative Technology Portfolio

A GitHub Pages portfolio organized around original figures and real software screenshots. The site preserves the personal introduction **Question. Analyze. Enjoy.** and the **Note 01** work-experience story.

**Repository:** https://github.com/mjscarpello/Portfolio-Repository  
**Expected GitHub Pages URL:** https://mjscarpello.github.io/Portfolio-Repository/ (confirm in repository Settings → Pages)

## Collections

**School (5):** NOAA storm economic-damage prediction, ERCOT electricity-demand forecasting, DSC 450 Project 3 placeholder, Amazon package pick-time efficiency, and DSC 355 Driver Gear Performance Lab.

**Work (1):** UNMC E-Learning internship — animation, interactive medical-terminology game, and instructional media screenshots.

**Personal (2):** Studio S presentation editor and Mini Bookmaker desktop publishing software.

### Featured data, honestly presented
- **NOAA:** Four PNGs extracted from the team's Milestone 3 presentation. Random Forest results reported by the team: ROC-AUC 0.880, average precision 0.669. Association, not causality.
- **ERCOT:** Ten original notebook / user-provided figures. ERCOT's official forecast is a benchmark. Some retrospective team forecasts differ in forecast horizon, information availability, and update schedule; do not claim operational forecasting superiority.
- **Amazon pick-time study:** Three real visualizations from firsthand observations. Includes downloadable final PDF report.
- **Driver Gear:** Five screenshots from the DSC 355 Streamlit deployment; the model was trained with user-created synthetic data, so internal evaluation is not field validation.
- **UNMC, Studio S, and Mini Bookmaker:** Real screenshots, not generic stock illustrations.

## Architecture
- `index.html`: homepage, hero photo, selectors and featured projects.
- `about.html`: personal story and photo.
- `school/`, `work/`, `personal/`: separate collection index pages and individual project case studies.
- `portfolio-data.js`: canonical project information and image list. Add or rearrange figures here first.
- `script.js`: interactive school selector, theme toggle, zoomable figure galleries.
- `style.css`: responsive, neutral design.
- `figures/`: original project PNGs and optimized screenshots.
- `assets/`: personal portrait.
- `downloads/`: final Amazon workflow report.
- `docs/INSTALLATION.md`: browser-only full-site upload and deployment checklist.
- `docs/PROJECT-REPORT.md`: implementation and quality report.
- `docs/ASSET-MANIFEST.md`: figure provenance and descriptions.

## Local preview

Run from the repository folder:

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000/` and check images and navigation, especially `school/noaa.html` and the new collection galleries. GitHub Desktop is **not required**: the browser-only procedure is in `docs/INSTALLATION.md`.

## Maintenance

Update `portfolio-data.js` and place corresponding media under `figures/`. Case-study galleries resolve paths from the root via `data-root="../"` on subpages; do not use browser-relative `school/figures` paths. Resize screenshots for load performance; preserve chart values. After updating CSS or JS, increment the asset query version in all HTML pages to avoid stale cached code.

**Privacy and ownership:** Verify permission to publicly display the institutional work samples, logos, and game screenshots. Team work is credited by role. The portfolio does not upload any training dataset, model file, API keys, or sensitive records.
