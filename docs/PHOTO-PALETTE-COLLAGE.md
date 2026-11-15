# Photo-derived identity and project-image navigation

## Original portrait references
Two portraits supplied by the user in November 2026 serve as the visual reference. The small circular portrait has bright white and a charcoal/dark base. The larger portrait supplies deep suit blue, powder-blue glass, copper tie, orange shirt, yellow/orange flowers and foliage.

Only the palette is translated into source code. The uploaded portraits themselves have not been republished in this branch. Color selection is an editorial interpretation of the reference images.

## Palette and roles
- Suit navy #1A2541: titles, primary identity and deep hero.
- Porcelain white #F6F7F5: primary light surface and text on navy.
- Cobalt #2878B1: School accent and navigation.
- Sky blue #B2DFF6: headline accents and cool highlights.
- Blue-glass cyan #378AA8: cool detail/stripe.
- Copper #B65128: Work accent and warm editorial marks.
- Shirt orange #DC814C: secondary card and section accent.
- Coral #E6A082: soft warmth on selected elements.
- Marigold #DCAE34 and sunflower #F2D36B: floral highlights.
- Foliage #687E47: Personal accents and organic contrast.

Colors are used as distinct visual identities across the pillars, headers, footers, résumé, cards, and exhibits rather than flooding the interface with a bright rainbow gradient. The original research figures remain unchanged. Both light and dark themes preserve readable body text and functional links.

## Interactive moving figure navigation
The existing randomized, continuously downward-scrolling image animation remains intact. Each project image is one clickable link that opens its project at the exact original figure. Hovering or focusing displays a delicate semi-transparent overlay in the pillar's color and a small rounded **Open project** label at the top. There are no separate image buttons. The corresponding lane briefly pauses so the link remains easy to select.

The second mirrored animation sequence remains pointer-clickable without duplicating keyboard tab stops. Touch users can tap the image directly, and keyboard users see the same visual cue on focus. NOAA editorial figures have static named IDs; other case-study galleries receive figure IDs when rendered and scroll to the requested anchor after the gallery has loaded.

## Verification plan
The new palette is loaded by all 14 primary styled HTML pages. Automated checks cover light/dark contrast, exact anchors, randomization, original assets, responsive design, hover behavior, and navigation using Chrome. The small hover-only refinement remains in a draft pull request until review; the published main website stays unchanged.
