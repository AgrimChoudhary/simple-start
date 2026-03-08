import React, { useEffect, useState, useMemo } from 'react';

interface PalaceDoorsProps {
  onComplete: () => void;
}

/* Ornate Jaali SVG — reused for both doors */
const DoorJaali: React.FC<{ mirror?: boolean }> = ({ mirror }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    viewBox="0 0 400 800"
    preserveAspectRatio="xMidYMid slice"
    opacity="0.14"
    style={mirror ? { transform: 'scaleX(-1)' } : undefined}
    aria-hidden="true"
  >
    {/* Border */}
    <rect x="370" y="0" width="30" height="800" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
    {/* Main arch */}
    <path d="M40 0 L40 250 Q200 80 360 250 L360 0" fill="none" stroke="#C9A96E" strokeWidth="1.2" />
    <path d="M60 20 L60 260 Q200 120 340 260 L340 20" fill="none" stroke="#C9A96E" strokeWidth="0.6" />
    {/* Inner pointed arch */}
    <path d="M80 50 L80 270 Q200 160 320 270 L320 50" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
    {/* Central medallion */}
    <circle cx="200" cy="400" r="85" fill="none" stroke="#C9A96E" strokeWidth="0.9" />
    <circle cx="200" cy="400" r="70" fill="none" stroke="#C9A96E" strokeWidth="0.5" />
    <circle cx="200" cy="400" r="55" fill="none" stroke="#C9A96E" strokeWidth="0.3" strokeDasharray="3 4" />
    <circle cx="200" cy="400" r="40" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
    {/* 16-petal lotus */}
    {Array.from({ length: 16 }, (_, i) => (
      <ellipse
        key={i}
        cx="200" cy="400"
        rx="10" ry="28"
        fill="none" stroke="#C9A96E" strokeWidth="0.4"
        transform={`rotate(${(360 / 16) * i} 200 400)`}
      />
    ))}
    {/* Center star */}
    <polygon points="200,380 205,395 220,400 205,405 200,420 195,405 180,400 195,395" fill="#C9A96E" opacity="0.15" />
    {/* Diamond lattice */}
    {Array.from({ length: 10 }, (_, row) =>
      Array.from({ length: 4 }, (_, col) => (
        <path
          key={`${row}-${col}`}
          d={`M${70 + col * 70} ${520 + row * 28} l35 -14 l35 14 l-35 14z`}
          fill="none" stroke="#C9A96E" strokeWidth="0.3"
        />
      ))
    )}
    {/* Bottom arch */}
    <path d="M60 800 L60 660 Q200 590 340 660 L340 800" fill="none" stroke="#C9A96E" strokeWidth="0.7" />
    <path d="M80 800 L80 680 Q200 620 320 680 L320 800" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
    {/* Small rosette details */}
    {[{x:120,y:180},{x:280,y:180},{x:100,y:300},{x:300,y:300}].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="#C9A96E" strokeWidth="0.4" />
        {[0,60,120,180,240,300].map(a => (
          <ellipse key={a} cx={p.x} cy={p.y} rx="3" ry="8" fill="none" stroke="#C9A96E" strokeWidth="0.25" transform={`rotate(${a} ${p.x} ${p.y})`} />
        ))}
      </g>
    ))}
  </svg>
);

/* Ornate brass knocker */
const BrassKnocker: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div className={`absolute ${side === 'left' ? 'right-[14%]' : 'left-[14%]'} top-[47%] -translate-y-1/2`}>
    <div className="relative">
      {/* Mounting plate — lotus shape */}
      <div
        className="w-12 h-16 rounded-t-full border-2 border-primary/60 flex items-end justify-center pb-1.5"
        style={{
          background: `linear-gradient(${side === 'left' ? '135' : '225'}deg, hsl(var(--gold-primary) / 0.2), hsl(var(--gold-tertiary) / 0.12))`,
        }}
      >
        {/* Lion head */}
        <svg width="24" height="24" viewBox="0 0 24 24" opacity="0.5">
          <circle cx="12" cy="8" r="7" fill="none" stroke="#C9A96E" strokeWidth="1" />
          <circle cx="9" cy="7" r="1.2" fill="#C9A96E" />
          <circle cx="15" cy="7" r="1.2" fill="#C9A96E" />
          <path d="M9 11 Q12 14 15 11" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          {/* Mane rays */}
          {[0, 30, 60, 120, 150, 180].map(a => (
            <line key={a} x1={12 + Math.cos(a * Math.PI / 180) * 7} y1={8 + Math.sin(a * Math.PI / 180) * 7}
              x2={12 + Math.cos(a * Math.PI / 180) * 9} y2={8 + Math.sin(a * Math.PI / 180) * 9}
              stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
          ))}
        </svg>
      </div>
      {/* Ring */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
        <div className="w-10 h-10 rounded-full border-[3px] border-primary/50"
          style={{ boxShadow: '0 3px 10px rgba(201, 169, 110, 0.2)' }} />
      </div>
    </div>
  </div>
);

const PalaceDoors: React.FC<PalaceDoorsProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 350);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  const doorPetals = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${15 + Math.random() * 70}%`,
      delay: `${0.3 + Math.random() * 1.2}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${7 + Math.random() * 7}px`,
      driftX: `${-25 + Math.random() * 50}px`,
      color: ['#D4A017', '#C9A96E', '#D4B87A'][Math.floor(Math.random() * 3)],
    })),
  []);

  if (phase === 'done') return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Mobile: gold particle sweep
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[40]" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at center, hsl(var(--gold-primary) / 0.35) 0%, hsl(var(--gold-primary) / 0.15) 40%, hsl(var(--background)) 80%)`,
          opacity: phase === 'opening' ? 0 : 1,
          transition: 'opacity 1.5s ease-in-out',
        }} />
        {/* Gold particles sweep on mobile */}
        {phase === 'opening' && doorPetals.slice(0, 8).map(p => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: p.left, top: '40%',
            width: p.size, height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
            animation: `petal-drift ${p.duration} ${p.delay} linear forwards`,
            ['--drift-x' as string]: p.driftX,
            ['--drift-rotate' as string]: '360deg',
          }} />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[40]" aria-hidden="true" style={{ perspective: '1200px' }}>
      {/* Golden arch frame at top — stays visible */}
      <div className="absolute top-0 left-0 right-0 z-[42] pointer-events-none" style={{
        opacity: phase === 'opening' ? 0 : 1,
        transition: 'opacity 1.2s ease-out 0.5s',
      }}>
        <svg viewBox="0 0 1200 60" className="w-full h-auto" preserveAspectRatio="none" style={{ maxHeight: '50px' }}>
          <path d="M0 60 L0 30 Q600 -20 1200 30 L1200 60" fill="none" stroke="hsl(var(--gold-primary))" strokeWidth="2" opacity="0.4" />
          <path d="M0 60 L0 35 Q600 -10 1200 35 L1200 60" fill="none" stroke="hsl(var(--gold-primary))" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Golden radial light — dramatic expansion */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 25% 55% at center, 
          hsl(var(--gold-primary) / 0.3) 0%, hsl(var(--gold-primary) / 0.12) 35%, transparent 65%)`,
        opacity: phase === 'opening' ? 1 : 0,
        transform: phase === 'opening' ? 'scale(2)' : 'scale(0.3)',
        transition: 'opacity 1s ease-in 0.2s, transform 1.8s ease-out 0.2s',
      }} />

      {/* Marigold petals */}
      {phase === 'opening' && doorPetals.map(p => (
        <div key={p.id} className="absolute" style={{
          left: p.left, top: '0',
          width: p.size, height: p.size,
          backgroundColor: p.color,
          opacity: 0.4,
          borderRadius: '50% 0 50% 50%',
          animation: `petal-drift ${p.duration} ${p.delay} linear forwards`,
          ['--drift-x' as string]: p.driftX,
          ['--drift-rotate' as string]: '360deg',
          zIndex: 45,
        }} />
      ))}

      {/* LEFT DOOR */}
      <div className="absolute top-0 left-0 w-1/2 h-full" style={{
        transformOrigin: 'left center',
        transform: phase === 'opening' ? 'rotateY(-110deg)' : 'rotateY(0deg)',
        transition: 'transform 1.6s cubic-bezier(0.22, 0.61, 0.36, 1)',
        backfaceVisibility: 'hidden',
      }}>
        <div className="w-full h-full relative overflow-hidden" style={{ background: 'hsl(218 42% 19%)' }}>
          <DoorJaali />
          <div className="absolute top-0 right-0 w-[3px] h-full bg-primary" />
          <div className="absolute top-[5%] right-[12px] w-[1px] h-[90%] bg-primary/25" />
          <div className="absolute top-[3%] left-[8%] right-[5%] bottom-[3%] border border-primary/15" style={{ borderRadius: '0 50% 0 0' }} />
          <BrassKnocker side="left" />
          <div className="absolute inset-0" style={{ boxShadow: 'inset -15px 0 40px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.1)' }} />
        </div>
      </div>

      {/* RIGHT DOOR */}
      <div className="absolute top-0 right-0 w-1/2 h-full" style={{
        transformOrigin: 'right center',
        transform: phase === 'opening' ? 'rotateY(110deg)' : 'rotateY(0deg)',
        transition: 'transform 1.6s cubic-bezier(0.22, 0.61, 0.36, 1)',
        backfaceVisibility: 'hidden',
      }}>
        <div className="w-full h-full relative overflow-hidden" style={{ background: 'hsl(218 42% 19%)' }}>
          <DoorJaali mirror />
          <div className="absolute top-0 left-0 w-[3px] h-full bg-primary" />
          <div className="absolute top-[5%] left-[12px] w-[1px] h-[90%] bg-primary/25" />
          <div className="absolute top-[3%] left-[5%] right-[8%] bottom-[3%] border border-primary/15" style={{ borderRadius: '50% 0 0 0' }} />
          <BrassKnocker side="right" />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 15px 0 40px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.1)' }} />
        </div>
      </div>
    </div>
  );
};

export default PalaceDoors;
