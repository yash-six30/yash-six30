'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { useAdventureStore } from '@/store/adventure';
import { MEMORY_SLOTS, MemorySlot } from '@/content/memories';
import { Mochi } from '@/components/mascot/Mochi';
import { ambientAudio } from '@/lib/audio';
import { getAssetPath } from '@/lib/assets';
import confetti from 'canvas-confetti';
import { ArrowRight, Heart } from 'lucide-react';

interface PremiumCardProps {
  memory: MemorySlot;
  index: number;
  total: number;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
}

const extensions = ['.jpeg', '.jpg', '.png', '.webp', '.JPG', '.PNG', '.JPEG', '.WEBP'];

const PremiumStackCard: React.FC<PremiumCardProps> = ({
  memory,
  index,
  total,
  isTop,
  onSwipe,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-22, 22]);
  const rotateY = useTransform(x, [-250, 250], [-15, 15]);
  const opacity = useTransform(x, [-200, -120, 0, 120, 200], [0.4, 0.95, 1, 0.95, 0.4]);

  const [extIndex, setExtIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailedAll, setImgFailedAll] = useState(false);

  const basePathWithoutExt = memory.image.replace(/\.[^/.]+$/, '');
  const currentImgSrc =
    extIndex === 0
      ? getAssetPath(memory.image)
      : getAssetPath(`${basePathWithoutExt}${extensions[extIndex - 1]}`);

  const handleImageError = () => {
    if (extIndex < extensions.length) {
      setExtIndex((prev) => prev + 1);
    } else {
      setImgFailedAll(true);
    }
  };

  // Subtle rotation offsets for stacked cards beneath
  const rotations = [0, 3.5, -3, 2, -2.5];
  const bgRotation = rotations[index % rotations.length];
  const bgScale = Math.max(0.88, 1 - index * 0.045);
  const bgOffsetY = index * 12;

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 85 || Math.abs(info.velocity.x) > 350) {
      const dir = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(dir);
    }
  };

  return (
    <motion.div
      style={
        isTop
          ? { x, rotate, rotateY, opacity, transformStyle: 'preserve-3d' }
          : { rotate: bgRotation, scale: bgScale, y: bgOffsetY }
      }
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      initial={{ scale: 0.9, opacity: 0, y: bgOffsetY + 20 }}
      animate={{
        scale: isTop ? 1 : bgScale,
        opacity: 1,
        y: isTop ? 0 : bgOffsetY,
        transition: { type: 'spring', stiffness: 350, damping: 28 },
      }}
      exit={{
        x: Math.random() > 0.5 ? 450 : -450,
        opacity: 0,
        rotate: Math.random() > 0.5 ? 28 : -28,
        transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
      }}
      className={`absolute w-[325px] sm:w-[350px] bg-white/98 rounded-3xl p-3.5 sm:p-4 border-2 border-[#FBCFE8]/80 select-none ${
        isTop
          ? 'cursor-grab active:cursor-grabbing z-30 shadow-[0_25px_50px_-12px_rgba(190,24,93,0.25)]'
          : 'pointer-events-none shadow-[0_15px_30px_-10px_rgba(190,24,93,0.12)]'
      }`}
    >
      {/* Premium washi tape at top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-gradient-to-r from-[#FFF0D9] via-[#FFEBF2] to-[#FFF0D9] border border-amber-200/70 rounded-xs shadow-xs rotate-[-1deg] z-20 flex items-center justify-center">
        <span className="text-[9px] font-bold tracking-widest text-[#BE185D]/70 uppercase">
          Love Memory
        </span>
      </div>

      {/* Glossy Polaroid Photo Container - Enlarged for crystal clear visibility */}
      <div className="relative w-full h-[295px] sm:h-[320px] bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50/70 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 border border-pink-200/60 shadow-inner">
        {/* Real photo */}
        {!imgFailedAll && (
          <img
            key={currentImgSrc}
            src={currentImgSrc}
            alt={memory.alt}
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Fallback Sticker / Placeholder when no image loaded */}
        {(!imgLoaded || imgFailedAll) && (
          <>
            <span className="text-4xl mb-2 drop-shadow-sm filter">{memory.sticker}</span>
            <h4 className="text-base font-sassy font-extrabold text-[#BE185D] text-center px-2 leading-snug">
              {memory.title}
            </h4>
            <span className="text-[11px] text-[#88506E] font-medium mt-1 text-center">
              {memory.tagline}
            </span>
          </>
        )}

        {/* Counter Badge */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#BE185D] shadow-xs border border-[#FBCFE8] z-10">
          {memory.order} / {total}
        </div>
      </div>

      {/* Handwritten Title & Message Area */}
      <div className="w-full mt-3 text-center px-1">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="text-sm">{memory.sticker}</span>
          <h4 className="text-sm font-sassy font-extrabold text-[#BE185D]">
            {memory.title}
          </h4>
        </div>
        <p className="text-xs font-outfit text-[#51263B] leading-relaxed italic font-medium">
          &quot;{memory.caption}&quot;
        </p>
      </div>

      {/* Elegant swipe helper */}
      {isTop && (
        <div className="mt-2 text-[10px] text-[#BE185D]/75 font-bold flex items-center justify-center gap-1.5 tracking-wide">
          <span>👈 Swipe card to flip 👉</span>
        </div>
      )}
    </motion.div>
  );
};

export const MemoryCottageScene: React.FC = () => {
  const { awardCharm, completeGame, setScene } = useAdventureStore();
  const [cards, setCards] = useState<MemorySlot[]>(MEMORY_SLOTS);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSwipeCard = () => {
    ambientAudio.playPop();
    if (cards.length > 1) {
      setCards((prev) => prev.slice(1));
    } else {
      handleFinishMemories();
    }
  };

  const handleFinishMemories = () => {
    setIsCompleted(true);
    awardCharm('memory-keepsake');
    completeGame('memories');

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#BE185D', '#FBCFE8', '#FFF0D9', '#F59E0B'],
    });
  };

  const handleGoToNextScene = () => {
    ambientAudio.playPop();
    setScene('birthday-cafe');
  };

  const isLastCard = cards.length === 1;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 overflow-hidden select-none bg-transparent">
      {/* Header */}
      <div className="text-center pt-1 z-20">
        <span className="text-[11px] font-bold text-[#BE185D] uppercase tracking-wider">
          Chapter 2: Memory Lane 🏡
        </span>
        <h2 className="text-xl font-sassy font-extrabold text-[#51263B]">
          All About My Shailaja
        </h2>
        <p className="text-xs text-[#88506E] mt-0.5">
          Swipe through your cutest, funniest, and most iconic moments!
        </p>
      </div>

      {/* Stacked Cards Area */}
      <div className="flex-1 w-full flex items-center justify-center relative my-2" style={{ perspective: 1000 }}>
        <AnimatePresence mode="popLayout">
          {!isCompleted ? (
            <div className="relative w-[325px] sm:w-[350px] h-[440px] sm:h-[465px] flex items-center justify-center">
              {cards.slice(0, 3).map((mem, idx) => (
                <PremiumStackCard
                  key={mem.id}
                  memory={mem}
                  index={idx}
                  total={MEMORY_SLOTS.length}
                  isTop={idx === 0}
                  onSwipe={handleSwipeCard}
                />
              ))}
            </div>
          ) : (
            /* Keepsake Completion Card */
            <motion.div
              key="keepsake-unlocked"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 text-center max-w-xs bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#FBCFE8] shadow-2xl flex flex-col items-center z-30"
            >
              <Mochi pose="celebrate" size={110} className="mb-2" />
              <h3 className="text-lg font-sassy font-bold text-[#51263B] mb-1">
                Memory Keepsake Collected! ✨
              </h3>
              <p className="text-xs text-[#88506E] mb-4 leading-relaxed">
                &quot;You are my favorite comedy show, my favorite drama, and my most favorite person in the entire world, Kuchu Puchu.&quot;
              </p>
              <button
                onClick={handleGoToNextScene}
                className="w-full py-3.5 px-5 rounded-2xl coquette-button font-sassy font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Next Chapter →</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Button Action */}
      {!isCompleted && (
        <div className="w-full max-w-xs mx-auto pb-2 z-20 text-center">
          <button
            onClick={handleSwipeCard}
            className="w-full py-3.5 px-6 rounded-2xl coquette-button font-sassy font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
          >
            <span>{isLastCard ? 'Complete Memories ✨' : 'Next Memory ❤️'}</span>
            <Heart className="w-4 h-4 fill-white stroke-none" />
          </button>
          <p className="text-[10px] text-[#88506E]/70 mt-1.5">
            {cards.length} {cards.length === 1 ? 'card' : 'cards'} remaining in the deck
          </p>
        </div>
      )}
    </div>
  );
};
