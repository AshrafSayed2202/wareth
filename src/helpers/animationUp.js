export const animationUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
};