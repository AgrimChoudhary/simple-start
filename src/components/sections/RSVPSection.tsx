import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

interface RSVPSectionProps {
  active: boolean;
  guestName: string;
}

/* ═══ Ornate Invitation Seal ═══ */
const InvitationSeal = () => (
  <div className="relative w-24 h-24 mx-auto mb-8" aria-hidden="true">
    {/* Outer glow */}
    <div className="absolute inset-0 rounded-full" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
      transform: 'scale(2)',
    }} />
    {/* Seal */}
    <div className="relative w-full h-full rounded-full flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 40% 35%, hsl(var(--card)) 0%, hsl(218 50% 11%) 100%)',
        border: '2px solid hsl(var(--primary) / 0.4)',
        boxShadow: '0 4px 24px hsl(var(--primary) / 0.15), inset 0 2px 8px hsl(var(--primary) / 0.08)',
      }}
    >
      {/* Mandala rings */}
      <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '40s' }} viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.2" strokeDasharray="3 4" />
        <circle cx="48" cy="48" r="34" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.15" strokeDasharray="2 5" />
        <circle cx="48" cy="48" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.1" />
      </svg>
      <span className="text-4xl relative z-10">💌</span>
    </div>
  </div>
);

/* ═══ Decorative Corner ═══ */
const CornerOrnament: React.FC<{ position: string; transform: string }> = ({ position, transform }) => (
  <div className={`absolute ${position} w-12 h-12 pointer-events-none opacity-20`} aria-hidden="true">
    <svg viewBox="0 0 48 48" className="w-full h-full" style={{ transform }}>
      <path d="M4,44 C4,28 12,16 28,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
      <path d="M4,44 C8,32 16,22 24,16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.7" />
      <circle cx="6" cy="42" r="2.5" fill="hsl(var(--primary))" opacity="0.4" />
      <circle cx="26" cy="10" r="1.5" fill="hsl(var(--primary))" opacity="0.3" />
    </svg>
  </div>
);

const RSVPSection: React.FC<RSVPSectionProps> = ({ active, guestName }) => {
  const [accepted, setAccepted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, [active]);

  const handleAccept = () => {
    if (accepted) return;

    // Multi-wave confetti
    const colors = ['#C9A96E', '#D4B87A', '#F5F0E8', '#6B1A2A', '#D4CFC5'];
    const fire = (opts: confetti.Options) => confetti({ ...opts, colors });

    fire({ particleCount: 80, spread: 60, origin: { x: 0.3, y: 0.25 } });
    fire({ particleCount: 80, spread: 60, origin: { x: 0.7, y: 0.25 } });
    setTimeout(() => fire({ particleCount: 120, spread: 100, origin: { y: 0.35 } }), 250);
    setTimeout(() => fire({ particleCount: 60, spread: 120, origin: { y: 0.5 } }), 500);

    setTimeout(() => setAccepted(true), 700);
  };

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 30%, hsl(var(--card) / 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, hsl(218 48% 12% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 85% 60%, hsl(218 45% 13% / 0.3) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />
        <div className="jaali-overlay" />
        <div className="celebrations-particles" />
      </div>

      {/* Corner ornaments */}
      <CornerOrnament position="top-4 left-4" transform="" />
      <CornerOrnament position="top-4 right-4" transform="scaleX(-1)" />
      <CornerOrnament position="bottom-4 left-4" transform="scaleY(-1)" />
      <CornerOrnament position="bottom-4 right-4" transform="scale(-1)" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-5 md:px-6 flex flex-col items-center justify-center min-h-full py-12">

        {!accepted ? (
          /* ═══ Invitation View ═══ */
          <div className="w-full text-center">
            {/* Heading */}
            <div style={{ animation: active ? 'fade-slide-up 0.5s ease-out' : 'none' }}>
              <div className="flex items-center justify-center gap-3 mb-1">
                <DiyaIcon lit={active} />
                <h2 id="rsvp-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
                  You're Invited
                </h2>
              </div>
              <GoldDivider />
            </div>

            {/* Seal */}
            <div style={{ animation: active ? 'scale-fade-in 0.6s ease-out 0.3s both' : 'none' }}>
              <InvitationSeal />
            </div>

            {/* Personal invitation text */}
            <div style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.4s both' : 'none' }}>
              <p className="font-body text-base md:text-lg leading-relaxed mb-2" style={{ color: 'hsl(var(--text-cream) / 0.85)' }}>
                Dear <span className="font-heading font-semibold text-primary text-lg md:text-xl">{guestName}</span>,
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed mb-1" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                We would be truly honoured by your gracious presence
              </p>
              <p className="font-body text-sm md:text-base leading-relaxed mb-1" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
                at the wedding celebrations of
              </p>
              <p className="font-display text-xl md:text-2xl text-primary tracking-wider my-4">
                HARSHIT & ANSHIKHA
              </p>
              <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream) / 0.6)' }}>
                9th – 11th May 2026 · Bhilwara & Udaipur
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 mx-auto w-32 h-px" style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
            }} />

            {/* Hindi invitation */}
            <p className="font-hindi text-sm text-muted mb-10" lang="hi"
              style={{ animation: active ? 'fade-in 0.5s ease-out 0.6s both' : 'none' }}>
              आपकी उपस्थिति हमारा सम्मान होगा
            </p>

            {/* ═══ THE ONLY GOLD-FILLED BUTTON ═══ */}
            <div style={{
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
              transition: 'all 0.5s cubic-bezier(0.22,0.61,0.36,1)',
            }}>
              <button onClick={handleAccept} className="rsvp-accept-btn group/accept">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Accept Invitation</span>
                  <span className="text-lg transition-transform duration-300 group-hover/accept:scale-125">💌</span>
                </span>
                <div className="rsvp-accept-shimmer" />
              </button>
            </div>

            {/* Hashtag */}
            <p className="font-hashtag text-primary/50 text-sm mt-6"
              style={{ animation: active ? 'fade-in 0.5s ease-out 0.8s both' : 'none' }}>
              #HarAnshTera
            </p>
          </div>
        ) : (
          /* ═══ Thank You State ═══ */
          <div className="w-full">
            <div className="rsvp-thank-you">
              {/* Golden radial glow */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
                }} />
              </div>

              <div className="relative text-center py-14 px-6">
                <div className="text-6xl mb-6" style={{ animation: 'scale-fade-in 0.4s ease-out' }}>🎉</div>

                <h3 className="font-heading font-semibold text-[26px] md:text-[38px] text-primary mb-3 leading-tight"
                  style={{ animation: 'fade-slide-up 0.5s ease-out 0.15s both' }}>
                  Thank You,
                </h3>
                <p className="font-display text-2xl md:text-3xl gold-shimmer mb-4"
                  style={{ animation: 'fade-slide-up 0.5s ease-out 0.3s both' }}>
                  {guestName}!
                </p>

                <p className="font-body text-base mb-10 leading-relaxed"
                  style={{ color: 'hsl(var(--text-cream) / 0.8)', animation: 'fade-in 0.5s ease-out 0.5s both' }}>
                  We can't wait to celebrate with you!
                </p>

                <div style={{ animation: 'fade-slide-up 0.5s ease-out 0.7s both' }}>
                  <div className="w-20 h-px mx-auto mb-5" style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)',
                  }} />
                  <p className="font-display text-lg text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
                  <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream))' }}>10th May 2026</p>
                  <p className="font-hashtag text-primary/60 text-sm mt-2">#HarAnshTera</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Contact Cards ── */}
        <div className="w-full mt-12 grid grid-cols-2 gap-4"
          style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.8s both' : 'none' }}>
          {[
            { side: "Groom's Side", icon: '🤵', name: 'Family Contact' },
            { side: "Bride's Side", icon: '👰', name: 'Family Contact' },
          ].map((c) => (
            <div key={c.side} className="rsvp-contact-card">
              <span className="text-2xl mb-2 block">{c.icon}</span>
              <p className="font-heading text-sm mb-1" style={{ color: 'hsl(var(--text-cream))' }}>{c.side}</p>
              <p className="font-ui text-[10px] text-muted mb-3">{c.name}</p>
              <div className="flex items-center justify-center gap-3">
                <a href="tel:+919999999999" className="rsvp-contact-link" aria-label={`Call ${c.side}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="rsvp-contact-link" aria-label={`WhatsApp ${c.side}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <footer className="rsvp-footer w-full" style={{ animation: active ? 'fade-in 0.5s ease-out 1s both' : 'none' }}>
          <div className="w-20 h-px mx-auto mb-4" style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
          }} />
          <p className="font-body text-xs text-muted mb-2">Made with love for</p>
          <p className="font-display text-sm text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
          <p className="font-hashtag text-primary/50 text-xs">#HarAnshTera</p>
          <p className="font-body text-[10px] text-muted mt-1">10th May 2026</p>

          {/* Bottom jaali */}
          <div className="mt-6 mx-auto max-w-[200px] h-4 opacity-10" aria-hidden="true">
            <svg viewBox="0 0 200 16" className="w-full h-full" preserveAspectRatio="none">
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map(x => (
                <path key={x} d={`M${x},8 L${x+10},0 L${x+20},8 L${x+10},16 Z`} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default RSVPSection;
