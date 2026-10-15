// Subtle luxury ambient drone generator using Web Audio API
class StudioAmbientAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Stop existing oscillators if any
    this.stopOscillators();

    // Create warm, cinematic low harmonic chord (C2, G2, E3, B3)
    const notes = [65.41, 98.0, 164.81, 246.94];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Micro detune for lush spatial movement
      osc.detune.setValueAtTime((idx - 1.5) * 4, now);

      // Gentle gain per harmonic
      const gainVal = idx === 0 ? 0.08 : 0.03 / (idx + 1);
      noteGain.gain.setValueAtTime(gainVal, now);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });

    // Fade master in smoothly
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.35, now + 1.5);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1);

    setTimeout(() => {
      this.stopOscillators();
      this.isPlaying = false;
    }, 1000);
  }

  private stopOscillators() {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore already stopped
      }
    });
    this.oscillators = [];
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const studioAudio = new StudioAmbientAudio();
