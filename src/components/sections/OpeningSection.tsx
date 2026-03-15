import React, { useEffect, useState, useMemo } from 'react';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
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
    if (visited) { setStep(10); return; }
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => setStep(4), 2000),
      setTimeout(() => setStep(5), 2600),
      setTimeout(() => setStep(6), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, visited]);

  // Gold particles
  const particles = useMemo(() =>
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 14}s`,
      size: `${1 + Math.random() * 3}px`,
      opacity: 0.15 + Math.random() * 0.4,
    })),
  []);

  // Sparkle stars
  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 6}s`,
      size: `${1.5 + Math.random() * 2.5}px`,
    })),
  []);

  return (
    <section className="os-container" aria-labelledby="opening-heading">
      {/* ══════ SHARED ROYAL BACKGROUND ══════ */}
      <RoyalBackground />

      <div className="os-bg-grain" aria-hidden="true" />

      {/* Gold floating particles */}
      <div className="os-particles-layer" aria-hidden="true">
        {particles.map(p => (
          <div key={p.id} className="os-particle" style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: p.delay, animationDuration: p.duration,
            opacity: step >= 1 ? p.opacity : 0,
            transition: 'opacity 1.5s ease-out',
          }} />
        ))}
      </div>

      {/* Sparkle stars */}
      <div className="os-particles-layer" aria-hidden="true">
        {sparkles.map(s => (
          <div key={s.id} className="os-sparkle-star" style={{
            left: s.left, top: s.top, width: s.size, height: s.size,
            animationDelay: s.delay,
            opacity: step >= 2 ? 1 : 0,
            transition: 'opacity 1s ease-out',
          }} />
        ))}
      </div>

      <SectionBorderFrame active={active} variant="royal" />

      {/* ══════ MAIN CONTENT ══════ */}
      <div className="os-content">

        {/* ── 1. CIRCULAR PORTRAIT — HERO ── */}
        <div
          className="os-portrait-hero"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'scale(1)' : 'scale(0.5)',
            transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Mandala rings behind portrait */}
          <div className="os-mandala-ring os-mandala-ring-1" aria-hidden="true" />
          <div className="os-mandala-ring os-mandala-ring-2" aria-hidden="true" />
          <div className="os-mandala-ring os-mandala-ring-3" aria-hidden="true" />
          <div className="os-mandala-ring os-mandala-ring-4" aria-hidden="true" />
          
          {/* Golden glow behind */}
          <div className="os-portrait-glow-outer" aria-hidden="true" />
          <div className="os-portrait-glow-inner" aria-hidden="true" />

          {/* Portrait circle */}
          <div className="os-portrait-circle">
            <img
              src={coupleImage}
              alt="Harshit & Anshikha"
              className="os-portrait-img"
              loading="eager"
            />
            {/* Gold ring border */}
            <div className="os-portrait-ring" aria-hidden="true" />
            <div className="os-portrait-ring-outer" aria-hidden="true" />
          </div>
        </div>

        {/* ── 2. COUPLE NAMES ── */}
        <div className="os-names-block" id="opening-heading">
          <h1
            className="os-name"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.8)',
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            HARSHIT
          </h1>

          {/* Ampersand with lines */}
          <div
            className="os-ampersand-row"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="os-amp-line" />
            <span className="os-ampersand">&</span>
            <div className="os-amp-line" />
          </div>

          <h1
            className="os-name"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? 'translateY(0) scale(1)' : 'translateY(-30px) scale(0.8)',
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            ANSHIKHA
          </h1>

          <p
            className="os-married-text"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            are getting married
          </p>
        </div>

        {/* ── 3. DATE CARD ── */}
        <div
          className="os-date-card"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.9)',
            transition: 'opacity 1s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="os-date-shimmer" aria-hidden="true" />
          {/* Corner ornaments */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} className={`os-date-corner os-date-corner-${pos}`}>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M0 16 L0 5 Q0 0 5 0 L16 0" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
                <circle cx="3" cy="3" r="1.5" fill="hsl(38 36% 60%)" opacity="0.4" />
              </svg>
            </div>
          ))}
          <p className="os-date-hindi">शुभ विवाह</p>
          <p className="os-date-main">10th May 2026</p>
          <div className="os-date-divider" />
          <p className="os-date-venue">Jaipur, Rajasthan</p>
        </div>

        {/* ── 4. SCROLL TO CELEBRATE ── */}
        <div
          className="os-scroll-cta"
          style={{
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <button onClick={onViewCelebrations} className="os-cta-button group">
            {/* Corner diamonds */}
            <span className="os-cta-diamond os-cta-diamond-tl" aria-hidden="true" />
            <span className="os-cta-diamond os-cta-diamond-tr" aria-hidden="true" />
            <span className="os-cta-diamond os-cta-diamond-bl" aria-hidden="true" />
            <span className="os-cta-diamond os-cta-diamond-br" aria-hidden="true" />
            <span className="os-cta-inner">
              <span className="os-cta-label">Scroll to Celebrate</span>
              <span className="os-cta-arrow">↓</span>
            </span>
          </button>

          {/* Scroll chevrons below button */}
          <div className="os-scroll-chevrons" aria-hidden="true">
            <span className="os-chevron os-chevron-1" />
            <span className="os-chevron os-chevron-2" />
            <span className="os-chevron os-chevron-3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;
