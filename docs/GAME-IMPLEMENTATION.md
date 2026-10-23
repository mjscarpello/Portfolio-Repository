# Lab Rat Revolt — Game Implementation Report

## Materials examined

1. `LAB RAT ESCAPE final 09.13.24.story` — Articulate Storyline authoring project supplied privately, filename dated September 2024; ZIP-format internal package with `story/story.xml`, 29 authored slide XML records, media, and relationships.
2. `Lab Rat Revolt.zip` — a **different, web-published HTML5** Storyline package. The internal `meta.xml` identifies the title **Lab Rat Revolt**, publication timestamp **May 5, 2025**, 30 slides, approx. 22 minutes of timeline content, and the credit **Produced by Matthew Scarpello / Supported by the UNMC e-learning team**. The correct browser entry point is `story.html`.

The separate source and publication dates mean the page must not suggest the 2024 authoring project and 2025 web export are identical builds.

## Programming evidence

The `.story` authoring XML contains authentic project variables including `playerHEALTH`, `BOSSHEALTH`, `SHOPpts`, `levelTRACKER`, `PROGRESS`, `RATSsaved`, `WORDpartCORRECT`, `meaningCORRECT`, and `QUESTIONTIME`. These are used as evidence for interaction-state concepts, not attributed to a fictitious JavaScript class hierarchy.

The web export also contains `story_content/triggers.js`, which includes **200 generated event-handler functions** (`window.Script1`, etc.) calling Storyline object animation APIs. This is evidence of object-targeted scripted animations, but it does not prove hand-coded ES6 classes or handcrafted object-oriented architecture in the generated player.

The project page accurately describes learning-by-doing, variables, feedback, and object/state logic as your early introduction to object-oriented thinking, subject to any specific details you want to add about code you personally wrote.

## Hosting

The original game ZIP holds ~1,000 web-player files and takes ~24 MB compressed. GitHub's **browser** uploader accepts at most **100 files per upload**, so the release includes the web-published files in one ZIP. `.github/workflows/pages.yml` runs `tools/build_portfolio.py`, extracts the Storyline files to `_site/demos/lab-rat-revolt/`, and publishes `_site` via GitHub Pages Actions.

The Storyline source file `.story` is **not** published, preserving the editable source and reducing accidental disclosure.

## QA and remaining checks

- ZIP integrity and per-file CRC checks passed after repackaging.
- Player `story.html`, HTML5 runtime bundles, images, media, and JS are present in the resulting website build.
- Portfolio image paths and external links should be verified after deployment.
- **Actual in-browser gameplay has not been confirmed in this environment**, whose browser restricts local file and localhost navigation. Test using live GitHub Pages, including audio, scoring, game progression, input buttons, reload behavior, and mobile/responsive sizing.
- Storyline web publication is typically untracked (no LMS/LRS reporting); this version does not collect or store portfolio-user scores.
- Obtain permission to publicly redistribute work-associated materials; a Review 360 link being shareable does not automatically grant redistribution rights.
