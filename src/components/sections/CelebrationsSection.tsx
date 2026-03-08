import React, { useState, useEffect, useRef } from 'react';
import { weddingEvents, dayTabs } from '@/data/events';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

interface CelebrationsSectionProps {
  active: boolean;
  onNext: () => void;
}

/* ── Ornate SVG Elements ── */

const WaxSeal: React.FC<{ icon: string }> = ({ icon }) => (
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
    {/* Outer glow ring */}
    <div className="absolute inset-0 rounded-full bg-primary/10 blur-md scale-150 group-hover:bg-primary/20 transition-colors duration-500" />
    {/* Seal body */}
    <div className="relative w-9 h-9 rounded-full border-2 border-primary/50 flex items-center justify-center group-hover:border-primary/80 transition-all duration-500"
      style={{ background: 'radial-gradient(circle at 40% 35%, hsl(var(--card)) 0%, hsl(var(--background)) 100%)' }}
    >
      {/* Inner mandala ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.3" strokeDasharray="2 3" />
        <circle cx="18" cy="18" r="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.2" />
      </svg>
      <span className="text-sm relative z-10">{icon}</span>
    </div>
  </div>
);

const ScrollOrnamentTop = () => (
  <div className="absolute top-0 left-4 right-4 overflow-hidden" aria-hidden="true">
    <svg className="w-full h-3" viewBox="0 0 400 12" preserveAspectRatio="none">
      <path
        d="M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6 C350,2 400,10 400,6"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15"
      />
      <path
        d="M0,8 C80,4 160,12 200,6 C240,0 320,8 400,4"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.08"
      />
    </svg>
  </div>
);

const ScrollOrnamentBottom = () => (
  <div className="absolute bottom-0 left-4 right-4 overflow-hidden" aria-hidden="true">
    <svg className="w-full h-3" viewBox="0 0 400 12" preserveAspectRatio="none">
      <path
        d="M0,6 C50,10 100,2 150,6 C200,10 250,2 300,6 C350,10 400,2 400,6"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.15"
      />
      <path
        d="M0,4 C80,8 160,0 200,6 C240,12 320,4 400,8"
        fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" opacity="0.08"
      />
    </svg>
  </div>
);

/* ── Paisley Side Borders ── */
const PaisleyBorder: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div
    className={`fixed top-0 bottom-0 w-16 pointer-events-none z-0 ${side === 'left' ? 'left-0' : 'right-0'}`}
    style={{ opacity: 0.04 }}
    aria-hidden="true"
  >
    <svg className="w-full h-full" viewBox="0 0 64 800" preserveAspectRatio="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`translate(32, ${40 + i * 65}) ${side === 'right' ? 'scale(-1,1)' : ''}`}>
          <path
            d="M0,-20 C15,-18 20,-5 15,5 C10,15 -5,18 -15,10 C-10,5 -5,-5 0,-20Z"
            fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8"
          />
          <circle cx="0" cy="-5" r="2" fill="hsl(var(--primary))" opacity="0.3" />
        </g>
      ))}
    </svg>
  </div>
);

/* ── Event Card ── */
const EventCard: React.FC<{
  event: typeof weddingEvents[0];
  index: number;
  animKey: string;
}> = ({ event, index, animKey }) => {
  return (
    <article
      key={animKey}
      className="relative rounded-2xl border border-primary/20 p-6 md:p-8 transition-all duration-500 hover:border-primary/40 group card-farmaan"
      style={{
        background: 'hsl(var(--bg-card))',
        boxShadow: '0 4px 20px rgba(201, 169, 110, 0.04)',
        animation: `celebrations-card-in 0.5s cubic-bezier(0.22,0.61,0.36,1) ${index * 0.15}s both`,
      }}
    >
      <WaxSeal icon={event.eventIcon} />
      <ScrollOrnamentTop />

      {/* Content */}
      <div className="text-center pt-4">
        {/* Event Name */}
        <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-0.5 tracking-wide">
          {event.eventName}
        </h3>
        <p className="font-hindi-event text-sm text-muted mb-4" lang="hi">
          {event.eventNameHindi}
        </p>

        {/* Date & Time */}
        <div className="flex items-center justify-center gap-3 text-sm font-body mb-3">
          <span className="text-foreground/80">{event.eventDate}</span>
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span className="text-foreground/80">{event.eventTime}</span>
        </div>

        {/* Dress Code Badge */}
        {event.dressCode && (
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-ui font-medium border transition-colors duration-300"
              style={{
                borderColor: event.dressColor
                  ? event.dressColor + '60'
                  : 'hsl(var(--primary) / 0.3)',
                color: 'hsl(var(--text-cream))',
              }}
            >
              {event.dressColor && (
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: event.dressColor }}
                />
              )}
              {event.dressCode}
            </span>
          </div>
        )}

        {/* Separator */}
        <div className="h-px bg-primary/10 my-4 mx-auto max-w-[200px]" />

        {/* Venue */}
        <p className="font-heading font-medium text-base md:text-lg text-foreground mb-1">
          {event.venueName}
        </p>
        <p className="font-body text-xs md:text-sm text-muted mb-4">
          {event.venueAddress}
        </p>

        {/* Map Button */}
        <a
          href={event.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-[13px] font-ui font-medium transition-all duration-300 hover:border-accent group/map"
          style={{ color: 'hsl(var(--text-cream))' }}
        >
          <span>📍</span>
          <span>Open in Maps</span>
          <span className="text-primary transition-transform duration-300 group-hover/map:translate-x-1">→</span>
        </a>
      </div>

      <ScrollOrnamentBottom />

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 4px 30px rgba(201, 169, 110, 0.08), inset 0 0 30px rgba(201, 169, 110, 0.02)' }}
      />
    </article>
  );
};

/* ── Main Component ── */
const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ active, onNext }) => {
  const [activeDay, setActiveDay] = useState('9');
  const [tabAnimKey, setTabAnimKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEvents = weddingEvents.filter(e => e.eventDay === activeDay);

  const handleTabSwitch = (day: string) => {
    if (day === activeDay) return;
    setActiveDay(day);
    setTabAnimKey(prev => prev + 1);
    // Scroll back to top of cards
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className="section-container !justify-start"
      aria-labelledby="celebrations-heading"
      style={{ overflowY: 'auto' }}
      ref={scrollRef}
    >
      <div className="jaali-overlay" />
      <PaisleyBorder side="left" />
      <PaisleyBorder side="right" />

      {/* Subtle top-to-bottom gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.97) 30%, hsl(var(--card) / 0.3) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-6" style={{ animation: 'fade-slide-up 0.6s ease-out' }}>
          <div className="flex items-center justify-center gap-3">
            <DiyaIcon lit={active} />
            <h2
              id="celebrations-heading"
              className="font-heading text-2xl md:text-[40px] gold-shimmer-slow leading-tight"
            >
              Wedding Celebrations
            </h2>
          </div>
          <GoldDivider />
        </div>

        {/* Day Tabs — Sticky glass panel */}
        <div
          className="sticky top-0 z-20 mb-8 rounded-xl mx-auto max-w-md"
          style={{
            background: 'hsl(var(--bg-card) / 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid hsl(var(--primary) / 0.1)',
          }}
          role="tablist"
          aria-label="Wedding days"
        >
          <div className="flex p-1.5 gap-1">
            {dayTabs.map((tab) => {
              const isActive = activeDay === tab.day;
              return (
                <button
                  key={tab.day}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabSwitch(tab.day)}
                  className={`flex-1 relative py-3 px-3 rounded-lg font-ui text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted hover:text-foreground/70'
                  }`}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'hsl(var(--secondary) / 0.7)',
                        animation: 'scale-fade-in 0.25s ease-out',
                      }}
                    />
                  )}
                  <span className="relative z-10 block text-[13px] md:text-sm font-semibold">{tab.label}</span>
                  <span className="relative z-10 block text-[10px] uppercase tracking-[0.15em] opacity-60 mt-0.5">
                    {tab.subtitle}
                  </span>
                  {/* Active gold underline */}
                  {isActive && (
                    <div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full bg-primary"
                      style={{ animation: 'draw-divider 0.4s ease-out forwards' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Cards */}
        <div
          className="space-y-8"
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

        {/* Next button — always visible */}
        <div className="text-center mt-12 pb-10">
          <button
            onClick={onNext}
            className="nav-button-secondary"
          >
            Next: Gallery →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CelebrationsSection;
