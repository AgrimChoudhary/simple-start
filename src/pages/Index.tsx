import React, { useCallback, useState } from 'react';
import { useSectionNavigation, type SectionId } from '@/hooks/useSectionNavigation';
import { useGuestName } from '@/hooks/useGuestName';

import CurtainReveal from '@/components/transitions/CurtainReveal';
import PalaceDoors from '@/components/transitions/PalaceDoors';
import FloatingPetals from '@/components/global/FloatingPetals';
import FloatingNav from '@/components/global/FloatingNav';
import ProgressDots from '@/components/global/ProgressDots';
import MusicToggle from '@/components/global/MusicToggle';

import GaneshaSection from '@/components/sections/GaneshaSection';
import OpeningSection from '@/components/sections/OpeningSection';
import CelebrationsSection from '@/components/sections/CelebrationsSection';
import GallerySection from '@/components/sections/GallerySection';
import CountdownSection from '@/components/sections/CountdownSection';
import RSVPSection from '@/components/sections/RSVPSection';

const Index = () => {
  const nav = useSectionNavigation();
  const guestName = useGuestName();

  // Palace door transition state machine
  const [doorPhase, setDoorPhase] = useState<'none' | 'ganesha-fading' | 'doors-visible' | 'complete'>('none');

  const handleCurtainComplete = useCallback(() => {
    nav.setCurtainOpen(true);
  }, [nav]);

  const handleBeginClick = useCallback(() => {
    // Step 1: Fade out Ganesha content (0.3s)
    setDoorPhase('ganesha-fading');

    // Step 2: After fade-out, show doors (Section 1 is already behind at z-index 1)
    setTimeout(() => {
      setDoorPhase('doors-visible');
    }, 350);
  }, []);

  const handleDoorsComplete = useCallback(() => {
    setDoorPhase('complete');
    nav.setDoorsOpen(true);
    nav.navigateTo(1, 'idle');
  }, [nav]);

  const handleNavJump = useCallback((section: SectionId) => {
    nav.navigateTo(section, 'cross-fade');
    setTimeout(() => nav.completeTransition(), 400);
  }, [nav]);

  const handleNextSection = useCallback((to: SectionId) => {
    nav.navigateTo(to, 'fade');
    setTimeout(() => nav.completeTransition(), 600);
  }, [nav]);

  // Is Section 0 or the door transition still active?
  const isGaneshaPhase = nav.currentSection === 0 && doorPhase !== 'complete';
  const showSection1Behind = doorPhase === 'doors-visible' || doorPhase === 'complete';

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg font-ui text-sm">
        Skip to content
      </a>

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Curtain Reveal */}
      {!nav.curtainOpen && <CurtainReveal onComplete={handleCurtainComplete} />}

      {/* Palace Doors — z-index 40, over Section 1 content at z-index 1 */}
      {doorPhase === 'doors-visible' && <PalaceDoors onComplete={handleDoorsComplete} />}

      {/* Navigation (show after curtain) */}
      {nav.curtainOpen && (
        <>
          <FloatingNav currentSection={nav.currentSection} onNavigate={handleNavJump} />
          <ProgressDots currentSection={nav.currentSection} onNavigate={handleNavJump} />
          <MusicToggle />
        </>
      )}

      {/* Section Renderer */}
      <div id="main-content" className="relative w-full h-full">

        {/* Section 0: Ganesha — visible during ganesha phase, fades out when doors triggered */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: isGaneshaPhase ? 10 : 1,
            opacity: (isGaneshaPhase && doorPhase !== 'ganesha-fading' && doorPhase !== 'doors-visible') ? 1 : 0,
            pointerEvents: (nav.currentSection === 0 && doorPhase === 'none') ? 'auto' : 'none',
            transition: 'opacity 0.3s ease-out',
          }}
        >
          <GaneshaSection
            curtainOpen={nav.curtainOpen}
            onBeginClick={handleBeginClick}
            visited={nav.visitedSections.has(0) && nav.currentSection !== 0}
            fading={doorPhase === 'ganesha-fading'}
          />
        </div>

        {/* Section 1: Opening — pre-rendered behind palace doors at z-index 1 during transition,
            then promoted to z-index 10 after doors complete */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: (showSection1Behind && doorPhase !== 'complete' && nav.currentSection === 0) ? 1 :
                   nav.currentSection === 1 ? 10 : 1,
            opacity: (showSection1Behind || nav.currentSection === 1) ? 1 : 0,
            pointerEvents: nav.currentSection === 1 ? 'auto' : 'none',
            transition: doorPhase === 'doors-visible' ? 'none' : 'opacity 0.5s ease-out',
          }}
        >
          <OpeningSection
            active={nav.currentSection === 1}
            guestName={guestName}
            onViewCelebrations={() => handleNextSection(2)}
            visited={nav.visitedSections.has(1) && nav.currentSection !== 1}
          />
        </div>

        {/* Sections 2-5: Standard fade transitions */}
        {[
          { id: 2 as SectionId, el: <CelebrationsSection active={nav.currentSection === 2} onNext={() => handleNextSection(3)} /> },
          { id: 3 as SectionId, el: <GallerySection active={nav.currentSection === 3} onNext={() => handleNextSection(4)} /> },
          { id: 4 as SectionId, el: <CountdownSection active={nav.currentSection === 4} onNext={() => handleNextSection(5)} /> },
          { id: 5 as SectionId, el: <RSVPSection active={nav.currentSection === 5} guestName={guestName} /> },
        ].map(({ id, el }) => (
          <div
            key={id}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: nav.currentSection === id ? 1 : 0,
              pointerEvents: nav.currentSection === id ? 'auto' : 'none',
              zIndex: nav.currentSection === id ? 10 : 1,
            }}
          >
            {el}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Index;
