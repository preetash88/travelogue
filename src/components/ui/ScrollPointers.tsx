import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO_ID, scrollToBottom, scrollToTop, storyId } from "../../utils/pageAnchor";

const BUTTON_GAP = 56; // vertical distance between the two arrows

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
                aria-label="Back to top"
                data-show={showUp}
                tabIndex={showUp ? 0 : -1}
                onClick={scrollToTop}
                className={base}
                style={pointerStyle(showUp, showDown ? -BUTTON_GAP : 0)}
            >
                <ChevronUp size={20} />
            </button>
            <button
                aria-label="Go to bottom of page"
                data-show={showDown}
                tabIndex={showDown ? 0 : -1}
                onClick={scrollToBottom}
                className={base}
                style={pointerStyle(showDown, 0)}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
};

export default ScrollPointers;