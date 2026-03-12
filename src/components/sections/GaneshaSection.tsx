import React, { useEffect, useState, useMemo } from 'react';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import ganeshaImg from '@/assets/ganesha.png';
import palaceFacade from '@/assets/palace-facade.png';

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
  <div
    className="relative flex flex-col items-center"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Warm glow behind flame */}
    <div
      className="absolute -top-4 w-16 h-16 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, hsl(38 80% 55% / 0.25) 0%, hsl(38 80% 55% / 0.08) 50%, transparent 70%)',
        animation: `diya-glow-pulse 2.5s ease-in-out ${delay}s infinite`,
        filter: 'blur(4px)',
      }}
    />
    {/* Flame */}
    <svg width="18" height="26" viewBox="0 0 18 26" className="relative z-10">
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
        style={{
          animation: `diya-flame 1.8s ease-in-out ${delay}s infinite`,
          transformOrigin: '9px 19px',
        }}
      />
      {/* Inner bright core */}
      <ellipse cx="9" cy="14" rx="2.5" ry="4" fill="#FFFBE6" opacity="0.6"
        style={{ animation: `diya-flame 2.2s ease-in-out ${delay + 0.3}s infinite`, transformOrigin: '9px 19px' }}
      />
    </svg>
    {/* Diya bowl */}
    <svg width="32" height="16" viewBox="0 0 32 16" className="relative z-10 -mt-1">
      <ellipse cx="16" cy="10" rx="14" ry="5" fill="none" stroke="#C8A45C" strokeWidth="1.2" opacity="0.6" />
      <path d="M4 8C4 5 8 2 16 2C24 2 28 5 28 8" fill="none" stroke="#C8A45C" strokeWidth="1" opacity="0.5" />
      <ellipse cx="16" cy="6" rx="3" ry="1.5" fill="#C8A45C" opacity="0.15" />
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   MANDALA RING — Slowly rotating behind Ganesha
   ═══════════════════════════════════════════════ */
const GaneshaMandala: React.FC<{ revealed: boolean }> = ({ revealed }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {/* Outer ring */}
    <div
      className="absolute rounded-full"
      style={{
        width: '220px', height: '220px',
        border: '0.5px dashed hsl(var(--gold-primary) / 0.12)',
        animation: revealed ? 'mandala-rotate 40s linear infinite' : 'none',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 1.5s ease-out',
      }}
    />
    {/* Middle ring */}
    <div
      className="absolute rounded-full"
      style={{
        width: '180px', height: '180px',
        border: '0.4px dotted hsl(var(--gold-primary) / 0.1)',
        animation: revealed ? 'mandala-rotate 55s linear infinite reverse' : 'none',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 1.5s ease-out 0.3s',
      }}
    />
    {/* Inner ring */}
    <div
      className="absolute rounded-full"
      style={{
        width: '250px', height: '250px',
        border: '0.3px dashed hsl(var(--gold-primary) / 0.07)',
        animation: revealed ? 'mandala-rotate 80s linear infinite' : 'none',
        opacity: revealed ? 1 : 0,
        transition: 'opacity 1.5s ease-out 0.6s',
      }}
    />
  </div>
);

/* ═══════════════════════════════════════════════
   GOLD DUST PARTICLES — Floating upward
   ═══════════════════════════════════════════════ */
const GoldDustParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${1.5 + Math.random() * 2.5}px`,
      opacity: 0.15 + Math.random() * 0.2,
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
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
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
   ORNATE GOLD DIVIDER — Premium with lotus center
   ═══════════════════════════════════════════════ */
const OrnateDivider: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="flex items-center justify-center gap-2 w-full max-w-[280px] md:max-w-[340px] my-4" aria-hidden="true">
    {/* Left line */}
    <div className="flex items-center gap-1.5 flex-1">
      <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
      <div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}}
      />
    </div>
    {/* Center lotus */}
    <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary flex-shrink-0" style={{
      animation: animate ? 'ganesha-lotus-bloom 1s ease-out 0.5s both' : 'none',
    }}>
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="12" cy="12" rx="2.5" ry="6"
          fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      {/* Center */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
    {/* Right line */}
    <div className="flex items-center gap-1.5 flex-1">
      <div
        className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/60"
        style={animate ? { animation: 'draw-divider 0.8s ease-out forwards' } : {}}
      />
      <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
    </div>
  </div>
);

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
      <SectionBorderFrame active={curtainOpen} variant="royal" />

      {/* ── LAYERED BACKGROUND SYSTEM ── */}
      {/* Base: Deep midnight */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'hsl(218 72% 5%)' }} />

      {/* Palace facade with deep overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${palaceFacade})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
          filter: 'saturate(0.6) brightness(0.7)',
        }}
      />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            hsl(218 72% 5% / 0.4) 0%,
            hsl(218 65% 7% / 0.6) 20%,
            hsl(218 58% 9% / 0.75) 40%,
            hsl(218 52% 10% / 0.85) 60%,
            hsl(218 58% 8% / 0.9) 80%,
            hsl(218 65% 5% / 0.95) 100%
          )`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 45%, transparent 15%, hsl(218 70% 4% / 0.5) 55%, hsl(218 75% 3% / 0.85) 100%)',
        }}
      />

      {/* Top golden glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 18%, hsl(var(--gold-primary) / 0.1) 0%, transparent 60%)',
          animation: revealed ? 'glow-hero-pulse 8s ease-in-out infinite' : 'none',
        }}
      />

      {/* Bottom warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 25% at 50% 85%, hsl(var(--gold-primary) / 0.06) 0%, transparent 55%)',
          animation: revealed ? 'glow-hero-pulse 12s ease-in-out infinite 3s' : 'none',
        }}
      />

      {/* Jaali overlay pattern */}
      <div className="jaali-overlay" />

      {/* Gold dust particles */}
      <GoldDustParticles active={revealed} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-6 text-center max-w-xl mx-auto min-h-full">

        {/* ═══ शुभ विवाह Header ═══ */}
        <div className={`cinematic-reveal ${r} flex items-center gap-3 mb-5`}>
          <span className="text-primary/40 text-xs">✦</span>
          <p
            className="font-hindi text-primary/55 tracking-[0.25em]"
            lang="hi"
            style={{ fontSize: 'clamp(11px, 2.8vw, 15px)' }}
          >
            शुभ विवाह
          </p>
          <span className="text-primary/40 text-xs">✦</span>
        </div>

        {/* ═══ Ganesha with Mandala + Diyas ═══ */}
        <div className={`relative mb-3 cinematic-reveal-scale ${r} delay-1`}>
          {/* Mandala rings behind */}
          <GaneshaMandala revealed={revealed} />

          {/* Warm radial glow */}
          <div className="absolute inset-[-60px] md:inset-[-80px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.14) 0%, hsl(var(--gold-primary) / 0.05) 45%, transparent 70%)',
            animation: revealed ? 'heartbeat-glow 3.5s ease-in-out infinite 1s' : 'none',
          }} />

          {/* Diyas flanking Ganesha */}
          <div className="absolute -left-10 md:-left-14 top-1/2 -translate-y-1/2 z-20">
            <AnimatedDiya side="left" delay={1.2} />
          </div>
          <div className="absolute -right-10 md:-right-14 top-1/2 -translate-y-1/2 z-20">
            <AnimatedDiya side="right" delay={1.5} />
          </div>

          {/* Ganesha image */}
          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            style={{
              filter: 'drop-shadow(0 0 25px hsl(var(--gold-primary) / 0.35)) drop-shadow(0 0 50px hsl(var(--gold-primary) / 0.15))',
            }}
          />
        </div>

        {/* ═══ OM Symbol ═══ */}
        <p
          className={`cinematic-reveal ${r} delay-1 font-hindi text-primary/40 mb-1`}
          lang="hi"
          style={{ fontSize: 'clamp(16px, 3.5vw, 22px)', letterSpacing: '0.2em' }}
        >
          ॐ
        </p>

        {/* ═══ Shloka ═══ */}
        <p
          className={`cinematic-reveal ${r} delay-2 font-hindi font-medium leading-relaxed mb-1 shloka-glow`}
          lang="hi"
          id="ganesha-heading"
          style={{
            fontSize: 'clamp(12px, 2.8vw, 16px)',
            color: 'hsl(var(--gold-primary))',
            letterSpacing: '0.03em',
            maxWidth: '420px',
          }}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          <br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>

        {/* ═══ Ornate Divider ═══ */}
        <div className={`cinematic-reveal ${r} delay-2`}>
          <OrnateDivider animate={revealed} />
        </div>

        {/* ═══ DEAR + Guest Name ═══ */}
        <p
          className={`cinematic-reveal ${r} delay-3 font-heading text-foreground/45 tracking-[0.35em] uppercase mb-1`}
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)' }}
        >
          Dear
        </p>

        <div className={`cinematic-reveal ${r} delay-3 flex items-center gap-3 md:gap-5 mb-1.5`}>
          <div className="h-px w-10 sm:w-14 md:w-20 bg-gradient-to-r from-transparent to-primary/40" />
          <span
            className="gold-shimmer font-display tracking-wide guest-name-glow"
            style={{ fontSize: 'clamp(20px, 5vw, 34px)', fontWeight: 700 }}
          >
            {guestName}
          </span>
          <div className="h-px w-10 sm:w-14 md:w-20 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        <p
          className={`cinematic-reveal ${r} delay-3 font-heading text-foreground/40 tracking-[0.18em] uppercase mb-5`}
          style={{ fontSize: 'clamp(9px, 2vw, 12px)', lineHeight: 1.6 }}
        >
          You are cordially invited to the wedding of
        </p>

        {/* ═══ Couple Names — Premium ═══ */}
        <div className={`cinematic-reveal ${r} delay-4 mb-1`}>
          <h1
            className="font-display leading-none couple-name-glow"
            style={{
              fontSize: 'clamp(28px, 7vw, 56px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gold-shimmer 4s linear infinite',
            }}
          >
            Harshit
          </h1>
        </div>

        {/* Ampersand with decorative lines */}
        <div className={`cinematic-reveal ${r} delay-4 opening-ampersand-container mb-1`}>
          <div className="opening-amp-line-left">
            <div className="opening-amp-diamond" />
            <div className="opening-amp-line" />
          </div>
          <span
            className="font-heading italic text-primary/70"
            style={{ fontSize: 'clamp(18px, 4vw, 32px)' }}
          >
            &amp;
          </span>
          <div className="opening-amp-line-right">
            <div className="opening-amp-line" />
            <div className="opening-amp-diamond" />
          </div>
        </div>

        <div className={`cinematic-reveal ${r} delay-4 mb-2`}>
          <h1
            className="font-display leading-none couple-name-glow"
            style={{
              fontSize: 'clamp(28px, 7vw, 56px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, hsl(var(--gold-tertiary)), hsl(var(--gold-primary)), hsl(var(--gold-secondary)), hsl(var(--gold-primary)), hsl(var(--gold-tertiary)))',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gold-shimmer 4s linear infinite',
            }}
          >
            Anshikha
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`cinematic-reveal ${r} delay-5 font-heading italic text-foreground/40 tracking-[0.25em] mb-3`}
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)' }}
        >
          Two Souls, One Journey
        </p>

        {/* Date */}
        <p
          className={`cinematic-reveal ${r} delay-5 font-body text-primary/65 tracking-[0.12em] mb-6`}
          style={{ fontSize: 'clamp(13px, 3vw, 17px)', fontWeight: 500 }}
        >
          10th May 2026
        </p>

        {/* ═══ Open Invitation Button — Premium CTA ═══ */}
        <button
          onClick={onBeginClick}
          className={`opening-cta-btn-premium group cinematic-reveal ${r} delay-5`}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
          aria-label="Open the wedding invitation"
        >
          {/* Corner diamonds */}
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
