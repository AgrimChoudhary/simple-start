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

  // Scroll-based reveal thresholds
  const [reveals, setReveals] = useState({
    video: false,
    names: false,
    portrait: false,
    date: false,
    cta: false,
  });

  useEffect(() => {
    if (!active) return;
    if (visited) {
      setStep(10);
      setReveals({ video: true, names: true, portrait: true, date: true, cta: true });
      return;
    }

    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, visited]);

  // Scroll-driven reveals
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const top = scrollRef.current.scrollTop;
    setScrollY(top);

    const vh = window.innerHeight;
    setReveals({
      video: top > 0 || step >= 2,
      names: top > vh * 0.08,
      portrait: top > vh * 0.28,
      date: top > vh * 0.48,
      cta: top > vh * 0.62,
    });
  }, [step]);

  // Auto-reveal first items after initial animation
  useEffect(() => {
    if (step >= 2) {
      setReveals(prev => ({ ...prev, video: true }));
    }
  }, [step]);

  // Dust particles
  const dustParticles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 18}s`,
      size: `${1 + Math.random() * 2}px`,
      opacity: 0.1 + Math.random() * 0.2,
    })),
  []);

  // Falling petals
  const fallingPetals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${2 + Math.random() * 96}%`,
      delay: `${Math.random() * 16}s`,
      duration: `${10 + Math.random() * 12}s`,
      size: `${5 + Math.random() * 10}px`,
      driftX: `${-50 + Math.random() * 100}px`,
      driftRotate: `${180 + Math.random() * 720}deg`,
      opacity: 0.08 + Math.random() * 0.18,
      color: ['hsl(38 36% 60%)', 'hsl(42 75% 46%)', 'hsl(38 40% 65%)', 'hsl(30 60% 50%)'][Math.floor(Math.random() * 4)],
    })),
  []);

  // Sparkle stars
  const sparkles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${3 + Math.random() * 94}%`,
      top: `${3 + Math.random() * 94}%`,
      delay: `${Math.random() * 8}s`,
      size: `${1 + Math.random() * 2.5}px`,
      type: Math.random() > 0.6 ? 'star' : 'dot',
    })),
  []);

  // Gold orbs
  const goldOrbs = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
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
      {/* ══════════ LAYERED BACKGROUND ══════════ */}
      <div className="opening-bg-base" aria-hidden="true" />
      <div className="opening-bg-gradient" aria-hidden="true" />
      <div className="opening-texture-grain" aria-hidden="true" />
      <div className="opening-vignette-deep" aria-hidden="true" />

      {/* Gold orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]" aria-hidden="true">
        {goldOrbs.map(orb => (
          <div key={orb.id} className="opening-gold-orb" style={{
            left: orb.left, top: orb.top, width: orb.size, height: orb.size,
            animationDelay: orb.delay, animationDuration: orb.duration,
            opacity: step >= 1 ? undefined : 0,
          }} />
        ))}
      </div>

      {/* Mandala */}
      <div className="opening-mandala-container" style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 2s ease-out' }} aria-hidden="true">
        <div className="opening-mandala-ring opening-mandala-ring-1" />
        <div className="opening-mandala-ring opening-mandala-ring-2" />
        <div className="opening-mandala-ring opening-mandala-ring-3" />
        <div className="opening-mandala-ring opening-mandala-ring-4" />
        <div className="opening-mandala-ring opening-mandala-ring-5" />
      </div>

      {/* Glow layers */}
      <div className="opening-glow-hero" style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity 2s ease-out' }} aria-hidden="true" />
      <div className="opening-glow-ambient" style={{ opacity: step >= 2 ? 0.7 : 0, transition: 'opacity 2.5s ease-out 0.3s' }} aria-hidden="true" />

      <SectionBorderFrame active={active} variant="royal" />

      {/* Dust particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]" aria-hidden="true">
        {dustParticles.map(p => (
          <div key={p.id} className="opening-dust-particle" style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: p.delay, animationDuration: p.duration,
            opacity: step >= 1 ? p.opacity : 0,
          }} />
        ))}
      </div>

      {/* Sparkle stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[3]" aria-hidden="true">
        {sparkles.map(s => (
          <div key={s.id} className={`opening-sparkle ${s.type === 'star' ? 'opening-sparkle-star' : ''}`} style={{
            left: s.left, top: s.top, width: s.size, height: s.size,
            animationDelay: s.delay, opacity: step >= 2 ? undefined : 0,
          }} />
        ))}
      </div>

      {/* Falling petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[4]" aria-hidden="true">
        {fallingPetals.map(petal => (
          <div key={petal.id} className="opening-falling-petal" style={{
            left: petal.left, animationDelay: petal.delay, animationDuration: petal.duration,
            width: petal.size, height: petal.size, backgroundColor: petal.color,
            opacity: step >= 2 ? petal.opacity : 0,
            ['--drift-x' as string]: petal.driftX,
            ['--drift-rotate' as string]: petal.driftRotate,
            transition: 'opacity 1.5s ease-out',
          }} />
        ))}
      </div>

      {/* Jaali borders */}
      <div className="opening-jaali-top" style={{ opacity: step >= 1 ? 0.055 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(-15px)', transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s' }} aria-hidden="true">
        <svg viewBox="0 0 900 100" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 90, 180, 270, 360, 450, 540, 630, 720, 810].map(x => (
            <g key={x}>
              <path d={`M${x} 100 L${x} 35 Q${x + 45} -5 ${x + 90} 35 L${x + 90} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="1" />
              <path d={`M${x + 12} 100 L${x + 12} 45 Q${x + 45} 12 ${x + 78} 45 L${x + 78} 100`} fill="none" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>

      <div className="opening-jaali-bottom" style={{ opacity: step >= 1 ? 0.055 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(15px)', transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s' }} aria-hidden="true">
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

        {/* ── 1. Tagline with Diyas ── */}
        <div
          className="opening-content-block flex-row items-center gap-3 md:gap-4 mb-6 md:mb-10"
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

        {/* ── 2. HERO VIDEO — Cinematic Full-Width ── */}
        <div
          className="opening-content-block relative mb-10 md:mb-14"
          style={{
            opacity: reveals.video ? 1 : 0,
            transform: reveals.video ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(40px)',
            transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="opening-hero-video-frame">
            {/* Gold corner accents */}
            <div className="opening-hero-corner opening-hero-corner-tl" aria-hidden="true" />
            <div className="opening-hero-corner opening-hero-corner-tr" aria-hidden="true" />
            <div className="opening-hero-corner opening-hero-corner-bl" aria-hidden="true" />
            <div className="opening-hero-corner opening-hero-corner-br" aria-hidden="true" />

            {/* Outer glow */}
            <div className="opening-hero-glow" aria-hidden="true" />

            {/* Video */}
            <div className="opening-hero-video-inner">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={coupleImage}
                className="w-full h-full object-cover"
              >
                <source src="" type="video/mp4" />
              </video>
              {/* Dark cinematic overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(180deg, rgba(7,24,48,0.25) 0%, transparent 25%, transparent 75%, rgba(7,24,48,0.35) 100%)',
              }} />
            </div>
          </div>
        </div>

        {/* ── 3. COUPLE NAMES — Grand Reveal ── */}
        <div className="opening-content-block flex-col items-center gap-0 mb-8 md:mb-12" id="opening-heading">
          <h1
            className="opening-name-text"
            style={{
              opacity: reveals.names ? 1 : 0,
              transform: reveals.names ? 'translateX(0)' : 'translateX(-80px)',
              transition: 'opacity 1.2s ease-out, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            HARSHIT
          </h1>

          {/* Heart ornament */}
          <div
            className="opening-heart-ornament"
            style={{
              opacity: reveals.names ? 1 : 0,
              transform: reveals.names ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <div className="opening-heart-line-left" />
            <span className="opening-heart-symbol">❤</span>
            <div className="opening-heart-line-right" />
          </div>

          <h1
            className="opening-name-text"
            style={{
              opacity: reveals.names ? 1 : 0,
              transform: reveals.names ? 'translateX(0)' : 'translateX(80px)',
              transition: 'opacity 1.2s ease-out 0.15s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            ANSHIKHA
          </h1>

          {/* "are getting married" */}
          <p
            className="opening-married-text-premium"
            style={{
              opacity: reveals.names ? 1 : 0,
              transform: reveals.names ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s',
              marginTop: '12px',
            }}
          >
            are getting married
          </p>
        </div>

        {/* ── 4. COUPLE PORTRAIT — Circular Royal Frame ── */}
        <div
          className="opening-content-block mb-10 md:mb-14"
          style={{
            opacity: reveals.portrait ? 1 : 0,
            transform: reveals.portrait ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
            transition: 'opacity 1.2s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="opening-portrait-frame">
            {/* Orbiting ring */}
            <div className="opening-portrait-orbit" aria-hidden="true" />
            {/* Glow */}
            <div className="opening-portrait-glow" aria-hidden="true" />
            {/* Image */}
            <img
              src={coupleImage}
              alt="Harshit & Anshikha"
              className="opening-portrait-img"
              loading="eager"
            />
          </div>
        </div>

        {/* ── 5. WEDDING DATE — Slide Up ── */}
        <div
          className="opening-content-block mb-10 md:mb-14"
          style={{
            opacity: reveals.date ? 1 : 0,
            transform: reveals.date ? 'translateY(0) scale(1)' : 'translateY(35px) scale(0.92)',
            transition: 'opacity 1s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="opening-date-card-premium">
            <div className="opening-date-glow" aria-hidden="true" />
            {/* Corner ornaments */}
            {['tl', 'tr', 'bl', 'br'].map(pos => (
              <div key={pos} className={`opening-date-corner opening-date-corner-${pos}`}>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                  <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
                </svg>
              </div>
            ))}

            <p className="opening-date-hindi">शुभ विवाह</p>

            <p
              className="opening-date-main"
              style={{
                opacity: reveals.date ? 1 : 0,
                transform: reveals.date ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
              }}
            >
              10th May 2026
            </p>
            <div className="opening-date-line" />
            <p
              className="opening-date-venue"
              style={{
                opacity: reveals.date ? 1 : 0,
                transform: reveals.date ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
              }}
            >
              Jaipur, Rajasthan
            </p>
          </div>
        </div>

        {/* ── 6. EXPLORE CELEBRATIONS — CTA ── */}
        <div
          className="opening-content-block mb-16 md:mb-20"
          style={{
            opacity: reveals.cta ? 1 : 0,
            transform: reveals.cta ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.85)',
            transition: 'opacity 1s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: reveals.cta ? 'auto' : 'none',
          }}
        >
          <button onClick={onViewCelebrations} className="opening-cta-btn-premium group">
            <span className="opening-cta-corner opening-cta-corner-tl" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-tr" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-bl" aria-hidden="true" />
            <span className="opening-cta-corner opening-cta-corner-br" aria-hidden="true" />
            <span className="opening-cta-content">
              <span className="opening-cta-text">Explore the Celebrations</span>
              <span className="opening-cta-arrow">→</span>
            </span>
          </button>
        </div>

        <div className="h-20 md:h-28" aria-hidden="true" />
      </div>

      {/* ══════════ SCROLL INDICATOR ══════════ */}
      <div
        className="opening-scroll-indicator"
        style={{
          opacity: step >= 2 && scrollY < 80 ? 1 : 0,
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
