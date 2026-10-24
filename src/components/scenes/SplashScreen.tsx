'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setScene, setMusicEnabled } = useAdventureStore();
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
    setMusicEnabled(true);
    ambientAudio.play();
    ambientAudio.playPop();
    setScene('invitation');
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none bg-transparent">
      {/* Background Animated Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#FBCFE8]/40 blur-3xl animate-pulse-orb" />
        <div
          className="absolute top-1/2 -right-16 w-60 h-60 rounded-full bg-[#FFF0D9]/60 blur-3xl animate-pulse-orb"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute -bottom-10 left-1/3 w-64 h-64 rounded-full bg-[#F472B6]/20 blur-3xl animate-pulse-orb"
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
            className="flex-1 w-full flex flex-col items-center justify-center my-auto z-20 text-center px-4"
          >
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-[#BE185D] uppercase tracking-widest mb-4"
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
                className="w-32 h-32 rounded-full bg-white/95 backdrop-blur-md border-4 border-[#FBCFE8] shadow-[0_20px_50px_rgba(244,114,182,0.3)] flex items-center justify-center my-6"
              >
                <span className="text-6xl font-sassy font-black text-transparent bg-clip-text bg-gradient-to-br from-[#F472B6] to-[#BE185D]">
                  {countdown}
                </span>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-medium text-[#88506E] mt-3"
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
            className="flex-1 w-full flex flex-col items-center justify-between z-10 py-2"
          >
            {/* Top Pati Parmeshwar badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center pt-1"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border-2 border-[#FBCFE8] shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-[#BE185D] text-[#BE185D]" />
                <span className="text-xs font-bold text-[#BE185D] tracking-wide font-sassy">
                  Made with love by your Pati Parmeshwar 💍
                </span>
              </div>
            </motion.div>

            {/* Mascot and Sassy Main Message */}
            <div className="flex flex-col items-center text-center my-auto w-full max-w-sm px-2">
              {/* Increased Bunny Size, No Dialogue Bubble */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-4"
              >
                <Mochi pose="celebrate" size={170} />
              </motion.div>

              {/* Grand Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl sm:text-3xl font-sassy font-extrabold text-[#51263B] leading-tight mb-4"
              >
                Happy Birthday, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] via-[#BE185D] to-[#BE185D]">
                  Meri Dharam Patni! ❤️💍
                </span>
              </motion.h1>

              {/* Clean Dedication Card: Just "To My Cutu Pattutuu ❤️" */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full bg-white/90 backdrop-blur-md rounded-3xl py-4 px-6 border-2 border-[#FBCFE8] shadow-lg text-center"
              >
                <h3 className="text-sm font-sassy font-bold text-[#BE185D] tracking-wide mb-1.5">
                  To My Cutu Pattutuu ❤️
                </h3>
                <div className="h-0.5 w-10 bg-pink-200 mx-auto my-1.5 rounded-full" />
                <p className="text-xs text-[#51263B] font-medium leading-relaxed">
                  I built a magical birthday world just for you. Hope you like it, my Kuchu Puchu! 💕
                </p>
              </motion.div>
            </div>

            {/* Single Linear Bottom CTA with Generous Spacing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full max-w-xs pt-2 pb-2"
            >
              <button
                onClick={handleStart}
                className="w-full py-4 px-6 rounded-2xl coquette-button font-sassy font-bold text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-95 transition-transform"
              >
                <span>Enter ✨</span>
                <Sparkles className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
