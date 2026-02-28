const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

let currentAudio: HTMLAudioElement | null = null;

// ── Voice readiness ──────────────────────────────────────────────
let voicesReady = false;
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function ensureVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesReady) return Promise.resolve(speechSynthesis.getVoices());
  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesReady = true;
      resolve(voices);
      return;
    }
    const onVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        voicesReady = true;
        speechSynthesis.removeEventListener("voiceschanged", onVoices);
        resolve(v);
      }
    };
    speechSynthesis.addEventListener("voiceschanged", onVoices);
    // Fallback timeout – resolve with whatever we have after 3s
    setTimeout(() => {
      speechSynthesis.removeEventListener("voiceschanged", onVoices);
      voicesReady = true;
      resolve(speechSynthesis.getVoices());
    }, 3000);
  });
  return voicesPromise;
}

// ── iOS warm-up ──────────────────────────────────────────────────
// iOS Safari blocks speechSynthesis.speak() unless first called
// inside a user-gesture handler. We fire a silent utterance on the
// very first user interaction to "unlock" the API.
let warmedUp = false;

function warmUp() {
  if (warmedUp) return;
  warmedUp = true;
  try {
    const silent = new SpeechSynthesisUtterance("");
    silent.volume = 0;
    silent.lang = "zh-TW";
    speechSynthesis.speak(silent);
  } catch {
    // ignore
  }
}

if (typeof window !== "undefined") {
  const handler = () => {
    warmUp();
    ensureVoices();
    window.removeEventListener("click", handler, true);
    window.removeEventListener("touchstart", handler, true);
  };
  window.addEventListener("click", handler, true);
  window.addEventListener("touchstart", handler, true);
}

// ── Public API ───────────────────────────────────────────────────

/**
 * Speak Chinese text using Web Speech API.
 * ElevenLabs TTS is temporarily disabled.
 */
export function speakChinese(text: string, _rate = 0.8) {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  fallbackSpeak(text, _rate);
}

/** Web Speech API – synchronous to preserve user gesture chain */
function fallbackSpeak(text: string, rate: number) {
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "zh-TW";
  utter.rate = rate;
  // Use cached voices synchronously – no await to keep gesture context
  const voices = speechSynthesis.getVoices();
  const zhVoice = voices.find((v) => v.lang.startsWith("zh"));
  if (zhVoice) utter.voice = zhVoice;
  speechSynthesis.speak(utter);
}
