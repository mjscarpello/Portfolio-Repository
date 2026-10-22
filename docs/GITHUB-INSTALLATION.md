# Replace your current GitHub Pages portfolio using only the GitHub website

This method updates **everything in one upload and one commit**. You do not need GitHub Desktop or Terminal. Your existing public repository is `theOrdinaryi/Portfolio-Repository` on branch `main`.

## Before you begin

1. Sign in to GitHub in your browser.
2. Open https://github.com/theOrdinaryi/Portfolio-Repository .
3. At the upper left of the file list, make sure the branch selector says **main**.
4. Click the **Code** button and choose **Download ZIP**. Save this original backup somewhere easy to find (for example, in a folder named `portfolio-backup-2026-10-22`).
5. Download the **new** ZIP supplied by ChatGPT. Double-click the new ZIP in Finder to extract it.

## Important: do not create a nested folder again

At the **top level** of your GitHub repository, your new `index.html` should be immediately visible. Other top-level entries should include `about.html`, `style.css`, `script.js`, `portfolio-data.js`, `school`, `work`, `personal`, and `figures`.

**Wrong:** `Portfolio-Repository/Portfolio-Complete-Update/index.html`.

**Right:** `Portfolio-Repository/index.html`.

You are going to upload **everything INSIDE the extracted ZIP folder**, not the enclosing folder itself.

## Upload and replace in one commit

1. Stay in the **root** of your GitHub repository (where you can already see `README.md` and `index.html`). Do **not** open an existing subfolder first.
2. Click **Add file → Upload files**. Depending on GitHub's interface, the action can also be opened using the **+** button near **Go to file**.
3. In Finder, open the new extracted website folder. Use **Command + Shift + .** if you want hidden `.nojekyll` to appear.
4. Select the contents (`Command + A`) and drag **the selection** into GitHub's upload area. Do not drag the enclosing folder.
5. Verify that file paths are listed as `index.html`, `school/noaa.html`, `work/unmc.html`, `personal/studio-s.html`, `figures/ercot-demand-month-hour.png`, etc. Existing filenames in the same location should be updated by this commit.
6. Before committing, confirm that **none** of the file paths begin with `Portfolio-Repository-main`, `Portfolio-Repository-Complete-Update`, `site`, or another extra outer folder name.
7. In the commit-message field enter **`Organize portfolio collections and add original ERCOT figures`**.
8. Choose the option to commit directly to **main**, then click **Commit changes** (the wording may be different in GitHub's current interface).
9. Return to the root folder. Verify `index.html`, `portfolio-data.js`, `school/`, `work/`, `personal/`, and `figures/` now appear at the same level.

**If GitHub reports a file conflict or refuses a replacement:** Stop and inspect the upload list. Do not delete your entire repository to fix it. For a conflicting text file, open that file in GitHub, choose the pencil (Edit), paste in the new contents, and commit. If the browser refuses a folder upload, add the folders/files in smaller groups, making sure the paths are preserved. This is an interface fallback; the preferred flow remains one upload.

## Check the deployment

1. Open your repository's **Settings → Pages**.
2. Under Build and deployment choose **Deploy from a branch**, `main`, folder **/(root)** (unless these are already set correctly).
3. Open the **Actions** tab to verify a completed GitHub Pages deployment.
4. Open https://theordinaryi.github.io/Portfolio-Repository/ and hard-refresh with **Command + Shift + R**.

## Verify these pages and features

- [ ] The homepage says **Question. Analyze. Enjoy.** and shows Note 01 plus work-experience bubbles.
- [ ] Navigation has **School**, **Work**, and **Personal** links.
- [ ] School selector shows **5** projects: NOAA, ERCOT, Capstone Project 3, Amazon Pick Times, and Weather/Clothing.
- [ ] **All three** capstone entries explicitly mention Bellevue University and DSC 450 Fall Capstone.
- [ ] Capstone Project 3 shows a neutral placeholder with no recycling study text.
- [ ] NOAA charts open and enlarge.
- [ ] ERCOT shows the real saved heatmaps, model-comparison chart, and exploratory blend figures.
- [ ] The UNMC project is in the Work collection.
- [ ] Studio S and Mini Bookmaker are in Personal.
- [ ] Dark-mode toggle works; cards and galleries fit your phone.

## Updating original project visuals later

Place new PNGs in `figures/`. Then edit `portfolio-data.js` for the matching project to add filename, descriptive title, accessibility `alt`, and a precise caption. Only use actual figures and permitted media. Read `docs/WHAT-TO-SEND-FOR-REAL-FIGURES.md`.

## A note about one commit

A single commit is a reasonable choice for this complete redesign. Future improvements can be smaller commits such as `Add original Amazon pick-time violin chart` or `Add approved UNMC instructional animation screenshots`. GitHub retains the old versions in commit history; your downloaded ZIP is extra insurance.
