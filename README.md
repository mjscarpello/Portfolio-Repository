# Matthew Scarpello | Data Science & Creative Technology Portfolio

**Question. Analyze. Enjoy.**

A personal portfolio documenting my work across **data science, educational technology, and independent software development**. I began in neuroscience and healthcare, and I am now applying that scientific curiosity to predictive modeling, visual storytelling, and tools that make complicated ideas easier to understand.

**Live site:** [mjscarpello.github.io/Portfolio-Repository](https://mjscarpello.github.io/Portfolio-Repository/)  
**Repository:** [github.com/mjscarpello/Portfolio-Repository](https://github.com/mjscarpello/Portfolio-Repository)

> The website is designed around original evidence: real project figures, actual app screenshots, and, where appropriate, playable or downloadable work. Projects are presented with clear contributions, results, and limitations rather than illustrative placeholder charts.

## Overview

> **Portrait palette and interactive figures:** A navy-and-white foundation with independently applied sky, cobalt, copper, orange, coral, gold and foliage accents now spans the portfolio. Hover or focus a moving project figure to find links to its case study and exact original image. See [Photo palette and hover notes](docs/PHOTO-PALETTE-COLLAGE.md).


> **Homepage redesign (November 2026, draft):** A smaller editable personal headline, ambient moving collage of real School / Work / Personal project images, and a distinct three-pillar browsing section. The collage scrolls continuously downward, selects real project figures randomly on each visit, and fades into the pillars. There is no pause button; system reduced-motion preferences remain respected. Implementation details and complete source map: [Homepage Collage Review](docs/HOME-COLLAGE-REVIEW.md).


> **November 2026 refinement:** The homepage was consolidated into a single three-pillar explorer, the About page became a concise résumé with project-linked skills, and Project 3 was updated to reflect ongoing NYC dry-recycling data wrangling. The existing project findings, figures, and playable game are preserved. The color palette now uses warm terracotta accents in light and dark themes.


The homepage introduces my background and then brings together three dimensions of my experience. Its **Experiences** section uses one interactive explorer for three collections: School, Work, and Personal. Visitors can select a pillar, browse individual projects, inspect an original project figure or screenshot, and open either the selected case study or its full collection.

The homepage now focuses on the work, while the About & Résumé page retains the personal portrait, a concise professional history, demonstrated skills linked to project evidence, and a horizontally browsable project reel. The case studies retain their original evidence, sources, and limitations.

## Projects

### School projects

| Project | What I did | Evidence and status |
| --- | --- | --- |
| [Predicting Economic Damage from Severe Weather](school/noaa.html) | Used NOAA storm-event characteristics to predict whether an event had recorded economic damage. I served as Data Scientist on the DSC 450 Group 1 team. | Bellevue University **DSC 450 Fall Capstone, Project 1**. Team Random Forest evaluation: **0.880 ROC-AUC** and **0.669 Average Precision**; four original presentation figures. |
| [Forecasting Regional Electricity Demand](school/ercot.html) | Developed visual analyses of ERCOT demand, seasonality, model errors, and an exploratory SARIMA/XGBoost blend. I served as Data Visualizer and Presenter. | Bellevue University **DSC 450 Fall Capstone, Project 2**. Ten original figures; ERCOT's published forecast remained the stronger retrospective benchmark. |
| [NYC Dry Recycling Across Communities](school/capstone-three.html) | Preparing NYC collection and community-indicator datasets for analysis as Group 1's Data Wrangler. | Bellevue University **DSC 450 Fall Capstone, Project 3**. **In progress:** no unverified model findings are presented. |
| [Amazon Package Pick-Time Efficiency](school/amazon-pick-times.html) | Collected and visualized package search times from my own Amazon delivery workflow, comparing package type, week, route sequence, and bag density. | Completed visual report with original charts, a report breakdown, and a full downloadable/embedded PDF. |
| [Driver Gear Performance Lab](school/weather-clothing.html) | Built a Streamlit app that uses weather and route inputs with a tuned Random Forest pipeline to recommend a driver shirt category. | Bellevue University **DSC 355 Predictive Analytics**. **34 model features**, **0.682 accuracy**, **0.662 macro F1** in the supplied evaluation; five actual app screenshots. |

#### Amazon pick-time report: reading the full analysis

The [Amazon case study](school/amazon-pick-times.html) includes the complete [Amazon Workflow Efficiency Report (PDF)](downloads/amazon-workflow-efficiency-report.pdf), its first-page preview, an in-page PDF viewer (browser-dependent), and a written section-by-section guide. The report is built as a sequence of seven figures:

1. **Package-type distributions:** boxes averaged **4.2 seconds** per pick, compared with **5.6 seconds** for envelopes.
2. **Weekly distributions:** mirrored histograms show how search times changed over four weeks.
3. **Rolling route performance:** a 12-pick rolling mean finished the highlighted route at **3.9 seconds**, compared with a **6-second** reference.
4. **Daily workload share:** time spent searching for boxes versus envelopes on the highlighted day.
5. **Bag-level patterns:** individual bags show how search behavior changes as inventory is removed.
6. **Full-month bag-density trends:** a broader check on whether the bag-level pattern persists.
7. **Monthly workload share:** the cumulative time spent on different package types.

These are **observational data from my own workflow**, not an official Amazon dataset or a controlled experiment. The case study makes that distinction explicitly.

### Work projects

| Project | Focus | What visitors can explore |
| --- | --- | --- |
| [Learning Media & Collaboration at UNMC](work/unmc.html) | Educational animation, instructional media, teamwork, and communicating health-science topics. | Original UNMC work-sample frames and a description of my e-learning internship contributions. |
| [Lab Rat Revolt — Medical Terminology Game](work/lab-rat-revolt.html) | Interactive medical vocabulary challenges, game-state variables, progression, and object-based interaction logic. | **Playable Storyline HTML5 game**, screenshots, and an implementation discussion based on source-file evidence. |

**Lab Rat note:** The playable web export is titled *Lab Rat Revolt* (2025); a separately supplied earlier editable Storyline project is titled *Lab Rat Escape* (2024). They are not presented as identical releases. The portfolio describes actual Storyline variables, triggers, and JavaScript animations; it does **not** imply the web player was entirely hand-coded or that conventional JavaScript class definitions were verified. The private `.story` authoring file is **not** published.

### Personal projects

| Project | Focus | Current state |
| --- | --- | --- |
| [Studio S — Code-Driven Presentation Studio](personal/studio-s.html) | A desktop editor connecting scenes, code-defined composition, narration, captions, audiovisual cues, and timeline controls. | **Active prototype**, with screenshots from a real ERCOT presentation workflow. Ambitious AI-first orchestration is an ongoing direction, not a fully completed claim. |
| [Mini Bookmaker](personal/mini-bookmaker.html) | Select, arrange, and impose PDF pages onto print-ready sheets for physical miniature books. | **Working v2.1 prototype**, including a page-selector interface and front/back sheet previews. |

## Features

- **Unified three-pillar explorer:** School, Work, and Personal projects with authentic visual previews and direct case-study links.
- **Category and project navigation:** selectable category tabs, a per-category project list, keyboard navigation and previous/next buttons. On narrow screens the project list includes swipe/scroll cues and horizontal scrolling controls. At the end of a category, the Next button advances to the next pillar (School → Work → Personal → School).
- **Original figure galleries:** captions, accessible image descriptions, and enlarged views of the actual source images.
- **Case-study pages:** concise questions, contributions, reported results, and limitations.
- **Full Amazon report:** downloadable PDF, embedded reader, and written figure-by-figure breakdown.
- **Playable Lab Rat game:** embedded on demand, with a separate full-page play option.
- **Responsive layout:** desktop and mobile arrangements with a light/dark preference toggle.
- **Static GitHub Pages deployment:** no application server is required to browse the published portfolio.

## Technology

The portfolio itself uses **HTML5**, **CSS3**, and **vanilla JavaScript**. `portfolio-data.js` stores project metadata, captions, and image paths. No Node.js dependency installation or front-end framework is required to build the website.

The included projects use other technologies, including **Python**, **R/ggplot2**, **SQL**, **scikit-learn**, **Streamlit**, **SARIMA/XGBoost**, **Electron**, **Canvas**, **Vyond**, and **Articulate Storyline**, as appropriate to the individual project. Those separate applications and models are showcased, not generally executed by the static portfolio site.

### Repository layout

| Path | Purpose |
| --- | --- |
| `index.html` | Concise introduction and unified interactive School / Work / Personal project explorer. |
| `about.html` | Background, portrait, résumé, evidence-linked skills, and horizontal project reel. |
| `school/` | Five academic/applied project pages and collection overview. |
| `work/` | UNMC work samples and the playable Lab Rat project page. |
| `personal/` | Studio S and Mini Bookmaker project pages. |
| `figures/` | Original charts, screenshots, and the Amazon report-cover image. |
| `assets/` | Personal portrait and other site media. |
| `downloads/` | Full Amazon report PDF. |
| `portfolio-data.js` | Project titles, roles, summaries, status, tags, figure paths, and captions. |
| `script.js` | Pillar explorer, project reel, figure dialogs, and appearance toggle. |
| `style.css` | Visual design, responsive layouts, atmosphere effects, and component styling. |
| `game-source/lab-rat-revolt-web.zip` | Packaged, web-published Storyline game files. |
| `.github/workflows/pages.yml` | GitHub Actions build and Pages deployment workflow. |
| `tools/build_portfolio.py` | Builds `_site/` and unpacks the game's web assets for deployment. |
| `tools/validate_portfolio.py` | Checks project pages, gallery assets, local HTML references, and old-branding strings. |
| `docs/` | Installation, game implementation, media provenance, and release information. |

Legacy top-level `project-noaa.html`, `project-ercot.html`, and `project-recycling.html` routes are retained for compatibility and redirect visitors to the current case-study locations. The third capstone page describes current NYC recycling data-wrangling responsibilities without asserting final results.

## Run locally

Requirements: **Python 3** and a modern browser. From the repository root:

```bash
# Check references and source assets.
python3 tools/validate_portfolio.py

# Assemble the same static site published by GitHub Actions.
python3 tools/build_portfolio.py

# Preview the built site, including the extracted Storyline player.
python3 -m http.server 8000 --directory _site
```

Visit **http://localhost:8000/**. Stop the server with **Control+C**.

**Why build first?** The playable game is intentionally stored as one ZIP in the source repository. Opening `index.html` directly or serving the repository root does not unpack the game. `build_portfolio.py` creates `_site/demos/lab-rat-revolt/story.html` and its supporting assets. Testing the `_site` output most closely matches the published site.

## Publish to GitHub Pages

This repository uses **GitHub Actions**, rather than GitHub Pages' basic "Deploy from a branch" mode, because the HTML5 game must be extracted during the build.

1. Save a backup of the existing repository. On GitHub, use **Code → Download ZIP** before major replacements.
2. Copy or upload the **contents** of the site release to the repository's top level, alongside `index.html`. Do not place the files inside an extra parent folder.
3. Include the hidden `.github/` folder, `.nojekyll`, `game-source/lab-rat-revolt-web.zip`, and `tools/` scripts. On a Mac, **Command+Shift+.** reveals hidden files in Finder.
4. Commit the changes to `main`, or merge an approved pull request into `main`.
5. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
6. Check the **Actions** tab for the workflow **Publish Matthew Scarpello portfolio with playable Lab Rat game**. Once it succeeds, open the live site.

The workflow checks out the source, runs `tools/build_portfolio.py`, uploads `_site`, and deploys it using GitHub's Pages action. No private Storyline authoring file is required.

### Deployment checks

- Homepage displays all three pillars and shows original project figures when selecting projects.
- NOAA and ERCOT galleries load their original graphs without broken-image icons.
- Amazon case study displays its report cover, PDF link, in-page reader (if supported), and report breakdown.
- Lab Rat game starts, plays audio, registers choices, progresses between activities, and works after a page reload.
- Project links, light/dark mode, and narrow-screen layouts behave as expected.

If the website still looks like an older release, confirm the latest Actions run succeeded and hard-refresh the browser (on Mac Chrome, **Command+Shift+R**). The complete game flow requires a live browser test; a successful static build by itself is not proof of all gameplay behavior.

## Updating the site

- **Edit text or existing gallery content:** modify the relevant entry in `portfolio-data.js` and verify its `page` and `figures[].src` paths.
- **Add or replace a graph:** put the original image in `figures/`, then register its filename, title, alt text, and caption in `portfolio-data.js`.
- **Revise a detailed case-study narrative:** edit the corresponding file under `school/`, `work/`, or `personal/`.
- **Change the three homepage experience previews or their labels:** edit `index.html`. Those cards are authored directly in HTML, rather than automatically generated by `portfolio-data.js`.
- **Adjust layout and styles:** edit `style.css`, respecting mobile layouts and reduced-motion preferences.
- **Revise the Amazon report:** update `downloads/amazon-workflow-efficiency-report.pdf` and its preview at `figures/amazon-report-cover.png` together.
- **Update the game:** replace only the **authorized, web-published** ZIP at `game-source/lab-rat-revolt-web.zip`. The archive must retain the top-level `Lab Rat Revolt/` directory expected by the build script.
- **Validate before publishing:** run `python3 tools/validate_portfolio.py` and `python3 tools/build_portfolio.py`, then check the pages in a browser.

For background on the figures and work samples, see [Asset Manifest](docs/ASSET-MANIFEST.md). For the playable game and source distinctions, see [Game Implementation](docs/GAME-IMPLEMENTATION.md). For changes in the latest homepage/report redesign, see [Release Report](docs/RELEASE-REPORT.md).

## Attribution, privacy, and limitations

- **Capstone contributions:** The NOAA and ERCOT material was developed with my DSC 450 Group 1 teammates. The case studies identify my role and do not claim sole authorship of team models or results.
- **Model results:** Reported metrics belong to specific historical experiments. The Driver Gear evaluation used synthetic training data, and the ERCOT blending analysis is retrospective; neither should be presented as validated operational performance.
- **Employer work samples:** UNMC-related media, marks, and the Storyline game may be subject to institutional or third-party rights. Public publication and redistribution should be confirmed with the rights holders before hosting. Amazon and other organizations mentioned are project contexts, not sponsors or endorsers.
- **Personal media:** My portfolio photograph is displayed publicly. No private student or institutional dataset is intentionally bundled as part of the website.
- **Playable game source:** The editable Storyline `.story` project is not included. The published web export does not establish handwritten JavaScript class architecture and is described accordingly.
- **Licensing:** No open-source license is granted by this README. Rights to images, reports, game content, code, trademarks, and institutional samples may differ. Contact the appropriate rights holder before reusing those materials.

## Contact

**Matthew Scarpello**  
GitHub: [@mjscarpello](https://github.com/mjscarpello)  
Portfolio: [mjscarpello.github.io/Portfolio-Repository](https://mjscarpello.github.io/Portfolio-Repository/)

*Science, creativity, practical experience, and a willingness to keep learning all contribute to the work I make.*
