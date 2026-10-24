'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const IslandScene: React.FC = () => {
  const { setScene } = useAdventureStore();

  const handleStartAdventure = () => {
    ambientAudio.playPop();
    setScene('heart-garden');
  };

  // 5 Milestones along the magical story trail
  const trailMilestones = [
    {
      id: 5,
      title: 'The Love Letter',
      tag: 'Grand Finale 📜❤️',
      emoji: '📜',
      color: 'from-amber-400 to-rose-400',
    },
    {
      id: 4,
      title: 'Mystery Gifts',
      tag: 'Coupons & Bumkissies 🎁',
      emoji: '🎁',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 3,
      title: 'Wish Café',
      tag: 'Blow Out Candles 🎂',
      emoji: '🎂',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 2,
      title: 'Memory Lane',
      tag: '10 Sweet Moments 📸',
      emoji: '📸',
      color: 'from-rose-400 to-pink-500',
    },
    {
      id: 1,
      title: 'Heart Garden',
      tag: 'Start Here 🌸',
      emoji: '🌸',
      color: 'from-pink-500 to-rose-600',
      isCurrent: true,
    },
  ];

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="text-center shrink-0 pt-0.5 sm:pt-1 z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FBCFE8] shadow-xs text-[10px] sm:text-[11px] font-bold text-[#BE185D] uppercase tracking-wide mb-1">
          <Sparkles className="w-3 h-3" />
          Our Story Trail
        </span>
        <h2 className="text-xl sm:text-2xl font-sassy font-extrabold text-[#51263B] leading-tight">
          The Birthday Trail ✨
        </h2>
        <p className="text-[11px] sm:text-xs text-[#88506E] mt-0.5">
          Follow the magical path step-by-step, Bubu!
        </p>
      </div>

      {/* Illustrated Roadmap Card */}
      <div className="relative flex-1 min-h-0 w-full max-w-sm mx-auto my-1.5 sm:my-2 p-2.5 sm:p-3 bg-white/88 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-[#FBCFE8] shadow-lg overflow-hidden flex flex-col justify-between">
        {/* Animated Connecting Winding Line in Background */}
        <div className="absolute left-7 top-6 bottom-8 w-0.5 border-l-2 border-dashed border-[#F472B6]/50 pointer-events-none z-0" />

        {/* Trail Milestones */}
        <div className="relative z-10 flex flex-col justify-between flex-1 min-h-0 gap-1.5">
          {trailMilestones.map((m) => (
            <div
              key={m.id}
              className={`flex items-center gap-2.5 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border transition shadow-2xs ${
                m.isCurrent
                  ? 'bg-gradient-to-r from-pink-50 to-white border-[#F472B6] ring-1.5 ring-[#F472B6]/40'
                  : 'bg-white/90 border-[#FBCFE8]'
              }`}
            >
              {/* Illustrated Circular Checkpoint Badge */}
              <div
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm sm:text-base font-bold shadow-xs shrink-0 bg-gradient-to-br ${m.color} text-white`}
              >
                {m.isCurrent && (
                  <span className="absolute -inset-1 rounded-xl border-2 border-[#F472B6] animate-ping opacity-75" />
                )}
                <span>{m.emoji}</span>
              </div>

              {/* Minimal Text Label */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] sm:text-xs font-sassy font-bold text-[#51263B] truncate">
                    {m.id}. {m.title}
                  </h4>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#BE185D] bg-pink-50 px-1.5 py-0.5 rounded-full border border-pink-100 shrink-0">
                    {m.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cute Mascot at Start */}
        <div className="relative z-10 flex items-center justify-center pt-1 mt-1 border-t border-pink-100 shrink-0">
          <Mochi
            pose="hop"
            size={55}
            dialogue="Let's follow the trail, Kuchu Puchu! ✨"
          />
        </div>
      </div>

      {/* Single Linear Bottom CTA */}
      <div className="w-full max-w-sm mx-auto shrink-0 pt-0.5 pb-1 sm:pb-2 text-center z-10">
        <button
          onClick={handleStartAdventure}
          className="w-full py-3 sm:py-3.5 px-6 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
        >
          <span>Start Chapter 1 🌸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
