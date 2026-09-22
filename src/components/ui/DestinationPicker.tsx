import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Globe, MapPin, Search } from "lucide-react";
import { uniqueIndiaStates, type IndiaState } from "../../utils/travelData";

// ── Country data — expand this when Bhutan/Sri Lanka/Maldives are ready ───────
const COUNTRIES = [
    {
        code: "IN",
        flag: "🇮🇳",
        name: "India",
        tagline: "36 States & UTs · 5000+ Destinations",
        available: true,
        states: uniqueIndiaStates,
    },
    {
        code: "BT",
        flag: "🇧🇹",
        name: "Bhutan",
        tagline: "The Last Shangri-La · Coming Soon",
        available: false,
        states: [],
    },
    {
        code: "LK",
        flag: "🇱🇰",
        name: "Sri Lanka",
        tagline: "Pearl of the Indian Ocean · Coming Soon",
        available: false,
        states: [],
    },
    {
        code: "MV",
        flag: "🇲🇻",
        name: "Maldives",
        tagline: "Ocean Paradise · Coming Soon",
        available: false,
        states: [],
    },
];

interface Props {
    open: boolean;
    onClose: () => void;
    onExplore: (country: string, state: IndiaState) => void;
}

const R = "14px";

const DestinationPicker = ({ open, onClose, onExplore }: Props) => {
    const [step, setStep] = useState<"country" | "state">("country");
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [selectedState, setSelectedState] = useState<IndiaState | null>(null);
    const [stateSearch, setStateSearch] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    // Reset when opened
    useEffect(() => {
        if (open) {
            setStep("country");
            setSelectedCountry(COUNTRIES[0]);
            setSelectedState(null);
            setStateSearch("");
        }
    }, [open]);

    // Focus search when step changes to state
    useEffect(() => {
        if (step === "state") {
            setTimeout(() => searchRef.current?.focus(), 300);
        }
    }, [step]);

    const filteredStates = uniqueIndiaStates.filter(s =>
        s.state.toLowerCase().includes(stateSearch.toLowerCase()) ||
        s.capital.toLowerCase().includes(stateSearch.toLowerCase())
    );

    const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
        if (!country.available) return;
        setSelectedCountry(country);
        // Auto-advance to state step
        setTimeout(() => setStep("state"), 200);
    };

    const handleExplore = () => {
        if (!selectedState) return;
        onClose();
        // Small delay so modal closes before scroll
        setTimeout(() => {
            onExplore(selectedCountry.name, selectedState);
            const el = document.getElementById("state-explorer");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 350);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: "fixed", inset: 0, zIndex: 99990,
                        background: "rgba(5,8,22,0.88)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px 16px",
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 32 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 32 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "680px",
                            background: "rgba(10,14,28,0.97)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: "24px",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
                            overflow: "hidden",
                        }}
                    >
                        {/* ── Header ─────────────────────────────────────── */}
                        <div style={{
                            padding: "28px 32px 0",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}>
                            <div>
                                {/* Breadcrumb */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "12px",
                                }}>
                                    <button
                                        onClick={() => setStep("country")}
                                        style={{
                                            fontSize: "0.6rem",
                                            letterSpacing: "0.4em",
                                            textTransform: "uppercase",
                                            color: step === "country" ? "#22d3ee" : "rgba(255,255,255,0.35)",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        Country
                                    </button>
                                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>›</span>
                                    <span style={{
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.4em",
                                        textTransform: "uppercase",
                                        color: step === "state" ? "#22d3ee" : "rgba(255,255,255,0.2)",
                                    }}>
                                        State / Region
                                    </span>
                                    {selectedState && (
                                        <>
                                            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.6rem" }}>›</span>
                                            <span style={{
                                                fontSize: "0.6rem",
                                                letterSpacing: "0.3em",
                                                textTransform: "uppercase",
                                                color: "rgba(255,255,255,0.5)",
                                            }}>
                                                {selectedState.state}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <h2 style={{
                                            fontSize: "clamp(1.4rem, 3vw, 2rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.02em",
                                            color: "white",
                                            lineHeight: 1,
                                            marginBottom: "4px",
                                        }}>
                                            {step === "country"
                                                ? "Where are you headed?"
                                                : `Explore ${selectedCountry.flag} ${selectedCountry.name}`}
                                        </h2>
                                        <p style={{
                                            fontSize: "0.78rem",
                                            color: "rgba(255,255,255,0.35)",
                                            marginTop: "6px",
                                        }}>
                                            {step === "country"
                                                ? "Select a destination country to begin"
                                                : "Pick a state or union territory"}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Close */}
                            <button
                                onClick={onClose}
                                style={{
                                    width: "32px", height: "32px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "rgba(255,255,255,0.4)",
                                    flexShrink: 0,
                                    marginTop: "4px",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                                }}
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* ── Content ─────────────────────────────────────── */}
                        <div style={{ padding: "24px 32px 32px" }}>
                            <AnimatePresence mode="wait">

                                {/* STEP 1 — Country */}
                                {step === "country" && (
                                    <motion.div
                                        key="country"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "12px",
                                        }}>
                                            {COUNTRIES.map(country => (
                                                <motion.button
                                                    key={country.code}
                                                    whileHover={country.available ? { scale: 1.02, y: -2 } : {}}
                                                    whileTap={country.available ? { scale: 0.98 } : {}}
                                                    onClick={() => handleCountrySelect(country)}
                                                    style={{
                                                        padding: "20px",
                                                        borderRadius: R,
                                                        border: `1px solid ${
                                                            selectedCountry.code === country.code && country.available
                                                                ? "rgba(34,211,238,0.4)"
                                                                : "rgba(255,255,255,0.08)"
                                                        }`,
                                                        background: selectedCountry.code === country.code && country.available
                                                            ? "rgba(34,211,238,0.06)"
                                                            : "rgba(255,255,255,0.03)",
                                                        cursor: country.available ? "pointer" : "not-allowed",
                                                        textAlign: "left",
                                                        opacity: country.available ? 1 : 0.45,
                                                        transition: "all 0.25s",
                                                        position: "relative",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {/* Coming soon badge */}
                                                    {!country.available && (
                                                        <span style={{
                                                            position: "absolute",
                                                            top: "10px",
                                                            right: "10px",
                                                            fontSize: "0.48rem",
                                                            letterSpacing: "0.3em",
                                                            textTransform: "uppercase",
                                                            color: "rgba(255,255,255,0.4)",
                                                            background: "rgba(255,255,255,0.08)",
                                                            padding: "3px 8px",
                                                            borderRadius: "999px",
                                                        }}>
                                                            Soon
                                                        </span>
                                                    )}
                                                    <div style={{ fontSize: "2rem", marginBottom: "10px", lineHeight: 1 }}>
                                                        {country.flag}
                                                    </div>
                                                    <p style={{
                                                        fontSize: "0.95rem",
                                                        fontWeight: 700,
                                                        color: country.available ? "white" : "rgba(255,255,255,0.5)",
                                                        marginBottom: "4px",
                                                    }}>
                                                        {country.name}
                                                    </p>
                                                    <p style={{
                                                        fontSize: "0.62rem",
                                                        color: "rgba(255,255,255,0.3)",
                                                        letterSpacing: "0.05em",
                                                        lineHeight: 1.5,
                                                    }}>
                                                        {country.tagline}
                                                    </p>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2 — State */}
                                {step === "state" && (
                                    <motion.div
                                        key="state"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Search */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: R,
                                            padding: "10px 16px",
                                            marginBottom: "14px",
                                        }}>
                                            <Search size={14} color="rgba(255,255,255,0.3)" />
                                            <input
                                                ref={searchRef}
                                                value={stateSearch}
                                                onChange={e => setStateSearch(e.target.value)}
                                                placeholder="Search states & union territories..."
                                                style={{
                                                    flex: 1,
                                                    background: "none",
                                                    border: "none",
                                                    outline: "none",
                                                    fontSize: "0.82rem",
                                                    color: "white",
                                                }}
                                            />
                                            {stateSearch && (
                                                <button
                                                    onClick={() => setStateSearch("")}
                                                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", display: "flex" }}
                                                >
                                                    <X size={12} />
                                                </button>
                                            )}
                                        </div>

                                        {/* State grid */}
                                        <div style={{
                                            maxHeight: "320px",
                                            overflowY: "auto",
                                            overscrollBehavior: "contain",
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "rgba(255,255,255,0.12) transparent",
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "8px",
                                        }}
                                            onWheel={e => e.stopPropagation()}
                                        >
                                            {filteredStates.map(state => {
                                                const isSelected = selectedState?.state === state.state;
                                                return (
                                                    <motion.button
                                                        key={state.state}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setSelectedState(state)}
                                                        style={{
                                                            padding: "12px 16px",
                                                            borderRadius: R,
                                                            border: `1px solid ${isSelected ? "rgba(34,211,238,0.45)" : "rgba(255,255,255,0.07)"}`,
                                                            background: isSelected
                                                                ? "rgba(34,211,238,0.07)"
                                                                : "rgba(255,255,255,0.03)",
                                                            cursor: "pointer",
                                                            textAlign: "left",
                                                            transition: "all 0.2s",
                                                        }}
                                                    >
                                                        <p style={{
                                                            fontSize: "0.8rem",
                                                            fontWeight: 600,
                                                            color: isSelected ? "#22d3ee" : "rgba(255,255,255,0.75)",
                                                            marginBottom: "2px",
                                                        }}>
                                                            {state.state}
                                                        </p>
                                                        <p style={{
                                                            fontSize: "0.58rem",
                                                            letterSpacing: "0.2em",
                                                            textTransform: "uppercase",
                                                            color: "rgba(255,255,255,0.25)",
                                                        }}>
                                                            {state.capital}
                                                        </p>
                                                    </motion.button>
                                                );
                                            })}

                                            {filteredStates.length === 0 && (
                                                <div style={{
                                                    gridColumn: "1 / -1",
                                                    textAlign: "center",
                                                    padding: "32px",
                                                    color: "rgba(255,255,255,0.25)",
                                                    fontSize: "0.8rem",
                                                }}>
                                                    No states found for "{stateSearch}"
                                                </div>
                                            )}
                                        </div>

                                        {/* Explore CTA */}
                                        <div style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            gap: "12px",
                                            alignItems: "center",
                                        }}>
                                            <motion.button
                                                whileHover={selectedState ? { scale: 1.02 } : {}}
                                                whileTap={selectedState ? { scale: 0.97 } : {}}
                                                onClick={handleExplore}
                                                disabled={!selectedState}
                                                style={{
                                                    flex: 1,
                                                    background: selectedState ? "#22d3ee" : "rgba(255,255,255,0.08)",
                                                    color: selectedState ? "#050816" : "rgba(255,255,255,0.25)",
                                                    border: "none",
                                                    borderRadius: "50px",
                                                    padding: "14px 24px",
                                                    fontWeight: 700,
                                                    fontSize: "0.82rem",
                                                    letterSpacing: "0.06em",
                                                    cursor: selectedState ? "pointer" : "not-allowed",
                                                    transition: "all 0.25s",
                                                }}
                                            >
                                                {selectedState
                                                    ? `Explore ${selectedState.state} →`
                                                    : "Select a state to continue"}
                                            </motion.button>

                                            <button
                                                onClick={() => setStep("country")}
                                                style={{
                                                    padding: "14px 20px",
                                                    borderRadius: "50px",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    background: "transparent",
                                                    color: "rgba(255,255,255,0.4)",
                                                    fontSize: "0.75rem",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                    whiteSpace: "nowrap",
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.color = "white"}
                                                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                                            >
                                                ← Back
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DestinationPicker;