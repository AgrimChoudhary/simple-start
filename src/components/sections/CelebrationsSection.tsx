import React, { useState, useRef } from 'react';
import { weddingEvents, dayTabs } from '@/data/events';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';

interface CelebrationsSectionProps {
  active: boolean;
  onNext: () => void;
}

/* ═══════════════════════════════════════════════
   ORNATE SVG COMPONENTS
   ═══════════════════════════════════════════════ */

const WaxSeal: React.FC<{ icon: string }> = ({ icon }) => (
  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
    {/* Glow aura */}
    <div
      className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)',
      }}
    />
    {/* Seal body */}
    <div
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
      style={{
        background: 'radial-gradient(circle at 35% 30%, hsl(var(--card)) 0%, hsl(218 55% 11%) 100%)',
        border: '2px solid hsl(var(--primary) / 0.5)',
        boxShadow: '0 2px 12px hsl(var(--primary) / 0.15), inset 0 1px 4px hsl(var(--primary) / 0.1)',
      }}
    >
      {/* Mandala rings */}
      <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '30s' }} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.25" strokeDasharray="1.5 2.5" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.15" strokeDasharray="1 3" />
      </svg>
      <span className="text-base relative z-10 drop-shadow-sm">{icon}</span>
    </div>
  </div>
);

/* Ornate corner flourish */
const CornerFlourish: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const transforms: Record<string, string> = {
    'top-left': '',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1)',
  };
  const positions: Record<string, string> = {
    'top-left': 'top-1 left-1',
    'top-right': 'top-1 right-1',
    'bottom-left': 'bottom-1 left-1',
    'bottom-right': 'bottom-1 right-1',
  };

  return (
    <div className={`absolute ${positions[position]} w-8 h-8 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500`} aria-hidden="true">
      <svg viewBox="0 0 32 32" className="w-full h-full" style={{ transform: transforms[position] }}>
        <path d="M2,2 C2,2 2,14 8,20 C14,26 26,28 28,28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" />
        <path d="M2,2 C2,2 6,10 12,14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <circle cx="4" cy="4" r="1.5" fill="hsl(var(--primary))" opacity="0.4" />
      </svg>
    </div>
  );
};

/* Scroll ornament — top */
const ScrollOrnamentTop = () => (
  <div className="absolute top-0 left-6 right-6 h-[2px]" aria-hidden="true">
    <div className="w-full h-full" style={{
      background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.2) 20%, hsl(var(--primary) / 0.35) 50%, hsl(var(--primary) / 0.2) 80%, transparent 100%)',
    }} />
  </div>
);

/* Scroll ornament — bottom */
const ScrollOrnamentBottom = () => (
  <div className="absolute bottom-0 left-6 right-6 h-[2px]" aria-hidden="true">
    <div className="w-full h-full" style={{
      background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.15) 20%, hsl(var(--primary) / 0.25) 50%, hsl(var(--primary) / 0.15) 80%, transparent 100%)',
    }} />
  </div>
);

/* Center ornament between venue and map */
const VenueDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
    <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2))' }} />
    <svg width="12" height="12" viewBox="0 0 12 12" className="text-primary opacity-30">
      <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
    </svg>
    <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.2), transparent)' }} />
  </div>
);

/* ═══════════════════════════════════════════════
   EVENT CARD — Royal Farmaan
   ═══════════════════════════════════════════════ */
const EventCard: React.FC<{
  event: typeof weddingEvents[0];
  index: number;
  animKey: string;
}> = ({ event, index }) => {
  return (
    <article
      className="celebrations-card group"
      style={{
        animationDelay: `${index * 0.18}s`,
      }}
    >
      <WaxSeal icon={event.eventIcon} />
      <ScrollOrnamentTop />
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      {/* Inner content */}
      <div className="relative text-center pt-5 pb-2 px-2">
        {/* Event Name — gold heading */}
        <h3 className="font-heading font-semibold text-[22px] md:text-[26px] text-primary mb-1 tracking-wide leading-tight">
          {event.eventName}
        </h3>
        <p className="font-hindi-event text-[13px] md:text-sm text-muted mb-5" lang="hi">
          {event.eventNameHindi}
        </p>

        {/* Date & Time row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-[13px] md:text-sm font-body">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" className="opacity-60">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
            <span className="text-foreground/85">{event.eventDate}</span>
          </div>
          <div className="w-px h-4 bg-primary/20" />
          <div className="flex items-center gap-2 text-[13px] md:text-sm font-body">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" className="opacity-60">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-foreground/85">{event.eventTime}</span>
          </div>
        </div>

        {/* Dress Code Badge */}
        {event.dressCode && (
          <div className="mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-ui font-medium tracking-wide uppercase transition-all duration-300 group-hover:shadow-sm"
              style={{
                border: `1px solid ${event.dressColor ? event.dressColor + '50' : 'hsl(var(--primary) / 0.25)'}`,
                background: event.dressColor ? event.dressColor + '08' : 'hsl(var(--primary) / 0.04)',
                color: 'hsl(var(--text-cream))',
              }}
            >
              {event.dressColor && (
                <span
                  className="w-3 h-3 rounded-full border border-white/15 shadow-inner"
                  style={{ backgroundColor: event.dressColor }}
                />
              )}
              👗 {event.dressCode}
            </span>
          </div>
        )}

        <VenueDivider />

        {/* Venue Info */}
        <div className="relative">
          <p className="font-heading font-semibold text-[17px] md:text-lg text-foreground/90 mb-1 tracking-wide">
            {event.venueName}
          </p>
          <p className="font-body text-xs md:text-[13px] text-muted leading-relaxed mb-5">
            {event.venueAddress}
          </p>

          {/* Map Button — pill style */}
          <a
            href={event.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="celebrations-map-btn"
          >
            <span className="text-sm">📍</span>
            <span>Open in Maps</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary transition-transform duration-300 group-hover/map:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <ScrollOrnamentBottom />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 60%)',
        }}
      />
    </article>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CELEBRATIONS SECTION
   ═══════════════════════════════════════════════ */
const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ active, onNext }) => {
  const [activeDay, setActiveDay] = useState('9');
  const [tabAnimKey, setTabAnimKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = weddingEvents.filter(e => e.eventDay === activeDay);

  const handleTabSwitch = (day: string) => {
    if (day === activeDay) return;
    setActiveDay(day);
    setTabAnimKey(prev => prev + 1);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="celebrations-section"
      aria-labelledby="celebrations-heading"
      ref={scrollRef}
    >
      {/* ── Multi-layer background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(var(--card) / 0.6) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, hsl(218 50% 12% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, hsl(218 50% 12% / 0.4) 0%, transparent 50%),
            hsl(var(--background))
          `,
        }} />
        {/* Jaali overlay */}
        <div className="jaali-overlay" />
        {/* Floating gold dust particles */}
        <div className="celebrations-particles" />
      </div>

      {/* ── Paisley border columns ── */}
      <div className="celebrations-border-left" aria-hidden="true" />
      <div className="celebrations-border-right" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 md:px-6 pt-10 pb-16">

        {/* Section Heading */}
        <div className="text-center mb-8" style={{ animation: 'fade-slide-up 0.6s ease-out' }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="celebrations-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              Wedding Celebrations
            </h2>
          </div>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">शुभ विवाह समारोह</p>
          <GoldDivider />
        </div>

        {/* ── Day Tabs — glass-morphism sticky bar ── */}
        <div className="celebrations-tabs-wrapper" role="tablist" aria-label="Wedding days">
          <div className="flex p-1.5 gap-1">
            {dayTabs.map((tab) => {
              const isActive = activeDay === tab.day;
              return (
                <button
                  key={tab.day}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabSwitch(tab.day)}
                  className={`celebrations-tab ${isActive ? 'celebrations-tab--active' : ''}`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg celebrations-tab-bg" />
                  )}
                  <span className="relative z-10 block text-[13px] md:text-sm font-semibold">{tab.label}</span>
                  <span className="relative z-10 block text-[10px] uppercase tracking-[0.18em] opacity-50 mt-0.5">
                    {tab.subtitle}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-10 rounded-full bg-primary" style={{ animation: 'draw-divider 0.35s ease-out forwards' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Event Cards ── */}
        <div
          className="space-y-10 mt-2"
          role="tabpanel"
          aria-label={`Events on day ${activeDay}`}
          key={`panel-${activeDay}-${tabAnimKey}`}
        >
          {filteredEvents.map((event, i) => (
            <EventCard
              key={event.eventName}
              event={event}
              index={i}
              animKey={`${activeDay}-${tabAnimKey}-${i}`}
            />
          ))}
        </div>

        {/* ── Next Button ── */}
        <div className="text-center mt-14 pb-4">
          <button onClick={onNext} className="nav-button-secondary">
            Next: Gallery →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CelebrationsSection;
