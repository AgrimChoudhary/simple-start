import React, { useState, useEffect, useRef, useCallback } from 'react';
import DiyaIcon from '@/components/global/DiyaIcon';
import GoldDivider from '@/components/global/GoldDivider';
import SectionBorderFrame from '@/components/global/SectionBorderFrame';
import RoyalBackground from '@/components/global/RoyalBackground';
import FamilySection from '@/components/sections/FamilySection';

interface GallerySectionProps {
  active: boolean;
  onNext: () => void;
}

const galleryImages = [
  { id: 1, src: '/images/gallery/moment-1.jpg', alt: 'Marriage Ritual', color: 'hsl(38 30% 25%)' },
  { id: 2, src: '/images/gallery/moment-2.jpg', alt: 'Couple in Traditional Attire', color: 'hsl(218 40% 18%)' },
  { id: 3, src: '/images/gallery/moment-3.jpg', alt: 'Wedding Couple', color: 'hsl(38 35% 22%)' },
  { id: 4, src: '/images/gallery/moment-4.jpg', alt: 'Royal Wedding Pose', color: 'hsl(218 35% 16%)' },
  { id: 5, src: '/images/gallery/moment-5.jpg', alt: 'Moment of Love', color: 'hsl(25 30% 20%)' },
  { id: 6, src: '/images/gallery/moment-6.jpg', alt: 'Couple Portrait', color: 'hsl(38 28% 22%)' },
];

/* ═══════════════════════════════════════════════
   JHAROKHA ARCH — SVG Palace Window Frame
   ═══════════════════════════════════════════════ */
const JharokhaFrame: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => (
  <div
    className="relative mx-auto max-w-[640px] px-4 md:px-0"
    style={{ animation: active ? 'gallery-frame-in 0.8s cubic-bezier(0.22,0.61,0.36,1) forwards' : 'none' }}
  >
    {/* Outer glow */}
    <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{
      background: 'radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
    }} />

    {/* Frame container */}
    <div className="relative">
      {/* Arch SVG frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 640 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Outer arch border */}
        <path
          d="M0,400 L0,140 Q0,0 320,0 Q640,0 640,140 L640,400"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          opacity="0.7"
        />
        {/* Inner arch detail */}
        <path
          d="M12,400 L12,145 Q12,12 320,12 Q628,12 628,145 L628,400"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity="0.2"
        />
        {/* Keystone ornament at top */}
        <g transform="translate(310, 4)">
          <path d="M10 0L12.5 8L20 10L12.5 12L10 20L7.5 12L0 10L7.5 8Z" fill="hsl(var(--primary))" opacity="0.5" />
        </g>
      </svg>

      {/* Content clipped to arch shape */}
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: 'polygon(0% 100%, 0% 35%, 5% 18%, 15% 7%, 30% 1.5%, 50% 0%, 70% 1.5%, 85% 7%, 95% 18%, 100% 35%, 100% 100%)',
          borderRadius: '0 0 12px 12px',
        }}
      >
        {/* Inner padding area */}
        <div className="p-2" style={{ background: 'hsl(var(--card))' }}>
          <div className="rounded-lg overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom corners — gold floral ornaments */}
      <div className="absolute -bottom-1 -left-1 w-8 h-8 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <path d="M4,28 C4,20 8,12 16,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
          <path d="M2,24 C6,18 10,14 14,10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.25" />
          <circle cx="5" cy="27" r="2" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
      <div className="absolute -bottom-1 -right-1 w-8 h-8 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
          <path d="M4,28 C4,20 8,12 16,8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
          <path d="M2,24 C6,18 10,14 14,10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.25" />
          <circle cx="5" cy="27" r="2" fill="hsl(var(--primary))" opacity="0.3" />
        </svg>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   PHOTO CARD with shimmer placeholder
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   FLORAL ORNATE FRAME — Ivory & Embossed Gold
   ═══════════════════════════════════════════════ */
const FloralOrnateFrame: React.FC<{ children: React.ReactNode; active: boolean; index: number }> = ({ children, active, index }) => (
  <div 
    className={`floral-frame-wrapper ${active ? 'royal-frame-active' : ''}`}
    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
  >
    {/* Floral corners inspired by the reference image */}
    <div className="floral-ornament ornament-tl">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
        <path d="M10,40 Q15,60 40,65" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M40,10 Q60,15 65,40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
    <div className="floral-ornament ornament-tr">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>
    <div className="floral-ornament ornament-bl">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>
    <div className="floral-ornament ornament-br">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,10 C10,10 20,5 35,15 C45,22 40,35 40,35 C40,35 52,25 65,30 C80,35 75,55 75,55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15,15 C25,12 40,18 40,30 C40,42 28,48 18,40 C8,32 12,20 22,18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill="currentColor" />
      </svg>
    </div>

    {/* Side vines */}
    <div className="floral-ornament ornament-side-l">
      <svg viewBox="0 0 20 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,0 Q15,25 5,50 T10,100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
    <div className="floral-ornament ornament-side-r">
      <svg viewBox="0 0 20 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,0 Q15,25 5,50 T10,100" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>

    {/* Image container handles clipping */}
    <div className="floral-image-container">
      {/* Inner gold lining - overlay on image */}
      <div className="floral-inner-lining" />
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   PHOTO CARD
   ═══════════════════════════════════════════════ */
const PhotoCard: React.FC<{
  image: typeof galleryImages[0];
  index: number;
  active: boolean;
  onClick: () => void;
}> = ({ image, index, active, onClick }) => (
  <button
    onClick={onClick}
    className={`gallery-photo-card group ${active ? 'active' : ''}`}
    style={{
      animationDelay: active ? `${0.5 + index * 0.15}s` : '0s',
    }}
    aria-label={`View photo: ${image.alt}`}
  >
    <FloralOrnateFrame active={active} index={index}>
      {/* Background Color/Shimmer */}
      <div className="absolute inset-0" style={{ background: image.color }}>
        <div className="gallery-shimmer-sweep" />
      </div>

      {/* Image - Full Cover */}
      <img
        src={image.src}
        alt={image.alt}
        className="relative w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 z-20" />
    </FloralOrnateFrame>
  </button>
);

/* ═══════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════ */
const Lightbox: React.FC<{
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const image = images[currentIndex];

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onPrev();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, onClose, onPrev, onNext, images.length]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={onClose}
      style={{ animation: 'gallery-lightbox-in 0.3s ease-out' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />

      {/* Image container */}
      <div
        className="relative z-10 max-w-4xl w-full mx-4 aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: image.color,
          border: '1px solid hsl(var(--primary) / 0.2)',
          boxShadow: '0 20px 60px hsl(var(--background) / 0.8)',
        }}
      >
        {/* Shimmer placeholder */}
        <div className="absolute inset-0">
          <div className="gallery-shimmer-sweep" />
        </div>

        {/* High Resolution Image */}
        <img
          src={image.src}
          alt={image.alt}
          className="relative w-full h-full object-contain"
          style={{ animation: 'fade-in 0.5s ease-out' }}
        />

        {/* Gold frame border */}
        <div className="absolute inset-0 rounded-2xl border border-primary/20 pointer-events-none" />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'hsl(var(--card) / 0.9)',
          border: '1px solid hsl(var(--primary) / 0.3)',
        }}
        aria-label="Close lightbox"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="gallery-lightbox-arrow left-4 md:left-8"
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="gallery-lightbox-arrow right-4 md:right-8"
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-6 h-2 bg-primary'
                : 'w-2 h-2 bg-primary/30 hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MARIGOLD DIVIDER
   ═══════════════════════════════════════════════ */
const MarigoldDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
    <div className="h-px flex-1 max-w-[100px]" style={{
      background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25))',
    }} />
    <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary opacity-50">
      {/* Marigold flower */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="12" cy="5"
          rx="2.5" ry="4"
          fill="currentColor"
          opacity="0.35"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
    <div className="h-px flex-1 max-w-[100px]" style={{
      background: 'linear-gradient(90deg, hsl(var(--primary) / 0.25), transparent)',
    }} />
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN GALLERY SECTION
   ═══════════════════════════════════════════════ */
const GallerySection: React.FC<GallerySectionProps> = ({ active, onNext }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setButtonVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, [active]);

  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section
      className="gallery-section"
      aria-labelledby="gallery-heading"
    >
      {/* ── Royal Background (same as Events section) ── */}
      <RoyalBackground />

      {/* Border frame */}
      <SectionBorderFrame active={active} variant="standard" />

      {/* Duplicate bg close removed */}
      <div className="absolute inset-0 pointer-events-none hidden" aria-hidden="true">
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-10 pb-16">

        {/* Section Heading */}
        {/* ── Family Section (shown first) ── */}
        <FamilySection active={active} />

        {/* ── Gallery Heading ── */}
        <div className="text-center mb-8" style={{ animation: active ? 'fade-slide-up 0.5s ease-out 0.6s both' : 'none' }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <DiyaIcon lit={active} />
            <h2 id="gallery-heading" className="font-heading text-[28px] md:text-[42px] gold-shimmer-slow leading-none">
              Our Moments
            </h2>
          </div>
          <p className="font-hindi text-sm text-muted mt-1" lang="hi">हमारे पल</p>
          <GoldDivider />
        </div>



        {/* ── Photo Gallery ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-10">
          {galleryImages.map((img, i) => (
            <PhotoCard
              key={img.id}
              image={img}
              index={i}
              active={active}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        {/* ── Next Button ── */}
        <div className="text-center pb-4">
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
            Next: Countdown →
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightbox}
          onClose={closeLightbox}
          onPrev={() => setLightbox(Math.max(0, lightbox - 1))}
          onNext={() => setLightbox(Math.min(galleryImages.length - 1, lightbox + 1))}
        />
      )}
    </section>
  );
};

export default GallerySection;
