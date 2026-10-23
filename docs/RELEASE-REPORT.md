# Matthew Scarpello Portfolio — Extraordinary Final Release

## What changed in this release

This release refines the portfolio into a cleaner final presentation and strengthens two major areas: the homepage structure and the Amazon pick-time project.

### 1. Homepage redesign
- Removed the previous featured NOAA chart section from the homepage.
- Rebuilt the homepage around one combined **Experiences** section that merges the earlier "Different experiences" idea with the category/context overview.
- Added three large preview cards for:
  - **School** — using the first page of the Amazon Workflow Efficiency Report.
  - **Work** — using a UNMC animation scene.
  - **Personal** — using a Studio S preview.
- Styled the preview cards with a more atmospheric, smoky visual treatment.
- Kept the interactive school-project selector so the homepage still shows real figures and project depth.

### 2. Amazon pick-time project expansion
- Added the full **Amazon Workflow Efficiency Report** to the project page.
- Added a direct PDF open/download area plus an embedded PDF viewer.
- Added a structured written breakdown of the report so visitors can understand the logic of the project without needing to infer it from charts alone.
- Used the first page of the report as a portfolio preview image.

### 3. Content and file updates
- Preserved the playable Lab Rat integration and the GitHub Actions publishing workflow.
- Updated asset version strings to avoid stale-cache issues after deployment.
- Updated the downloadable Amazon report inside the portfolio package.

## What to check after deployment
1. Open the homepage and confirm the new Experiences section appears directly under the hero.
2. Confirm the old featured NOAA chart no longer appears on the home page.
3. Open the Amazon pick-time project page and verify:
   - the report cover shows,
   - the PDF opens in a new tab,
   - the embedded PDF loads,
   - the breakdown cards are readable on desktop and mobile.
4. Confirm GitHub Pages has finished publishing before judging missing assets.
5. Hard refresh the browser if you still see the old version.

## Files most affected
- `index.html`
- `school/amazon-pick-times.html`
- `style.css`
- `figures/amazon-report-cover.png`
- `downloads/amazon-workflow-efficiency-report.pdf`
