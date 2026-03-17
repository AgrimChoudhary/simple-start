import React, { useState, useCallback, useRef } from 'react';
import { Eye, X } from 'lucide-react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

// Import Images
import groomFatherImg from '@/assets/family/groom_father.png';
import groomMotherImg from '@/assets/family/groom_mother.png';
import groomBrotherImg from '@/assets/family/groom_brother.png';
import groomSisterImg from '@/assets/family/groom_sister.png';
import groomGrandfatherImg from '@/assets/family/groom_grandfather.png';
import groomGrandmotherImg from '@/assets/family/groom_grandmother.png';
import groomUncleImg from '@/assets/family/groom_uncle.png';
import groomAuntImg from '@/assets/family/groom_aunt.png';
import groomMainImg from '@/assets/family/groom_family_group.png';

import brideFatherImg from '@/assets/family/bride_father.png';
import brideMotherImg from '@/assets/family/bride_mother.png';
import brideBrotherImg from '@/assets/family/bride_brother.png';
import brideSisterImg from '@/assets/family/bride_sister.png';
import brideGrandfatherImg from '@/assets/family/bride_grandfather.png';
import brideGrandmotherImg from '@/assets/family/bride_grandmother.png';
import brideUncleImg from '@/assets/family/bride_uncle.png';
import brideAuntImg from '@/assets/family/bride_aunt.png';
import brideMainImg from '@/assets/family/bride_family_group.png';

/* ═══════════════════════════════════════
   FAMILY DATA
   ═══════════════════════════════════════ */
interface FamilyMember {
  name: string;
  relation: string;
  color: string;
  image: string;
}

interface FamilySide {
  side: 'groom' | 'bride';
  title: string;
  hindiTitle: string;
  parents: string;
  color: string;
  mainImage: string;
  members: FamilyMember[];
}

const familyData: FamilySide[] = [
  {
    side: 'groom',
    title: "The Groom's Family",
    hindiTitle: 'वर पक्ष',
    parents: 'Shri Rajendra & Smt. Sunita',
    color: 'hsl(38 30% 22%)',
    mainImage: groomMainImg,
    members: [
      { name: 'Shri Rajendra Ji', relation: 'Father', color: 'hsl(38 30% 20%)', image: groomFatherImg },
      { name: 'Smt. Sunita Ji', relation: 'Mother', color: 'hsl(25 28% 22%)', image: groomMotherImg },
      { name: 'Rahul Sharma', relation: 'Brother', color: 'hsl(218 35% 18%)', image: groomBrotherImg },
      { name: 'Priya Sharma', relation: 'Sister', color: 'hsl(38 25% 19%)', image: groomSisterImg },
      { name: 'Shri Ramesh Ji', relation: 'Grandfather', color: 'hsl(218 40% 16%)', image: groomGrandfatherImg },
      { name: 'Smt. Kamla Devi', relation: 'Grandmother', color: 'hsl(25 30% 20%)', image: groomGrandmotherImg },
      { name: 'Shri Suresh Ji', relation: 'Uncle', color: 'hsl(38 28% 21%)', image: groomUncleImg },
      { name: 'Smt. Meena Ji', relation: 'Aunt', color: 'hsl(218 32% 17%)', image: groomAuntImg },
    ],
  },
  {
    side: 'bride',
    title: "The Bride's Family",
    hindiTitle: 'वधू पक्ष',
    parents: 'Shri Mahendra & Smt. Kavita',
    color: 'hsl(218 40% 18%)',
    mainImage: brideMainImg,
    members: [
      { name: 'Shri Mahendra Ji', relation: 'Father', color: 'hsl(218 38% 18%)', image: brideFatherImg },
      { name: 'Smt. Kavita Ji', relation: 'Mother', color: 'hsl(38 28% 21%)', image: brideMotherImg },
      { name: 'Ankur Verma', relation: 'Brother', color: 'hsl(25 30% 20%)', image: brideBrotherImg },
      { name: 'Neha Verma', relation: 'Sister', color: 'hsl(218 35% 16%)', image: brideSisterImg },
      { name: 'Shri Devendra Ji', relation: 'Grandfather', color: 'hsl(38 25% 19%)', image: brideGrandfatherImg },
      { name: 'Smt. Shanti Devi', relation: 'Grandmother', color: 'hsl(25 28% 22%)', image: brideGrandmotherImg },
      { name: 'Shri Narendra Ji', relation: 'Uncle', color: 'hsl(218 40% 17%)', image: brideUncleImg },
      { name: 'Smt. Asha Ji', relation: 'Aunt', color: 'hsl(38 30% 20%)', image: brideAuntImg },
    ],
  },
];

/* ═══════════════════════════════════════
   RAJASTHANI JAALI PATTERN (SVG)
   ═══════════════════════════════════════ */
const JaaliPattern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    viewBox="0 0 200 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="jaali-family" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        {/* Arch motif */}
        <path d="M20,0 Q20,15 10,20 Q0,25 0,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        <path d="M20,0 Q20,15 30,20 Q40,25 40,40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" />
        {/* Diamond at intersection */}
        <path d="M20,18 L22,20 L20,22 L18,20 Z" fill="hsl(var(--primary))" opacity="0.08" />
        {/* Horizontal arch */}
        <path d="M0,20 Q15,20 20,10 Q25,20 40,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.06" />
      </pattern>
    </defs>
    <rect width="200" height="300" fill="url(#jaali-family)" />
  </svg>
);

/* ═══════════════════════════════════════
   BUBBLES BACKGROUND (Dynamic Effect)
   ═══════════════════════════════════════ */
const BubblesBackground: React.FC = () => {
  const upwardBubbles = Array.from({ length: 10 });
  const downwardBubbles = Array.from({ length: 10 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Upward bubbles */}
      {upwardBubbles.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        return (
          <div
            key={`up-${i}`}
            className="bubble"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        );
      })}
      
      {/* Downward bubbles (Reverse flow) */}
      {downwardBubbles.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        return (
          <div
            key={`down-${i}`}
            className="bubble bubble-reverse"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   FLORAL ORNATE FRAME — Ivory & Embossed Gold 
   (Synced with Gallery Section)
   ═══════════════════════════════════════════════ */
const FloralOrnateFrame: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => (
  <div className={`floral-frame-wrapper ${active ? 'floral-frame-active' : ''}`}>
    {/* Floral corners using SVGs from Gallery */}
    <div className="floral-ornament ornament-tl">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
        <path d="M10,40 Q15,60 40,65" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M40,10 Q60,15 65,40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
    <div className="floral-ornament ornament-tr">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>
    <div className="floral-ornament ornament-bl">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleY(-1)' }}>
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>
    <div className="floral-ornament ornament-br">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(-1)' }}>
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>

    {/* Side vines */}
    <div className="floral-ornament ornament-side-l">
      <svg viewBox="0 0 20 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,0 Q15,25 5,50 T10,100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
    <div className="floral-ornament ornament-side-r">
      <svg viewBox="0 0 20 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M10,0 Q15,25 5,50 T10,100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>

    {children}
  </div>
);

/* ═══════════════════════════════════════
   ORNATE FLORAL BORDER (Inspired by Image)
   ═══════════════════════════════════════ */
const OrnateBorder: React.FC<{ active: boolean; size?: 'large' | 'small' }> = ({ active, size = 'large' }) => {
  const isSmall = size === 'small';
  return (
    <div className={`ornate-border-container ${isSmall ? 'ornate-border-small' : ''}`}>
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Double Gold Border Lines with Glow */}
        <rect 
            x="10" y="10" width="380" height="480" 
            stroke="url(#gold-gradient)" strokeWidth="1.5" 
            className={`animate-border-glow transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}
        />
        <rect 
            x="14" y="14" width="372" height="472" 
            stroke="url(#gold-gradient)" strokeWidth="0.8" opacity="0.6"
            className={`transition-all duration-700 delay-300 ${active ? 'opacity-60' : 'opacity-0'}`}
        />

        {/* Top-Left Floral Corner */}
        <g className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path 
            d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
          />
          <path 
            d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
            style={{ animationDelay: '0.2s' }}
          />
          <path 
            d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" 
            fill="url(#gold-gradient)" 
            className="floral-corner-path animate-floral-draw"
            style={{ animationDelay: '0.4s' }}
          />
        </g>

        {/* Top-Right Floral Corner */}
        <g transform="translate(400, 0) scale(-1, 1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Bottom-Left Floral Corner */}
        <g transform="translate(0, 500) scale(1, -1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        {/* Bottom-Right Floral Corner */}
        <g transform="translate(400, 500) scale(-1, -1)" className={`transition-all duration-1000 ${active ? 'animate-floral-float' : 'opacity-0'}`}>
          <path d="M10,80 Q10,25 25,25 Q80,10 80,10 L80,15 Q30,30 25,80 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" />
          <path d="M30,30 Q45,15 65,25 Q55,45 35,45 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.2s' }} />
          <path d="M15,45 Q5,30 20,15 Q35,25 25,40 Z" fill="url(#gold-gradient)" className="floral-corner-path animate-floral-draw" style={{ animationDelay: '0.4s' }} />
        </g>

        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#ffcc66" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
      {/* Animated Shimmer Sweep */}
      <div className="gold-shimmer-sweep-overlay" />
    </div>
  );
};

/* ═══════════════════════════════════════
   JHAROKHA SVG FRAME (Arch + Jali)
   ═══════════════════════════════════════ */
const JharokhaSVG: React.FC<{ active: boolean; size?: 'large' | 'small' }> = ({ active, size = 'large' }) => {
  const isSmall = size === 'small';
  return (
    <svg
      className={`absolute pointer-events-none z-30 ${active ? 'jharokha-draw' : ''} ${isSmall ? 'animate-frame-pulse' : ''}`}
      style={{
        inset: '-12px',
        width: 'calc(100% + 24px)',
        height: 'calc(100% + 24px)',
      }}
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer arch */}
      <path
        d="M10,160 L10,65 Q10,10 60,10 Q110,10 110,65 L110,160"
        stroke="hsl(var(--primary))"
        strokeWidth="1.8"
        opacity="0.8"
        strokeLinecap="round"
        className="jharokha-path"
      />
      {/* Inner arch */}
      <path
        d="M18,160 L18,68 Q18,20 60,20 Q102,20 102,68 L102,160"
        stroke="hsl(var(--primary))"
        strokeWidth="1.0"
        opacity="0.4"
        className="jharokha-path"
      />
      {/* Jali cross-lattice */}
      <path d="M25,110 Q60,95 95,110" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" className="jharokha-path" />
      <path d="M25,125 Q60,112 95,125" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      <path d="M25,140 Q60,128 95,140" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" className="jharokha-path" />
      {/* Vertical lattice */}
      <path d="M40,105 L40,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" />
      <path d="M60,100 L60,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      <path d="M80,105 L80,160" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.12" className="jharokha-path" />
      {/* Mini arches inside jali */}
      <path d="M40,135 Q50,125 60,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      <path d="M60,135 Q70,125 80,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.15" className="jharokha-path" />
      {/* Keystone ornament */}
      <g transform="translate(55, 4)">
        <path d="M5 0L7 4L11 5L7 6L5 11L3 6L-1 5L3 4Z" fill="hsl(var(--primary))" opacity="0.8" />
      </g>
      {/* Side ornaments on arch */}
      <circle cx="15" cy="90" r="2.5" fill="hsl(var(--primary))" opacity="0.5" />
      <circle cx="105" cy="90" r="2.5" fill="hsl(var(--primary))" opacity="0.5" />
    </svg>
  );
};

/* ═══════════════════════════════════════
   MAIN FAMILY CARD (with 3D cursor tilt)
   ═══════════════════════════════════════ */
const FamilyCard: React.FC<{
  data: FamilySide;
  active: boolean;
  index: number;
  onOpenModal: () => void;
}> = ({ data, active, index, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: '50%', y: '50%' });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    setTilt({ x: rotateX, y: rotateY });
    setSpotlightPos({ x: `${x}px`, y: `${y}px` });
  }, []);

  return (
    <div
      className="relative z-10 w-full sm:max-w-md mx-auto cursor-default family-card-enter"
      style={{
        animationDelay: active ? `${0.3 + index * 0.25}s` : '0s',
        animationPlayState: active ? 'running' : 'paused',
        perspective: '1200px',
      }}
    >
      <div
        ref={cardRef}
        className="relative royal-card-wrapper border border-primary/20 rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col items-center group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{
          background: 'hsl(var(--background) / 0.85)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-12px' : '0px'})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── Floral Frame Wrapper (Gallery Design) ── */}
        <div className="absolute inset-0 z-0">
          <FloralOrnateFrame active={active}>
            {/* ── Bubbles Background ── */}
            <BubblesBackground />
            
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] z-0" />
            <div className="jaali-overlay opacity-[0.05] z-0" />
          </FloralOrnateFrame>
        </div>

        {/* Jharokha Photo Frame */}
        <div className="relative w-36 md:w-44 aspect-[3/4] mb-6 z-10 transition-transform duration-700 group-hover:scale-105">
          <div
            className="w-full h-full rounded-t-full rounded-b-lg border-2 border-primary/40 overflow-hidden shadow-2xl"
          >
            <img 
              src={data.mainImage} 
              alt={data.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
          </div>
          <JharokhaSVG active={active} />
        </div>

        {/* Subtitle */}
        <p className="font-display text-primary tracking-[0.25em] uppercase text-[10px] md:text-xs mb-1.5 opacity-80 z-10">
          {data.title}
        </p>
        <p className="font-hindi text-[13px] text-muted mb-4 z-10 tracking-widest" lang="hi">{data.hindiTitle}</p>

        {/* Parents' Names */}
        <h3 className="font-heading text-xl sm:text-2xl lg:text-[22px] xl:text-2xl text-foreground mb-6 text-center leading-tight z-10 gold-shimmer-slow px-2 whitespace-nowrap">
          {data.parents}
        </h3>

        {/* Luxury Button */}
        <button
          onClick={onOpenModal}
          className="fam-btn-luxury group/btn z-10"
        >
          <span className="fam-btn-diamond top-0 left-0" />
          <span className="fam-btn-diamond top-0 right-0" />
          <span className="fam-btn-diamond bottom-0 left-0" />
          <span className="fam-btn-diamond bottom-0 right-0" />
          <Eye size={14} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
          <span className="relative font-semibold">View Family Details</span>
          <span className="fam-btn-shimmer" />
        </button>

      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MEMBER CARD (for modal grid)
   ═══════════════════════════════════════ */
const MemberCard: React.FC<{
  member: FamilyMember;
  index: number;
}> = ({ member, index }) => (
  <div
    className="group relative rounded-xl overflow-hidden fam-member-card p-4 md:p-5 flex flex-col items-center text-center cursor-default h-full family-member-card"
    style={{
      animationDelay: `${index * 0.1}s`,
      background: 'hsl(var(--background) / 0.75)',
      border: '1px solid hsl(var(--primary) / 0.15)',
    }}
  >
    {/* Jaali texture */}
    <JaaliPattern className="opacity-20 rounded-xl" />

    {/* Mini Jharokha Photo */}
    <div className="relative w-32 h-44 sm:w-28 sm:h-36 md:w-32 md:h-40 mt-2 shrink-0 mb-4 z-10">
      <div
        className="w-full h-full rounded-t-full rounded-b-lg border-2 border-primary/30 overflow-hidden shadow-lg transition-all duration-700 group-hover:border-primary/60 group-hover:shadow-primary/20"
      >
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115" 
        />
      </div>
      <JharokhaSVG active={true} size="small" />
      <OrnateBorder active={true} size="small" />
    </div>

    {/* Name */}
    <p className="font-heading text-base md:text-lg text-primary mb-1.5 leading-snug line-clamp-2 transition-all z-10 font-bold"
      style={{ textShadow: '0 2px 10px hsl(var(--background) / 0.8)' }}
    >
      {member.name}
    </p>

    {/* Hover divider */}
    <div className="w-10 h-0.5 mx-auto mb-2 group-hover:w-20 transition-all duration-500 z-10"
      style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)' }}
    />

    {/* Relation */}
    <p className="text-[10px] md:text-[11px] text-foreground/70 font-display uppercase tracking-[0.2em] line-clamp-1 z-10 font-medium">
      {member.relation}
    </p>
  </div>
);

/* ═══════════════════════════════════════
   FAMILY DETAILS MODAL (Luxury)
   ═══════════════════════════════════════ */
const FamilyModal: React.FC<{
  data: FamilySide;
  onClose: () => void;
}> = ({ data, onClose }) => {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-6" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 family-modal-backdrop" style={{
        background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, hsl(var(--background) / 0.9) 70%, hsl(var(--background) / 0.98) 100%)',
        backdropFilter: 'blur(16px)',
      }} />

      {/* Modal container */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col family-modal-enter fam-modal-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal jaali overlay */}
        <JaaliPattern className="opacity-15 z-0" />

        {/* Gold border glow */}
        <div className="absolute inset-0 rounded-3xl fam-modal-border pointer-events-none z-20" />

        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-5 border-b border-primary/20 shadow-lg"
          style={{ background: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h3 className="font-heading text-xl md:text-2xl gold-shimmer-slow leading-tight font-bold tracking-wide">{data.title}</h3>
            <p className="font-hindi text-sm text-muted mt-1 opacity-80" lang="hi">{data.hindiTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/30 transition-all duration-500 hover:border-primary hover:scale-110 hover:rotate-180 hover:bg-primary/10 group"
            aria-label="Close"
          >
            <X size={18} className="text-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Members Grid */}
        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar relative z-10 scroll-smooth">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div className="h-px w-full relative z-10" style={{
          background: 'linear-gradient(90deg, transparent 10%, hsl(var(--primary) / 0.5) 50%, transparent 90%)',
        }} />

        {/* Bottom corner ornaments */}
        <div className="absolute bottom-4 left-6 w-8 h-8 pointer-events-none z-20 opacity-30" aria-hidden="true" style={{ transform: 'scaleY(-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
            <path d="M0,0 L12,0 Q6,6 0,12 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-6 w-8 h-8 pointer-events-none z-20 opacity-30" aria-hidden="true" style={{ transform: 'scale(-1,-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary">
            <path d="M0,0 L12,0 Q6,6 0,12 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN FAMILY SECTION
   ═══════════════════════════════════════ */
interface FamilySectionProps {
  active: boolean;
}

const FamilySection: React.FC<FamilySectionProps> = ({ active }) => {
  const [modalSide, setModalSide] = useState<'groom' | 'bride' | null>(null);
  const openModal = useCallback((side: 'groom' | 'bride') => setModalSide(side), []);
  const closeModal = useCallback(() => setModalSide(null), []);

  const modalData = modalSide ? familyData.find(f => f.side === modalSide) : null;

  return (
    <div className="mb-20 px-4">
      {/* Section Heading */}
      <div className="text-center mb-12 relative" style={{ animation: active ? 'fade-slide-up 0.8s ease-out' : 'none' }}>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="p-2 rounded-full border border-primary/20 backdrop-blur-md">
            <DiyaIcon lit={active} className="diya-flame-luxury scale-125" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl gold-shimmer-slow leading-tight tracking-tight px-4 font-bold">
            Our Families
          </h2>
          <div className="p-2 rounded-full border border-primary/20 backdrop-blur-md">
            <DiyaIcon lit={active} className="diya-flame-luxury scale-125" />
          </div>
        </div>
        <p className="font-hindi text-base md:text-lg text-muted/80 mt-2 tracking-widest font-medium" lang="hi">हमारे परिवार</p>
        <div className="mt-6 flex justify-center">
            <GoldDivider />
        </div>
      </div>

      {/* Family Cards */}
      <div className="flex flex-col lg:flex-row gap-10 md:gap-16 justify-center items-stretch max-w-7xl mx-auto mb-16 px-4">
        {familyData.map((family, i) => (
          <FamilyCard
            key={family.side}
            data={family}
            active={active}
            index={i}
            onOpenModal={() => openModal(family.side)}
          />
        ))}
      </div>

      {/* Decorative separator */}
      <div className="flex items-center justify-center gap-8 mt-12 opacity-60" aria-hidden="true">
        <div className="h-px flex-1 max-w-[150px]" style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4))',
        }} />
        <svg width="32" height="32" viewBox="0 0 24 24" className="text-primary animate-pulse">
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse key={angle} cx="12" cy="4" rx="2" ry="4.5" fill="currentColor" opacity="0.3"
              transform={`rotate(${angle} 12 12)`} />
          ))}
        </svg>
        <div className="h-px flex-1 max-w-[150px]" style={{
          background: 'linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)',
        }} />
      </div>

      {/* Modal */}
      {modalData && <FamilyModal data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default FamilySection;
