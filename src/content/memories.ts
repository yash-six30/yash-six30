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
    tagline: 'Iconic dialogue of the century 😂',
    caption: 'Sach me 10 minute tak has has ke lot-pot ho gaya tha! Sirf tum hi itna dramatic aur cute ek saath bol sakti ho.',
    image: '/photos/01-toot-jaungi.jpeg',
    alt: 'Baby mai toot jaungi moment',
    sticker: '🤣❤️',
  },
  {
    id: 'snap-bombs',
    order: 2,
    title: 'Random Snap Bombs',
    tagline: 'Office ke beech me tumhare messages ✨',
    caption: 'Din bhar me tumhara random snap bombing karna ya jab mai office me hota hu aur tumhara text aana—"Baby kab aaoge, I miss you"—sach me poora din bana deta hai!',
    image: '/photos/02-snap-bombs.jpeg',
    alt: 'Random snaps and DMs',
    sticker: '💣📱',
  },
  {
    id: 'moody-faces',
    order: 3,
    title: 'Trademark "😒😒😒" Face',
    tagline: 'Nakhre aur drama queen vibes 😤🎀',
    caption: 'Tumhara trademark emoji "😒😒😒" ya tumhara iss tarah se moo banana... ufff sach me jaan le leti ho!',
    image: '/photos/03-moody.jpeg',
    alt: 'Moody facial expression',
    sticker: '😒🎀',
  },
  {
    id: 'ethnic-gorgeous',
    order: 4,
    title: 'Desi & Party Look',
    tagline: 'Breathtaking goddess vibes 👗💫',
    caption: 'Jab tum saree, dress, suit, ya lehnga pehenti ho... ufff sach me pagal kar deti ho!',
    image: '/photos/04-ethnic.jpeg',
    alt: 'Looking gorgeous in lehnga / dress',
    sticker: '👑✨',
  },
  {
    id: 'snap-kisses',
    order: 5,
    title: 'Snap Kisses 💋',
    tagline: 'Pyari si flying kisses 😘',
    caption: 'Baat karte karte snaps me tumhara wo random flying kisses dena—ek second me mera mood fresh ho jata hai, Kuchu Puchu!',
    image: '/photos/05-kisses.jpeg',
    alt: 'Kisses in snaps',
    sticker: '😘💕',
  },
  {
    id: 'cute-anger',
    order: 6,
    title: 'Gusse Wala Cute Avatar',
    tagline: 'Dhamki bhari par super cute vibes 🔥',
    caption: 'Laal gaal karke gussa dikhana, kasam se cutuu pattutuu lagti ho... haa mai darr bhi jaata hu waise!',
    image: '/photos/06-anger.jpeg',
    alt: 'Cute angry face',
    sticker: '😾🌸',
  },
  {
    id: 'expressions-galore',
    order: 7,
    title: 'Expressions Ki Dukaan',
    tagline: 'Chalti-phirti Bollywood heroine 📸',
    caption: 'Aankhein ghumane se leke ajeeb-o-gareeb cute smirks tak... har 30 second me tumhare face pe ek nayi filmy story chalti hai.',
    image: '/photos/07-expressions.jpeg',
    alt: 'Crazy funny facial expressions',
    sticker: '🤪📸',
  },
  {
    id: 'morning-face',
    order: 8,
    title: 'Sleepy Head Baby',
    tagline: 'Neend me bhari pyari aawaz 🧸',
    caption: 'Bikhre baal, suji hui aankhein aur wo pyari aalas bhari awaz me kehna "bas 5 minute aur"... mera sabse favourite scene!',
    image: '/photos/08-morning.jpeg',
    alt: 'Morning sleepy face',
    sticker: '😴🧸',
  },
  {
    id: 'radiant-smile',
    order: 9,
    title: 'Million Dollar Smile',
    tagline: 'Poori duniya roshan kar de 🌟',
    caption: 'Wo dil khol ke hasna jisme naak sikud jaati hai... kasam se poori duniya ek pal me pyari aur khubsurat lagne lagti hai.',
    image: '/photos/09-smile.jpeg',
    alt: 'Her beautiful smile',
    sticker: '💖✨',
  },
  {
    id: 'festive-look',
    order: 10,
    title: 'Festive Rani Look',
    tagline: 'Diwali ke deepak se bhi zyada glow ✨',
    caption: 'Jhumke, bindi, chehre ka glow aur aankhon me wo shararat... traditional look me tumhare aage sab fail hai.',
    image: '/photos/10-festive.jpeg',
    alt: 'Festive celebratory look',
    sticker: '🪔💃',
  },
];
