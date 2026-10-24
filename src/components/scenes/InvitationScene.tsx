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
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none bg-transparent">
      {/* Background Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#FBCFE8]/30 blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -right-12 w-56 h-56 rounded-full bg-[#FFF0D9]/50 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center pt-1">
        <span className="inline-block px-3 py-1 rounded-full bg-white/90 border border-[#FBCFE8] text-[11px] font-bold tracking-wider text-[#BE185D] uppercase mb-1">
          Special Delivery 💌
        </span>
        <h1 className="text-2xl font-sassy font-extrabold text-[#51263B]">
          A Letter For Shailaja
        </h1>
      </div>

      {/* Mascot & Realistic Envelope Interaction */}
      <div className="relative z-10 w-full flex flex-col items-center my-auto">
        <div className="mb-4">
          <Mochi
            pose={isOpen ? 'celebrate' : 'wave'}
            size={145}
            dialogue={
              isOpen
                ? "Yay! Let's begin your birthday story, Kuchu Puchu!"
                : "You've got a handwritten letter from your Pati Parmeshwar! 💌"
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
              className="relative w-76 sm:w-84 h-48 rounded-3xl bg-gradient-to-br from-[#FFF5F8] via-[#FCE7F3] to-[#FBCFE8] border-2 border-[#F472B6]/50 shadow-[0_20px_50px_rgba(190,24,93,0.18)] flex flex-col items-center justify-center p-4 cursor-pointer group hover:scale-[1.02] transition-transform"
            >
              {/* Envelope triangular flap outline */}
              <div className="absolute top-0 inset-x-0 h-24 border-b-2 border-[#F472B6]/30 bg-gradient-to-b from-white/40 to-transparent flex items-start justify-center pt-2">
                <span className="text-xs font-serif italic text-[#88506E] tracking-wide">
                  To My Cutu Pattutuu ❤️
                </span>
              </div>

              {/* Heart Wax Seal Button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                className="mt-8 z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#F472B6] via-[#BE185D] to-[#9D174D] shadow-[0_8px_25px_rgba(190,24,93,0.4)] flex items-center justify-center border-3 border-white text-white animate-pulse-glow"
                aria-label="Break Seal & Open Letter"
              >
                <Heart className="w-8 h-8 fill-white stroke-none drop-shadow-sm" />
              </motion.button>

              <span className="text-xs font-sassy font-bold text-[#BE185D] mt-3">
                Tap wax seal to open ✨
              </span>
            </motion.div>
          ) : (
            /* Unfolded Elegant Parchment Letter */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-76 sm:w-84 rounded-3xl bg-[#FFFDF9] border-2 border-[#E9C67B] shadow-[0_25px_60px_rgba(190,24,93,0.22)] p-6 text-center flex flex-col items-center overflow-hidden"
            >
              {/* Gold foil border & vintage corner flourishes */}
              <div className="absolute inset-1.5 border border-[#E9C67B]/40 rounded-2xl pointer-events-none" />

              <div className="w-11 h-11 rounded-full bg-[#FFF0D9] border border-amber-200 flex items-center justify-center mb-2 shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>

              <h2 className="text-xl font-sassy font-bold text-[#51263B] mb-1.5">
                You’re Invited, Sweetu! ✨
              </h2>

              <p className="text-xs font-outfit text-[#88506E] leading-relaxed mb-5 px-1">
                Your Pati Parmeshwar has crafted a magical story trail filled with our sweetest memories, fun little games, love coupons, and a personal birthday surprise just for you!
              </p>

              <button
                onClick={handleContinue}
                className="w-full py-3.5 px-5 rounded-2xl coquette-button font-sassy font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
              >
                <span>Continue →</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-center pb-2">
        <p className="text-[11px] text-[#88506E]/80 font-medium">
          Made with all my heart for you, Raja Beta 🎀
        </p>
      </div>
    </div>
  );
};
