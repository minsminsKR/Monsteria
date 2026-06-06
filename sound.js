/**
 * SoundManager for Monsteria
 * Manages BGM and SFX. Attempts to load external audio files (.wav).
 * If audio files fail to load (or are missing), falls back to Web Audio API
 * to dynamically synthesize retro 8-bit sound effects and arpeggio music loops.
 */

class BgmSequencer {
  constructor(audioContext, destinationNode) {
    this.ctx = audioContext;
    this.dest = destinationNode;
    this.isPlaying = false;
    this.timer = null;
    this.currentStep = 0;
    this.currentBgmName = null;
  }

  /**
   * Start the synth arpeggio loop based on BGM name
   */
  start(name) {
    if (this.isPlaying) {
      this.stop();
    }
    this.isPlaying = true;
    this.currentBgmName = name;
    this.currentStep = 0;

    // bgm_main: Gentle progression in C Major / G Major / A Minor / F Major
    const bgmMainChords = [
      [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
      [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
      [220.00, 261.63, 329.63, 440.00], // A3, C4, E4, A4
      [174.61, 220.00, 261.63, 349.23]  // F3, A3, C4, F4
    ];

    // bgm_battle: Fast, energetic progression in D Minor / G Minor / A Minor
    const bgmBattleChords = [
      [293.66, 349.23, 440.00, 587.33], // Dm (D4, F4, A4, D5)
      [392.00, 466.16, 587.33, 783.99], // Gm (G4, Bb4, D5, G5)
      [440.00, 523.25, 659.25, 880.00]  // Am (A4, C5, E5, A5)
    ];

    const tempo = name === "bgm_battle" ? 200 : 250; // Tempo (ms per beat)

    const playStep = () => {
      if (!this.isPlaying) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.dest);

      let freq = 0;
      if (name === "bgm_battle") {
        // Change chord progression every 8 beats
        const chordIndex = Math.floor(this.currentStep / 8) % bgmBattleChords.length;
        const chord = bgmBattleChords[chordIndex];
        freq = chord[this.currentStep % chord.length];

        osc.type = "sawtooth";
        gain.gain.setValueAtTime(0.012, t); // Soft retro sawtooth buzz
        gain.gain.exponentialRampToValueAtTime(0.001, t + (tempo / 1000) * 0.95);
      } else {
        const chordIndex = Math.floor(this.currentStep / 8) % bgmMainChords.length;
        const chord = bgmMainChords[chordIndex];
        freq = chord[this.currentStep % chord.length];

        osc.type = "triangle";
        gain.gain.setValueAtTime(0.028, t); // Soft pleasant triangle hum
        gain.gain.exponentialRampToValueAtTime(0.001, t + (tempo / 1000) * 0.95);
      }

      osc.frequency.setValueAtTime(freq, t);
      osc.start(t);
      osc.stop(t + (tempo / 1000) * 0.95);

      this.currentStep++;
      this.timer = setTimeout(playStep, tempo);
    };

    playStep();
  }

  /**
   * Stop the sequencer loop
   */
  stop() {
    this.isPlaying = false;
    this.currentBgmName = null;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("monsteria_muted") === "true";
    this.volume = parseFloat(localStorage.getItem("monsteria_volume") || "0.5");
    
    // Audio file configuration
    this.sources = {
      click: "assets/sounds/click.wav",
      hover: "assets/sounds/hover.wav",
      hit: "assets/sounds/hit.wav",
      break: "assets/sounds/break.wav",
      loot: "assets/sounds/loot.wav",
      buy: "assets/sounds/buy.wav",
      charge: "assets/sounds/charge.wav",
      success: "assets/sounds/success.wav",
      fail: "assets/sounds/fail.wav",
      shoot: "assets/sounds/shoot.wav",
      skill: "assets/sounds/skill.wav",
      hurt: "assets/sounds/hurt.wav",
      victory: "assets/sounds/victory.wav",
      defeat: "assets/sounds/defeat.wav",
      bgm_main: "assets/sounds/真ミツオ転生.mp3",
      bgm_battle: "assets/sounds/bgm_battle.wav",
    };

    this.audioObjects = {};
    this.audioStates = {}; // 'loading', 'loaded', 'failed'
    
    this.currentBgm = null;
    this.currentBgmName = null;
    
    this.synthGain = null;
    this.compressor = null;
    this.bgmSynth = null;

    // Track playback timestamps to prevent sound clipping
    this.lastPlayTimes = {};
    this.cooldowns = {
      hit: 80,
      hover: 50,
      shoot: 80,
      hurt: 80
    };

    this.setupUserInteractionListeners();
    this.preloadAudioFiles();
  }

  /**
   * Bind events to initialize or resume AudioContext on first user interaction.
   * This respects standard browser autoplay restriction policies.
   */
  setupUserInteractionListeners() {
    const initCtx = () => {
      this.initAudioContext();
      // If initialized and active, clean up listeners
      if (this.ctx && this.ctx.state === "running") {
        window.removeEventListener("click", initCtx);
        window.removeEventListener("keydown", initCtx);
        window.removeEventListener("mousedown", initCtx);
      }
    };
    window.addEventListener("click", initCtx);
    window.addEventListener("keydown", initCtx);
    window.addEventListener("mousedown", initCtx);
  }

  /**
   * Lazily initialize/resume the Web Audio API AudioContext, Compressor, and sequencer
   */
  initAudioContext() {
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContextClass();
        
        // 1. Create DynamicsCompressorNode to prevent clipping/distortion
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
        
        // Connect compressor to audio destination
        this.compressor.connect(this.ctx.destination);
        
        // 2. Create master synth gain node and connect it to the compressor
        this.synthGain = this.ctx.createGain();
        this.synthGain.connect(this.compressor);
        this.synthGain.gain.value = this.muted ? 0 : this.volume;
        
        // Initialize sequencer using the compressed node
        this.bgmSynth = new BgmSequencer(this.ctx, this.synthGain);
      } catch (e) {
        console.error("SoundManager: Web Audio API is not supported in this browser:", e);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().then(() => {
        // If BGM was requested but not playing due to suspension, play it now
        if (this.currentBgmName && !this.muted) {
          this.playBgm(this.currentBgmName);
        }
      });
    }
  }

  /**
   * Preload HTML5 Audio files
   */
  preloadAudioFiles() {
    Object.keys(this.sources).forEach((name) => {
      const isBgm = name.startsWith("bgm_");
      const audio = new Audio();
      audio.src = this.sources[name];
      if (isBgm) {
        audio.loop = true;
      }
      this.audioObjects[name] = audio;
      this.audioStates[name] = "loading";

      // If the audio can load and play through, mark it as loaded
      audio.addEventListener("canplaythrough", () => {
        this.audioStates[name] = "loaded";
      }, { once: true });

      // If it fails to load (e.g. 404), mark it as failed and use Web Audio API fallback
      audio.addEventListener("error", () => {
        this.audioStates[name] = "failed";
        console.warn(`SoundManager: Could not load audio file for '${name}' at '${this.sources[name]}'. Using Web Audio API fallback.`);
      }, { once: true });

      // Trigger the download
      audio.load();
    });
  }

  /**
   * Play SFX/BGM by name (includes cooldown rate throttling to avoid clipping)
   */
  play(name) {
    if (this.muted) return;

    if (name.startsWith("bgm_")) {
      this.playBgm(name);
      return;
    }

    // Apply playback throttling/cooldown
    const cooldown = this.cooldowns[name];
    if (cooldown) {
      const now = Date.now();
      if (this.lastPlayTimes[name] && now - this.lastPlayTimes[name] < cooldown) {
        return; // Skip playing if within cooldown interval to prevent clip overlapping
      }
      this.lastPlayTimes[name] = now;
    }

    const state = this.audioStates[name];
    if (state === "loaded") {
      const audio = this.audioObjects[name];
      audio.currentTime = 0;
      audio.volume = this.volume;
      audio.play().catch((err) => {
        console.warn(`SoundManager: Play failed for '${name}'. Playing fallback synthesizer:`, err);
        this.playFallback(name);
      });
    } else {
      this.playFallback(name);
    }
  }

  /**
   * Play BGM by name in a loop
   */
  playBgm(name) {
    this.currentBgmName = name;
    if (this.muted) return;

    this.initAudioContext();

    // Pause current HTML5 BGM if it's different (preserving playback position)
    if (this.currentBgm && this.currentBgm !== this.audioObjects[name]) {
      this.currentBgm.pause();
    }

    // Stop sequencer BGM if it is running
    if (this.bgmSynth) {
      this.bgmSynth.stop();
    }

    const state = this.audioStates[name];
    if (state === "loaded") {
      const audio = this.audioObjects[name];
      this.currentBgm = audio;
      audio.volume = this.volume * 0.4; // BGMs are lower in volume
      audio.play().catch((err) => {
        console.warn(`SoundManager: BGM play failed for '${name}'. Playing synth BGM fallback:`, err);
        this.currentBgm = null;
        if (this.bgmSynth) {
          this.bgmSynth.start(name);
        }
      });
    } else {
      // Fallback: Synthesize arpeggio loop using Web Audio API
      this.currentBgm = null;
      if (this.bgmSynth) {
        this.bgmSynth.start(name);
      }
    }
  }

  /**
   * Stop currently playing BGM (without resetting playback position)
   */
  stopBgm() {
    if (this.currentBgm) {
      this.currentBgm.pause();
    }
    this.currentBgm = null;
    this.currentBgmName = null;

    if (this.bgmSynth) {
      this.bgmSynth.stop();
    }
  }

  /**
   * Reset all BGM play positions to 0 (called during game reset)
   */
  resetBgm() {
    this.stopBgm();
    Object.keys(this.audioObjects).forEach((name) => {
      if (name.startsWith("bgm_")) {
        try {
          this.audioObjects[name].currentTime = 0;
        } catch (e) {}
      }
    });
  }

  /**
   * Toggle mute state and save preference to localStorage
   */
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("monsteria_muted", this.muted.toString());

    if (this.muted) {
      // Pause playing HTML5 BGM
      if (this.currentBgm) {
        this.currentBgm.pause();
      }
      // Stop synth BGM
      if (this.bgmSynth) {
        this.bgmSynth.stop();
      }
    } else {
      // Resume BGM if one was active
      if (this.currentBgmName) {
        this.playBgm(this.currentBgmName);
      }
    }

    if (this.synthGain) {
      this.synthGain.gain.value = this.muted ? 0 : this.volume;
    }

    return this.muted;
  }

  /**
   * Set volume scale (0.0 to 1.0) and save preference
   */
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem("monsteria_volume", this.volume.toString());

    if (this.currentBgm) {
      this.currentBgm.volume = this.volume * 0.4;
    }

    if (this.synthGain) {
      this.synthGain.gain.value = this.muted ? 0 : this.volume;
    }
  }

  /**
   * Web Audio API 8-bit Sound Synthesizers (Fallback)
   * Connected directly to synthGain, which outputs to the DynamicsCompressorNode.
   */
  playFallback(name) {
    this.initAudioContext();
    if (!this.ctx || this.ctx.state === "suspended") return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Connect node to synthGain to process it through the compressor & master volume
    osc.connect(gain);
    gain.connect(this.synthGain || this.ctx.destination);

    const masterVol = this.volume;

    switch (name) {
      case "click":
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(150, t + 0.05);
        gain.gain.setValueAtTime(0.2 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.start(t);
        osc.stop(t + 0.05);
        break;

      case "hover":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.setValueAtTime(200, t + 0.02);
        gain.gain.setValueAtTime(0.06 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.start(t);
        osc.stop(t + 0.03);
        break;

      case "hit":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
        gain.gain.setValueAtTime(0.5 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.start(t);
        osc.stop(t + 0.12);
        break;

      case "break":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.linearRampToValueAtTime(30, t + 0.28);
        gain.gain.setValueAtTime(0.4 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.start(t);
        osc.stop(t + 0.28);

        try {
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(90, t);
          osc2.frequency.linearRampToValueAtTime(10, t + 0.22);
          osc2.connect(gain2);
          gain2.connect(this.synthGain || this.ctx.destination);
          gain2.gain.setValueAtTime(0.4 * masterVol, t);
          gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc2.start(t);
          osc2.stop(t + 0.22);
        } catch (e) {}
        break;

      case "loot":
        osc.type = "square";
        osc.frequency.setValueAtTime(850, t);
        osc.frequency.setValueAtTime(1250, t + 0.07);
        gain.gain.setValueAtTime(0.15 * masterVol, t);
        gain.gain.setValueAtTime(0.15 * masterVol, t + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.start(t);
        osc.stop(t + 0.22);
        break;

      case "buy":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.setValueAtTime(880.00, t + 0.08); // A5
        gain.gain.setValueAtTime(0.22 * masterVol, t);
        gain.gain.setValueAtTime(0.22 * masterVol, t + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
        break;

      case "charge":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.linearRampToValueAtTime(650, t + 0.85);
        gain.gain.setValueAtTime(0.01 * masterVol, t);
        gain.gain.linearRampToValueAtTime(0.22 * masterVol, t + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);
        osc.start(t);
        osc.stop(t + 0.85);
        break;

      case "success":
        osc.type = "square";
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, t + 0.3); // C6
        gain.gain.setValueAtTime(0.2 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.2 * masterVol, t + 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.start(t);
        osc.stop(t + 0.55);
        break;

      case "fail":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.linearRampToValueAtTime(150, t + 0.45);
        gain.gain.setValueAtTime(0.22 * masterVol, t);
        gain.gain.linearRampToValueAtTime(0.18 * masterVol, t + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.start(t);
        osc.stop(t + 0.45);
        break;

      case "shoot":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(850, t);
        osc.frequency.exponentialRampToValueAtTime(180, t + 0.14);
        gain.gain.setValueAtTime(0.14 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        osc.start(t);
        osc.stop(t + 0.14);
        break;

      case "skill":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.3);
        gain.gain.setValueAtTime(0.22 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);

        try {
          const mod = this.ctx.createOscillator();
          const modGain = this.ctx.createGain();
          mod.frequency.value = 32; 
          modGain.gain.value = 140; 
          mod.connect(modGain);
          modGain.connect(osc.frequency);
          mod.start(t);
          mod.stop(t + 0.3);
        } catch (e) {}
        break;

      case "hurt":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.linearRampToValueAtTime(25, t + 0.14);
        gain.gain.setValueAtTime(0.35 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        osc.start(t);
        osc.stop(t + 0.14);
        break;

      case "victory":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, t); 
        osc.frequency.setValueAtTime(659.25, t + 0.08); 
        osc.frequency.setValueAtTime(783.99, t + 0.16); 
        osc.frequency.setValueAtTime(659.25, t + 0.24); 
        osc.frequency.setValueAtTime(783.99, t + 0.32); 
        osc.frequency.setValueAtTime(1046.50, t + 0.40); 
        gain.gain.setValueAtTime(0.24 * masterVol, t);
        gain.gain.setValueAtTime(0.24 * masterVol, t + 0.40);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.start(t);
        osc.stop(t + 0.6);
        break;

      case "defeat":
        osc.type = "sine";
        osc.frequency.setValueAtTime(392.00, t); 
        osc.frequency.setValueAtTime(311.13, t + 0.18); 
        osc.frequency.setValueAtTime(293.66, t + 0.36); 
        osc.frequency.setValueAtTime(261.63, t + 0.54); 
        gain.gain.setValueAtTime(0.3 * masterVol, t);
        gain.gain.setValueAtTime(0.3 * masterVol, t + 0.54);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.start(t);
        osc.stop(t + 0.8);
        break;

      default:
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, t);
        gain.gain.setValueAtTime(0.1 * masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
    }
  }
}

// Make it globally accessible
window.soundManager = new SoundManager();
