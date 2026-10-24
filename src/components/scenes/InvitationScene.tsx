'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const InvitationScene: React.FC = () => {
  const { setScene } = useAdventureStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    ambientAudio.playPop();
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9'],
    });
  };

  const handleContinue = () => {
    ambientAudio.playPop();
    setScene('island');
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col items-center justify-between p-3 sm:p-5 overflow-hidden select-none bg-transparent">
      {/* Background Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#FBCFE8]/30 blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-12 w-52 h-52 rounded-full bg-[#FFF0D9]/50 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center shrink-0 pt-0.5 sm:pt-1">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FBCFE8] text-[10px] sm:text-[11px] font-bold tracking-wider text-[#BE185D] uppercase mb-1">
          Special Delivery 💌
        </span>
        <h1 className="text-xl sm:text-2xl font-sassy font-extrabold text-[#51263B] leading-tight">
          A Letter For Shailaja
        </h1>
      </div>

      {/* Mascot & Realistic Envelope Interaction */}
      <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col items-center justify-center my-auto">
        <div className="mb-2 shrink-0">
          <Mochi
            pose={isOpen ? 'celebrate' : 'wave'}
            size={95}
            dialogue={
              isOpen
                ? "Yay! Let's begin your story, Kuchu Puchu!"
                : "A letter from your Pati Parmeshwar! 💌"
            }
          />
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Realistic Layered Envelope with Wax Seal */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleOpenEnvelope}
              className="relative w-[min(280px,85vw)] sm:w-80 h-36 sm:h-42 rounded-3xl bg-gradient-to-br from-[#FFF5F8] via-[#FCE7F3] to-[#FBCFE8] border-2 border-[#F472B6]/50 shadow-[0_15px_40px_rgba(190,24,93,0.18)] flex flex-col items-center justify-center p-3 cursor-pointer group hover:scale-[1.02] transition-transform"
            >
              {/* Envelope triangular flap outline */}
              <div className="absolute top-0 inset-x-0 h-16 sm:h-20 border-b-2 border-[#F472B6]/30 bg-gradient-to-b from-white/40 to-transparent flex items-start justify-center pt-1.5">
                <span className="text-[11px] sm:text-xs font-serif italic text-[#88506E] tracking-wide">
                  To My Cutu Pattutuu ❤️
                </span>
              </div>

              {/* Heart Wax Seal Button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="mt-6 z-20 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-[#F472B6] via-[#BE185D] to-[#9D174D] shadow-[0_6px_20px_rgba(190,24,93,0.4)] flex items-center justify-center border-2 border-white text-white animate-pulse-glow"
                aria-label="Break Seal & Open Letter"
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none drop-shadow-sm" />
              </motion.button>

              <span className="text-[11px] sm:text-xs font-sassy font-bold text-[#BE185D] mt-2">
                Tap wax seal to open ✨
              </span>
            </motion.div>
          ) : (
            /* Unfolded Elegant Parchment Letter */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-[min(290px,88vw)] sm:w-80 rounded-3xl bg-[#FFFDF9] border-2 border-[#E9C67B] shadow-[0_20px_50px_rgba(190,24,93,0.2)] p-4 sm:p-5 text-center flex flex-col items-center overflow-hidden"
            >
              {/* Gold foil border */}
              <div className="absolute inset-1.5 border border-[#E9C67B]/40 rounded-2xl pointer-events-none" />

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFF0D9] border border-amber-200 flex items-center justify-center mb-1.5 shadow-xs">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              </div>

              <h2 className="text-lg sm:text-xl font-sassy font-bold text-[#51263B] mb-1">
                You’re Invited, Sweetu! ✨
              </h2>

              <p className="text-[11px] sm:text-xs font-outfit text-[#88506E] leading-relaxed mb-3 sm:mb-4 px-1">
                Your Pati Parmeshwar has crafted a magical story trail filled with our sweetest memories, fun little games, love coupons, and a personal birthday surprise just for you!
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-3 px-5 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
              >
                <span>Continue →</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-center shrink-0 pb-1 sm:pb-2">
        <p className="text-[10px] sm:text-[11px] text-[#88506E]/80 font-medium">
          Made with all my heart for you, Raja Beta 🎀
        </p>
      </div>
    </div>
  );
};
