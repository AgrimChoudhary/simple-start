

# Complete Redesign & Polish — All Sections, Transitions & Responsiveness

## Overview
A comprehensive pass across all 6 sections, both transitions, and global components to fix issues, enhance animations, improve responsiveness (mobile-first), and elevate the luxury aesthetic to match the PRD's "Royal Midnight Rajasthan" theme.

---

## What Needs Work (Analysis)

**Section 0 (Ganesha):** Curtain + Palace Doors transitions work but need polish. Curtain valance fades too early. Center seam glow disappears before curtains part. Golden light from doors is subtle. Missing music toast prompt.

**Section 1 (Opening):** Couple names layout is horizontal (cramped on mobile). PRD says stacked vertical: HARSHIT / & / ANSHIKHA. Missing jaali texture at top/bottom edges. Ampersand should be Playfair italic. No gold divider above tagline per layout. Letter spacing on names too tight.

**Section 2 (Celebrations):** Solid — minor alignment and hover polish.

**Section 3 (Gallery):** Solid — minor polish.

**Section 4 (Countdown):** Solid — minor polish.

**Section 5 (RSVP):** Solid — minor polish.

**Global:** FloatingNav position should be bottom-right on mobile per PRD. ProgressDots missing glow on active. FloatingPetals count could be reduced on mobile for perf. MusicToggle has no actual audio functionality.

**Responsiveness:** Several sections use fixed sizes that don't scale well on 320px-375px screens.

---

## Implementation Plan

### 1. CurtainReveal.tsx — Enhanced Polish
- Extend total duration to 2.5s per PRD (currently 2s open + 0.5s pause = correct, but completion fires at 3s — keep)
- Add fabric texture pattern (subtle repeating SVG embroidery motif on each panel)
- Make center seam glow brighten as curtains start parting (not fade immediately)
- Add subtle gold sparkle particles at the parting edge
- Valance scallop: fade out later (after curtains halfway)
- Add a faint golden light expanding from center as curtains open

### 2. PalaceDoors.tsx — Enhanced Polish  
- Add golden arch frame at top that stays visible during opening
- Enhance jaali pattern — make it richer with more geometric detail
- Make brass knockers larger and more ornate with better lion/lotus heads
- Add creaking door sound-effect placeholder hook
- Improve the golden radial light — make it more dramatic and expand as doors swing
- More marigold petals (12 instead of 10) with better petal shapes
- Add subtle vibration/shake on mobile when doors start opening
- Fix mobile fallback — add gold particle sweep instead of just fade

### 3. GaneshaSection.tsx — Enhanced  
- Add more ornate jaali patterns with higher detail at edges
- Enhance Ganesha glow — add concentric golden rings that pulse
- Add subtle floating diya particles around Ganesha
- Better button styling — add hover glow aura around button
- Add music toast prompt at bottom after button appears
- Improve spacing and sizing for all screen sizes

### 4. OpeningSection.tsx — Major Redesign per PRD
- **Stack couple names vertically**: HARSHIT (line 1), & (line 2), ANSHIKHA (line 3)
- Ampersand: change to `font-hashtag` (Playfair italic), color `#D4B87A`
- Add letter-spacing: 6px mobile, 10px desktop on names
- Names font-size: 36px mobile / 64px desktop per PRD
- Add gold divider above tagline  
- Add jaali texture at top/bottom edges (5% opacity)
- Enhance slide-in animations: HARSHIT from left, & fade center, ANSHIKHA from right
- Add diya icons flanking the tagline
- Improve "View Celebrations" button with shimmer
- Background: vertical gradient `#0A1628 → #162040 → #0A1628`
- Full mobile-responsive layout with proper spacing

### 5. FloatingNav.tsx — Fix per PRD
- Position: bottom-right on mobile, top-right on desktop
- Auto-close after selection
- Add close animation (scale down + fade out)
- Better glass-morphism styling with gold border accent
- Active item: gold dot indicator

### 6. ProgressDots.tsx — Polish
- Active dot: add subtle glow shadow per PRD
- Better hover feedback on inactive dots

### 7. FloatingPetals.tsx — Performance
- Reduce to 8 petals on mobile (check `window.innerWidth`)
- Add `will-change: transform` optimization
- Better petal shapes (teardrop instead of circle)

### 8. MusicToggle.tsx — Better Styling
- Add gold glow aura when playing
- Improve button size and touch target (48px per PRD)
- Add tooltip on hover

### 9. index.css — New Animations & Responsive
- Add `@keyframes curtain-sparkle` for gold particles at curtain edge
- Add `@keyframes door-light-expand` for palace door light
- Add mobile-specific media queries for all sections
- Add `.music-toast` style for bottom toast
- Ensure all touch targets ≥ 48px
- Add smooth focus styles across all interactive elements

### 10. Index.tsx — Transition Logic Refinements
- Improve transition between sections 1→2 with gold sweep effect
- Better z-index management during rapid navigation
- Add `will-change` hints for transitioning sections

---

## Technical Details

**Files to modify:**
1. `src/components/transitions/CurtainReveal.tsx` — fabric texture, sparkle, timing
2. `src/components/transitions/PalaceDoors.tsx` — richer jaali, better light, more petals
3. `src/components/sections/GaneshaSection.tsx` — glow rings, floating diyas, music toast
4. `src/components/sections/OpeningSection.tsx` — vertical names, PRD layout, letter-spacing
5. `src/components/sections/CelebrationsSection.tsx` — minor hover/alignment polish
6. `src/components/sections/GallerySection.tsx` — minor polish
7. `src/components/sections/CountdownSection.tsx` — minor polish  
8. `src/components/sections/RSVPSection.tsx` — minor polish
9. `src/components/global/FloatingNav.tsx` — mobile position, auto-close
10. `src/components/global/ProgressDots.tsx` — active glow
11. `src/components/global/FloatingPetals.tsx` — perf, shapes
12. `src/components/global/MusicToggle.tsx` — better styling
13. `src/index.css` — new keyframes, responsive rules
14. `src/pages/Index.tsx` — transition refinements

**No new dependencies needed.**

