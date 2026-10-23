# Portfolio update — detailed implementation report

**Prepared:** October 22, 2026  
**Target repository:** https://github.com/mjscarpello/Portfolio-Repository  
**Publication status:** Ready-to-upload package, not pushed by the site builder.

## 1. What changed

- Updated site identity throughout HTML, JavaScript, and documentation to **Matthew Scarpello**. All old alternate personal-branding phrases and former account references were removed.
- Added the exact photograph supplied by the owner to the homepage and About page. The photo was web-optimized without changes to personal appearance.
- Preserved **Question. Analyze. Enjoy.**, neuroscience-to-data-science story, civic/community motivation, and **Note 01** with UNMC E-Learning Intern, Amazon Delivery Driver, Healthcare CNA.
- Kept eight projects divided into three actual directories: five School, one Work, two Personal. All three DSC 450 entries are labeled Bellevue University Fall Capstone; Project 3 remains a blank topic placeholder.
- Improved shorter, evidence-centered summaries that distinguish your role, what was tested/built, and what the outcomes actually support.
- Replaced empty media placeholders with direct project outputs. School: NOAA four charts, ERCOT ten original charts, Amazon pick times three original figures, Driver Gear five prototype screenshots. Work: six UNMC animation/game stills. Personal: two Studio S and two Mini Bookmaker screens.
- Fixed **nested page gallery relative-path bug** by resolving all project figures through `document.body.dataset.root`, so `school/noaa.html` requests `../figures/...` instead of missing `school/figures/...`.
- Added original final Amazon report as a downloadable/viewable PDF.
- Improved lightweight site navigation with a repository link, portrait sections, and genuine project-image previews on collection cards.
- Updated shared code version numbers to reduce stale CSS and JS after deployment.

## 2. Curated project messages

| Project | What a visitor learns | Source / limitation |
|---|---|---|
| NOAA severe-weather impact | Storm frequency is not a substitute for economic damage likelihood; held-out team RF ROC-AUC 0.880 and AP 0.669. | Group 1 capstone; historical association only, not a causal or live risk model. |
| ERCOT grid demand | Demand peaks by summer hour; model accuracy changes across hour, load, and season. | ERCOT operator forecast remains benchmark. The team's results are retrospective and model information horizons need auditing before operational claims. |
| Capstone Project 3 | Bellevue University DSC 450 Fall Capstone placeholder. | No recycling details or invented results. |
| Amazon package picking | Boxes averaged 4.2 s; envelopes 5.6 s; work familiarity and bag density were explored visually. | Personally observed workflow; not a controlled or company-wide comparison. |
| Driver Gear Performance Lab | End-to-end multiclass pipeline in Streamlit, 34 engineered features, accuracy 0.682 and macro F1 0.662. | Internal test on synthetic data; not verified in real operations. |
| UNMC instructional media | Animation, interactive medical-terminology game, and visual learning tools. | Work samples; institutional permissions should be reviewed. |
| Studio S | Working scene inspector and coded/visual multitrack presentation workflow. | Still evolving; AI-first roadmap not described as fully delivered. |
| Mini Bookmaker | PDF page selection and print-sheet imposition in a desktop prototype. | Working prototype; printing depends on physical setup. |

## 3. Engineering details

- Stack: no framework or build step required: HTML5, CSS3, JavaScript, and GitHub Pages.
- Content and images are driven by `portfolio-data.js` for gallery consistency across homepage and detail pages.
- All image paths resolve relative to `data-root` to support nested folders. The original images are not replaced by stock illustrations or synthetic charts.
- Images have descriptive alt text. Gallery items open a focusable dialog with an original-image full-resolution link. The site supports keyboard project selection and a light/dark toggle.
- Existing school and personal routes remain intact; historical root project redirects retained.
- No API secrets, model artifacts, private data files, or local service dependencies included in the web package.

## 4. Testing & limitations

Validation completed before packaging: static link resolution passed, the 32 registered figure paths exist, image decoding passed, and both JavaScript files passed `node --check`. An automated Chromium runtime test was **attempted** but local navigation was blocked by the execution environment; no full browser-rendered screenshot is claimed. You should verify browser rendering after GitHub Pages deployment using `docs/INSTALLATION.md`.

The package includes a reusable validation script (`python3 tools/validate_portfolio.py`) and a browser-only deployment checklist. The key checks are:
1. No obsolete branding tokens anywhere in source files.
2. Every figure listed in `portfolio-data.js` exists inside the package.
3. Every internal HTML link resolves to a file in the published root structure.
4. Subfolder pages load full-size images through the corrected root path.
5. JavaScript syntax and basic UI tests (project selector, dark mode, figure enlargement).
6. The website can run from `http://localhost:8000/` without a build step.

**Known caveats:** GitHub Pages deployment itself is controlled by the repository owner. Any official UNMC logos, learning assets, third-party marks and internal artifacts must be cleared for public use. The user-supplied profile image is published as provided (optimized for size); remove it from GitHub if it should not be public.

## 5. Publication and maintenance

Follow `INSTALLATION.md` for one browser-based upload/commit. After publication, test nested NOAA and ERCOT pages first, then all other galleries. Future updates should change `portfolio-data.js` and add a matching file under `figures/` rather than editing gallery HTML by hand. Reference filenames using lowercase hyphenated paths to avoid spacing/encoding mistakes.
