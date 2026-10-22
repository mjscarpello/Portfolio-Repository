# Replace Portfolio-Repository in ONE update (GitHub Desktop on Mac)

**Goal:** replace the four files currently on `main` with a complete working portfolio in **one single Git commit**, preserving the option to return to the old version.

Repository: https://github.com/theOrdinaryi/Portfolio-Repository
Live site: https://theordinaryi.github.io/Portfolio-Repository/

**Your live repo currently contains** `index.html`, `about.html`, `style.css`, and `README.md`. The new website retains those names, adds shared JavaScript, three individual project pages, four original NOAA research figures, and documentation. The ZIP's root folder is already the desired final layout.

## A. Back up the existing live site (before changing anything)

1. Open **https://github.com/theOrdinaryi/Portfolio-Repository** in your browser and sign in.
2. Above the file list, confirm the branch selector says **`main`**. If not, switch to `main`.
3. Click the green **Code** button → **Download ZIP**.
4. In Finder → Downloads, rename that ZIP to **`Portfolio-Repository-BACKUP-before-full-update.zip`**.
5. Move it to a safe place, such as a folder named `Portfolio Backup` in Documents. Do **not** put this backup ZIP inside your GitHub repository folder.
6. Optional but recommended: also save a screenshot of the current live homepage.

**Do not delete the GitHub repository.** Git retains old commits, so you can also restore previous versions from the commit history.

## B. Obtain the new website files

1. Download **`Portfolio-Repository-Complete-Update.zip`** from this ChatGPT conversation.
2. In Finder, double-click the ZIP to extract it.
3. Open the extracted **`Portfolio-Repository-Complete-Update`** folder.
4. Verify you can directly see `index.html`, `about.html`, `style.css`, `script.js`, `portfolio-data.js`, `README.md`, and the `figures`/`docs`/`tools` folders.
5. **Important:** these are the files to copy. Do not copy the containing `Portfolio-Repository-Complete-Update` folder *as a folder inside* the repository. Doing that would leave your homepage at the wrong level.

## C. Open the current GitHub repository on your Mac

1. Open **GitHub Desktop** and sign in to the GitHub account that owns `theOrdinaryi/Portfolio-Repository`.
2. If you have not cloned the repo yet: select **File → Clone Repository...** → **GitHub.com** tab → choose **`theOrdinaryi/Portfolio-Repository`** → **Clone**.
3. If already cloned, select it from the **Current Repository** menu.
4. At the top, click **Current Branch** and choose **`main`**.
5. Click **Fetch origin**. If GitHub Desktop offers **Pull origin**, click **Pull origin** first to make sure your Mac copy matches the latest GitHub version.
6. Click **Repository → Show in Finder**. This opens your working repository directory, which should contain `index.html`, `about.html`, `style.css`, `README.md`, and a hidden `.git` folder.
7. **Never erase the `.git` folder**. That folder is what makes the local directory a Git repository.

## D. Replace EVERYTHING together (no staged commits)

You should now have **two Finder windows** open: 
- Window 1: extracted `Portfolio-Repository-Complete-Update` (the NEW website).
- Window 2: cloned `Portfolio-Repository` (the existing local Git repository).

1. In Window 1, press **Command+Shift+.** to show hidden files, including `.nojekyll`. Then press **Command+A** to select the extracted website's files and folders.
2. Copy with **Command+C**.
3. Switch to Window 2 and press **Command+V**.
4. When macOS asks whether to replace files with matching names, choose **Replace** (or **Apply to All → Replace**, if offered).
5. Verify that Window 2's root now shows these files:

```
Portfolio-Repository/                       ← GitHub repository ROOT
├── .git/                                  ← existing hidden Git history (DO NOT TOUCH)
├── .nojekyll                               ← hidden, okay if Finder hides it
├── README.md
├── index.html
├── about.html
├── style.css
├── script.js
├── portfolio-data.js
├── project-noaa.html
├── project-ercot.html
├── project-recycling.html
├── figures/
│   ├── noaa-event-frequency.png
│   ├── noaa-economic-damage.png
│   ├── noaa-precision-recall.png
│   ├── noaa-feature-importance.png
│   └── README.md
├── docs/
│   ├── GITHUB-INSTALLATION.md
│   ├── WHAT-TO-SEND-FOR-REAL-FIGURES.md
│   └── FIGURE-SOURCES.md
└── tools/
    └── extract_notebook_figures.py
```

6. If you don't see `.nojekyll`, Finder hides dot-files by default. Press **Command+Shift+.** to toggle hidden files and confirm it copied. GitHub Pages can work without `.nojekyll` for this simple site, but it is included intentionally.
7. Do **not** delete/overwrite `.git`, and do **not** paste the downloaded ZIP itself into your repo.
8. Do **not** copy old `assets/` from the rejected designs. All graphics on this site are original NOAA charts inside `figures/`. There are **no** stock SVG illustration assets.

The replacement is one *set of local file operations*. GitHub Desktop will show it as changes **until you make a single commit**.

## E. Test locally before publishing

1. Open **Terminal** on your Mac.
2. In Terminal, type `cd ` with a space after it. From Finder, drag the cloned `Portfolio-Repository` folder into the Terminal window to insert the correct path. Press Return.
3. Start a local web server:

```bash
python3 -m http.server 8000
```

4. In Chrome or Safari, visit **http://localhost:8000/**. If port 8000 is busy, run `python3 -m http.server 8001` and use http://localhost:8001/ instead.
5. Test the checklist below. Stop the server afterward with **Control+C**.

**Before you commit, confirm:**

- [ ] Homepage opens and shows `Question. Analyze. Enjoy.`
- [ ] Note 01 and the three personal work-experience tags are intact
- [ ] Featured NOAA chart is the **actual** bar chart, not a sample illustration
- [ ] All three project buttons select the correct research question
- [ ] Next/previous project controls and keyboard arrows work
- [ ] The NOAA carousel displays **all four original charts**
- [ ] Clicking a chart opens a larger version; Close and Escape work
- [ ] About page and three case-study pages load correctly
- [ ] ERCOT and Recycling explicitly show that original charts are still pending
- [ ] Dark-mode button works; reload the page to confirm the saved preference
- [ ] A narrow/mobile browser width does not cause sideways scrolling

## F. Commit all updates as ONE meaningful change

1. Return to **GitHub Desktop**.
2. Look at the **Changes** tab (left). You should see existing files marked as **Modified** and new files marked as **Added**.
3. Review the file names. You should NOT see a nested `Portfolio-Repository-Complete-Update/` path or random `.DS_Store` files.
4. Make sure **all intended files are checked** in the Changes panel. GitHub Desktop commits only the checked files.
5. In the lower-left **Summary (required)** field, type:

   `Redesign portfolio with original project visualizations`

6. In **Description** (optional), paste:

   `Preserve the personal homepage and Note 01, add interactive project case studies, and include four original NOAA figures with source attribution. Prepare ERCOT and Recycling galleries for verified notebook exports.`

7. Click **Commit to main**. This creates **one local commit** containing the entire update.
8. Click **Push origin** near the top to send the commit to GitHub.
9. Once pushed, go to https://github.com/theOrdinaryi/Portfolio-Repository and confirm you see the new `project-noaa.html`, `portfolio-data.js`, `script.js`, and `figures/` on `main`.

**Commit versus push:** "Commit" records a local snapshot. "Push origin" sends that snapshot to GitHub and can trigger GitHub Pages deployment.

## G. Publish with GitHub Pages

1. Open the repository on GitHub → **Settings** → **Pages** in the left-hand menu.
2. Under **Build and deployment**, select **Deploy from a branch** if using branch deployment.
3. Set branch **`main`** and folder **`/(root)`**. Click **Save** if changed.
4. Open the repository **Actions** tab and look for the Pages build/deploy run. A successful run confirms the deploy completed. This can take a few minutes.
5. Open **https://theordinaryi.github.io/Portfolio-Repository/** and hard-refresh the page (Mac Chrome: Command+Shift+R). Check the live case-study URLs, e.g. `/Portfolio-Repository/project-noaa.html`.
6. If the page shows the old version, verify the newest commit is on `main`, Pages is pointing at `main` root, the deployment succeeded, and clear the browser cache.

## H. How to fix or reverse a mistake

- **Before committing:** In GitHub Desktop's Changes tab, you can right-click a file and choose to discard that file's uncommitted changes. **Warning:** discard irreversibly erases those local changes; keep the new extracted ZIP as your source first.
- **After committing but before pushing:** Use GitHub Desktop's History tab to inspect the commit. Reverting a commit adds a new commit that reverses its changes.
- **After pushing:** GitHub Desktop's History tab → right-click the V4 commit → **Revert this commit** (if available), then **Push origin** to restore the earlier published state. Alternatively restore from the backed-up files in another commit.
- **If the entire website ended up in a subfolder:** Move its files out of the nested folder into the clone's root, commit that fix, and push. GitHub Pages expects `index.html` at the deployment root.

## I. Next update when you provide ERCOT/Recycling images

You can install and publish this website **today** with the four NOAA images. When you provide the original ERCOT and Recycling notebook visuals, we will only add selected `figures/...` files and update the relevant `figures` arrays in `portfolio-data.js`. The home carousel and the case-study gallery will populate automatically. See `WHAT-TO-SEND-FOR-REAL-FIGURES.md`.
