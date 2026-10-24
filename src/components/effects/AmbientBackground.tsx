'use client';

import React from 'react';

interface AmbientBackgroundProps {
  className?: string;
  opacityMultiplier?: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  className = '',
  opacityMultiplier = 1,
}) => {
  // Faint floating upward items (Hearts, Teddies, Gifts, Bows)
  // Negative delays guarantee items are already floating across the full screen on load!
  const upwardFloatingItems = [
    { id: 'up-1', char: '💖', left: '6%', delay: '-2.5s', duration: '15s', size: 'text-base', opacity: 0.24 },
    { id: 'up-2', char: '🧸', left: '20%', delay: '-7s', duration: '18s', size: 'text-lg', opacity: 0.22 },
    { id: 'up-3', char: '🎁', left: '36%', delay: '-11.5s', duration: '16s', size: 'text-base', opacity: 0.23 },
    { id: 'up-4', char: '💕', left: '52%', delay: '-4s', duration: '17s', size: 'text-sm', opacity: 0.24 },
    { id: 'up-5', char: '🧸', left: '68%', delay: '-9s', duration: '19s', size: 'text-xl', opacity: 0.22 },
    { id: 'up-6', char: '🎁', left: '84%', delay: '-13.5s', duration: '16s', size: 'text-sm', opacity: 0.23 },
    { id: 'up-7', char: '🎀', left: '14%', delay: '-5.5s', duration: '18s', size: 'text-sm', opacity: 0.21 },
    { id: 'up-8', char: '💗', left: '44%', delay: '-1s', duration: '19s', size: 'text-base', opacity: 0.25 },
    { id: 'up-9', char: '🧸', left: '30%', delay: '-14s', duration: '20s', size: 'text-sm', opacity: 0.22 },
    { id: 'up-10', char: '💖', left: '78%', delay: '-3s', duration: '17s', size: 'text-base', opacity: 0.24 },
    { id: 'up-11', char: '✨', left: '92%', delay: '-8s', duration: '15s', size: 'text-xs', opacity: 0.20 },
    { id: 'up-12', char: '🎁', left: '60%', delay: '-12s', duration: '18s', size: 'text-sm', opacity: 0.23 },
  ];

  // Faint drifting downward items (Petals, Sparkles)
  const downwardDriftingItems = [
    { id: 'down-1', char: '🌸', left: '10%', delay: '-2s', duration: '14s', size: 'text-sm', opacity: 0.18 },
    { id: 'down-2', char: '✨', left: '26%', delay: '-7s', duration: '16s', size: 'text-xs', opacity: 0.18 },
    { id: 'down-3', char: '🌸', left: '64%', delay: '-10s', duration: '13s', size: 'text-base', opacity: 0.19 },
    { id: 'down-4', char: '⭐', left: '82%', delay: '-4s', duration: '15s', size: 'text-xs', opacity: 0.17 },
  ];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Faint Floating Upward Hearts, Teddies & Gifts (reduced opacity 0.20 - 0.25) */}
      {upwardFloatingItems.map((p) => (
        <span
          key={p.id}
          className={`absolute -bottom-10 animate-float-up-faint ${p.size} filter drop-shadow-xs`}
          style={
            {
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--ambient-opacity': `${p.opacity * opacityMultiplier}`,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}

      {/* Faint Drifting Downward Petals & Sparkles (reduced opacity 0.17 - 0.19) */}
      {downwardDriftingItems.map((p) => (
        <span
          key={p.id}
          className={`absolute -top-8 animate-drift-down-faint ${p.size} filter drop-shadow-xs`}
          style={
            {
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--ambient-opacity': `${p.opacity * opacityMultiplier}`,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
