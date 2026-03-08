import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import { weddingEvents } from '@/data/events';

interface RSVPSectionProps {
  active: boolean;
  guestName: string;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ active, guestName }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 1,
    events: weddingEvents.map(e => e.eventName),
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, [active]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Fire confetti burst
    const fire = (opts: confetti.Options) => {
      confetti({
        ...opts,
        colors: ['#C9A96E', '#D4B87A', '#F5F0E8', '#6B1A2A', '#D4CFC5'],
      });
    };

    fire({ particleCount: 100, spread: 70, origin: { x: 0.3, y: 0.3 } });
    fire({ particleCount: 100, spread: 70, origin: { x: 0.7, y: 0.3 } });
    setTimeout(() => {
      fire({ particleCount: 80, spread: 100, origin: { y: 0.4 } });
    }, 200);

    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 600);
  };

  const toggleEvent = (eventName: string) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventName)
        ? prev.events.filter(e => e !== eventName)
        : [...prev.events, eventName],
    }));
  };

  return (
    <section className="rsvp-section" aria-labelledby="rsvp-heading">
      {/* ── Layered background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 15%, hsl(var(--card) / 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 80% 80%, hsl(218 48% 12% / 0.4) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />
        <div className="jaali-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto px-5 md:px-6 pt-10 pb-16">
        {/* ── Heading ── */}
        <div className="text-center mb-8" style={{ animation: active ? 'fade-slide-up 0.5s ease-out' : 'none' }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="rsvp-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              RSVP
            </h2>
          </div>
          <GoldDivider />
          <p className="font-body text-sm mt-3" style={{ color: 'hsl(var(--text-cream) / 0.8)' }}>
            We would be honoured by your presence
          </p>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">आपकी उपस्थिति हमारा सम्मान</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5" style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.2s both' : 'none' }}>
            {/* Name */}
            <div>
              <label className="rsvp-label">Full Name *</label>
              <input
                type="text"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="rsvp-input"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="rsvp-label">Phone Number *</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="rsvp-input"
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="rsvp-label">Number of Guests *</label>
              <div className="flex items-center gap-4 mt-1">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
                  className="rsvp-stepper-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
                <span className="font-display text-3xl text-primary w-10 text-center">{formData.guests}</span>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.min(10, p.guests + 1) }))}
                  className="rsvp-stepper-btn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
              </div>
            </div>

            {/* Events */}
            <div>
              <label className="rsvp-label">Attending Events *</label>
              <div className="space-y-2 mt-1">
                {weddingEvents.map(event => {
                  const checked = formData.events.includes(event.eventName);
                  return (
                    <label key={event.eventName} className="rsvp-event-row group/ev">
                      <div className={`rsvp-checkbox ${checked ? 'rsvp-checkbox--checked' : ''}`}>
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleEvent(event.eventName)} />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-ui text-sm" style={{ color: 'hsl(var(--text-cream))' }}>{event.eventName}</span>
                        <span className="text-xs text-muted">{event.eventDate}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="rsvp-label">Blessings / Message</label>
              <div className="relative">
                <textarea
                  maxLength={500}
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="rsvp-input resize-none"
                  placeholder="Write your blessings..."
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] text-muted font-ui">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit — THE ONLY PRIMARY GOLD BUTTON */}
            <div style={{ animation: active ? 'fade-slide-up 0.4s ease-out 0.5s both' : 'none' }}>
              <button
                type="submit"
                disabled={submitting || formData.events.length === 0}
                className="rsvp-accept-btn"
              >
                <span className="relative z-10">{submitting ? 'Sending...' : 'Accept Invitation 💌'}</span>
                {/* Gold shimmer sweep */}
                <div className="rsvp-accept-shimmer" />
              </button>
            </div>
          </form>
        ) : (
          /* ═══ Thank You Overlay ═══ */
          <div className="rsvp-thank-you">
            {/* Golden radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 50% 40%, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
            }} />

            <div className="relative text-center py-12">
              <div className="text-6xl mb-6" style={{ animation: 'scale-fade-in 0.4s ease-out' }}>🎉</div>

              <h3 className="font-heading font-semibold text-2xl md:text-[36px] text-primary mb-2"
                style={{ animation: 'fade-slide-up 0.5s ease-out' }}>
                Thank You, <span className="font-display gold-shimmer">{guestName}</span>!
              </h3>

              <p className="font-body text-base mb-10" style={{ color: 'hsl(var(--text-cream) / 0.8)', animation: 'fade-in 0.5s ease-out 0.3s both' }}>
                We can't wait to celebrate with you!
              </p>

              <div style={{ animation: 'fade-slide-up 0.5s ease-out 0.5s both' }}>
                <div className="w-16 h-px mx-auto mb-4" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)' }} />
                <p className="font-display text-lg text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
                <p className="font-body text-sm" style={{ color: 'hsl(var(--text-cream))' }}>10th May 2026</p>
                <p className="font-hashtag text-primary/70 text-sm mt-1">#HarAnshTera</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Contact Cards ── */}
        <div className="mt-12 grid grid-cols-2 gap-4" style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.6s both' : 'none' }}>
          {[
            { side: "Groom's Side", icon: '🤵' },
            { side: "Bride's Side", icon: '👰' },
          ].map((c) => (
            <div key={c.side} className="rsvp-contact-card">
              <span className="text-2xl mb-2 block">{c.icon}</span>
              <p className="font-heading text-sm mb-3" style={{ color: 'hsl(var(--text-cream))' }}>{c.side}</p>
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
        <footer className="rsvp-footer" style={{ animation: active ? 'fade-in 0.5s ease-out 0.8s both' : 'none' }}>
          <div className="w-20 h-px mx-auto mb-4" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)' }} />
          <p className="font-body text-xs text-muted mb-2">Made with love for</p>
          <p className="font-display text-sm text-primary tracking-wider mb-1">HARSHIT & ANSHIKHA</p>
          <p className="font-hashtag text-primary/50 text-xs">#HarAnshTera</p>
          <p className="font-body text-[10px] text-muted mt-1">10th May 2026</p>

          {/* Bottom jaali border */}
          <div className="mt-6 mx-auto max-w-[200px] h-4 opacity-10" aria-hidden="true">
            <svg viewBox="0 0 200 16" className="w-full h-full" preserveAspectRatio="none">
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map(x => (
                <path key={x} d={`M${x},8 L${x + 10},0 L${x + 20},8 L${x + 10},16 Z`} fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              ))}
            </svg>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default RSVPSection;
