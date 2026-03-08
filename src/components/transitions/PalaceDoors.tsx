import React, { useEffect, useState } from 'react';

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

  if (phase === 'done') return null;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-[40]"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle at center, hsl(var(--gold-primary) / 0.3), hsl(var(--background)))`,
          opacity: phase === 'opening' ? 0 : 1,
          transition: 'opacity 1.5s ease-in-out',
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[40]" aria-hidden="true" style={{ perspective: '1200px' }}>
      {/* Golden light from center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--gold-primary) / 0.15) 0%, transparent 70%)',
          opacity: phase === 'opening' ? 1 : 0,
          transition: 'opacity 1s ease-in 0.5s',
        }}
      />

      {/* Left door */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
        style={{
          transformOrigin: 'left center',
          transform: phase === 'opening' ? 'rotateY(-110deg)' : 'rotateY(0deg)',
          transition: 'transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
          backfaceVisibility: 'hidden',
        }}
      >
        <div
          className="w-full h-full relative"
          style={{ background: 'hsl(var(--bg-hover))' }}
        >
          {/* Jaali pattern */}
          <div className="jaali-overlay" style={{ opacity: 0.15 }} />
          {/* Gold border */}
          <div className="absolute top-0 right-0 w-[3px] h-full bg-primary" />
          <div className="absolute inset-4 border border-primary/20 rounded-t-[50%]" />
          {/* Brass knocker */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-primary" />
          </div>
        </div>
      </div>

      {/* Right door */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
        style={{
          transformOrigin: 'right center',
          transform: phase === 'opening' ? 'rotateY(110deg)' : 'rotateY(0deg)',
          transition: 'transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
          backfaceVisibility: 'hidden',
        }}
      >
        <div
          className="w-full h-full relative"
          style={{ background: 'hsl(var(--bg-hover))' }}
        >
          <div className="jaali-overlay" style={{ opacity: 0.15 }} />
          <div className="absolute top-0 left-0 w-[3px] h-full bg-primary" />
          <div className="absolute inset-4 border border-primary/20 rounded-t-[50%]" />
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 rounded-full border-2 border-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalaceDoors;
