# Ordinary i | Matthew Scarpello's data science and creative portfolio

A lightweight, static portfolio for GitHub Pages, organized into three **actual directories**:

- `school/` — Five school and applied-learning projects, including **all three DSC 450 Fall Capstone entries** and two Amazon-related projects.
- `work/` — UNMC educational media, animation, teamwork, and technical experience.
- `personal/` — Studio S audiovisual presentation software and Mini Bookmaker.

The homepage and About page retain the original **Question. Analyze. Enjoy.** line, **Note 01**, and the UNMC / Amazon / healthcare experience bubbles.

## What is real, and what isn't

The 4 NOAA charts come from Group 1's DSC 450 Milestone 3 PowerPoint. The 10 ERCOT charts are unmodified PNG output bytes from `DSC450_ERCOT_Visualization_FULLnotebook(1).ipynb` supplied by Matthew. Sources and descriptions are in `docs/FIGURE-SOURCES.md`. The other projects deliberately show no invented graphs or screenshots. DSC 450 Project 3 is a neutral placeholder with **no recycling-project details**.

Modeling and evaluation captions deliberately distinguish reported evidence from operational guarantees. The ERCOT ensemble is a retrospective combination of exported model predictions, not a newly trained production forecast model.

## Quick upload to GitHub using Chrome (no Desktop required)

1. Download and unzip the latest complete site ZIP.
2. Open `https://github.com/theOrdinaryi/Portfolio-Repository` and make sure you are at the **root** of the `main` branch.
3. Save a backup from **Code → Download ZIP**.
4. Choose **Add file → Upload files**. Drag **the CONTENTS of the extracted folder**, not the folder itself. This must put `index.html`, `style.css`, `portfolio-data.js`, `school/`, `work/`, `personal/`, and `figures/` beside each other.
5. Review the file paths; commit with `Organize portfolio collections and add original ERCOT figures`.
6. Check the GitHub Pages deployment at `https://theordinaryi.github.io/Portfolio-Repository/`.

Read **`docs/GITHUB-INSTALLATION.md`** for every step and a verification checklist.

## Edit projects

- Edit project labels, summaries, tags, status, and chart captions in `portfolio-data.js`.
- Edit the short interpretation paragraphs in the individual HTML file for each project.
- Use `figures/` for actual notebook-exported charts and approved work screenshots.
- Add a `{ "src": "figures/filename.png", ... }` object to the right project's `figures` list in `portfolio-data.js` only **after** that exact filename is present.
- `script.js` renders the school-project selector and all project-gallery figures. No build step or external JavaScript dependency.
- `style.css` controls responsive layout, typography, and light/dark themes.

## Main directory tree

```text
Portfolio-Repository/
├── index.html               # Homepage: School / Work / Personal collections
├── about.html               # Personal profile and experience
├── portfolio-data.js        # All 8 projects, including real chart references
├── script.js                # Interactions and actual-image zoom dialog
├── style.css                # Responsive design
├── school/
│   ├── index.html
│   ├── noaa.html
│   ├── ercot.html
│   ├── capstone-three.html
│   ├── amazon-pick-times.html
│   └── weather-clothing.html
├── work/
│   ├── index.html
│   └── unmc.html
├── personal/
│   ├── index.html
│   ├── studio-s.html
│   └── mini-bookmaker.html
├── figures/                 # 4 original NOAA + 10 original ERCOT PNGs
├── docs/                    # Setup, source and follow-up figure checklists
├── tools/                   # Jupyter notebook PNG extraction utility
├── project-noaa.html       # Legacy link redirect only
├── project-ercot.html      # Legacy link redirect only
├── project-recycling.html  # Legacy link redirect to generic Project 3
├── .nojekyll
└── README.md
```

The three legacy root pages are small redirects to avoid breaking earlier bookmarks. `project-recycling.html` contains **no** recycling study or outcome claims; the redirect exists solely for backward compatibility.

## Content credit

DSC 450 is a Bellevue University Fall Capstone team course. On NOAA, the team roles were Matthew (Data Scientist), Andrea Barfield (Data Wrangler), and Hali Sarah Parsons (Visualizer/Presenter). On ERCOT, they were Sarah (Data Wrangler), Andrea (Data Scientist), and Matthew (Visualizer/Presenter). The team model series came from Andrea's predictions and Sarah's prepared demand data. ERCOT visual interpretation and exploratory blending reflect Matthew's notebook work.
