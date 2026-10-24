import { Howl } from 'howler';
import { getAssetPath } from './assets';

class AudioService {
  private bgm: Howl | null = null;
  private isMuted: boolean = false;
  private isLoaded: boolean = false;

  private initBgm() {
    if (this.bgm || typeof window === 'undefined') return;

    this.bgm = new Howl({
      src: [getAssetPath('/audio/birthday.mp3')],
      html5: true, // Use HTML5 Audio for streaming larger MP3 files smoothly
      loop: true,
      volume: 0.22, // Soft, gentle ambient volume
      autoplay: false,
      onload: () => {
        this.isLoaded = true;
      },
      onloaderror: (_id, err) => {
        console.warn('Could not load birthday audio:', err);
      },
    });
  }

  public play() {
    this.initBgm();
    if (!this.bgm) return;
    this.isMuted = false;
    if (!this.bgm.playing()) {
      this.bgm.play();
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
    if (mute) {
      this.pause();
    } else {
      this.play();
    }
  }

  public toggle() {
    if (!this.bgm) {
      this.play();
      return true;
    }
    if (this.bgm.playing()) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.bgm ? this.bgm.playing() : false;
  }

  // Gentle pop sound effect for clicks
  public playPop() {
    if (typeof window === 'undefined') return;
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
