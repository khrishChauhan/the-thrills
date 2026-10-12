class AmbientSoundEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public play() {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      // Master gain for smooth volume fade-in
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(
        0.18,
        this.audioCtx.currentTime + 2.5
      );
      this.masterGain.connect(this.audioCtx.destination);

      // Lowpass filter for deep cinematic warmth
      this.filter = this.audioCtx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      this.filter.Q.setValueAtTime(1.8, this.audioCtx.currentTime);
      this.filter.connect(this.masterGain);

      // Warm cinematic harmony: D Minor 9th chord (D2, A2, F3, C4)
      const frequencies = [73.42, 110.0, 174.61, 261.63, 329.63];
      this.oscillators = [];

      frequencies.forEach((freq, idx) => {
        if (!this.audioCtx || !this.filter) return;
        const osc = this.audioCtx.createOscillator();
        const oscGain = this.audioCtx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        // Subtle detuning for lush analog shimmer
        osc.detune.setValueAtTime((idx - 2) * 5, this.audioCtx.currentTime);

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.filter);

        osc.start();
        this.oscillators.push(osc);
      });

      // Subtle breeze noise buffer
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(
        1,
        bufferSize,
        this.audioCtx.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.04;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      this.noiseNode.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  public stop() {
    if (this.masterGain && this.audioCtx) {
      try {
        const currentTime = this.audioCtx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 1.2);

        setTimeout(() => {
          this.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          this.oscillators = [];
          if (this.noiseNode) {
            try {
              this.noiseNode.stop();
              this.noiseNode.disconnect();
            } catch {
              // ignore
            }
            this.noiseNode = null;
          }
          this.isPlaying = false;
        }, 1300);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }
}

export const soundEngine = new AmbientSoundEngine();
