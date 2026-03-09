import React, { useEffect, useState, useMemo } from 'react';

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'waiting' | 'parting' | 'fading' | 'done'>('waiting');

  useEffect(() => {
    // Start parting after a brief pause
    const t1 = setTimeout(() => setPhase('parting'), 500);
    // Fire onComplete early so content reveals WHILE curtains are still moving
    const t2 = setTimeout(() => onComplete(), 1200);
    // Start fading curtain remnants
    const t3 = setTimeout(() => setPhase('fading'), 2800);
    // Remove from DOM
    const t4 = setTimeout(() => setPhase('done'), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  const sparkles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${5 + (i / 20) * 90}%`,
      delay: `${0.1 + Math.random() * 0.8}s`,
      size: `${2 + Math.random() * 3}px`,
      driftX: `${-25 + Math.random() * 50}px`,
      duration: `${1.2 + Math.random() * 1}s`,
    })),
  []);

  if (phase === 'done') return null;

  const isParting = phase === 'parting' || phase === 'fading';
  const isFading = phase === 'fading';

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
      style={{
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      {/* Golden light expanding from center as curtains open */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 15% 60% at 50% 50%, hsl(var(--gold-primary) / 0.25) 0%, hsl(var(--gold-primary) / 0.08) 40%, transparent 75%)',
          opacity: isParting ? 1 : 0,
          transform: isParting ? 'scaleX(4)' : 'scaleX(0.3)',
          transition: 'opacity 1s ease-out, transform 2.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Top valance / pelmet */}
      <div
        className="absolute top-0 left-0 right-0 z-[52] h-16 md:h-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--curtain-dark)) 0%, hsl(var(--curtain-red)) 60%, transparent 100%)',
          opacity: isParting ? 0 : 1,
          transition: 'opacity 1.8s ease-out 0.8s',
        }}
      >
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 30" preserveAspectRatio="none" style={{ height: '20px' }}>
          <path d="M0 0 Q50 30 100 0 Q150 30 200 0 Q250 30 300 0 Q350 30 400 0 Q450 30 500 0 Q550 30 600 0 Q650 30 700 0 Q750 30 800 0 Q850 30 900 0 Q950 30 1000 0 Q1050 30 1100 0 Q1150 30 1200 0 V30 H0Z" fill="hsl(348 60% 26%)" />
        </svg>
        <div className="absolute bottom-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-2 left-0 right-0 h-8 opacity-[0.08]">
          <svg viewBox="0 0 400 32" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }, (_, i) => (
              <g key={i} transform={`translate(${i * 20}, 0)`}>
                <path d="M10 4 Q14 8 10 12 Q6 8 10 4Z" fill="#C9A96E" />
                <circle cx="10" cy="20" r="2" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
                <line x1="10" y1="14" x2="10" y2="18" stroke="#C9A96E" strokeWidth="0.3" />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Left curtain panel */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full will-change-transform"
        style={{
          transform: isParting ? 'translateX(-102%)' : 'translateX(0)',
          transition: 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(90deg, 
            hsl(348 60% 18%) 0%, hsl(348 60% 24%) 15%, hsl(348 60% 22%) 25%,
            hsl(348 60% 26%) 40%, hsl(348 60% 24%) 55%, hsl(348 60% 22%) 70%,
            hsl(348 60% 26%) 85%, hsl(348 55% 20%) 100%)`,
          boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.4), inset 10px 0 30px rgba(0,0,0,0.2)',
        }} />
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 6 }, (_, row) => (
              <g key={row} transform={`translate(${row % 2 ? 50 : 0}, ${row * 100})`}>
                <path d="M50 20 Q70 10 80 30 Q90 60 60 80 Q30 70 40 40 Q45 25 50 20Z" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <circle cx="55" cy="50" r="6" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
                <path d="M150 60 Q170 50 180 70 Q190 100 160 120 Q130 110 140 80 Q145 65 150 60Z" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
              </g>
            ))}
          </svg>
        </div>
        {[18, 35, 52, 70, 85].map(pos => (
          <div key={pos} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '2px',
            background: `linear-gradient(180deg, transparent 0%, rgba(74,18,32,0.6) 20%, rgba(74,18,32,0.4) 50%, rgba(74,18,32,0.6) 80%, transparent 100%)`,
          }} />
        ))}
        {[20, 55, 87].map(pos => (
          <div key={`h-${pos}`} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '3px',
            background: `linear-gradient(180deg, transparent 5%, rgba(160,50,60,0.15) 30%, rgba(160,50,60,0.08) 60%, transparent 95%)`,
          }} />
        ))}
        <div className="absolute top-0 right-0 w-[3px] h-full" style={{
          background: `repeating-linear-gradient(180deg, hsl(38 36% 60% / 0.7) 0px, hsl(38 40% 65% / 0.5) 4px, hsl(38 30% 35% / 0.6) 8px, hsl(38 36% 60% / 0.7) 12px)`,
        }} />
        <div className="absolute right-[-6px] top-[15%]">
          <svg width="16" height="60" viewBox="0 0 16 60" fill="none">
            <circle cx="8" cy="8" r="6" fill="hsl(38 36% 60%)" opacity="0.7" />
            <circle cx="8" cy="8" r="4" fill="hsl(38 30% 35%)" opacity="0.5" />
            {[3, 5, 7, 9, 11, 13].map(x => (
              <line key={x} x1={x} y1="14" x2={x + (x > 8 ? 1 : -1)} y2="55" stroke="hsl(38 36% 60%)" strokeWidth="1" opacity="0.5" />
            ))}
            <ellipse cx="8" cy="56" rx="6" ry="3" fill="hsl(38 36% 60%)" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20" style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
        }} />
      </div>

      {/* Right curtain panel */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full will-change-transform"
        style={{
          transform: isParting ? 'translateX(102%)' : 'translateX(0)',
          transition: 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(270deg, 
            hsl(348 60% 18%) 0%, hsl(348 60% 24%) 15%, hsl(348 60% 22%) 25%,
            hsl(348 60% 26%) 40%, hsl(348 60% 24%) 55%, hsl(348 60% 22%) 70%,
            hsl(348 60% 26%) 85%, hsl(348 55% 20%) 100%)`,
          boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.4), inset -10px 0 30px rgba(0,0,0,0.2)',
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 6 }, (_, row) => (
              <g key={row} transform={`translate(${row % 2 ? 50 : 0}, ${row * 100})`}>
                <path d="M50 20 Q70 10 80 30 Q90 60 60 80 Q30 70 40 40 Q45 25 50 20Z" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                <circle cx="55" cy="50" r="6" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
                <path d="M150 60 Q170 50 180 70 Q190 100 160 120 Q130 110 140 80 Q145 65 150 60Z" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
              </g>
            ))}
          </svg>
        </div>
        {[15, 30, 48, 65, 82].map(pos => (
          <div key={pos} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '2px',
            background: `linear-gradient(180deg, transparent 0%, rgba(74,18,32,0.6) 20%, rgba(74,18,32,0.4) 50%, rgba(74,18,32,0.6) 80%, transparent 100%)`,
          }} />
        ))}
        {[13, 45, 80].map(pos => (
          <div key={`h-${pos}`} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '3px',
            background: `linear-gradient(180deg, transparent 5%, rgba(160,50,60,0.15) 30%, rgba(160,50,60,0.08) 60%, transparent 95%)`,
          }} />
        ))}
        <div className="absolute top-0 left-0 w-[3px] h-full" style={{
          background: `repeating-linear-gradient(180deg, hsl(38 36% 60% / 0.7) 0px, hsl(38 40% 65% / 0.5) 4px, hsl(38 30% 35% / 0.6) 8px, hsl(38 36% 60% / 0.7) 12px)`,
        }} />
        <div className="absolute left-[-6px] top-[15%]">
          <svg width="16" height="60" viewBox="0 0 16 60" fill="none">
            <circle cx="8" cy="8" r="6" fill="hsl(38 36% 60%)" opacity="0.7" />
            <circle cx="8" cy="8" r="4" fill="hsl(38 30% 35%)" opacity="0.5" />
            {[3, 5, 7, 9, 11, 13].map(x => (
              <line key={x} x1={x} y1="14" x2={x + (x > 8 ? 1 : -1)} y2="55" stroke="hsl(38 36% 60%)" strokeWidth="1" opacity="0.5" />
            ))}
            <ellipse cx="8" cy="56" rx="6" ry="3" fill="hsl(38 36% 60%)" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20" style={{
          background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
        }} />
      </div>

      {/* Center seam glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 5%, hsl(38 36% 60% / 0.5) 25%, hsl(38 36% 60% / 0.35) 50%, hsl(38 36% 60% / 0.5) 75%, transparent 95%)',
          opacity: isParting ? 0 : 0.6,
          filter: isParting ? 'blur(6px)' : 'blur(2px)',
          transition: 'opacity 1.2s ease-out, filter 1.2s ease-out',
        }}
      />

      {/* Gold sparkle particles */}
      {isParting && sparkles.map(s => (
        <div
          key={s.id}
          className="absolute left-1/2 rounded-full"
          style={{
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: 'hsl(var(--gold-primary))',
            boxShadow: '0 0 6px hsl(var(--gold-primary) / 0.5)',
            animation: `curtain-sparkle ${s.duration} ${s.delay} ease-out forwards`,
            ['--sparkle-x' as string]: s.driftX,
          }}
        />
      ))}
    </div>
  );
};

export default CurtainReveal;
