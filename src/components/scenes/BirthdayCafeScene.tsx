'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

export const BirthdayCafeScene: React.FC = () => {
  const { awardCharm, completeGame, setScene } = useAdventureStore();
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [toppings, setToppings] = useState<string[]>(['🍓', '🎀', '⭐']);
  const [isWishMade, setIsWishMade] = useState(false);

  const handleExtinguishCandle = (index: number) => {
    ambientAudio.playPop();
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      handleCompleteWish();
    }
  };

  const handleCompleteWish = () => {
    setIsWishMade(true);
    awardCharm('wish-charm');
    completeGame('cake');

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#F59E0B'],
    });
  };

  const handleNextScene = () => {
    ambientAudio.playPop();
    setScene('gift-castle');
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="text-center shrink-0 pt-0.5 sm:pt-1">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
          Chapter 3: Birthday Café 🎂
        </span>
        <h2 className="text-lg sm:text-xl font-sassy font-extrabold text-[#51263B] leading-tight">
          Make A Birthday Wish!
        </h2>
        <p className="text-[11px] sm:text-xs text-[#88506E] mt-0.5">
          Tap each candle to blow it out, Kuchu Puchu ✨
        </p>
      </div>

      {/* Interactive Birthday Cake */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-auto">
        <div className="relative w-56 sm:w-64 h-46 sm:h-52 flex flex-col items-center justify-end">
          {/* 3 Candles */}
          <div className="flex items-end justify-center gap-6 sm:gap-7 mb-1 z-20">
            {candlesLit.map((isLit, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleExtinguishCandle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? 'Tap to blow out!' : 'Extinguished'}
              >
                {/* Flame */}
                <div className="h-6 sm:h-7 flex items-center justify-center">
                  {isLit ? (
                    <motion.div
                      animate={{ scale: [1, 1.25, 0.95, 1], y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                    >
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
                    </motion.div>
                  ) : (
                    <span className="text-xs text-gray-400">💨</span>
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-3.5 sm:w-4 h-9 sm:h-11 bg-gradient-to-b from-[#FBCFE8] to-[#F472B6] rounded-t-sm shadow-xs border-x border-pink-300 flex items-center justify-center">
                  <div className="w-0.5 sm:w-1 h-full bg-white/40" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Strawberry Shortcake Base */}
          <div className="relative w-52 sm:w-60 h-22 sm:h-26 bg-gradient-to-b from-[#FFF5F8] to-[#FCE7F3] rounded-3xl border-3 border-[#FBCFE8] shadow-xl flex flex-col items-center justify-center p-2.5 sm:p-3 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-3.5 bg-white rounded-b-xl shadow-xs" />

            <div className="flex items-center gap-2 sm:gap-2.5 text-xl sm:text-2xl z-10 mt-1.5">
              {toppings.map((t, i) => (
                <span key={i} className="drop-shadow-sm">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-1.5 text-[11px] sm:text-xs font-sassy font-bold text-[#BE185D]">
              Happy Birthday Shailaja ❤️
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dialogue or single Next CTA */}
      <div className="w-full max-w-xs shrink-0 mx-auto pb-1 sm:pb-2 pt-0.5 text-center">
        <AnimatePresence mode="wait">
          {isWishMade ? (
            <motion.div
              key="wish-granted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 sm:p-4 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-[#FBCFE8] shadow-xl"
            >
              <h4 className="text-xs sm:text-sm font-sassy font-bold text-[#BE185D] mb-1">
                Wish Granted, Raja Beta! ✨
              </h4>
              <p className="text-[11px] sm:text-xs text-[#88506E] mb-2.5 leading-relaxed">
                &quot;I hope all the sweet dreams you quietly wished for find their way to you.&quot;
              </p>
              <button
                onClick={handleNextScene}
                className="w-full py-2.5 sm:py-3 px-5 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Open Gifts 🎁</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <Mochi
              pose="wave"
              size={65}
              dialogue="Tap each candle to blow it out and make your wish! ✨"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
