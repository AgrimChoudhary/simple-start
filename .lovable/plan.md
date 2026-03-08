

# Luxury Ornamental Borders & Polish — All Sections

## Overview
Add premium animated gold borders to every section page, with consistent ornamental framing, responsive scaling, and luxury animations. Each section gets a unique but cohesive border treatment.

## What Changes

### 1. New Reusable Border Component: `SectionBorderFrame.tsx`
Create a shared ornamental border component with:
- **Animated gold corner flourishes** — 4 SVG corner ornaments with leaf/paisley motifs, fade-in on section active
- **Edge lines** — gradient gold lines connecting corners (top, bottom, left, right) with draw-in animation
- **Corner diamonds** — small gold diamond/star at each corner junction
- **Responsive sizing** — inset adjusts: `inset-3` on mobile, `inset-6` on desktop
- **Configurable variants** — `standard` (sections 1-4), `royal` (Ganesha + RSVP with extra detail)
- Props: `active`, `variant`, `className`

### 2. Section-Specific Border Enhancements

**Section 0 (Ganesha):** Replace current jaali arches with the royal border frame + add animated corner diyas (small SVG flame icons at corners)

**Section 1 (Opening):** Add standard border frame with slide-in animation synced to content steps. Top/bottom jaali arches stay but get refined spacing inside the frame.

**Section 2 (Celebrations):** Current paisley side borders are too subtle. Replace with the standard border frame at the viewport edges. Keep `celebrations-border-left/right` but increase opacity and add animated gold corner stars.

**Section 3 (Gallery):** Add standard border frame. The Jharokha frame already has detail — the outer section border completes the look.

**Section 4 (Countdown):** Add standard border frame with heartbeat-synced corner glow (corners pulse in sync with countdown heartbeat).

**Section 5 (RSVP):** Already has `OrnateFrame` — enhance it with thicker lines, animated draw-in effect, and larger corner flourishes with leaf SVGs.

### 3. CSS Additions in `index.css`

```
@keyframes border-draw-horizontal — width 0→100% with gold gradient
@keyframes border-draw-vertical — height 0→100%  
@keyframes corner-bloom — scale(0)→scale(1) with rotation
@keyframes corner-glow-pulse — subtle gold shadow pulse
```

`.section-border-frame` base styles with responsive insets
`.section-corner` — absolute positioned corner SVG with bloom animation
`.section-edge-line` — gradient gold line with draw animation

### 4. Responsive Adjustments
- Mobile (< 768px): `inset-2`, smaller corner ornaments (w-10 h-10), thinner edge lines
- Tablet (768-1024): `inset-4`, medium corners (w-14 h-14)  
- Desktop (> 1024): `inset-6`, full-size corners (w-16 h-16), richer detail

### 5. Files to Modify
1. **NEW** `src/components/global/SectionBorderFrame.tsx` — reusable border component
2. `src/components/sections/GaneshaSection.tsx` — add royal border frame
3. `src/components/sections/OpeningSection.tsx` — add standard border frame
4. `src/components/sections/CelebrationsSection.tsx` — add border frame, enhance side borders
5. `src/components/sections/GallerySection.tsx` — add border frame
6. `src/components/sections/CountdownSection.tsx` — add border frame with heartbeat corners
7. `src/components/sections/RSVPSection.tsx` — enhance existing OrnateFrame with draw-in animation
8. `src/index.css` — new keyframes and border styles

No new dependencies needed.

