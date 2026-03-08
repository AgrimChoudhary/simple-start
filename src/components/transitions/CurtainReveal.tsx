import React, { useEffect, useState, useMemo } from 'react';

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'waiting' | 'parting' | 'done'>('waiting');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('parting'), 600);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  // Gold sparkle particles at center seam
  const sparkles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      top: `${8 + (i / 16) * 84}%`,
      delay: `${0.2 + Math.random() * 1.2}s`,
      size: `${2 + Math.random() * 3}px`,
      driftX: `${-20 + Math.random() * 40}px`,
      duration: `${1.5 + Math.random() * 1}s`,
    })),
  []);

  if (phase === 'done') return null;

  const isParting = phase === 'parting';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
      {/* Golden light expanding from center as curtains open */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 20% 70% at 50% 50%, hsl(var(--gold-primary) / 0.2) 0%, hsl(var(--gold-primary) / 0.05) 50%, transparent 80%)',
          opacity: isParting ? 1 : 0,
          transform: isParting ? 'scaleX(3)' : 'scaleX(0.5)',
          transition: 'opacity 1.5s ease-out, transform 2.5s ease-out',
        }}
      />

      {/* Top valance / pelmet */}
      <div
        className="absolute top-0 left-0 right-0 z-[52] h-16 md:h-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--curtain-dark)) 0%, hsl(var(--curtain-red)) 60%, transparent 100%)',
          opacity: isParting ? 0 : 1,
          transition: 'opacity 2s ease-out 1s',
        }}
      >
        {/* Scalloped bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 30" preserveAspectRatio="none" style={{ height: '20px' }}>
          <path d="M0 0 Q50 30 100 0 Q150 30 200 0 Q250 30 300 0 Q350 30 400 0 Q450 30 500 0 Q550 30 600 0 Q650 30 700 0 Q750 30 800 0 Q850 30 900 0 Q950 30 1000 0 Q1050 30 1100 0 Q1150 30 1200 0 V30 H0Z" fill="hsl(348 60% 26%)" />
        </svg>
        {/* Gold trim */}
        <div className="absolute bottom-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        {/* Embroidery motif */}
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
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          transform: isParting ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(90deg, 
            hsl(348 60% 18%) 0%, hsl(348 60% 24%) 15%, hsl(348 60% 22%) 25%,
            hsl(348 60% 26%) 40%, hsl(348 60% 24%) 55%, hsl(348 60% 22%) 70%,
            hsl(348 60% 26%) 85%, hsl(348 55% 20%) 100%)`,
          boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.4), inset 10px 0 30px rgba(0,0,0,0.2)',
        }} />
        {/* Fabric texture — paisley embroidery overlay */}
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
        {/* Fold lines */}
        {[18, 35, 52, 70, 85].map(pos => (
          <div key={pos} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '2px',
            background: `linear-gradient(180deg, transparent 0%, rgba(74,18,32,0.6) 20%, rgba(74,18,32,0.4) 50%, rgba(74,18,32,0.6) 80%, transparent 100%)`,
          }} />
        ))}
        {/* Highlight strips */}
        {[20, 55, 87].map(pos => (
          <div key={`h-${pos}`} className="absolute top-0 h-full" style={{
            left: `${pos}%`, width: '3px',
            background: `linear-gradient(180deg, transparent 5%, rgba(160,50,60,0.15) 30%, rgba(160,50,60,0.08) 60%, transparent 95%)`,
          }} />
        ))}
        {/* Gold rope at inner edge */}
        <div className="absolute top-0 right-0 w-[3px] h-full" style={{
          background: `repeating-linear-gradient(180deg, hsl(38 36% 60% / 0.7) 0px, hsl(38 40% 65% / 0.5) 4px, hsl(38 30% 35% / 0.6) 8px, hsl(38 36% 60% / 0.7) 12px)`,
        }} />
        {/* Gold tassel */}
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
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          transform: isParting ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(270deg, 
            hsl(348 60% 18%) 0%, hsl(348 60% 24%) 15%, hsl(348 60% 22%) 25%,
            hsl(348 60% 26%) 40%, hsl(348 60% 24%) 55%, hsl(348 60% 22%) 70%,
            hsl(348 60% 26%) 85%, hsl(348 55% 20%) 100%)`,
          boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.4), inset -10px 0 30px rgba(0,0,0,0.2)',
        }} />
        {/* Fabric texture */}
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
        {/* Fold lines */}
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

      {/* Center seam glow — brightens as curtains start parting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 5%, hsl(38 36% 60% / 0.4) 25%, hsl(38 36% 60% / 0.3) 50%, hsl(38 36% 60% / 0.4) 75%, transparent 95%)',
          opacity: isParting ? 1 : 0.5,
          filter: isParting ? 'blur(4px)' : 'blur(2px)',
          transition: 'opacity 0.8s ease-out, filter 1s ease-out',
        }}
      />

      {/* Gold sparkle particles at center seam */}
      {isParting && sparkles.map(s => (
        <div
          key={s.id}
          className="absolute left-1/2 rounded-full"
          style={{
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: 'hsl(var(--gold-primary))',
            animation: `curtain-sparkle ${s.duration} ${s.delay} ease-out forwards`,
            ['--sparkle-x' as string]: s.driftX,
          }}
        />
      ))}
    </div>
  );
};

export default CurtainReveal;
