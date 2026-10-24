import { SceneId } from '@/store/adventure';

export interface SceneMeta {
  id: SceneId;
  order: number;
  title: string;
  subtitle: string;
  landmarkName?: string;
  icon: string;
  charmAwarded?: string;
  nextScene?: SceneId;
}

export const SCENE_CONFIG: Record<SceneId, SceneMeta> = {
  'lock': {
    order: 0,
    id: 'lock',
    title: 'Loveverse Gate',
    subtitle: 'Birthday Verification',
    icon: '🔐',
    nextScene: 'splash',
  },
  'splash': {
    order: 1,
    id: 'splash',
    title: 'Happy Birthday',
    subtitle: 'From Your Pati Parmeshwar',
    icon: '💍',
    nextScene: 'invitation',
  },
  'invitation': {
    order: 1,
    id: 'invitation',
    title: 'A Special Invitation',
    subtitle: 'From Mochi with Love',
    icon: '💌',
    nextScene: 'island',
  },
  'island': {
    order: 2,
    id: 'island',
    title: 'Our Birthday Trail',
    subtitle: 'Follow the magical path',
    icon: '✨',
    nextScene: 'heart-garden',
  },
  'heart-garden': {
    order: 3,
    id: 'heart-garden',
    title: 'Heart Garden',
    subtitle: 'Catch My Hearts',
    landmarkName: 'Heart Garden',
    icon: '💖',
    charmAwarded: 'heart-charm',
    nextScene: 'memory-cottage',
  },
  'memory-cottage': {
    order: 4,
    id: 'memory-cottage',
    title: 'Memory Cottage',
    subtitle: 'Our Milestones & Scrapbook',
    landmarkName: 'Memory Cottage',
    icon: '🏡',
    charmAwarded: 'memory-keepsake',
    nextScene: 'birthday-cafe',
  },
  'birthday-cafe': {
    order: 5,
    id: 'birthday-cafe',
    title: 'Birthday Café',
    subtitle: 'Decorate & Make a Wish',
    landmarkName: 'Birthday Café',
    icon: '🎂',
    charmAwarded: 'wish-charm',
    nextScene: 'gift-castle',
  },
  'gift-castle': {
    order: 6,
    id: 'gift-castle',
    title: 'Gift Castle',
    subtitle: 'Unlock Digital Love Coupons',
    landmarkName: 'Gift Castle',
    icon: '🏰',
    charmAwarded: 'castle-key',
    nextScene: 'secret-garden',
  },
  'secret-garden': {
    order: 7,
    id: 'secret-garden',
    title: 'Secret Garden',
    subtitle: 'Scratch-to-Reveal Cards',
    landmarkName: 'Secret Garden',
    icon: '🌙',
    charmAwarded: 'golden-envelope',
    nextScene: 'final-letter',
  },
  'final-letter': {
    order: 8,
    id: 'final-letter',
    title: 'My Birthday Letter',
    subtitle: 'To Shailaja, With All My Heart',
    icon: '📜',
  },
};
