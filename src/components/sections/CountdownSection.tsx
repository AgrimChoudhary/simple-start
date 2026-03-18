import React, { useEffect, useState, useRef, useCallback } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import PeacockCorner from '@/components/global/PeacockCorner';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
import { useGuestName } from '@/hooks/useGuestName';

interface CountdownSectionProps {
  active: boolean;
  onNext: () => void;
}

const WEDDING_DATE = new Date('2026-05-10T00:00:00+05:30');

/* ═══ TIME CALCULATION ═══ */
function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'after' as const };
  const ws = new Date('2026-05-09T00:00:00+05:30');
  const we = new Date('2026-05-11T23:59:59+05:30');
  if (now >= ws && now <= we) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: 'during' as const };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    state: 'before' as const,
  };
}

/* ═══ SPARKLE BURST (click effect) ═══ */
interface Sparkle { id: number; x: number; y: number; }

const SparkleLayer: React.FC<{ sparkles: Sparkle[] }> = ({ sparkles }) => (
  <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
    {sparkles.map(s => (
      <div key={s.id} className="absolute" style={{ left: s.x, top: s.y }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const dist = 30 + Math.random() * 40;
          return (
            <div
              key={i}
              className="cd-sparkle-particle"
              style={{
                '--sx': `${Math.cos(angle) * dist}px`,
                '--sy': `${Math.sin(angle) * dist}px`,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    ))}
  </div>
);

/* ═══ STARFIELD CANVAS ═══ */
const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Star { x: number; y: number; r: number; speed: number; phase: number; phaseSpeed: number; color: string; }
    const colors = ['#FFD700', '#FFECB3', '#FFFFFF', '#FFF8DC', '#87CEEB'];
    const count = w < 768 ? 60 : 120;
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.015 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.phase += s.phaseSpeed;
        s.y += s.speed;
        s.x += Math.sin(s.phase) * 0.15;
        if (s.y > h + 5) { s.y = -5; s.x = Math.random() * w; }
        const alpha = 0.3 + Math.sin(s.phase) * 0.3;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = s.r * 4;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen' }} aria-hidden="true" />;
};

/* ═══ ICON COMPONENTS ═══ */
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary/70">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const TimerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-primary">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const DiamondIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
    <rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)" />
  </svg>
);
const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
    <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" />
    <path d="M18 14L19.18 17.82L23 19L19.18 20.18L18 24L16.82 20.18L13 19L16.82 17.82L18 14Z" opacity="0.6" />
  </svg>
);

/* Unit icons and gradient colors for each countdown box */
const unitConfig: Record<string, { Icon: React.FC; gradient: string; accentColor: string }> = {
  Days: { 
    Icon: CalendarIcon, 
    gradient: 'linear-gradient(145deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 90, 43, 0.08) 100%)',
    accentColor: '#D4AF37'
  },
  Hours: { 
    Icon: TimerIcon, 
    gradient: 'linear-gradient(145deg, rgba(178, 34, 34, 0.12) 0%, rgba(139, 69, 19, 0.08) 100%)',
    accentColor: '#B22222'
  },
  Min: { 
    Icon: DiamondIcon, 
    gradient: 'linear-gradient(145deg, rgba(75, 0, 130, 0.1) 0%, rgba(138, 43, 226, 0.06) 100%)',
    accentColor: '#8B008B'
  },
  Sec: { 
    Icon: SparklesIcon, 
    gradient: 'linear-gradient(145deg, rgba(0, 100, 0, 0.1) 0%, rgba(34, 139, 34, 0.06) 100%)',
    accentColor: '#228B22'
  },
};

/* ═══ LUXURIOUS COUNTDOWN BOX ═══ */
const CountdownBox: React.FC<{ value: number; label: string; idx: number; active: boolean }> = ({ value, label, idx, active }) => {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setPrev(value); setFlip(false); }, 350);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');
  const config = unitConfig[label] || unitConfig.Days;

  return (
    <div
      className="cd-glass-card-wrap"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.12}s`,
      }}
    >
      {/* Floating icon badge with colored glow */}
      <div className="cd-card-badge" style={{ animationDelay: `${idx * 0.3}s`, boxShadow: `0 4px 12px ${config.accentColor}30` }}>
        <config.Icon />
      </div>

      {/* Corner accents */}
      <div className="cd-corner cd-corner-tl" />
      <div className="cd-corner cd-corner-tr" />
      <div className="cd-corner cd-corner-bl" />
      <div className="cd-corner cd-corner-br" />

      {/* The card with gradient overlay */}
      <div className="cd-glass-card" style={{ background: config.gradient }}>
        {/* Inner gradient shine */}
        <div className="cd-glass-shine" />
        {/* Sweep shimmer */}
        <div className="cd-glass-sweep" />
        {/* Accent border glow */}
        <div className="cd-glass-accent" style={{ boxShadow: `inset 0 0 20px ${config.accentColor}15` }} />

        <span className={`cd-glass-digit ${flip ? 'cd-digit-flip' : ''}`} style={{ color: config.accentColor }}>
          {display}
        </span>
      </div>

      {/* Label */}
      <span className="cd-glass-label">{label}</span>
    </div>
  );
};

/* ═══ BLESSINGS DATA ═══ */
const sampleBlessings = [
  { name: 'Rajesh Uncle', message: 'Wishing you both a lifetime of love and happiness!', initials: 'RU', emoji: '🎊' },
  { name: 'Priya Aunty', message: 'May your journey together be filled with joy and laughter.', initials: 'PA', emoji: '💐' },
  { name: 'Amit & Neha', message: 'Congratulations! You make a beautiful couple.', initials: 'AN', emoji: '❤️' },
  { name: 'Sharma Family', message: 'Bahut bahut badhaiyan! May God bless your union.', initials: 'SF', emoji: '🙏' },
  { name: 'Kavita Didi', message: 'So happy for you both! Can\'t wait to celebrate!', initials: 'KD', emoji: '💃' },
  { name: 'Ravi Bhai', message: 'May your love story inspire many more. Best wishes!', initials: 'RB', emoji: '✨' },
  { name: 'Meera Tai', message: 'Your bond is truly made in heaven. Lots of love!', initials: 'MT', emoji: '🌸' },
  { name: 'Vikram Ji', message: 'Wishing you a beautiful life together. God bless!', initials: 'VJ', emoji: '🕉️' },
];

/* ═══ PREMIUM BLESSING CARD ═══ */
const BlessingCard: React.FC<{ b: typeof sampleBlessings[0]; isActive?: boolean }> = ({ b, isActive }) => (
  <div className={`cd-blessing-card ${isActive ? 'cd-blessing-card-active' : ''}`}>
    {/* PeacockCorner ornaments */}
    <div className="cd-blessing-corners">
      <PeacockCorner pos="tl" />
      <PeacockCorner pos="tr" />
      <PeacockCorner pos="bl" />
      <PeacockCorner pos="br" />
    </div>
    
    {/* Card inner content */}
    <div className="cd-blessing-card-inner">
      {/* Decorative top border */}
      <div className="cd-blessing-top-border" />
      
      {/* Header with avatar */}
      <div className="cd-blessing-header">
        <div className="cd-blessing-avatar-premium">
          <span>{b.initials}</span>
          <div className="cd-avatar-glow" />
        </div>
        <div className="cd-blessing-name-wrap">
          <span className="cd-blessing-name">{b.name}</span>
          <span className="cd-blessing-emoji">{b.emoji}</span>
        </div>
      </div>
      
      {/* Message */}
      <p className="cd-blessing-message">{b.message}</p>
      
      {/* Decorative bottom flourish */}
      <div className="cd-blessing-flourish">
        <svg viewBox="0 0 60 12" fill="none" className="w-12 h-3 opacity-40">
          <path d="M0 6 Q15 0 30 6 T60 6" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary" />
        </svg>
      </div>
    </div>
    
    {/* Hover glow effect */}
    <div className="cd-blessing-glow" />
  </div>
);

/* ═══ BLESSINGS CAROUSEL WITH CONTROLS ═══ */
const BlessingsCarousel: React.FC<{ active: boolean }> = ({ active }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const totalCards = sampleBlessings.length;
  
  // Auto-play logic
  useEffect(() => {
    if (!active || isPaused) return;
    
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalCards);
    }, 4000);
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [active, isPaused, totalCards]);
  
  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);
  
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalCards);
  }, [totalCards]);
  
  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  }, []);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    setTimeout(() => setIsPaused(false), 2000);
  }, [goToNext, goToPrev]);
  
  return (
    <div 
      className="cd-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button onClick={goToPrev} className="cd-carousel-arrow cd-arrow-left" aria-label="Previous blessing">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button onClick={goToNext} className="cd-carousel-arrow cd-arrow-right" aria-label="Next blessing">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Cards Track */}
      <div 
        className="cd-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={trackRef}
          className="cd-carousel-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
          }}
        >
          {sampleBlessings.map((b, i) => (
            <div key={i} className="cd-carousel-slide">
              <BlessingCard b={b} isActive={i === currentIndex} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Dot Indicators */}
      <div className="cd-carousel-dots">
        {sampleBlessings.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`cd-carousel-dot ${i === currentIndex ? 'cd-dot-active' : ''}`}
            aria-label={`Go to blessing ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Pause indicator */}
      {isPaused && (
        <div className="cd-carousel-paused">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-primary/50">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </div>
      )}
    </div>
  );
};

/* ═══ MAIN COUNTDOWN SECTION ═══ */
const CountdownSection: React.FC<CountdownSectionProps> = ({ active, onNext }) => {
  const guestName = useGuestName();
  const [time, setTime] = useState(getTimeLeft);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [blessingMessage, setBlessingMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sparkleId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, [active]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = sparkleId.current++;
    setSparkles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 800);
  }, []);
  
  const handleSendBlessing = useCallback(() => {
    if (!blessingMessage.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setBlessingMessage('');
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  }, [blessingMessage]);

  return (
    <section className="cd-section" aria-labelledby="countdown-heading" onClick={handleClick}>
      {/* ── SHARED ROYAL BACKGROUND ── */}
      <RoyalBackground />

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="celebrations-particles" />
      </div>

      <SectionBorderFrame active={active} variant="standard" />
      <SparkleLayer sparkles={sparkles} />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-8 pt-8 pb-16">
        {/* ── Title ── */}
        <div
          className="text-center mb-10"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <p className="font-heading text-base md:text-lg italic mb-2" style={{ color: 'hsl(var(--text-cream) / 0.7)' }}>
            Our wedding celebration begins in
          </p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="countdown-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              Counting the Days
            </h2>
          </div>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">शुभ दिन की प्रतीक्षा</p>
          <GoldDivider />
        </div>

        {/* ── Glassmorphism Countdown Cards ── */}
        {time.state === 'before' ? (
          <div className="cd-cards-container">
            {/* Outer gold frame */}
            <div className="cd-cards-frame">
              <div className="cd-cards-frame-inner">
                <div className="cd-cards-grid">
                  <CountdownBox value={time.days} label="Days" idx={0} active={active} />
                  <CountdownBox value={time.hours} label="Hours" idx={1} active={active} />
                  <CountdownBox value={time.minutes} label="Min" idx={2} active={active} />
                  <CountdownBox value={time.seconds} label="Sec" idx={3} active={active} />
                </div>
              </div>
            </div>

            {/* Event Card */}
            <div
              className="cd-event-card"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(15px)',
                transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s',
              }}
            >
              <div className="cd-event-icon">
                <CalendarIcon />
              </div>
              <div>
                <p className="font-display text-sm md:text-base font-bold" style={{ color: 'hsl(var(--text-cream))' }}>
                  May 10, 2026
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ClockIcon />
                  <span className="font-ui text-xs" style={{ color: 'hsl(var(--text-cream) / 0.6)' }}>Shubh Muhurat</span>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-sm">⭐</span>
                <SparklesIcon />
              </div>
              {/* Shine sweep */}
              <div className="cd-event-sweep" />
            </div>

            {/* Magic CTA */}
            <p
              className="text-center mt-5 font-body text-xs italic cd-magic-text"
              style={{
                color: 'hsl(var(--primary) / 0.5)',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.5s ease 1s',
              }}
            >
              ✨ Click anywhere for a magical surprise ✨
            </p>
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

        {/* ── Blessings & Wishes Section ── */}
        <div className="cd-blessings-section">
          {/* Section Header */}
          <div
            className="cd-blessings-header"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s ease 0.8s',
            }}
          >
            <div className="cd-blessings-title-row">
              <DiyaIcon lit={active} />
              <h3 className="cd-blessings-title">Blessings & Wishes</h3>
              <DiyaIcon lit={active} />
            </div>
            <p className="cd-blessings-subtitle">Messages from loved ones</p>
            <p className="cd-blessings-hindi" lang="hi">प्रियजनों के आशीर्वाद</p>
            
            {/* Elegant divider */}
            <div className="cd-blessings-divider">
              <div className="cd-divider-line" />
              <span className="cd-divider-star">&#10022;</span>
              <div className="cd-divider-line" />
            </div>
          </div>

          {/* Blessings Carousel */}
          <div
            style={{
              opacity: active ? 1 : 0,
              transition: 'opacity 0.8s ease 1s',
            }}
          >
            <BlessingsCarousel active={active} />
          </div>

          {/* Send Blessing Form — Premium Design */}
          <div
            className="cd-send-card-premium"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1) 1.2s',
            }}
          >
            {/* PeacockCorner ornaments */}
            <div className="cd-send-corners">
              <PeacockCorner pos="tl" />
              <PeacockCorner pos="tr" />
              <PeacockCorner pos="bl" />
              <PeacockCorner pos="br" />
            </div>
            
            <div className="cd-send-inner">
              <h4 className="cd-send-title">Send Your Blessing</h4>
              
              {/* Guest name display (no input needed) */}
              <div className="cd-guest-badge">
                <span className="cd-guest-avatar">{guestName.slice(0, 2).toUpperCase()}</span>
                <span className="cd-guest-name">Sending as <strong>{guestName}</strong></span>
              </div>
              
              {/* Message textarea */}
              <div className="cd-input-group-premium">
                <textarea 
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  placeholder="Write your heartfelt blessing for the couple..."
                  rows={4}
                  className="cd-textarea-premium"
                  maxLength={280}
                />
                <div className="cd-textarea-footer">
                  <span className="cd-char-count">{blessingMessage.length}/280</span>
                </div>
              </div>
              
              {/* Success message */}
              {submitSuccess && (
                <div className="cd-success-message">
                  <span className="cd-success-icon">✓</span>
                  <span>Your blessing has been sent!</span>
                </div>
              )}
              
              {/* Send button */}
              <button 
                onClick={handleSendBlessing}
                disabled={isSubmitting || !blessingMessage.trim()}
                className="cd-send-btn-premium"
              >
                {isSubmitting ? (
                  <span className="cd-btn-loading">Sending...</span>
                ) : (
                  <>
                    <span className="cd-btn-text">Send Blessing</span>
                    <span className="cd-btn-sparkle">✨</span>
                  </>
                )}
                <div className="cd-btn-glow" />
              </button>
            </div>
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
