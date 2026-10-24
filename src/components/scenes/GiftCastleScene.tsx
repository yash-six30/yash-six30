'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { LOVE_COUPONS } from '@/content/coupons';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Gift, ArrowRight, Lock, Eye } from 'lucide-react';

export const GiftCastleScene: React.FC = () => {
  const { awardCharm, completeGame, setScene } = useAdventureStore();
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const currentCoupon = LOVE_COUPONS[currentGiftIndex];
  const isLastGift = currentGiftIndex === LOVE_COUPONS.length - 1;
  const isSuspenseGift = Boolean(currentCoupon.isSuspense);

  const handleUnwrap = () => {
    ambientAudio.playPop();
    setIsUnwrapped(true);

    confetti({
      particleCount: isLastGift ? 90 : 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#F59E0B'],
    });

    if (isLastGift) {
      awardCharm('castle-key');
      completeGame('gifts');
    }
  };

  const handleNext = () => {
    ambientAudio.playPop();
    if (!isLastGift) {
      setCurrentGiftIndex((prev) => prev + 1);
      setIsUnwrapped(false);
    } else {
      setScene('secret-garden');
    }
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="text-center shrink-0 pt-0.5 sm:pt-1">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
          Chapter 4: Gift Castle 🏰
        </span>
        <h2 className="text-lg sm:text-xl font-sassy font-extrabold text-[#51263B] leading-tight">
          Digital Love Coupons
        </h2>
        <p className="text-[11px] sm:text-xs text-[#88506E] mt-0.5">
          Gift {currentGiftIndex + 1} of {LOVE_COUPONS.length} for my Babu
        </p>
      </div>

      {/* Gift Box / Unwrapped Coupon */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {!isUnwrapped ? (
            /* Wrapped Gift Box with Suspense for Gift 3 */
            <motion.div
              key={`closed-${currentGiftIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={handleUnwrap}
              className={`w-[min(280px,85vw)] sm:w-80 h-44 sm:h-52 rounded-3xl border-2 shadow-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer active:scale-95 transition ${
                isSuspenseGift
                  ? 'bg-gradient-to-br from-[#FFF0D9] via-[#FFEBF2] to-[#FCE7F3] border-amber-300'
                  : 'bg-gradient-to-br from-[#FFF0F5] to-[#FCE7F3] border-[#F472B6]/40'
              }`}
            >
              {isSuspenseGift ? (
                <>
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 shadow-sm flex items-center justify-center text-3xl mb-1.5 animate-pulse border-2 border-amber-300">
                    🙈
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-amber-200/80 text-[9px] sm:text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1">
                    ⚠️ Top Secret Mystery Gift ⚠️
                  </div>
                  <h3 className="text-sm sm:text-base font-sassy font-bold text-[#BE185D]">
                    Are you ready for this?
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#88506E] mt-0.5 mb-2">
                    Strictly for Shailaja’s eyes only...
                  </p>
                  <button className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-sassy font-bold text-xs flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Reveal Gift ✨</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl mb-2 animate-bounce">
                    🎁
                  </div>
                  <h3 className="text-sm sm:text-base font-sassy font-bold text-[#51263B]">
                    {currentCoupon.tagline}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#88506E] mt-0.5 mb-2.5">
                    From your Pati Parmeshwar
                  </p>
                  <button className="py-2 px-5 rounded-xl coquette-button font-sassy font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Unwrap Gift 🎁</span>
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            /* Unwrapped Coupon Card */
            <motion.div
              key={`opened-${currentGiftIndex}`}
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`w-[min(280px,85vw)] sm:w-80 bg-white rounded-3xl p-4 sm:p-4.5 shadow-xl border-2 flex flex-col items-center text-center relative ${
                isSuspenseGift ? 'border-rose-400' : 'border-[#FBCFE8]'
              }`}
            >
              {/* Badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FFF0D9] border border-amber-200 text-[9px] sm:text-[10px] font-bold text-amber-800">
                {currentCoupon.badge}
              </div>

              <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-2xl mb-1.5 mt-0.5">
                {currentCoupon.icon}
              </div>

              <h3 className="text-base sm:text-lg font-sassy font-extrabold text-[#BE185D]">
                {currentCoupon.title}
              </h3>

              <div className="my-2 p-2.5 bg-pink-50/80 rounded-2xl border border-pink-100 text-[11px] sm:text-xs text-[#51263B] leading-relaxed">
                {currentCoupon.description}
              </div>

              <p className="text-[9px] sm:text-[10px] text-[#88506E] italic">
                {currentCoupon.terms}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Single Linear Action at Bottom */}
      <div className="w-full max-w-xs shrink-0 mx-auto pb-1 sm:pb-2 pt-0.5 text-center">
        {isUnwrapped ? (
          <button
            onClick={handleNext}
            className="w-full py-2.5 sm:py-3.5 px-6 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <span>
              {isLastGift ? 'Next Chapter →' : 'Next Gift 🎁'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Mochi
            pose={isSuspenseGift ? 'surprised' : 'wave'}
            size={65}
            dialogue={
              isSuspenseGift
                ? 'Hehehe Mochi knows what this is... 🙈'
                : `Unwrap gift ${currentGiftIndex + 1} for you, Babu!`
            }
          />
        )}
      </div>
    </div>
  );
};
