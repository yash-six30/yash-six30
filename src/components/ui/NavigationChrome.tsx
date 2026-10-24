'use client';

import React, { useEffect, useState } from 'react';
import { useAdventureStore } from '@/store/adventure';
import { ambientAudio } from '@/lib/audio';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const NavigationChrome: React.FC = () => {
  const { currentScene, musicEnabled, toggleMusic, collectedCharms } = useAdventureStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (musicEnabled) {
      ambientAudio.play();
    } else {
      ambientAudio.pause();
    }
  }, [musicEnabled]);

  if (!mounted) return null;

  const isLockScreen = currentScene === 'lock';

  return (
    <header className="w-full shrink-0 flex items-center justify-between px-3.5 py-1.5 sm:py-2 z-30 select-none">
      {/* Left: Charm / Love Counter */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#FBCFE8] shadow-xs">
        <Sparkles className="w-3 h-3 text-[#F472B6]" />
        <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D]">
          {isLockScreen
            ? 'Loveverse 🔐'
            : collectedCharms.length > 0
            ? `${collectedCharms.length} Charms`
            : 'Loveverse 🎀'}
        </span>
      </div>

      {/* Right: Music Mute / Unmute Button */}
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-xs transition active:scale-95 cursor-pointer ${
          musicEnabled
            ? 'bg-[#F472B6] text-white border-[#BE185D] animate-pulse-glow'
            : 'bg-white/90 backdrop-blur-md border-[#FBCFE8] text-[#88506E] hover:bg-pink-50'
        }`}
        title={musicEnabled ? 'Mute Music' : 'Unmute Music'}
        aria-label={musicEnabled ? 'Mute Music' : 'Unmute Music'}
      >
        {musicEnabled ? (
          <>
            <Volume2 className="w-3 h-3" />
            <span className="text-[10px] sm:text-[11px] font-bold">Music On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3" />
            <span className="text-[10px] sm:text-[11px] font-bold">Unmute 🎵</span>
          </>
        )}
      </button>
    </header>
  );
};
