import React, { useEffect, useState } from 'react';

interface CurtainRevealProps {
  onComplete: () => void;
}

/**
 * Performance-optimised curtain reveal.
 * - Uses CSS animations (not JS transitions) for GPU compositing
 * - Minimal DOM: two panels + one glow layer, no SVG patterns
 * - All motion via transform3d — no layout/paint triggers
 */
const CurtainReveal: React.FC<CurtainRevealProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'done'>('closed');

  useEffect(() => {
    // Brief pause then start opening
    const t1 = setTimeout(() => setPhase('opening'), 400);
    // Fire onComplete mid-animation so content starts revealing behind
    const t2 = setTimeout(() => onComplete(), 1100);
    // Remove from DOM after animation completes
    const t3 = setTimeout(() => setPhase('done'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isOpening = phase === 'opening';

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
      {/* Golden light burst from center */}
      <div
        className="absolute inset-0 curtain-glow-layer"
        style={{
          opacity: isOpening ? 1 : 0,
          transform: isOpening ? 'scale3d(3, 1.5, 1)' : 'scale3d(0.2, 1, 1)',
        }}
      />

      {/* Left curtain — pure CSS animation for 60fps */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full curtain-panel curtain-panel-left ${isOpening ? 'curtain-animate-left' : ''}`}
      >
        {/* Fabric folds — simple gradients, no SVG */}
        <div className="absolute inset-0 curtain-folds-left" />
        {/* Gold trim on inner edge */}
        <div className="absolute top-0 right-0 w-[2px] h-full curtain-gold-trim" />
        {/* Bottom shadow */}
        <div className="absolute bottom-0 inset-x-0 h-16 curtain-bottom-shadow" />
      </div>

      {/* Right curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full curtain-panel curtain-panel-right ${isOpening ? 'curtain-animate-right' : ''}`}
      >
        <div className="absolute inset-0 curtain-folds-right" />
        <div className="absolute top-0 left-0 w-[2px] h-full curtain-gold-trim" />
        <div className="absolute bottom-0 inset-x-0 h-16 curtain-bottom-shadow" />
      </div>

      {/* Center seam glow — fades as curtains part */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full curtain-seam"
        style={{
          opacity: isOpening ? 0 : 0.5,
        }}
      />

      {/* Top pelmet */}
      <div
        className="absolute top-0 inset-x-0 h-14 md:h-16 z-[52] curtain-pelmet"
        style={{
          opacity: isOpening ? 0 : 1,
        }}
      />
    </div>
  );
};

export default CurtainReveal;
