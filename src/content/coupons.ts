export interface CouponData {
  id: 'hugs' | 'princess-treatment' | 'bumkissies';
  title: string;
  tagline: string;
  description: string;
  terms: string;
  badge: string;
  icon: string;
  isSuspense?: boolean;
}

export const LOVE_COUPONS: CouponData[] = [
  {
    id: 'hugs',
    title: 'Unlimited Warm Hugs',
    tagline: 'Instant Comfort & Warmth 🧸',
    description: 'Redeemable anytime you need a hug, gentle comfort, reassurance, or simply for no reason at all.',
    terms: 'Valid forever. No expiration date. Multiple daily uses encouraged.',
    badge: '100% Guaranteed',
    icon: '🧸',
  },
  {
    id: 'princess-treatment',
    title: 'Unlimited Princess Treatments Forever',
    tagline: 'Royalty Mode Activated 👑✨',
    description: 'A lifetime pass for maximum pampering, being spoiled rotten, breakfast in bed, shoulder rubs, and getting whatever your heart desires.',
    terms: 'Valid for life. Your Pati Parmeshwar is officially on royal service duty 24/7.',
    badge: 'Royal Edition 👑',
    icon: '👸',
  },
  {
    id: 'bumkissies',
    title: 'Bumkissies 🍑😘',
    tagline: 'Top Secret Ultimate Mystery Gift! 🙈',
    description: 'The most exclusive, scandalous, and affectionate birthday coupon in history: Unlimited Bumkissies on demand! Strictly non-refundable and guaranteed to make you giggle.',
    terms: 'Valid anytime, anywhere. Unlimited redemptions allowed. No takesies-backsies! 😂💕',
    badge: 'Ultra Secret 🍑',
    icon: '🍑',
    isSuspense: true,
  },
];
