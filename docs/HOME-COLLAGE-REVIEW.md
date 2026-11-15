# Homepage collage v2: continuous downward motion

**Baseline:** main at d453964cfbc98a26825e87b659e422009624cdee
**Development branch:** feature/home-downward-infinite-collage

## Problem corrected
The earlier animation moved each image column only about 11–20 pixels in 77–109 seconds. It also stopped early when the visitor scrolled. A manual pause button saved its state, potentially leaving the collage stationary on later visits.

## Implementation
Three columns now move continuously from the top of the hero to the bottom. Each contains two identical sequences of five authentic project images. The CSS animation translates their two-part track from -50% to 0% using linear, infinite timing, so there is no visible jump when the animation repeats. Durations are 37, 43 and 40 seconds for an obvious medium-slow downward movement.

On each page load, JavaScript selects 15 distinct figures randomly from a curated set of 22 project files registered in portfolio-data.js. Every lane contains at least one School, Work and Personal image. No generated or external replacement images are used.

On desktop the collage spans the whole hero height. A bottom gradient fades imagery into the transition band. Near the end of a manual page scroll, the artwork blurs and fades while continuing to move downward. Movement stops only after the hero leaves view, when the browser tab is hidden, or when system reduced-motion preferences request a static scene.

The manual Pause button and persisted pause preference are completely removed. A static fallback using existing figures remains in the HTML if JavaScript is unavailable.

## Files
- index.html: remove pause button, update asset versions, retain School/Work/Personal navigator
- home-collage.css: continuous top-to-bottom CSS animation, seamless loops, full-height layout and fade
- home-collage.js: randomized balanced authentic images, sequence cloning, unobtrusive scroll fade
- tools/test_home_collage.py and tools/test_home_collage.cjs: provenance and behavior checks
- tools/home_browser_smoke.cjs: real Chrome checks for actual downward displacement and loop continuity

## Acceptance tests
1. Actual downward travel of 8–130px over 2.2 seconds, starting automatically.
2. Two equal-height identical copies in each column; 15 distinct originals per rotation.
3. Randomized selection and order after reload, with all three categories per lane.
4. Continuous movement while the artwork fades into the pillar transition.
5. No pause control. Reduced-motion setting produces a still composition.
6. No regression to header portrait, hero buttons, category tabs, next-pillar navigation or project links.
7. Responsive desktop, tablet, mobile, light/dark, accessibility and successful GitHub Pages build.

## Publishing
Keep these changes in a draft pull request until visual review and approval. Do not directly update main.
