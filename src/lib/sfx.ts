let _ctx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silent fail if audio not available
  }
}

/** Happy ascending chime for correct answers */
export function playCorrectSound() {
  try {
    const ctx = getAudioCtx();
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.25;
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15 + i * 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + 0.25 + i * 0.1);
    });
  } catch {
    // Silent fail
  }
}

/** Descending buzz for wrong answers */
export function playWrongSound() {
  playTone(300, 0.15, 'square', 0.15);
  setTimeout(() => playTone(200, 0.2, 'square', 0.12), 150);
}

/** Celebratory fanfare for perfect score / level up */
export function playFanfare() {
  try {
    const ctx = getAudioCtx();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.value = 0.3;
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3 + i * 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + 0.45 + i * 0.15);
    });
  } catch {
    // Silent fail
  }
}

/** Soft click sound for button taps */
export function playClickSound() {
  playTone(800, 0.06, 'sine', 0.15);
}
