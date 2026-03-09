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
  const angle = (360 / 6) * index;
  const radius = 100 + (index % 2) * 25;
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '50%',
        left: '50%',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: 'hsl(var(--gold-primary))',
        opacity: 0.25,
        transform: `rotate(${angle}deg) translateX(${radius}px)`,
        animation: `diya-flame 2.5s ease-in-out ${index * 0.4}s infinite`,
        boxShadow: '0 0 10px hsl(var(--gold-primary) / 0.4)',
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
    timers.push(setTimeout(() => setGreetingVisible(true), 1800));
    timers.push(setTimeout(() => setButtonVisible(true), 2600));
    return () => timers.forEach(clearTimeout);
  }, [curtainOpen, visited]);

  return (
    <section
      className="section-container"
      aria-labelledby="ganesha-heading"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <SectionBorderFrame active={curtainOpen} variant="royal" />

      {/* Background glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, hsl(var(--gold-primary) / 0.10) 0%, hsl(var(--gold-primary) / 0.03) 40%, transparent 70%)',
      }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto">
        {/* OM */}
        <p
          className="font-hindi text-primary/50 tracking-[0.3em] mb-4"
          lang="hi"
          style={{ fontSize: 'clamp(16px, 4vw, 22px)' }}
        >
          ॐ
        </p>

        {/* Ganesha Image — large and prominent */}
        <div className="relative mb-6">
          {/* Outer glow */}
          <div className="absolute inset-[-50px] md:inset-[-70px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.08) 0%, transparent 70%)',
            opacity: ganeshaGlow ? 1 : 0,
            transition: 'opacity 1s ease-out',
            animation: ganeshaGlow ? 'heartbeat-glow 3s ease-in-out infinite 1s' : 'none',
          }} />
          {/* Inner glow */}
          <div className="absolute inset-[-25px] md:inset-[-40px] rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.15) 0%, hsl(var(--gold-primary) / 0.05) 50%, transparent 70%)',
            opacity: ganeshaGlow ? 1 : 0,
            transform: ganeshaGlow ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }} />

          {ganeshaGlow && Array.from({ length: 6 }, (_, i) => (
            <FloatingDiya key={i} index={i} />
          ))}

          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain drop-shadow-[0_0_20px_hsl(var(--gold-primary)/0.3)]"
            style={{
              opacity: ganeshaGlow ? 1 : 0.6,
              transition: 'opacity 0.8s ease-out',
            }}
          />
        </div>

        {/* Shloka — 2 lines, elegant styling */}
        <div className="mb-6" id="ganesha-heading">
          <p
            className="font-hindi font-semibold leading-[2] tracking-wide"
            lang="hi"
            style={{
              fontSize: 'clamp(15px, 3.8vw, 20px)',
              color: 'hsl(var(--gold-primary))',
              opacity: shlokVisible ? 1 : 0,
              transform: shlokVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              textShadow: '0 0 20px hsl(var(--gold-primary) / 0.2)',
            }}
          >
            {shlokLine1}
          </p>
          <p
            className="font-hindi font-semibold leading-[2] tracking-wide"
            lang="hi"
            style={{
              fontSize: 'clamp(15px, 3.8vw, 20px)',
              color: 'hsl(var(--gold-primary))',
              opacity: shlokVisible ? 1 : 0,
              transform: shlokVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s',
              textShadow: '0 0 20px hsl(var(--gold-primary) / 0.2)',
            }}
          >
            {shlokLine2}
          </p>
        </div>

        {/* Gold Divider */}
        <div className="mb-6" style={{ opacity: shlokVisible ? 1 : 0, transition: 'opacity 0.4s ease-out 0.3s' }}>
          <GoldDivider animate={shlokVisible} />
        </div>

        {/* Personalised Guest Greeting */}
        <div
          className="mb-8 flex flex-col items-center"
          style={{
            opacity: greetingVisible ? 1 : 0,
            transform: greetingVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <p className="font-heading text-cream text-base sm:text-lg md:text-xl mb-1">
            Dear{' '}
            <span className="font-semibold text-primary" style={{ textShadow: '0 0 12px hsl(var(--gold-primary) / 0.3)' }}>
              {guestName}
            </span>,
          </p>
          <p className="font-body text-cream/70 text-xs sm:text-sm md:text-base">
            You are cordially invited to witness &amp; celebrate our sacred union
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={onBeginClick}
          className="nav-button-secondary group"
          style={{
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            pointerEvents: buttonVisible ? 'auto' : 'none',
          }}
          aria-label="Open the wedding invitation"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="font-hindi text-sm" lang="hi">शुभारंभ</span>
            <span className="text-primary/40">·</span>
            <span>Open Invitation</span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default GaneshaSection;
