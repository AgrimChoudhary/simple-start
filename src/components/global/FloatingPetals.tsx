import React from 'react';

const FloatingPetals: React.FC = () => {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 7}s`,
    size: `${8 + Math.random() * 7}px`,
    driftX: `${-30 + Math.random() * 60}px`,
    driftRotate: `${180 + Math.random() * 360}deg`,
    swayX: `${15 + Math.random() * 30}px`,
    opacity: 0.25 + Math.random() * 0.1,
    color: Math.random() > 0.5 ? '#D4A017' : '#C9A96E',
  }));

  return (
    <div className="floating-petal fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            borderRadius: '50% 0 50% 50%',
            animation: `petal-drift ${p.duration} ${p.delay} linear infinite`,
            ['--drift-x' as string]: p.driftX,
            ['--drift-rotate' as string]: p.driftRotate,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;
