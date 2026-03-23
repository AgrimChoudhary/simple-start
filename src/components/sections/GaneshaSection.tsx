import React, { useEffect, useState, useMemo } from 'react';
import ganeshaImg from '@/assets/ganesha.png';
import templeBgMobile from '@/assets/temple-bg-mobile.jpg';
import templeBgDesktop from '@/assets/temple-bg-desktop.jpg';
import PeacockCorner from '@/components/global/PeacockCorner';

interface GaneshaSectionProps {
  curtainOpen: boolean;
  onBeginClick: () => void;
  visited: boolean;
  fading?: boolean;
  guestName: string;
}

/* ═══════════════════════════════════════════════
   ANIMATED DIYA LAMP — Flickering flame with glow
   ═══════════════════════════════════════════════ */
const AnimatedDiya: React.FC<{ side: 'left' | 'right'; delay?: number }> = ({ side, delay = 0 }) => (
  <div className="relative flex flex-col items-center" style={{ animationDelay: `${delay}s` }}>
    <div
      className="absolute -top-3 w-12 h-12 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, hsl(38 80% 55% / 0.3) 0%, hsl(38 80% 55% / 0.08) 50%, transparent 70%)',
        animation: `diya-glow-pulse 2.5s ease-in-out ${delay}s infinite`,
        filter: 'blur(3px)',
      }}
    />
    <svg width="14" height="20" viewBox="0 0 18 26" className="relative z-10">
      <defs>
        <linearGradient id={`flame-${side}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="40%" stopColor="#F4C430" />
          <stop offset="80%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#FFFBE6" />
        </linearGradient>
      </defs>
      <path
        d="M9 2C9 2 4 8 4 13C4 16.5 6.2 19 9 19C11.8 19 14 16.5 14 13C14 8 9 2 9 2Z"
        fill={`url(#flame-${side})`}
        opacity="0.9"
        style={{ animation: `diya-flame 1.8s ease-in-out ${delay}s infinite`, transformOrigin: '9px 19px' }}
      />
      <ellipse cx="9" cy="14" rx="2.5" ry="4" fill="#FFFBE6" opacity="0.6"
        style={{ animation: `diya-flame 2.2s ease-in-out ${delay + 0.3}s infinite`, transformOrigin: '9px 19px' }}
      />
    </svg>
    <svg width="26" height="12" viewBox="0 0 32 16" className="relative z-10 -mt-0.5">
      <ellipse cx="16" cy="10" rx="14" ry="5" fill="none" stroke="#C8A45C" strokeWidth="1.2" opacity="0.6" />
      <path d="M4 8C4 5 8 2 16 2C24 2 28 5 28 8" fill="none" stroke="#C8A45C" strokeWidth="1" opacity="0.5" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   MANDALA RING — Slowly rotating behind Ganesha
   ═══════════════════════════════════════════════ */
const GaneshaMandala: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="absolute rounded-full" style={{
      width: '130%', height: '130%',
      border: '0.5px dashed hsl(var(--gold-primary) / 0.12)',
      animation: active ? 'mandala-rotate 40s linear infinite' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out',
    }} />
    <div className="absolute rounded-full" style={{
      width: '110%', height: '110%',
      border: '0.4px dotted hsl(var(--gold-primary) / 0.1)',
      animation: active ? 'mandala-rotate 55s linear infinite reverse' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out 0.3s',
    }} />
    <div className="absolute rounded-full" style={{
      width: '155%', height: '155%',
      border: '0.3px dashed hsl(var(--gold-primary) / 0.07)',
      animation: active ? 'mandala-rotate 80s linear infinite' : 'none',
      opacity: active ? 1 : 0, transition: 'opacity 1.5s ease-out 0.6s',
    }} />
  </div>
);

/* ═══════════════════════════════════════════════
   GOLD DUST PARTICLES — Floating upward
   ═══════════════════════════════════════════════ */
const GoldDustParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${8 + Math.random() * 10}s`,
      size: `${1.5 + Math.random() * 2}px`,
      opacity: 0.12 + Math.random() * 0.18,
      driftX: `${-20 + Math.random() * 40}px`,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left, bottom: '-10px',
            width: p.size, height: p.size,
            background: 'hsl(var(--gold-primary))',
            opacity: p.opacity,
            willChange: 'transform, opacity',
            ['--drift-x' as string]: p.driftX,
            animation: `ganesha-dust-rise ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ORNATE DIVIDER — Compact with lotus
   ═══════════════════════════════════════════════ */
const OrnateDivider: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="flex items-center justify-center gap-2 w-full max-w-[240px] md:max-w-[300px] my-2" aria-hidden="true">
    <div className="flex items-center gap-1.5 flex-1">
      <div className="w-1 h-1 rotate-45 border border-primary/30" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}} />
    </div>
    <svg width="20" height="20" viewBox="0 0 24 24" className="text-primary flex-shrink-0" style={{
      animation: animate ? 'ganesha-lotus-bloom 1s ease-out 0.5s both' : 'none',
    }}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="12" cy="12" rx="2.5" ry="6"
          fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5"
          transform={`rotate(${angle} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
    <div className="flex items-center gap-1.5 flex-1">
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}} />
      <div className="w-1 h-1 rotate-45 border border-primary/30" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   PREMIUM ROYAL BORDER FRAME — Enhanced
   ═══════════════════════════════════════════════ */
const RoyalCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }> = ({ position, active }) => {
  const posClass = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }[position];

  const rotateMap = { tl: 0, tr: 90, bl: 270, br: 180 };

  return (
    <div className={`absolute ${posClass} w-8 h-8 md:w-10 md:h-10`} style={{
      opacity: active ? 1 : 0,
      transition: 'opacity 0.6s ease-out',
    }}>
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rotateMap[position]}deg)` }}>
        <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" fill="hsl(var(--primary))" opacity="0.6" />
        <path d="M0 0 L10 0 L10 1 L1 1 L1 10 L0 10 Z" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="4" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>
    </div>
  );
};

const RoyalBorderFrame: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div
      className="absolute inset-3 md:inset-5 lg:inset-6 pointer-events-none z-[2]"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
    >
      {/* ── Double Edge Lines ── */}
      <div className="absolute top-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 20%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.2s both' : 'none',
        }} />
      <div className="absolute top-[3px] left-10 right-10 md:left-14 md:right-14 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2) 25%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 75%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.35s both' : 'none',
        }} />

      <div className="absolute bottom-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.3s both' : 'none',
        }} />
      <div className="absolute bottom-[3px] left-10 right-10 md:left-14 md:right-14 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 75%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.4s both' : 'none',
        }} />

      <div className="absolute left-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.25s both' : 'none',
        }} />
      <div className="absolute left-[3px] top-10 bottom-10 md:top-14 md:bottom-14 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 75%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.35s both' : 'none',
        }} />

      <div className="absolute right-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.3s both' : 'none',
        }} />
      <div className="absolute right-[3px] top-10 bottom-10 md:top-14 md:bottom-14 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 75%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.4s both' : 'none',
        }} />

      {/* ── Enhanced Corner Ornaments ── */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <RoyalCorner key={pos} position={pos} active={active} />
      ))}

      {/* ── Midpoint Diamonds on edges ── */}
      <div className="absolute top-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN GANESHA SECTION — Premium Royal Rajasthani
   
   CURTAIN-SYNCED THEATRICAL ENTRANCE:
   Content starts invisible (cs-element = opacity:0).
   When curtain starts opening (900ms), curtainSyncActive=true
   is set, adding .curtain-synced-active to the wrapper.
   Each element then animates in with its own unique entrance
   perfectly timed to the curtain's physical opening.
   The curtain (z-50) physically covers this section (z-10),
   so even as elements animate, they're only visible through
   the gap the curtain has opened so far.
   ═══════════════════════════════════════════════ */
const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  // contentReady: mount DOM elements early behind curtain
  const [contentReady, setContentReady] = useState(false);
  // curtainSyncActive: triggers CSS animations when curtain starts opening
  const [curtainSyncActive, setCurtainSyncActive] = useState(false);
  // buttonActive: delay pointer-events until curtain is mostly open
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    // Mount content almost immediately — it will be hidden behind the curtain anyway
    const mountTimer = setTimeout(() => setContentReady(true), 300);
    // Start content animations when curtain starts opening (900ms from page load)
    // Content elements animate from invisible to visible, synced with curtain sliding
    const syncTimer = setTimeout(() => setCurtainSyncActive(true), 900);
    return () => { clearTimeout(mountTimer); clearTimeout(syncTimer); };
  }, []);

  useEffect(() => {
    if (!curtainOpen) return;
    // Enable button interaction after curtain is mostly open
    const btnTimer = setTimeout(() => setButtonActive(true), 3200);
    return () => clearTimeout(btnTimer);
  }, [curtainOpen]);

  return (
    <section
      className="section-container overflow-hidden"
      aria-labelledby="ganesha-heading"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
      }}
    >
      {/* Layer 0: Base dark color — ALWAYS rendered */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(218 72% 5%)' }} />

      {/* Background layers — rendered early, physically hidden behind curtain */}
      {contentReady && (
        <>
          <RoyalBorderFrame active={curtainSyncActive} />

          {/* Layer 1: Temple Background */}
          <div className="absolute inset-0 pointer-events-none temple-bg-mobile" style={{
            backgroundImage: `url(${templeBgMobile})`,
            backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat',
            opacity: 0.35,
          }} />
          <div className="absolute inset-0 pointer-events-none temple-bg-desktop" style={{
            backgroundImage: `url(${templeBgDesktop})`,
            backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat',
            opacity: 0.35,
          }} />

          {/* Layer 2: Dark gradient overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `linear-gradient(180deg,
              hsl(218 72% 5% / 0.45) 0%,
              hsl(218 65% 7% / 0.55) 15%,
              hsl(218 58% 9% / 0.65) 35%,
              hsl(218 52% 10% / 0.55) 55%,
              hsl(218 58% 8% / 0.45) 75%,
              hsl(218 65% 5% / 0.6) 100%)`,
          }} />

          {/* Layer 3: Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, hsl(218 70% 4% / 0.55) 60%, hsl(218 75% 3% / 0.85) 100%)',
          }} />

          {/* Layer 4: Golden glow from temple top */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 50% 30% at 50% 18%, hsl(var(--gold-primary) / 0.12) 0%, transparent 60%)',
            willChange: 'opacity',
            animation: 'glow-hero-pulse 10s ease-in-out infinite',
          }} />

          {/* Layer 5: Warm glow from bottom */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 60% 25% at 50% 88%, hsl(var(--gold-primary) / 0.08) 0%, transparent 55%)',
            willChange: 'opacity',
            animation: 'glow-hero-pulse 14s ease-in-out infinite 3s',
          }} />

          <div className="jaali-overlay" />
          <GoldDustParticles active={curtainSyncActive} />

          {/* ── MAYUR (PEACOCK) CORNERS ── */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
            <PeacockCorner pos="tl" />
            <PeacockCorner pos="tr" />
            <PeacockCorner pos="bl" />
            <PeacockCorner pos="br" />
          </div>
        </>
      )}

      {/* ── MAIN CONTENT — Curtain-synced theatrical entrance ── */}
      {contentReady && (
      <div className={`relative z-10 text-center max-w-xl mx-auto ganesha-content-layout ${curtainSyncActive ? 'curtain-synced-active' : ''}`}>

        {/* 1. शुभ विवाह — Fade down from above */}
        <div className="cs-element cs-shubh flex items-center gap-3">
          <span className="text-primary/40 text-xs">✦</span>
          <p className="font-hindi text-primary/55 tracking-[0.25em]" lang="hi"
            style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}>
            शुभ विवाह
          </p>
          <span className="text-primary/40 text-xs">✦</span>
        </div>

        {/* 2. Ganesha with Mandala + Diyas — Divine bloom */}
        <div className="cs-element cs-ganesha relative ganesha-icon-wrapper">
          <GaneshaMandala active={curtainSyncActive} />
          <div className="absolute inset-[-30px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.18) 0%, hsl(var(--gold-primary) / 0.06) 45%, transparent 70%)',
            willChange: 'transform, opacity',
            animation: curtainSyncActive ? 'heartbeat-glow 4s ease-in-out infinite 2s' : 'none',
          }} />
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 z-20">
            <AnimatedDiya side="left" delay={1.2} />
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-20">
            <AnimatedDiya side="right" delay={1.5} />
          </div>
          <img src={ganeshaImg} alt="Lord Ganesha"
            className="relative z-10 w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 20px hsl(var(--gold-primary) / 0.35)) drop-shadow(0 0 40px hsl(var(--gold-primary) / 0.15))' }}
          />
        </div>

        {/* 3. OM Symbol — Sacred pulse */}
        <p className="cs-element cs-om font-hindi text-primary/40" lang="hi"
          style={{ fontSize: 'clamp(14px, 3vw, 18px)', letterSpacing: '0.2em' }}>
          ॐ
        </p>

        {/* 4. Shloka — Line-by-line clip reveal */}
        <p className="cs-element cs-shloka font-hindi font-medium leading-relaxed shloka-glow"
          lang="hi" id="ganesha-heading"
          style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', color: 'hsl(var(--gold-primary))', letterSpacing: '0.03em', maxWidth: '400px' }}>
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>

        {/* 5. Ornate Divider — Draw from center */}
        <div className="cs-element cs-divider">
          <OrnateDivider animate={curtainSyncActive} />
        </div>

        {/* 6+7. DEAR + GUEST NAME — Slide up with golden shimmer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <p className="cs-element cs-dear font-heading text-foreground/50 tracking-[0.35em] uppercase"
            style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', marginBottom: '0' }}>
            Dear
          </p>
          <div className="cs-element cs-guest-name guest-name-showcase">
            <div className="guest-name-wing guest-name-wing-left">
              <div className="guest-wing-diamond" />
              <div className="guest-wing-line" />
            </div>
            <div className="guest-name-wrapper">
              <span className="guest-name-text font-display">
                {guestName}
              </span>
              <div className="guest-name-underline" />
              <div className="guest-name-bg-glow" />
            </div>
            <div className="guest-name-wing guest-name-wing-right">
              <div className="guest-wing-line" />
              <div className="guest-wing-diamond" />
            </div>
          </div>
        </div>

        {/* 8. Cordially invited — Tracking reveal */}
        <p className="cs-element cs-cordially font-heading text-foreground/50 uppercase"
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)', lineHeight: 1.6 }}>
          You are cordially invited to the wedding of
        </p>

        {/* 9-11. Couple Names — Grand scale entrance */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 0.5vh, 6px)' }}>
          {/* 9. HARSHIT */}
          <div className="cs-element cs-groom">
            <h1 className="font-display leading-none couple-name-glow"
              style={{
                fontSize: 'clamp(24px, 6vw, 48px)', fontWeight: 700, letterSpacing: '0.05em',
                background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
                backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', animation: curtainSyncActive ? 'gold-shimmer 4s linear infinite' : 'none',
              }}>
              Harshit
            </h1>
          </div>

          {/* 10. Ampersand */}
          <div className="cs-element cs-ampersand opening-ampersand-container">
            <div className="opening-amp-line-left">
              <div className="opening-amp-diamond" />
              <div className="opening-amp-line" />
            </div>
            <span className="font-heading italic text-primary/70" style={{ fontSize: 'clamp(16px, 3.5vw, 28px)' }}>
              &amp;
            </span>
            <div className="opening-amp-line-right">
              <div className="opening-amp-line" />
              <div className="opening-amp-diamond" />
            </div>
          </div>

          {/* 11. ANSHIKHA */}
          <div className="cs-element cs-bride">
            <h1 className="font-display leading-none couple-name-glow"
              style={{
                fontSize: 'clamp(24px, 6vw, 48px)', fontWeight: 700, letterSpacing: '0.05em',
                background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
                backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', animation: curtainSyncActive ? 'gold-shimmer 4s linear infinite' : 'none',
              }}>
              Anshikha
            </h1>
          </div>
        </div>

        {/* 12. Tagline */}
        <p className="cs-element cs-tagline font-heading italic text-foreground/40 tracking-[0.25em]"
          style={{ fontSize: 'clamp(9px, 2vw, 12px)' }}>
          Two Souls, One Journey
        </p>

        {/* 13. Date */}
        <p className="cs-element cs-date font-body text-primary/65 tracking-[0.12em]"
          style={{ fontSize: 'clamp(12px, 2.5vw, 15px)', fontWeight: 500 }}>
          10th May 2026
        </p>

        {/* 14. Open Invitation Button — Bounce in */}
        <button
          onClick={onBeginClick}
          className="cs-element cs-button opening-cta-btn-premium group"
          style={{ pointerEvents: buttonActive ? 'auto' : 'none' }}
          aria-label="Open the wedding invitation"
        >
          <div className="opening-cta-corner opening-cta-corner-tl" />
          <div className="opening-cta-corner opening-cta-corner-tr" />
          <div className="opening-cta-corner opening-cta-corner-bl" />
          <div className="opening-cta-corner opening-cta-corner-br" />
          <div className="opening-cta-content">
            <span className="opening-cta-text">Open Invitation</span>
            <span className="opening-cta-arrow">→</span>
          </div>
        </button>
      </div>
      )}
    </section>
  );
};

export default GaneshaSection;
