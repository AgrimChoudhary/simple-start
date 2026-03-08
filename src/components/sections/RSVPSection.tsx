import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Fire confetti
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.3 },
      colors: ['#C9A96E', '#D4B87A', '#F5F0E8', '#6B1A2A', '#D4CFC5'],
      shapes: ['circle', 'square'],
    });

    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 500);
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
    <section
      className="section-container !justify-start"
      aria-labelledby="rsvp-heading"
      style={{ overflowY: 'auto' }}
    >
      <div className="jaali-overlay" />
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <DiyaIcon lit={active} />
            <h2 id="rsvp-heading" className="font-heading text-2xl md:text-[40px] gold-shimmer-slow">
              RSVP
            </h2>
          </div>
          <GoldDivider />
          <p className="font-body text-sm text-cream/80 mt-2">
            We would be honoured by your presence
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="font-ui text-sm font-medium text-cream block mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 font-ui text-sm text-cream placeholder:text-gold-tertiary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(38_36%_60%_/_0.15)] min-h-[48px]"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-ui text-sm font-medium text-cream block mb-1.5">Phone Number *</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 font-ui text-sm text-cream placeholder:text-gold-tertiary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(38_36%_60%_/_0.15)] min-h-[48px]"
                placeholder="10-digit mobile number"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="font-ui text-sm font-medium text-cream block mb-1.5">Number of Guests *</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
                  className="w-10 h-10 rounded-lg border border-primary/40 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  −
                </button>
                <span className="font-display text-2xl text-primary w-12 text-center">{formData.guests}</span>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.min(10, p.guests + 1) }))}
                  className="w-10 h-10 rounded-lg border border-primary/40 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Events */}
            <div>
              <label className="font-ui text-sm font-medium text-cream block mb-2">Attending Events *</label>
              <div className="space-y-2">
                {weddingEvents.map(event => (
                  <label
                    key={event.eventName}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        formData.events.includes(event.eventName)
                          ? 'bg-primary border-primary'
                          : 'border-primary/40'
                      }`}
                    >
                      {formData.events.includes(event.eventName) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.events.includes(event.eventName)}
                      onChange={() => toggleEvent(event.eventName)}
                    />
                    <span className="font-ui text-sm text-cream">{event.eventName}</span>
                    <span className="text-xs text-muted ml-auto">{event.eventDate}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="font-ui text-sm font-medium text-cream block mb-1.5">Blessings / Message</label>
              <div className="relative">
                <textarea
                  maxLength={500}
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 font-ui text-sm text-cream placeholder:text-gold-tertiary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(38_36%_60%_/_0.15)] resize-none"
                  placeholder="Write your blessings..."
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-muted font-ui">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            {/* Submit - THE ONLY PRIMARY BUTTON */}
            <button
              type="submit"
              disabled={submitting || formData.events.length === 0}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-ui font-semibold text-base md:text-lg transition-all hover:bg-accent hover:shadow-[0_4px_24px_rgba(201,169,110,0.25)] active:scale-[0.97] min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed gold-shimmer-button"
              style={{
                animation: 'button-shimmer 4s linear infinite',
                backgroundSize: '200% 100%',
              }}
            >
              {submitting ? 'Sending...' : 'Accept Invitation 💌'}
            </button>
          </form>
        ) : (
          /* Thank You Overlay */
          <div
            className="text-center py-16"
            style={{
              animation: 'fade-slide-up 0.5s ease-out',
            }}
          >
            <div className="text-5xl mb-6">🎉</div>
            <h3
              className="font-heading font-semibold text-2xl md:text-[40px] text-primary mb-2"
              style={{ animation: 'fade-in 0.5s ease-out' }}
            >
              Thank You, <span className="font-display gold-shimmer">{guestName}</span>!
            </h3>
            <p className="font-body text-base text-cream/80 mb-8" style={{ animation: 'fade-in 0.5s ease-out 0.3s both' }}>
              We can't wait to celebrate with you!
            </p>
            <div style={{ animation: 'fade-in 0.5s ease-out 0.5s both' }}>
              <p className="font-display text-lg text-primary mb-1">HARSHIT & ANSHIKHA</p>
              <p className="font-body text-sm text-cream">10th May 2026</p>
              <p className="font-hashtag text-primary text-sm mt-1">#HarAnshTera</p>
            </div>
          </div>
        )}

        {/* Contact Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-primary/20 p-4 text-center" style={{ background: 'hsl(var(--bg-card))' }}>
            <p className="font-heading text-sm text-cream mb-2">Groom's Side</p>
            <a href="tel:+919999999999" className="flex items-center justify-center gap-2 text-primary text-sm font-ui hover:text-accent transition-colors">
              📞 Contact
            </a>
          </div>
          <div className="rounded-xl border border-primary/20 p-4 text-center" style={{ background: 'hsl(var(--bg-card))' }}>
            <p className="font-heading text-sm text-cream mb-2">Bride's Side</p>
            <a href="tel:+919999999999" className="flex items-center justify-center gap-2 text-primary text-sm font-ui hover:text-accent transition-colors">
              📞 Contact
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pb-8 border-t border-primary/10 pt-6">
          <p className="font-body text-xs text-muted mb-1">Made with love for</p>
          <p className="font-display text-sm text-primary mb-1">HARSHIT & ANSHIKHA</p>
          <p className="font-hashtag text-primary/60 text-xs">#HarAnshTera</p>
          <p className="font-body text-[10px] text-muted mt-1">10th May 2026</p>
        </footer>
      </div>
    </section>
  );
};

export default RSVPSection;
