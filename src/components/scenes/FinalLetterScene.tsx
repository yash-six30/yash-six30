'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { BIRTHDAY_LETTER } from '@/content/letter';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { ChevronRight, RotateCcw, Heart, Sparkles } from 'lucide-react';

export const FinalLetterScene: React.FC = () => {
  const { setScene, resetAdventure } = useAdventureStore();
  const [currentChapter, setCurrentChapter] = useState(0);

  const totalChapters = BIRTHDAY_LETTER.length;
  const section = BIRTHDAY_LETTER[currentChapter];
  const isLastChapter = currentChapter === totalChapters - 1;

  const handleNext = () => {
    ambientAudio.playPop();
    if (!isLastChapter) {
      setCurrentChapter((prev) => prev + 1);
    } else {
      // Grand celebration confetti
      confetti({
        particleCount: 130,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#F59E0B', '#E9C67B'],
      });
    }
  };

  const handleRestart = () => {
    ambientAudio.playPop();
    resetAdventure();
    setScene('splash');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 overflow-y-auto select-none bg-transparent">
      {/* Header */}
      <div className="text-center pt-1 z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-white/90 border border-[#FBCFE8] text-[11px] font-bold text-[#BE185D] tracking-wider uppercase mb-1">
          Letter • Part {currentChapter + 1} of {totalChapters}
        </span>
        <h2 className="text-xl sm:text-2xl font-sassy font-extrabold text-[#51263B]">
          {section.title}
        </h2>
      </div>

      {/* Elegant Letter Parchment Stationery */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-76 sm:w-84 bg-[#FFFDF9] rounded-3xl p-6 shadow-[0_25px_60px_rgba(190,24,93,0.18)] border-2 border-[#E9C67B]/70 flex flex-col text-[#51263B]"
          >
            {/* Delicate gold inner border */}
            <div className="absolute inset-2 border border-[#E9C67B]/35 rounded-2xl pointer-events-none" />

            {/* Rose wax seal emblem */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFF0D9] to-pink-100 border border-[#E9C67B] flex items-center justify-center text-[#BE185D] self-center mb-3.5 shadow-xs">
              <Heart className="w-5 h-5 fill-[#BE185D] text-[#BE185D] stroke-none" />
            </div>

            {/* Letter Body with Soft Spacing */}
            <div className="space-y-3 font-outfit text-xs sm:text-sm leading-relaxed whitespace-pre-line text-left px-1">
              {section.body.map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 mt-4">
          {BIRTHDAY_LETTER.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentChapter ? 'w-6 bg-[#BE185D]' : 'w-2 bg-pink-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Single Linear Bottom CTA */}
      <div className="w-full max-w-xs mx-auto pb-2 flex flex-col items-center gap-2 z-10">
        {!isLastChapter ? (
          <button
            onClick={handleNext}
            className="w-full py-4 px-6 rounded-2xl coquette-button font-sassy font-bold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
          >
            <span>Next Page ❤️</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-full flex flex-col items-center gap-2">
            <button
              onClick={handleNext}
              className="w-full py-4 px-6 rounded-2xl coquette-button font-sassy font-bold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Celebrate 🎉</span>
            </button>
            <button
              onClick={handleRestart}
              className="mt-1 text-xs text-[#88506E] hover:text-[#BE185D] flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Read From Start</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
