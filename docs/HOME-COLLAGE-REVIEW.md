# Homepage ambient collage: development and review

**Source baseline:** \`main\` commit \`f869257adc824903b3acada30d85346b763ebf8e\`.  
**Branch:** \`feature/home-motion-collage-v1\`.  
**Scope:** Homepage only. The shared header/photo, footer, all individual project pages, and the existing School / Work / Personal explorer are preserved.

## Design rationale
The previous homepage hero contained a very large "Questions worth exploring" headline, with little direct evidence of the projects above the fold. This revision reduces the heading to a readable two-line editorial statement and creates a 3-lane ambient collage of **existing project screenshots and figures**. The headline **"I learn by making things."** is a working choice and should remain easy to replace.

The collage is deliberately background context, not an analytical chart gallery. Decorative images use empty alt text inside an aria-hidden group. Their original data and alt text remain available on project pages. The collage is never used to claim new findings.

An independent homepage stylesheet and script keep shared CSS and project exploration logic untouched. The imagery drifts very slowly via CSS transforms. JavaScript only updates the collage's opacity/blur as the hero finishes leaving view, using requestAnimationFrame-throttled scroll events. Animation pauses after the transition begins, when the collage is offscreen or tab hidden, and whenever visitors opt to pause. Reduced-motion preferences disable all ambient movement and scroll blur.

The next section uses a visually separate warm-paper surface (light theme) or grounded dark-card surface (dark theme) and a simpler "Explore my work" heading. The original tab buttons, per-project list, video/image links and next-pillar behavior remain unchanged.

## Authentic image source map
All are unmodified existing \`figures/\` files that are also registered in \`portfolio-data.js\`:

| Tile | Category | Source |
| --- | --- | --- |
| NOAA frequency analysis | School | \`figures/noaa-event-frequency.png\` |
| Lab Rat Revolt interface | Work | \`figures/unmc-lab-rat-interface.jpg\` |
| Mini Bookmaker print preview | Personal | \`figures/minibook-imposition-preview.jpg\` |
| UNMC educational analytics media | Work | \`figures/unmc-animated-analytics.jpg\` |
| ERCOT monthly/hourly demand | School | \`figures/ercot-demand-month-hour.png\` |
| Studio S application timeline | Personal | \`figures/studio-s-timeline.jpg\` |
| Amazon package-search analysis | School | \`figures/amazon-pick-rolling-dashboard.png\` |
| UNMC medical animation | Work | \`figures/unmc-lymph-node-animation.jpg\` |
| Driver Gear route-weather interface | School | \`figures/driver-gear-route-weather.jpg\` |

The images total approximately 1.2 MiB. Separate optimized copies were unnecessary for this first version given the total byte budget. The existing originals are unchanged. NYC recycling has no registered figure and is intentionally not represented with a fake one.

## Changed files
- \`index.html\`: shorter hero introduction, nine authentic images, accessible pause button, distinct pillar backdrop. All existing project explorer IDs and actions retained.
- \`home-collage.css\`: isolated styling, dark/light themes, responsive collage and controlled motion.
- \`home-collage.js\`: passive scroll, visibility pause, manual pause with local preference storage, reduced-motion handling.
- \`tools/test_home_collage.py\`: image provenance, links, story hierarchy, media budget and structural checks.
- \`tools/test_home_collage.cjs\`: behavior tests for scrolling, pausing, tab visibility and reduced motion.
- \`.github/workflows/portfolio-checks.yml\`: checks run on draft pull requests.

## Review acceptance criteria
1. **Wide desktop:** smaller headline and authentic moving collage coexist without overlap or clipped CTAs. Check 1440×900 and 1280×800.
2. **Mobile:** legible heading, visible CTAs and a condensed collage strip. Check widths 320, 375 and 768 pixels.
3. **Visual boundary:** collage settles, softly blurs, and fades before the visitor browses the clearly distinct pillars; the headline remains sharp.
4. **Dark/light themes:** text and controls remain legible; no harsh flash entering the pillars.
5. **Accessibility:** tabbed explorer keyboard behavior, skip link, focus ring, contrast, optional pause, reduced motion.
6. **Performance:** no autoplay video, no constant JS animation loop, no heavy scroll interception; images use async decoding.
7. **Regression:** the header portrait, résumé link, School → Work → Personal transitions, original figure paths, Lab Rat Revolt web player and full site build remain functional.
8. **QA commands:** \`python3 tools/test_home_collage.py\`; \`node tools/test_home_collage.cjs\`; \`node --check home-collage.js\`; \`python3 tools/validate_portfolio.py\`; \`python3 tools/build_portfolio.py\`; \`python3 tools/validate_portfolio.py _site\`.

## Editorial status
The user has not settled on a final personal headline. This PR deliberately includes the working line "I learn by making things." Changing it should not require a structural redesign.

## Publication safety
Open a draft pull request and review its layout and motion before merging into \`main\`. Do not automatically publish the design.
