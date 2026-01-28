import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
        // Launch from left corner
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 1 }
        });
        // Launch from right corner
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

export const triggerChapterComplete = () => {
    triggerConfetti();
};
