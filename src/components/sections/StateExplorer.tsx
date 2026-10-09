import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import {uniqueIndiaStates, type IndiaPlace, type IndiaState} from "../../utils/travelData";
import {useNavigate} from "react-router-dom";
import {showCover} from "../../utils/routeBlock";
import {Search, X} from "lucide-react";

const toSlug = (name: string): string =>
    name.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const R = "16px";

const sortedIndiaStates = [...uniqueIndiaStates].sort((a, b) => a.state.localeCompare(b.state));

interface Region {
    name: string;
    capital: string;
    tagline: string;
    places: IndiaPlace[];
}

interface Country {
    code: string;
    flag: string;
    name: string;
    regionLabel: string;
    available: boolean;
    regions: Region[];
    comingSoonText: string;
}

const COUNTRIES: Country[] = [
    {
        code: "IN",
        flag: "🇮🇳",
        name: "India",
        regionLabel: "State / UT",
        available: true,
        comingSoonText: "",
        regions: sortedIndiaStates.map(s => ({name: s.state, capital: s.capital, tagline: s.tagline, places: s.places}))
    },
    {
        code: "BT",
        flag: "🇧🇹",
        name: "Bhutan",
        regionLabel: "Dzongkhag",
        available: false,
        comingSoonText: "Bhutan's 20 Dzongkhags — from Thimphu to Bumthang — are being curated. Coming soon.",
        regions: [{name: "Thimphu", capital: "Thimphu City", tagline: "The capital kingdom", places: []}, {
            name: "Paro",
            capital: "Paro Town",
            tagline: "Tigers nest and river valleys",
            places: []
        }, {name: "Punakha", capital: "Punakha Town", tagline: "Ancient winter capital", places: []}, {
            name: "Bumthang",
            capital: "Jakar",
            tagline: "The spiritual heartland",
            places: []
        }, {
            name: "Wangdue Phodrang",
            capital: "Wangdue Town",
            tagline: "Gateway to the south",
            places: []
        }, {name: "Haa", capital: "Haa Town", tagline: "Hidden valley in the west", places: []}]
    },
    {
        code: "LK",
        flag: "🇱🇰",
        name: "Sri Lanka",
        regionLabel: "Province",
        available: false,
        comingSoonText: "Sri Lanka's 9 Provinces — from the Cultural Triangle to the Southern Coast — are being curated. Coming soon.",
        regions: [{
            name: "Western Province",
            capital: "Colombo",
            tagline: "The urban coast",
            places: []
        }, {
            name: "Central Province",
            capital: "Kandy",
            tagline: "Highlands and heritage",
            places: []
        }, {
            name: "Southern Province",
            capital: "Galle",
            tagline: "Colonial forts and surf",
            places: []
        }, {
            name: "Northern Province",
            capital: "Jaffna",
            tagline: "Tamil culture and temples",
            places: []
        }, {
            name: "Eastern Province",
            capital: "Trincomalee",
            tagline: "Blue lagoons and beaches",
            places: []
        }, {name: "North Western Province", capital: "Kurunegala", tagline: "Ancient kingdoms", places: []}]
    },
    {
        code: "MV",
        flag: "🇲🇻",
        name: "Maldives",
        regionLabel: "Atoll",
        available: false,
        comingSoonText: "Maldives' 20 Atolls — from Malé to Addu — are being curated. Coming soon.",
        regions: [{
            name: "Malé Atoll",
            capital: "Malé City",
            tagline: "The urban island",
            places: []
        }, {name: "Ari Atoll", capital: "Mahibadhoo", tagline: "Diving paradise", places: []}, {
            name: "Baa Atoll",
            capital: "Eydhafushi",
            tagline: "UNESCO Biosphere",
            places: []
        }, {
            name: "Addu Atoll",
            capital: "Hithadhoo",
            tagline: "Southernmost Maldives",
            places: []
        }, {name: "Lhaviyani Atoll", capital: "Naifaru", tagline: "Resort islands", places: []}, {
            name: "Noonu Atoll",
            capital: "Manadhoo",
            tagline: "Overwater bungalows",
            places: []
        }]
    },
];

interface Props {
    onInterest: (place: string, state: string) => void;
    initialState?: IndiaState | null;
}

const dropdownListStyle: React.CSSProperties = {
    position: "absolute", left: 0, top: "calc(100% + 8px)", width: "260px",
    zIndex: 99999, background: "#0a0d1a", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: R, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.95)",
    transformOrigin: "top", pointerEvents: "all",
};

const CardItem = ({region, isSelected, available, onClick}: {
    region: Region; isSelected: boolean; available: boolean; onClick: () => void;
}) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.button
            initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
            whileTap={{scale: 0.97}} transition={{type: "spring", stiffness: 400, damping: 25}}
            onClick={onClick} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
            style={{
                position: "relative",
                background: isSelected ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isSelected ? "rgba(34,211,238,0.4)" : hovered ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: R, padding: "24px 20px", textAlign: "left",
                cursor: "pointer", minWidth: 0, overflow: "hidden", transition: "border-color 0.3s",
            }}
        >
            <motion.div animate={{scaleX: hovered ? 1 : 0}} transition={{duration: 0.45, ease: [0.22, 1, 0.36, 1]}}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(34,211,238,0.09)",
                            transformOrigin: "left center",
                            borderRadius: R,
                            zIndex: 0
                        }}/>
            <div style={{position: "relative", zIndex: 1}}>
                <p style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: hovered ? "#22d3ee" : isSelected ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.3)",
                    marginBottom: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    transition: "color 0.25s"
                }}>{region.capital}</p>
                <h3 style={{
                    fontSize: "1rem",
                    fontWeight: hovered ? 800 : 700,
                    color: hovered ? "white" : isSelected ? "#22d3ee" : "rgba(255,255,255,0.82)",
                    marginBottom: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                    transition: "color 0.25s, font-weight 0.1s"
                }}>{region.name}</h3>
                <p style={{
                    fontSize: "0.72rem",
                    fontWeight: hovered ? 500 : 400,
                    color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.28)",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    transition: "color 0.25s, font-weight 0.1s"
                }}>{region.tagline}</p>
                {available && (
                    <p style={{
                        fontSize: "0.6rem",
                        letterSpacing: hovered ? "0.35em" : "0.25em",
                        textTransform: "uppercase",
                        color: hovered ? "#22d3ee" : isSelected ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.18)",
                        marginTop: "10px",
                        transition: "color 0.25s, letter-spacing 0.3s"
                    }}>Explore →</p>
                )}
            </div>
        </motion.button>
    );
};

const StateExplorer = ({onInterest: _onInterest, initialState}: Props) => {
    const navigate = useNavigate();

    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<IndiaPlace | null>(null);
    const [cardRegion, setCardRegion] = useState<Region | null>(null);

    const [countryOpen, setCountryOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false);
    const [destOpen, setDestOpen] = useState(false);

    const [regionSearch, setRegionSearch] = useState("");
    const regionSearchRef = useRef<HTMLInputElement>(null);

    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const regionDropdownRef = useRef<HTMLDivElement>(null);
    const destDropdownRef = useRef<HTMLDivElement>(null);

    const filteredRegions = regionSearch.trim()
        ? selectedCountry.regions.filter(r =>
            r.name.toLowerCase().includes(regionSearch.toLowerCase()) ||
            r.capital.toLowerCase().includes(regionSearch.toLowerCase()))
        : selectedCountry.regions;

    useEffect(() => {
        if (regionOpen) setTimeout(() => regionSearchRef.current?.focus(), 60);
        else setRegionSearch("");
    }, [regionOpen]);

    useEffect(() => {
        if (!regionOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Enter" && filteredRegions.length === 1) handleRegionSelect(filteredRegions[0]);
            if (e.key === "Escape") {
                setRegionOpen(false);
                setRegionSearch("");
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [regionOpen, filteredRegions]);

    useEffect(() => {
        if (initialState) {
            setSelectedCountry(COUNTRIES[0]);
            const match = COUNTRIES[0].regions.find(r => r.name === initialState.state);
            if (match) setSelectedRegion(match);
            setSelectedDestination(null);
        }
    }, [initialState]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) setCountryOpen(false);
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target as Node)) {
                setRegionOpen(false);
                setRegionSearch("");
            }
            if (destDropdownRef.current && !destDropdownRef.current.contains(e.target as Node)) setDestOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Enter" && selectedRegion && !regionOpen) handleExplore();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [selectedRegion, selectedDestination, regionOpen]);

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setSelectedRegion(null);
        setSelectedDestination(null);
        setCardRegion(null);
        setCountryOpen(false);
        setRegionOpen(false);
        setDestOpen(false);
        setRegionSearch("");
    };

    const handleRegionSelect = (region: Region) => {
        setSelectedRegion(region);
        setSelectedDestination(null);
        setRegionOpen(false);
        setRegionSearch("");
        setDestOpen(false);
    };

    const handleDestinationSelect = (dest: IndiaPlace) => {
        setSelectedDestination(dest);
        setDestOpen(false);
    };

    const handleExplore = () => {
        if (!selectedRegion) return;
        const countrySlug = selectedCountry.code.toLowerCase();
        const stateSlug = toSlug(selectedRegion.name);
        navigate(selectedDestination
            ? `/${countrySlug}/${stateSlug}/${toSlug(selectedDestination.name)}`
            : `/${countrySlug}/${stateSlug}`);
    };

    const handleReset = () => {
        setSelectedRegion(null);
        setSelectedDestination(null);
        setCardRegion(null);
        setCountryOpen(false);
        setRegionOpen(false);
        setDestOpen(false);
        setRegionSearch("");
    };

    const visibleCards = selectedCountry.regions.slice(0, 6);
    const remainingCount = selectedCountry.regions.length - 6;

    const dropdownBtnStyle: React.CSSProperties = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "12px", background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: R,
        padding: "0 18px", fontSize: "0.82rem", cursor: "pointer",
        color: "white", transition: "border-color 0.2s",
        width: "260px", minWidth: "260px", height: "52px", boxSizing: "border-box" as const,
    };

    const itemHover = (enter: boolean, el: HTMLButtonElement) => {
        el.style.background = enter ? "rgba(34,211,238,0.1)" : "transparent";
    };

    const highlight = (text: string) => {
        if (!regionSearch) return text;
        const idx = text.toLowerCase().indexOf(regionSearch.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark style={{background: "rgba(34,211,238,0.25)", color: "#22d3ee", borderRadius: "2px"}}>
                    {text.slice(idx, idx + regionSearch.length)}
                </mark>
                {text.slice(idx + regionSearch.length)}
            </>
        );
    };

    return (
        <section id="state-explorer" style={{position: "relative"}}>
            <div style={{padding: "64px 48px 32px"}}>
                <p className="mb-4 text-xs uppercase tracking-[0.6em] text-cyan-300">Explore by Region</p>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "32px",
                    marginBottom: "28px"
                }}>

                    <motion.h2 initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}}
                               transition={{duration: 0.8}} viewport={{once: true}}
                               style={{
                                   fontSize: "clamp(3rem, 8vw, 6rem)",
                                   fontWeight: 900,
                                   lineHeight: 1,
                                   letterSpacing: "-0.02em",
                                   color: "white",
                                   display: "block",
                                   marginBottom: "4px"
                               }}>
                        Discover
                        <span style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: "clamp(2.5rem, 7vw, 5rem)",
                            WebkitTextStroke: "0.5px white",
                            color: "white",
                            display: "block",
                            lineHeight: 1.2
                        }}>lamhe</span>
                    </motion.h2>

                    <div style={{
                        marginLeft: "auto",
                        background: "rgb(10,13,26)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "20px",
                        padding: "28px 32px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        minWidth: "900px"
                    }}>

                        {/* Fixed-height row so the Reset button never shifts the container height */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "28px"
                        }}>
                            <p style={{
                                fontSize: "0.59rem",
                                letterSpacing: "0.45em",
                                textTransform: "uppercase",
                                color: "rgb(34,211,238)",
                                fontWeight: 900,
                                margin: 0,
                            }}>Find Your Destination</p>
                            {/* Always in the DOM — only opacity changes, so no layout shift ever */}
                            <motion.button
                                onClick={handleReset}
                                animate={{
                                    opacity: selectedRegion ? 1 : 0,
                                    pointerEvents: selectedRegion ? "auto" : "none"
                                }}
                                transition={{duration: 0.2}}
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    borderRadius: "999px",
                                    cursor: "pointer",
                                    fontSize: "0.56rem",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.7)",
                                    padding: "4px 12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    flexShrink: 0,
                                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                                    lineHeight: 1,
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(34,211,238,0.12)";
                                    e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
                                    e.currentTarget.style.color = "#22d3ee";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                                }}
                            >
                                <span style={{fontSize: "0.85rem", lineHeight: 1}}>↺</span> Reset
                            </motion.button>
                        </div>

                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>

                            {/* Slot 1 — Country */}
                            <div style={{position: "relative", width: "260px", flexShrink: 0}} ref={countryDropdownRef}>
                                <button onClick={() => {
                                    setCountryOpen(!countryOpen);
                                    setRegionOpen(false);
                                    setDestOpen(false);
                                }} style={dropdownBtnStyle}>
                                    <div style={{
                                        textAlign: "left",
                                        minWidth: 0,
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                        <p style={{
                                            fontSize: "0.48rem",
                                            letterSpacing: "0.35em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,0.3)",
                                            marginBottom: "3px",
                                            lineHeight: 1
                                        }}>Country</p>
                                        <p style={{
                                            fontSize: "0.82rem",
                                            color: "white",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            lineHeight: 1
                                        }}>{selectedCountry.flag} {selectedCountry.name}</p>
                                    </div>
                                    <motion.span animate={{rotate: countryOpen ? 180 : 0}} transition={{duration: 0.2}}
                                                 style={{
                                                     color: "rgba(255,255,255,0.4)",
                                                     fontSize: "0.75rem",
                                                     flexShrink: 0
                                                 }}>↓
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {countryOpen && (
                                        <motion.div initial={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    animate={{opacity: 1, y: 0, scaleY: 1}}
                                                    exit={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    transition={{duration: 0.2}} style={dropdownListStyle}>
                                            {COUNTRIES.map(c => (
                                                <button key={c.code} onClick={() => handleCountrySelect(c)}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "left",
                                                            padding: "11px 16px",
                                                            background: selectedCountry.code === c.code ? "rgba(34,211,238,0.1)" : "transparent",
                                                            border: "none",
                                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                            cursor: c.available ? "pointer" : "not-allowed",
                                                            opacity: c.available ? 1 : 0.4,
                                                            transition: "background 0.15s"
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (c.available && selectedCountry.code !== c.code) itemHover(true, e.currentTarget as HTMLButtonElement);
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (selectedCountry.code !== c.code) itemHover(false, e.currentTarget as HTMLButtonElement);
                                                        }}
                                                >
                                                    <p style={{
                                                        fontSize: "0.82rem",
                                                        color: selectedCountry.code === c.code ? "#22d3ee" : "rgba(255,255,255,0.8)",
                                                        fontWeight: selectedCountry.code === c.code ? 600 : 400
                                                    }}>{c.flag} {c.name}</p>
                                                    {!c.available && <p style={{
                                                        fontSize: "0.55rem",
                                                        letterSpacing: "0.2em",
                                                        textTransform: "uppercase",
                                                        color: "rgba(255,255,255,0.25)",
                                                        marginTop: "2px"
                                                    }}>Coming Soon</p>}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Slot 2 — Region with live search */}
                            <div style={{position: "relative", width: "260px", flexShrink: 0}} ref={regionDropdownRef}>
                                {regionOpen ? (
                                    <div style={{
                                        ...dropdownBtnStyle,
                                        padding: "0 14px",
                                        cursor: "text",
                                        borderColor: "rgba(34,211,238,0.45)",
                                        background: "rgba(34,211,238,0.04)"
                                    }}
                                         onClick={() => regionSearchRef.current?.focus()}>
                                        <Search size={14} style={{color: "#22d3ee", flexShrink: 0}}/>
                                        <input
                                            ref={regionSearchRef}
                                            value={regionSearch}
                                            onChange={e => setRegionSearch(e.target.value)}
                                            placeholder={`Search ${selectedCountry.regionLabel}…`}
                                            style={{
                                                flex: 1,
                                                background: "none",
                                                border: "none",
                                                outline: "none",
                                                fontSize: "0.82rem",
                                                color: "white",
                                                minWidth: 0,
                                                caretColor: "#22d3ee"
                                            }}
                                        />
                                        {regionSearch && (
                                            <button onClick={e => {
                                                e.stopPropagation();
                                                setRegionSearch("");
                                                regionSearchRef.current?.focus();
                                            }}
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        color: "rgba(255,255,255,0.4)",
                                                        padding: 0,
                                                        flexShrink: 0
                                                    }}>
                                                <X size={13}/>
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <button onClick={() => {
                                        setRegionOpen(true);
                                        setDestOpen(false);
                                        setCountryOpen(false);
                                    }} style={dropdownBtnStyle}>
                                        <div style={{
                                            textAlign: "left",
                                            minWidth: 0,
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center"
                                        }}>
                                            <p style={{
                                                fontSize: "0.48rem",
                                                letterSpacing: "0.35em",
                                                textTransform: "uppercase",
                                                color: "rgba(255,255,255,0.3)",
                                                marginBottom: "3px",
                                                lineHeight: 1
                                            }}>{selectedCountry.regionLabel}</p>
                                            <p style={{
                                                fontSize: "0.82rem",
                                                color: selectedRegion ? "white" : "rgba(255,255,255,0.4)",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                lineHeight: 1
                                            }}>
                                                {selectedRegion ? selectedRegion.name : `Select ${selectedCountry.regionLabel}`}
                                            </p>
                                        </div>
                                        <span style={{
                                            color: "rgba(255,255,255,0.4)",
                                            fontSize: "0.75rem",
                                            flexShrink: 0
                                        }}>↓</span>
                                    </button>
                                )}

                                <AnimatePresence>
                                    {regionOpen && (
                                        <motion.div initial={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    animate={{opacity: 1, y: 0, scaleY: 1}}
                                                    exit={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    transition={{duration: 0.2}}
                                                    style={{
                                                        ...dropdownListStyle,
                                                        maxHeight: "280px",
                                                        overflowY: "auto",
                                                        scrollbarWidth: "thin",
                                                        scrollbarColor: "rgba(255,255,255,0.12) transparent"
                                                    }}
                                                    onWheel={e => e.stopPropagation()}>
                                            {filteredRegions.length === 0 ? (
                                                <div style={{padding: "24px 16px", textAlign: "center"}}>
                                                    <p style={{fontSize: "0.78rem", color: "rgba(255,255,255,0.35)"}}>No
                                                        match for "{regionSearch}"</p>
                                                    <button onClick={() => {
                                                        setRegionSearch("");
                                                        regionSearchRef.current?.focus();
                                                    }}
                                                            style={{
                                                                marginTop: "8px",
                                                                background: "none",
                                                                border: "none",
                                                                cursor: "pointer",
                                                                fontSize: "0.58rem",
                                                                letterSpacing: "0.25em",
                                                                textTransform: "uppercase",
                                                                color: "#22d3ee"
                                                            }}>
                                                        Clear
                                                    </button>
                                                </div>
                                            ) : filteredRegions.map(r => (
                                                <button key={r.name} onClick={() => handleRegionSelect(r)}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "left",
                                                            padding: "11px 16px",
                                                            background: selectedRegion?.name === r.name ? "rgba(34,211,238,0.1)" : filteredRegions.length === 1 ? "rgba(34,211,238,0.06)" : "transparent",
                                                            border: "none",
                                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                            cursor: "pointer",
                                                            transition: "background 0.15s"
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (selectedRegion?.name !== r.name) itemHover(true, e.currentTarget as HTMLButtonElement);
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (selectedRegion?.name !== r.name) itemHover(false, e.currentTarget as HTMLButtonElement);
                                                        }}
                                                >
                                                    <p style={{
                                                        fontSize: "0.82rem",
                                                        color: selectedRegion?.name === r.name ? "#22d3ee" : filteredRegions.length === 1 ? "white" : "rgba(255,255,255,0.8)",
                                                        fontWeight: selectedRegion?.name === r.name || filteredRegions.length === 1 ? 600 : 400
                                                    }}>
                                                        {highlight(r.name)}
                                                    </p>
                                                    <p style={{
                                                        fontSize: "0.58rem",
                                                        letterSpacing: "0.2em",
                                                        textTransform: "uppercase",
                                                        color: "rgba(255,255,255,0.3)",
                                                        marginTop: "2px"
                                                    }}>
                                                        {highlight(r.capital)}
                                                    </p>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Slot 3 — Destination */}
                            <div style={{
                                position: "relative",
                                width: "260px",
                                flexShrink: 0,
                                opacity: selectedRegion && selectedRegion.places.length > 0 ? 1 : 0.3,
                                pointerEvents: selectedRegion && selectedRegion.places.length > 0 ? "auto" : "none",
                                transition: "opacity 0.3s"
                            }} ref={destDropdownRef}>
                                <button onClick={() => {
                                    setDestOpen(!destOpen);
                                    setRegionOpen(false);
                                    setCountryOpen(false);
                                }} style={dropdownBtnStyle}>
                                    <div style={{
                                        textAlign: "left",
                                        minWidth: 0,
                                        overflow: "hidden",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                        <p style={{
                                            fontSize: "0.48rem",
                                            letterSpacing: "0.35em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,0.3)",
                                            marginBottom: "3px",
                                            lineHeight: 1
                                        }}>Destination</p>
                                        <p style={{
                                            fontSize: "0.82rem",
                                            color: selectedDestination ? "white" : "rgba(255,255,255,0.4)",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            lineHeight: 1
                                        }}>
                                            {selectedDestination ? selectedDestination.name.split("(")[0].trim() : "All Destinations"}
                                        </p>
                                    </div>
                                    <motion.span animate={{rotate: destOpen ? 180 : 0}} transition={{duration: 0.2}}
                                                 style={{
                                                     color: "rgba(255,255,255,0.4)",
                                                     fontSize: "0.75rem",
                                                     flexShrink: 0
                                                 }}>↓
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {destOpen && (
                                        <motion.div initial={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    animate={{opacity: 1, y: 0, scaleY: 1}}
                                                    exit={{opacity: 0, y: -6, scaleY: 0.95}}
                                                    transition={{duration: 0.2}}
                                                    style={{
                                                        ...dropdownListStyle,
                                                        maxHeight: "260px",
                                                        overflowY: "auto",
                                                        scrollbarWidth: "thin",
                                                        scrollbarColor: "rgba(255,255,255,0.12) transparent"
                                                    }}
                                                    onWheel={e => e.stopPropagation()}>
                                            <button onClick={() => {
                                                setSelectedDestination(null);
                                                setDestOpen(false);
                                            }}
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "left",
                                                        padding: "11px 16px",
                                                        background: !selectedDestination ? "rgba(34,211,238,0.1)" : "transparent",
                                                        border: "none",
                                                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                        cursor: "pointer",
                                                        transition: "background 0.15s"
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (selectedDestination) itemHover(true, e.currentTarget as HTMLButtonElement);
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (selectedDestination) itemHover(false, e.currentTarget as HTMLButtonElement);
                                                    }}>
                                                <p style={{
                                                    fontSize: "0.82rem",
                                                    color: !selectedDestination ? "#22d3ee" : "rgba(255,255,255,0.8)",
                                                    fontWeight: !selectedDestination ? 600 : 400
                                                }}>All Destinations</p>
                                                <p style={{
                                                    fontSize: "0.58rem",
                                                    color: "rgba(255,255,255,0.3)",
                                                    marginTop: "2px"
                                                }}>Show full carousel</p>
                                            </button>
                                            {selectedRegion?.places.map(dest => (
                                                <button key={dest.name} onClick={() => handleDestinationSelect(dest)}
                                                        style={{
                                                            width: "100%",
                                                            textAlign: "left",
                                                            padding: "11px 16px",
                                                            background: selectedDestination?.name === dest.name ? "rgba(34,211,238,0.1)" : "transparent",
                                                            border: "none",
                                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                                            cursor: "pointer",
                                                            transition: "background 0.15s"
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (selectedDestination?.name !== dest.name) itemHover(true, e.currentTarget as HTMLButtonElement);
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (selectedDestination?.name !== dest.name) itemHover(false, e.currentTarget as HTMLButtonElement);
                                                        }}>
                                                    <p style={{
                                                        fontSize: "0.82rem",
                                                        color: selectedDestination?.name === dest.name ? "#22d3ee" : "rgba(255,255,255,0.8)",
                                                        fontWeight: selectedDestination?.name === dest.name ? 600 : 400
                                                    }}>{dest.name.split("(")[0].trim()}</p>
                                                    <p style={{
                                                        fontSize: "0.58rem",
                                                        letterSpacing: "0.15em",
                                                        textTransform: "uppercase",
                                                        color: "rgba(255,255,255,0.3)",
                                                        marginTop: "2px"
                                                    }}>{dest.type} · {dest.bestTime}</p>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <motion.button onClick={handleExplore} disabled={!selectedRegion}
                                       whileHover={selectedRegion ? {scale: 1.015} : {}}
                                       whileTap={selectedRegion ? {scale: 0.97} : {}}
                                       style={{
                                           width: "100%",
                                           height: "48px",
                                           background: selectedRegion ? "#22d3ee" : "rgba(255,255,255,0.05)",
                                           border: selectedRegion ? "none" : "1px solid rgba(255,255,255,0.08)",
                                           borderRadius: R,
                                           cursor: selectedRegion ? "pointer" : "not-allowed",
                                           color: selectedRegion ? "#050816" : "rgba(255,255,255,0.22)",
                                           fontSize: "0.72rem",
                                           fontWeight: 700,
                                           letterSpacing: "0.2em",
                                           textTransform: "uppercase",
                                           transition: "background 0.3s, color 0.3s",
                                           display: "flex",
                                           alignItems: "center",
                                           justifyContent: "center",
                                           gap: "8px"
                                       }}>
                            {selectedRegion ? <><span>Explore {selectedRegion.name}</span><span
                                style={{fontSize: "1rem"}}>→</span></> : "Select a state to explore"}
                        </motion.button>
                    </div>
                </div>

                <motion.div key={selectedRegion?.name ?? selectedCountry.code} initial={{opacity: 0, x: -16}}
                            animate={{opacity: 1, x: 0}} transition={{duration: 0.4}}
                            style={{display: "flex", alignItems: "center", gap: "14px"}}>
                    <div style={{width: "40px", height: "1px", background: "rgba(34,211,238,0.4)"}}/>
                    <p style={{fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", fontStyle: "italic"}}>
                        {selectedRegion ? selectedRegion.tagline : selectedCountry.available ? `Select a ${selectedCountry.regionLabel.toLowerCase()} to explore its destinations` : selectedCountry.comingSoonText}
                    </p>
                </motion.div>
            </div>

            <div style={{padding: "0 48px 80px"}}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    marginBottom: "20px",
                    pointerEvents: (countryOpen || regionOpen || destOpen) ? "none" : "auto"
                }}>
                    {visibleCards.map((region) => (
                        <CardItem key={region.name} region={region} isSelected={cardRegion?.name === region.name}
                                  available={selectedCountry.available}
                                  onClick={() => {
                                      setCardRegion(region);
                                      handleRegionSelect(region);
                                      const stateSlug = toSlug(region.name);
                                      showCover();
                                      navigate(`/${selectedCountry.code.toLowerCase()}/${stateSlug}`);
                                  }}/>
                    ))}
                </div>
                {remainingCount > 0 && (
                    <p style={{
                        marginTop: "12px",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.22)"
                    }}>
                        + {remainingCount} more {selectedCountry.regionLabel}s in the dropdown above
                    </p>
                )}
            </div>

            <div style={{
                margin: "0 48px",
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)"
            }}/>
        </section>
    );
};

export default StateExplorer;