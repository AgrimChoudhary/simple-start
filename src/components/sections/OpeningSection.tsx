import React, { useEffect, useState } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import DiyaIcon from '@/components/global/DiyaIcon';

interface OpeningSectionProps {
  active: boolean;
  guestName: string;
  onViewCelebrations: () => void;
  visited: boolean;
}

const OpeningSection: React.FC<OpeningSectionProps> = ({ active, guestName, onViewCelebrations, visited }) => {
  const [step, setStep] = useState(0); // 0=hidden, 1=tagline, 2=names, 3=details, 4=button

  useEffect(() => {
    if (!active) return;
    if (visited) { setStep(4); return; }

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1500),
      setTimeout(() => setStep(4), 2200),
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
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(218 50% 13%) 50%, hsl(var(--background)) 100%)',
      }}
    >
      <div className="jaali-overlay" />
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        {/* Tagline */}
        <p
          className="font-heading text-cream/80 text-base md:text-lg italic mb-8"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          Two Hearts, One Promise, A Lifetime Together
        </p>

        {/* Couple Names */}
        <div className="flex items-center justify-center gap-3 md:gap-6 mb-4" id="opening-heading">
          <h1
            className="font-display text-4xl md:text-6xl gold-shimmer tracking-wide"
            style={{
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? 'slide-in-left 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            HARSHIT
          </h1>
          <span
            className="font-heading text-primary text-3xl md:text-5xl"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.3s',
            }}
          >
            &amp;
          </span>
          <h1
            className="font-display text-4xl md:text-6xl gold-shimmer tracking-wide"
            style={{
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? 'slide-in-right 0.7s ease-out forwards, gold-shimmer 4s linear infinite' : 'none',
              backgroundSize: '200% 100%',
            }}
          >
            ANSHIKHA
          </h1>
        </div>

        {/* Details */}
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
            className="font-hashtag text-primary text-lg md:text-xl mb-4 hover:text-accent transition-colors cursor-pointer"
            aria-label="Copy hashtag to clipboard"
          >
            {copied ? '✓ Copied!' : '#HarAnshTera'}
          </button>

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

        {/* CTA */}
        <button
          onClick={onViewCelebrations}
          className="font-ui font-semibold text-sm md:text-base px-7 py-3.5 rounded-xl border-[1.5px] border-primary text-cream transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97] min-w-[180px] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            pointerEvents: step >= 4 ? 'auto' : 'none',
          }}
        >
          View Celebrations →
        </button>
      </div>
    </section>
  );
};

export default OpeningSection;
