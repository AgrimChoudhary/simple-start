import React, { useEffect, useState } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import DiyaIcon from '@/components/global/DiyaIcon';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';

interface OpeningSectionProps {
  active: boolean;
  guestName: string;
  onViewCelebrations: () => void;
  visited: boolean;
}

const OpeningSection: React.FC<OpeningSectionProps> = ({ active, guestName, onViewCelebrations, visited }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (visited) { setStep(6); return; }

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2400),
      setTimeout(() => setStep(6), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [active, visited]);

  const [copied, setCopied] = useState(false);
  const copyHashtag = () => {
    navigator.clipboard.writeText('#HarAnshTera');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="section-container"
      aria-labelledby="opening-heading"
      style={{
        background: 'linear-gradient(180deg, hsl(218 60% 8%) 0%, hsl(218 50% 12%) 30%, hsl(218 50% 12%) 70%, hsl(218 60% 8%) 100%)',
      }}
    >
      {/* Jaali overlay */}
      <div className="jaali-overlay" />

      {/* Border frame */}
      <SectionBorderFrame active={active} variant="standard" />

      {/* ── Jharokha Arch Background ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: step >= 1 ? 0.08 : 0,
          transform: step >= 1 ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 700" className="w-[80%] max-w-[420px] h-auto" fill="none">
          {/* Outer arch */}
          <path d="M50 700 L50 280 Q50 80 250 40 Q450 80 450 280 L450 700" stroke="hsl(38 36% 60%)" strokeWidth="2" />
          {/* Inner arch */}
          <path d="M80 700 L80 300 Q80 120 250 75 Q420 120 420 300 L420 700" stroke="hsl(38 36% 60%)" strokeWidth="1.2" />
          {/* Scalloped detail on outer arch */}
          <path d="M100 320 Q130 250 160 300 Q190 250 220 300 Q250 250 280 300 Q310 250 340 300 Q370 250 400 320" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" />
          {/* Keystone */}
          <path d="M235 52 L250 35 L265 52" stroke="hsl(38 36% 60%)" strokeWidth="1.5" />
          <circle cx="250" cy="60" r="8" stroke="hsl(38 36% 60%)" strokeWidth="0.8" />
          {/* Pillar details */}
          <line x1="65" y1="350" x2="65" y2="680" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          <line x1="435" y1="350" x2="435" y2="680" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          {/* Inner pillar lines */}
          <line x1="95" y1="370" x2="95" y2="680" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
          <line x1="405" y1="370" x2="405" y2="680" stroke="hsl(38 36% 60%)" strokeWidth="0.3" />
          {/* Base detail */}
          <line x1="50" y1="690" x2="450" y2="690" stroke="hsl(38 36% 60%)" strokeWidth="0.5" />
          {/* Mandala ring behind center */}
          <circle cx="250" cy="320" r="120" stroke="hsl(38 36% 60%)" strokeWidth="0.3" strokeDasharray="6 4" opacity="0.5" />
          <circle cx="250" cy="320" r="145" stroke="hsl(38 36% 60%)" strokeWidth="0.2" strokeDasharray="3 6" opacity="0.3" />
        </svg>
      </div>

      {/* ── Paisley Corner Ornaments ── */}
      {[
        { pos: 'top-4 left-4', rotate: '0deg', delay: '0s' },
        { pos: 'top-4 right-4', rotate: '90deg', delay: '0.15s' },
        { pos: 'bottom-4 right-4', rotate: '180deg', delay: '0.3s' },
        { pos: 'bottom-4 left-4', rotate: '270deg', delay: '0.45s' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} pointer-events-none`}
          style={{
            opacity: step >= 1 ? 0.06 : 0,
            transform: step >= 1 ? `rotate(${corner.rotate})` : `rotate(${corner.rotate}) scale(0.5)`,
            transition: `opacity 0.8s ease-out ${corner.delay}, transform 0.8s ease-out ${corner.delay}`,
          }}
          aria-hidden="true"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M5 55 Q5 5 55 5" stroke="hsl(38 36% 60%)" strokeWidth="1" fill="none" />
            <path d="M10 55 Q10 15 50 10" stroke="hsl(38 36% 60%)" strokeWidth="0.6" fill="none" />
            <path d="M8 48 Q12 30 28 18" stroke="hsl(38 36% 60%)" strokeWidth="0.5" fill="none" />
            <circle cx="20" cy="20" r="3" stroke="hsl(38 36% 60%)" strokeWidth="0.4" fill="none" />
          </svg>
        </div>
      ))}

      {/* ── Radial Gold Glow ── */}
      <div
        className="absolute inset-0 pointer-events-none opening-bg-glow"
        style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity 1.5s ease-out' }}
        aria-hidden="true"
      />

      {/* ── Floating Gold Dust Particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="opening-gold-dust"
            style={{
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${8 + i * 1.5}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: step >= 2 ? 1 : 0,
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* ── Jaali arches — top ── */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-[0.05]" aria-hidden="true">
        <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 100 L${x} 35 Q${x + 50} -10 ${x + 100} 35 L${x + 100} 100`} fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <path d={`M${x + 15} 100 L${x + 15} 48 Q${x + 50} 12 ${x + 85} 48 L${x + 85} 100`} fill="none" stroke="#C9A96E" strokeWidth="0.4" />
              <circle cx={x + 50} cy="25" r="6" fill="none" stroke="#C9A96E" strokeWidth="0.3" />
            </g>
          ))}
        </svg>
      </div>

      {/* Jaali arches — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-[0.05] rotate-180" aria-hidden="true">
        <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 100 L${x} 35 Q${x + 50} -10 ${x + 100} 35 L${x + 100} 100`} fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <path d={`M${x + 15} 100 L${x + 15} 48 Q${x + 50} 12 ${x + 85} 48 L${x + 85} 100`} fill="none" stroke="#C9A96E" strokeWidth="0.4" />
            </g>
          ))}
        </svg>
      </div>

      {/* ══════════ CONTENT ══════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        
        {/* Gold divider above tagline */}
        <div style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
          <GoldDivider className="mb-4" />
        </div>

        {/* Tagline with diyas */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
        >
          <DiyaIcon lit={active} />
          <p className="font-heading text-foreground/80 text-sm md:text-lg italic">
            Two Hearts, One Promise, A Lifetime Together
          </p>
          <DiyaIcon lit={active} />
        </div>

        {/* ── Couple Photo Frame ── */}
        <div
          className="relative mb-8"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? 'scale(1)' : 'scale(0.7)',
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Jharokha arch frame above photo */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
            <svg width="200" height="50" viewBox="0 0 200 50" fill="none" className="w-[160px] md:w-[200px]">
              <path d="M10 50 L10 25 Q10 2 100 2 Q190 2 190 25 L190 50" stroke="hsl(38 36% 60%)" strokeWidth="1.5" fill="none" opacity="0.4" />
              <path d="M25 50 L25 30 Q25 10 100 8 Q175 10 175 30 L175 50" stroke="hsl(38 36% 60%)" strokeWidth="0.8" fill="none" opacity="0.3" />
              <path d="M90 6 L100 0 L110 6" stroke="hsl(38 36% 60%)" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
          </div>

          {/* Photo circle */}
          <div className="couple-photo-frame">
            <div className="couple-photo-inner">
              <span className="font-display gold-shimmer text-2xl md:text-3xl leading-none select-none">
                H <span className="text-accent text-lg">♥</span> A
              </span>
            </div>
          </div>
        </div>

        {/* ── Couple Names — STACKED VERTICALLY ── */}
        <div className="flex flex-col items-center gap-1 md:gap-2 mb-5" id="opening-heading">
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(36px, 9vw, 64px)',
              letterSpacing: 'clamp(6px, 1.5vw, 10px)',
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? 'slide-in-left 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            HARSHIT
          </h1>
          <span
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              opacity: step >= 3 ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.35s',
              backgroundSize: '200% 100%',
            }}
          >
            &amp;
          </span>
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(36px, 9vw, 64px)',
              letterSpacing: 'clamp(6px, 1.5vw, 10px)',
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? 'slide-in-right 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            ANSHIKHA
          </h1>
        </div>

        {/* Date + Hashtag */}
        <div
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
          className="flex flex-col items-center"
        >
          <p className="font-body text-foreground text-base md:text-lg mb-2" style={{ letterSpacing: '2px' }}>
            10th May 2026
          </p>
          <button
            onClick={copyHashtag}
            className="font-hashtag gold-shimmer-slow text-lg md:text-xl mb-4 hover:text-accent transition-colors cursor-pointer active:scale-95"
            style={{
              WebkitTextFillColor: 'unset',
              backgroundClip: 'unset',
              WebkitBackgroundClip: 'unset',
              background: 'none',
              color: 'hsl(38 36% 60%)',
            }}
            aria-label="Copy hashtag to clipboard"
          >
            {copied ? '✓ Copied!' : '#HarAnshTera'}
          </button>
        </div>

        {/* Gold divider */}
        <div
          style={{
            opacity: step >= 5 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <GoldDivider className="mb-6" />
        </div>

        {/* ── Royal CTA Button ── */}
        <button
          onClick={onViewCelebrations}
          className="royal-cta-button"
          style={{
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            pointerEvents: step >= 6 ? 'auto' : 'none',
          }}
        >
          <span className="relative z-10 font-ui font-semibold text-sm md:text-base tracking-wide">
            View Celebrations →
          </span>
        </button>
      </div>
    </section>
  );
};

export default OpeningSection;
