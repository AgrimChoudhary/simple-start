import React, { useEffect, useState } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import ganeshaImg from '@/assets/ganesha.png';

interface GaneshaSectionProps {
  curtainOpen: boolean;
  onBeginClick: () => void;
  visited: boolean;
  fading?: boolean;
  guestName: string;
}

const shlokLines = [
  'वक्रतुण्ड महाकाय',
  'सूर्यकोटि समप्रभ।',
  'निर्विघ्नं कुरु मे देव',
  'सर्वकार्येषु सर्वदा॥',
];

const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) { setRevealed(true); return; }
    // Small delay so content starts appearing while curtains are still moving
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, [curtainOpen, visited]);

  const r = revealed ? 'revealed' : '';

  return (
    <section
      className="section-container overflow-y-auto"
      aria-labelledby="ganesha-heading"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <SectionBorderFrame active={curtainOpen} variant="royal" />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 35%, hsl(var(--gold-primary) / 0.12) 0%, hsl(var(--gold-primary) / 0.04) 35%, transparent 65%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--background)) 100%)',
      }} />

      {/* Main content — cinematic staggered reveal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center max-w-lg mx-auto min-h-full">
        
        {/* OM — first to appear */}
        <p
          className={`cinematic-reveal ${r} font-hindi text-primary/40 tracking-[0.3em] mb-3`}
          lang="hi"
          style={{ fontSize: 'clamp(14px, 3.5vw, 20px)' }}
        >
          ॐ
        </p>

        {/* Ganesha Image — scale up from center */}
        <div className={`relative mb-5 cinematic-reveal-scale ${r} delay-1`}>
          {/* Outer glow */}
          <div className="absolute inset-[-45px] md:inset-[-60px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.1) 0%, transparent 70%)',
            animation: revealed ? 'heartbeat-glow 3s ease-in-out infinite 1.5s' : 'none',
          }} />
          {/* Inner glow */}
          <div className="absolute inset-[-20px] md:inset-[-35px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.18) 0%, hsl(var(--gold-primary) / 0.06) 50%, transparent 70%)',
          }} />

          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_hsl(var(--gold-primary)/0.4)]"
            style={{
              filter: revealed ? 'drop-shadow(0 0 30px hsl(38 36% 60% / 0.35))' : 'none',
            }}
          />
        </div>

        {/* Shloka — 4 lines, staggered reveal */}
        <div className="mb-4" id="ganesha-heading">
          {shlokLines.map((line, i) => (
            <p
              key={i}
              className={`cinematic-reveal ${r} delay-${i + 2} font-hindi font-semibold leading-[1.9] tracking-wide`}
              lang="hi"
              style={{
                fontSize: 'clamp(14px, 3.6vw, 19px)',
                color: 'hsl(var(--gold-primary))',
                textShadow: '0 0 20px hsl(var(--gold-primary) / 0.25)',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Gold Divider */}
        <div className={`mb-4 cinematic-reveal ${r} delay-3`}>
          <GoldDivider animate={revealed} />
        </div>

        {/* Personalised Guest Greeting */}
        <div className={`mb-6 flex flex-col items-center cinematic-reveal ${r} delay-4`}>
          <p className="font-heading text-foreground text-lg sm:text-xl md:text-2xl mb-1.5 tracking-wide" style={{ fontWeight: 500 }}>
            Dear{' '}
            <span
              className="gold-shimmer font-semibold guest-name-glow"
              style={{ fontSize: '1.1em', letterSpacing: '0.04em' }}
            >
              {guestName}
            </span>
            ,
          </p>
          <p
            className="font-heading text-muted-foreground text-sm sm:text-base md:text-lg tracking-wide"
            style={{ lineHeight: 1.7, maxWidth: '340px' }}
          >
            You are cordially invited to witness & celebrate our sacred union
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={onBeginClick}
          className={`ganesha-cta-button group cinematic-reveal ${r} delay-5`}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
          aria-label="Open the wedding invitation"
        >
          <span className="relative z-10 font-heading text-sm sm:text-base tracking-[0.15em] uppercase">
            Open Invitation
          </span>
        </button>
      </div>
    </section>
  );
};

export default GaneshaSection;
