import React, { useState } from 'react';
import { weddingEvents, dayTabs } from '@/data/events';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

interface CelebrationsSectionProps {
  active: boolean;
  onNext: () => void;
}

const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ active, onNext }) => {
  const [activeDay, setActiveDay] = useState('9');

  const filteredEvents = weddingEvents.filter(e => e.eventDay === activeDay);

  return (
    <section
      className="section-container !justify-start"
      aria-labelledby="celebrations-heading"
      style={{ overflowY: 'auto' }}
    >
      <div className="jaali-overlay" />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <DiyaIcon lit={active} />
            <h2 id="celebrations-heading" className="font-heading text-2xl md:text-[40px] gold-shimmer-slow">
              Wedding Celebrations
            </h2>
          </div>
          <GoldDivider />
        </div>

        {/* Day Tabs */}
        <div
          className="sticky top-0 z-20 flex justify-center gap-1 mb-8 p-2 rounded-xl mx-auto max-w-sm"
          style={{
            background: 'hsl(var(--bg-card) / 0.9)',
            backdropFilter: 'blur(8px)',
          }}
          role="tablist"
        >
          {dayTabs.map((tab) => (
            <button
              key={tab.day}
              role="tab"
              aria-selected={activeDay === tab.day}
              onClick={() => setActiveDay(tab.day)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-ui text-sm font-medium transition-all ${
                activeDay === tab.day
                  ? 'text-primary border-b-2 border-primary bg-secondary/50'
                  : 'text-muted hover:text-cream'
              }`}
            >
              <span className="block">{tab.label}</span>
              <span className="block text-[10px] uppercase tracking-wider opacity-60">{tab.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Event Cards */}
        <div className="space-y-6" role="tabpanel">
          {filteredEvents.map((event, i) => (
            <article
              key={event.eventName}
              className="relative rounded-2xl border border-primary/20 p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(201,169,110,0.08)] group"
              style={{
                background: 'hsl(var(--bg-card))',
                animation: `fade-slide-up 0.4s ease-out ${i * 0.15}s both`,
              }}
            >
              {/* Wax seal */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                <span className="text-[10px]">{event.eventIcon}</span>
              </div>

              {/* Scroll ornament top */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />

              {/* Content */}
              <div className="text-center pt-2">
                <h3 className="font-heading font-semibold text-xl md:text-2xl text-primary mb-0.5">
                  {event.eventName}
                </h3>
                <p className="font-hindi-event text-sm text-muted mb-3" lang="hi">
                  {event.eventNameHindi}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm font-body text-cream mb-2">
                  <span>{event.eventDate}</span>
                  <span className="text-primary/30">|</span>
                  <span>{event.eventTime}</span>
                </div>

                {event.dressCode && (
                  <span
                    className="inline-block px-3 py-1 rounded-md text-[11px] font-ui font-medium border border-primary/30 text-cream mb-4"
                    style={event.dressColor ? { borderColor: event.dressColor + '60' } : {}}
                  >
                    {event.dressCode}
                  </span>
                )}

                <div className="h-px bg-primary/10 my-4" />

                <p className="font-heading text-base md:text-lg text-cream mb-1">{event.venueName}</p>
                <p className="font-body text-xs md:text-sm text-muted mb-3">{event.venueAddress}</p>

                <a
                  href={event.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-cream text-[13px] font-ui font-medium transition-all hover:border-accent group/map"
                >
                  📍 Open in Maps
                  <span className="text-primary transition-transform group-hover/map:translate-x-1">→</span>
                </a>
              </div>

              {/* Scroll ornament bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
            </article>
          ))}
        </div>

        {/* Next button */}
        <div className="text-center mt-10 pb-8">
          <button
            onClick={onNext}
            className="font-ui font-semibold text-sm md:text-base px-7 py-3.5 rounded-xl border-[1.5px] border-primary text-cream transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97] min-w-[180px] min-h-[48px]"
          >
            Next: Gallery →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CelebrationsSection;
