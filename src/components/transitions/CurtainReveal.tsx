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
      {/* Top valance / pelmet — draped golden fabric at top */}
      <div
        className="absolute top-0 left-0 right-0 z-[52] h-16 md:h-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--curtain-dark)) 0%, hsl(var(--curtain-red)) 60%, transparent 100%)',
          opacity: animating ? 0 : 1,
          transition: 'opacity 1.5s ease-out 0.5s',
        }}
      >
        {/* Scalloped bottom edge of valance */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
          style={{ height: '20px' }}
        >
          <path
            d="M0 0 Q50 30 100 0 Q150 30 200 0 Q250 30 300 0 Q350 30 400 0 Q450 30 500 0 Q550 30 600 0 Q650 30 700 0 Q750 30 800 0 Q850 30 900 0 Q950 30 1000 0 Q1050 30 1100 0 Q1150 30 1200 0 V30 H0Z"
            fill="hsl(348 60% 26%)"
          />
        </svg>
        {/* Gold trim along valance bottom */}
        <div className="absolute bottom-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Left curtain panel */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          transform: animating ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Base fabric with rich depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, 
                hsl(348 60% 18%) 0%,
                hsl(348 60% 24%) 15%,
                hsl(348 60% 22%) 25%,
                hsl(348 60% 26%) 40%,
                hsl(348 60% 24%) 55%,
                hsl(348 60% 22%) 70%,
                hsl(348 60% 26%) 85%,
                hsl(348 55% 20%) 100%
              )
            `,
            boxShadow: 'inset -30px 0 60px rgba(0,0,0,0.4), inset 10px 0 30px rgba(0,0,0,0.2)',
          }}
        />

        {/* Vertical fold lines for fabric depth */}
        {[18, 35, 52, 70, 85].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 h-full"
            style={{
              left: `${pos}%`,
              width: '2px',
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(74, 18, 32, 0.6) 20%, 
                rgba(74, 18, 32, 0.4) 50%, 
                rgba(74, 18, 32, 0.6) 80%, 
                transparent 100%
              )`,
            }}
          />
        ))}

        {/* Fabric highlight strips (light catching the folds) */}
        {[20, 55, 87].map((pos) => (
          <div
            key={`h-${pos}`}
            className="absolute top-0 h-full"
            style={{
              left: `${pos}%`,
              width: '3px',
              background: `linear-gradient(180deg, 
                transparent 5%, 
                rgba(160, 50, 60, 0.15) 30%, 
                rgba(160, 50, 60, 0.08) 60%, 
                transparent 95%
              )`,
            }}
          />
        ))}

        {/* Gold rope/cord at inner edge */}
        <div className="absolute top-0 right-0 w-[3px] h-full">
          <div
            className="w-full h-full"
            style={{
              background: `
                repeating-linear-gradient(180deg,
                  hsl(38 36% 60% / 0.7) 0px,
                  hsl(38 40% 65% / 0.5) 4px,
                  hsl(38 30% 35% / 0.6) 8px,
                  hsl(38 36% 60% / 0.7) 12px
                )
              `,
            }}
          />
        </div>

        {/* Gold tassel at inner edge */}
        <div className="absolute right-[-6px] top-[15%]">
          <svg width="16" height="60" viewBox="0 0 16 60" fill="none">
            {/* Tassel knot */}
            <circle cx="8" cy="8" r="6" fill="hsl(38 36% 60%)" opacity="0.7" />
            <circle cx="8" cy="8" r="4" fill="hsl(38 30% 35%)" opacity="0.5" />
            {/* Tassel strands */}
            {[3, 5, 7, 9, 11, 13].map(x => (
              <line key={x} x1={x} y1="14" x2={x + (x > 8 ? 1 : -1)} y2="55" stroke="hsl(38 36% 60%)" strokeWidth="1" opacity="0.5" />
            ))}
            {/* Tassel bottom cap */}
            <ellipse cx="8" cy="56" rx="6" ry="3" fill="hsl(38 36% 60%)" opacity="0.4" />
          </svg>
        </div>

        {/* Bottom drape shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Right curtain panel */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          transform: animating ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Base fabric */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(270deg, 
                hsl(348 60% 18%) 0%,
                hsl(348 60% 24%) 15%,
                hsl(348 60% 22%) 25%,
                hsl(348 60% 26%) 40%,
                hsl(348 60% 24%) 55%,
                hsl(348 60% 22%) 70%,
                hsl(348 60% 26%) 85%,
                hsl(348 55% 20%) 100%
              )
            `,
            boxShadow: 'inset 30px 0 60px rgba(0,0,0,0.4), inset -10px 0 30px rgba(0,0,0,0.2)',
          }}
        />

        {/* Vertical fold lines */}
        {[15, 30, 48, 65, 82].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 h-full"
            style={{
              left: `${pos}%`,
              width: '2px',
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(74, 18, 32, 0.6) 20%, 
                rgba(74, 18, 32, 0.4) 50%, 
                rgba(74, 18, 32, 0.6) 80%, 
                transparent 100%
              )`,
            }}
          />
        ))}

        {/* Fabric highlight strips */}
        {[13, 45, 80].map((pos) => (
          <div
            key={`h-${pos}`}
            className="absolute top-0 h-full"
            style={{
              left: `${pos}%`,
              width: '3px',
              background: `linear-gradient(180deg, 
                transparent 5%, 
                rgba(160, 50, 60, 0.15) 30%, 
                rgba(160, 50, 60, 0.08) 60%, 
                transparent 95%
              )`,
            }}
          />
        ))}

        {/* Gold rope at inner edge */}
        <div className="absolute top-0 left-0 w-[3px] h-full">
          <div
            className="w-full h-full"
            style={{
              background: `
                repeating-linear-gradient(180deg,
                  hsl(38 36% 60% / 0.7) 0px,
                  hsl(38 40% 65% / 0.5) 4px,
                  hsl(38 30% 35% / 0.6) 8px,
                  hsl(38 36% 60% / 0.7) 12px
                )
              `,
            }}
          />
        </div>

        {/* Gold tassel at inner edge */}
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

        {/* Bottom drape shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Center seam glow — golden light peaking through as curtains begin to part */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 10%, hsl(38 36% 60% / 0.2) 30%, hsl(38 36% 60% / 0.15) 70%, transparent 90%)',
          opacity: animating ? 0 : 0.6,
          transition: 'opacity 0.5s ease-out',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default CurtainReveal;
