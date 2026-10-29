import { create } from 'zustand';
import { ambientAudio } from '@/lib/audio';

export type SceneId =
  | 'lock'
  | 'splash'
  | 'invitation'
  | 'island'
  | 'heart-garden'
  | 'memory-cottage'
  | 'birthday-cafe'
  | 'gift-castle'
  | 'secret-garden'
  | 'final-letter';

export interface AdventureState {
  currentScene: SceneId;
  isUnlocked: boolean;
  completedGames: string[];
  openedGifts: string[];
  revealedScratchCards: string[];
  collectedCharms: string[];
  musicEnabled: boolean;
  
  // Actions
  unlockWithDate: (day: number, month: number, year: number) => Promise<boolean>;
  setScene: (scene: SceneId) => void;
  nextScene: () => void;
  completeGame: (gameId: string) => void;
  awardCharm: (charmId: string) => void;
  openGift: (giftId: string) => void;
  revealScratchCard: (cardId: string) => void;
  toggleMusic: () => void;
  setMusicEnabled: (enabled: boolean) => void;
  resetAdventure: () => void;
}

// Strictly linear chapter sequence
const SCENE_ORDER: SceneId[] = [
  'lock',
  'splash',
  'invitation',
  'island',
  'heart-garden',
  'memory-cottage',
  'birthday-cafe',
  'gift-castle',
  'secret-garden',
  'final-letter',
];

// SHA-256 hash of salted birthday string for 30 October 2000
// Zero plaintext dates or numbers are stored in the client code
const HASHED_BIRTHDAY_KEY = '75a2e611e3debc9f0855dd769dbcc15a5f29f5a313d566b3432c409f3c4a6ae7';

async function verifyBirthdayHash(day: number, month: number, year: number): Promise<boolean> {
  try {
    const formattedDate = `shailaja-birthday-${year.toString().padStart(4, '0')}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}-pati-parmeshwar-loveverse-key`;
    const encoder = new TextEncoder();
    const data = encoder.encode(formattedDate);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const computedHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return computedHex === HASHED_BIRTHDAY_KEY;
  } catch {
    return false;
  }
}

const INITIAL_STATE = {
  currentScene: 'lock' as SceneId,
  isUnlocked: false,
  completedGames: [] as string[],
  openedGifts: [] as string[],
  revealedScratchCards: [] as string[],
  collectedCharms: [] as string[],
  musicEnabled: true,
};

// Pure in-memory store: resets on refresh every time
export const useAdventureStore = create<AdventureState>((set, get) => ({
  ...INITIAL_STATE,

  unlockWithDate: async (day, month, year) => {
    const isValid = await verifyBirthdayHash(day, month, year);
    if (isValid) {
      set({ isUnlocked: true, currentScene: 'splash' });
      return true;
    }
    return false;
  },

  // Strict guard: nobody can bypass the password lock screen manually
  setScene: (scene) => {
    const { isUnlocked } = get();
    if (!isUnlocked && scene !== 'lock') {
      set({ currentScene: 'lock' });
      return;
    }
    set({ currentScene: scene });
  },

  nextScene: () => {
    const { isUnlocked, currentScene } = get();
    if (!isUnlocked) {
      set({ currentScene: 'lock' });
      return;
    }
    const currentIndex = SCENE_ORDER.indexOf(currentScene);
    if (currentIndex < SCENE_ORDER.length - 1) {
      set({ currentScene: SCENE_ORDER[currentIndex + 1] });
    }
  },

  completeGame: (gameId) =>
    set((state) => {
      if (state.completedGames.includes(gameId)) return state;
      return { completedGames: [...state.completedGames, gameId] };
    }),

  awardCharm: (charmId) =>
    set((state) => {
      if (state.collectedCharms.includes(charmId)) return state;
      return { collectedCharms: [...state.collectedCharms, charmId] };
    }),

  openGift: (giftId) =>
    set((state) => {
      if (state.openedGifts.includes(giftId)) return state;
      return { openedGifts: [...state.openedGifts, giftId] };
    }),

  revealScratchCard: (cardId) =>
    set((state) => {
      if (state.revealedScratchCards.includes(cardId)) return state;
      return { revealedScratchCards: [...state.revealedScratchCards, cardId] };
    }),

  toggleMusic: () =>
    set((state) => {
      const next = !state.musicEnabled;
      ambientAudio.setMute(!next);
      return { musicEnabled: next };
    }),

  setMusicEnabled: (enabled) => {
    ambientAudio.setMute(!enabled);
    set({ musicEnabled: enabled });
  },

  resetAdventure: () => set(INITIAL_STATE),
}));
