

# Section 1 (Opening) — Royal Rajasthani Redesign

Only `OpeningSection.tsx` and `index.css` are modified. No changes to Ganesha section.

## What Changes

### Remove
- Invitation message block (lines 151-170): "Dear {guestName}" greeting + "You are cordially invited..." text — completely removed
- Remove `guestName` prop from component (keep in Index.tsx for other sections)

### Add — Rajasthani Jharokha Arch (Background SVG)
- Large ornate scalloped Mughal arch SVG centered behind content (~8% opacity gold)
- Multi-layered: outer arch + inner arch + keystone detail + pillar lines
- Animated entrance: fade + scale from 0.92 over 1.2s on section enter

### Add — Couple Photo Frame
- Circular photo placeholder (140px mobile, 180px desktop) with double gold ring border
- Ornate Jharokha arch SVG frame wrapping around the circle (scalloped arch top)
- "H ♥ A" monogram placeholder inside until real photo added
- Gold border glow pulse animation (3s cycle)
- Positioned between tagline and couple names

### Add — Decorative Elements
- 4 paisley corner ornaments (SVG, ~6% opacity) with staggered fade-in + slight rotation on enter
- Radial gold glow behind photo area (slow 8s breathing pulse)
- 6 floating gold dust particles (CSS-only, tiny dots drifting upward)
- Mandala ring pattern behind couple names (very subtle, 4% opacity)

### Enhance — Button ("View Celebrations →")
- New `.royal-cta-button` class replacing `nav-button-secondary`:
  - Gold gradient border (double border effect with inner glow)
  - Glass-morphism background with backdrop-filter blur
  - Shimmer sweep animation (every 5s)
  - Ornate diamond accents at corners via ::before/::after pseudo-elements
  - Hover: gold fill with dark text, scale(1.03), outer gold glow shadow
  - Active: scale(0.97)

### Enhance — Typography
- "&" ampersand: larger, use `font-display` with gold-shimmer, decorative sizing
- Date text: add letter-spacing, slightly more prominent
- Hashtag: gold shimmer effect added

### Animations (all CSS, GPU-accelerated)
- Jharokha arch: `jharokha-reveal` — opacity 0→1 + scale 0.92→1 (1.2s)
- Photo frame: staggered cinematic reveal + gold glow pulse loop
- Paisley corners: staggered fade+rotate in (0.8s each, 0.15s stagger)
- Gold dust: `gold-dust-float` — translateY upward drift with opacity cycle (8-15s per particle)
- Background glow: slow radial pulse (8s)

## Files Modified
1. **`src/components/sections/OpeningSection.tsx`** — full rebuild with Jharokha, photo frame, royal elements, remove invitation text, remove guestName usage
2. **`src/index.css`** — add `.royal-cta-button`, `@keyframes jharokha-reveal`, `@keyframes gold-dust-float`, `.couple-photo-frame` styles
3. **`src/pages/Index.tsx`** — remove `guestName` prop from OpeningSection (keep prop in interface but don't pass invitation-related content)

