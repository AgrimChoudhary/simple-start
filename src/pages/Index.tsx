import React, { useCallback } from 'react';
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

  const [showDoors, setShowDoors] = React.useState(false);

  const handleCurtainComplete = useCallback(() => {
    nav.setCurtainOpen(true);
  }, [nav]);

  const handleBeginClick = useCallback(() => {
    setShowDoors(true);
  }, []);

  const handleDoorsComplete = useCallback(() => {
    setShowDoors(false);
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

      {/* Palace Doors */}
      {showDoors && <PalaceDoors onComplete={handleDoorsComplete} />}

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
        {/* Section transitions via opacity */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 0 && !showDoors ? 1 : 0,
            pointerEvents: nav.currentSection === 0 && !showDoors ? 'auto' : 'none',
            zIndex: nav.currentSection === 0 ? 10 : 1,
          }}
        >
          <GaneshaSection
            curtainOpen={nav.curtainOpen}
            onBeginClick={handleBeginClick}
            visited={nav.visitedSections.has(0) && nav.currentSection !== 0}
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 1 ? 1 : 0,
            pointerEvents: nav.currentSection === 1 ? 'auto' : 'none',
            zIndex: nav.currentSection === 1 ? 10 : 1,
          }}
        >
          <OpeningSection
            active={nav.currentSection === 1}
            guestName={guestName}
            onViewCelebrations={() => handleNextSection(2)}
            visited={nav.visitedSections.has(1) && nav.currentSection !== 1}
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 2 ? 1 : 0,
            pointerEvents: nav.currentSection === 2 ? 'auto' : 'none',
            zIndex: nav.currentSection === 2 ? 10 : 1,
          }}
        >
          <CelebrationsSection
            active={nav.currentSection === 2}
            onNext={() => handleNextSection(3)}
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 3 ? 1 : 0,
            pointerEvents: nav.currentSection === 3 ? 'auto' : 'none',
            zIndex: nav.currentSection === 3 ? 10 : 1,
          }}
        >
          <GallerySection
            active={nav.currentSection === 3}
            onNext={() => handleNextSection(4)}
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 4 ? 1 : 0,
            pointerEvents: nav.currentSection === 4 ? 'auto' : 'none',
            zIndex: nav.currentSection === 4 ? 10 : 1,
          }}
        >
          <CountdownSection
            active={nav.currentSection === 4}
            onNext={() => handleNextSection(5)}
          />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: nav.currentSection === 5 ? 1 : 0,
            pointerEvents: nav.currentSection === 5 ? 'auto' : 'none',
            zIndex: nav.currentSection === 5 ? 10 : 1,
          }}
        >
          <RSVPSection
            active={nav.currentSection === 5}
            guestName={guestName}
          />
        </div>
      </div>
    </main>
  );
};

export default Index;
