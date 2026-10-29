'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setScene, musicEnabled } = useAdventureStore();
  const [countdown, setCountdown] = useState<number>(3);
  const [showMain, setShowMain] = useState<boolean>(false);

  // Soft, paced countdown: 1200ms per count for anticipation
  useEffect(() => {
    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        ambientAudio.playPop();
      }, 1200);
      return () => clearTimeout(timer);
    } else if (countdown === 1) {
      const timer = setTimeout(() => {
        setCountdown(0);
        setShowMain(true);
        ambientAudio.playPop();

        // Soft celebratory confetti explosion
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#F59E0B', '#E9C67B'],
        });
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleStart = () => {
    if (musicEnabled) {
      ambientAudio.play();
    }
    ambientAudio.playPop();
    setScene('invitation');
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col items-center justify-between p-3 sm:p-5 overflow-hidden select-none bg-transparent">
      {/* Background Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-[#FBCFE8]/40 blur-3xl animate-pulse-orb" />
        <div
          className="absolute top-1/2 -right-16 w-52 h-52 rounded-full bg-[#FFF0D9]/60 blur-3xl animate-pulse-orb"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute -bottom-10 left-1/3 w-56 h-56 rounded-full bg-[#F472B6]/20 blur-3xl animate-pulse-orb"
          style={{ animationDelay: '5s' }}
        />
      </div>

      {/* 3... 2... 1... Countdown Screen */}
      <AnimatePresence mode="wait">
        {!showMain ? (
          <motion.div
            key="countdown-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-h-0 w-full flex flex-col items-center justify-center my-auto z-20 text-center px-4"
          >
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] sm:text-xs font-bold text-[#BE185D] uppercase tracking-widest mb-3"
            >
              Get Ready For Magic ✨
            </motion.span>

            {/* Glowing Soft 3D Number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ scale: 0.4, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/95 backdrop-blur-md border-3 sm:border-4 border-[#FBCFE8] shadow-[0_15px_40px_rgba(244,114,182,0.3)] flex items-center justify-center my-4"
              >
                <span className="text-5xl sm:text-6xl font-sassy font-black text-transparent bg-clip-text bg-gradient-to-br from-[#F472B6] to-[#BE185D]">
                  {countdown}
                </span>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] sm:text-xs font-medium text-[#88506E] mt-2"
            >
              Loading something special for someone special... 🎀
            </motion.p>
          </motion.div>
        ) : (
          /* Main Birthday Splash Screen */
          <motion.div
            key="main-splash"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-h-0 w-full flex flex-col items-center justify-between z-10 py-1"
          >
            {/* Top Pati Parmeshwar badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center shrink-0 pt-0.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#FBCFE8] shadow-xs">
                <Heart className="w-3 h-3 fill-[#BE185D] text-[#BE185D]" />
                <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D] tracking-wide font-sassy">
                  Made with love by your Pati Parmeshwar 💍
                </span>
              </div>
            </motion.div>

            {/* Mascot and Sassy Main Message */}
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center my-auto w-full max-w-sm px-2">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-2 sm:mb-3 shrink-0"
              >
                <Mochi pose="celebrate" size={120} />
              </motion.div>

              {/* Grand Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl sm:text-2xl font-sassy font-extrabold text-[#51263B] leading-tight mb-2 sm:mb-3 shrink-0"
              >
                Happy Birthday, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] via-[#BE185D] to-[#BE185D]">
                  Meri Dharam Patni! ❤️💍
                </span>
              </motion.h1>

              {/* Clean Dedication Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full bg-white/92 backdrop-blur-md rounded-2xl sm:rounded-3xl py-2.5 sm:py-3.5 px-4 sm:px-6 border-2 border-[#FBCFE8] shadow-md text-center"
              >
                <h3 className="text-xs sm:text-sm font-sassy font-bold text-[#BE185D] tracking-wide mb-1">
                  To My Cutu Pattutuu ❤️
                </h3>
                <div className="h-0.5 w-8 bg-pink-200 mx-auto my-1 rounded-full" />
                <p className="text-[11px] sm:text-xs text-[#51263B] font-medium leading-relaxed">
                  I built a magical birthday world just for you. Hope you like it, my Kuchu Puchu! 💕
                </p>
              </motion.div>
            </div>

            {/* Single Linear Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full max-w-xs shrink-0 pt-1 pb-1 sm:pb-2"
            >
              <button
                onClick={handleStart}
                className="w-full py-3 sm:py-3.5 px-6 rounded-2xl coquette-button font-sassy font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-95 transition-transform"
              >
                <span>Enter ✨</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
