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
    if (visited) { setStep(10); return; }

    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 500),
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1400),
      setTimeout(() => setStep(5), 2000),
      setTimeout(() => setStep(6), 2600),
      setTimeout(() => setStep(7), 3200),
      setTimeout(() => setStep(8), 3800),
      setTimeout(() => setStep(9), 4400),
      setTimeout(() => setStep(10), 5000),
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

  // Enhanced Floating dust particles — ambient atmosphere
  const dustParticles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 18}s`,
      size: `${1 + Math.random() * 2}px`,
      opacity: 0.1 + Math.random() * 0.2,
    })),
  []);

  // Falling marigold petals — enhanced
  const fallingPetals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${2 + Math.random() * 96}%`,
      delay: `${Math.random() * 16}s`,
      duration: `${10 + Math.random() * 12}s`,
      size: `${5 + Math.random() * 10}px`,
      driftX: `${-50 + Math.random() * 100}px`,
      driftRotate: `${180 + Math.random() * 720}deg`,
      opacity: 0.08 + Math.random() * 0.18,
      color: ['hsl(38 36% 60%)', 'hsl(42 75% 46%)', 'hsl(38 40% 65%)', 'hsl(30 60% 50%)', 'hsl(35 50% 55%)', 'hsl(45 65% 55%)'][Math.floor(Math.random() * 6)],
    })),
  []);

  // Sparkle stars — premium twinkling
  const sparkles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${3 + Math.random() * 94}%`,
      top: `${3 + Math.random() * 94}%`,
      delay: `${Math.random() * 8}s`,
      size: `${1 + Math.random() * 2.5}px`,
      type: Math.random() > 0.6 ? 'star' : 'dot',
    })),
  []);

  // Floating gold orbs — subtle depth
  const goldOrbs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${15 + Math.random() * 70}%`,
      delay: `${Math.random() * 10}s`,
      size: `${40 + Math.random() * 80}px`,
      duration: `${15 + Math.random() * 10}s`,
    })),
  []);

  return (
    <section
      ref={scrollRef}
      className="opening-section-scroll"
      aria-labelledby="opening-heading"
      onScroll={handleScroll}
    >
      {/* ══════════ LAYERED BACKGROUND SYSTEM ══════════ */}
      <div className="opening-bg-base" aria-hidden="true" />
      <div className="opening-bg-gradient" aria-hidden="true" />
      <div className="opening-texture-grain" aria-hidden="true" />
      <div className="opening-vignette-deep" aria-hidden="true" />
      
      {/* ── Floating Gold Orbs (Deep Background) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]" aria-hidden="true">
        {goldOrbs.map(orb => (
          <div
            key={orb.id}
            className="opening-gold-orb"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              animationDelay: orb.delay,
              animationDuration: orb.duration,
              opacity: step >= 1 ? undefined : 0,
            }}
          />
        ))}
      </div>

      {/* ── Animated Mandala Rings ── */}
      <div
        className="opening-mandala-container"
        style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 2s ease-out' }}
        aria-hidden="true"
      >
        <div className="opening-mandala-ring opening-mandala-ring-1" />
        <div className="opening-mandala-ring opening-mandala-ring-2" />
        <div className="opening-mandala-ring opening-mandala-ring-3" />
        <div className="opening-mandala-ring opening-mandala-ring-4" />
        <div className="opening-mandala-ring opening-mandala-ring-5" />
      </div>
      
      {/* ── Multi-Layer Glow System ── */}
      <div
        className="opening-glow-hero"
        style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity 2s ease-out' }}
        aria-hidden="true"
      />
      <div
        className="opening-glow-ambient"
        style={{ opacity: step >= 2 ? 0.7 : 0, transition: 'opacity 2.5s ease-out 0.3s' }}
        aria-hidden="true"
      />
      <div
        className="opening-glow-bottom"
        style={{ opacity: step >= 3 ? 0.6 : 0, transition: 'opacity 2.5s ease-out 0.6s' }}
        aria-hidden="true"
      />
      
      <SectionBorderFrame active={active} variant="royal" />

      {/* ── Dust Particles (Ambient Atmosphere) ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
        {dustParticles.map(p => (
          <div
            key={p.id}
            className="opening-dust-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: step >= 1 ? p.opacity : 0,
            }}
          />
        ))}
      </div>

      {/* ── Sparkle Stars ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
        {sparkles.map(s => (
          <div
            key={s.id}
            className={`opening-sparkle ${s.type === 'star' ? 'opening-sparkle-star' : ''}`}
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

      {/* ── Jharokha Arch Background (Enhanced) ── */}
      <div
        className="opening-jharokha-bg"
        style={{
          opacity: step >= 1 ? 0.06 : 0,
          transform: step >= 1 ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
          transition: 'opacity 1.8s ease-out, transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 900" className="w-[90%] max-w-[480px] h-auto" fill="none">
          {/* Outer arch */}
          <path d="M30 900 L30 280 Q30 50 250 15 Q470 50 470 280 L470 900" stroke="hsl(38 36% 60%)" strokeWidth="2" />
          {/* Second arch */}
          <path d="M55 900 L55 295 Q55 80 250 40 Q445 80 445 295 L445 900" stroke="hsl(38 36% 60%)" strokeWidth="1.2" />
          {/* Third arch */}
          <path d="M80 900 L80 310 Q80 110 250 65 Q420 110 420 310 L420 900" stroke="hsl(38 36% 60%)" strokeWidth="0.6" />
          {/* Scalloped detail */}
          <path d="M75 310 Q100 265 130 300 Q160 250 200 290 Q240 235 280 285 Q320 240 360 290 Q400 250 430 310" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
          {/* Crown ornament */}
          <path d="M220 30 L250 5 L280 30" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="40" r="12" stroke="hsl(38 36% 60%)" strokeWidth="0.8" />
          <circle cx="250" cy="40" r="6" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
          <circle cx="250" cy="40" r="2" fill="hsl(38 36% 60%)" opacity="0.3" />
          {/* Side pillars */}
          <line x1="45" y1="350" x2="45" y2="880" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
          <line x1="455" y1="350" x2="455" y2="880" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
          {/* Concentric circles */}
          <circle cx="250" cy="400" r="100" stroke="hsl(38 36% 60%)" strokeWidth="0.3" strokeDasharray="4 6" opacity="0.4" />
          <circle cx="250" cy="400" r="140" stroke="hsl(38 36% 60%)" strokeWidth="0.2" strokeDasharray="2 8" opacity="0.25" />
          <circle cx="250" cy="400" r="180" stroke="hsl(38 36% 60%)" strokeWidth="0.15" strokeDasharray="1 10" opacity="0.15" />
          <circle cx="250" cy="400" r="220" stroke="hsl(38 36% 60%)" strokeWidth="0.1" strokeDasharray="1 12" opacity="0.1" />
          {/* Bottom lotus */}
          <path d="M200 860 Q225 830 250 820 Q275 830 300 860" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.4" />
          <path d="M180 870 Q220 835 250 822 Q280 835 320 870" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" opacity="0.2" />
        </svg>
      </div>

      {/* ── Corner Ornaments (Luxury) ── */}
      {[
        { pos: 'top-3 left-3 md:top-5 md:left-5', rotate: '0deg', delay: '0s' },
        { pos: 'top-3 right-3 md:top-5 md:right-5', rotate: '90deg', delay: '0.12s' },
        { pos: 'bottom-3 right-3 md:bottom-5 md:right-5', rotate: '180deg', delay: '0.24s' },
        { pos: 'bottom-3 left-3 md:bottom-5 md:left-5', rotate: '270deg', delay: '0.36s' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} pointer-events-none z-[5]`}
          style={{
            opacity: step >= 1 ? 0.18 : 0,
            transform: step >= 1 ? `rotate(${corner.rotate}) scale(1)` : `rotate(${corner.rotate}) scale(0.2)`,
            transition: `opacity 1.2s ease-out ${corner.delay}, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${corner.delay}`,
          }}
          aria-hidden="true"
        >
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" className="w-[65px] h-[65px] md:w-[90px] md:h-[90px]">
            <path d="M5 85 Q5 5 85 5" stroke="hsl(38 36% 60%)" strokeWidth="1.8" fill="none" />
            <path d="M15 85 Q15 20 78 15" stroke="hsl(38 36% 60%)" strokeWidth="0.9" fill="none" />
            <path d="M10 70 Q20 45 45 25" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
            <circle cx="30" cy="30" r="8" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" />
            <circle cx="30" cy="30" r="4" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" />
            <circle cx="30" cy="30" r="1.5" fill="hsl(38 36% 60%)" opacity="0.5" />
            {/* Paisley curl */}
            <path d="M50 8 Q58 16 52 24 Q46 18 50 8" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
            <path d="M8 50 Q16 58 24 52 Q18 46 8 50" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
            {/* Corner glow */}
            <circle cx="10" cy="78" r="6" fill="hsl(38 36% 60%)" opacity="0.08" className="opening-corner-glow" />
          </svg>
        </div>
      ))}

      {/* ── Falling Marigold Petals ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]" aria-hidden="true">
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
              transition: 'opacity 1.5s ease-out',
            }}
          />
        ))}
      </div>

      {/* ── Jaali Border Top ── */}
      <div
        className="opening-jaali-top"
        style={{
          opacity: step >= 1 ? 0.055 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 900 100" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 90, 180, 270, 360, 450, 540, 630, 720, 810].map(x => (
            <g key={x}>
              <path d={`M${x} 100 L${x} 35 Q${x + 45} -5 ${x + 90} 35 L${x + 90} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="1" />
              <path d={`M${x + 12} 100 L${x + 12} 45 Q${x + 45} 12 ${x + 78} 45 L${x + 78} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
              <circle cx={x + 45} cy="22" r="6" fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.4" />
              <circle cx={x + 45} cy="22" r="2" fill="hsl(38 36% 60%)" opacity="0.2" />
            </g>
          ))}
        </svg>
      </div>

      {/* ── Jaali Border Bottom ── */}
      <div
        className="opening-jaali-bottom"
        style={{
          opacity: step >= 1 ? 0.055 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 900 100" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          {[0, 90, 180, 270, 360, 450, 540, 630, 720, 810].map(x => (
            <g key={x}>
              <path d={`M${x} 100 L${x} 35 Q${x + 45} -5 ${x + 90} 35 L${x + 90} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="1" />
              <path d={`M${x + 12} 100 L${x + 12} 45 Q${x + 45} 12 ${x + 78} 45 L${x + 78} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* ══════════ SCROLLABLE CONTENT ══════════ */}
      <div className="opening-scroll-content">
        
        {/* ── Top Gold Divider with Animation ── */}
        <div
          className="opening-content-block mb-2"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <GoldDivider className="mb-3" />
        </div>

        {/* ── Decorative Star ── */}
        <div
          className="opening-content-block mb-3"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
            transition: 'opacity 0.6s ease-out 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <div className="opening-star-ornament">✦</div>
        </div>

        {/* ── Tagline with Diyas ── */}
        <div
          className="opening-content-block flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <DiyaIcon lit={active} />
          <p className="opening-tagline">
            Two Hearts, One Promise, A Lifetime Together
          </p>
          <DiyaIcon lit={active} />
        </div>

        {/* ── Couple Photo with Premium Animated Frame ── */}
        <div
          className="opening-content-block relative mb-10 md:mb-14"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(40px)',
            transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Jharokha arch frame above photo */}
          <div
            className="opening-photo-arch"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'translateY(0)' : 'translateY(-15px)',
              transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
            }}
            aria-hidden="true"
          >
            <svg width="300" height="180" viewBox="0 0 300 180" fill="none" className="w-[240px] md:w-[320px]">
              <path d="M20 180 L20 80 Q20 10 150 5 Q280 10 280 80 L280 180" stroke="hsl(38 36% 60%)" strokeWidth="1.2" fill="none" opacity="0.25" />
              <path d="M40 180 L40 88 Q40 25 150 18 Q260 25 260 88 L260 180" stroke="hsl(38 36% 60%)" strokeWidth="0.7" fill="none" opacity="0.15" />
              <path d="M55 95 Q80 65 110 88 Q140 55 170 85 Q200 55 230 88 Q260 65 255 95" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.12" />
              <path d="M135 12 L150 2 L165 12" stroke="hsl(38 36% 60%)" strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="150" cy="18" r="5" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.2" />
              <circle cx="150" cy="18" r="2" fill="hsl(38 36% 60%)" opacity="0.15" />
            </svg>
          </div>

          {/* Photo container with animated rings */}
          <div className="couple-photo-container">
            {/* Outer animated rings */}
            <div className="couple-photo-orbit-1" aria-hidden="true" />
            <div className="couple-photo-orbit-2" aria-hidden="true" />
            <div className="couple-photo-orbit-3" aria-hidden="true" />
            
            {/* Main photo frame */}
            <div className="couple-photo-frame-premium">
              <div className="couple-photo-glow" aria-hidden="true" />
              <div className="couple-photo-inner-premium">
                <img
                  src={coupleImage}
                  alt="Harshit & Anshikha — Royal Wedding Illustration"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Lotus ornament below photo */}
          <div
            className="opening-lotus-ornament"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'translateY(0) scaleX(1)' : 'translateY(-10px) scaleX(0)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
            aria-hidden="true"
          >
            <svg width="180" height="45" viewBox="0 0 180 45" fill="none">
              <path d="M35 40 Q60 18 90 8 Q120 18 145 40" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.35" />
              <path d="M25 42 Q55 15 90 5 Q125 15 155 42" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.2" />
              <path d="M50 38 Q70 20 90 12 Q110 20 130 38" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" opacity="0.15" />
              <circle cx="90" cy="8" r="3" fill="hsl(38 36% 60%)" opacity="0.35" />
              <circle cx="90" cy="8" r="6" stroke="hsl(38 36% 60%)" strokeWidth="0.3" fill="none" opacity="0.2" />
              <circle cx="30" cy="38" r="1.5" fill="hsl(38 36% 60%)" opacity="0.25" />
              <circle cx="150" cy="38" r="1.5" fill="hsl(38 36% 60%)" opacity="0.25" />
              {/* Side decorative lines */}
              <line x1="0" y1="25" x2="20" y2="25" stroke="hsl(38 36% 60%)" strokeWidth="0.4" opacity="0.2" />
              <line x1="160" y1="25" x2="180" y2="25" stroke="hsl(38 36% 60%)" strokeWidth="0.4" opacity="0.2" />
            </svg>
          </div>
        </div>

        {/* ── Couple Names — PREMIUM STACKED ── */}
        <div className="opening-content-block flex-col items-center gap-0 mb-4 md:mb-6" id="opening-heading">
          <h1
            className="opening-name-text"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'opacity 1s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            HARSHIT
          </h1>

          {/* Decorative ampersand with ornamental lines */}
          <div
            className="opening-ampersand-container"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'scale(1)' : 'scale(0.3)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="opening-amp-line-left">
              <div className="opening-amp-diamond" />
              <div className="opening-amp-line" />
            </div>
            <span className="opening-ampersand">&amp;</span>
            <div className="opening-amp-line-right">
              <div className="opening-amp-line" />
              <div className="opening-amp-diamond" />
            </div>
          </div>

          <h1
            className="opening-name-text"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'translateX(0)' : 'translateX(60px)',
              transition: 'opacity 1s ease-out 0.1s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            ANSHIKHA
          </h1>
        </div>

        {/* ── "Are Getting Married" text ── */}
        <div
          className="opening-content-block mb-5 md:mb-7"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          <p className="opening-married-text-premium">
            are getting married
          </p>
        </div>

        {/* ── Decorative Divider ── */}
        <div
          className="opening-content-block mb-6 md:mb-8"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 0.6s ease-out 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <div className="opening-ornate-divider">
            <div className="opening-divider-line" />
            <div className="opening-divider-lotus">
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                <path d="M15 28 Q25 14 30 8 Q35 14 45 28" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.5" />
                <path d="M18 28 Q27 16 30 10 Q33 16 42 28" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" opacity="0.3" />
                <circle cx="30" cy="8" r="2.5" fill="hsl(38 36% 60%)" opacity="0.45" />
              </svg>
            </div>
            <div className="opening-divider-line" />
          </div>
        </div>

        {/* ── Date + Venue Card — Luxury Glass ── */}
        <div
          className="opening-content-block mb-8 md:mb-12"
          style={{
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.92)',
            transition: 'opacity 1s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="opening-date-card-premium">
            {/* Animated border glow */}
            <div className="opening-date-glow" aria-hidden="true" />
            
            {/* Corner ornaments */}
            <div className="opening-date-corner opening-date-corner-tl">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
              </svg>
            </div>
            <div className="opening-date-corner opening-date-corner-tr">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
              </svg>
            </div>
            <div className="opening-date-corner opening-date-corner-bl">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
              </svg>
            </div>
            <div className="opening-date-corner opening-date-corner-br">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
              </svg>
            </div>

            <p className="opening-date-hindi">शुभ विवाह</p>
            <p className="opening-date-main">10th May 2026</p>
            <div className="opening-date-line" />
            <p className="opening-date-venue">Jaipur, Rajasthan</p>
          </div>
        </div>

        {/* ── Hashtag Button — Premium ── */}
        <div
          className="opening-content-block mb-8 md:mb-10"
          style={{
            opacity: step >= 7 ? 1 : 0,
            transform: step >= 7 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <button
            onClick={copyHashtag}
            className="opening-hashtag-btn-premium"
            aria-label="Copy hashtag to clipboard"
          >
            <span className="opening-hashtag-decor opening-hashtag-decor-left">❧</span>
            <span className="opening-hashtag-text">
              {copied ? '✓ Copied!' : '#HarAnshTera'}
            </span>
            <span className="opening-hashtag-decor opening-hashtag-decor-right">☙</span>
          </button>
        </div>

        {/* ── Bottom Gold Divider ── */}
        <div
          className="opening-content-block mb-8 md:mb-12"
          style={{
            opacity: step >= 8 ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
          }}
        >
          <GoldDivider />
        </div>

        {/* ── Royal CTA Button — Luxury ── */}
        <div
          className="opening-content-block mb-16 md:mb-20"
          style={{
            opacity: step >= 9 ? 1 : 0,
            transform: step >= 9 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
            transition: 'opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: step >= 9 ? 'auto' : 'none',
          }}
        >
          <button onClick={onViewCelebrations} className="opening-cta-btn-premium group">
            {/* Corner diamonds */}
            <span className="opening-cta-corner opening-cta-corner-tl" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-tr" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-bl" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-br" aria-hidden="true" />
            
            {/* Button content */}
            <span className="opening-cta-content">
              <span className="opening-cta-text">Explore the Celebrations</span>
              <span className="opening-cta-arrow">→</span>
            </span>
          </button>
        </div>

        <div className="h-20 md:h-28" aria-hidden="true" />
      </div>

      {/* ══════════ SCROLL INDICATOR — PREMIUM ══════════ */}
      <div
        className="opening-scroll-indicator"
        style={{
          opacity: step >= 3 && scrollY < 80 ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
        }}
        aria-hidden="true"
      >
        <div className="opening-scroll-glow" />
        <DiyaIcon lit={active} />
        <div className="opening-scroll-mouse-premium">
          <div className="opening-scroll-wheel-premium" />
        </div>
        <p className="opening-scroll-label">SCROLL DOWN</p>
        <div className="opening-scroll-chevrons">
          <span className="opening-scroll-chevron-1" />
          <span className="opening-scroll-chevron-2" />
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;
