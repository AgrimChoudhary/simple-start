import React from 'react';
import { type SectionId } from '@/hooks/useSectionNavigation';

interface FloatingNavProps {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const sections = [
  { id: 0 as SectionId, label: 'Ganesha', icon: '🙏' },
  { id: 1 as SectionId, label: 'Couple', icon: '💑' },
  { id: 2 as SectionId, label: 'Events', icon: '📜' },
  { id: 3 as SectionId, label: 'Gallery', icon: '📸' },
  { id: 4 as SectionId, label: 'Countdown', icon: '⏳' },
  { id: 5 as SectionId, label: 'RSVP', icon: '💌' },
];

const FloatingNav: React.FC<FloatingNavProps> = ({ currentSection, onNavigate }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed top-4 right-4 md:top-4 md:right-4 z-[100]">
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg font-ui text-lg transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Menu Panel */}
      {open && (
        <nav
          className="absolute top-14 right-0 rounded-xl p-4 min-w-[180px] shadow-2xl"
          style={{
            background: 'hsl(218 52% 14% / 0.95)',
            backdropFilter: 'blur(12px)',
            animation: 'scale-fade-in 0.25s ease-out',
          }}
          role="navigation"
          aria-label="Section navigation"
        >
          <ul className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    onNavigate(s.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-ui text-sm flex items-center gap-3 transition-colors ${
                    currentSection === s.id
                      ? 'text-primary bg-secondary'
                      : 'text-cream hover:bg-secondary/50'
                  }`}
                >
                  <span className="text-base">{s.icon}</span>
                  <span>{s.label}</span>
                  {currentSection === s.id && (
                    <span className="w-2 h-2 rounded-full bg-primary ml-auto" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default FloatingNav;
