import React, { useEffect, useState, useMemo } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import DiyaIcon from '@/components/global/DiyaIcon';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import coupleImage from '@/assets/couple-illustration.png';

interface OpeningSectionProps {
  active: boolean;
  guestName: string;
  onViewCelebrations: () => void;
  visited: boolean;
}

const OpeningSection: React.FC<OpeningSectionProps> = ({ active, onViewCelebrations, visited }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (visited) { setStep(8); return; }

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2400),
      setTimeout(() => setStep(6), 3000),
      setTimeout(() => setStep(7), 3600),
      setTimeout(() => setStep(8), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, visited]);

  const [copied, setCopied] = useState(false);
  const copyHashtag = () => {
    navigator.clipboard.writeText('#HarAnshTera');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Falling marigold petals - CSS-only with randomized properties
  const fallingPetals = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${10 + Math.random() * 8}s`,
      size: `${7 + Math.random() * 7}px`,
      driftX: `${-40 + Math.random() * 80}px`,
      driftRotate: `${180 + Math.random() * 540}deg`,
      opacity: 0.15 + Math.random() * 0.2,
      color: ['hsl(38 36% 60%)', 'hsl(42 75% 46%)', 'hsl(38 40% 65%)', 'hsl(30 60% 50%)'][Math.floor(Math.random() * 4)],
    })),
  []);

  return (
    <section
      className="opening-section-scroll"
      aria-labelledby="opening-heading"
    >
      {/* ══════════ ENHANCED BACKGROUND LAYERS ══════════ */}
      
      {/* Base gradient background */}
      <div className="absolute inset-0 pointer-events-none opening-section-bg" />
      
      {/* Vignette effect — dark edges for depth */}
      <div className="opening-vignette" aria-hidden="true" />
      
      {/* Jaali pattern overlay */}
      <div className="jaali-overlay" />
      
      {/* Animated Mandala rings */}
      <div
        className="opening-mandala-container"
        style={{
          opacity: step >= 1 ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
        }}
        aria-hidden="true"
      >
        <div className="opening-mandala-ring opening-mandala-ring-1" />
        <div className="opening-mandala-ring opening-mandala-ring-2" />
        <div className="opening-mandala-ring opening-mandala-ring-3" />
      </div>
      
      {/* Multiple radial glow layers */}
      <div
        className="opening-glow-layer-primary"
        style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity 1.5s ease-out' }}
        aria-hidden="true"
      />
      <div
        className="opening-glow-layer-secondary"
        style={{ opacity: step >= 2 ? 0.6 : 0, transition: 'opacity 2s ease-out 0.3s' }}
        aria-hidden="true"
      />
      
      {/* Section border frame */}
      <SectionBorderFrame active={active} variant="standard" />

      {/* ── Jharokha Arch Background ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: step >= 1 ? 0.08 : 0,
          transform: step >= 1 ? 'scale(1)' : 'scale(0.88)',
          transition: 'opacity 1.4s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 800" className="w-[85%] max-w-[460px] h-auto" fill="none">
          {/* Outer arch */}
          <path d="M40 800 L40 300 Q40 70 250 30 Q460 70 460 300 L460 800" stroke="hsl(38 36% 60%)" strokeWidth="2.5" />
          {/* Inner arch */}
          <path d="M70 800 L70 320 Q70 110 250 65 Q430 110 430 320 L430 800" stroke="hsl(38 36% 60%)" strokeWidth="1.5" />
          {/* Third arch layer */}
          <path d="M100 800 L100 340 Q100 150 250 100 Q400 150 400 340 L400 800" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          {/* Scalloped detail */}
          <path d="M90 340 Q120 270 150 320 Q180 270 210 320 Q240 270 270 320 Q300 270 330 320 Q360 270 390 320 Q420 270 410 340" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
          {/* Keystone */}
          <path d="M230 45 L250 20 L270 45" stroke="hsl(38 36% 60%)" strokeWidth="2" />
          <circle cx="250" cy="55" r="10" stroke="hsl(38 36% 60%)" strokeWidth="1" />
          <circle cx="250" cy="55" r="5" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          {/* Pillar details */}
          <line x1="55" y1="370" x2="55" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          <line x1="445" y1="370" x2="445" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          <line x1="85" y1="390" x2="85" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
          <line x1="415" y1="390" x2="415" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
          {/* Base ornamental lines */}
          <line x1="40" y1="790" x2="460" y2="790" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          <line x1="60" y1="785" x2="440" y2="785" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
          {/* Mandala rings */}
          <circle cx="250" cy="380" r="130" stroke="hsl(38 36% 60%)" strokeWidth="0.3" strokeDasharray="6 4" opacity="0.5" />
          <circle cx="250" cy="380" r="160" stroke="hsl(38 36% 60%)" strokeWidth="0.2" strokeDasharray="3 6" opacity="0.3" />
          <circle cx="250" cy="380" r="190" stroke="hsl(38 36% 60%)" strokeWidth="0.15" strokeDasharray="2 8" opacity="0.2" />
          {/* Lotus motif at base of arch */}
          <path d="M220 770 Q230 750 250 745 Q270 750 280 770" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
          <path d="M210 775 Q230 755 250 748 Q270 755 290 775" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      {/* ── Paisley Corner Ornaments with Gold Flourish ── */}
      {[
        { pos: 'top-2 left-2 md:top-4 md:left-4', rotate: '0deg', delay: '0s' },
        { pos: 'top-2 right-2 md:top-4 md:right-4', rotate: '90deg', delay: '0.15s' },
        { pos: 'bottom-2 right-2 md:bottom-4 md:right-4', rotate: '180deg', delay: '0.3s' },
        { pos: 'bottom-2 left-2 md:bottom-4 md:left-4', rotate: '270deg', delay: '0.45s' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} pointer-events-none`}
          style={{
            opacity: step >= 1 ? 0.1 : 0,
            transform: step >= 1 ? `rotate(${corner.rotate})` : `rotate(${corner.rotate}) scale(0.3)`,
            transition: `opacity 1s ease-out ${corner.delay}, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${corner.delay}`,
          }}
          aria-hidden="true"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
            {/* Enhanced paisley with gold flourish */}
            <path d="M5 75 Q5 5 75 5" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" />
            <path d="M12 75 Q12 18 68 12" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
            <path d="M8 60 Q16 38 38 22" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
            <circle cx="28" cy="28" r="6" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" />
            <circle cx="28" cy="28" r="2.5" fill="hsl(38 36% 60%)" opacity="0.4" />
            <path d="M42 8 Q46 14 42 20" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
            <path d="M8 42 Q14 46 20 42" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
            {/* Corner glow dot */}
            <circle cx="10" cy="70" r="4" fill="hsl(38 36% 60%)" opacity="0.15" className="opening-corner-glow" />
          </svg>
        </div>
      ))}

      {/* ── Falling Marigold Petals ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {fallingPetals.map(petal => (
          <div
            key={petal.id}
            className="opening-falling-petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size,
              backgroundColor: petal.color,
              opacity: step >= 2 ? petal.opacity : 0,
              ['--drift-x' as string]: petal.driftX,
              ['--drift-rotate' as string]: petal.driftRotate,
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* ── Jaali arches — top border ── */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <svg viewBox="0 0 800 90" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 90 L${x} 32 Q${x + 50} -8 ${x + 100} 32 L${x + 100} 90`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.8" />
              <path d={`M${x + 15} 90 L${x + 15} 44 Q${x + 50} 10 ${x + 85} 44 L${x + 85} 90`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
              <circle cx={x + 50} cy="22" r="5" fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
            </g>
          ))}
        </svg>
      </div>

      {/* ── Jaali arches — bottom border (mirroring top) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-[0.06] rotate-180" aria-hidden="true">
        <svg viewBox="0 0 800 90" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 90 L${x} 32 Q${x + 50} -8 ${x + 100} 32 L${x + 100} 90`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.8" />
              <path d={`M${x + 15} 90 L${x + 15} 44 Q${x + 50} 10 ${x + 85} 44 L${x + 85} 90`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
            </g>
          ))}
        </svg>
      </div>

      {/* ══════════ SCROLLABLE CONTENT ══════════ */}
      <div className="opening-scroll-content">
        
        {/* ── Top Gold Divider ── */}
        <div
          className="opening-content-block"
          style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
        >
          <GoldDivider className="mb-3" />
        </div>

        {/* ── Tagline with Diyas ── */}
        <div
          className="opening-content-block flex-row items-center gap-2 md:gap-3 mb-5 md:mb-6"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          <DiyaIcon lit={active} />
          <p className="font-heading text-foreground/80 text-xs md:text-base lg:text-lg italic leading-tight">
            Two Hearts, One Promise, A Lifetime Together
          </p>
          <DiyaIcon lit={active} />
        </div>

        {/* ── Couple Photo with Jharokha Frame ── */}
        <div
          className="opening-content-block relative mb-6 md:mb-10"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(30px)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Ornate Jharokha arch frame around photo */}
          <div className="opening-photo-jharokha" aria-hidden="true">
            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="w-[200px] md:w-[280px]">
              {/* Main arch */}
              <path d="M15 160 L15 70 Q15 5 140 5 Q265 5 265 70 L265 160" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" opacity="0.35" />
              {/* Inner arch */}
              <path d="M35 160 L35 78 Q35 20 140 15 Q245 20 245 78 L245 160" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.25" />
              {/* Scalloped detail */}
              <path d="M50 85 Q70 60 90 80 Q110 55 140 75 Q170 55 190 80 Q210 60 230 85" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" opacity="0.2" />
              {/* Keystone */}
              <path d="M128 10 L140 0 L152 10" stroke="hsl(38 36% 60%)" strokeWidth="1.2" fill="none" opacity="0.4" />
              <circle cx="140" cy="16" r="4" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" opacity="0.3" />
              {/* Pillar tops */}
              <rect x="12" y="65" width="8" height="3" fill="hsl(38 36% 60%)" opacity="0.15" rx="1" />
              <rect x="260" y="65" width="8" height="3" fill="hsl(38 36% 60%)" opacity="0.15" rx="1" />
            </svg>
          </div>

          {/* Photo circle with couple image */}
          <div className="couple-photo-frame opening-photo-enlarged">
            <div className="couple-photo-inner">
              <img
                src={coupleImage}
                alt="Harshit & Anshikha — Royal Wedding Illustration"
                loading="eager"
              />
            </div>
          </div>

          {/* Decorative lotus below photo */}
          <div className="opening-lotus-below" aria-hidden="true">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
              <path d="M30 28 Q40 10 60 5 Q80 10 90 28" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.3" />
              <path d="M20 30 Q40 8 60 2 Q80 8 100 30" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.2" />
              <circle cx="60" cy="5" r="2" fill="hsl(38 36% 60%)" opacity="0.25" />
            </svg>
          </div>
        </div>

        {/* ── Couple Names — STACKED VERTICALLY ── */}
        <div className="opening-content-block flex-col items-center gap-0 md:gap-1 mb-4 md:mb-6" id="opening-heading">
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(32px, 9vw, 68px)',
              letterSpacing: 'clamp(4px, 1.5vw, 12px)',
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? 'slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            HARSHIT
          </h1>

          {/* Decorative ampersand with ornament */}
          <div
            className="relative my-1 md:my-2"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.6s ease-out 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <span
              className="font-display gold-shimmer leading-none block"
              style={{ fontSize: 'clamp(24px, 6vw, 48px)', backgroundSize: '200% 100%' }}
            >
              &amp;
            </span>
            {/* Ornamental lines around & */}
            <div className="absolute -left-6 md:-left-10 top-1/2 w-4 md:w-8 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <div className="absolute -right-6 md:-right-10 top-1/2 w-4 md:w-8 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(32px, 9vw, 68px)',
              letterSpacing: 'clamp(4px, 1.5vw, 12px)',
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            ANSHIKHA
          </h1>
        </div>

        {/* ── "Are Getting Married" text ── */}
        <div
          className="opening-content-block mb-4 md:mb-6"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p className="font-heading text-foreground/70 text-base md:text-xl lg:text-2xl italic tracking-wide">
            are getting married
          </p>
        </div>

        {/* ── Decorative Lotus Divider ── */}
        <div
          className="opening-content-block mb-4 md:mb-6"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.2s',
          }}
        >
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none" className="w-[140px] md:w-[180px]" aria-hidden="true">
            <line x1="0" y1="12" x2="55" y2="12" stroke="hsl(38 36% 60%)" strokeWidth="0.5" opacity="0.4" />
            {/* Lotus center */}
            <path d="M70 20 Q80 8 90 4 Q100 8 110 20" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.5" />
            <path d="M75 22 Q85 10 90 6 Q95 10 105 22" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.3" />
            <circle cx="90" cy="6" r="2" fill="hsl(38 36% 60%)" opacity="0.4" />
            <line x1="125" y1="12" x2="180" y2="12" stroke="hsl(38 36% 60%)" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        {/* ── Date + Venue Block ── */}
        <div
          className="opening-content-block opening-date-card mb-5 md:mb-8"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="font-hindi text-primary/60 text-xs md:text-sm mb-1 md:mb-2">शुभ विवाह</p>
          <p className="font-body text-foreground text-base md:text-lg lg:text-xl mb-0.5 md:mb-1" style={{ letterSpacing: '2px' }}>
            10th May 2026
          </p>
          <p className="font-heading text-foreground/50 text-xs md:text-sm lg:text-base italic">
            Jaipur, Rajasthan
          </p>
        </div>

        {/* ── Hashtag ── */}
        <div
          className="opening-content-block mb-5 md:mb-8"
          style={{
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <button
            onClick={copyHashtag}
            className="opening-hashtag-btn"
            aria-label="Copy hashtag to clipboard"
          >
            <span className="font-hashtag text-lg md:text-xl lg:text-2xl gold-shimmer-slow">
              {copied ? '✓ Copied!' : '#HarAnshTera'}
            </span>
          </button>
        </div>

        {/* ── Bottom Gold Divider ── */}
        <div
          className="opening-content-block mb-6 md:mb-8"
          style={{
            opacity: step >= 7 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <GoldDivider />
        </div>

        {/* ── Royal CTA Button with Ornate Styling ── */}
        <div
          className="opening-content-block mb-12 md:mb-16"
          style={{
            opacity: step >= 8 ? 1 : 0,
            transform: step >= 8 ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.9)',
            transition: 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: step >= 8 ? 'auto' : 'none',
          }}
        >
          <button onClick={onViewCelebrations} className="royal-cta-button group">
            {/* Ornate corner diamonds */}
            <span className="royal-btn-corner royal-btn-corner-tl" aria-hidden="true" />
            <span className="royal-btn-corner royal-btn-corner-tr" aria-hidden="true" />
            <span className="royal-btn-corner royal-btn-corner-bl" aria-hidden="true" />
            <span className="royal-btn-corner royal-btn-corner-br" aria-hidden="true" />
            
            <span className="relative z-10 font-ui font-semibold text-xs md:text-sm lg:text-base tracking-[0.2em] uppercase flex items-center gap-2">
              Explore the Celebrations
              <span className="text-base md:text-lg opacity-80">✦</span>
            </span>
          </button>
        </div>

        {/* Bottom spacing for scroll */}
        <div className="h-16 md:h-20" aria-hidden="true" />
      </div>

      {/* ══════════ ENHANCED SCROLL INDICATOR ══════════ */}
      <div
        className="opening-scroll-hint"
        style={{
          opacity: step >= 2 ? 1 : 0,
          transition: 'opacity 1s ease-out 1s',
        }}
        aria-hidden="true"
      >
        {/* Glowing diya above arrow */}
        <div className="opening-scroll-diya">
          <DiyaIcon lit={active} />
        </div>
        
        {/* Mouse wheel indicator */}
        <div className="opening-scroll-mouse">
          <div className="opening-scroll-wheel" />
        </div>
        
        {/* Text hint */}
        <p className="opening-scroll-text">Scroll Down</p>
        
        {/* Animated arrow */}
        <div className="opening-scroll-arrows">
          <span className="opening-scroll-chevron" />
          <span className="opening-scroll-chevron opening-scroll-chevron-2" />
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;
