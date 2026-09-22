import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { uniqueIndiaStates, type IndiaPlace, type IndiaState } from "../../utils/travelData";
import MagneticButton from "../ui/MagneticButton";

interface Props {
    onInterest: (place: string, state: string) => void;
}

// ── Inner carousel (Embla) — the original HeroSlider design, repurposed ──────
const PlaceCarousel = ({
    stateData,
    onInterest,
}: {
    stateData: IndiaState;
    onInterest: (place: string, state: string) => void;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 35,
        dragFree: false,
    });

    // reset on state change
    useEffect(() => {
        setSelectedIndex(0);
        setAutoplay(true);
        if (emblaApi) emblaApi.scrollTo(0);
    }, [stateData.state, emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi || !autoplay) return;
        const timer = setInterval(() => emblaApi.scrollNext(), 5000);
        return () => clearInterval(timer);
    }, [emblaApi, autoplay]);

    useEffect(() => {
        if (!emblaApi) return;
        const stop = () => setAutoplay(false);
        emblaApi.on("pointerDown", stop);
        return () => emblaApi.off("pointerDown", stop);
    }, [emblaApi]);

    const places = stateData.places;
    const active: IndiaPlace = places[selectedIndex];

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Embla slides */}
            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full">
                    {places.map((place, index) => (
                        <div
                            key={place.name}
                            className="embla__slide relative h-full min-w-full overflow-hidden"
                        >
                            {/* Parallax image */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    scale: selectedIndex === index ? [1, 1.008, 1] : 1.015,
                                    y: selectedIndex === index ? [-50, -100, -50] : 0,
                                }}
                                transition={{
                                    duration: 18,
                                    repeat: selectedIndex === index ? Infinity : 0,
                                    ease: "easeInOut",
                                }}
                            >
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    className="h-full w-full object-cover object-center gpu"
                                />

                                {/* Gradients — identical to original HeroSlider */}
                                <div className="absolute inset-x-0 bottom-0 z-20 h-[38%] bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
                                <motion.div
                                    animate={{ y: [-4, 4, -4], opacity: [0.65, 0.8, 0.65] }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-x-0 bottom-0 z-30 h-[42%] bg-gradient-to-t from-[#050816]/45 via-[#050816]/10 to-transparent pointer-events-none"
                                />
                                <motion.div
                                    animate={{ opacity: [0.08, 0.16, 0.08], x: [-30, 30, -30] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 z-10 bg-gradient-to-r from-white/10 via-transparent to-white/5 blur-3xl pointer-events-none"
                                />
                            </motion.div>

                            <motion.div
                                animate={{ opacity: selectedIndex === index ? 1 : 0.6 }}
                                transition={{ duration: 1.2 }}
                                className="absolute inset-0 bg-black/20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-black/20" />

                            {/* Slide copy — bottom left, same position as original */}
                            <motion.div
                                animate={{
                                    y: selectedIndex === index ? 0 : 80,
                                    opacity: selectedIndex === index ? 1 : 0,
                                    scale: selectedIndex === index ? 1 : 0.96,
                                }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="absolute bottom-8 left-6 z-20 max-w-2xl md:left-44 lg:left-52"
                            >
                                <p className="mb-3 text-xs uppercase tracking-[0.5em] text-white/60 md:text-sm">
                                    {place.type} · {place.bestTime}
                                </p>

                                {/* Place name — large, no state name */}
                                <h2 className="relative z-10 text-5xl font-black leading-none tracking-[-0.04em] text-[#f8f8f8]/85 md:text-8xl lg:text-[9rem]">
                                    {place.name.split("(")[0].trim()}
                                </h2>

                                <p className="mt-2 text-sm italic text-cyan-300/70">
                                    {place.tagline}
                                </p>

                                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                                    {place.description}
                                </p>

                                <div className="mt-6">
                                    <MagneticButton
                                        onClick={() => onInterest(place.name, stateData.state)}
                                    >
                                        Show Interest
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Left thumbnail strip (identical to original) ──────────────── */}
            <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
                <button
                    onClick={() => { emblaApi?.scrollPrev(); setAutoplay(false); }}
                    className="absolute left-1/2 top-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"
                >
                    <span className="text-2xl font-thin">↑</span>
                </button>

                <div className="relative h-[520px] w-[120px] overflow-visible">
                    {places.map((place, index) => {
                        const offset = index - selectedIndex;
                        const isActive = offset === 0;
                        return (
                            <motion.button
                                key={place.name}
                                onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                                animate={{
                                    y: offset * 155,
                                    scale: isActive ? 1 : 0.72,
                                    rotateZ: isActive ? 0 : offset * 1.5,
                                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.32,
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ scale: isActive ? 1 : 0.8 }}
                                className="absolute left-0 top-1/2 origin-center -translate-y-1/2"
                            >
                                {isActive && (
                                    <div className="absolute inset-0 rounded-[2rem] bg-cyan-300/10 blur-2xl" />
                                )}
                                <div className={`relative overflow-hidden rounded-[2rem] transition-all duration-700 ${
                                    isActive
                                        ? "h-[180px] w-[120px] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                                        : "h-[110px] w-[82px] border border-white/8"
                                }`}>
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        loading="lazy"
                                        className="relative z-10 h-full w-full object-cover object-[center_30%] gpu"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                </div>
                                <motion.p
                                    animate={{ opacity: isActive ? 1 : 0.4 }}
                                    className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-white"
                                >
                                    {place.name.split("(")[0].trim().split(" ")[0]}
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

            {/* ── Right dot navigator (identical to original) ───────────────── */}
            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-6 lg:flex">
                <div className="relative flex h-[320px] w-[2px] flex-col items-center justify-between rounded-full bg-white/15">
                    {places.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                            whileHover={{ scale: 1.2 }}
                            className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full"
                        >
                            <motion.div
                                animate={{
                                    scale: selectedIndex === index ? 1.8 : 1,
                                    opacity: selectedIndex === index ? 1 : 0.5,
                                }}
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
                        animate={{ top: `${(selectedIndex / (places.length - 1)) * 100}%` }}
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

            {/* ── Mobile dot nav ────────────────────────────────────────────── */}
            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex gap-2 lg:hidden">
                {places.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            selectedIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
                        }`}
                    />
                ))}
            </div>

            {/* ── State label top-centre ────────────────────────────────────── */}
            <motion.div
                key={stateData.state}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-24 left-1/2 z-30 -translate-x-1/2 text-center pointer-events-none"
            >
                <p className="text-xs uppercase tracking-[0.6em] text-white/35">
                    {stateData.state}
                </p>
                <p className="text-[10px] tracking-[0.3em] text-white/20 mt-1 italic">
                    {stateData.tagline}
                </p>
            </motion.div>
        </div>
    );
};

// ── StateExplorer wrapper ─────────────────────────────────────────────────────
const StateExplorer = ({ onInterest }: Props) => {
    const [selectedState, setSelectedState] = useState<IndiaState | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Default India — no state pre-selected, user must pick
    const handleSelect = (state: IndiaState) => {
        setSelectedState(state);
        setIsOpen(false);
    };

    return (
        <section id="state-explorer" className="relative">

            {/* ── Selector bar ─────────────────────────────────────────────── */}
            <div className="relative z-40 px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-7xl"
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.6em] text-cyan-300">
                        EXPLORE BY STATE / UT
                    </p>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <h2 className="text-5xl font-black leading-none md:text-7xl">
                            DISCOVER
                            <br />
                            INDIA
                        </h2>

                        {/* Dropdown */}
                        <div className="relative z-50" ref={dropdownRef}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsOpen(!isOpen)}
                                className="glass flex items-center gap-4 rounded-full px-8 py-4 text-sm min-w-[280px] justify-between"
                            >
                                <div className="text-left">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                        {selectedState ? "Currently Exploring" : "Select a State / UT"}
                                    </p>
                                    <p className="font-semibold mt-0.5">
                                        {selectedState ? selectedState.state : "India →"}
                                    </p>
                                </div>
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white/50 text-lg flex-shrink-0"
                                >
                                    ↓
                                </motion.span>
                            </motion.button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                        exit={{ opacity: 0, y: 10, scaleY: 0.95 }}
                                        transition={{ duration: 0.22 }}
                                        style={{ transformOrigin: "top" }}
                                        className="absolute right-0 top-full mt-3 w-[320px] glass rounded-[1.5rem] overflow-hidden max-h-[55vh] overflow-y-auto shadow-2xl z-50"
                                    >
                                        {uniqueIndiaStates.map((s) => (
                                            <motion.button
                                                key={s.state}
                                                whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                                                onClick={() => handleSelect(s)}
                                                className={`w-full text-left px-6 py-4 transition-colors duration-200 border-b border-white/5 last:border-0 ${
                                                    selectedState?.state === s.state
                                                        ? "text-cyan-300"
                                                        : "text-white/70"
                                                }`}
                                            >
                                                <p className="font-semibold text-sm">{s.state}</p>
                                                <p className="text-[10px] text-white/30 mt-0.5 uppercase tracking-[0.2em]">
                                                    {s.capital}
                                                </p>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* State tagline or prompt */}
                    <motion.div
                        key={selectedState?.state ?? "prompt"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 flex items-center gap-4"
                    >
                        <div className="h-px w-12 bg-cyan-400/40" />
                        <p className="text-white/40 text-sm italic">
                            {selectedState
                                ? selectedState.tagline
                                : "Choose a state above to explore its 5 most beautiful destinations."}
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Carousel (only when state selected) ──────────────────────── */}
            <AnimatePresence mode="wait">
                {selectedState ? (
                    <motion.div
                        key={selectedState.state}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <PlaceCarousel
                            stateData={selectedState}
                            onInterest={onInterest}
                        />
                    </motion.div>
                ) : (
                    /* Placeholder when no state selected */
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-7xl px-6 pb-24"
                    >
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {uniqueIndiaStates.slice(0, 8).map((s, i) => (
                                <motion.button
                                    key={s.state}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.07 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    onClick={() => handleSelect(s)}
                                    className="glass rounded-[1.5rem] p-6 text-left group"
                                >
                                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/60 mb-2">
                                        {s.capital}
                                    </p>
                                    <h3 className="font-bold text-lg group-hover:text-white transition-colors">
                                        {s.state}
                                    </h3>
                                    <p className="text-white/35 text-xs mt-2 leading-relaxed line-clamp-2">
                                        {s.tagline}
                                    </p>
                                    <p className="text-cyan-400/50 text-[10px] uppercase tracking-[0.3em] mt-4 group-hover:text-cyan-300 transition-colors">
                                        Explore 5 places →
                                    </p>
                                </motion.button>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-6 text-center"
                        >
                            <p className="text-white/25 text-xs tracking-[0.3em] uppercase">
                                + {uniqueIndiaStates.length - 8} more states & union territories in the dropdown
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default StateExplorer;