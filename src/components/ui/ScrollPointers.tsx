import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING_ID, HERO_ID, storyId } from "../../utils/pageAnchor.ts";

const STORY_OFFSET = -90;   // space left above a destination card (clears the navbar)
const BOOKING_OFFSET = -60;
const BUTTON_GAP = 56;      // vertical distance between the two arrows

/** Page sections from top to bottom, with the scroll position that lines each one up. */
const getStops = (count: number): number[] => {
    const stops: number[] = [];
    const add = (id: string, offset: number) => {
        const el = document.getElementById(id);
        if (el) stops.push(el.getBoundingClientRect().top + window.scrollY + offset);
    };
    add(HERO_ID, 0);
    for (let i = 0; i < count; i++) add(storyId(i), STORY_OFFSET);
    add(BOOKING_ID, BOOKING_OFFSET);
    return stops;
};

/** Next stop below (dir = 1) or above (dir = -1) the current scroll position. */
export const pickStop = (stops: number[], y: number, dir: 1 | -1): number | undefined =>
    dir === 1
        ? stops.find(s => s > y + 12)
        : [...stops].reverse().find(s => s < y - 12);

const ScrollPointers = ({ count, resetKey }: { count: number; resetKey: string }) => {
    const [heroVisible, setHeroVisible] = useState(true);
    const [pastLast, setPastLast] = useState(false); // scrolled beyond the last destination card

    useEffect(() => {
        const cleanups: Array<() => void> = [];

        const hero = document.getElementById(HERO_ID);
        if (hero) {
            const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting));
            io.observe(hero);
            cleanups.push(() => io.disconnect());
        }

        const last = document.getElementById(storyId(count - 1));
        if (last) {
            const io = new IntersectionObserver(([e]) =>
                // "past" = not on screen AND sitting above the viewport
                setPastLast(!e.isIntersecting && e.boundingClientRect.bottom <= 0)
            );
            io.observe(last);
            cleanups.push(() => io.disconnect());
        }

        return () => cleanups.forEach(fn => fn());
    }, [count, resetKey]);

    const go = (dir: 1 | -1) => {
        const target = pickStop(getStops(count), window.scrollY, dir);
        if (target === undefined) return;
        const lenis = (window as any).__lenis;
        if (lenis) lenis.scrollTo(target, { duration: 1.2 });
        else window.scrollTo({ top: target, behavior: "smooth" });
    };

    const showUp = !heroVisible;
    const showDown = !pastLast;

    const pointerStyle = (show: boolean, y: number) =>
        ({
            "--op": show ? 0.7 : 0,
            transform: `translateY(${show ? y : y + 10}px) scale(${show ? 1 : 0.9})`,
            pointerEvents: show ? "auto" : "none",
        }) as React.CSSProperties;

    const base =
        "scroll-pointer absolute bottom-0 right-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white";

    return (
        <div className="pointer-events-none fixed bottom-8 right-6 z-40 h-11 w-11">
            <button
                aria-label="Previous section"
                data-show={showUp}
                tabIndex={showUp ? 0 : -1}
                onClick={() => go(-1)}
                className={base}
                style={pointerStyle(showUp, showDown ? -BUTTON_GAP : 0)}
            >
                <ChevronUp size={20} />
            </button>
            <button
                aria-label="Next section"
                data-show={showDown}
                tabIndex={showDown ? 0 : -1}
                onClick={() => go(1)}
                className={base}
                style={pointerStyle(showDown, 0)}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
};

export default ScrollPointers;