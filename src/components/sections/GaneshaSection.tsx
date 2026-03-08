import React, { useEffect, useState } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import ganeshaImg from '@/assets/ganesha.png';

interface GaneshaSectionProps {
  curtainOpen: boolean;
  onBeginClick: () => void;
  visited: boolean;
  fading?: boolean;
}

const shlokLines = [
  'वक्रतुण्ड महाकाय',
  'सूर्यकोटि समप्रभ।',
  'निर्विघ्नं कुरु मे देव',
  'सर्वकार्येषु सर्वदा ॥',
];

const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited, fading = false }) => {
  const [shlokVisible, setShlokVisible] = useState<number[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [ganeshaGlow, setGaneshaGlow] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) {
      setShlokVisible([0, 1, 2, 3]);
      setButtonVisible(true);
      setGaneshaGlow(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Ganesha golden glow pulse starts right after curtain opens
    timers.push(setTimeout(() => setGaneshaGlow(true), 200));

    // Shlok lines stagger in after curtain is fully open
    shlokLines.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setShlokVisible(prev => [...prev, i]);
      }, 600 + i * 450));
    });

    // Button appears after all shlok lines + a beat
    timers.push(setTimeout(() => setButtonVisible(true), 600 + shlokLines.length * 450 + 400));

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
      {/* Background: subtle radial golden glow from center at 10% */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--gold-primary) / 0.10) 0%, hsl(var(--gold-primary) / 0.03) 40%, transparent 70%)',
        }}
      />

      {/* Jaali arch pattern at top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      >
        <svg viewBox="0 0 800 120" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {/* Repeated arch pattern */}
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 120 L${x} 40 Q${x + 50} -10 ${x + 100} 40 L${x + 100} 120`} fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <path d={`M${x + 20} 120 L${x + 20} 55 Q${x + 50} 15 ${x + 80} 55 L${x + 80} 120`} fill="none" stroke="#C9A96E" strokeWidth="0.5" />
              <circle cx={x + 50} cy="30" r="8" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
            </g>
          ))}
        </svg>
      </div>

      {/* Jaali arch pattern at bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none rotate-180"
        aria-hidden="true"
        style={{ opacity: 0.05 }}
      >
        <svg viewBox="0 0 800 120" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
          {[0, 100, 200, 300, 400, 500, 600, 700].map(x => (
            <g key={x}>
              <path d={`M${x} 120 L${x} 40 Q${x + 50} -10 ${x + 100} 40 L${x + 100} 120`} fill="none" stroke="#C9A96E" strokeWidth="0.8" />
              <path d={`M${x + 20} 120 L${x + 20} 55 Q${x + 50} 15 ${x + 80} 55 L${x + 80} 120`} fill="none" stroke="#C9A96E" strokeWidth="0.5" />
              <circle cx={x + 50} cy="30" r="8" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
            </g>
          ))}
        </svg>
      </div>

      {/* Main content — always rendered, uncovered by curtain */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto">
        {/* OM Symbol */}
        <p
          className="font-hindi text-sm text-primary/40 tracking-[0.3em] mb-5"
          lang="hi"
          style={{
            fontSize: '14px',
            letterSpacing: '0.3em',
          }}
        >
          ॐ
        </p>

        {/* Lord Ganesha with golden glow pulse */}
        <div className="relative mb-8">
          {/* Glow aura behind Ganesha */}
          <div
            className="absolute inset-[-20px] md:inset-[-30px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--gold-primary) / 0.12) 0%, hsl(var(--gold-primary) / 0.04) 50%, transparent 70%)',
              opacity: ganeshaGlow ? 1 : 0,
              transform: ganeshaGlow ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              animation: ganeshaGlow ? 'heartbeat-glow 3s ease-in-out infinite 0.8s' : 'none',
            }}
          />

          <img
            src={ganeshaImg}
            alt="Lord Ganesha — ornate gold line-art in traditional seated pose"
            className="relative w-20 h-20 md:w-[120px] md:h-[120px] object-contain"
            style={{
              filter: 'brightness(1.15) sepia(0.2) hue-rotate(-5deg)',
            }}
          />
        </div>

        {/* Shlok Text — respectful cream, NOT gold */}
        <div className="space-y-0.5 mb-8" id="ganesha-heading">
          {shlokLines.map((line, i) => (
            <p
              key={i}
              className="font-hindi font-medium leading-[1.8]"
              lang="hi"
              style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                color: 'hsl(var(--text-cream))',
                opacity: shlokVisible.includes(i) ? 1 : 0,
                transform: shlokVisible.includes(i) ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.35s ease-out, transform 0.35s ease-out',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Gold Divider with draw animation */}
        <div
          style={{
            opacity: shlokVisible.length === 4 ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <GoldDivider animate={shlokVisible.length === 4} />
        </div>

        {/* Begin Button — Secondary outlined gold */}
        <button
          onClick={onBeginClick}
          className="relative font-ui font-semibold rounded-xl border-[1.5px] border-primary text-cream min-w-[180px] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background overflow-hidden group"
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, background-color 0.2s, color 0.2s',
            pointerEvents: buttonVisible ? 'auto' : 'none',
          }}
          aria-label="Begin the wedding invitation journey"
        >
          {/* Idle shimmer sweep across border */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(var(--gold-primary) / 0.08) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: buttonVisible ? 'button-shimmer 5s linear infinite' : 'none',
            }}
          />

          {/* Hover fill */}
          <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          <span className="relative z-10 flex items-center justify-center gap-1 group-hover:text-primary-foreground transition-colors duration-200">
            <span className="font-hindi" lang="hi">शुभ आरंभ</span>
            <span>·</span>
            <span>Begin</span>
          </span>

          {/* Click press feedback */}
          <style>{`button:active { transform: scale(0.97) !important; }`}</style>
        </button>
      </div>
    </section>
  );
};

export default GaneshaSection;
