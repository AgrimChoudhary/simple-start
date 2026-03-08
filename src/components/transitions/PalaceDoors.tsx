import React, { useEffect, useState, useMemo } from 'react';

interface PalaceDoorsProps {
  onComplete: () => void;
}

const PalaceDoors: React.FC<PalaceDoorsProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 300);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  // Generate petals for door opening
  const doorPetals = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      delay: `${0.5 + Math.random() * 1}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${8 + Math.random() * 6}px`,
      driftX: `${-20 + Math.random() * 40}px`,
    })),
  []);

  if (phase === 'done') return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Mobile fallback: golden light fade
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[40]" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, hsl(var(--gold-primary) / 0.35) 0%, hsl(var(--gold-primary) / 0.15) 40%, hsl(var(--background)) 80%)`,
            opacity: phase === 'opening' ? 0 : 1,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[40]" aria-hidden="true" style={{ perspective: '1200px' }}>
      {/* Golden radial light expanding from center gap */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 30% 60% at center, 
            hsl(var(--gold-primary) / 0.25) 0%, 
            hsl(var(--gold-primary) / 0.1) 40%, 
            transparent 70%
          )`,
          opacity: phase === 'opening' ? 1 : 0,
          transform: phase === 'opening' ? 'scale(1.5)' : 'scale(0.5)',
          transition: 'opacity 1.2s ease-in 0.3s, transform 1.5s ease-out 0.3s',
        }}
      />

      {/* Marigold petals drifting from top during opening */}
      {phase === 'opening' && doorPetals.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: '0',
            width: p.size,
            height: p.size,
            backgroundColor: Math.random() > 0.5 ? '#D4A017' : '#C9A96E',
            opacity: 0.35,
            borderRadius: '50% 0 50% 50%',
            animation: `petal-drift ${p.duration} ${p.delay} linear forwards`,
            ['--drift-x' as string]: p.driftX,
            ['--drift-rotate' as string]: '360deg',
            zIndex: 45,
          }}
        />
      ))}

      {/* ===== LEFT DOOR ===== */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          transformOrigin: 'left center',
          transform: phase === 'opening' ? 'rotateY(-110deg)' : 'rotateY(0deg)',
          transition: 'transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="w-full h-full relative overflow-hidden" style={{ background: 'hsl(218 42% 19%)' }}>
          {/* Ornate jaali carved pattern */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" opacity="0.12">
            {/* Vertical border pattern */}
            <rect x="370" y="0" width="30" height="800" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            {/* Main arch at top */}
            <path d="M40 0 L40 250 Q200 100 360 250 L360 0" fill="none" stroke="#C9A96E" strokeWidth="1" />
            {/* Inner arch */}
            <path d="M70 40 L70 270 Q200 150 330 270 L330 40" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
            {/* Central medallion */}
            <circle cx="200" cy="400" r="80" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
            <circle cx="200" cy="400" r="60" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            <circle cx="200" cy="400" r="40" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
            {/* Lotus inside medallion */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <ellipse
                key={angle}
                cx="200"
                cy="400"
                rx="12"
                ry="30"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="0.4"
                transform={`rotate(${angle} 200 400)`}
              />
            ))}
            {/* Diamond lattice pattern */}
            {Array.from({ length: 8 }, (_, row) => (
              Array.from({ length: 4 }, (_, col) => (
                <g key={`${row}-${col}`}>
                  <path
                    d={`M${80 + col * 70} ${520 + row * 35} l35 -17.5 l35 17.5 l-35 17.5z`}
                    fill="none"
                    stroke="#C9A96E"
                    strokeWidth="0.3"
                  />
                </g>
              ))
            ))}
            {/* Bottom arch */}
            <path d="M60 800 L60 650 Q200 580 340 650 L340 800" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
          </svg>

          {/* Gold border at inner edge (right side = center of door pair) */}
          <div className="absolute top-0 right-0 w-[3px] h-full bg-primary" />
          {/* Inner gold line with gap */}
          <div className="absolute top-[5%] right-[12px] w-[1px] h-[90%] bg-primary/25" />

          {/* Arch-topped inner frame */}
          <div
            className="absolute top-[3%] left-[8%] right-[5%] bottom-[3%] border border-primary/15"
            style={{ borderRadius: '0 50% 0 0' }}
          />

          {/* Brass door knocker — ring handle with mounting plate */}
          <div className="absolute right-[15%] top-[48%] -translate-y-1/2">
            {/* Mounting plate */}
            <div className="relative">
              <div
                className="w-10 h-14 rounded-t-full border-2 border-primary/60 flex items-end justify-center pb-1"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--gold-primary) / 0.15), hsl(var(--gold-tertiary) / 0.1))',
                }}
              >
                {/* Lion/lotus head */}
                <svg width="16" height="16" viewBox="0 0 16 16" opacity="0.5">
                  <circle cx="8" cy="6" r="5" fill="none" stroke="#C9A96E" strokeWidth="1" />
                  <circle cx="6" cy="5" r="1" fill="#C9A96E" />
                  <circle cx="10" cy="5" r="1" fill="#C9A96E" />
                  <path d="M6 8 Q8 10 10 8" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                </svg>
              </div>
              {/* Ring */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                <div
                  className="w-8 h-8 rounded-full border-[2.5px] border-primary/50"
                  style={{
                    boxShadow: '0 2px 6px rgba(201, 169, 110, 0.15)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Door panel shadow/depth */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow: 'inset -15px 0 40px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>

      {/* ===== RIGHT DOOR ===== */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          transformOrigin: 'right center',
          transform: phase === 'opening' ? 'rotateY(110deg)' : 'rotateY(0deg)',
          transition: 'transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="w-full h-full relative overflow-hidden" style={{ background: 'hsl(218 42% 19%)' }}>
          {/* Mirrored ornate jaali */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" opacity="0.12" style={{ transform: 'scaleX(-1)' }}>
            <rect x="370" y="0" width="30" height="800" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            <path d="M40 0 L40 250 Q200 100 360 250 L360 0" fill="none" stroke="#C9A96E" strokeWidth="1" />
            <path d="M70 40 L70 270 Q200 150 330 270 L330 40" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
            <circle cx="200" cy="400" r="80" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
            <circle cx="200" cy="400" r="60" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
            <circle cx="200" cy="400" r="40" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <ellipse key={angle} cx="200" cy="400" rx="12" ry="30" fill="none" stroke="#C9A96E" strokeWidth="0.4" transform={`rotate(${angle} 200 400)`} />
            ))}
            {Array.from({ length: 8 }, (_, row) => (
              Array.from({ length: 4 }, (_, col) => (
                <g key={`${row}-${col}`}>
                  <path d={`M${80 + col * 70} ${520 + row * 35} l35 -17.5 l35 17.5 l-35 17.5z`} fill="none" stroke="#C9A96E" strokeWidth="0.3" />
                </g>
              ))
            ))}
            <path d="M60 800 L60 650 Q200 580 340 650 L340 800" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
          </svg>

          {/* Gold border at inner edge */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-primary" />
          <div className="absolute top-[5%] left-[12px] w-[1px] h-[90%] bg-primary/25" />

          {/* Arch-topped inner frame (mirrored) */}
          <div
            className="absolute top-[3%] left-[5%] right-[8%] bottom-[3%] border border-primary/15"
            style={{ borderRadius: '50% 0 0 0' }}
          />

          {/* Brass knocker (mirrored) */}
          <div className="absolute left-[15%] top-[48%] -translate-y-1/2">
            <div className="relative">
              <div
                className="w-10 h-14 rounded-t-full border-2 border-primary/60 flex items-end justify-center pb-1"
                style={{
                  background: 'linear-gradient(225deg, hsl(var(--gold-primary) / 0.15), hsl(var(--gold-tertiary) / 0.1))',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" opacity="0.5">
                  <circle cx="8" cy="6" r="5" fill="none" stroke="#C9A96E" strokeWidth="1" />
                  <circle cx="6" cy="5" r="1" fill="#C9A96E" />
                  <circle cx="10" cy="5" r="1" fill="#C9A96E" />
                  <path d="M6 8 Q8 10 10 8" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
                </svg>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                <div
                  className="w-8 h-8 rounded-full border-[2.5px] border-primary/50"
                  style={{ boxShadow: '0 2px 6px rgba(201, 169, 110, 0.15)' }}
                />
              </div>
            </div>
          </div>

          {/* Door panel shadow/depth */}
          <div
            className="absolute inset-0"
            style={{
              boxShadow: 'inset 15px 0 40px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>

      {/* Gold arch frame across top of both doors */}
      <div
        className="absolute top-0 left-0 right-0 h-8 pointer-events-none z-[41]"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--gold-primary) / 0.3) 0%, transparent 100%)',
          opacity: phase === 'opening' ? 0 : 1,
          transition: 'opacity 0.8s ease-out',
        }}
      />
    </div>
  );
};

export default PalaceDoors;
