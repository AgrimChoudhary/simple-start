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

/* ═══ Family Contact Card — Premium ═══ */
const FamilyContactCard: React.FC<{
  icon: string;
  name: string;
  relation: string;
  phone: string;
  whatsapp: string;
  delay: string;
  active: boolean;
}> = ({ icon, name, relation, phone, whatsapp, delay, active }) => (
  <div
    className="family-contact-card group"
    style={{ animation: active ? `contact-card-reveal 0.7s cubic-bezier(0.22,0.61,0.36,1) ${delay} both` : 'none' }}
  >
    {/* Animated border glow on hover */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" style={{
      background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.15), transparent, hsl(var(--primary) / 0.1), transparent)',
      padding: '1px',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }} />
    {/* Inner hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
      background: 'radial-gradient(ellipse at 50% 20%, hsl(var(--primary) / 0.08) 0%, transparent 65%)',
    }} />

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
          <span className="text-3xl md:text-4xl relative z-10" style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--primary) / 0.25))' }}>{icon}</span>
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
      <p className="font-body text-sm md:text-base font-medium mb-0.5" style={{ color: 'hsl(var(--text-cream) / 0.9)' }}>{name}</p>
      <p className="font-ui text-[10px] md:text-xs tracking-wider uppercase mb-5" style={{ color: 'hsl(var(--text-cream) / 0.45)' }}>{relation}</p>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        <a href={`tel:${phone}`} className="family-contact-btn group/call" aria-label={`Call ${name}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="font-ui text-[10px] tracking-wide">Call</span>
        </a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="family-contact-btn family-contact-btn--whatsapp group/wa" aria-label={`WhatsApp ${name}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          <span className="font-ui text-[10px] tracking-wide">WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
);

/* ═══ Family Contact Section Heading ═══ */
const FamilyContactHeading: React.FC<{ active: boolean }> = ({ active }) => (
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
        Family Contacts
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

  useEffect(() => {
    if (active) {
      const t1 = setTimeout(() => setButtonVisible(true), 800);
      const t2 = setTimeout(() => setButtonPulsing(true), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [active]);

  const handleAccept = useCallback(() => {
    if (accepted) return;

    // Epic 5-wave confetti burst
    const colors = ['#C9A96E', '#D4B87A', '#F5F0E8', '#6B1A2A', '#D4CFC5'];
    const fire = (opts: confetti.Options) => confetti({
      ...opts,
      colors,
      disableForReducedMotion: true,
      shapes: ['circle', 'square'],
    });

    // Side bursts
    fire({ particleCount: 70, spread: 55, origin: { x: 0.2, y: 0.3 }, angle: 60 });
    fire({ particleCount: 70, spread: 55, origin: { x: 0.8, y: 0.3 }, angle: 120 });
    // Center burst
    setTimeout(() => fire({ particleCount: 100, spread: 90, origin: { y: 0.35 } }), 200);
    // Rain
    setTimeout(() => fire({ particleCount: 50, spread: 150, origin: { y: 0.2 }, gravity: 0.6 }), 450);
    // Final shower
    setTimeout(() => fire({ particleCount: 80, spread: 120, origin: { y: 0.4 }, gravity: 0.8 }), 700);

    setTimeout(() => setAccepted(true), 900);
  }, [accepted]);

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      {/* ── Multi-layer Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 45% at 50% 25%, hsl(var(--card) / 0.6) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 15% 75%, hsl(218 48% 12% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 90% 55%, hsl(218 45% 13% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 50% 90%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />
        <div className="jaali-overlay" />
      </div>

      {/* Section-specific gold dust */}
      <GoldDust />

      {/* Ornate border frame — enhanced with SectionBorderFrame */}
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

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-5 md:px-6 flex flex-col items-center justify-center min-h-full py-10">

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
          /* ═══════════ THANK YOU VIEW ═══════════ */
          <div className="w-full">
            <div className="rsvp-thank-you">
              {/* Golden radial glow layers */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: `
                    radial-gradient(ellipse at 50% 20%, hsl(var(--primary) / 0.12) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 80%, hsl(var(--primary) / 0.05) 0%, transparent 50%)
                  `,
                }} />
              </div>

              <div className="relative text-center py-12 md:py-16 px-6 md:px-8">
                {/* Celebration emoji with bounce */}
                <div className="text-6xl md:text-7xl mb-6" style={{ animation: 'rsvp-celebration-bounce 0.6s ease-out' }}>
                  🎉
                </div>

                {/* Thank you */}
                <h3 className="font-heading font-semibold text-[28px] md:text-[42px] text-primary mb-2 leading-tight"
                  style={{ animation: 'fade-slide-up 0.5s ease-out 0.15s both' }}>
                  Thank You,
                </h3>

                {/* Guest name with gold shimmer */}
                <p className="font-display text-2xl md:text-4xl gold-shimmer mb-2"
                  style={{ animation: 'fade-slide-up 0.5s ease-out 0.3s both' }}>
                  {guestName}!
                </p>

                {/* Rangoli mini decoration */}
                <div className="mx-auto my-5 opacity-40" style={{ animation: 'scale-fade-in 0.5s ease-out 0.4s both' }}>
                  <svg width="80" height="16" viewBox="0 0 80 16" aria-hidden="true">
                    <path d="M0,8 Q10,0 20,8 Q30,16 40,8 Q50,0 60,8 Q70,16 80,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                    <circle cx="40" cy="8" r="3" fill="hsl(var(--primary))" opacity="0.4" />
                    <circle cx="20" cy="8" r="2" fill="hsl(var(--primary))" opacity="0.3" />
                    <circle cx="60" cy="8" r="2" fill="hsl(var(--primary))" opacity="0.3" />
                  </svg>
                </div>

                <p className="font-body text-base md:text-lg mb-10 leading-relaxed"
                  style={{ color: 'hsl(var(--text-cream) / 0.8)', animation: 'fade-in 0.5s ease-out 0.5s both' }}>
                  We can't wait to celebrate with you!
                </p>

                {/* Couple details */}
                <div style={{ animation: 'fade-slide-up 0.5s ease-out 0.7s both' }}>
                  <div className="w-24 h-px mx-auto mb-5" style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)',
                  }} />
                  <p className="font-display text-lg md:text-xl text-primary tracking-[0.12em] mb-1">
                    HARSHIT & ANSHIKHA
                  </p>
                  <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                    10th May 2026
                  </p>
                  <p className="font-hashtag text-primary/50 text-sm mt-3">#HarAnshTera</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Family Contact Section ── */}
        <div className="w-full mt-12 md:mt-16">
          <FamilyContactHeading active={active} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FamilyContactCard
              side="Groom's Side"
              icon="🤵"
              name="Rajesh Sharma"
              relation="Father of the Groom"
              phone="+919999999999"
              whatsapp="919999999999"
              delay="1s"
              active={active}
            />
            <FamilyContactCard
              side="Bride's Side"
              icon="👰"
              name="Suresh Agarwal"
              relation="Father of the Bride"
              phone="+919999999998"
              whatsapp="919999999998"
              delay="1.15s"
              active={active}
            />
          </div>
        </div>

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
