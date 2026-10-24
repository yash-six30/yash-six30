'use client';

import React from 'react';
import { motion } from 'motion/react';

export type MochiPose = 'idle' | 'wave' | 'hop' | 'celebrate' | 'surprised';

interface MochiProps {
  pose?: MochiPose;
  dialogue?: string;
  size?: number;
  className?: string;
}

export const Mochi: React.FC<MochiProps> = ({
  pose = 'idle',
  dialogue,
  size = 140,
  className = '',
}) => {
  // Animation variants based on pose
  const getMotionAnimation = () => {
    switch (pose) {
      case 'wave':
        return {
          y: [0, -4, 0],
          rotate: [0, -3, 3, 0],
          transition: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' as const },
        };
      case 'hop':
        return {
          y: [0, -18, 0],
          scaleY: [1, 0.9, 1.05, 1],
          transition: { repeat: Infinity, duration: 0.8, ease: 'easeOut' as const },
        };
      case 'celebrate':
        return {
          y: [0, -14, 0],
          rotate: [-5, 5, -5],
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 1, ease: 'easeInOut' as const },
        };
      case 'surprised':
        return {
          scale: [1, 1.1, 1.05],
          y: -5,
          transition: { duration: 0.3 },
        };
      default: // idle
        return {
          y: [0, -4, 0],
          transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' as const },
        };
    }
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble if dialogue provided */}
      {dialogue && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative mb-2 px-4 py-2 max-w-[240px] text-center bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#FBCFE8] shadow-md text-xs sm:text-sm font-semibold text-[#51263B]"
        >
          {dialogue}
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
        </motion.div>
      )}

      {/* Illustrated Plush Bunny SVG */}
      <motion.div
        animate={getMotionAnimation()}
        style={{ width: size, height: size }}
        className="relative"
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Ears */}
          {/* Left Ear with Pink Bow */}
          <path
            d="M75 90 C 65 30, 85 10, 95 35 C 100 50, 95 75, 88 95 Z"
            fill="#FFF"
            stroke="#FDE2EC"
            strokeWidth="3"
          />
          <path
            d="M78 80 C 72 40, 84 25, 90 42 C 94 54, 91 70, 86 85 Z"
            fill="#FFD6E8"
          />

          {/* Right Ear */}
          <path
            d="M125 90 C 135 30, 115 10, 105 35 C 100 50, 105 75, 112 95 Z"
            fill="#FFF"
            stroke="#FDE2EC"
            strokeWidth="3"
          />
          <path
            d="M122 80 C 128 40, 116 25, 110 42 C 106 54, 109 70, 114 85 Z"
            fill="#FFD6E8"
          />

          {/* Satin Pink Bow on Left Ear */}
          <g transform="translate(70, 55)">
            <ellipse cx="6" cy="6" rx="9" ry="6" fill="#F472B6" transform="rotate(-30 6 6)" />
            <ellipse cx="18" cy="14" rx="9" ry="6" fill="#F472B6" transform="rotate(30 18 14)" />
            <circle cx="12" cy="10" r="4.5" fill="#DB2777" />
            <circle cx="11" cy="9" r="1.5" fill="#FFF" />
          </g>

          {/* Bunny Head & Body */}
          <ellipse cx="100" cy="120" rx="46" ry="42" fill="#FFFFFF" stroke="#FDE2EC" strokeWidth="2.5" />

          {/* Rosy Blush Cheeks */}
          <circle cx="72" cy="126" r="8" fill="#FBCFE8" opacity="0.8" />
          <circle cx="128" cy="126" r="8" fill="#FBCFE8" opacity="0.8" />

          {/* Large Shiny Dark Eyes */}
          <ellipse cx="82" cy="115" rx="5" ry="6.5" fill="#2E1020" />
          <circle cx="80.5" cy="113" r="2" fill="#FFF" />
          <ellipse cx="118" cy="115" rx="5" ry="6.5" fill="#2E1020" />
          <circle cx="116.5" cy="113" r="2" fill="#FFF" />

          {/* Nose & Mouth */}
          <ellipse cx="100" cy="122" rx="3.5" ry="2.5" fill="#F472B6" />
          <path
            d="M96 125 Q 100 128 104 125"
            stroke="#51263B"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Little Paws */}
          <ellipse cx="84" cy="154" rx="7" ry="6" fill="#FFF" stroke="#FDE2EC" strokeWidth="2" />
          <ellipse cx="116" cy="154" rx="7" ry="6" fill="#FFF" stroke="#FDE2EC" strokeWidth="2" />

          {/* Extra celebration sparkles */}
          {pose === 'celebrate' && (
            <g>
              <path d="M40 70 L43 78 L51 81 L43 84 L40 92 L37 84 L29 81 L37 78 Z" fill="#F59E0B" />
              <path d="M160 65 L162 71 L168 73 L162 75 L160 81 L158 75 L152 73 L158 71 Z" fill="#EC4899" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
