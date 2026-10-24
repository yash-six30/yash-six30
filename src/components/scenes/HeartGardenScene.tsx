'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  isGold: boolean;
  size: number;
}

export const HeartGardenScene: React.FC = () => {
  const { awardCharm, completeGame, setScene } = useAdventureStore();
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const targetScore = 12; // Pick 12 hearts

  const getCompliment = () => {
    if (score >= 12) return "You caught all 12 hearts! But you've had my heart all along, Kuchu Puchu! 💕";
    if (score >= 9) return "9 hearts! Look at those super quick reflexes, Cutu Pattutuu! ✨";
    if (score >= 6) return "6 hearts collected! Halfway there, Bubu! 💖";
    if (score >= 3) return "Great start, Raja Beta! 🌸";
    return "Tap the floating hearts to catch all 12!";
  };

  const handleStartGame = () => {
    setScore(0);
    setIsPlaying(true);
    setIsWon(false);
    ambientAudio.playPop();
  };

  // Heart spawner
  useEffect(() => {
    if (!isPlaying || isWon) return;

    const spawner = setInterval(() => {
      setHearts((prev) => {
        if (prev.length >= 5) return prev;
        const newHeart: FloatingHeart = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 68) + 12,
          y: Math.floor(Math.random() * 52) + 18,
          isGold: Math.random() < 0.2,
          size: Math.floor(Math.random() * 12) + 44, // Generous hit size
        };
        return [...prev, newHeart];
      });
    }, 600);

    return () => clearInterval(spawner);
  }, [isPlaying, isWon]);

  const handleCatchHeart = (id: number, isGold: boolean) => {
    ambientAudio.playPop();
    const points = isGold ? 2 : 1;
    const newScore = Math.min(targetScore, score + points);
    setScore(newScore);

    setHearts((prev) => prev.filter((h) => h.id !== id));

    if (newScore >= targetScore) {
      handleWin();
    }
  };

  const handleWin = () => {
    setIsPlaying(false);
    setIsWon(true);
    awardCharm('heart-charm');
    completeGame('hearts');

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9'],
    });
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 z-10 px-1 pt-0.5 sm:pt-1">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#FBCFE8] shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#BE185D] fill-[#BE185D]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#BE185D]">
            {score} / {targetScore} Hearts
          </span>
        </div>

        <span className="text-[11px] sm:text-xs font-bold text-[#88506E]">
          Chapter 1: Heart Garden 🌸
        </span>
      </div>

      {/* Playfield Area */}
      <div className="relative flex-1 min-h-0 w-full my-1.5 sm:my-2 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-pink-50/70 to-pink-100/50 border-2 border-[#FBCFE8] overflow-hidden flex items-center justify-center">
        {!isPlaying && !isWon && (
          <div className="text-center p-4 sm:p-6 flex flex-col items-center">
            <Mochi
              pose="wave"
              size={90}
              dialogue="Catch all 12 sweet hearts floating in the breeze, Kuchu Puchu! Ready?"
              className="mb-3"
            />
            <button
              onClick={handleStartGame}
              className="py-2.5 sm:py-3 px-6 sm:px-8 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm shadow-md active:scale-95 cursor-pointer"
            >
              Start Catching 💖
            </button>
          </div>
        )}

        {/* Tappable Floating Hearts */}
        {isPlaying && (
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.button
                key={heart.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{
                  y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
                }}
                style={{
                  position: 'absolute',
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  width: Math.min(heart.size, 46),
                  height: Math.min(heart.size, 46),
                }}
                onClick={() => handleCatchHeart(heart.id, heart.isGold)}
                className="flex items-center justify-center cursor-pointer active:scale-90"
              >
                <Heart
                  className={`w-full h-full drop-shadow-md ${
                    heart.isGold
                      ? 'text-amber-400 fill-amber-400 animate-pulse'
                      : 'text-[#F472B6] fill-[#F472B6]'
                  }`}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        )}

        {/* Win Modal */}
        {isWon && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 sm:p-5 text-center max-w-[280px] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-[#FBCFE8] shadow-2xl flex flex-col items-center"
          >
            <Mochi pose="celebrate" size={75} className="mb-1" />
            <h3 className="text-base sm:text-lg font-sassy font-bold text-[#51263B] mb-1">
              Heart Charm Awarded! ✨
            </h3>
            <p className="text-[11px] sm:text-xs text-[#88506E] mb-3 leading-relaxed">
              &quot;You caught all 12 hearts, Babu… but you have had my whole heart all along.&quot;
            </p>
            <button
              onClick={() => setScene('memory-cottage')}
              className="w-full py-2.5 sm:py-3 px-5 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
            >
              <span>Next Chapter →</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom status */}
      <div className="text-center shrink-0 py-0.5 sm:py-1">
        <p className="text-[11px] sm:text-xs font-semibold text-[#BE185D] italic">
          {getCompliment()}
        </p>
      </div>
    </div>
  );
};
