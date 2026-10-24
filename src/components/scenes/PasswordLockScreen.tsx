'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Lock, Unlock, ChevronUp, ChevronDown, Sparkles, Heart } from 'lucide-react';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const YEARS = Array.from({ length: 21 }, (_, i) => 1992 + i); // 1992 to 2012

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export const PasswordLockScreen: React.FC = () => {
  const { unlockWithDate } = useAdventureStore();

  // Neutral starting date so Shailaja has the fun of picking her birthday
  const [day, setDay] = useState<number>(15);
  const [month, setMonth] = useState<number>(6); // June
  const [year, setYear] = useState<number>(1999);

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isUnlockedSuccess, setIsUnlockedSuccess] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const maxDays = getDaysInMonth(month, year);

  const handleDayChange = (delta: number) => {
    ambientAudio.playPop();
    setErrorMessage('');
    setDay((prev) => {
      let next = prev + delta;
      if (next < 1) next = maxDays;
      if (next > maxDays) next = 1;
      return next;
    });
  };

  const handleMonthChange = (delta: number) => {
    ambientAudio.playPop();
    setErrorMessage('');
    setMonth((prev) => {
      let next = prev + delta;
      if (next < 1) next = 12;
      if (next > 12) next = 1;
      // Adjust day if month has fewer days
      const daysInNewMonth = getDaysInMonth(next, year);
      if (day > daysInNewMonth) {
        setDay(daysInNewMonth);
      }
      return next;
    });
  };

  const handleYearChange = (delta: number) => {
    ambientAudio.playPop();
    setErrorMessage('');
    setYear((prev) => {
      const currentIndex = YEARS.indexOf(prev);
      let nextIndex = currentIndex + delta;
      if (nextIndex < 0) nextIndex = YEARS.length - 1;
      if (nextIndex >= YEARS.length) nextIndex = 0;
      return YEARS[nextIndex];
    });
  };

  const handleUnlock = async () => {
    if (isVerifying || isUnlockedSuccess) return;
    setIsVerifying(true);
    setErrorMessage('');
    ambientAudio.playPop();

    // Verify against cryptographically hashed key
    const success = await unlockWithDate(day, month, year);

    if (success) {
      setIsUnlockedSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#E9C67B'],
      });
      // The store automatically updates scene to 'splash' on successful verification
    } else {
      setIsVerifying(false);
      setErrorCount((prev) => prev + 1);
      setErrorMessage(
        'Access Denied: Incorrect date of birth. Please verify and try again.'
      );
    }
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col items-center justify-between p-3 sm:p-5 overflow-hidden select-none bg-transparent">
      {/* Background Animated Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#FBCFE8]/35 blur-3xl animate-pulse-orb" />
        <div
          className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[#FFF0D9]/50 blur-3xl animate-pulse-orb"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Top Header */}
      <div className="relative z-10 w-full shrink-0 flex flex-col items-center text-center pt-0.5 sm:pt-1">
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-[#FBCFE8] shadow-xs mb-1">
          {isUnlockedSuccess ? (
            <Unlock className="w-3 h-3 text-[#10B981] animate-bounce" />
          ) : (
            <Lock className="w-3 h-3 text-[#F472B6]" />
          )}
          <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
            {isUnlockedSuccess ? 'Access Granted ✨' : 'Loveverse Security 🔐'}
          </span>
        </div>

        <h1 className="text-lg sm:text-2xl font-black text-[#5C243B] font-heading tracking-tight leading-tight">
          Meri Cutu Pattutuu&apos;s World
        </h1>
        <p className="text-[11px] sm:text-xs text-[#88506E] font-medium mt-0.5">
          Strictly Protected by Tumhare Pati Parmeshwar ❤️
        </p>
      </div>

      {/* Center Mascot & Interactive Date Picker Card */}
      <motion.div
        key={`card-${errorCount}`}
        initial={errorCount > 0 ? { x: -8 } : { opacity: 0, y: 10 }}
        animate={
          errorCount > 0
            ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-[340px] flex-1 min-h-0 flex flex-col items-center justify-center my-auto"
      >
        {/* Mascot */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center -mb-1 shrink-0">
          <Mochi pose={isUnlockedSuccess ? 'celebrate' : 'idle'} size={88} />
        </div>

        {/* Date Selector Glass Card */}
        <div className="w-full bg-white/92 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-2 border-[#FBCFE8] shadow-xl shadow-pink-200/40 flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#BE185D] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F472B6]" />
            <span>Select Your Special Date of Birth:</span>
          </div>

          {/* 3-Column Custom Wheel Picker */}
          <div className="w-full grid grid-cols-3 gap-2 sm:gap-2.5 py-0.5">
            {/* Day Column */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#9D6381] mb-0.5">
                Day
              </span>
              <button
                type="button"
                onClick={() => handleDayChange(1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Next Day"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Day Value Box */}
              <div className="w-full h-10 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFF0F5] to-[#FFE4EC] border-2 border-[#F472B6] flex items-center justify-center shadow-inner my-0.5">
                <span className="text-lg sm:text-xl font-black text-[#831843] font-heading">
                  {day.toString().padStart(2, '0')}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDayChange(-1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Previous Day"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Month Column */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#9D6381] mb-0.5">
                Month
              </span>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Next Month"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Month Value Box */}
              <div className="w-full h-10 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFF0F5] to-[#FFE4EC] border-2 border-[#F472B6] flex items-center justify-center shadow-inner my-0.5">
                <span className="text-base sm:text-lg font-black text-[#831843] font-heading">
                  {MONTH_NAMES[month - 1]}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Previous Month"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Year Column */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#9D6381] mb-0.5">
                Year
              </span>
              <button
                type="button"
                onClick={() => handleYearChange(1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Next Year"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              {/* Year Value Box */}
              <div className="w-full h-10 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFF0F5] to-[#FFE4EC] border-2 border-[#F472B6] flex items-center justify-center shadow-inner my-0.5">
                <span className="text-base sm:text-lg font-black text-[#831843] font-heading">
                  {year}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleYearChange(-1)}
                className="w-9 h-6 sm:h-7 flex items-center justify-center rounded-lg text-[#BE185D] hover:bg-pink-100 active:scale-90 transition cursor-pointer"
                aria-label="Previous Year"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Selected Date Preview Pill */}
          <div className="mt-2 px-3 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-[10px] sm:text-[11px] font-semibold text-[#831843]">
            Selected: <span className="font-bold">{day} {MONTH_NAMES[month - 1]} {year}</span> 🎂
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-1.5 px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-[10px] sm:text-[11px] font-semibold text-red-600 text-center leading-tight"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 w-full max-w-[340px] shrink-0 pt-1 pb-1 sm:pb-2">
        <button
          type="button"
          onClick={handleUnlock}
          disabled={isVerifying || isUnlockedSuccess}
          className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F472B6] via-[#EC4899] to-[#BE185D] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:brightness-105 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {isUnlockedSuccess ? (
            <>
              <Unlock className="w-4 h-4" />
              <span>Unlocked! ✨</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Unlock ✨</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
