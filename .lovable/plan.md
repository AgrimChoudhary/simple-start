

# Plan: Add Family Section to Gallery Page

## Overview
Create a luxurious "Family Section" component that appears **above** the existing Gallery content within Section 3. Since the gallery section already has `overflow-y: auto`, both Family and Gallery content will live in one scrollable container.

**Note:** Framer Motion is NOT installed in this project. Per the project's animation constraints, all animations will be **CSS-only** using GPU-accelerated transforms and keyframes.

## Architecture

```text
Section 3 (scrollable container)
├── FamilySection (new — shown first)
│   ├── Section Heading ("Our Families" / "हमारे परिवार")
│   ├── Groom's Side Card
│   │   ├── Jharokha photo frame (SVG arch border with draw animation)
│   │   ├── Parents' names
│   │   └── "View Family Details" button → opens modal
│   ├── Bride's Side Card (same structure)
│   └── Family Details Modal (per side)
│       ├── Backdrop with blur
│       ├── 3D flip-up entrance (CSS)
│       ├── Sticky header with close button
│       └── Member cards grid (2-4 cols responsive)
│           └── Each: mini jharokha photo, name, relation, hover effects
├── GoldDivider
└── GallerySection content (existing — "Our Moments" heading, photo grid, lightbox)
```

## Files to Create/Edit

### 1. New: `src/components/sections/FamilySection.tsx`
- Self-contained component with family data, cards, modal
- Props: `{ active: boolean }`
- Two main cards (Groom & Bride) with placeholder photos (colored shimmer like gallery)
- Jharokha SVG arch frames with CSS `stroke-dasharray`/`stroke-dashoffset` draw-on animation triggered when `active`
- Modal with CSS 3D flip entrance (`perspective`, `rotateX` transform)
- Member cards in responsive grid with staggered CSS `animation-delay`
- Pulsing gold glow on SVG frames
- Royal button with gold gradient shine animation

### 2. Edit: `src/components/sections/GallerySection.tsx`
- Import and render `FamilySection` at the top of the content area (before "Our Moments" heading)
- Pass `active` prop through

### 3. Edit: `src/index.css`
- Add CSS classes:
  - `.royal-card-wrapper` with animated gradient border (`border-flow` keyframes)
  - `.btn-royal` with gold gradient shine animation
  - `.animate-frame-pulse` with `frame-glow-pulse` keyframes
  - `.family-modal-enter` with 3D flip-up animation
  - `.family-card-stagger` for staggered member card entrances
  - `.jharokha-draw` for SVG path draw animation

## Design Details

- **Colors**: Uses existing CSS variables — `--background` (deep navy), `--primary` (antique gold), `--card` 
- **Typography**: `font-heading` (Cinzel/Playfair), `font-hindi` (Devanagari) — already loaded
- **Photo placeholders**: Colored backgrounds with camera icon (matching gallery pattern)
- **Modal**: CSS-only with `backdrop-blur`, perspective transform entrance, scrollable grid
- **Hover effects**: Scale transforms, border color transitions, gold glow intensification
- **Mobile**: 2-column grid for members, full-width cards, touch-friendly buttons

## Family Data Structure
```text
Groom Side: "The Groom's Family"
  Parents: "Shri Rajendra & Smt. Sunita"
  Members: ~6-8 (name, relation, placeholder color)

Bride Side: "The Bride's Family"  
  Parents: "Shri Mahendra & Smt. Kavita"
  Members: ~6-8 (name, relation, placeholder color)
```

