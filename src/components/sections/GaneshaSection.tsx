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

const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) { setRevealed(true); return; }
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

      {/* Layer 1: Midnight blue gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, hsl(216 72% 7%) 0%, hsl(214 60% 10%) 50%, hsl(216 72% 7%) 100%)',
      }} />

      {/* Layer 2: Jaali pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'url(/images/jaali-pattern.png)',
        backgroundSize: '280px',
        backgroundRepeat: 'repeat',
        opacity: 0.04,
        mixBlendMode: 'screen',
      }} />

      {/* Layer 3: Soft gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(200,164,92,0.18) 0%, rgba(200,164,92,0.06) 35%, transparent 65%)',
      }} />

      {/* Layer 4: Gold dust particles */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'url(/images/gold-dust.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.10,
        animation: 'gold-dust-drift 30s linear infinite',
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, hsl(216 72% 7%) 100%)',
      }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center max-w-2xl mx-auto min-h-full">

        {/* शुभ विवाह */}
        <p
          className={`cinematic-reveal ${r} font-hindi text-primary/50 tracking-[0.4em] mb-4`}
          lang="hi"
          style={{ fontSize: 'clamp(12px, 3vw, 16px)' }}
        >
          ✦ शु भ &nbsp; वि वा ह ✦
        </p>

        {/* Ganesha Image with glow */}
        <div className={`relative mb-4 cinematic-reveal-scale ${r} delay-1`}>
          <div className="absolute inset-[-50px] md:inset-[-70px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.12) 0%, transparent 70%)',
            animation: revealed ? 'heartbeat-glow 3s ease-in-out infinite 1.5s' : 'none',
          }} />
          <div className="absolute inset-[-25px] md:inset-[-40px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.2) 0%, hsl(var(--gold-primary) / 0.07) 50%, transparent 70%)',
          }} />
          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_30px_hsl(var(--gold-primary)/0.4)]"
          />
        </div>

        {/* OM */}
        <p
          className={`cinematic-reveal ${r} delay-1 font-hindi text-primary/45 tracking-[0.3em] mb-2`}
          lang="hi"
          style={{ fontSize: 'clamp(18px, 4vw, 26px)' }}
        >
          ॐ
        </p>

        {/* Shloka - single elegant line */}
        <p
          className={`cinematic-reveal ${r} delay-2 font-hindi font-semibold leading-relaxed tracking-wide mb-1`}
          lang="hi"
          id="ganesha-heading"
          style={{
            fontSize: 'clamp(12px, 2.8vw, 16px)',
            color: 'hsl(var(--gold-primary))',
            textShadow: '0 0 20px hsl(var(--gold-primary) / 0.2)',
          }}
        >
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>

        {/* Gold Divider */}
        <div className={`mb-5 cinematic-reveal ${r} delay-3`}>
          <GoldDivider animate={revealed} />
        </div>

        {/* DEAR label */}
        <p
          className={`cinematic-reveal ${r} delay-3 font-heading text-muted-foreground tracking-[0.35em] uppercase mb-1`}
          style={{ fontSize: 'clamp(11px, 2.5vw, 14px)' }}
        >
          Dear
        </p>

        {/* Guest Name with side lines */}
        <div className={`cinematic-reveal ${r} delay-4 flex items-center gap-4 mb-2`}>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <span
            className="gold-shimmer font-display tracking-wide guest-name-glow"
            style={{ fontSize: 'clamp(22px, 5vw, 36px)', fontWeight: 700 }}
          >
            {guestName}
          </span>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        {/* Cordially invited */}
        <p
          className={`cinematic-reveal ${r} delay-4 font-heading text-muted-foreground tracking-[0.2em] uppercase mb-6`}
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)', lineHeight: 1.8 }}
        >
          You are cordially invited to the wedding of
        </p>

        {/* Couple Names — BIG & prominent */}
        <div className={`cinematic-reveal ${r} delay-5 mb-2`}>
          <h1
            className="font-display gold-shimmer leading-none"
            style={{
              fontSize: 'clamp(42px, 10vw, 90px)',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            Harshit{' '}
            <span className="text-accent font-heading italic" style={{ fontSize: '0.7em' }}>&amp;</span>
            {' '}Anshika
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`cinematic-reveal ${r} delay-5 font-heading text-muted-foreground tracking-[0.3em] uppercase mb-4`}
          style={{ fontSize: 'clamp(10px, 2.2vw, 13px)' }}
        >
          Two Souls, One Journey
        </p>

        {/* Date */}
        <p
          className={`cinematic-reveal ${r} delay-5 font-heading text-primary/70 tracking-[0.15em] mb-8`}
          style={{ fontSize: 'clamp(13px, 3vw, 18px)', fontStyle: 'italic' }}
        >
          10 May 2026
        </p>

        {/* Open Invitation Button — filled premium style */}
        <button
          onClick={onBeginClick}
          className={`ganesha-cta-button group cinematic-reveal ${r} delay-5`}
          style={{ pointerEvents: revealed ? 'auto' : 'none' }}
          aria-label="Open the wedding invitation"
        >
          <span className="relative z-10 font-heading text-sm sm:text-base tracking-[0.2em] uppercase">
            Open Invitation
          </span>
        </button>
      </div>
    </section>
  );
};

export default GaneshaSection;
