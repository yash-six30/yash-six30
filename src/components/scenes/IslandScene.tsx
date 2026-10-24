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
    <div className="relative w-full h-full flex flex-col justify-between p-5 overflow-y-auto select-none bg-transparent">
      {/* Header */}
      <div className="text-center pt-1 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#FBCFE8] shadow-xs text-[11px] font-bold text-[#BE185D] uppercase tracking-wide mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          Our Story Trail
        </span>
        <h2 className="text-2xl font-sassy font-extrabold text-[#51263B]">
          The Birthday Trail ✨
        </h2>
        <p className="text-xs text-[#88506E] mt-0.5">
          Follow the magical path step-by-step, Bubu!
        </p>
      </div>

      {/* Illustrated Roadmap Card */}
      <div className="relative flex-1 w-full max-w-sm mx-auto my-3 p-4 bg-white/85 backdrop-blur-md rounded-3xl border-2 border-[#FBCFE8] shadow-xl overflow-hidden flex flex-col justify-between">
        {/* Animated Connecting Winding Line in Background */}
        <div className="absolute left-9 top-8 bottom-12 w-0.5 border-l-2 border-dashed border-[#F472B6]/60 pointer-events-none z-0" />

        {/* Trail Milestones (Ordered from Finale 5 down to Start 1) */}
        <div className="relative z-10 flex flex-col gap-3">
          {trailMilestones.map((m) => (
            <div
              key={m.id}
              className={`flex items-center gap-3.5 p-2.5 rounded-2xl border transition shadow-xs ${
                m.isCurrent
                  ? 'bg-gradient-to-r from-pink-50 to-white border-[#F472B6] ring-2 ring-[#F472B6]/40'
                  : 'bg-white/90 border-[#FBCFE8]'
              }`}
            >
              {/* Illustrated Circular Checkpoint Badge */}
              <div
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm shrink-0 bg-gradient-to-br ${m.color} text-white`}
              >
                {m.isCurrent && (
                  <span className="absolute -inset-1 rounded-2xl border-2 border-[#F472B6] animate-ping opacity-75" />
                )}
                <span>{m.emoji}</span>
              </div>

              {/* Minimal Text Label */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-sassy font-bold text-[#51263B]">
                    {m.id}. {m.title}
                  </h4>
                  <span className="text-[10px] font-bold text-[#BE185D] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    {m.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cute Mascot at Start */}
        <div className="relative z-10 flex items-center justify-center mt-2 pt-2 border-t border-pink-100">
          <Mochi
            pose="hop"
            size={80}
            dialogue="Let's follow the trail together, Kuchu Puchu! ✨"
          />
        </div>
      </div>

      {/* Single Linear Bottom CTA */}
      <div className="w-full max-w-sm mx-auto pb-2 text-center z-10">
        <button
          onClick={handleStartAdventure}
          className="w-full py-4 px-6 rounded-2xl coquette-button font-sassy font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
        >
          <span>Start Chapter 1 🌸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
