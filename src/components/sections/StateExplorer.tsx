import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { uniqueIndiaStates, type IndiaPlace, type IndiaState } from "../../utils/travelData";
import MagneticButton from "../ui/MagneticButton";

const R = "16px";

const sortedIndiaStates = [...uniqueIndiaStates].sort((a, b) =>
    a.state.localeCompare(b.state)
);

interface Region { name: string; capital: string; tagline: string; places: IndiaPlace[]; }
interface Country { code: string; flag: string; name: string; regionLabel: string; available: boolean; regions: Region[]; comingSoonText: string; }

const COUNTRIES: Country[] = [
    { code: "IN", flag: "🇮🇳", name: "India", regionLabel: "State / UT", available: true, comingSoonText: "", regions: sortedIndiaStates.map(s => ({ name: s.state, capital: s.capital, tagline: s.tagline, places: s.places })) },
    { code: "BT", flag: "🇧🇹", name: "Bhutan", regionLabel: "Dzongkhag", available: false, comingSoonText: "Bhutan's 20 Dzongkhags — from Thimphu to Bumthang — are being curated. Coming soon.", regions: [{ name: "Thimphu", capital: "Thimphu City", tagline: "The capital kingdom", places: [] }, { name: "Paro", capital: "Paro Town", tagline: "Tigers nest and river valleys", places: [] }, { name: "Punakha", capital: "Punakha Town", tagline: "Ancient winter capital", places: [] }, { name: "Bumthang", capital: "Jakar", tagline: "The spiritual heartland", places: [] }, { name: "Wangdue Phodrang", capital: "Wangdue Town", tagline: "Gateway to the south", places: [] }, { name: "Haa", capital: "Haa Town", tagline: "Hidden valley in the west", places: [] }] },
    { code: "LK", flag: "🇱🇰", name: "Sri Lanka", regionLabel: "Province", available: false, comingSoonText: "Sri Lanka's 9 Provinces — from the Cultural Triangle to the Southern Coast — are being curated. Coming soon.", regions: [{ name: "Western Province", capital: "Colombo", tagline: "The urban coast", places: [] }, { name: "Central Province", capital: "Kandy", tagline: "Highlands and heritage", places: [] }, { name: "Southern Province", capital: "Galle", tagline: "Colonial forts and surf", places: [] }, { name: "Northern Province", capital: "Jaffna", tagline: "Tamil culture and temples", places: [] }, { name: "Eastern Province", capital: "Trincomalee", tagline: "Blue lagoons and beaches", places: [] }, { name: "North Western Province", capital: "Kurunegala", tagline: "Ancient kingdoms", places: [] }] },
    { code: "MV", flag: "🇲🇻", name: "Maldives", regionLabel: "Atoll", available: false, comingSoonText: "Maldives' 20 Atolls — from Malé to Addu — are being curated. Coming soon.", regions: [{ name: "Malé Atoll", capital: "Malé City", tagline: "The urban island", places: [] }, { name: "Ari Atoll", capital: "Mahibadhoo", tagline: "Diving paradise", places: [] }, { name: "Baa Atoll", capital: "Eydhafushi", tagline: "UNESCO Biosphere", places: [] }, { name: "Addu Atoll", capital: "Hithadhoo", tagline: "Southernmost Maldives", places: [] }, { name: "Lhaviyani Atoll", capital: "Naifaru", tagline: "Resort islands", places: [] }, { name: "Noonu Atoll", capital: "Manadhoo", tagline: "Overwater bungalows", places: [] }] },
];

interface Props { onInterest: (place: string, state: string) => void; initialState?: IndiaState | null; }

// ── Shared dropdown list style ────────────────────────────────────────────────
const dropdownListStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: "calc(100% + 8px)",
    width: "260px",
    zIndex: 99999,
    background: "#0a0d1a",  // fully opaque — no alpha
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: R,
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.95)",
    transformOrigin: "top",
    pointerEvents: "all",
};

// ── CardItem ──────────────────────────────────────────────────────────────────
const CardItem = ({ region, isSelected, available, onClick }: { region: Region; isSelected: boolean; available: boolean; onClick: () => void; }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
                position: "relative",
                background: isSelected ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isSelected ? "rgba(34,211,238,0.4)" : hovered ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: R,
                padding: "24px 20px",
                textAlign: "left",
                cursor: "pointer",
                minWidth: 0,
                overflow: "hidden",
                transition: "border-color 0.3s",
            }}
        >
            <motion.div
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0, background: "rgba(34,211,238,0.09)", transformOrigin: "left center", borderRadius: R, zIndex: 0 }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: hovered ? "#22d3ee" : isSelected ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.3)", marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.25s" }}>
                    {region.capital}
                </p>
                <h3 style={{ fontSize: "1rem", fontWeight: hovered ? 800 : 700, color: hovered ? "white" : isSelected ? "#22d3ee" : "rgba(255,255,255,0.82)", marginBottom: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.2, transition: "color 0.25s, font-weight 0.1s" }}>
                    {region.name}
                </h3>
                <p style={{ fontSize: "0.72rem", fontWeight: hovered ? 500 : 400, color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.28)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", transition: "color 0.25s, font-weight 0.1s" }}>
                    {region.tagline}
                </p>
                {available && (
                    <p style={{ fontSize: "0.6rem", letterSpacing: hovered ? "0.35em" : "0.25em", textTransform: "uppercase", color: hovered ? "#22d3ee" : isSelected ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.18)", marginTop: "10px", transition: "color 0.25s, letter-spacing 0.3s" }}>
                        Explore →
                    </p>
                )}
            </div>
        </motion.button>
    );
};

// ── PlaceCarousel ─────────────────────────────────────────────────────────────
const PlaceCarousel = ({ stateData, onInterest }: { stateData: IndiaState; onInterest: (place: string, state: string) => void }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35, dragFree: false });

    useEffect(() => { setSelectedIndex(0); setAutoplay(true); if (emblaApi) emblaApi.scrollTo(0); }, [stateData.state, emblaApi]);
    useEffect(() => { if (!emblaApi) return; const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap()); emblaApi.on("select", onSelect); onSelect(); }, [emblaApi]);
    useEffect(() => { if (!emblaApi || !autoplay) return; const t = setInterval(() => emblaApi.scrollNext(), 5000); return () => clearInterval(t); }, [emblaApi, autoplay]);
    useEffect(() => { if (!emblaApi) return; const stop = () => setAutoplay(false); emblaApi.on("pointerDown", stop); return () => emblaApi.off("pointerDown", stop); }, [emblaApi]);

    const places = stateData.places;

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full">
                    {places.map((place, index) => (
                        <div key={place.name} className="embla__slide relative h-full min-w-full overflow-hidden">
                            <motion.div className="absolute inset-0"
                                animate={{ scale: selectedIndex === index ? [1, 1.008, 1] : 1.015, y: selectedIndex === index ? [-50, -100, -50] : 0 }}
                                transition={{ duration: 18, repeat: selectedIndex === index ? Infinity : 0, ease: "easeInOut" }}>
                                <img src={place.image} alt={place.name} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover object-center gpu" />
                                <div className="absolute inset-x-0 bottom-0 z-20 h-[38%] bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
                                <motion.div animate={{ y: [-4, 4, -4], opacity: [0.65, 0.8, 0.65] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-x-0 bottom-0 z-30 h-[42%] bg-gradient-to-t from-[#050816]/45 via-[#050816]/10 to-transparent pointer-events-none" />
                            </motion.div>
                            <motion.div animate={{ opacity: selectedIndex === index ? 1 : 0.6 }} transition={{ duration: 1.2 }} className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-black/20" />
                            <motion.div
                                animate={{ y: selectedIndex === index ? 0 : 80, opacity: selectedIndex === index ? 1 : 0, scale: selectedIndex === index ? 1 : 0.96 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="absolute bottom-8 left-6 z-20 max-w-2xl md:left-44 lg:left-52">
                                <p className="mb-3 text-xs uppercase tracking-[0.5em] text-white/60 md:text-sm">{place.type} · {place.bestTime}</p>
                                <h2 className="relative z-10 text-5xl font-black leading-none tracking-[-0.04em] text-[#f8f8f8]/85 md:text-8xl lg:text-[9rem]">{place.name.split("(")[0].trim()}</h2>
                                <p className="mt-2 text-sm italic text-cyan-300/70">{place.tagline}</p>
                                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-base">{place.description}</p>
                                <div className="mt-6"><MagneticButton onClick={() => onInterest(place.name, stateData.state)}>Show Interest</MagneticButton></div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Left thumbnail strip */}
            <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
                <button onClick={() => { emblaApi?.scrollPrev(); setAutoplay(false); }} className="absolute left-1/2 top-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"><span className="text-2xl font-thin">↑</span></button>
                <div className="relative h-[520px] w-[120px] overflow-visible">
                    {places.map((place, index) => {
                        const offset = index - selectedIndex;
                        const isActive = offset === 0;
                        return (
                            <motion.button key={place.name} onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }}
                                animate={{ y: offset * 155, scale: isActive ? 1 : 0.72, rotateZ: isActive ? 0 : offset * 1.5, opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.32 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: isActive ? 1 : 0.8 }}
                                className="absolute left-0 top-1/2 origin-center -translate-y-1/2">
                                {isActive && <div className="absolute inset-0 rounded-[2rem] bg-cyan-300/10 blur-2xl" />}
                                <div className={`relative overflow-hidden rounded-[2rem] transition-all duration-700 ${isActive ? "h-[180px] w-[120px] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.15)]" : "h-[110px] w-[82px] border border-white/8"}`}>
                                    <img src={place.image} alt={place.name} loading="lazy" className="relative z-10 h-full w-full object-cover object-[center_30%] gpu" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                </div>
                                <motion.p animate={{ opacity: isActive ? 1 : 0.4 }} className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-white">{place.name.split("(")[0].trim().split(" ")[0]}</motion.p>
                            </motion.button>
                        );
                    })}
                </div>
                <button onClick={() => { emblaApi?.scrollNext(); setAutoplay(false); }} className="absolute left-1/2 bottom-[25px] z-40 -translate-x-1/2 text-white/40 transition-all duration-300 hover:text-white"><span className="text-2xl font-thin">↓</span></button>
            </div>

            {/* Right dot nav */}
            <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-6 lg:flex">
                <div className="relative flex h-[320px] w-[2px] flex-col items-center justify-between rounded-full bg-white/15">
                    {places.map((_, index) => (
                        <motion.button key={index} onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }} whileHover={{ scale: 1.2 }} className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full">
                            <motion.div animate={{ scale: selectedIndex === index ? 1.8 : 1, opacity: selectedIndex === index ? 1 : 0.5 }} transition={{ duration: 0.4 }} className={`h-2 w-2 rounded-full ${selectedIndex === index ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" : "bg-white/50"}`} />
                        </motion.button>
                    ))}
                    <motion.div animate={{ top: `${(selectedIndex / (places.length - 1)) * 100}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute left-1/2 h-16 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-cyan-200 to-transparent" />
                </div>
                <div className="flex flex-col items-center justify-between gap-6">
                    <motion.span key={selectedIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-sm font-medium tracking-[0.3em] text-white/80">{String(selectedIndex + 1).padStart(2, "0")}</motion.span>
                    <div className="h-20 w-px bg-white/20" />
                    <span className="text-xs uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-rl]">Explore</span>
                </div>
            </div>

            {/* Mobile dot nav */}
            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex gap-2 lg:hidden">
                {places.map((_, index) => (
                    <button key={index} onClick={() => { emblaApi?.scrollTo(index); setAutoplay(false); }} className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === index ? "w-8 bg-white" : "w-1.5 bg-white/30"}`} />
                ))}
            </div>

            {/* State label */}
            <motion.div key={stateData.state} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="absolute top-24 left-1/2 z-30 -translate-x-1/2 text-center pointer-events-none">
                <p className="text-xs uppercase tracking-[0.6em] text-white/35">{stateData.state}</p>
                <p className="text-[10px] tracking-[0.3em] text-white/20 mt-1 italic">{stateData.tagline}</p>
            </motion.div>
        </div>
    );
};

// ── StateExplorer ─────────────────────────────────────────────────────────────
const StateExplorer = ({ onInterest, initialState }: Props) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<IndiaPlace | null>(null);

    // ── FIX 3: Committed state only updates on Explore/Enter ─────────────────
    const [committedState, setCommittedState] = useState<IndiaState | null>(null);
    const [committedDestination, setCommittedDestination] = useState<IndiaPlace | null>(null);

    const [countryOpen, setCountryOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false);
    const [destOpen, setDestOpen] = useState(false);

    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const regionDropdownRef = useRef<HTMLDivElement>(null);
    const destDropdownRef = useRef<HTMLDivElement>(null);

    // Wire initialState from DestinationPicker
    useEffect(() => {
        if (initialState) {
            setSelectedCountry(COUNTRIES[0]);
            const match = COUNTRIES[0].regions.find(r => r.name === initialState.state);
            if (match) {
                setSelectedRegion(match);
                // Auto-commit when coming from DestinationPicker
                setCommittedState(initialState);
                setCommittedDestination(null);
            }
            setSelectedDestination(null);
        }
    }, [initialState]);

    // Close dropdowns on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) setCountryOpen(false);
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target as Node)) setRegionOpen(false);
            if (destDropdownRef.current && !destDropdownRef.current.contains(e.target as Node)) setDestOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Enter key — commit selection
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Enter" && selectedRegion) {
                const indiaState = uniqueIndiaStates.find(s => s.state === selectedRegion.name) ?? null;
                setCommittedState(indiaState);
                setCommittedDestination(selectedDestination);
                setCountryOpen(false);
                setRegionOpen(false);
                setDestOpen(false);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selectedRegion, selectedDestination]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setSelectedRegion(null);
        setSelectedDestination(null);
        setCountryOpen(false);
        setRegionOpen(false);
        setDestOpen(false);
    };

    const handleRegionSelect = (region: Region) => {
        setSelectedRegion(region);
        setSelectedDestination(null);  // reset destination to "All" when state changes
        setRegionOpen(false);
        setDestOpen(false);
    };

    const handleDestinationSelect = (dest: IndiaPlace) => {
        setSelectedDestination(dest);
        setDestOpen(false);
    };

    const handleExplore = () => {
        if (!selectedRegion) return;
        const indiaState = selectedCountry.code === "IN"
            ? uniqueIndiaStates.find(s => s.state === selectedRegion.name) ?? null
            : null;
        setCommittedState(indiaState);
        setCommittedDestination(selectedDestination);
        setCountryOpen(false);
        setRegionOpen(false);
        setDestOpen(false);
    };

    const handleReset = () => {
        setSelectedRegion(null);
        setSelectedDestination(null);
        setCommittedState(null);
        setCommittedDestination(null);
        setCountryOpen(false);
        setRegionOpen(false);
        setDestOpen(false);
    };

    const visibleCards = selectedCountry.regions.slice(0, 6);
    const remainingCount = selectedCountry.regions.length - 6;

    const dropdownBtnStyle: React.CSSProperties = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "12px", background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: R,
        padding: "0 18px", fontSize: "0.82rem", cursor: "pointer",
        color: "white", transition: "border-color 0.2s",
        width: "260px", minWidth: "260px", height: "52px",
        boxSizing: "border-box" as const,
    };

    // Shared dropdown item hover handler
    const itemHover = (enter: boolean, el: HTMLButtonElement) => {
        el.style.background = enter ? "rgba(34,211,238,0.1)" : "transparent";
    };

    return (
        <section id="state-explorer" style={{ position: "relative" }}>

            <div style={{ padding: "64px 48px 32px" }}>
                    <p className="mb-4 text-xs uppercase tracking-[0.6em] text-cyan-300">
                        Explore by Region
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "32px", marginBottom: "28px" }}>

                        {/* Title — only this animates, NOT the selector */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", color: "white", display: "block", marginBottom: "4px" }}
                        >
                            Discover
                            <span style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(2.5rem, 7vw, 5rem)", WebkitTextStroke: "0.5px white", color: "white", display: "block", lineHeight: 1.2 }}>lamhe</span>
                        </motion.h2>

                        {/* ── Selector container — NO motion wrapper, no stacking context ── */}
                        <div style={{ marginLeft: "auto", background: "rgb(10,13,26)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "20px", minWidth: "900px" }}>

                            {/* Top row: label + reset */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <p style={{ fontSize: "0.59rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgb(34, 211, 238)", fontWeight: 900 }}>
                                    Find Your Destination
                                </p>
                                <AnimatePresence>
                                    {(selectedRegion || committedState) && (
                                        <motion.button
                                            key="reset-btn"
                                            initial={{ opacity: 0, x: 8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 8 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={handleReset}
                                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: 0, transition: "color 0.2s" }}
                                            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                                        >
                                            ↺ Reset
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Three selectors */}
                            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>

                                {/* Slot 1 — Country */}
                                <div style={{ position: "relative", width: "260px", flexShrink: 0 }} ref={countryDropdownRef}>
                                    <button onClick={() => { setCountryOpen(!countryOpen); setRegionOpen(false); setDestOpen(false); }} style={dropdownBtnStyle}>
                                        <div style={{ textAlign: "left", minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <p style={{ fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "3px", lineHeight: 1 }}>Country</p>
                                            <p style={{ fontSize: "0.82rem", color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>{selectedCountry.flag} {selectedCountry.name}</p>
                                        </div>
                                        <motion.span animate={{ rotate: countryOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", flexShrink: 0 }}>↓</motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {countryOpen && (
                                            <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: 0.95 }} transition={{ duration: 0.2 }} style={dropdownListStyle}>
                                                {COUNTRIES.map(c => (
                                                    <button key={c.code} onClick={() => handleCountrySelect(c)}
                                                        style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: selectedCountry.code === c.code ? "rgba(34,211,238,0.1)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: c.available ? "pointer" : "not-allowed", opacity: c.available ? 1 : 0.4, transition: "background 0.15s" }}
                                                        onMouseEnter={e => { if (c.available && selectedCountry.code !== c.code) itemHover(true, e.currentTarget as HTMLButtonElement); }}
                                                        onMouseLeave={e => { if (selectedCountry.code !== c.code) itemHover(false, e.currentTarget as HTMLButtonElement); }}
                                                    >
                                                        <p style={{ fontSize: "0.82rem", color: selectedCountry.code === c.code ? "#22d3ee" : "rgba(255,255,255,0.8)", fontWeight: selectedCountry.code === c.code ? 600 : 400 }}>{c.flag} {c.name}</p>
                                                        {!c.available && <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "2px" }}>Coming Soon</p>}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Slot 2 — Region */}
                                <div style={{ position: "relative", width: "260px", flexShrink: 0 }} ref={regionDropdownRef}>
                                    <button onClick={() => { setRegionOpen(!regionOpen); setDestOpen(false); setCountryOpen(false); }} style={dropdownBtnStyle}>
                                        <div style={{ textAlign: "left", minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <p style={{ fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "3px", lineHeight: 1 }}>{selectedCountry.regionLabel}</p>
                                            <p style={{ fontSize: "0.82rem", color: selectedRegion ? "white" : "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>
                                                {selectedRegion ? selectedRegion.name : `Select ${selectedCountry.regionLabel}`}
                                            </p>
                                        </div>
                                        <motion.span animate={{ rotate: regionOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", flexShrink: 0 }}>↓</motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {regionOpen && (
                                            <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: 0.95 }} transition={{ duration: 0.2 }}
                                                style={{ ...dropdownListStyle, maxHeight: "280px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}
                                                onWheel={e => e.stopPropagation()}>
                                                {selectedCountry.regions.map(r => (
                                                    <button key={r.name} onClick={() => handleRegionSelect(r)}
                                                        style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: selectedRegion?.name === r.name ? "rgba(34,211,238,0.1)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.15s" }}
                                                        onMouseEnter={e => { if (selectedRegion?.name !== r.name) itemHover(true, e.currentTarget as HTMLButtonElement); }}
                                                        onMouseLeave={e => { if (selectedRegion?.name !== r.name) itemHover(false, e.currentTarget as HTMLButtonElement); }}
                                                    >
                                                        <p style={{ fontSize: "0.82rem", color: selectedRegion?.name === r.name ? "#22d3ee" : "rgba(255,255,255,0.8)", fontWeight: selectedRegion?.name === r.name ? 600 : 400 }}>{r.name}</p>
                                                        <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{r.capital}</p>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Slot 3 — Destination: greyed out until region selected */}
                                <div style={{ position: "relative", width: "260px", flexShrink: 0, opacity: selectedRegion && selectedRegion.places.length > 0 ? 1 : 0.3, pointerEvents: selectedRegion && selectedRegion.places.length > 0 ? "auto" : "none", transition: "opacity 0.3s" }} ref={destDropdownRef}>
                                    <button onClick={() => { setDestOpen(!destOpen); setRegionOpen(false); setCountryOpen(false); }} style={dropdownBtnStyle}>
                                        <div style={{ textAlign: "left", minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            <p style={{ fontSize: "0.48rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "3px", lineHeight: 1 }}>Destination</p>
                                            <p style={{ fontSize: "0.82rem", color: selectedDestination ? "white" : "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }}>
                                                {selectedDestination ? selectedDestination.name.split("(")[0].trim() : "All Destinations"}
                                            </p>
                                        </div>
                                        <motion.span animate={{ rotate: destOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", flexShrink: 0 }}>↓</motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {destOpen && (
                                            <motion.div initial={{ opacity: 0, y: -6, scaleY: 0.95 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: 0.95 }} transition={{ duration: 0.2 }}
                                                style={{ ...dropdownListStyle, maxHeight: "260px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}
                                                onWheel={e => e.stopPropagation()}>
                                                {/* All Destinations — default */}
                                                <button onClick={() => { setSelectedDestination(null); setDestOpen(false); }}
                                                    style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: !selectedDestination ? "rgba(34,211,238,0.1)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.15s" }}
                                                    onMouseEnter={e => { if (selectedDestination) itemHover(true, e.currentTarget as HTMLButtonElement); }}
                                                    onMouseLeave={e => { if (selectedDestination) itemHover(false, e.currentTarget as HTMLButtonElement); }}
                                                >
                                                    <p style={{ fontSize: "0.82rem", color: !selectedDestination ? "#22d3ee" : "rgba(255,255,255,0.8)", fontWeight: !selectedDestination ? 600 : 400 }}>All Destinations</p>
                                                    <p style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>Show full carousel</p>
                                                </button>
                                                {selectedRegion?.places.map(dest => (
                                                    <button key={dest.name} onClick={() => handleDestinationSelect(dest)}
                                                        style={{ width: "100%", textAlign: "left", padding: "11px 16px", background: selectedDestination?.name === dest.name ? "rgba(34,211,238,0.1)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background 0.15s" }}
                                                        onMouseEnter={e => { if (selectedDestination?.name !== dest.name) itemHover(true, e.currentTarget as HTMLButtonElement); }}
                                                        onMouseLeave={e => { if (selectedDestination?.name !== dest.name) itemHover(false, e.currentTarget as HTMLButtonElement); }}
                                                    >
                                                        <p style={{ fontSize: "0.82rem", color: selectedDestination?.name === dest.name ? "#22d3ee" : "rgba(255,255,255,0.8)", fontWeight: selectedDestination?.name === dest.name ? 600 : 400 }}>{dest.name.split("(")[0].trim()}</p>
                                                        <p style={{ fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{dest.type} · {dest.bestTime}</p>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Explore button */}
                            <motion.button
                                onClick={handleExplore}
                                disabled={!selectedRegion}
                                whileHover={selectedRegion ? { scale: 1.015 } : {}}
                                whileTap={selectedRegion ? { scale: 0.97 } : {}}
                                style={{
                                    width: "100%", height: "48px",
                                    background: selectedRegion ? "#22d3ee" : "rgba(255,255,255,0.05)",
                                    border: selectedRegion ? "none" : "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: R,
                                    cursor: selectedRegion ? "pointer" : "not-allowed",
                                    color: selectedRegion ? "#050816" : "rgba(255,255,255,0.22)",
                                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em",
                                    textTransform: "uppercase", transition: "background 0.3s, color 0.3s",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                }}
                            >
                                {selectedRegion
                                    ? <><span>Explore {selectedRegion.name}</span><span style={{ fontSize: "1rem" }}>→</span></>
                                    : "Select a state to explore"
                                }
                            </motion.button>

                        </div>
                    </div>

                    {/* Tagline */}
                    <motion.div key={selectedRegion?.name ?? selectedCountry.code} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "40px", height: "1px", background: "rgba(34,211,238,0.4)" }} />
                        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", fontStyle: "italic" }}>
                            {selectedRegion
                                ? selectedRegion.tagline
                                : selectedCountry.available
                                    ? `Select a ${selectedCountry.regionLabel.toLowerCase()} to explore its destinations`
                                    : selectedCountry.comingSoonText}
                        </p>
                    </motion.div>

            </div>

            {/* ── Carousel or card grid — driven by COMMITTED state only ────── */}
            <AnimatePresence mode="wait">
                {committedState && !committedDestination ? (
                    <motion.div key={committedState.state} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                        <PlaceCarousel stateData={committedState} onInterest={onInterest} />
                    </motion.div>
                ) : committedState && committedDestination ? (
                    <motion.div key={committedDestination.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                        <PlaceCarousel
                            stateData={{ ...committedState, places: [committedDestination, ...committedState.places.filter(p => p.name !== committedDestination.name)] }}
                            onInterest={onInterest}
                        />
                    </motion.div>
                ) : (
                    <motion.div key={selectedCountry.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: "0 48px 80px" }}>
                        {/* Disable card hover when any dropdown is open to prevent bleed-through */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px", pointerEvents: (countryOpen || regionOpen || destOpen) ? "none" : "auto" }}>
                            {visibleCards.map((region) => (
                                <CardItem
                                    key={region.name}
                                    region={region}
                                    isSelected={selectedRegion?.name === region.name}
                                    available={selectedCountry.available}
                                    onClick={() => handleRegionSelect(region)}
                                />
                            ))}
                        </div>
                        {remainingCount > 0 && (
                            <p style={{ marginTop: "12px", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
                                + {remainingCount} more {selectedCountry.regionLabel}s in the dropdown above
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default StateExplorer;
