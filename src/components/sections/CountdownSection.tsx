import React, { useEffect, useState, useCallback, useRef } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';

interface CountdownSectionProps {
  active: boolean;
  onNext: () => void;
}

const WEDDING_DATE = new Date('2026-05-10T00:00:00+05:30');

const sampleBlessings = [
  { name: 'Rajesh Uncle', message: 'Wishing you both a lifetime of love and happiness! 🎊', initials: 'RU' },
  { name: 'Priya Aunty', message: 'May your journey together be filled with joy and laughter.', initials: 'PA' },
  { name: 'Amit & Neha', message: 'Congratulations! You make a beautiful couple. ❤️', initials: 'AN' },
  { name: 'Sharma Family', message: 'Bahut bahut badhaiyan! May God bless your union.', initials: 'SF' },
  { name: 'Kavita Didi', message: 'So happy for you both! Can\'t wait to celebrate! 💃', initials: 'KD' },
  { name: 'Ravi Bhai', message: 'May your love story inspire many more. Best wishes!', initials: 'RB' },
];

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'after' as const };

  const weddingStart = new Date('2026-05-09T00:00:00+05:30');
  const weddingEnd = new Date('2026-05-11T23:59:59+05:30');
  if (now >= weddingStart && now <= weddingEnd) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'during' as const };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    state: 'before' as const,
  };
}

/* ═══════════════════════════════════════════════
   COUNTDOWN BOX — with flip digit effect
   ═══════════════════════════════════════════════ */
const CountdownBox: React.FC<{ value: number; label: string; active: boolean }> = ({ value, label, active }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrevValue(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2.5">
      {/* Box with heartbeat glow */}
      <div className="countdown-box-wrapper">
        {/* Heartbeat glow aura */}
        <div className="countdown-heartbeat-glow" />

        {/* The box */}
        <div className="countdown-box">
          {/* Top half (flip card top) */}
          <div className="countdown-box-inner">
            <span className={`countdown-digit ${flipping ? 'countdown-digit--flip' : ''}`}>
              {display}
            </span>
          </div>

          {/* Center divider line */}
          <div className="absolute left-2 right-2 top-1/2 h-px bg-primary/10 z-10" />

          {/* Subtle inner shine */}
          <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
            background: 'linear-gradient(180deg, hsl(var(--primary) / 0.04) 0%, transparent 40%, hsl(var(--primary) / 0.02) 100%)',
          }} />
        </div>
      </div>

      {/* Label */}
      <span className="font-ui text-[10px] md:text-[11px] uppercase tracking-[3px] text-muted font-medium">
        {label}
      </span>
    </div>
  );
};

/* Colon separator */
const ColonSep = () => (
  <div className="flex flex-col items-center gap-2.5 pt-1">
    <div className="flex flex-col gap-2 h-16 md:h-20 items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
    <span className="text-[10px] invisible">:</span>
  </div>
);

/* ═══════════════════════════════════════════════
   BLESSING CARD
   ═══════════════════════════════════════════════ */
const BlessingCard: React.FC<{ blessing: typeof sampleBlessings[0] }> = ({ blessing }) => (
  <div className="blessing-card">
    {/* Gold top accent */}
    <div className="absolute top-0 left-4 right-4 h-[2px]" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)',
    }} />

    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center relative"
        style={{
          background: 'hsl(var(--secondary))',
          border: '2px solid hsl(var(--primary) / 0.3)',
        }}
      >
        <span className="font-ui text-xs font-semibold text-primary">{blessing.initials}</span>
        {/* Camera icon */}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-card border border-primary/30 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="hsl(var(--primary))" opacity="0.5">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-ui text-xs font-semibold text-primary mb-1">{blessing.name}</p>
        <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(var(--text-cream))' }}>
          {blessing.message}
        </p>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN COUNTDOWN SECTION
   ═══════════════════════════════════════════════ */
const CountdownSection: React.FC<CountdownSectionProps> = ({ active, onNext }) => {
  const [time, setTime] = useState(getTimeLeft);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <section className="countdown-section" aria-labelledby="countdown-heading">
      {/* ── Layered background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 20%, hsl(var(--card) / 0.5) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 30% 80%, hsl(218 50% 12% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 75% 50%, hsl(218 45% 13% / 0.3) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />
        <div className="jaali-overlay" />
        <div className="celebrations-particles" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 md:px-6 pt-10 pb-16">
        {/* ── Heading ── */}
        <div className="text-center mb-10" style={{ animation: active ? 'fade-slide-up 0.5s ease-out' : 'none' }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="countdown-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              Counting the Days
            </h2>
          </div>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">शुभ दिन की प्रतीक्षा</p>
          <GoldDivider />
        </div>

        {/* ── Countdown Timer ── */}
        {time.state === 'before' ? (
          <div
            className="flex justify-center items-start gap-2 md:gap-4 mb-14"
            style={{ animation: active ? 'fade-slide-up 0.6s ease-out 0.2s both' : 'none' }}
          >
            <CountdownBox value={time.days} label="Days" active={active} />
            <ColonSep />
            <CountdownBox value={time.hours} label="Hours" active={active} />
            <ColonSep />
            <CountdownBox value={time.minutes} label="Min" active={active} />
            <ColonSep />
            <CountdownBox value={time.seconds} label="Sec" active={active} />
          </div>
        ) : time.state === 'during' ? (
          <div className="text-center mb-14 py-8">
            <div className="text-5xl mb-4">🎉</div>
            <p className="font-heading text-2xl md:text-3xl text-primary">The celebrations have begun!</p>
            <p className="font-hindi text-base text-muted mt-2" lang="hi">उत्सव शुरू हो गया है!</p>
          </div>
        ) : (
          <div className="text-center mb-14 py-8">
            <div className="text-5xl mb-4">💕</div>
            <p className="font-heading text-2xl md:text-3xl text-primary">Thank you for celebrating with us!</p>
          </div>
        )}

        {/* ── Blessings Wall Heading ── */}
        <div className="text-center mb-6" style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.4s both' : 'none' }}>
          <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'hsl(var(--text-cream))' }}>
            ✨ Blessings Wall
          </h3>
          <p className="font-body text-sm text-muted mt-1">Wishes from loved ones</p>
        </div>

        {/* ── Auto-scrolling Blessings Carousel ── */}
        <div
          className="overflow-hidden mb-10 relative"
          aria-label="Blessings from guests"
          style={{ animation: active ? 'fade-in 0.5s ease-out 0.6s both' : 'none' }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{
            background: 'linear-gradient(90deg, hsl(var(--background)), transparent)',
          }} />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{
            background: 'linear-gradient(270deg, hsl(var(--background)), transparent)',
          }} />

          <div className="blessings-carousel-track">
            {[...sampleBlessings, ...sampleBlessings].map((b, i) => (
              <BlessingCard key={i} blessing={b} />
            ))}
          </div>
        </div>

        {/* ── Blessing Form ── */}
        <div
          className="blessing-form-container"
          style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.8s both' : 'none' }}
        >
          <h4 className="font-heading text-lg text-center mb-5" style={{ color: 'hsl(var(--text-cream))' }}>
            Send Your Blessing
          </h4>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="countdown-input"
            />
            <textarea
              placeholder="Write your heartfelt blessing..."
              rows={3}
              className="countdown-input resize-none"
            />
            <button className="countdown-send-btn">
              <span>Send Blessing</span>
              <span className="text-sm">✨</span>
            </button>
          </div>
        </div>

        {/* ── Next Button ── */}
        <div className="text-center mt-14 pb-4">
          <button
            onClick={onNext}
            className="nav-button-secondary"
            style={{
              opacity: buttonVisible ? 1 : 0,
              transform: buttonVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              pointerEvents: buttonVisible ? 'auto' : 'none',
            }}
          >
            Next: RSVP →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
