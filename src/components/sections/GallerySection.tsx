import React, { useState } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';

interface GallerySectionProps {
  active: boolean;
  onNext: () => void;
}

// Placeholder gallery images - will be replaced with AI-generated or real photos
const galleryImages = [
  { id: 1, alt: 'Palace courtyard at night with golden lamplight and marigold garlands' },
  { id: 2, alt: 'Elegant couple silhouette under ornate Rajasthani arch' },
  { id: 3, alt: 'Marigold flowers and golden bangles on midnight blue velvet' },
  { id: 4, alt: 'Rajasthani haveli doorway at twilight with lit diyas' },
  { id: 5, alt: 'Indian wedding mandap with marigold garlands and fairy lights' },
  { id: 6, alt: 'Mehndi hands holding each other with gold jewelry' },
];

const GallerySection: React.FC<GallerySectionProps> = ({ active, onNext }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [buttonVisible, setButtonVisible] = useState(false);

  React.useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <section
      className="section-container !justify-start"
      aria-labelledby="gallery-heading"
      style={{ overflowY: 'auto' }}
    >
      <div className="jaali-overlay" />
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-12">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <DiyaIcon lit={active} />
            <h2 id="gallery-heading" className="font-heading text-2xl md:text-[40px] gold-shimmer-slow">
              Our Moments
            </h2>
          </div>
          <GoldDivider />
        </div>

        {/* Jharokha Video Frame */}
        <div className="mx-auto max-w-[640px] mb-8">
          <div
            className="relative rounded-t-[50%] border-[3px] border-primary p-2 mx-4 md:mx-auto"
            style={{
              boxShadow: '0 0 40px hsl(var(--gold-primary) / 0.06)',
              animation: active ? 'fade-in 0.6s ease-out' : 'none',
            }}
          >
            <div
              className="rounded-t-[48%] overflow-hidden aspect-video flex items-center justify-center"
              style={{ background: 'hsl(var(--bg-card))' }}
            >
              {/* Video placeholder */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center mx-auto mb-3 hover:border-primary transition-colors cursor-pointer">
                  <span className="text-primary text-2xl ml-1">▶</span>
                </div>
                <p className="font-ui text-muted text-xs">Pre-Wedding Video</p>
              </div>
            </div>
            {/* Gold corner ornaments */}
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br" />
          </div>
          <p className="text-center font-heading italic text-sm md:text-base text-muted mt-4">
            <span className="font-hindi" lang="hi">हमारी कहानी</span> · Our Journey Together
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
          <div className="h-px bg-primary/25 flex-1 max-w-[100px]" />
          <span className="text-primary text-sm">🌼</span>
          <div className="h-px bg-primary/25 flex-1 max-w-[100px]" />
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
          {galleryImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightbox(i)}
              className="relative aspect-[4/5] rounded-xl border border-primary/15 overflow-hidden group transition-all hover:border-primary/40 hover:shadow-[0_0_20px_hsl(38_36%_60%_/_0.08)] focus:outline-none focus:ring-2 focus:ring-primary"
              style={{
                background: 'hsl(var(--bg-card))',
                animation: active ? `fade-slide-up 0.4s ease-out ${0.8 + i * 0.1}s both` : 'none',
              }}
              aria-label={`View photo: ${img.alt}`}
            >
              {/* Shimmer placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-card">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 30%, hsl(var(--gold-primary) / 0.05) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'gold-shimmer 2s linear infinite',
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-3xl">
                📷
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95"
            onClick={() => setLightbox(null)}
          >
            <div className="relative max-w-3xl w-full mx-4 aspect-[4/5] rounded-2xl border border-primary/20 bg-card flex items-center justify-center">
              <p className="text-muted font-ui text-sm">{galleryImages[lightbox].alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary text-cream flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Close lightbox"
              >
                ✕
              </button>
              {lightbox > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Previous photo"
                >
                  ←
                </button>
              )}
              {lightbox < galleryImages.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Next photo"
                >
                  →
                </button>
              )}
            </div>
          </div>
        )}

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
            Next: Countdown →
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
