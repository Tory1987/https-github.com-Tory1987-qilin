import confetti from 'canvas-confetti';

export function fireConfetti() {
  // First burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb'],
  });

  // Second burst delayed
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#ff6b6b', '#ffd93d', '#6bcb77'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#4d96ff', '#ff6bcb', '#ffd93d'],
    });
  }, 250);
}

export function fireLevelUpConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ffd93d', '#ff6b6b', '#6bcb77'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#4d96ff', '#ff6bcb', '#ffd93d'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
