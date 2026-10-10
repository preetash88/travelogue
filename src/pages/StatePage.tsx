import useEmblaCarousel from "embla-carousel-react";
import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";
import {useEffect, useRef, useState, type CSSProperties} from "react";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {uniqueIndiaStates, type IndiaPlace, type IndiaState} from "../utils/travelData";
import {BOOKING_ID, HERO_ID, LOAD_ALL_EVENT, scrollToId, storyId} from "../utils/pageAnchor.ts";
import ScrollPointers from "../components/ui/ScrollPointers";
import DestinationStories from "../components/sections/DestinationStories";

const AUTOPLAY_DELAY = 5000;

interface Props {
    onInterest: (place?: string, state?: string) => void;
}

// ── Slug helpers ──────────────────────────────────────────────────────────────
const toSlug = (name: string): string =>
    name
        .toLowerCase()
        .replace(/[()]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const stateBySlug: Record<string, IndiaState> = Object.fromEntries(
    uniqueIndiaStates.map(s => [toSlug(s.state), s])
);

// ── Title sizing ──────────────────────────────────────────────────────────────
const GLYPH_EM: Record<string, number> = {
    " ": 0.281, "&": 0.644, "'": 0.3, ",": 0.288,
    "A": 0.69, "B": 0.654, "C": 0.73, "D": 0.722, "E": 0.601,
    "F": 0.59, "G": 0.746, "H": 0.743, "I": 0.269, "J": 0.571,
    "K": 0.672, "L": 0.565, "M": 0.903, "N": 0.753, "O": 0.765,
    "P": 0.639, "Q": 0.765, "R": 0.644, "S": 0.642, "T": 0.646,
    "U": 0.744, "V": 0.69, "W": 0.985, "X": 0.682, "Y": 0.679,
    "Z": 0.629, "Ü": 0.744
};
const TITLE_TRACKING = -0.05;

const wordEm = (word: string): number =>
    [...word].reduce((sum, ch) => sum + (GLYPH_EM[ch] ?? 0.7) + TITLE_TRACKING, 0);

const titleVars = (title: string): CSSProperties => {
    const words = title.split(/\s+/).filter(Boolean);
    const longest = Math.max(...words.map(wordEm)) * 1.06;
    return {"--wem": longest.toFixed(2), "--words": words.length} as CSSProperties;
};

// ── Adapt IndiaPlace → shape the slider expects ───────────────────────────────
interface SliderItem {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
    focus: string;
    place: IndiaPlace;
}

const toSliderItems = (state: IndiaState): SliderItem[] =>
    state.places.map((place, i) => ({
        id: i,
        title: place.name.split("(")[0].trim().toUpperCase(),
        location: `${place.type} · ${place.bestTime}`,
        image: place.image,
        description: place.description,
        focus: place.focus ?? "center",
        place,
    }));

// ── StatePage ─────────────────────────────────────────────────────────────────
const StatePage = (_props: Props) => {
    const {stateSlug, destSlug} = useParams<{ stateSlug: string; destSlug?: string }>();
    const navigate = useNavigate();

    // Scroll to the specific destination card if ?scrollTo=N is in the URL.
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const idx = parseInt(params.get("scrollTo") ?? "", 10);
        if (isNaN(idx) || idx < 0) return;

        // How long the lazy loader needs before we scroll:
        //   600ms  — DestinationStories arms itself
        //   800ms  — base stagger before any row starts loading
        //   idx * 450ms — extra stagger per row
        //   600ms  — buffer for images to start decoding
        // We fire LOAD_ALL_EVENT immediately to skip the per-row stagger,
        // then wait just long enough for images to begin fetching before scrolling.
        const ARMED_DELAY = 600;   // matches DestinationStories armed timeout
        const LOAD_BUFFER = 800;   // extra time for images to start after LOAD_ALL fires
        const totalWait   = ARMED_DELAY + LOAD_BUFFER;

        // Fire LOAD_ALL after armed delay so every card image wakes up at once.
        const t1 = window.setTimeout(() => {
            window.dispatchEvent(new Event(LOAD_ALL_EVENT));
        }, ARMED_DELAY);

        // Scroll after images have had time to start fetching.
        // Scroll after images have had time to start fetching.
        const t2 = window.setTimeout(() => {
            const el = document.getElementById(storyId(idx));
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 90;
            const lenis = (window as any).__lenis;
            if (lenis) {
                lenis.scrollTo(y, { duration: 1.7, easing: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2 });
            } else {
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, totalWait);

        return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }, [location.search]);

    const stateData: IndiaState | undefined = stateSlug ? stateBySlug[stateSlug] : undefined;

    if (!stateData) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "24px", padding: "48px", textAlign: "center"
            }}>
                <p style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "#22d3ee",
                    margin: 0
                }}>
                    Not Found
                </p>
                <h1 style={{fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, color: "white", margin: 0}}>
                    We couldn't find that destination
                </h1>
                <p style={{color: "rgba(255,255,255,0.4)", fontSize: "0.9rem"}}>
                    Slug: <code style={{color: "#22d3ee"}}>{stateSlug}</code>
                </p>
                <button onClick={() => navigate("/")}
                        style={{
                            padding: "14px 36px", background: "#22d3ee", color: "#050816",
                            borderRadius: "999px", border: "none", cursor: "pointer",
                            fontSize: "0.8rem", fontWeight: 700,
                            letterSpacing: "0.15em", textTransform: "uppercase"
                        }}>
                    Back to Home
                </button>
            </div>
        );
    }

    const items = toSliderItems(stateData);

    const initialIndex = destSlug
        ? Math.max(0, items.findIndex(item => toSlug(item.place.name) === destSlug))
        : 0;

    const scrollToBooking = () => scrollToId(BOOKING_ID, -60);



    return (
        <>
            <StateSlider items={items} initialIndex={initialIndex}/>
            <DestinationStories state={stateData} onExploreMore={scrollToBooking}/>
            <ScrollPointers count={stateData.places.length} resetKey={stateData.state}/>
        </>
    );
};

// ── StateSlider ───────────────────────────────────────────────────────────────
const THUMB_W = 120;
const THUMB_H = 180;
const THUMB_SMALL = 0.5;

const StateSlider = ({items, initialIndex}: { items: SliderItem[]; initialIndex: number; }) => {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [autoplay, setAutoplay] = useState(true);
    const [inView, setInView] = useState(true);
    const [fading, setFading] = useState(false);
    const jumpTimer = useRef<number | null>(null);
    const scrolledRef = useRef(false);
    const sectionRef = useRef<HTMLElement>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true, duration: 35, dragFree: false, startIndex: initialIndex,
    });

    // Far jump → fade out, jump instantly, fade back in.
    // Neighbour → normal slide animation.
    const jumpTo = (index: number) => {
        if (!emblaApi) return;
        setAutoplay(false);
        const current = emblaApi.selectedScrollSnap();
        if (index === current) return;

        const n = items.length;
        const diff = Math.abs(index - current);
        const steps = Math.min(diff, n - diff);

        if (jumpTimer.current) window.clearTimeout(jumpTimer.current);
        if (steps <= 1) {
            setFading(false);
            emblaApi.scrollTo(index);
            return;
        }
        setFading(true);
        jumpTimer.current = window.setTimeout(() => {
            emblaApi.scrollTo(index, true);
            setFading(false);
        }, 260);
    };
    useEffect(() => () => {
        if (jumpTimer.current) window.clearTimeout(jumpTimer.current);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            {threshold: 0.25}
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || !autoplay || !inView) return;
        const t = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY);
        return () => clearInterval(t);
    }, [emblaApi, autoplay, inView]);

    useEffect(() => {
        if (!emblaApi) return;
        const stop = () => setAutoplay(false);
        emblaApi.on("pointerDown", stop);
        return () => {
            emblaApi.off("pointerDown", stop);
        };
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi && initialIndex > 0 && !scrolledRef.current) {
            emblaApi.scrollTo(initialIndex, true);
            setSelectedIndex(initialIndex);
            scrolledRef.current = true;
        }
    }, [emblaApi, initialIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        let cancelled = false;
        const imgs = emblaApi
            .slideNodes()
            .map(node => node.querySelector("img"))
            .filter((img): img is HTMLImageElement => img !== null);

        (async () => {
            for (const img of imgs) {
                if (cancelled) return;
                try {
                    await img.decode();
                } catch { /* ignore */
                }
                await new Promise(resolve => setTimeout(resolve, 60));
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [emblaApi]);

    return (
        <section id={HERO_ID} ref={sectionRef} className="relative h-screen w-full overflow-hidden">

            {/* ── Embla slides ────────────────────────────────────────────── */}
            <div
                className="embla h-full"
                ref={emblaRef}
                style={{opacity: fading ? 0 : 1, transition: `opacity ${fading ? 260 : 520}ms ease`}}
            >
                <div className="embla__container h-full">
                    {items.map((item, index) => {
                        const isActive = selectedIndex === index;
                        return (
                            <div key={item.id} className="embla__slide relative h-full min-w-full overflow-hidden">

                                <div
                                    className={`kenburns absolute inset-0 ${isActive && inView ? "" : "kenburns--paused"}`}>
                                    <img src={item.image} alt={item.title}
                                         loading="eager"
                                         decoding="async"
                                         fetchPriority={index === initialIndex ? "high" : "auto"}
                                         className="h-full w-full object-cover"
                                         style={{objectPosition: item.focus}}/>
                                </div>

                                <motion.div
                                    animate={{opacity: isActive ? 1 : 0.6}}
                                    transition={{duration: 1.2}}
                                    className="absolute inset-0 bg-black/20"
                                />

                                <div
                                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050816] via-[#050816]/35 to-transparent"/>
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-black/20"/>

                                <motion.div
                                    animate={{y: isActive ? 0 : 60, opacity: isActive ? 1 : 0}}
                                    transition={{duration: 1.1, ease: "easeOut"}}
                                    className="absolute bottom-14 left-6 right-6 z-20 md:left-12 md:right-12 lg:bottom-8 lg:left-52 lg:right-28"
                                >
                                    <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-white/55 md:text-xs">
                                        {item.location}
                                    </p>
                                    <h1
                                        className="hero-title relative z-10 font-semibold leading-none text-white/70"
                                        style={titleVars(item.title)}
                                    >
                                        {item.title}
                                    </h1>
                                    <p className="mt-4 max-w-md text-xs leading-relaxed text-white/50 md:text-sm">
                                        {item.description}
                                    </p>
                                    <div className="mt-5">
                                        <button
                                            type="button"
                                            className="hero-cta"
                                            onClick={() => scrollToId(BOOKING_ID, -60)}
                                        >
                                            <span>Show Interest</span>
                                            <ArrowRight size={16} className="hero-cta__arrow"/>
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Left thumbnail strip ────────────────────────────────────── */}
            <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">

                {/* ↑ goes to the PREVIOUS slide */}
                <button
                    onClick={() => {
                        emblaApi?.scrollPrev();
                        setAutoplay(false);
                    }}
                    className="absolute left-1/2 top-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"
                >
                    <span className="text-2xl font-thin">↑</span>
                </button>

                <div className="relative h-[520px] w-[120px] overflow-visible">
                    {items.map((item, index) => {
                        const offset = index - selectedIndex;
                        const isActive = offset === 0;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => jumpTo(index)}
                                animate={{
                                    y: offset * 155,
                                    rotateZ: isActive ? 0 : offset * 1.5,
                                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.32,
                                }}
                                transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                                className="absolute left-0 top-1/2 origin-center -translate-y-1/2"
                                style={{width: THUMB_W}}
                            >
                                <motion.div
                                    animate={{scale: isActive ? 1 : THUMB_SMALL}}
                                    whileHover={{scale: isActive ? 1 : THUMB_SMALL + 0.1}}
                                    transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                                    className="relative origin-center"
                                    style={{width: THUMB_W, height: THUMB_H}}
                                >
                                    <motion.div
                                        animate={{opacity: isActive ? 1 : 0}}
                                        transition={{duration: 0.6}}
                                        className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(103,232,249,0.14),transparent)]"
                                    />
                                    <div
                                        className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/15">
                                        <img src={item.image} alt={item.title}
                                             decoding="async"
                                             className="relative z-10 h-full w-full object-cover object-[center_30%]"/>
                                        <div
                                            className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
                                    </div>
                                    <motion.div
                                        animate={{opacity: isActive ? 1 : 0}}
                                        transition={{duration: 0.6}}
                                        className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                                    />
                                </motion.div>
                                <motion.p
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                        y: isActive ? 0 : -(THUMB_H * (1 - THUMB_SMALL)) / 2,
                                    }}
                                    transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                                    className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-white"
                                >
                                    {item.title.split(" ")[0]}
                                </motion.p>
                            </motion.button>
                        );
                    })}
                </div>

                {/* ↓ goes to the NEXT slide */}
                <button
                    onClick={() => {
                        emblaApi?.scrollNext();
                        setAutoplay(false);
                    }}
                    className="absolute left-1/2 bottom-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"
                >
                    <span className="text-2xl font-thin">↓</span>
                </button>
            </div>

            {/* ── Right dot navigator ─────────────────────────────────────── */}
            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-6 lg:flex">
                <div
                    className="relative flex h-[320px] w-[2px] flex-col items-center justify-between rounded-full bg-white/15">
                    {items.map((item, index) => (
                        <motion.button
                            key={index}
                            aria-label={`Go to ${item.title}`}
                            onClick={() => jumpTo(index)}
                            whileHover={{scale: 1.2}}
                            className="group relative z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
                        >
                            <motion.div
                                animate={{scale: selectedIndex === index ? 1.8 : 1}}
                                transition={{duration: 0.4}}
                                className={`h-2 w-2 rounded-full transition-[background-color,box-shadow] duration-300 ${
                                    selectedIndex === index
                                        ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                        : "bg-white/25 group-hover:bg-cyan-300 group-hover:shadow-[0_0_12px_rgba(103,232,249,0.9)]"
                                }`}
                            />
                        </motion.button>
                    ))}

                    <motion.div
                        animate={{top: `${selectedIndex * (100 / Math.max(items.length - 1, 1))}%`}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        className="absolute left-1/2 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-cyan-200 to-transparent"
                    />
                </div>

                <div className="flex flex-col items-center justify-between gap-6">
                    <motion.span
                        key={selectedIndex}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4}}
                        className="text-sm font-medium tracking-[0.3em] text-white/80"
                    >
                        {String(selectedIndex + 1).padStart(2, "0")}
                    </motion.span>

                    <div className="h-20 w-px bg-white/20"/>

                    <button
                        onClick={() => scrollToId(storyId(selectedIndex), -90)}
                        aria-label={`Explore ${items[selectedIndex]?.title ?? "destination"} below`}
                        className="origin-center cursor-pointer text-xs uppercase tracking-[0.3em] text-white/40 transition-[color,transform] duration-300 [writing-mode:vertical-rl] hover:scale-125 hover:text-cyan-300"
                    >
                        Explore
                    </button>
                </div>
            </div>

            {/* ── Mobile dot nav ──────────────────────────────────────────── */}
            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex gap-2 lg:hidden">
                {items.map((_, index) => (
                    <button key={index}
                            onClick={() => jumpTo(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                selectedIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
                            }`}
                    />
                ))}
            </div>

        </section>
    );
};

export default StatePage;