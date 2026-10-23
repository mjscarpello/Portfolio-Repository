# Complete GitHub update — Chrome only, one commit

**Target:** https://github.com/mjscarpello/Portfolio-Repository

## Before you begin

Your portfolio is currently published from an existing repository. This package is a **full replacement** including image files, not an extra nested project folder. It does not directly modify your GitHub account until you publish it.

### Step 1 — Save a backup
1. Open the repository link above; choose **Code** and confirm `main` is selected.
2. Click the green **Code** button → **Download ZIP**.
3. Rename the download `Portfolio-Repository-backup-before-photo-update.zip` and save it outside the folder containing this new release.
4. Do not delete the `.git` repository history. The ZIP backup is an extra independent copy.

### Step 2 — Extract the new release
1. Download `Matthew-Scarpello-Portfolio-Full-Update.zip` from this conversation.
2. Double-click it to extract the folder on your Mac.
3. Open that folder. **Inside** you should see `index.html`, `about.html`, `portfolio-data.js`, `script.js`, `style.css`, `README.md`, and the folders `assets`, `figures`, `downloads`, `docs`, `school`, `work`, and `personal`.
4. **Do not upload the outer release folder as one folder.** The files above must appear directly alongside `index.html` in the GitHub root.

### Step 3 — Upload through the GitHub website
1. Return to the GitHub repository `main` branch root. The breadcrumb must show only `Portfolio-Repository`.
2. Click **Add file → Upload files**. Depending on GitHub's current design, the Add file control may appear as a **+** icon next to Go to file / Code.
3. In Finder, open the new extracted release folder, select its **contents** (Command+A), and drag them into GitHub's upload area. File counts are usually greater than 40 due to authentic figures.
4. **Confirm** that GitHub shows paths like `index.html`, `assets/matthew-scarpello-portrait.jpg`, `figures/noaa-event-frequency.png`, and `school/noaa.html`. It must not show `Matthew-Scarpello-Portfolio-Full-Update/index.html` or any other extra parent directory.
5. If GitHub says files exist, review replacements. All four original root files and existing subpages should be updated. Do not accidentally rename existing files with `(1)` suffixes.
6. If there is a GitHub browser file-count/size error, use the fallback at the bottom rather than creating a nested upload.

### Step 4 — Commit once
1. Enter summary: `Update full portfolio with profile photo and authentic project media`.
2. Optional description: `Update the school, work, and personal collections; fix nested project image paths; replace outdated branding; add original research charts, project screenshots, and portfolio documentation.`
3. Select **Commit directly to the main branch**, then click **Commit changes**.
4. Return to the repository root and verify `index.html` is next to `assets/`, `figures/`, `school/`, `work/`, `personal/`, and `docs/`.

### Step 5 — Verify GitHub Pages
1. Open **Settings → Pages**.
2. Ensure source is **Deploy from a branch** with branch `main` and folder `/(root)` (if this is your existing setup).
3. Watch the repository **Actions** / deployments for completion.
4. Open the Pages URL shown in GitHub settings. For the current user/repo name, it is normally `https://mjscarpello.github.io/Portfolio-Repository/`.
5. Use Chrome reload (Command+Shift+R). Try a private browsing window if it still shows an older cached version.

### Step 6 — Test the pages and graphics
- Home: portrait visible; personal introduction, Note 01 and all five school projects appear.
- About: portrait and background story visible.
- School → NOAA: **all four charts load** and enlarge; this fixes the earlier `school/figures/...` bug.
- School → ERCOT: ten original images load.
- School → Amazon pick times: three plots load; the original PDF opens.
- School → Driver Gear: five app screenshots load and the accuracy metrics match the write-up.
- School → Project 3: a neutral Bellevue DSC 450 placeholder with no recycling details.
- Work → UNMC: six instructional/game stills load; no private materials are referenced.
- Personal → Studio S and Mini Bookmaker: application screenshots load.
- Test a narrow/mobile browser width, dark mode, arrow keys and image enlargement.

### A note on older files
This package keeps the prior `project-noaa.html`, `project-ercot.html`, and `project-recycling.html` redirect pages to avoid breaking historical links. No old-branding text remains in those redirects.

### Fallback if the GitHub browser upload won't replace files
A one-time upload from a Mac Terminal using `git` is a reliable alternative but is **not required** for normal use. The browser method above is preferred for your current workflow. If GitHub refuses overwrites or exceeds its upload limits, stop rather than deleting the live site; then use the command-line route or smaller root-level upload batches while retaining one final commit on a working branch.

### Rollback
1. GitHub's **History** on `main` preserves the previous commit.
2. To restore the prior version, revert your release commit via GitHub's user interface where available, or re-upload the saved pre-update backup to the repository root.
3. Keep the backup until all pages have been checked on GitHub Pages.
