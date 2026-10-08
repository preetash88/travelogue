import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uniqueIndiaStates, type IndiaPlace, type IndiaState } from "../utils/travelData";
import MagneticButton from "../components/ui/MagneticButton";
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
// Inter Regular advance widths (in em) for the characters used in place names.
// Used to size the big hero title so the longest word always fits the screen.
const GLYPH_EM: Record<string, number> = { " ": 0.281, "&": 0.644, "'": 0.3, ",": 0.288, "A": 0.69, "B": 0.654, "C": 0.73, "D": 0.722, "E": 0.601, "F": 0.59, "G": 0.746, "H": 0.743, "I": 0.269, "J": 0.571, "K": 0.672, "L": 0.565, "M": 0.903, "N": 0.753, "O": 0.765, "P": 0.639, "Q": 0.765, "R": 0.644, "S": 0.642, "T": 0.646, "U": 0.744, "V": 0.69, "W": 0.985, "X": 0.682, "Y": 0.679, "Z": 0.629, "Ü": 0.744 };
const TITLE_TRACKING = -0.05; // keep in sync with .hero-title letter-spacing

const wordEm = (word: string): number =>
    [...word].reduce((sum, ch) => sum + (GLYPH_EM[ch] ?? 0.7) + TITLE_TRACKING, 0);

const titleVars = (title: string): CSSProperties => {
    const words = title.split(/\s+/).filter(Boolean);
    const longest = Math.max(...words.map(wordEm)) * 1.06; // 6% safety margin
    return { "--wem": longest.toFixed(2), "--words": words.length } as CSSProperties;
};

// ── Adapt IndiaPlace → shape the slider expects ───────────────────────────────
interface SliderItem {
    id: number;
    title: string;
    location: string;
    image: string;
    description: string;
    focus: string;       // CSS object-position for the hero image
    place: IndiaPlace;   // keep original for interest form
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
const StatePage = ({ onInterest }: Props) => {
    const { stateSlug, destSlug } = useParams<{ stateSlug: string; destSlug?: string }>();
    const navigate = useNavigate();

    const stateData: IndiaState | undefined = stateSlug ? stateBySlug[stateSlug] : undefined;

    // 404
    if (!stateData) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "48px", textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#22d3ee", margin: 0 }}>Not Found</p>
                <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, color: "white", margin: 0 }}>
                    We couldn't find that destination
                </h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
                    Slug: <code style={{ color: "#22d3ee" }}>{stateSlug}</code>
                </p>
                <button onClick={() => navigate("/")}
                        style={{ padding: "14px 36px", background: "#22d3ee", color: "#050816", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Back to Home
                </button>
            </div>
        );
    }

    const items = toSliderItems(stateData);

    // Find which slide to open first — destSlug picks the matching place, default 0
    const initialIndex = destSlug
        ? Math.max(0, items.findIndex(item => toSlug(item.place.name) === destSlug))
        : 0;

    const scrollToBooking = () => {
        // BookingSection has no id yet — scroll to it by finding the last <section>
        // inside <main> that contains "Curated" text (its heading), or fall back
        // to near-bottom of page
        const allSections = Array.from(document.querySelectorAll("main section"));
        const booking = allSections.find(s => s.textContent?.includes("Plan Your")) as HTMLElement
            ?? allSections[allSections.length - 1] as HTMLElement;
        if (booking) {
            if (window.__lenis) {
                (window.__lenis as any).scrollTo(booking, { offset: -60, duration: 1.4 });
            } else {
                booking.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <StateSlider items={items} state={stateData} initialIndex={initialIndex} onInterest={onInterest} navigate={navigate} />
            <DestinationStories state={stateData} onExploreMore={scrollToBooking} />
        </>
    );
};

// ── StateSlider — the HeroSlider adapted for state destinations ───────────────
const THUMB_W = 120;
const THUMB_H = 180;
const THUMB_SMALL = 0.5; // scale of the non-active thumbnails

const StateSlider = ({
                         items,
                         state,
                         initialIndex,
                         onInterest,
                         navigate,
                     }: {
    items: SliderItem[];
    state: IndiaState;
    initialIndex: number;
    onInterest: (place?: string, state?: string) => void;
    navigate: ReturnType<typeof useNavigate>;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [autoplay, setAutoplay] = useState(true);
    const [inView, setInView] = useState(true);
    const scrolledRef = useRef(false);
    const sectionRef = useRef<HTMLElement>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 35,
        dragFree: false,
        startIndex: initialIndex,
    });

    // Is the hero on screen? If not, stop autoplay + drift so they don't
    // compete with scrolling the cards below.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => { emblaApi.off("select", onSelect); };
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
        return () => { emblaApi.off("pointerDown", stop); };
    }, [emblaApi]);

    // Jump to correct slide on mount (destSlug deep link)
    useEffect(() => {
        if (emblaApi && initialIndex > 0 && !scrolledRef.current) {
            emblaApi.scrollTo(initialIndex, true); // true = no animation, instant
            setSelectedIndex(initialIndex);
            scrolledRef.current = true;
        }
    }, [emblaApi, initialIndex]);

    // Pre-decode every hero image once, one at a time, so sliding to a new
    // slide never has to decode a big image mid-animation.
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
                try { await img.decode(); } catch { /* ignore */ }
                await new Promise(resolve => setTimeout(resolve, 60));
            }
        })();

        return () => { cancelled = true; };
    }, [emblaApi]);

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">

            {/* ── Breadcrumb ──────────────────────────────────────────────── */}
            <div style={{
                position: "absolute", top: "88px", left: "48px", zIndex: 40,
                display: "flex", alignItems: "center", gap: "10px",
                pointerEvents: "all",
            }}>
                <button onClick={() => navigate("/")}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: 0, transition: "color 0.2s", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
                    Lamhe
                </button>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.55rem", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>→</span>
                <button onClick={() => navigate("/")}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: 0, transition: "color 0.2s", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
                    India
                </button>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.55rem", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>→</span>
                <span style={{ fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#22d3ee", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
                    {state.state}
                </span>
            </div>

            {/* ── Embla slides ────────────────────────────────────────────── */}
            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full">
                    {items.map((item, index) => {
                        const isActive = selectedIndex === index;
                        return (
                            <div key={item.id} className="embla__slide relative h-full min-w-full overflow-hidden">

                                <div className={`kenburns absolute inset-0 ${isActive && inView ? "" : "kenburns--paused"}`}>
                                    <img src={item.image} alt={item.title}
                                         loading="eager"
                                         decoding="async"
                                         fetchPriority={index === initialIndex ? "high" : "auto"}
                                         className="h-full w-full object-cover"
                                         style={{ objectPosition: item.focus }} />
                                </div>

                                {/* Dark wash — fades slightly on inactive slides */}
                                <motion.div
                                    animate={{ opacity: isActive ? 1 : 0.6 }}
                                    transition={{ duration: 1.2 }}
                                    className="absolute inset-0 bg-black/20"
                                />

                                {/* Bottom fade into the page background */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#050816] via-[#050816]/35 to-transparent" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-black/20" />

                                {/* ── Slide copy — bottom left ─────────────────── */}
                                <motion.div
                                    animate={{
                                        y: isActive ? 0 : 60,
                                        opacity: isActive ? 1 : 0,
                                    }}
                                    transition={{ duration: 1.1, ease: "easeOut" }}
                                    className="absolute bottom-14 left-6 right-6 z-20 md:left-12 md:right-12 lg:bottom-8 lg:left-52 lg:right-28"
                                >
                                    <p className="mb-4 text-xs uppercase tracking-[0.5em] text-white/70 md:text-sm">
                                        {item.location}
                                    </p>

                                    <h1
                                        className="hero-title relative z-10 font-semibold leading-none text-[#f8f8f8]/85"
                                        style={titleVars(item.title)}
                                    >
                                        {item.title}
                                    </h1>

                                    <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                                        {item.description}
                                    </p>

                                    <MagneticButton onClick={() => onInterest(item.place.name, state.state)}>
                                        Show Interest
                                    </MagneticButton>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Left thumbnail strip ────────────────────────────────────── */}
            <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
                <button
                    onClick={() => { emblaApi?.scrollPrev(); setAutoplay(false); }}
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
                                onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                                animate={{
                                    y: offset * 155,
                                    rotateZ: isActive ? 0 : offset * 1.5,
                                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.32,
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute left-0 top-1/2 origin-center -translate-y-1/2"
                                style={{ width: THUMB_W }}
                            >
                                {/* Fixed-size card — only its scale animates (no layout work) */}
                                <motion.div
                                    animate={{ scale: isActive ? 1 : THUMB_SMALL }}
                                    whileHover={{ scale: isActive ? 1 : THUMB_SMALL + 0.1 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative origin-center"
                                    style={{ width: THUMB_W, height: THUMB_H }}
                                >
                                    {/* soft glow behind the active card (opacity only) */}
                                    <motion.div
                                        animate={{ opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(103,232,249,0.14),transparent)]"
                                    />

                                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/15">
                                        <img src={item.image} alt={item.title}
                                             decoding="async"
                                             className="relative z-10 h-full w-full object-cover object-[center_30%]" />
                                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    </div>

                                    {/* bright ring for the active card (opacity only) */}
                                    <motion.div
                                        animate={{ opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                                    />
                                </motion.div>

                                <motion.p
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                        y: isActive ? 0 : -(THUMB_H * (1 - THUMB_SMALL)) / 2,
                                    }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-white"
                                >
                                    {item.title.split(" ")[0]}
                                </motion.p>
                            </motion.button>
                        );
                    })}
                </div>

                <button
                    onClick={() => { emblaApi?.scrollNext(); setAutoplay(false); }}
                    className="absolute left-1/2 bottom-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"
                >
                    <span className="text-2xl font-thin">↓</span>
                </button>
            </div>

            {/* ── Right dot navigator ─────────────────────────────────────── */}
            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-6 lg:flex">
                <div className="relative flex h-[320px] w-[2px] flex-col items-center justify-between rounded-full bg-white/15">
                    {items.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                            whileHover={{ scale: 1.2 }}
                            className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full"
                        >
                            <motion.div
                                animate={{ scale: selectedIndex === index ? 1.8 : 1, opacity: selectedIndex === index ? 1 : 0.5 }}
                                transition={{ duration: 0.4 }}
                                className={`h-2 w-2 rounded-full ${
                                    selectedIndex === index
                                        ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                        : "bg-white/50"
                                }`}
                            />
                        </motion.button>
                    ))}

                    <motion.div
                        animate={{ top: `${selectedIndex * (100 / Math.max(items.length - 1, 1))}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute left-1/2 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-cyan-200 to-transparent"
                    />
                </div>

                <div className="flex flex-col items-center justify-between gap-6">
                    <motion.span
                        key={selectedIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm font-medium tracking-[0.3em] text-white/80"
                    >
                        {String(selectedIndex + 1).padStart(2, "0")}
                    </motion.span>

                    <div className="h-20 w-px bg-white/20" />

                    <span className="text-xs uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-rl]">
                        Explore
                    </span>
                </div>
            </div>

            {/* ── Mobile dot nav ──────────────────────────────────────────── */}
            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex gap-2 lg:hidden">
                {items.map((_, index) => (
                    <button key={index}
                            onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                selectedIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* ── State label (top centre) ─────────────────────────────────── */}
            <motion.div
                key={state.state}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-24 left-1/2 z-30 -translate-x-1/2 text-center pointer-events-none"
            >
                <p className="text-xs uppercase tracking-[0.6em] text-white/35">{state.state}</p>
                <p className="text-[10px] tracking-[0.3em] text-white/20 mt-1 italic">{state.tagline}</p>
            </motion.div>

        </section>
    );
};

export default StatePage;