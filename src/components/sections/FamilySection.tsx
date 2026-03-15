import React, { useState, useCallback, useRef } from 'react';
import { Eye, X } from 'lucide-react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

/* ═══════════════════════════════════════
   FAMILY DATA
   ═══════════════════════════════════════ */
interface FamilyMember {
  name: string;
  relation: string;
  color: string;
}

interface FamilySide {
  side: 'groom' | 'bride';
  title: string;
  hindiTitle: string;
  parents: string;
  color: string;
  members: FamilyMember[];
}

const familyData: FamilySide[] = [
  {
    side: 'groom',
    title: "The Groom's Family",
    hindiTitle: 'वर पक्ष',
    parents: 'Shri Rajendra & Smt. Sunita',
    color: 'hsl(38 30% 22%)',
    members: [
      { name: 'Shri Rajendra Ji', relation: 'Father', color: 'hsl(38 30% 20%)' },
      { name: 'Smt. Sunita Ji', relation: 'Mother', color: 'hsl(25 28% 22%)' },
      { name: 'Rahul Sharma', relation: 'Brother', color: 'hsl(218 35% 18%)' },
      { name: 'Priya Sharma', relation: 'Sister', color: 'hsl(38 25% 19%)' },
      { name: 'Shri Ramesh Ji', relation: 'Grandfather', color: 'hsl(218 40% 16%)' },
      { name: 'Smt. Kamla Devi', relation: 'Grandmother', color: 'hsl(25 30% 20%)' },
      { name: 'Shri Suresh Ji', relation: 'Uncle', color: 'hsl(38 28% 21%)' },
      { name: 'Smt. Meena Ji', relation: 'Aunt', color: 'hsl(218 32% 17%)' },
    ],
  },
  {
    side: 'bride',
    title: "The Bride's Family",
    hindiTitle: 'वधू पक्ष',
    parents: 'Shri Mahendra & Smt. Kavita',
    color: 'hsl(218 40% 18%)',
    members: [
      { name: 'Shri Mahendra Ji', relation: 'Father', color: 'hsl(218 38% 18%)' },
      { name: 'Smt. Kavita Ji', relation: 'Mother', color: 'hsl(38 28% 21%)' },
      { name: 'Ankur Verma', relation: 'Brother', color: 'hsl(25 30% 20%)' },
      { name: 'Neha Verma', relation: 'Sister', color: 'hsl(218 35% 16%)' },
      { name: 'Shri Devendra Ji', relation: 'Grandfather', color: 'hsl(38 25% 19%)' },
      { name: 'Smt. Shanti Devi', relation: 'Grandmother', color: 'hsl(25 28% 22%)' },
      { name: 'Shri Narendra Ji', relation: 'Uncle', color: 'hsl(218 40% 17%)' },
      { name: 'Smt. Asha Ji', relation: 'Aunt', color: 'hsl(38 30% 20%)' },
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
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
        className="jharokha-path"
      />
      {/* Inner arch */}
      <path
        d="M18,160 L18,68 Q18,20 60,20 Q102,20 102,68 L102,160"
        stroke="hsl(var(--primary))"
        strokeWidth="0.8"
        opacity="0.3"
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
        <path d="M5 0L7 4L11 5L7 6L5 11L3 6L-1 5L3 4Z" fill="hsl(var(--primary))" opacity="0.5" />
      </g>
      {/* Side ornaments on arch */}
      <circle cx="15" cy="90" r="2" fill="hsl(var(--primary))" opacity="0.15" />
      <circle cx="105" cy="90" r="2" fill="hsl(var(--primary))" opacity="0.15" />
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
    const rotateX = -(y - centerY) / 14;
    const rotateY = (x - centerX) / 14;
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
        className="relative royal-card-wrapper border border-primary/20 rounded-2xl p-5 md:p-7 backdrop-blur-md flex flex-col items-center transition-colors duration-500"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{
          background: 'hsl(var(--background) / 0.92)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-8px' : '0px'}) scale(${isHovered ? 1.02 : 1})`,
          transition: !isHovered
            ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out'
            : 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
          boxShadow: isHovered
            ? '0 25px 50px hsl(var(--background) / 0.7), 0 0 30px hsl(var(--primary) / 0.12)'
            : '0 8px 25px hsl(var(--background) / 0.5)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Jaali pattern overlay */}
        <JaaliPattern className="opacity-40 rounded-2xl overflow-hidden" />

        {/* Border spotlight on hover */}
        <div
          className="fam-border-spotlight"
          style={{ '--mx': spotlightPos.x, '--my': spotlightPos.y } as React.CSSProperties}
        />

        {/* Top corner ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-25">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
            <path d="M0,0 Q12,0 12,12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
        <div className="absolute top-3 right-3 w-6 h-6 pointer-events-none" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-25">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
            <path d="M0,0 Q12,0 12,12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        {/* Jharokha Photo Frame */}
        <div className="relative w-32 md:w-40 aspect-[3/4] mb-5 z-10">
          <div
            className="w-full h-full rounded-t-full rounded-b-md border-2 border-primary/40 overflow-hidden"
            style={{ background: data.color }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" className="opacity-30">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </div>
          <JharokhaSVG active={active} />
        </div>

        {/* Subtitle */}
        <p className="font-display text-primary tracking-[0.2em] uppercase text-[10px] md:text-xs mb-1 opacity-70 z-10">
          {data.title}
        </p>
        <p className="font-hindi text-[11px] text-muted mb-3 z-10" lang="hi">{data.hindiTitle}</p>

        {/* Parents' Names */}
        <h3 className="font-heading text-xl md:text-2xl text-foreground mb-5 text-center leading-snug z-10 gold-shimmer-slow">
          {data.parents}
        </h3>

        {/* Luxury Button */}
        <button
          onClick={onOpenModal}
          className="fam-btn-luxury group/btn z-10"
        >
          {/* Corner diamonds */}
          <span className="fam-btn-diamond top-0 left-0" />
          <span className="fam-btn-diamond top-0 right-0" />
          <span className="fam-btn-diamond bottom-0 left-0" />
          <span className="fam-btn-diamond bottom-0 right-0" />
          <Eye size={13} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
          <span className="relative">View Family Details</span>
          {/* Shimmer sweep */}
          <span className="fam-btn-shimmer" />
        </button>

        {/* Bottom corner ornaments */}
        <div className="absolute bottom-3 left-3 w-6 h-6 pointer-events-none" aria-hidden="true" style={{ transform: 'scaleY(-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-25">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none" aria-hidden="true" style={{ transform: 'scale(-1, -1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-25">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
          </svg>
        </div>
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
    className="group relative rounded-xl overflow-hidden fam-member-card p-3 md:p-4 flex flex-col items-center text-center cursor-default h-full family-member-card"
    style={{
      animationDelay: `${index * 0.08}s`,
      background: 'hsl(var(--background) / 0.6)',
    }}
  >
    {/* Jaali texture */}
    <JaaliPattern className="opacity-20 rounded-xl" />

    {/* Mini Jharokha Photo */}
    <div className="relative w-20 h-24 md:w-24 md:h-28 mt-2 shrink-0 mb-3 z-10">
      <div
        className="w-full h-full rounded-t-full rounded-b-md border border-primary/30 overflow-hidden transition-transform duration-700 group-hover:scale-110"
        style={{ background: member.color }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" className="opacity-25">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
      <JharokhaSVG active={true} size="small" />
    </div>

    {/* Name */}
    <p className="font-heading text-sm md:text-base text-primary mb-1 leading-tight line-clamp-2 transition-all z-10"
      style={{ textShadow: '0 1px 6px hsl(var(--background) / 0.6)' }}
    >
      {member.name}
    </p>

    {/* Hover divider */}
    <div className="w-8 h-px mx-auto mb-1.5 group-hover:w-14 transition-all duration-500 z-10"
      style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)' }}
    />

    {/* Relation */}
    <p className="text-[9px] md:text-[10px] text-foreground/60 font-display uppercase tracking-[0.15em] line-clamp-1 z-10">
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 md:p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 family-modal-backdrop" style={{
        background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.04) 0%, hsl(var(--background) / 0.88) 50%, hsl(var(--background) / 0.95) 100%)',
        backdropFilter: 'blur(12px)',
      }} />

      {/* Modal container */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl flex flex-col family-modal-enter fam-modal-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal jaali overlay */}
        <JaaliPattern className="opacity-15 z-0" />

        {/* Gold border glow */}
        <div className="absolute inset-0 rounded-2xl fam-modal-border pointer-events-none z-20" />

        {/* Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 border-b border-primary/15"
          style={{ background: 'hsl(var(--background) / 0.92)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h3 className="font-heading text-lg md:text-xl gold-shimmer-slow leading-tight">{data.title}</h3>
            <p className="font-hindi text-xs text-muted mt-0.5" lang="hi">{data.hindiTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-primary/25 transition-all duration-300 hover:border-primary/60 hover:scale-110 hover:rotate-90"
            style={{ background: 'hsl(var(--card) / 0.8)' }}
            aria-label="Close"
          >
            <X size={15} className="text-foreground" />
          </button>
        </div>

        {/* Members Grid */}
        <div className="overflow-y-auto p-4 md:p-6 custom-scrollbar relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {data.members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div className="h-px w-full relative z-10" style={{
          background: 'linear-gradient(90deg, transparent 10%, hsl(var(--primary) / 0.4) 50%, transparent 90%)',
        }} />

        {/* Bottom corner ornaments */}
        <div className="absolute bottom-2 left-3 w-5 h-5 pointer-events-none z-20" aria-hidden="true" style={{ transform: 'scaleY(-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-20">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-2 right-3 w-5 h-5 pointer-events-none z-20" aria-hidden="true" style={{ transform: 'scale(-1,-1)' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary opacity-20">
            <path d="M0,0 L8,0 Q4,4 0,8 Z" fill="currentColor" />
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
    <div className="mb-12">
      {/* Section Heading */}
      <div className="text-center mb-8" style={{ animation: active ? 'fade-slide-up 0.5s ease-out' : 'none' }}>
        <div className="flex items-center justify-center gap-3 mb-1">
          <DiyaIcon lit={active} />
          <h2 className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
            Our Families
          </h2>
        </div>
        <p className="font-hindi text-sm text-muted mt-1" lang="hi">हमारे परिवार</p>
        <GoldDivider />
      </div>

      {/* Family Cards */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch mb-8">
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
      <div className="flex items-center justify-center gap-4 mt-4" aria-hidden="true">
        <div className="h-px flex-1 max-w-[100px]" style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2))',
        }} />
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-primary opacity-40">
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse key={angle} cx="12" cy="5" rx="2" ry="3.5" fill="currentColor" opacity="0.25"
              transform={`rotate(${angle} 12 12)`} />
          ))}
        </svg>
        <div className="h-px flex-1 max-w-[100px]" style={{
          background: 'linear-gradient(90deg, hsl(var(--primary) / 0.2), transparent)',
        }} />
      </div>

      {/* Modal */}
      {modalData && <FamilyModal data={modalData} onClose={closeModal} />}
    </div>
  );
};

export default FamilySection;
