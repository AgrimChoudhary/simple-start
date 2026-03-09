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

const shlokLine1 = 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।';
const shlokLine2 = 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥';

/* Floating Diya Particle */
const FloatingDiya: React.FC<{ index: number }> = ({ index }) => {
  const angle = (360 / 8) * index;
  const radius = 90 + (index % 3) * 20;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '50%',
        left: '50%',
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: 'hsl(var(--gold-primary))',
        opacity: 0.3,
        transform: `rotate(${angle}deg) translateX(${radius}px)`,
        animation: `diya-orbit 6s linear infinite, diya-flame 2.5s ease-in-out ${index * 0.3}s infinite`,
        boxShadow: '0 0 8px hsl(var(--gold-primary) / 0.5)',
      }}
    />
  );
};

const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false, guestName }) => {
  const [shlokVisible, setShlokVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [ganeshaGlow, setGaneshaGlow] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) {
      setShlokVisible(true);
      setButtonVisible(true);
      setGaneshaGlow(true);
      setGreetingVisible(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setGaneshaGlow(true), 200));
    timers.push(setTimeout(() => setShlokVisible(true), 800));
    timers.push(setTimeout(() => setGreetingVisible(true), 1600));
    timers.push(setTimeout(() => setButtonVisible(true), 2200));
    return () => timers.forEach(clearTimeout);
  }, [curtainOpen, visited]);

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
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, hsl(var(--background)) 100%)',
      }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 text-center max-w-lg mx-auto min-h-full">
        {/* OM */}
        <p
          className="font-hindi text-primary/40 tracking-[0.3em] mb-3"
          lang="hi"
          style={{ fontSize: 'clamp(14px, 3.5vw, 20px)' }}
        >
          ॐ
        </p>

        {/* Ganesha Image */}
        <div className="relative mb-5">
          {/* Outer glow */}
          <div className="absolute inset-[-45px] md:inset-[-60px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.1) 0%, transparent 70%)',
            opacity: ganeshaGlow ? 1 : 0,
            transition: 'opacity 1s ease-out',
            animation: ganeshaGlow ? 'heartbeat-glow 3s ease-in-out infinite 1s' : 'none',
          }} />
          {/* Inner glow */}
          <div className="absolute inset-[-20px] md:inset-[-35px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.18) 0%, hsl(var(--gold-primary) / 0.06) 50%, transparent 70%)',
            opacity: ganeshaGlow ? 1 : 0,
            transform: ganeshaGlow ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }} />

          {ganeshaGlow && Array.from({ length: 8 }, (_, i) => (
            <FloatingDiya key={i} index={i} />
          ))}

          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_25px_hsl(var(--gold-primary)/0.4)]"
            style={{
              opacity: ganeshaGlow ? 1 : 0.5,
              transition: 'opacity 0.8s ease-out',
              filter: ganeshaGlow ? 'drop-shadow(0 0 30px hsl(38 36% 60% / 0.35))' : 'none',
            }}
          />
        </div>

        {/* Shloka */}
        <div className="mb-4" id="ganesha-heading">
          <p
            className="font-hindi font-semibold leading-[1.9] tracking-wide"
            lang="hi"
            style={{
              fontSize: 'clamp(14px, 3.6vw, 19px)',
              color: 'hsl(var(--gold-primary))',
              opacity: shlokVisible ? 1 : 0,
              transform: shlokVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              textShadow: '0 0 20px hsl(var(--gold-primary) / 0.25)',
            }}
          >
            {shlokLine1}
          </p>
          <p
            className="font-hindi font-semibold leading-[1.9] tracking-wide"
            lang="hi"
            style={{
              fontSize: 'clamp(14px, 3.6vw, 19px)',
              color: 'hsl(var(--gold-primary))',
              opacity: shlokVisible ? 1 : 0,
              transform: shlokVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s',
              textShadow: '0 0 20px hsl(var(--gold-primary) / 0.25)',
            }}
          >
            {shlokLine2}
          </p>
        </div>

        {/* Gold Divider */}
        <div className="mb-4" style={{ opacity: shlokVisible ? 1 : 0, transition: 'opacity 0.4s ease-out 0.3s' }}>
          <GoldDivider animate={shlokVisible} />
        </div>

        {/* Personalised Guest Greeting */}
        <div
          className="mb-6 flex flex-col items-center"
          style={{
            opacity: greetingVisible ? 1 : 0,
            transform: greetingVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <p className="font-heading text-foreground text-lg sm:text-xl md:text-2xl mb-1.5 tracking-wide" style={{ fontWeight: 500 }}>
            Dear{' '}
            <span
              className="gold-shimmer font-semibold guest-name-glow"
              style={{
                fontSize: '1.1em',
                letterSpacing: '0.04em',
              }}
            >
              {guestName}
            </span>
            ,
          </p>
          <p
            className="font-heading text-muted-foreground text-sm sm:text-base md:text-lg tracking-wide"
            style={{
              lineHeight: 1.7,
              maxWidth: '340px',
            }}
          >
            You are cordially invited to witness & celebrate our sacred union
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={onBeginClick}
          className="ganesha-cta-button group"
          style={{
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            pointerEvents: buttonVisible ? 'auto' : 'none',
          }}
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
