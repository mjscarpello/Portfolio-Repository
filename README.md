# Ordinary i | Matthew Scarpello — Data Science Portfolio

A static, GitHub Pages-ready personal data science portfolio. Built from the original `Portfolio-Repository` identity and augmented with the actual charts from DSC 450 Group 1's NOAA presentation. **No stock art, invented figures, build process, external libraries, or API keys.**

**Live site (after updating the original repository):** https://theordinaryi.github.io/Portfolio-Repository/

## Start here

- **`docs/GITHUB-INSTALLATION.md`** — Full steps for backing up the existing GitHub repository, copying the complete replacement in one go, committing once, and publishing.
- **`docs/WHAT-TO-SEND-FOR-REAL-FIGURES.md`** — Exact files needed from the NOAA, ERCOT, and Recycling projects to include more original charts.
- **`docs/FIGURE-SOURCES.md`** — Provenance of the four original NOAA figures.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Personal introduction, Note 01, featured original graph, interactive three-project browser |
| `about.html` | Personal background, work-experience bubbles, skills, community goals |
| `project-noaa.html` | Completed milestone case study with four real charts, team attribution, verified reported metrics |
| `project-ercot.html` | ERCOT question/methodology and an empty gallery awaiting original notebook exports |
| `project-recycling.html` | Planned project page with no invented results |
| `style.css` | Light/dark design and mobile-responsive layout |
| `portfolio-data.js` | Projects, status, links, captions, and actual figure paths in one editable file |
| `script.js` | Project switching, zoom dialog, figure gallery, keyboard controls, dark-mode preference |
| `figures/` | Actual original figure files |
| `tools/extract_notebook_figures.py` | Optional script to extract embedded output images from executed `.ipynb` notebooks |

This is a **static website**; the HTML, CSS, and JS are served directly from the repo's root folder. Do not upload the ZIP itself into GitHub expecting it to unpack. Upload the **files inside** it.

## Personal identity retained

- "Question. Analyze. Enjoy."
- Neuroscience-to-data-science background and emphasis on civic life, human impact, and curiosity.
- "NOTE 01" and the description of combining varied experiences with practical data science and creativity.
- UNMC E-Learning Intern, Amazon Delivery Driver, Healthcare CNA.
- Minimal warm-neutral design; no generic "The Process" panel.

## Content integrity

NOAA charts were extracted from the team's PowerPoint as unmodified image bytes, and NOAA performance values are explicitly identified as reported team results. ERCOT and Recycling case-study galleries are deliberately empty until the original chart files are supplied and validated. The website does not claim individual ownership of the full team's work.

## Changing content later

Edit `portfolio-data.js` after adding real chart images to `figures/`. To publish again, commit and push. Do not alter the filenames, image paths, or JS data structure casually. To edit biography copy, edit `index.html` or `about.html`.
