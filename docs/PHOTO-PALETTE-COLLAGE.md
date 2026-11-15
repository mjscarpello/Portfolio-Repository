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
The existing randomized, continuously downward-scrolling image animation remains intact. Each project image now offers an Open project link and a Find image link, leading to the exact original figure location inside that project. A hovered or keyboard-focused lane temporarily pauses to make the link stable.

The second mirrored animation sequence is visually interactive by pointer while avoiding duplicate keyboard tab stops. On touch interfaces, captions are always visible. NOAA editorial figures have static named IDs; other case study galleries receive stable figure IDs when rendered and scroll to the requested anchor after the gallery has loaded.

## Verification plan
The new palette is loaded by all 14 primary styled HTML pages. Automated checks cover light/dark contrast, exact anchors, randomization, original assets, responsive design, hover behavior, and navigation using Chrome. The current branch is a draft for visual review and does not alter the published main website.
