# Opening Section — Royal Enhancement Plan

## Current State Analysis

- Basic Jharokha arch background, 8 gold dust particles floating upward
- Simple scroll indicator (arrow only), no text hint
- Button is decent but needs more luxury treatment
- Content spacing needs refinement for mobile

## Planned Enhancements

### 1. Falling Marigold Petals & Gold Particles

- Add 12-16 falling marigold petals (CSS-only, `petal-fall` keyframes)
- Petals drift from top with gentle sway motion
- Mixed gold/orange colors for authentic wedding feel
- Varying sizes (8-14px), speeds (12-20s), and opacity (0.15-0.35)

### 2. Enhanced Background

- **Animated mandala rings** behind content (slow 60s rotation)
- **Multiple radial glow layers** — warm gold center, cooler edges
- **Jaali pattern** at bottom edge (mirroring top)
- **Vignette effect** — darker edges for depth

### 3. Scroll Hint (Major Enhancement)

- Replace simple arrow with **animated scroll indicator**
- Add text - Scroll Down 
- Glowing diya icon above arrow
- Mouse wheel SVG animation
- Fade out on scroll (using CSS or JS)

### 4. Luxury Button Redesign

- **Ornate corner diamonds** via SVG pseudo-elements
- **Double border effect** — outer gold, inner glow
- **Animated gold particles** around button on hover
- **3D depth** with layered shadows
- **Pulsing glow** heartbeat animation when idle
- Text: "Explore the Celebrations ✦"

### 5. Content Alignment & Spacing

- Tighter mobile padding (50px top instead of 60px)
- Better gap management between elements
- Ensure photo frame and names don't overlap on small screens
- Date card max-width adjustment for mobile

### 6. Additional Royal Elements

- **Decorative lotus dividers** between content blocks
- **Gold corner flourishes** that bloom on load
- **Subtle gold border glow** on entire section

## Files Modified

1. `**src/components/sections/OpeningSection.tsx**` — Add falling petals, enhanced scroll indicator, ornate elements
2. `**src/index.css**` — New keyframes (`petal-fall`, `mandala-rotate`), enhanced button styles, scroll indicator styles

## Key Animations (All CSS, GPU-accelerated)

- `petal-fall`: translateY(0 → 110vh) + rotate + opacity fade
- `mandala-rotate`: 360deg rotation over 60s
- `scroll-glow-pulse`: opacity breathing for scroll hint
- `button-corner-sparkle`: diamond corner accent animation