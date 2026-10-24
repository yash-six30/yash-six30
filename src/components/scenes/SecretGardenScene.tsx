'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ScratchCardItem {
  id: number;
  secret: string;
  subtext: string;
  icon: string;
}

export const SecretGardenScene: React.FC = () => {
  const { awardCharm, completeGame, setScene } = useAdventureStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratchingRef = useRef(false);
  const scratchedPixelsRef = useRef(0);

  const cards: ScratchCardItem[] = [
    {
      id: 0,
      secret: "You're my favorite notification.",
      subtext: 'Har ek message tumhara dekh ke mere chehre pe sabse badi smile aati hai, Kuchu Puchu.',
      icon: '📱',
    },
    {
      id: 1,
      secret: 'One extra-long hug is waiting for you.',
      subtext: 'Wo wali warm hug jisme poori duniya gayab ho jaati hai aur bas hum dono hote hain, Cutu Pattutuu.',
      icon: '🧸',
    },
    {
      id: 2,
      secret: "I'd choose you all over again.",
      subtext: 'Har janam, har universe me... I will always choose you, meri Shailaja.',
      icon: '🌸',
    },
  ];

  const currentCard = cards[currentCardIndex];
  const isLastCard = currentCardIndex === cards.length - 1;

  // Initialize Canvas Foil
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    scratchedPixelsRef.current = 0;
    const width = canvas.width;
    const height = canvas.height;

    // Rose-gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F472B6');
    grad.addColorStop(0.5, '#FBCFE8');
    grad.addColorStop(1, '#E9C67B');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#BE185D';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch here with your finger ✨', width / 2, height / 2);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      initCanvas();
    }
  }, [currentCardIndex, isRevealed, initCanvas]);

  const handlePointerDown = () => {
    isScratchingRef.current = true;
  };

  const handlePointerUp = () => {
    isScratchingRef.current = false;
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Sample pixels on a low-res grid for instant performance
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentCount = 0;
      const totalPixels = data.length / 4;

      for (let i = 3; i < data.length; i += 32) {
        if (data[i] === 0) {
          transparentCount++;
        }
      }

      const ratio = transparentCount / (totalPixels / 8);
      // Auto reveal once ~38% is scratched
      if (ratio > 0.38 && !isRevealed) {
        handleCardRevealed();
      }
    } catch {
      // Canvas error fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixelsRef.current++;
    if (scratchedPixelsRef.current % 8 === 0) {
      checkScratchProgress();
    }
  };

  const handleCardRevealed = () => {
    ambientAudio.playPop();
    setIsRevealed(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9'],
    });

    if (isLastCard) {
      awardCharm('golden-envelope');
      completeGame('scratch');
    }
  };

  const handleNext = () => {
    ambientAudio.playPop();
    if (!isLastCard) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      setScene('final-letter');
    }
  };

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="text-center shrink-0 pt-0.5 sm:pt-1">
        <span className="text-[10px] sm:text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
          Chapter 5: Secret Garden 🌙
        </span>
        <h2 className="text-lg sm:text-xl font-sassy font-extrabold text-[#51263B] leading-tight">
          Secret Love Notes
        </h2>
        <p className="text-[11px] sm:text-xs text-[#88506E] mt-0.5">
          Card {currentCardIndex + 1} of {cards.length} for my Bebu
        </p>
      </div>

      {/* Scratch Card Area */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center my-auto">
        <div className="relative w-[min(280px,85vw)] sm:w-80 h-44 sm:h-52 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#FBCFE8] flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Secret Note under foil */}
          <div className="flex flex-col items-center justify-center h-full px-2">
            <span className="text-2xl sm:text-3xl mb-1">{currentCard.icon}</span>
            <h3 className="text-sm sm:text-base font-sassy font-bold text-[#BE185D] leading-snug">
              &quot;{currentCard.secret}&quot;
            </h3>
            <p className="text-[10px] sm:text-xs text-[#88506E] mt-1.5 italic leading-relaxed line-clamp-3">
              {currentCard.subtext}
            </p>
          </div>

          {/* Canvas Scratch Foil */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              width={320}
              height={208}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          )}
        </div>
      </div>

      {/* Single Linear Action at Bottom */}
      <div className="w-full max-w-xs shrink-0 mx-auto pb-1 sm:pb-2 pt-0.5 text-center">
        {isRevealed ? (
          <button
            onClick={handleNext}
            className="w-full py-2.5 sm:py-3.5 px-6 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <span>
              {isLastCard ? 'Final Chapter →' : 'Next Card ✨'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Mochi
            pose="wave"
            size={65}
            dialogue="Scratch off the gold foil with your finger to read the secret note!"
          />
        )}
      </div>
    </div>
  );
};
