export interface MemorySlot {
  id: string;
  order: number;
  title: string;
  tagline: string;
  caption: string;
  image: string;
  alt: string;
  sticker: string;
}

export const MEMORY_SLOTS: MemorySlot[] = [
  {
    id: 'toot-jaungi',
    order: 1,
    title: '"Baby Mai Toot Jaungi"',
    tagline: 'The iconic dialogue of the century 😂',
    caption: 'I swear I was laughing on the floor for 10 minutes straight. Only you can say something so dramatic and so precious at the exact same time!',
    image: '/photos/01-toot-jaungi.jpeg',
    alt: 'Baby mai toot jaungi moment',
    sticker: '🤣❤️',
  },
  {
    id: 'snap-bombs',
    order: 2,
    title: 'Random DMs & Snap Bombs',
    tagline: 'My favorite notifications 📱✨',
    caption: 'Waking up to 15 missed snaps and random "I miss you" texts is literally the highlight of my day, every single day.',
    image: '/photos/02-snap-bombs.jpeg',
    alt: 'Random snaps and DMs',
    sticker: '💌💣',
  },
  {
    id: 'moody-faces',
    order: 3,
    title: 'Moody Drama Queen',
    tagline: 'When the mood swings hit 😤',
    caption: 'The crossed arms, the dramatic sigh, and the little pout—even when you are being moody, you are the cutest human alive.',
    image: '/photos/03-moody.jpeg',
    alt: 'Moody facial expression',
    sticker: '🥺🎀',
  },
  {
    id: 'ethnic-gorgeous',
    order: 4,
    title: 'Ethnic & Party Glamour',
    tagline: 'Pure goddess energy ✨👗',
    caption: 'Whenever you wear a lehnga, traditional ethnic wear, or party dresses, my jaw literally drops. Just completely breathtaking.',
    image: '/photos/04-ethnic.jpeg',
    alt: 'Looking gorgeous in lehnga / dress',
    sticker: '👑✨',
  },
  {
    id: 'snap-kisses',
    order: 5,
    title: 'Snap Kisses 💋',
    tagline: 'Blowing kisses in snaps 😘',
    caption: 'Those random cute kisses in your snaps when we talk—instantly making my whole day brighter, Kuchu Puchu!',
    image: '/photos/05-kisses.jpeg',
    alt: 'Kisses in snaps',
    sticker: '😘💕',
  },
  {
    id: 'cute-anger',
    order: 6,
    title: 'Her Angry Mode',
    tagline: 'Fierce but 100% adorable 😾',
    caption: 'Trying to look intimidating with red cheeks and an angry face, while looking exactly like a fluffy grumpy kitten.',
    image: '/photos/06-anger.jpeg',
    alt: 'Cute angry face',
    sticker: '🔥🌸',
  },
  {
    id: 'expressions-galore',
    order: 7,
    title: '1,001 Facial Expressions',
    tagline: 'Living breathing meme machine 😂',
    caption: 'From rolling eyes to silly goofy smirks, your face tells an entire dramatic Bollywood story every 30 seconds.',
    image: '/photos/07-expressions.jpeg',
    alt: 'Crazy funny facial expressions',
    sticker: '🤪📸',
  },
  {
    id: 'morning-face',
    order: 8,
    title: 'Morning Sleepy Baby',
    tagline: 'Bedhead & sleepy yawns ☀️',
    caption: 'Puffy eyes, tangled hair, and that cute sleepy voice saying "5 more minutes"—my most favorite version of you.',
    image: '/photos/08-morning.jpeg',
    alt: 'Morning sleepy face',
    sticker: '😴🧸',
  },
  {
    id: 'radiant-smile',
    order: 9,
    title: 'That Million-Dollar Smile',
    tagline: 'Lights up my entire universe 🌟',
    caption: 'The genuine, unrestrained laugh that crinkles your nose and makes the whole world feel light and warm.',
    image: '/photos/09-smile.jpeg',
    alt: 'Her beautiful smile',
    sticker: '💖✨',
  },
  {
    id: 'festive-look',
    order: 10,
    title: 'Festive Queen Look',
    tagline: 'Shining brighter than festival lights 🪔',
    caption: 'Jhumkas, bindi, radiant glow, and that playful sparkle in your eyes. Nobody does festive beauty like you do.',
    image: '/photos/10-festive.jpeg',
    alt: 'Festive celebratory look',
    sticker: '🪔💃',
  },
];
