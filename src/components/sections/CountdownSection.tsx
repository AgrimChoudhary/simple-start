import React, { useEffect, useState, useCallback } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

interface CountdownSectionProps {
  active: boolean;
  onNext: () => void;
}

const WEDDING_DATE = new Date('2026-05-10T00:00:00+05:30');

const sampleBlessings = [
  { name: 'Rajesh Uncle', message: 'Wishing you both a lifetime of love and happiness! 🎊' },
  { name: 'Priya Aunty', message: 'May your journey together be filled with joy and laughter.' },
  { name: 'Amit & Neha', message: 'Congratulations! You make a beautiful couple. ❤️' },
  { name: 'Sharma Family', message: 'Bahut bahut badhaiyan! May God bless your union.' },
  { name: 'Kavita Didi', message: 'So happy for you both! Can\'t wait to celebrate! 💃' },
  { name: 'Ravi Bhai', message: 'May your love story inspire many more. Best wishes!' },
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

  const CountdownBox = useCallback(({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl border border-primary/20 flex items-center justify-center"
        style={{
          background: 'hsl(var(--bg-card))',
          animation: 'heartbeat-glow 2s ease-in-out infinite',
        }}
      >
        <span className="font-display text-3xl md:text-[56px] text-primary leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-ui text-[10px] md:text-xs uppercase tracking-[3px] text-muted mt-2">
        {label}
      </span>
    </div>
  ), []);

  return (
    <section
      className="section-container !justify-start"
      aria-labelledby="countdown-heading"
      style={{ overflowY: 'auto' }}
    >
      <div className="jaali-overlay" />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2">
            <DiyaIcon lit={active} />
            <h2 id="countdown-heading" className="font-heading text-2xl md:text-[40px] gold-shimmer-slow">
              Counting the Days
            </h2>
          </div>
          <GoldDivider />
        </div>

        {/* Countdown */}
        {time.state === 'before' ? (
          <div className="flex justify-center gap-3 md:gap-6 mb-12">
            <CountdownBox value={time.days} label="Days" />
            <CountdownBox value={time.hours} label="Hours" />
            <CountdownBox value={time.minutes} label="Minutes" />
            <CountdownBox value={time.seconds} label="Seconds" />
          </div>
        ) : time.state === 'during' ? (
          <div className="text-center mb-12">
            <p className="font-heading text-2xl md:text-3xl text-primary">🎉 The celebrations have begun! 🎉</p>
          </div>
        ) : (
          <div className="text-center mb-12">
            <p className="font-heading text-2xl md:text-3xl text-primary">Thank you for celebrating with us! 💕</p>
          </div>
        )}

        {/* Blessings Wall */}
        <div className="text-center mb-6">
          <h3 className="font-heading text-xl md:text-2xl text-cream">Blessings Wall</h3>
          <p className="font-body text-sm text-muted mt-1">Wishes from loved ones</p>
        </div>

        {/* Auto-scrolling blessings carousel */}
        <div className="overflow-hidden mb-8 relative" aria-label="Blessings from guests">
          <div
            className="flex gap-4"
            style={{
              animation: 'scroll-carousel 20s linear infinite',
              width: 'max-content',
            }}
          >
            {[...sampleBlessings, ...sampleBlessings].map((b, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 rounded-xl p-4 border-t-2 border-primary"
                style={{ background: 'hsl(var(--bg-card))' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center bg-secondary">
                    <span className="text-primary text-sm">👤</span>
                  </div>
                  <span className="font-ui text-xs font-medium text-primary">{b.name}</span>
                </div>
                <p className="font-body text-sm text-cream leading-relaxed">{b.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blessing form */}
        <div className="rounded-2xl border border-primary/20 p-6 mb-10" style={{ background: 'hsl(var(--bg-card))' }}>
          <h4 className="font-heading text-lg text-cream mb-4 text-center">Send Your Blessing</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 font-ui text-sm text-cream placeholder:text-gold-tertiary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(38_36%_60%_/_0.15)] min-h-[48px]"
            />
            <textarea
              placeholder="Your blessing message..."
              rows={3}
              className="w-full bg-transparent border border-primary/40 rounded-lg px-4 py-3 font-ui text-sm text-cream placeholder:text-gold-tertiary/50 focus:border-primary focus:outline-none focus:shadow-[0_0_8px_hsl(38_36%_60%_/_0.15)] resize-none"
            />
            <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui font-semibold text-sm hover:bg-accent active:scale-[0.97] transition-all min-h-[48px]">
              Send Blessing ✨
            </button>
          </div>
        </div>

        {/* Next */}
        <div className="text-center pb-8">
          <button
            onClick={onNext}
            className="font-ui font-semibold text-sm md:text-base px-7 py-3.5 rounded-xl border-[1.5px] border-primary text-cream transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97] min-w-[180px] min-h-[48px]"
            style={{
              opacity: buttonVisible ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
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
