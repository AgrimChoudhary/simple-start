import React, { useEffect, useState } from 'react';
import GoldDivider from '@/components/global/GoldDivider';
import ganeshaImg from '@/assets/ganesha.png';

interface GaneshaSectionProps {
  curtainOpen: boolean;
  onBeginClick: () => void;
  visited: boolean;
}

const shlokLines = [
  'वक्रतुण्ड महाकाय',
  'सूर्यकोटि समप्रभ।',
  'निर्विघ्नं कुरु मे देव',
  'सर्वकार्येषु सर्वदा ॥',
];

const GaneshaSection: React.FC<GaneshaSectionProps> = ({ curtainOpen, onBeginClick, visited }) => {
  const [shlokVisible, setShlokVisible] = useState<number[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (!curtainOpen) return;
    if (visited) {
      setShlokVisible([0, 1, 2, 3]);
      setButtonVisible(true);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    shlokLines.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setShlokVisible(prev => [...prev, i]);
      }, 500 + i * 400));
    });
    timers.push(setTimeout(() => setButtonVisible(true), 500 + shlokLines.length * 400 + 300));
    return () => timers.forEach(clearTimeout);
  }, [curtainOpen, visited]);

  return (
    <section
      className="section-container"
      aria-labelledby="ganesha-heading"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(var(--gold-primary) / 0.06) 0%, hsl(var(--background)) 70%)',
      }}
    >
      <div className="jaali-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto">
        {/* OM Symbol */}
        <p className="text-primary/50 text-sm font-hindi mb-4 tracking-widest" lang="hi">ॐ</p>

        {/* Ganesha */}
        <img
          src={ganeshaImg}
          alt="Lord Ganesha line art illustration"
          className="w-20 h-20 md:w-[120px] md:h-[120px] object-contain mb-6"
          style={{
            filter: 'brightness(1.1) sepia(0.3) hue-rotate(-10deg)',
            animation: curtainOpen ? 'scale-fade-in 0.6s ease-out' : 'none',
          }}
        />

        {/* Shlok */}
        <div className="space-y-1 mb-6" id="ganesha-heading">
          {shlokLines.map((line, i) => (
            <p
              key={i}
              className="font-hindi text-base md:text-xl text-cream leading-[1.8]"
              lang="hi"
              style={{
                opacity: shlokVisible.includes(i) ? 1 : 0,
                transform: shlokVisible.includes(i) ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Gold Divider */}
        {shlokVisible.length === 4 && <GoldDivider />}

        {/* Begin Button */}
        <button
          onClick={onBeginClick}
          className="font-ui font-semibold text-sm md:text-base px-7 py-3.5 rounded-xl border-[1.5px] border-primary text-cream transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97] min-w-[180px] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          style={{
            opacity: buttonVisible ? 1 : 0,
            transform: buttonVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            pointerEvents: buttonVisible ? 'auto' : 'none',
          }}
          aria-label="Begin the wedding invitation journey"
        >
          <span className="font-hindi" lang="hi">शुभ आरंभ</span> · Begin
        </button>
      </div>
    </section>
  );
};

export default GaneshaSection;
