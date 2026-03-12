import React, { useEffect, useState, useMemo } from 'react';
import ganeshaImg from '@/assets/ganesha.png';
import templeBgMobile from '@/assets/temple-bg-mobile.jpg';
import templeBgDesktop from '@/assets/temple-bg-desktop.jpg';

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
const GaneshaMandala: React.FC<{ revealed: boolean }> = ({ revealed }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="absolute rounded-full" style={{
      width: '130%', height: '130%',
      border: '0.5px dashed hsl(var(--gold-primary) / 0.12)',
      animation: revealed ? 'mandala-rotate 40s linear infinite' : 'none',
      opacity: revealed ? 1 : 0, transition: 'opacity 1.5s ease-out',
    }} />
    <div className="absolute rounded-full" style={{
      width: '110%', height: '110%',
      border: '0.4px dotted hsl(var(--gold-primary) / 0.1)',
      animation: revealed ? 'mandala-rotate 55s linear infinite reverse' : 'none',
      opacity: revealed ? 1 : 0, transition: 'opacity 1.5s ease-out 0.3s',
    }} />
    <div className="absolute rounded-full" style={{
      width: '155%', height: '155%',
      border: '0.3px dashed hsl(var(--gold-primary) / 0.07)',
      animation: revealed ? 'mandala-rotate 80s linear infinite' : 'none',
      opacity: revealed ? 1 : 0, transition: 'opacity 1.5s ease-out 0.6s',
    }} />
  </div>
);

/* ═══════════════════════════════════════════════
   GOLD DUST PARTICLES — Floating upward
   ═══════════════════════════════════════════════ */
const GoldDustParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${1.5 + Math.random() * 2}px`,
      opacity: 0.12 + Math.random() * 0.18,
    })),
  []);

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
const RoyalBorderFrame: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div
      className="absolute inset-3 md:inset-5 lg:inset-6 pointer-events-none z-[2]"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
    >
      {/* ── Double Edge Lines ── */}
      {/* Top outer */}
      <div className="absolute top-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 20%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.2s both' : 'none',
        }} />
      {/* Top inner (double line effect) */}
      <div className="absolute top-[3px] left-10 right-10 md:left-14 md:right-14 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2) 25%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 75%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.35s both' : 'none',
        }} />

      {/* Bottom outer */}
      <div className="absolute bottom-0 left-8 right-8 md:left-12 md:right-12 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.3s both' : 'none',
        }} />
      {/* Bottom inner */}
      <div className="absolute bottom-[3px] left-10 right-10 md:left-14 md:right-14 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 75%, transparent)',
          animation: active ? 'border-draw-horizontal 0.8s ease-out 0.4s both' : 'none',
        }} />

      {/* Left outer */}
      <div className="absolute left-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.25s both' : 'none',
        }} />
      {/* Left inner */}
      <div className="absolute left-[3px] top-10 bottom-10 md:top-14 md:bottom-14 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.15) 25%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 75%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.35s both' : 'none',
        }} />

      {/* Right outer */}
      <div className="absolute right-0 top-8 bottom-8 md:top-12 md:bottom-12 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.4) 20%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 80%, transparent)',
          animation: active ? 'border-draw-vertical 0.8s ease-out 0.3s both' : 'none',
        }} />
      {/* Right inner */}
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
      {/* Top center */}
      <div className="absolute top-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>
      </div>
      {/* Bottom center */}
      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.35" />
        </svg>
      </div>
      {/* Left center */}
      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
      {/* Right center */}
      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M5 0L8 5L5 10L2 5Z" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>

      {/* Corner glow pulse */}
      {active && (['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'] as const).map((pos, i) => (
        <div
          key={`glow-${i}`}
          className={`absolute ${pos} w-10 h-10 md:w-14 md:h-14 rounded-full pointer-events-none`}
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
            animation: `corner-glow-pulse 3s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      {/* Travelling light on border */}
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
          <div className="royal-border-light" />
        </div>
      )}
    </div>
  );
};

/* Royal Corner Ornament — Larger, more detailed */
const RoyalCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }> = ({ position, active }) => {
  const rotations = { tl: '0', tr: '90', br: '180', bl: '270' };
  const positions = { tl: 'top-0 left-0', tr: 'top-0 right-0', bl: 'bottom-0 left-0', br: 'bottom-0 right-0' };

  return (
    <div className={`absolute ${positions[position]} w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 pointer-events-none`}>
      <svg viewBox="0 0 80 80" className="w-full h-full"
        style={{ transform: `rotate(${rotations[position]}deg)`, opacity: active ? 1 : 0, transition: 'opacity 1s ease-out 0.5s' }}>
        {/* Main sweep curve */}
        <path d="M4,4 C4,4 4,28 14,42 C24,56 48,66 68,70"
          fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        {/* Inner curve */}
        <path d="M4,4 C6,18 14,34 26,46 C36,56 52,64 68,68"
          fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.25" strokeLinecap="round" />
        {/* Paisley leaf */}
        <ellipse cx="20" cy="20" rx="5" ry="10" fill="hsl(var(--primary))" opacity="0.08" transform="rotate(-45 20 20)" />
        {/* Second paisley */}
        <ellipse cx="34" cy="34" rx="3" ry="7" fill="hsl(var(--primary))" opacity="0.05" transform="rotate(-40 34 34)" />
        {/* Corner diamond */}
        <path d="M6,6 L10,2 L14,6 L10,10 Z" fill="hsl(var(--primary))" opacity="0.35" />
        {/* Inner diamond */}
        <path d="M10,6 L12,4 L14,6 L12,8 Z" fill="hsl(var(--primary))" opacity="0.15" />
        {/* Accent dots along curve */}
        <circle cx="4" cy="18" r="1.5" fill="hsl(var(--primary))" opacity="0.2" />
        <circle cx="18" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.2" />
        <circle cx="10" cy="28" r="1" fill="hsl(var(--primary))" opacity="0.15" />
        <circle cx="28" cy="10" r="1" fill="hsl(var(--primary))" opacity="0.15" />
        {/* Tiny filigree line */}
        <path d="M8,8 C12,16 18,24 26,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.18" />
        <path d="M12,4 C14,10 18,16 24,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.12" />
      </svg>
    </div>
  );
};


/* ═══════════════════════════════════════════════
   MAIN GANESHA SECTION — Premium Royal Rajasthani
   ═══════════════════════════════════════════════ */
const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) { setRevealed(true); return; }
    const t = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(t);
  }, [curtainOpen, visited]);

  const r = revealed ? 'revealed' : '';

  return (
    <section
      className="section-container overflow-hidden"
      aria-labelledby="ganesha-heading"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
      }}
    >
      {/* Enhanced Royal Border */}
      <RoyalBorderFrame active={curtainOpen} />

      {/* ── LAYERED BACKGROUND SYSTEM with Temple ── */}
      {/* Layer 0: Base dark color */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(218 72% 5%)' }} />

      {/* Layer 1: Temple Background — responsive mobile/desktop */}
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

      {/* Layer 2: Dark gradient overlay for text readability — stronger in center */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(180deg,
          hsl(218 72% 5% / 0.45) 0%,
          hsl(218 65% 7% / 0.55) 15%,
          hsl(218 58% 9% / 0.65) 35%,
          hsl(218 52% 10% / 0.55) 55%,
          hsl(218 58% 8% / 0.45) 75%,
          hsl(218 65% 5% / 0.6) 100%)`,
      }} />

      {/* Layer 3: Vignette — darker edges to frame content */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, hsl(218 70% 4% / 0.55) 60%, hsl(218 75% 3% / 0.85) 100%)',
      }} />

      {/* Layer 4: Golden glow from temple top area */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 30% at 50% 18%, hsl(var(--gold-primary) / 0.12) 0%, transparent 60%)',
        animation: revealed ? 'glow-hero-pulse 8s ease-in-out infinite' : 'none',
      }} />

      {/* Layer 5: Warm glow from bottom (diya reflection) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 25% at 50% 88%, hsl(var(--gold-primary) / 0.08) 0%, transparent 55%)',
        animation: revealed ? 'glow-hero-pulse 12s ease-in-out infinite 3s' : 'none',
      }} />

      <div className="jaali-overlay" />
      <GoldDustParticles active={revealed} />

      {/* ── MAIN CONTENT — Evenly distributed flow ── */}
      <div className="relative z-10 text-center max-w-xl mx-auto ganesha-content-layout">

        {/* शुभ विवाह Header */}
        <div className={`cinematic-reveal ${r} flex items-center gap-3`}>
          <span className="text-primary/40 text-xs">✦</span>
          <p className="font-hindi text-primary/55 tracking-[0.25em]" lang="hi"
            style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}>
            शुभ विवाह
          </p>
          <span className="text-primary/40 text-xs">✦</span>
        </div>

        {/* Ganesha with Mandala + Diyas */}
        <div className={`relative cinematic-reveal-scale ${r} delay-1 ganesha-icon-wrapper`}>
          <GaneshaMandala revealed={revealed} />
          <div className="absolute inset-[-30px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.14) 0%, hsl(var(--gold-primary) / 0.05) 45%, transparent 70%)',
            animation: revealed ? 'heartbeat-glow 3.5s ease-in-out infinite 1s' : 'none',
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

        {/* OM Symbol */}
        <p className={`cinematic-reveal ${r} delay-1 font-hindi text-primary/40`} lang="hi"
          style={{ fontSize: 'clamp(14px, 3vw, 18px)', letterSpacing: '0.2em' }}>
          ॐ
        </p>

        {/* Shloka */}
        <p className={`cinematic-reveal ${r} delay-2 font-hindi font-medium leading-relaxed shloka-glow`}
          lang="hi" id="ganesha-heading"
          style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', color: 'hsl(var(--gold-primary))', letterSpacing: '0.03em', maxWidth: '400px' }}>
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>

        {/* Ornate Divider */}
        <div className={`cinematic-reveal ${r} delay-2`}>
          <OrnateDivider animate={revealed} />
        </div>

        {/* DEAR + GUEST NAME — grouped together */}
        <div className={`cinematic-reveal ${r} delay-3`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <p className="font-heading text-foreground/50 tracking-[0.35em] uppercase"
            style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', marginBottom: '0' }}>
            Dear
          </p>
          <div className="guest-name-showcase">
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

        {/* Cordially invited */}
        <p className={`cinematic-reveal ${r} delay-3 font-heading text-foreground/50 tracking-[0.18em] uppercase`}
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)', lineHeight: 1.6 }}>
          You are cordially invited to the wedding of
        </p>

        {/* Couple Names — grouped tightly */}
        <div className={`cinematic-reveal ${r} delay-4`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(2px, 0.5vh, 6px)' }}>
        <div>
          <h1 className="font-display leading-none couple-name-glow"
            style={{
              fontSize: 'clamp(24px, 6vw, 48px)', fontWeight: 700, letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
              backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', animation: 'gold-shimmer 4s linear infinite',
            }}>
            Harshit
          </h1>
        </div>

        <div className="opening-ampersand-container">
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

        <div>
          <h1 className="font-display leading-none couple-name-glow"
            style={{
              fontSize: 'clamp(24px, 6vw, 48px)', fontWeight: 700, letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
              backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', animation: 'gold-shimmer 4s linear infinite',
            }}>
            Anshikha
          </h1>
        </div>
        </div>

        {/* Tagline */}
        <p className={`cinematic-reveal ${r} delay-5 font-heading italic text-foreground/40 tracking-[0.25em]`}
          style={{ fontSize: 'clamp(9px, 2vw, 12px)' }}>
          Two Souls, One Journey
        </p>

        {/* Date */}
        <p className={`cinematic-reveal ${r} delay-5 font-body text-primary/65 tracking-[0.12em]`}
          style={{ fontSize: 'clamp(12px, 2.5vw, 15px)', fontWeight: 500 }}>
          10th May 2026
        </p>

        {/* Open Invitation Button */}
        <button
          onClick={onBeginClick}
          className={`opening-cta-btn-premium group cinematic-reveal ${r} delay-5`}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
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
    </section>
  );
};

export default GaneshaSection;
