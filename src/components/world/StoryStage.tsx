'use client';

import React, { useEffect, useState } from 'react';
import { useAdventureStore } from '@/store/adventure';
import { NavigationChrome } from '@/components/ui/NavigationChrome';
import { AmbientBackground } from '@/components/effects/AmbientBackground';
import { PasswordLockScreen } from '@/components/scenes/PasswordLockScreen';
import { SplashScreen } from '@/components/scenes/SplashScreen';
import { InvitationScene } from '@/components/scenes/InvitationScene';
import { IslandScene } from '@/components/scenes/IslandScene';
import { HeartGardenScene } from '@/components/scenes/HeartGardenScene';
import { MemoryCottageScene } from '@/components/scenes/MemoryCottageScene';
import { BirthdayCafeScene } from '@/components/scenes/BirthdayCafeScene';
import { GiftCastleScene } from '@/components/scenes/GiftCastleScene';
import { SecretGardenScene } from '@/components/scenes/SecretGardenScene';
import { FinalLetterScene } from '@/components/scenes/FinalLetterScene';
import { motion, AnimatePresence } from 'motion/react';

import { ambientAudio } from '@/lib/audio';

export const StoryStage: React.FC = () => {
  const { currentScene, isUnlocked, musicEnabled } = useAdventureStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Proactively start background music with fallback unlock
    ambientAudio.startAutoplay();
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    if (musicEnabled) {
      ambientAudio.play();
    } else {
      ambientAudio.pause();
    }
  }, [musicEnabled, hasMounted]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FFF5F8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-3 border-[#F472B6] border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-[#88506E] tracking-wider font-sassy">
            Made with love for Shailaja... 🎀
          </span>
        </div>
      </div>
    );
  }

  const renderScene = () => {
    // Bulletproof security guard: cannot view any scene without unlocking first
    if (!isUnlocked || currentScene === 'lock') {
      return <PasswordLockScreen />;
    }

    switch (currentScene) {
      case 'splash':
        return <SplashScreen />;
      case 'invitation':
        return <InvitationScene />;
      case 'island':
        return <IslandScene />;
      case 'heart-garden':
        return <HeartGardenScene />;
      case 'memory-cottage':
        return <MemoryCottageScene />;
      case 'birthday-cafe':
        return <BirthdayCafeScene />;
      case 'gift-castle':
        return <GiftCastleScene />;
      case 'secret-garden':
        return <SecretGardenScene />;
      case 'final-letter':
        return <FinalLetterScene />;
      default:
        return <PasswordLockScreen />;
    }
  };

  return (
    <main className="h-[100dvh] w-full bg-gradient-to-b from-[#FFF0F5] via-[#FFEBF2] to-[#FFF5F8] flex items-center justify-center p-0 sm:p-3 md:p-4 overflow-hidden relative select-none">
      {/* Complete-Page Living Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#FBCFE8]/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FFF0D9]/50 blur-3xl" />
        <AmbientBackground opacityMultiplier={1} />
      </div>

      {/* Centered Mobile Story Stage Container - perfectly fits any device height without scrolling */}
      <div className="relative w-full h-[100dvh] sm:h-[min(844px,96dvh)] max-w-[425px] bg-transparent sm:bg-white/45 sm:backdrop-blur-md sm:rounded-[36px] shadow-2xl sm:border-[5px] sm:border-white/85 overflow-hidden flex flex-col z-10">
        {/* Navigation Chrome */}
        <NavigationChrome />

        {/* Scene Transition Area */}
        <div className="relative flex-1 w-full min-h-0 overflow-hidden z-10 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-full h-full min-h-0 flex flex-col overflow-hidden"
            >
              {renderScene()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};
