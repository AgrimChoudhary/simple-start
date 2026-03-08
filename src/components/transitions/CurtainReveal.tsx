import React, { useEffect, useState } from 'react';

interface CurtainRevealProps {
  onComplete: () => void;
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const [animating, setAnimating] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setAnimating(true), 500);
    const completeTimer = setTimeout(() => {
      setRemoved(true);
      onComplete();
    }, 3000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
      {/* Left curtain */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: `linear-gradient(90deg, hsl(var(--curtain-red)), hsl(var(--curtain-dark)) 40%, hsl(var(--curtain-red)) 60%, hsl(var(--curtain-dark)))`,
          transform: animating ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Gold rope edge */}
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40" />
        {/* Fold lines */}
        <div className="absolute top-0 right-[30%] w-px h-full bg-curtain-dark/30" />
        <div className="absolute top-0 right-[60%] w-px h-full bg-curtain-dark/30" />
      </div>

      {/* Right curtain */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: `linear-gradient(270deg, hsl(var(--curtain-red)), hsl(var(--curtain-dark)) 40%, hsl(var(--curtain-red)) 60%, hsl(var(--curtain-dark)))`,
          transform: animating ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Gold rope edge */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40" />
        {/* Fold lines */}
        <div className="absolute top-0 left-[30%] w-px h-full bg-curtain-dark/30" />
        <div className="absolute top-0 left-[60%] w-px h-full bg-curtain-dark/30" />
      </div>
    </div>
  );
};

export default CurtainReveal;
