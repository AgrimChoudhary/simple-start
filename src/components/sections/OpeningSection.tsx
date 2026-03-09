import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
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
  const scrollRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

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

  // Track scroll to hide scroll indicator
  const handleScroll = useCallback(() => {
    if (scrollRef.current) setScrollY(scrollRef.current.scrollTop);
  }, []);

  const [copied, setCopied] = useState(false);
  const copyHashtag = () => {
    navigator.clipboard.writeText('#HarAnshTera');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Falling marigold petals
  const fallingPetals = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${3 + Math.random() * 94}%`,
      delay: `${Math.random() * 14}s`,
      duration: `${11 + Math.random() * 9}s`,
      size: `${6 + Math.random() * 8}px`,
      driftX: `${-45 + Math.random() * 90}px`,
      driftRotate: `${180 + Math.random() * 540}deg`,
      opacity: 0.12 + Math.random() * 0.18,
      color: ['hsl(38 36% 60%)', 'hsl(42 75% 46%)', 'hsl(38 40% 65%)', 'hsl(30 60% 50%)', 'hsl(35 50% 55%)'][Math.floor(Math.random() * 5)],
    })),
  []);

  // Sparkle dots
  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      size: `${1.5 + Math.random() * 2}px`,
    })),
  []);

  const dateCornerSvg = (
    <svg viewBox="0 0 14 14" fill="none">
      <path d="M0 14 L0 4 Q0 0 4 0 L14 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="2" cy="2" r="1" fill="hsl(38 36% 60%)" opacity="0.3" />
    </svg>
  );

  return (
    <section
      ref={scrollRef}
      className="opening-section-scroll"
      aria-labelledby="opening-heading"
      onScroll={handleScroll}
    >
      {/* ══════════ BACKGROUND LAYERS ══════════ */}
      <div className="absolute inset-0 pointer-events-none opening-section-bg" />
      <div className="opening-texture-overlay" aria-hidden="true" />
      <div className="opening-vignette" aria-hidden="true" />
      
      {/* Animated Mandala rings */}
      <div
        className="opening-mandala-container"
        style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 1.5s ease-out' }}
        aria-hidden="true"
      >
        <div className="opening-mandala-ring opening-mandala-ring-1" />
        <div className="opening-mandala-ring opening-mandala-ring-2" />
        <div className="opening-mandala-ring opening-mandala-ring-3" />
        <div className="opening-mandala-ring opening-mandala-ring-4" />
      </div>
      
      {/* Glow layers */}
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
      <div
        className="opening-glow-layer-accent"
        style={{ opacity: step >= 3 ? 0.5 : 0, transition: 'opacity 2s ease-out 0.6s' }}
        aria-hidden="true"
      />
      
      <SectionBorderFrame active={active} variant="standard" />

      {/* ── Sparkle dots ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
        {sparkles.map(s => (
          <div
            key={s.id}
            className="opening-sparkle"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              opacity: step >= 2 ? undefined : 0,
            }}
          />
        ))}
      </div>

      {/* ── Jharokha Arch Background ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: step >= 1 ? 0.07 : 0,
          transform: step >= 1 ? 'scale(1)' : 'scale(0.88)',
          transition: 'opacity 1.4s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 800" className="w-[85%] max-w-[460px] h-auto" fill="none">
          <path d="M40 800 L40 300 Q40 70 250 30 Q460 70 460 300 L460 800" stroke="hsl(38 36% 60%)" strokeWidth="2.5" />
          <path d="M70 800 L70 320 Q70 110 250 65 Q430 110 430 320 L430 800" stroke="hsl(38 36% 60%)" strokeWidth="1.5" />
          <path d="M100 800 L100 340 Q100 150 250 100 Q400 150 400 340 L400 800" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          <path d="M90 340 Q120 270 150 320 Q180 270 210 320 Q240 270 270 320 Q300 270 330 320 Q360 270 390 320 Q420 270 410 340" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
          <path d="M230 45 L250 20 L270 45" stroke="hsl(38 36% 60%)" strokeWidth="2" />
          <circle cx="250" cy="55" r="10" stroke="hsl(38 36% 60%)" strokeWidth="1" />
          <circle cx="250" cy="55" r="5" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          <line x1="55" y1="370" x2="55" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          <line x1="445" y1="370" x2="445" y2="780" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          <circle cx="250" cy="380" r="130" stroke="hsl(38 36% 60%)" strokeWidth="0.3" strokeDasharray="6 4" opacity="0.5" />
          <circle cx="250" cy="380" r="160" stroke="hsl(38 36% 60%)" strokeWidth="0.2" strokeDasharray="3 6" opacity="0.3" />
          <circle cx="250" cy="380" r="190" stroke="hsl(38 36% 60%)" strokeWidth="0.15" strokeDasharray="2 8" opacity="0.2" />
          <path d="M220 770 Q230 750 250 745 Q270 750 280 770" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
          <path d="M210 775 Q230 755 250 748 Q270 755 290 775" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      {/* ── Paisley Corner Ornaments ── */}
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
            opacity: step >= 1 ? 0.12 : 0,
            transform: step >= 1 ? `rotate(${corner.rotate})` : `rotate(${corner.rotate}) scale(0.3)`,
            transition: `opacity 1s ease-out ${corner.delay}, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${corner.delay}`,
          }}
          aria-hidden="true"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
            <path d="M5 75 Q5 5 75 5" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" />
            <path d="M12 75 Q12 18 68 12" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
            <path d="M8 60 Q16 38 38 22" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
            <circle cx="28" cy="28" r="6" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" />
            <circle cx="28" cy="28" r="2.5" fill="hsl(38 36% 60%)" opacity="0.4" />
            <path d="M42 8 Q46 14 42 20" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
            <path d="M8 42 Q14 46 20 42" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
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

      {/* ── Jaali arches — bottom border ── */}
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
          className="opening-content-block flex-row items-center gap-2 md:gap-3 mb-6 md:mb-8"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
          }}
        >
          <DiyaIcon lit={active} />
          <p className="font-heading text-foreground/70 text-xs md:text-sm lg:text-base italic leading-tight tracking-wider">
            Two Hearts, One Promise, A Lifetime Together
          </p>
          <DiyaIcon lit={active} />
        </div>

        {/* ── Couple Photo with Jharokha Frame ── */}
        <div
          className="opening-content-block relative mb-8 md:mb-12"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(30px)',
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Ornate Jharokha arch frame */}
          <div className="opening-photo-jharokha" aria-hidden="true">
            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="w-[220px] md:w-[300px]">
              <path d="M15 160 L15 70 Q15 5 140 5 Q265 5 265 70 L265 160" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M35 160 L35 78 Q35 20 140 15 Q245 20 245 78 L245 160" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.2" />
              <path d="M50 85 Q70 60 90 80 Q110 55 140 75 Q170 55 190 80 Q210 60 230 85" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" opacity="0.18" />
              <path d="M128 10 L140 0 L152 10" stroke="hsl(38 36% 60%)" strokeWidth="1.2" fill="none" opacity="0.35" />
              <circle cx="140" cy="16" r="4" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" opacity="0.25" />
            </svg>
          </div>

          {/* Photo circle */}
          <div className="couple-photo-frame opening-photo-enlarged">
            <div className="opening-photo-ring" aria-hidden="true" />
            <div className="opening-photo-ring-2" aria-hidden="true" />
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
            <svg width="160" height="36" viewBox="0 0 160 36" fill="none">
              <path d="M40 32 Q55 14 80 6 Q105 14 120 32" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.35" />
              <path d="M30 34 Q55 10 80 3 Q105 10 130 34" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.2" />
              <path d="M50 30 Q65 16 80 10 Q95 16 110 30" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" opacity="0.15" />
              <circle cx="80" cy="6" r="2.5" fill="hsl(38 36% 60%)" opacity="0.3" />
              <circle cx="80" cy="6" r="5" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" opacity="0.15" />
              {/* Side ornamental dots */}
              <circle cx="35" cy="30" r="1" fill="hsl(38 36% 60%)" opacity="0.2" />
              <circle cx="125" cy="30" r="1" fill="hsl(38 36% 60%)" opacity="0.2" />
            </svg>
          </div>
        </div>

        {/* ── Couple Names — STACKED VERTICALLY ── */}
        <div className="opening-content-block flex-col items-center gap-0 md:gap-1 mb-3 md:mb-5" id="opening-heading">
          <h1
            className="font-display gold-shimmer leading-none opening-name-glow"
            style={{
              fontSize: 'clamp(34px, 10vw, 72px)',
              letterSpacing: 'clamp(5px, 2vw, 14px)',
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? 'slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            HARSHIT
          </h1>

          {/* Decorative ampersand with ornament */}
          <div
            className="relative my-2 md:my-3"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.6s ease-out 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <span
              className="font-display gold-shimmer leading-none block"
              style={{ fontSize: 'clamp(22px, 5vw, 44px)', backgroundSize: '200% 100%' }}
            >
              &amp;
            </span>
            {/* Ornamental lines with diamond ends */}
            <div className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
              <div className="w-5 md:w-9 h-px bg-gradient-to-r from-transparent to-primary/40" />
            </div>
            <div className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
              <div className="w-5 md:w-9 h-px bg-gradient-to-l from-transparent to-primary/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-primary/30" />
            </div>
          </div>

          <h1
            className="font-display gold-shimmer leading-none opening-name-glow"
            style={{
              fontSize: 'clamp(34px, 10vw, 72px)',
              letterSpacing: 'clamp(5px, 2vw, 14px)',
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
          <p className="opening-married-text text-base md:text-xl lg:text-2xl tracking-widest">
            are getting married
          </p>
        </div>

        {/* ── Decorative Lotus Divider ── */}
        <div
          className="opening-content-block mb-5 md:mb-7"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.2s',
          }}
        >
          <svg width="200" height="28" viewBox="0 0 200 28" fill="none" className="w-[150px] md:w-[200px]" aria-hidden="true">
            <line x1="0" y1="14" x2="60" y2="14" stroke="hsl(38 36% 60%)" strokeWidth="0.5" opacity="0.35" />
            {/* Lotus center */}
            <path d="M75 24 Q87 10 100 5 Q113 10 125 24" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.45" />
            <path d="M80 26 Q90 12 100 7 Q110 12 120 26" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.25" />
            <path d="M85 25 Q93 14 100 10 Q107 14 115 25" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" opacity="0.15" />
            <circle cx="100" cy="7" r="2.5" fill="hsl(38 36% 60%)" opacity="0.35" />
            <line x1="140" y1="14" x2="200" y2="14" stroke="hsl(38 36% 60%)" strokeWidth="0.5" opacity="0.35" />
            {/* Small diamond accents */}
            <rect x="62" y="12" width="4" height="4" transform="rotate(45 64 14)" fill="hsl(38 36% 60%)" opacity="0.2" />
            <rect x="134" y="12" width="4" height="4" transform="rotate(45 136 14)" fill="hsl(38 36% 60%)" opacity="0.2" />
          </svg>
        </div>

        {/* ── Date + Venue Block ── */}
        <div
          className="opening-content-block mb-6 md:mb-10"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
            transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="opening-date-card">
            {/* Decorative corners */}
            <div className="opening-date-corner opening-date-corner-tl">{dateCornerSvg}</div>
            <div className="opening-date-corner opening-date-corner-tr">{dateCornerSvg}</div>
            <div className="opening-date-corner opening-date-corner-bl">{dateCornerSvg}</div>
            <div className="opening-date-corner opening-date-corner-br">{dateCornerSvg}</div>

            <p className="font-hindi text-primary/55 text-xs md:text-sm mb-2 md:mb-3 relative z-10">शुभ विवाह</p>
            <p className="font-body text-foreground text-lg md:text-xl lg:text-2xl mb-1 md:mb-2 relative z-10 font-medium" style={{ letterSpacing: '3px' }}>
              10th May 2026
            </p>
            <div className="w-10 h-px bg-primary/20 mx-auto mb-1.5 md:mb-2 relative z-10" />
            <p className="font-heading text-foreground/45 text-xs md:text-sm lg:text-base italic relative z-10 tracking-wide">
              Jaipur, Rajasthan
            </p>
          </div>
        </div>

        {/* ── Hashtag ── */}
        <div
          className="opening-content-block mb-6 md:mb-10"
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
            <span className="font-hashtag text-lg md:text-xl lg:text-2xl gold-shimmer-slow relative z-10">
              {copied ? '✓ Copied!' : '#HarAnshTera'}
            </span>
          </button>
        </div>

        {/* ── Bottom Gold Divider ── */}
        <div
          className="opening-content-block mb-8 md:mb-10"
          style={{
            opacity: step >= 7 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <GoldDivider />
        </div>

        {/* ── Royal CTA Button ── */}
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

        <div className="h-16 md:h-20" aria-hidden="true" />
      </div>

      {/* ══════════ SCROLL INDICATOR ══════════ */}
      <div
        className="opening-scroll-hint"
        style={{
          opacity: step >= 2 && scrollY < 60 ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
        aria-hidden="true"
      >
        <div className="opening-scroll-diya">
          <DiyaIcon lit={active} />
        </div>
        <div className="opening-scroll-mouse">
          <div className="opening-scroll-wheel" />
        </div>
        <p className="opening-scroll-text">Scroll Down</p>
        <div className="opening-scroll-arrows">
          <span className="opening-scroll-chevron" />
          <span className="opening-scroll-chevron opening-scroll-chevron-2" />
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;
