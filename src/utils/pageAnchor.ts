// Shared ids + a smooth-scroll helper for the state pages.

export const HERO_ID = "state-hero";
export const BOOKING_ID = "plan-your-lamhe";
export const storyId = (index: number) => `story-${index}`;

/** Smooth-scroll to an element by id, leaving `offset` px of space (negative = space above). */
export const scrollToId = (id: string, offset = 0) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
};