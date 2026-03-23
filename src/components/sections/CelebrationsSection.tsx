import React, { useState, useRef, useEffect } from 'react';
import { weddingEvents, dayTabs } from '@/data/events';

import RoyalBackground from '@/components/global/RoyalBackground';
import HangingDecors from '@/components/global/HangingDecors';
import PeacockCorner from '@/components/global/PeacockCorner';

interface CelebrationsSectionProps {
  active: boolean;
  onNext: () => void;
}





/* ═══════════════════════════════════════════════
   ORNATE GOLDEN FRAME
   ═══════════════════════════════════════════════ */

const OrnateFrame: React.FC<{ children: React.ReactNode; glowColor?: string }> = ({
  children, glowColor = '#FFD700'
}) => (
  <div className="cel-frame-wrapper" style={{ 
    position: 'relative', 
    marginTop: '0px',
    padding: '2.5px', // Space for the rotating border glow
    borderRadius: '24px',
    overflow: 'hidden',
    background: 'rgba(0,0,0,0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  }}>
    {/* Rotating Glow Border Element */}
    <div className="cel-glow-border-layer" />

    {/* Inner background container */}
    <div style={{
      position: 'relative',
      borderRadius: '22px', 
      background: 'linear-gradient(180deg, rgba(8, 20, 65, 0.92) 0%, rgba(12, 28, 85, 1) 50%, rgba(10, 24, 75, 0.92) 100%)',
      boxShadow: `inset 0 0 50px rgba(0,20,80,0.4)`,
      padding: '32px 16px 20px',
      zIndex: 1,
      transformStyle: 'preserve-3d', // Allow children to use Z-depth
    }}>
      {/* Decorative inner framing line */}
      <div style={{ 
        position: 'absolute', 
        inset: '8px', 
        border: '1px solid rgba(212, 175, 55, 0.25)', 
        borderRadius: '16px', 
        zIndex: 0, 
        pointerEvents: 'none' 
      }} />

      {/* Decorative inner bottom border */}
      <div style={{ position: 'absolute', bottom: '12px', left: '30px', right: '30px', height: '12px', zIndex: 0, borderBottom: '1px solid rgba(212,175,55,0.3)', opacity: 0.6 }}>
        <div style={{ position: 'absolute', bottom: '-3px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
          {[...Array(7)].map((_, i) => <div key={i} style={{ width: '4px', height: '4px', background: '#D4AF37', transform: 'rotate(45deg)' }} />)}
        </div>
      </div>

      {/* Shimmer effect layer */}
      <div className="cel-frame-shimmer" style={{ borderRadius: '22px' }} />

      {children}
    </div>

    {/* Final interactive border spotlight layer */}
    <div className="cel-border-spotlight" />

    {/* SVG Corners (adjusted for curved corners) */}
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      <PeacockCorner pos="tl" />
      <PeacockCorner pos="tr" />
      <PeacockCorner pos="bl" />
      <PeacockCorner pos="br" />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   DIYA COMPONENT
   ═══════════════════════════════════════════════ */
const Diya: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg viewBox="0 0 40 48" width={36 * scale} height={44 * scale} aria-hidden="true">
    {/* Flame */}
    <ellipse cx="20" cy="8" rx="4" ry="7" fill="#FF6F00" opacity="0.9">
      <animate attributeName="ry" values="7;9;7;6;7" dur="1.5s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="20" cy="9" rx="2.2" ry="4.5" fill="#FFD740" opacity="0.95">
      <animate attributeName="ry" values="4.5;6;4.5;3.5;4.5" dur="1.5s" repeatCount="indefinite"/>
    </ellipse>
    {/* Glow */}
    <radialGradient id="diGlow">
      <stop offset="0%" stopColor="#FF6F00" stopOpacity="0.5"/>
      <stop offset="100%" stopColor="#FF6F00" stopOpacity="0"/>
    </radialGradient>
    <circle cx="20" cy="10" r="10" fill="url(#diGlow)">
      <animate attributeName="r" values="10;13;10;9;10" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    {/* Wick */}
    <line x1="20" y1="15" x2="20" y2="19" stroke="#4E342E" strokeWidth="1.5"/>
    {/* Diya bowl */}
    <path d="M10 22 Q10 34 20 36 Q30 34 30 22 Q27 20 20 20 Q13 20 10 22Z" fill="#E65100"/>
    <path d="M10 22 Q10 28 20 30 Q30 28 30 22" fill="#BF360C" opacity="0.5"/>
    {/* Gold rim */}
    <ellipse cx="20" cy="22" rx="10" ry="3" fill="none" stroke="#FFD700" strokeWidth="1.5"/>
    <path d="M8 30 Q8 38 20 40 Q32 38 32 30" fill="none" stroke="#FFD700" strokeWidth="1"/>
    {/* Base */}
    <ellipse cx="20" cy="42" rx="9" ry="3" fill="#FF8F00" opacity="0.6"/>
  </svg>
);

/* ═══════════════════════════════════════════════
   TOP ICON BADGE (seal above card)
   ═══════════════════════════════════════════════ */
const EventBadge: React.FC<{ icon: string }> = ({ icon }) => (
  <div className="cel-badge-wrapper" style={{
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: 'translateX(-50%) translateZ(50px)', // Float 50px above the card
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FFD700, #B8860B)', 
    padding: '2px', 
    boxShadow: '0 8px 20px rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.5)',
    transformStyle: 'preserve-3d',
    animation: 'cel-float 3s ease-in-out infinite',
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, #1E3A8A 0%, #0F172A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))',
    }}>
      {icon}
    </div>
    
    {/* Decorative side swashes */}
    <svg width="100" height="20" viewBox="0 0 100 20" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, pointerEvents: 'none' }}>
      <path d="M 0 10 Q 20 10 25 5 Q 30 0 35 10" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <path d="M 100 10 Q 80 10 75 5 Q 70 0 65 10" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      <circle cx="5" cy="10" r="1.5" fill="#FFD700"/>
      <circle cx="95" cy="10" r="1.5" fill="#FFD700"/>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   EVENT SPECIFIC BOTTOM PROPS
   ═══════════════════════════════════════════════ */

const SharedPeacockDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <linearGradient id="pbod" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF"/>
        <stop offset="50%" stopColor="#0277BD"/>
        <stop offset="100%" stopColor="#1A237E"/>
      </linearGradient>
      <linearGradient id="pwin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AEEA00"/>
        <stop offset="50%" stopColor="#00B0FF"/>
        <stop offset="100%" stopColor="#000051"/>
      </linearGradient>
      
      {/* Peacock SVG Template */}
      <g id="mini-peacock">
        {/* Tail */}
        <g className="cel-peacock-tail-group">
          <path d="M-10 10 C-30 -10, -50 20, -60 40 C-30 60, 0 30, 0 10Z" fill="#004D40"/>
          <path d="M-5 15 C-20 0, -40 25, -45 40 C-20 50, 0 30, -5 15Z" fill="#00695C"/>
          {/* Eyes on tail */}
          <ellipse cx="-45" cy="30" rx="3" ry="5" fill="#D4AF37" transform="rotate(-30 -45 30)"/>
          <circle cx="-45" cy="30" r="1.5" fill="#0D47A1"/>
          <ellipse cx="-35" cy="40" rx="4" ry="6" fill="#D4AF37" transform="rotate(-50 -35 40)"/>
          <circle cx="-35" cy="40" r="2" fill="#0D47A1"/>
          <ellipse cx="-20" cy="45" rx="3" ry="5" fill="#D4AF37" transform="rotate(-70 -20 45)"/>
          <circle cx="-20" cy="45" r="1.5" fill="#0D47A1"/>
        </g>
        {/* Neck & Head (Placed behind body for seamless animation) */}
        <g className="cel-peacock-neck-group">
          <path d="M8 12 C10 0, 15 -10, 20 -15 C25 -10, 25 0, 15 15" fill="url(#pbod)"/>
          <circle cx="21" cy="-17" r="6" fill="#0277BD"/>
          {/* Beak */}
          <polygon points="26,-18 32,-15 25,-14" fill="#FFD700"/>
          {/* Crest */}
          <path d="M20 -23 L18 -30 M22 -23 L22 -32 M24 -23 L26 -30" stroke="#00E5FF" strokeWidth="0.8"/>
          <circle cx="18" cy="-30" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          <circle cx="22" cy="-32" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          <circle cx="26" cy="-30" r="1" fill="#FFD700" className="cel-peacock-crest-dot" />
          {/* Eye */}
          <circle cx="22" cy="-18" r="1" fill="#FFF"/>
        </g>
        
        {/* Body */}
        <ellipse cx="0" cy="15" rx="14" ry="10" fill="url(#pbod)" className="cel-peacock-body" />
        
        {/* Wing */}
        <path d="M0 10 C-10 10, -20 20, -10 25 C0 20, 10 15, 0 10Z" fill="url(#pwin)" className="cel-peacock-wing" />
      </g>
    </defs>
  </svg>
);

const EventBottomDecor: React.FC = () => (
  <svg viewBox="0 0 340 120" width="100%" height="100%" style={{ maxWidth: '280px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}>
    {/* Platform */}
    <ellipse cx="170" cy="95" rx="70" ry="15" fill="#0F172A" stroke="#D4AF37" strokeWidth="2"/>
    <ellipse cx="170" cy="95" rx="60" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2"/>

    {/* Flanking Peacocks */}
    <g transform="translate(60, 60) scale(1.1)">
      <use href="#mini-peacock" />
    </g>
    <g transform="translate(280, 60) scale(-1.1, 1.1)">
      <use href="#mini-peacock" />
    </g>

    {/* Center Diya / Plate */}
    <g transform="translate(150, 65) scale(1)">
      <ellipse cx="20" cy="18" rx="15" ry="5" fill="#B8860B"/>
      <path d="M5 18 Q5 35 20 35 Q35 35 35 18Z" fill="#D4AF37"/>
      
      {/* Animated Flame */}
      <g className="cel-diya-flame-inner">
        <ellipse cx="20" cy="8" rx="4" ry="8" fill="#FF9800"/>
        <ellipse cx="20" cy="10" rx="2" ry="5" fill="#FFF59D"/>
      </g>
      
      {/* Flame Glow */}
      <circle cx="20" cy="10" r="12" fill="rgba(255, 152, 0, 0.4)" className="cel-diya-flame-glow" style={{ mixBlendMode: 'screen' }}/>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   EVENT CARD
   ═══════════════════════════════════════════════ */
const EventCard: React.FC<{
  event: typeof weddingEvents[0];
  index: number;
}> = ({ event, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Props specific imagery per event
  const propEmoji: Record<string, string> = {
    'Haldi Ceremony': '🌼',
    'Engagement Ceremony': '💍',
    'Sangeet Evening': '🎵',
    'Chaak / Bhaat Ceremony': '🪔',
    'Wedding Ceremony': '🔥',
    'Wedding Reception': '✨',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage for spotlight
    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${mouseXPercent}%`);
    cardRef.current.style.setProperty('--my', `${mouseYPercent}%`);

    // Calculate rotation: center is (0,0), range is -1 to 1 multiplied by max tilt angle
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10; // Negative because tilting up rotates around X axis backwards
    const rotateY = (x - centerX) / 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="cel-entrance-wrapper"
      style={{
        animation: `cel-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.15}s both`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        ref={cardRef}
        className="cel-event-card cel-card-3d-wrapper"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          marginTop: '24px', // Space for floating badge
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-12px' : '0px'}) scale(${isHovered ? '1.04' : '1'})`,
          transition: !isHovered ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out' : 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
          boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.15)' : '0 10px 30px rgba(0,0,0,0.3)',
          willChange: 'transform, box-shadow',
          zIndex: isHovered ? 20 : 1,
          width: '100%',
          maxWidth: '380px',
        }}
      >
        <EventBadge icon={propEmoji[event.eventName] || event.eventIcon} />
        <OrnateFrame>
          {/* Event Name */}
        <h3 className="cel-event-title" style={{
          fontFamily: "'Cinzel', 'Playfair Display', serif",
          fontSize: 'clamp(18px, 4.5vw, 22px)',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFF9C4 40%, #FFD700 70%, #FF8F00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 700,
          letterSpacing: '0.04em',
          marginBottom: '4px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          transform: 'translateZ(30px)', // Mid-layer depth
        }}>
          {event.eventName}
        </h3>

        {/* Hindi name */}
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(11px, 2vw, 13px)',
          color: 'rgba(255,215,0,0.75)',
          fontFamily: "'Noto Serif Devanagari', serif",
          marginBottom: '16px',
          letterSpacing: '0.05em',
          transform: 'translateZ(25px)',
        }} lang="hi">
          {event.eventNameHindi}
        </p>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px', transform: 'translateZ(20px)' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5))' }}/>
          <span style={{ fontSize: '8px', color: '#FFD700', opacity: 0.7 }}>✦</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, rgba(255,215,0,0.5), transparent)' }}/>
        </div>

        {/* Date & Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '14px',
          flexWrap: 'wrap',
          fontFamily: "'Cormorant Garamond', serif",
          transform: 'translateZ(28px)',
        }}>
          <span style={{ fontSize: '16px', filter: 'drop-shadow(0 0 5px rgba(255,152,0,0.5))' }}>📅</span>
          <span style={{
            fontSize: 'clamp(13px, 3vw, 15px)',
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '0.03em',
            fontWeight: 600,
          }}>
            {event.eventDate}
          </span>
          <span style={{ color: '#D4AF37', fontSize: '14px', opacity: 0.6 }}>⬥</span>
          <span style={{
            fontSize: 'clamp(13px, 3vw, 15px)',
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 600,
          }}>
            {event.eventTime}
          </span>
        </div>

        {/* Dress Code Badge */}
        {event.dressCode && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '18px', transform: 'translateZ(35px)' }}>
            <span style={{ 
              fontFamily: "'Alex Brush', cursive", 
              fontSize: '18px', 
              color: 'rgba(255,215,0,0.6)',
              marginBottom: '-6px'
            }}>Dress Code</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '24px',
              border: `1.2px solid ${event.dressColor || 'rgba(255,215,0,0.4)'}`,
              background: `linear-gradient(135deg, ${event.dressColor || '#FFD700'}1a, transparent)`,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(12px, 2.8vw, 14px)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              boxShadow: `0 4px 12px rgba(0,0,0,0.3), 0 0 8px ${event.dressColor || '#FFD700'}20`,
            }}>
              {event.dressColor && (
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: event.dressColor, boxShadow: `0 0 6px ${event.dressColor}` }}/>
              )}
              {event.dressCode}
            </span>
          </div>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px', transform: 'translateZ(15px)' }}>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.35), transparent)' }}/>
        </div>

        {/* Venue */}
        <div style={{ transform: 'translateY(-4px) translateZ(32px)' }}>
          <p style={{
            textAlign: 'center',
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(13px, 3vw, 15px)',
            color: '#FFFFFF',
            fontWeight: 700,
            marginBottom: '4px',
            letterSpacing: '0.04em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            {event.venueName}
          </p>
          <p style={{
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(10px, 2.5vw, 13px)',
            color: 'rgba(255,255,255,0.7)',
            fontStyle: 'italic',
            marginBottom: '20px',
            lineHeight: 1.4,
            maxWidth: '280px',
            margin: '0 auto 20px'
          }}>
            {event.venueAddress}
          </p>
        </div>

        {/* Maps Button */}
        <div style={{ display: 'flex', justifyContent: 'center', transform: 'translateZ(40px)' }}>
          <a
            href={event.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cel-map-btn"
          >
            <span>📍</span>
            <span>Open in Maps</span>
          </a>
        </div>

        {/* Event Props at the Bottom */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '80px', transform: 'translateZ(10px)' }}>
          <EventBottomDecor />
        </div>
      </OrnateFrame>
    </div>
  </div>
);
};

/* ═══════════════════════════════════════════════
   MAIN CELEBRATIONS SECTION
   ═══════════════════════════════════════════════ */
const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ active, onNext }) => {
  const [activeDay, setActiveDay] = useState('9');
  const [tabAnimKey, setTabAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredEvents = weddingEvents.filter(e => e.eventDay === activeDay);

  const handleTabSwitch = (day: string) => {
    if (day === activeDay) return;
    setActiveDay(day);
    setTabAnimKey(prev => prev + 1);
    sectionRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="celebrations"
      className="cel-section"
      ref={sectionRef}
      role="region"
      aria-label="Wedding Celebrations"
      style={{
        zIndex: active ? 10 : 0,
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        display: active ? 'flex' : 'none',
      }}
    >
      <SharedPeacockDefs />
      
      {/* ── SHARED ROYAL BACKGROUND ── */}
      <RoyalBackground />

      {/* ── HANGING DECORATIONS (top) ── */}
      <HangingDecors />

    {/* ── ALONG WITH REMOVED PEACOCKS ── */}

      {/* ── CONTENT ── */}
      <div className="cel-content">

        {/* Section Heading */}
        <div className="cel-heading-block" style={{ animation: 'cel-fade-up 0.6s ease-out' }}>
          
          {/* Top Decorative Badge (Kalash/Feather Icon) */}
          <div className="cel-heading-badge">
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.4))' }}>
              <path d="M15 25C15 26.6569 16.3431 28 18 28H22C23.6569 28 25 26.6569 25 25C25 23.3431 23.6569 22 22 22H18C16.3431 22 15 23.3431 15 25Z" fill="#B8860B"/>
              <path d="M14 22H26V23H14V22Z" fill="#FFD700"/>
              <path d="M18 10C18 12.2091 16.2091 14 14 14C11.7909 14 10 12.2091 10 10C10 7.79086 11.7909 6 14 6C16.2091 6 18 7.79086 18 10Z" fill="#D4AF37"/>
              <path d="M30 10C30 12.2091 28.2091 14 26 14C23.7909 14 22 12.2091 22 10C22 7.79086 23.7909 6 26 6C28.2091 6 30 7.79086 30 10Z" fill="#D4AF37"/>
              <path d="M16 11C16 16 18 20 20 22C22 20 24 16 24 11C24 6 22 4 20 4C18 4 16 6 16 11Z" fill="url(#goldGrad)" opacity="0.9"/>
              <circle cx="20" cy="8" r="1.5" fill="#FFF"/>
              <defs>
                <linearGradient id="goldGrad" x1="16" y1="4" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD700" />
                  <stop offset="1" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="cel-header-accent" style={{ 
            fontFamily: "'Alex Brush', cursive", 
            fontSize: 'clamp(20px, 4.5vw, 26px)', 
            color: '#FFD700', 
            marginBottom: '-10px',
            opacity: 0.9,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Join us for the
          </div>
          
          <div className="cel-title-wrapper">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M16 6L11 9L12.5 6L11 3L16 6Z" fill="#D4AF37" opacity="0.8"/>
              <path d="M6 6H13" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
              <circle cx="2" cy="6" r="1.5" fill="#D4AF37" opacity="0.8"/>
            </svg>
            
            <h2 id="cel-heading" className="cel-title" style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(20px, 5.5vw, 30px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFF9C4 45%, #FFD700 70%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              padding: '0 12px'
            }}>
              Wedding Celebrations
            </h2>
            
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M0 6L5 9L3.5 6L5 3L0 6Z" fill="#D4AF37" opacity="0.8"/>
              <path d="M10 6H3" stroke="#D4AF37" strokeWidth="1" opacity="0.6"/>
              <circle cx="14" cy="6" r="1.5" fill="#D4AF37" opacity="0.8"/>
            </svg>
          </div>
          
          <p className="cel-subtitle-hindi" style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            color: 'rgba(255,215,0,0.7)',
            letterSpacing: '0.1em',
            marginTop: '8px'
          }} lang="hi">
            शुभ विवाह समारोह
          </p>

          {/* Ornate gold line divider */}
          <div className="cel-title-divider">
            <div className="cel-divider-line"/>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#82A0DC" opacity="0.8"/>
            </svg>
            <div className="cel-divider-line"/>
          </div>
        </div>

        {/* ── DAY TABS ── */}
        <div className="cel-tabs-wrapper" role="tablist" aria-label="Wedding days" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 20px)',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          {dayTabs.map((tab, idx) => {
            const isActive = activeDay === tab.day;
            return (
              <button
                key={tab.day}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabSwitch(tab.day)}
                className={`cel-tab ${isActive ? 'cel-tab--active' : ''}`}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  border: isActive ? '1px solid #FFD700' : '1px solid rgba(255,255,255,0.1)',
                  background: isActive ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '100px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `cel-fade-up 0.5s ease-out ${idx * 0.1}s both`,
                }}
              >
                <span className="cel-tab-date" style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(14px, 3.5vw, 17px)',
                  fontWeight: 700,
                  color: isActive ? '#FFD700' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.05em'
                }}>
                  {tab.label}
                </span>
                <span className="cel-tab-sub" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  fontWeight: 500,
                  color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                  fontStyle: 'italic',
                  marginTop: '2px'
                }}>
                  {tab.subtitle}
                </span>
                
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)'
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* ── EVENT CARDS ── */}
        <div
          className="cel-cards-list"
          role="tabpanel"
          aria-label={`Events on day ${activeDay}`}
          key={`panel-${activeDay}-${tabAnimKey}`}
        >
          {filteredEvents.map((event, i) => (
            <EventCard
              key={event.eventName}
              event={event}
              index={i}
            />
          ))}
        </div>

        {/* ── BOTTOM DIYAS ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px', paddingBottom: '8px' }}>
          <Diya scale={0.8}/>
          <Diya scale={0.8}/>
          <Diya scale={0.8}/>
        </div>

        {/* Next Button - Premium Floating */}
        <div className="cel-next-btn-wrap">
          <button onClick={onNext} className="cel-next-btn" aria-label="Next Section: Gallery">
            <div className="cel-diya-container">
              <div className="cel-diya-glow"></div>
              <div className="cel-diya-flame"></div>
              <span className="cel-diya-icon">🪔</span>
            </div>
            <span>Next</span>
            <span className="cel-btn-arrow">→</span>
            <div className="cel-diya-container" style={{ transform: 'scaleX(-1)' }}>
              <div className="cel-diya-glow"></div>
              <div className="cel-diya-flame"></div>
              <span className="cel-diya-icon">🪔</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CelebrationsSection;
