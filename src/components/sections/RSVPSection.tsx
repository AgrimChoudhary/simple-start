import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';

interface RSVPSectionProps {
  active: boolean;
  guestName: string;
}

/* ═══ Rangoli Mandala — Animated SVG ═══ */
const RangoliMandala: React.FC<{ size?: number; className?: string }> = ({ size = 200, className = '' }) => {
  const petals = 12;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={`${className}`} aria-hidden="true">
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.1" strokeDasharray="4 6" />
      {/* Petal mandala */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (360 / petals) * i;
        return (
          <g key={i} transform={`rotate(${angle} 100 100)`}>
            <ellipse cx="100" cy="55" rx="8" ry="22" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.12" />
            <ellipse cx="100" cy="62" rx="4" ry="12" fill="hsl(var(--primary))" opacity="0.04" />
            <circle cx="100" cy="38" r="2" fill="hsl(var(--primary))" opacity="0.1" />
          </g>
        );
      })}
      {/* Inner circles */}
      <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.12" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.08" strokeDasharray="2 3" />
      {/* Center dot cluster */}
      <circle cx="100" cy="100" r="6" fill="hsl(var(--primary))" opacity="0.06" />
      <circle cx="100" cy="100" r="2" fill="hsl(var(--primary))" opacity="0.15" />
    </svg>
  );
};

/* ═══ Ornate Envelope Seal ═══ */
const EnvelopeSeal: React.FC<{ opening: boolean }> = ({ opening }) => (
  <div className="rsvp-envelope-container" aria-hidden="true">
    {/* Ambient glow */}
    <div className="absolute inset-0 rounded-full" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 65%)',
      transform: 'scale(2.5)',
      animation: 'rsvp-seal-breathe 3s ease-in-out infinite',
    }} />
    {/* Seal body */}
    <div className={`rsvp-envelope-seal ${opening ? 'rsvp-envelope-seal--opening' : ''}`}>
      {/* Spinning mandala ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" style={{
        animation: 'spin 50s linear infinite',
      }}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25" strokeDasharray="4 5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 7" />
        {/* 8 small dots around */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 8;
          return <circle key={i} cx={60 + Math.cos(a) * 42} cy={60 + Math.sin(a) * 42} r="1.5" fill="hsl(var(--primary))" opacity="0.2" />;
        })}
      </svg>
      {/* Center emoji */}
      <span className="relative z-10 text-5xl" style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--primary) / 0.3))' }}>
        💌
      </span>
    </div>
  </div>
);

/* ═══ Ornate Border Frame ═══ */
const OrnateFrame: React.FC = () => (
  <div className="absolute inset-3 md:inset-5 pointer-events-none z-[2]" aria-hidden="true">
    {/* Top border */}
    <div className="absolute top-0 left-8 right-8 h-px" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25) 20%, hsl(var(--primary) / 0.4) 50%, hsl(var(--primary) / 0.25) 80%, transparent)',
    }} />
    {/* Bottom border */}
    <div className="absolute bottom-0 left-8 right-8 h-px" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Left border */}
    <div className="absolute left-0 top-8 bottom-8 w-px" style={{
      background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Right border */}
    <div className="absolute right-0 top-8 bottom-8 w-px" style={{
      background: 'linear-gradient(180deg, transparent, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.3) 50%, hsl(var(--primary) / 0.2) 80%, transparent)',
    }} />
    {/* Corner flourishes */}
    {[
      { pos: 'top-0 left-0', rot: '0' },
      { pos: 'top-0 right-0', rot: '90' },
      { pos: 'bottom-0 right-0', rot: '180' },
      { pos: 'bottom-0 left-0', rot: '270' },
    ].map(({ pos, rot }) => (
      <div key={pos} className={`absolute ${pos} w-16 h-16`}>
        <svg viewBox="0 0 64 64" className="w-full h-full" style={{ transform: `rotate(${rot}deg)` }}>
          <path d="M4,4 C4,28 8,40 28,56" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.25" />
          <path d="M4,4 C8,20 14,32 24,44" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15" />
          <circle cx="6" cy="6" r="3" fill="hsl(var(--primary))" opacity="0.2" />
          <circle cx="4" cy="16" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
          <circle cx="16" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.12" />
          {/* Tiny leaf */}
          <ellipse cx="20" cy="36" rx="3" ry="6" fill="hsl(var(--primary))" opacity="0.08" transform="rotate(-30 20 36)" />
        </svg>
      </div>
    ))}
  </div>
);

/* ═══ Floating Gold Dust (section-specific) ═══ */
const GoldDust: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: `${1.5 + Math.random() * 2}px`,
    delay: `${Math.random() * 6}s`,
    duration: `${3 + Math.random() * 4}s`,
    opacity: 0.1 + Math.random() * 0.15,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: 'hsl(var(--primary))',
            opacity: p.opacity,
            animation: `rsvp-dust-float ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   CONTACT DATA & OVERLAY
   ═══════════════════════════════════════════════════════ */

interface FamilyMember {
  name: string;
  relation: string;
  phone: string;
  whatsapp: string;
  icon: string;
}

interface ContactGroup {
  id: string;
  primary: FamilyMember;
  others: FamilyMember[];
}

const FAMILY_CONTACTS: ContactGroup[] = [
  {
    id: 'groom-side',
    primary: {
      name: "Rajesh Sharma",
      relation: "Father of the Groom",
      phone: "+919999999999",
      whatsapp: "919999999999",
      icon: "🤵",
    },
    others: [
      { name: "Sunita Sharma", relation: "Mother of the Groom", phone: "+918888888888", whatsapp: "918888888888", icon: "👵" },
      { name: "Amit Sharma", relation: "Brother of the Groom", phone: "+917777777777", whatsapp: "917777777777", icon: "👦" },
      { name: "Vinay Sharma", relation: "Uncle", phone: "+916666666666", whatsapp: "916666666666", icon: "👨" },
    ]
  },
  {
    id: 'bride-side',
    primary: {
      name: "Suresh Agarwal",
      relation: "Father of the Bride",
      phone: "+919999999998",
      whatsapp: "919999999998",
      icon: "👰",
    },
    others: [
      { name: "Meena Agarwal", relation: "Mother of the Bride", phone: "+918888888887", whatsapp: "918888888887", icon: "👩" },
      { name: "Neha Agarwal", relation: "Sister of the Bride", phone: "+917777777776", whatsapp: "917777777776", icon: "👧" },
      { name: "Prakash Agarwal", relation: "Uncle", phone: "+916666666665", whatsapp: "916666666665", icon: "👨" },
    ]
  }
];

const FamilyContactsOverlay: React.FC<{
  group: ContactGroup;
  onClose: () => void;
}> = ({ group, onClose }) => (
  <div
    className="contact-overlay-backdrop"
    style={{ animation: 'fade-in 0.3s ease-out both' }}
    onClick={onClose}
  >
    <div
      className="contact-overlay-modal"
      style={{ animation: 'overlay-modal-in 0.4s cubic-bezier(0.22,0.61,0.36,1) both' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Decorative center icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/5 border border-primary/20">
          <span className="text-3xl">{group.primary.icon}</span>
        </div>
      </div>

      <h3 className="font-heading text-3xl gold-shimmer-slow mb-1">{group.primary.name}</h3>
      <p className="font-ui text-xs tracking-widest uppercase text-muted-foreground mb-8">{group.primary.relation}</p>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto px-2 custom-scrollbar">
        {/* Primary Contacts list */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-hindi text-lg leading-none">{group.primary.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{group.primary.relation}</p>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${group.primary.phone}`} className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:scale-110 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            </a>
            <a href={`https://wa.me/${group.primary.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366] text-white hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20"></div>
          <span className="font-ui text-[10px] tracking-widest text-muted-foreground uppercase">Family Members</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20"></div>
        </div>

        {group.others.map((member, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-primary/10">
            <div className="flex items-center gap-3">
              <span className="text-xl">{member.icon}</span>
              <div className="text-left">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-[10px] text-muted-foreground opacity-70">{member.relation}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${member.phone}`} className="p-2 text-primary hover:text-accent transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg></a>
              <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 text-primary hover:text-[#25D366] transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg></a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <GoldDivider />
      </div>
    </div>
  </div>
);

/* ═══ Contact Card — Premium ═══ */
const ContactCard: React.FC<{
  group: ContactGroup;
  delay: string;
  active: boolean;
  onClick: () => void;
}> = ({ group, delay, active, onClick }) => (
  <div
    className="family-contact-card group"
    style={{ animation: active ? `contact-card-reveal 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay} both` : 'none' }}
    onClick={onClick}
  >
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Icon with animated ring */}
      <div className="relative mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative" style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, hsl(var(--card) / 0.5) 70%)',
          border: '1px solid hsl(var(--primary) / 0.2)',
        }}>
          {/* Spinning decorative ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80" style={{ animation: 'spin 30s linear infinite' }}>
            <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.2" strokeDasharray="3 6" />
          </svg>
          <span className="text-3xl md:text-4xl relative z-10" style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--primary) / 0.25))' }}>{group.primary.icon}</span>
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full" style={{
          border: '1px solid hsl(var(--primary) / 0.1)',
          animation: 'contact-icon-pulse 3s ease-in-out infinite',
        }} />
      </div>

      {/* Ornamental mini divider */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4))' }} />
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d="M4 0L5.5 4L4 8L2.5 4Z" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>
        <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)' }} />
      </div>

      {/* Name & relation */}
      <h4 className="font-heading text-xl md:text-2xl gold-shimmer-slow mb-0.5">{group.primary.name}</h4>
      <p className="font-ui text-[10px] md:text-xs tracking-widest uppercase mb-4" style={{ color: 'hsl(var(--text-cream) / 0.45)' }}>{group.primary.relation}</p>

      {/* Click to view text */}
      <div className="flex items-center gap-1.5 text-primary/60 group-hover:text-primary transition-colors">
        <span className="font-ui text-[9px] uppercase tracking-widest">Connect with family</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
      </div>
    </div>
  </div>
);

/* ═══ Contact Section Heading ═══ */
const ContactHeading: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="w-full text-center mb-8" style={{ animation: active ? 'fade-slide-up 0.6s ease-out 0.7s both' : 'none' }}>
    {/* Top ornamental line */}
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px flex-1 max-w-[60px]" style={{
        background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4))',
      }} />
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{
        animation: active ? 'contact-diamond-spin 1s ease-out 1s both' : 'none',
      }}>
        <path d="M10 1L13 10L10 19L7 10Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5" />
        <path d="M10 4L12 10L10 16L8 10Z" fill="hsl(var(--primary))" opacity="0.15" />
      </svg>
      <div className="h-px flex-1 max-w-[60px]" style={{
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.4), transparent)',
      }} />
    </div>

    {/* Heading with Diyas */}
    <div className="flex items-center justify-center gap-3 mb-2">
      <DiyaIcon lit={active} />
      <h3 className="font-heading text-[22px] md:text-[32px] gold-shimmer-slow tracking-wide leading-none">
        Contacts
      </h3>
      <DiyaIcon lit={active} />
    </div>

    {/* Subtitle */}
    <p className="font-body text-xs md:text-sm mt-2" style={{ color: 'hsl(var(--text-cream) / 0.5)' }}>
      For any queries, feel free to reach out
    </p>

    {/* Gold divider */}
    <div className="mt-4">
      <GoldDivider />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   MAIN RSVP SECTION
   ═══════════════════════════════════════════════════════ */
const RSVPSection: React.FC<RSVPSectionProps> = ({ active, guestName }) => {
  const [accepted, setAccepted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonPulsing, setButtonPulsing] = useState(false);
  const [activeContactGroup, setActiveContactGroup] = useState<ContactGroup | null>(null);

  // Celebration sequence stage
  // 0: Initial
  // 1: Golden Aura Ignition (0ms)
  // 2: Palace Arches Reveal (100ms)
  // 3: 3D Rangoli Courtyard Bloom (200ms)
  // 4: Petal Vortex Transition (300ms)
  // 5: Floating Lanterns Rise Upward (400ms)
  // 6: Petal Shower Blessing (500ms)
  // 7: Firework Rangoli Sky Burst (600ms)
  // 8: Divine Light Beams (700ms)
  // 9: Shahi Shehnai Ambience Begins & Thank You Message Reveal (800ms)
  // 10: Hashtag Shimmer (1000ms)
  // 11: Diyas Glowing (1200ms)
  const [celebrationStage, setCelebrationStage] = useState(0);

  useEffect(() => {
    if (active) {
      const t1 = setTimeout(() => setButtonVisible(true), 800);
      const t2 = setTimeout(() => setButtonPulsing(true), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [active]);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    setCelebrationStage(1); // 1: Golden Aura

    // Sequence Timers (Ultra fast)
    setTimeout(() => setCelebrationStage(2), 100);  // 2: Arches
    setTimeout(() => setCelebrationStage(3), 200); // 3: Rangoli Bloom
    setTimeout(() => setCelebrationStage(4), 300); // 4: Petal Vortex
    setTimeout(() => setCelebrationStage(5), 400); // 5: Lanterns Rise
    setTimeout(() => setCelebrationStage(6), 500); // 6: Petal Rain
    setTimeout(() => setCelebrationStage(7), 600); // 7: Fireworks
    setTimeout(() => setCelebrationStage(8), 700); // 8: Divine Beams
    setTimeout(() => {
      setCelebrationStage(9); // 9: Message & Audio
      // Play Shahi Shehnai Ambience
      const audio = new Audio('/assets/shehnai-ambience.mp3');
      audio.volume = 0;
      audio.play().catch(e => console.log('Audio autoplay prevented:', e));

      // Fade in audio faster
      let vol = 0;
      const fadeAudio = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.1;
          audio.volume = vol;
        } else {
          clearInterval(fadeAudio);
        }
      }, 50);
    }, 800);
    setTimeout(() => setCelebrationStage(10), 1000); // 10: Hashtag
    setTimeout(() => setCelebrationStage(11), 1200); // 11: Diyas glowing
  }, [accepted]);

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      {/* ══════════ LAYERED BACKGROUND (matches Opening Section) ══════════ */}
      <div className="rsvp-bg-base" aria-hidden="true" />
      <div className="rsvp-bg-gradient" aria-hidden="true" />
      <div className="rsvp-texture-grain" aria-hidden="true" />
      <div className="rsvp-vignette" aria-hidden="true" />
      <div className="rsvp-glow-top" aria-hidden="true" />
      <div className="rsvp-glow-bottom" aria-hidden="true" />

      {/* Section-specific gold dust */}
      <GoldDust />

      {/* Ornate border frame */}
      <OrnateFrame />
      <SectionBorderFrame active={active} variant="royal" />

      {/* Background rangoli — top right */}
      <div className="absolute -top-10 -right-10 opacity-[0.04] pointer-events-none" aria-hidden="true"
        style={{ animation: 'spin 120s linear infinite' }}>
        <RangoliMandala size={300} />
      </div>
      {/* Background rangoli — bottom left */}
      <div className="absolute -bottom-16 -left-16 opacity-[0.03] pointer-events-none" aria-hidden="true"
        style={{ animation: 'spin 100s linear infinite reverse' }}>
        <RangoliMandala size={350} />
      </div>

      {/* ── Main Content — scrollable, vertically centered ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-5 md:px-6 flex flex-col items-center py-10 md:py-14">

        {!accepted ? (
          /* ═══════════ INVITATION VIEW ═══════════ */
          <div className="w-full text-center">

            {/* ── Header with Diyas ── */}
            <div style={{ animation: active ? 'fade-slide-up 0.6s ease-out' : 'none' }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <DiyaIcon lit={active} />
                <h2 id="rsvp-heading" className="font-heading text-[30px] md:text-[46px] gold-shimmer-slow leading-none tracking-wide">
                  You're Invited
                </h2>
                <DiyaIcon lit={active} />
              </div>
              <GoldDivider />
            </div>

            {/* ── Envelope Seal ── */}
            <div style={{ animation: active ? 'scale-fade-in 0.7s ease-out 0.35s both' : 'none' }}>
              <EnvelopeSeal opening={accepted} />
            </div>

            {/* ── Personal Invitation Letter ── */}
            <div className="rsvp-letter-card" style={{ animation: active ? 'fade-slide-up 0.6s ease-out 0.5s both' : 'none' }}>
              {/* Top gold accent */}
              <div className="absolute top-0 left-6 right-6 h-[2px]" style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 30%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 70%, transparent)',
              }} />

              <div className="relative p-6 md:p-8">
                <p className="font-body text-base md:text-lg leading-relaxed mb-3" style={{ color: 'hsl(var(--text-cream) / 0.85)' }}>
                  Dear{' '}
                  <span className="font-heading font-semibold text-primary text-lg md:text-xl inline-block"
                    style={{ animation: active ? 'rsvp-name-glow 3s ease-in-out infinite' : 'none' }}>
                    {guestName}
                  </span>,
                </p>

                <div className="my-4 mx-auto w-16 h-px" style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
                }} />

                <p className="font-body text-sm md:text-base leading-relaxed mb-1" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                  We would be truly honoured by your
                </p>
                <p className="font-body text-sm md:text-base leading-relaxed mb-5" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                  gracious presence at the wedding celebrations of
                </p>

                {/* Couple names */}
                <div className="my-5">
                  <p className="font-display text-xl md:text-[28px] text-primary tracking-[0.15em] leading-tight"
                    style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.7s both' : 'none' }}>
                    HARSHIT
                  </p>
                  <p className="font-heading text-primary/60 text-lg my-1">&</p>
                  <p className="font-display text-xl md:text-[28px] text-primary tracking-[0.15em] leading-tight"
                    style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.8s both' : 'none' }}>
                    ANSHIKHA
                  </p>
                </div>

                {/* Date & venue */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-8 h-px" style={{ background: 'hsl(var(--primary) / 0.3)' }} />
                  <p className="font-ui text-xs tracking-widest uppercase" style={{ color: 'hsl(var(--text-cream) / 0.5)' }}>
                    Save the Date
                  </p>
                  <div className="w-8 h-px" style={{ background: 'hsl(var(--primary) / 0.3)' }} />
                </div>
                <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream) / 0.65)' }}>
                  9th – 11th May 2026
                </p>
                <p className="font-body text-xs mt-1" style={{ color: 'hsl(var(--text-cream) / 0.45)' }}>
                  Bhilwara & Udaipur, Rajasthan
                </p>
              </div>

              {/* Bottom gold accent */}
              <div className="absolute bottom-0 left-8 right-8 h-px" style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)',
              }} />
            </div>

            {/* ── Hindi blessing ── */}
            <p className="font-hindi text-sm text-muted mt-6 mb-8" lang="hi"
              style={{ animation: active ? 'fade-in 0.5s ease-out 0.9s both' : 'none' }}>
              आपकी उपस्थिति हमारा सम्मान होगा
            </p>

            {/* ═══ THE ACCEPT BUTTON — Gold filled, heartbeat glow ═══ */}
            <div className="relative" style={{
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.93)',
              transition: 'all 0.7s cubic-bezier(0.22,0.61,0.36,1)',
            }}>
              {/* Heartbeat glow behind button */}
              {buttonPulsing && (
                <div className="absolute -inset-3 rounded-2xl" style={{
                  animation: 'rsvp-button-heartbeat 2.5s ease-in-out infinite',
                }} />
              )}
              <button onClick={handleAccept} className="rsvp-accept-btn group/accept">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="tracking-wide">Accept Invitation</span>
                  <span className="text-lg transition-all duration-500 group-hover/accept:scale-125 group-hover/accept:rotate-12">
                    💌
                  </span>
                </span>
                <div className="rsvp-accept-shimmer" />
              </button>
            </div>

            {/* Hashtag */}
            <p className="font-hashtag text-primary/40 text-sm mt-8"
              style={{ animation: active ? 'fade-in 0.5s ease-out 1.1s both' : 'none' }}>
              #HarAnshTera
            </p>
          </div>
        ) : (
          /* ═══════════ THANK YOU CELEBRATION VIEW (ROYAL PALACE MODE) ═══════════ */
          <div className="w-full h-full min-h-[600px] flex items-center justify-center relative overflow-hidden">

            {/* Stage 1: Golden Aura Ignition */}
            {celebrationStage >= 1 && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl flex items-center justify-center z-[2]"
                style={{
                  animation: celebrationStage === 1 ? 'royal-golden-ignition 0.4s ease-out forwards' : 'none',
                  opacity: celebrationStage > 1 ? 0 : 1
                }}
              >
                <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full" style={{
                  background: 'radial-gradient(circle, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary) / 0.4) 40%, transparent 70%)',
                }} />
              </div>
            )}

            {/* Stage 2: Palace Arches Background Reveal */}
            {celebrationStage >= 2 && (
              <div className="palace-arches-bg z-0" style={{ animation: 'royal-arches-reveal 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }} />
            )}

            {/* Stage 3: 3D Rangoli Courtyard Bloom */}
            {celebrationStage >= 3 && (
              <div className="royal-rangoli-container z-[1]" style={{ animation: 'royal-rangoli-bloom 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                <RangoliMandala size={600} className="drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]" />
              </div>
            )}

            {/* Stage 4: Petal Vortex Transition */}
            {celebrationStage >= 4 && (
              <div className="absolute inset-0 pointer-events-none z-[4] flex items-center justify-center">
                <div className="royal-petal-vortex">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const isRose = i % 2 === 0;
                    const path = isRose
                      ? 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5l4-3-4-3v6z'
                      : 'M12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 12 2 A10 10 0 0 1 22 12 A10 10 0 0 1 12 22 Z';
                    const color = isRose ? '%236B1A2A' : '%23D4A017'; // Dark Red : Old Gold
                    return (
                      <div
                        key={`vortex-${i}`}
                        className="absolute"
                        style={{
                          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" fill="${color}" opacity="0.9"/></svg>')`,
                          width: '24px',
                          height: '24px',
                          left: '-12px',
                          top: '-12px',
                          '--angle': `${i * 15}deg`,
                          '--radius': `${300 + Math.random() * 200}px`,
                          animation: `royal-vortex-spin 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stage 5: Floating Lanterns */}
            {celebrationStage >= 5 && (
              <div className="absolute inset-0 pointer-events-none z-[3]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`lantern-${i}`}
                    className="royal-floating-lantern"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      bottom: '-50px',
                      '--drift-x': `${(Math.random() - 0.5) * 100}px`,
                      animation: `royal-lantern-rise ${1.5 + Math.random() * 1.5}s ease-in forwards ${Math.random() * 0.5}s`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            )}

            {/* Stage 6: Flower Petal Blessing */}
            {celebrationStage >= 6 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-[6]">
                {Array.from({ length: 30 }).map((_, i) => {
                  const isRose = Math.random() > 0.5;
                  const color = isRose ? '%236B1A2A' : '%23D4A017';
                  const path = isRose
                    ? 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.5l4-3-4-3v6z'
                    : 'M12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 12 2 A10 10 0 0 1 22 12 A10 10 0 0 1 12 22 Z';
                  return (
                    <div
                      key={`petal-rain-${i}`}
                      className="royal-falling-petal"
                      style={{
                        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}" fill="${color}" opacity="0.8"/></svg>')`,
                        left: `${Math.random() * 100}%`,
                        '--drift-x': `${(Math.random() - 0.5) * 200}px`,
                        animation: `royal-petal-fall ${1 + Math.random() * 1.5}s linear forwards ${Math.random() * 0.5}s`,
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
            )}

            {/* Stage 7: Firework Rangoli Sky Burst */}
            {celebrationStage >= 7 && celebrationStage < 10 && (
              <div className="royal-firework-burst z-[4]">
                {/* Trails going up */}
                <div className="royal-firework-particle" style={{ animation: 'royal-firework-shoot 0.3s ease-out forwards' }} />

                {/* Burst particles */}
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={`spark-${i}`}
                    className="royal-firework-particle"
                    style={{
                      '--angle': `${i * 15}deg`,
                      '--distance': `${100 + Math.random() * 50}px`,
                      animation: 'royal-firework-explode 0.4s ease-out forwards 0.2s'
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            )}

            {/* Stage 8: Divine Light Beams */}
            {celebrationStage >= 8 && (
              <div className="royal-divine-beams z-[5]" style={{ animation: 'royal-beams-shine 1s ease-in-out infinite alternate' }} />
            )}

            {/* Content Container (Message, Hashtag, Diyas) */}
            <div className="relative text-center py-12 md:py-16 px-6 md:px-8 z-[15] royal-thank-you-text"
              style={{ opacity: celebrationStage >= 9 ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>

              {/* Stage 9: Thank You Message Reveal */}
              {celebrationStage >= 9 && (
                <div style={{ animation: 'royal-text-reveal 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
                  <h3 className="font-heading font-semibold text-[28px] md:text-[42px] text-primary mb-2 leading-tight drop-shadow-md">
                    Thank You,
                  </h3>

                  <p className="font-display text-2xl md:text-4xl gold-shimmer mb-8"
                    style={{ animation: 'rsvp-name-gold-pass 0.6s ease-in-out forwards' }}>
                    {guestName}!
                  </p>

                  <p className="font-body text-base md:text-lg mb-10 leading-relaxed drop-shadow-sm"
                    style={{ color: 'hsl(var(--text-cream) / 0.9)' }}>
                    We can't wait to celebrate with you!
                  </p>

                  <div className="w-24 h-px mx-auto mb-5" style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), transparent)',
                  }} />
                  <p className="font-display text-lg md:text-xl text-primary tracking-[0.12em] mb-1">
                    HARSHIT & ANSHIKHA
                  </p>
                  <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream) / 0.8)' }}>
                    10th May 2026
                  </p>
                </div>
              )}

              {/* Stage 10: Hashtag Shimmer */}
              {celebrationStage >= 10 && (
                <div className="relative inline-block mt-4" style={{ animation: 'fade-in 0.3s ease-out forwards' }}>
                  <p className="font-hashtag text-primary text-xl md:text-2xl drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
                    style={{ animation: 'rsvp-hashtag-sweep 1.5s infinite' }}>
                    ✨ #HarAnshTera ✨
                  </p>
                </div>
              )}

              {/* Stage 11: Diyas Glowing (Left -> Center -> Right) */}
              {celebrationStage >= 11 && (
                <div className="flex justify-center items-center gap-10 mt-12 mb-4">
                  <div style={{ animation: 'royal-diya-ignite 0.2s ease-out forwards' }}>
                    <div className="royal-diya-glow"><DiyaIcon lit={true} className="scale-125" /></div>
                  </div>
                  <div style={{ animation: 'royal-diya-ignite 0.2s ease-out 0.1s forwards', opacity: 0 }}>
                    <div className="royal-diya-glow"><DiyaIcon lit={true} className="scale-150 -translate-y-3" /></div>
                  </div>
                  <div style={{ animation: 'royal-diya-ignite 0.2s ease-out 0.2s forwards', opacity: 0 }}>
                    <div className="royal-diya-glow"><DiyaIcon lit={true} className="scale-125" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Contact Section ── */}
        <div className="w-full mt-10 mb-10">
          <ContactHeading active={active} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FAMILY_CONTACTS.map((group, i) => (
              <ContactCard
                key={group.id}
                group={group}
                delay={`${0.2 + i * 0.15}s`}
                active={active}
                onClick={() => setActiveContactGroup(group)}
              />
            ))}
          </div>
        </div>

        {/* ── Contact Overlay ── */}
        {activeContactGroup && (
          <FamilyContactsOverlay
            group={activeContactGroup}
            onClose={() => setActiveContactGroup(null)}
          />
        )}

        {/* ── Footer ── */}
        <footer className="rsvp-footer w-full" style={{ animation: active ? 'fade-in 0.5s ease-out 1.2s both' : 'none' }}>
          {/* Ornate divider */}
          <div className="mx-auto mb-5 opacity-30">
            <svg width="120" height="12" viewBox="0 0 120 12" aria-hidden="true">
              <path d="M0,6 L50,6" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              <path d="M70,6 L120,6" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              <circle cx="60" cy="6" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" />
              <circle cx="60" cy="6" r="1.5" fill="hsl(var(--primary))" opacity="0.5" />
            </svg>
          </div>

          <p className="font-body text-xs text-muted mb-2">Made with love for</p>
          <p className="font-display text-sm text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
          <p className="font-hashtag text-primary/40 text-xs">#HarAnshTera</p>
          <p className="font-body text-[10px] text-muted mt-1">10th May 2026</p>

          {/* Bottom jaali pattern */}
          <div className="mt-6 mx-auto max-w-[240px] h-5 opacity-[0.07]" aria-hidden="true">
            <svg viewBox="0 0 240 20" className="w-full h-full" preserveAspectRatio="none">
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216].map(x => (
                <React.Fragment key={x}>
                  <path d={`M${x},10 L${x + 12},0 L${x + 24},10 L${x + 12},20 Z`} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" />
                  <circle cx={x + 12} cy={10} r="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" />
                </React.Fragment>
              ))}
            </svg>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default RSVPSection;
