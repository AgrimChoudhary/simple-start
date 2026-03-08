

# Harshit & Anshikha Wedding Invitation — Implementation Plan

## Project Overview
A premium, immersive 6-section wedding invitation website with "Royal Midnight Rajasthan" theme. Each section is a full-viewport "room" with cinematic transitions, floating marigold petals, gold shimmer effects, and interactive elements.

## Architecture

```text
src/
├── pages/Index.tsx              -- Main orchestrator (section state machine)
├── components/
│   ├── sections/
│   │   ├── GaneshaSection.tsx   -- Section 0: Curtain reveal + shlok
│   │   ├── OpeningSection.tsx   -- Section 1: Hero with couple names
│   │   ├── CelebrationsSection.tsx -- Section 2: 3-day event timeline
│   │   ├── GallerySection.tsx   -- Section 3: Video + photo gallery
│   │   ├── CountdownSection.tsx -- Section 4: Countdown + blessings
│   │   └── RSVPSection.tsx      -- Section 5: RSVP + contact
│   ├── transitions/
│   │   ├── CurtainReveal.tsx    -- Maroon curtain overlay
│   │   └── PalaceDoors.tsx      -- 3D palace door transition
│   ├── global/
│   │   ├── FloatingPetals.tsx   -- Ambient marigold petals (CSS-only)
│   │   ├── FloatingNav.tsx      -- Hamburger nav menu
│   │   ├── ProgressDots.tsx     -- Desktop section indicators
│   │   ├── MusicToggle.tsx      -- Bottom-left music control
│   │   ├── GoldDivider.tsx      -- Reusable gold ornamental divider
│   │   └── DiyaIcon.tsx         -- Animated diya for headings
│   └── ui/                      -- Existing shadcn components
├── hooks/
│   ├── useGuestName.ts          -- URL param guest personalization
│   └── useSectionNavigation.ts  -- Section state + transition logic
├── data/
│   └── events.ts                -- Wedding event data
└── index.css                    -- Design system tokens + animations
```

## Design System Setup (index.css)

Replace all CSS variables with the Royal Midnight Rajasthan palette:
- Background: `#0A1628`, Cards: `#111E36`, Hover: `#1A2A4A`
- Gold primary/secondary/tertiary: `#C9A96E` / `#D4B87A` / `#8B7340`
- Text: `#F5F0E8` (ivory), `#D4CFC5` (cream), `#8A8578` (muted)

Add Google Fonts: Cinzel Decorative, Cormorant Garamond, Lora, Inter, Noto Sans Devanagari, Mukta Varani, Playfair Display.

Add all custom keyframes: curtain-open, petal-drift, gold-shimmer, heartbeat-glow, diya-flame, flip-digit, fade-slide-up, draw-divider.

## Implementation Phases

### Phase 1: Foundation + Section 0 (Ganesha)
- Design system (colors, fonts, CSS variables, keyframes)
- Section navigation state machine (tracks current section, handles transitions)
- Curtain reveal animation (two maroon CSS panels parting from center, 2.5s)
- Ganesha content: OM symbol, Ganesha SVG placeholder, shlok text with staggered fade-in
- "शुभ आरंभ · Begin" button appearing after shlok completes
- Floating marigold petals (CSS-only, 8-12 elements with drift+sway keyframes)

### Phase 2: Palace Doors + Section 1 (Opening Hero)
- Palace door transition: 3D perspective rotateY swing with golden light effect
- Mobile fallback: golden fade transition
- Couple names with gold shimmer text effect (background-clip: text, animated gradient)
- "HARSHIT" slides left, "&" fades center, "ANSHIKHA" slides right
- Guest personalization from `?guest=` URL param
- Wedding date, hashtag (click-to-copy), tagline
- "View Celebrations →" button

### Phase 3: Section 2 (Wedding Celebrations)
- Day tab navigation (9th, 10th, 11th May) with gold active indicator
- 6 royal scroll event cards with farmaan styling (scroll ornaments, wax seal)
- Each card: event name (EN+HI), date, time, dress code badge, venue, address, map button
- Cards stagger-animate on tab switch
- Internal scrolling within section, sticky tabs

### Phase 4: Section 3 (Gallery)
- Jharokha arch frame for video placeholder (CSS clip-path arch shape)
- Photo gallery: mobile carousel / desktop grid
- Lightbox viewer for full-size images
- AI-generated placeholder images (using placeholder descriptions from PRD)
- Lazy loading with gold shimmer placeholders

### Phase 5: Section 4 (Countdown + Blessings)
- Live countdown to 10 May 2026 (Days/Hours/Minutes/Seconds)
- Heartbeat golden glow pulse behind countdown boxes
- Digit flip animation on change
- Conditional states (before/during/after wedding)
- Blessings wall template with sample cards (auto-scrolling carousel)
- Blessing form UI (name, message, optional photo)

### Phase 6: Section 5 (RSVP + Contact)
- RSVP form: name, phone, guest count, event checkboxes, message
- "Accept Invitation" — the ONLY gold-filled primary button
- Confetti celebration on submit (add canvas-confetti package)
- Thank you overlay with personalized guest name
- Contact cards (groom side / bride side) with phone + WhatsApp
- Footer with couple names, hashtag, date

### Phase 7: Global Polish
- Floating navigation menu (glass-morphism, 6 section links)
- Progress dots (desktop only, fixed right edge)
- Music toggle placeholder (bottom-left, no actual audio file yet)
- Diya icon animation on all section headings
- Gold divider draw-from-center animation
- `prefers-reduced-motion` support throughout
- Jaali texture SVG overlays at section edges
- Responsive fine-tuning (320px to 1024px+)
- Accessibility: semantic HTML, aria-labels, keyboard nav, focus indicators

## Key Technical Decisions

- **No Framer Motion** — use CSS animations + React state for transitions (better performance, PRD prefers CSS)
- **Add `canvas-confetti`** package for RSVP celebration
- **CSS-only floating petals** — 12 DOM elements max, GPU-accelerated transform: translate3d
- **Gold shimmer** via `background-clip: text` with animated linear-gradient
- **Section state machine** in React state — tracks current section, visited sections, transition state
- **Content-behind model** for Sections 0-1: content pre-rendered behind curtain/door overlays at lower z-index
- **All sections rendered in DOM** but only current one visible (enables content-behind reveals)
- **Placeholder SVGs** for Ganesha, jaali patterns, wax seals, diya icons (inline SVG)

## Package Additions
- `canvas-confetti` — confetti burst on RSVP accept (~6KB)

