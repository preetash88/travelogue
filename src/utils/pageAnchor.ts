// Shared ids + smooth-scroll helpers for the state pages.

export const HERO_ID = "state-hero";
export const BOOKING_ID = "plan-your-lamhe";
export const storyId = (index: number) => `story-${index}`;

/** Fired right before a long scroll so every card image is loaded + decoded in time. */
export const LOAD_ALL_EVENT = "stories:load-all";

// Ease-in-out: starts gently, cruises, lands gently (no sudden jump at the start).
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

/** Smooth-scroll the page to a Y position. Longer trips take longer (1.1s – 3.2s). */
export const smoothScrollToY = (y: number) => {
    const root = document.documentElement;
    const maxY = root.scrollHeight - window.innerHeight;
    const target = Math.max(0, Math.min(y, maxY));
    const distance = Math.abs(target - window.scrollY);
    if (distance < 2) return;

    // Wake up the lazy card images first so nothing pops in mid-flight.
    window.dispatchEvent(new Event(LOAD_ALL_EVENT));

    const lenis = (window as any).__lenis;
    if (!lenis) {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
    }

    const duration = Math.min(1.8, Math.max(0.5, distance / 3200));

    // While we glide: freeze hover effects + the hero drift (see index.css).
    root.dataset.autoScroll = "1";
    const clear = () => { delete root.dataset.autoScroll; };
    window.setTimeout(clear, duration * 1000 + 300); // safety net

    lenis.scrollTo(target, { duration, easing: easeInOutSine, lock: true, force: true, onComplete: clear });
};

/** Smooth-scroll to an element by id, leaving `offset` px (negative = space above it). */
export const scrollToId = (id: string, offset = 0) => {
    const el = document.getElementById(id);
    if (!el) return;
    smoothScrollToY(el.getBoundingClientRect().top + window.scrollY + offset);
};

export const scrollToTop = () => smoothScrollToY(0);
export const scrollToBottom = () => smoothScrollToY(Number.MAX_SAFE_INTEGER);