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
    if (visited) { setStep(5); return; }

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1900),
      setTimeout(() => setStep(5), 2500),
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
        background: 'linear-gradient(180deg, hsl(218 60% 10%) 0%, hsl(218 50% 13%) 35%, hsl(218 50% 13%) 65%, hsl(218 60% 10%) 100%)',
      }}
    >
      {/* Jaali overlay */}
      <div className="jaali-overlay" />

      {/* Jaali arches — top */}
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

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        {/* Gold divider above tagline */}
        <div style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
          <GoldDivider className="mb-4" />
        </div>

        {/* Tagline with diyas */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{ opacity: step >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
        >
          <DiyaIcon lit={active} />
          <p className="font-heading text-cream/80 text-sm md:text-lg italic">
            Two Hearts, One Promise, A Lifetime Together
          </p>
          <DiyaIcon lit={active} />
        </div>

        {/* Couple Names — STACKED VERTICALLY */}
        <div className="flex flex-col items-center gap-1 md:gap-2 mb-6" id="opening-heading">
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(36px, 9vw, 64px)',
              letterSpacing: 'clamp(6px, 1.5vw, 10px)',
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? 'slide-in-left 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            HARSHIT
          </h1>
          <span
            className="font-hashtag text-accent leading-none"
            style={{
              fontSize: 'clamp(28px, 7vw, 48px)',
              opacity: step >= 2 ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.35s',
            }}
          >
            &amp;
          </span>
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(36px, 9vw, 64px)',
              letterSpacing: 'clamp(6px, 1.5vw, 10px)',
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? 'slide-in-right 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            ANSHIKHA
          </h1>
        </div>

        {/* Date + Hashtag */}
        <div
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
          className="flex flex-col items-center"
        >
          <p className="font-body text-cream text-base md:text-lg mb-2">10th May 2026</p>
          <button
            onClick={copyHashtag}
            className="font-hashtag text-primary text-lg md:text-xl mb-4 hover:text-accent transition-colors cursor-pointer active:scale-95"
            aria-label="Copy hashtag to clipboard"
          >
            {copied ? '✓ Copied!' : '#HarAnshTera'}
          </button>
        </div>

        {/* Guest greeting */}
        <div
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
          className="flex flex-col items-center"
        >
          <GoldDivider className="mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <DiyaIcon lit={active} />
            <p className="font-heading text-cream text-lg md:text-xl">
              Dear <span className="font-heading font-semibold text-primary">{guestName}</span>,
            </p>
          </div>
          <p className="font-body text-cream/80 text-sm md:text-base mb-8">
            You are cordially invited to celebrate our journey of forever
          </p>
        </div>

        {/* CTA Button with shimmer */}
        <button
          onClick={onViewCelebrations}
          className="nav-button-secondary"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            pointerEvents: step >= 5 ? 'auto' : 'none',
          }}
        >
          View Celebrations →
        </button>
      </div>
    </section>
  );
};

export default OpeningSection;
