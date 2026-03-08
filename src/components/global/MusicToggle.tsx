import React from 'react';

const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="fixed bottom-4 left-4 z-50 w-10 h-10 rounded-full bg-card border border-primary/20 flex items-center justify-center text-primary transition-all hover:border-primary/40"
      style={playing ? { animation: 'music-pulse 2s ease-in-out infinite' } : {}}
      aria-label={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};

export default MusicToggle;
