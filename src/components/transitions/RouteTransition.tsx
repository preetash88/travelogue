import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { uniqueIndiaStates } from "../../utils/travelData";
import varanasi from "../../assets/destinations/ghat_benaras.avif";

declare global { interface Window { __lenis?: { scrollTo: (n: number, o?: object) => void } } }

// ── Build slug → state image map once at module level ────────────────────────
const toSlug = (name: string) =>
    name.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const stateImageBySlug: Record<string, string> = Object.fromEntries(
    uniqueIndiaStates.map(s => [toSlug(s.state), s.places[0]?.image ?? varanasi])
);

// ── Transition content derived from the route ─────────────────────────────────
interface TransitionContent {
    eyebrow: string;   // small label above
    heading: string;   // main readable name
    image: string;     // background image
}

function getContent(pathname: string): TransitionContent {
    const parts = pathname.split("/").filter(Boolean);

    // "/" or unknown → home
    if (parts.length === 0 || pathname === "/") {
        return { eyebrow: "Returning to", heading: "Home", image: varanasi };
    }

    // "/in/:stateSlug" or "/in/:stateSlug/:destSlug"
    if (parts[0] === "in" && parts[1]) {
        const stateSlug = parts[1];
        const destSlug  = parts[2];
        const img       = stateImageBySlug[stateSlug] ?? varanasi;

        // State name from slug
        const stateName = stateSlug
            .split("-")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

        if (destSlug) {
            // Destination deep-link
            const destName = destSlug
                .split("-")
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ");
            // Use the specific place image if we can find it
            const state = uniqueIndiaStates.find(s => toSlug(s.state) === stateSlug);
            const place = state?.places.find(p => toSlug(p.name) === destSlug);
            return {
                eyebrow: "Heading to",
                heading: destName,
                image: place?.image ?? img,
            };
        }

        return { eyebrow: "Exploring", heading: stateName, image: img };
    }

    // Fallback
    const lastSlug = parts[parts.length - 1];
    const name = lastSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return { eyebrow: "Loading", heading: name, image: varanasi };
}

// ── Component ─────────────────────────────────────────────────────────────────
const RouteTransition = () => {
    const location = useLocation();
    const [phase, setPhase] = useState<"idle" | "in" | "hold" | "out">("idle");
    const [content, setContent] = useState<TransitionContent>({ eyebrow: "Loading", heading: "destinations", image: varanasi });
    const prevPath = useRef<string | null>(null);

    useEffect(() => {
        if (prevPath.current === null) { prevPath.current = location.pathname; return; }
        if (prevPath.current === location.pathname) return;
        prevPath.current = location.pathname;

        setContent(getContent(location.pathname));
        setPhase("in");

        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }

        const t1 = setTimeout(() => setPhase("hold"), 50);
        const t2 = setTimeout(() => setPhase("out"),  1300);
        const t3 = setTimeout(() => setPhase("idle"), 2200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {phase !== "idle" && (
                <motion.div
                    key="curtain"
                    initial={{ y: "100%" }}
                    animate={phase === "in" || phase === "hold"
                        ? { y: "0%",    transition: { duration: 0.7,  ease: [0.65, 0, 0.35, 1] } }
                        : { y: "-100%", transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }
                    }
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 999998,
                        pointerEvents: "all",
                        overflow: "hidden",
                    }}
                >
                    {/* Background image — blurred, dark overlay */}
                    <motion.img
                        key={content.image}
                        src={content.image}
                        alt=""
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            filter: "blur(6px) brightness(0.55) saturate(0.9)",
                            transform: "scale(1.08)", // compensate blur edge bleed
                        }}
                    />

                    {/* Dark vignette on top of image */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(5,8,22,0.75) 0%, rgba(5,8,22,0.2) 50%, rgba(5,8,22,0.6) 100%)",
                    }} />

                    {/* Centred content */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                    }}>
                        {/* Brand */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.2 }}
                            style={{
                                fontFamily: "'Pacifico', cursive",
                                fontSize: "2.2rem",
                                color: "rgba(255,255,255,0.9)",
                                WebkitTextStroke: "0.5px white",
                                margin: 0,
                                lineHeight: 1,
                            }}
                        >
                            lamhe
                        </motion.p>

                        {/* Divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                            style={{ width: "32px", height: "1px", background: "rgba(34,211,238,0.55)" }}
                        />

                        {/* Eyebrow */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.35, delay: 0.38 }}
                            style={{
                                fontSize: "0.52rem",
                                letterSpacing: "0.5em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.38)",
                                margin: 0,
                            }}
                        >
                            {content.eyebrow}
                        </motion.p>

                        {/* Destination name */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.45 }}
                            style={{
                                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                color: "white",
                                margin: 0,
                                textAlign: "center",
                                maxWidth: "480px",
                                lineHeight: 1.15,
                            }}
                        >
                            {content.heading}
                        </motion.p>

                        {/* Dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.55 }}
                            style={{ display: "flex", gap: "7px", marginTop: "4px" }}
                        >
                            {[0, 1, 2].map(i => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                                    style={{
                                        width: "4px", height: "4px",
                                        borderRadius: "50%",
                                        background: "#22d3ee",
                                        display: "block",
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RouteTransition;
