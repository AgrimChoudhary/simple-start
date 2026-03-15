import React, { useState, useCallback } from 'react';
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
      {/* Jali lattice at bottom */}
      <path d="M25,120 L95,120" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.2" className="jharokha-path" />
      <path d="M25,135 L95,135" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      <path d="M40,120 L40,160" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      <path d="M60,120 L60,160" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      <path d="M80,120 L80,160" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" className="jharokha-path" />
      {/* Keystone ornament */}
      <g transform="translate(55, 6)">
        <path d="M5 0L6.5 4L10 5L6.5 6L5 10L3.5 6L0 5L3.5 4Z" fill="hsl(var(--primary))" opacity="0.5" />
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════
   MAIN FAMILY CARD
   ═══════════════════════════════════════ */
const FamilyCard: React.FC<{
  data: FamilySide;
  active: boolean;
  index: number;
  onOpenModal: () => void;
}> = ({ data, active, index, onOpenModal }) => (
  <div
    className="relative z-10 w-full sm:max-w-md mx-auto group cursor-default family-card-enter"
    style={{ animationDelay: active ? `${0.3 + index * 0.25}s` : '0s', animationPlayState: active ? 'running' : 'paused' }}
  >
    <div className="relative royal-card-wrapper border border-primary/20 rounded-2xl p-4 md:p-6 backdrop-blur-md flex flex-col items-center transition-all duration-500 group-hover:border-primary/40"
      style={{
        background: 'hsl(var(--background) / 0.95)',
        boxShadow: '0 4px 20px hsl(var(--background) / 0.6)',
      }}
    >
      {/* Jharokha Photo Frame */}
      <div className="relative w-32 md:w-40 aspect-[3/4] mb-5">
        <div
          className="w-full h-full rounded-t-full rounded-b-md border-2 border-primary/40 overflow-hidden"
          style={{ background: data.color }}
        >
          {/* Camera placeholder */}
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
      <p className="font-display text-primary tracking-[0.2em] uppercase text-[10px] md:text-xs mb-1 opacity-70">
        {data.title}
      </p>
      <p className="font-hindi text-[11px] text-muted mb-3" lang="hi">{data.hindiTitle}</p>

      {/* Parents' Names */}
      <h3 className="font-hindi text-xl md:text-2xl text-foreground mb-5 text-center leading-snug"
        style={{ textShadow: '0 2px 8px hsl(var(--background) / 0.5)' }}
      >
        {data.parents}
      </h3>

      {/* Button */}
      <button
        onClick={onOpenModal}
        className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-2 md:py-2.5 rounded-full btn-royal transition-all duration-300 font-display tracking-widest uppercase text-[9px] md:text-[10px] font-bold group/btn"
      >
        <Eye size={14} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
        View Family Details
      </button>
    </div>
  </div>
);

/* ═══════════════════════════════════════
   MEMBER CARD (for modal grid)
   ═══════════════════════════════════════ */
const MemberCard: React.FC<{
  member: FamilyMember;
  index: number;
}> = ({ member, index }) => (
  <div
    className="group relative rounded-xl overflow-hidden border border-primary/20 backdrop-blur-md p-3 md:p-4 flex flex-col items-center text-center cursor-default h-full transition-all duration-300 hover:border-primary/50 family-member-card"
    style={{
      background: 'hsl(var(--background) / 0.6)',
      animationDelay: `${index * 0.08}s`,
      boxShadow: '0 2px 10px hsl(var(--background) / 0.4)',
    }}
  >
    {/* Mini Jharokha Photo */}
    <div className="relative w-20 h-24 md:w-24 md:h-28 mt-2 shrink-0 mb-3">
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
    <p className="font-hindi text-sm md:text-base text-primary mb-1 leading-tight line-clamp-2 group-hover:brightness-125 transition-all"
      style={{ textShadow: '0 1px 4px hsl(var(--background) / 0.5)' }}
    >
      {member.name}
    </p>

    {/* Hover divider */}
    <div className="w-8 h-px bg-primary/40 mx-auto mb-1.5 group-hover:w-12 transition-all duration-300" />

    {/* Relation */}
    <p className="text-[9px] md:text-[10px] text-foreground/70 font-display uppercase tracking-widest line-clamp-1">
      {member.relation}
    </p>
  </div>
);

/* ═══════════════════════════════════════
   FAMILY DETAILS MODAL
   ═══════════════════════════════════════ */
const FamilyModal: React.FC<{
  data: FamilySide;
  onClose: () => void;
}> = ({ data, onClose }) => {
  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md family-modal-backdrop" />

      {/* Modal container */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-primary/30 flex flex-col family-modal-enter"
        style={{
          background: 'hsl(var(--background) / 0.95)',
          boxShadow: '0 0 40px hsl(var(--background) / 0.5), 0 0 80px hsl(var(--primary) / 0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-primary/15"
          style={{ background: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(8px)' }}
        >
          <div>
            <h3 className="font-heading text-lg md:text-xl text-primary">{data.title}</h3>
            <p className="font-hindi text-xs text-muted" lang="hi">{data.hindiTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-primary/20 transition-all duration-300 hover:border-primary/50 hover:scale-110"
            style={{ background: 'hsl(var(--card) / 0.8)' }}
            aria-label="Close"
          >
            <X size={16} className="text-foreground" />
          </button>
        </div>

        {/* Members Grid */}
        <div className="overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
            {data.members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom gold accent */}
        <div className="h-px w-full" style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
        }} />
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

      {/* Decorative separator before gallery */}
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
