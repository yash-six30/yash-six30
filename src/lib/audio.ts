import { Howl } from 'howler';
import { getAssetPath } from './assets';

class AudioService {
  private bgm: Howl | null = null;
  private isMuted: boolean = false;
  private isLoaded: boolean = false;
  private hasInteractionListener: boolean = false;

  private initBgm() {
    if (this.bgm || typeof window === 'undefined') return;

    this.bgm = new Howl({
      src: [getAssetPath('/audio/birthday.mp3')],
      html5: false, // Use Web Audio API: avoids HTML5 audio pool exhaustion and unlocks seamlessly on touch
      loop: true,
      volume: 0.28, // Soft, gentle romantic ambient volume
      autoplay: false,
      preload: true,
      onload: () => {
        this.isLoaded = true;
      },
      onloaderror: (_id, err) => {
        console.warn('Could not load birthday audio:', err);
      },
      onplayerror: (_id, _err) => {
        // Autoplay policy prevented playback: wait for user interaction to unlock
        this.setupAutoplayUnlock();
      },
    });
  }

  /**
   * Set up fallback listeners to start audio on the first user interaction
   * if initial autoplay was blocked by the browser.
   */
  private setupAutoplayUnlock() {
    if (this.hasInteractionListener || typeof window === 'undefined' || this.isMuted) return;
    this.hasInteractionListener = true;

    const unlockHandler = () => {
      if (!this.isMuted) {
        this.play();
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', unlockHandler, true);
      window.removeEventListener('touchstart', unlockHandler, true);
      window.removeEventListener('click', unlockHandler, true);
      window.removeEventListener('keydown', unlockHandler, true);
      this.hasInteractionListener = false;
    };

    window.addEventListener('pointerdown', unlockHandler, { capture: true, once: true });
    window.addEventListener('touchstart', unlockHandler, { capture: true, once: true });
    window.addEventListener('click', unlockHandler, { capture: true, once: true });
    window.addEventListener('keydown', unlockHandler, { capture: true, once: true });
  }

  /**
   * Proactively attempts to start background music as soon as possible.
   * If browser autoplay restrictions block it, automatically unlocks on first touch/click.
   */
  public startAutoplay() {
    if (this.isMuted) return;
    this.initBgm();
    this.play();
    this.setupAutoplayUnlock();
  }

  public play() {
    if (this.isMuted) return;
    this.initBgm();
    if (!this.bgm) return;
    this.bgm.mute(false);
    if (!this.bgm.playing()) {
      try {
        const id = this.bgm.play();
        if (id === null) {
          this.setupAutoplayUnlock();
        }
      } catch {
        this.setupAutoplayUnlock();
      }
    }
  }

  public pause() {
    if (!this.bgm) return;
    this.bgm.pause();
  }

  public stop() {
    if (!this.bgm) return;
    this.bgm.stop();
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.bgm) {
      if (mute) {
        this.bgm.mute(true);
        this.bgm.pause();
      } else {
        this.bgm.mute(false);
        this.play();
      }
    }
  }

  public toggle() {
    const nextMute = !this.isMuted;
    this.setMute(nextMute);
    return !nextMute;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isPlaying(): boolean {
    return this.bgm ? this.bgm.playing() : false;
  }

  // Gentle pop sound effect for clicks
  public playPop() {
    if (typeof window === 'undefined') return;
    
    // Also try to kickstart bgm if user interacted but bgm hadn't started yet
    if (!this.isMuted && this.bgm && !this.bgm.playing()) {
      this.play();
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio error ignored
    }
  }
}

export const ambientAudio = new AudioService();
