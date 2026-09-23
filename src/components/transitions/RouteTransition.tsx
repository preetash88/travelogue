/**
 * RouteTransition.tsx
 *
 * Architecture fix: the Provider must be an ANCESTOR of RouteGate,
 * not a sibling. We export TransitionProvider to wrap everything in App,
 * and useTransitionReady for RouteGate to consume it.
 *
 * App.tsx structure:
 *   <TransitionProvider>       ← provides context
 *     <RouteTransition />      ← drives the curtain + sets context
 *     <RouteGate>              ← reads context, hides/shows content
 *       <main>...</main>
 *     </RouteGate>
 *   </TransitionProvider>
 */
import {
    useLayoutEffect, useRef, useState,
    createContext, useContext, type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { uniqueIndiaStates } from "../../utils/travelData";
import varanasi from "../../assets/destinations/ghat_benaras.avif";
import { showCover, hideCover } from "../../utils/routeBlock";

declare global {
    interface Window { __lenis?: { scrollTo: (n: number, o?: object) => void }; }
}

// ── Slug + content helpers ────────────────────────────────────────────────────
const toSlug = (n: string) =>
    n.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const stateImageBySlug: Record<string, string> = Object.fromEntries(
    uniqueIndiaStates.map(s => [toSlug(s.state), s.places[0]?.image ?? varanasi])
);

interface Content { eyebrow: string; heading: string; image: string; }

function getContent(pathname: string): Content {
    const parts = pathname.split("/").filter(Boolean);
    if (!parts.length || pathname === "/")
        return { eyebrow: "Returning to", heading: "Home", image: varanasi };
    if (parts[0] === "in" && parts[1]) {
        const ss = parts[1], ds = parts[2];
        const img = stateImageBySlug[ss] ?? varanasi;
        const sName = ss.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
        if (ds) {
            const dName = ds.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
            const state = uniqueIndiaStates.find(s => toSlug(s.state) === ss);
            const place = state?.places.find(p => toSlug(p.name) === ds);
            return { eyebrow: "Heading to", heading: dName, image: place?.image ?? img };
        }
        return { eyebrow: "Exploring", heading: sName, image: img };
    }
    const last = parts[parts.length - 1];
    return { eyebrow: "Loading", heading: last.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "), image: varanasi };
}

// ── Context ───────────────────────────────────────────────────────────────────
interface Ctx { ready: boolean; }
const TransitionContext = createContext<Ctx>({ ready: true });

// ── TransitionProvider — must be ancestor of BOTH RouteTransition + RouteGate ─
interface ProviderProps { children: ReactNode; }

export const TransitionProvider = ({ children }: ProviderProps) => {
    const location = useLocation();
    const [ready, setReady] = useState(true);
    const [phase, setPhase] = useState<"idle" | "hold" | "out">("idle");
    const [content, setContent] = useState<Content>({
        eyebrow: "Loading", heading: "destinations", image: varanasi,
    });
    const prevPath = useRef<string | null>(null);

    useLayoutEffect(() => {
        // Skip first mount
        if (prevPath.current === null) { prevPath.current = location.pathname; return; }
        if (prevPath.current === location.pathname) return;
        prevPath.current = location.pathname;

        // Going home — no curtain
        if (location.pathname === "/") {
            if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
            else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
            return;
        }

        // ── Cover is already up (showCover called in handleExplore) ──────────
        // useLayoutEffect fires before paint — hide the gate before browser draws
        setReady(false);
        setContent(getContent(location.pathname));
        setPhase("hold");

        // Reset scroll while hidden
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

        // React curtain now renders. After 2 frames it's painted → remove raw cover
        requestAnimationFrame(() => requestAnimationFrame(() => hideCover()));

        const tOut  = setTimeout(() => { setReady(true); setPhase("out"); }, 950);
        const tIdle = setTimeout(() => setPhase("idle"), 1750);
        return () => { clearTimeout(tOut); clearTimeout(tIdle); hideCover(); };
    }, [location.pathname]);

    return (
        <TransitionContext.Provider value={{ ready }}>
            {children}

            {/* Curtain lives inside the Provider so it can read context if needed */}
            <AnimatePresence>
                {phase !== "idle" && (
                    <motion.div
                        key="curtain"
                        initial={{ y: "0%" }}
                        animate={phase === "hold"
                            ? { y: "0%",    transition: { duration: 0 } }
                            : { y: "-100%", transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }
                        }
                        style={{
                            position: "fixed", inset: 0,
                            zIndex: 999998,
                            pointerEvents: "all",
                            overflow: "hidden",
                        }}
                    >
                        <motion.img
                            key={content.image}
                            src={content.image}
                            alt=""
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{
                                position: "absolute", inset: 0,
                                width: "100%", height: "100%",
                                objectFit: "cover", objectPosition: "center",
                                filter: "blur(6px) brightness(0.55) saturate(0.9)",
                                transform: "scale(1.08)",
                            }}
                        />
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to top, rgba(5,8,22,0.75) 0%, rgba(5,8,22,0.2) 50%, rgba(5,8,22,0.6) 100%)",
                        }} />
                        <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: "16px",
                        }}>
                            <motion.p
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                style={{ fontFamily: "'Pacifico', cursive", fontSize: "2.2rem", color: "rgba(255,255,255,0.9)", WebkitTextStroke: "0.5px white", margin: 0, lineHeight: 1 }}
                            >lamhe</motion.p>
                            <motion.div
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                                transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
                                style={{ width: "32px", height: "1px", background: "rgba(34,211,238,0.55)" }}
                            />
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.32 }}
                                style={{ fontSize: "0.52rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", margin: 0 }}
                            >{content.eyebrow}</motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.38 }}
                                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "white", margin: 0, textAlign: "center", maxWidth: "480px", lineHeight: 1.15 }}
                            >{content.heading}</motion.p>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.48 }}
                                style={{ display: "flex", gap: "7px", marginTop: "4px" }}
                            >
                                {[0, 1, 2].map(i => (
                                    <motion.span key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                                        style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#22d3ee", display: "block" }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
};

// ── RouteGate — reads context, hides content while transition is active ────────
export const RouteGate = ({ children }: { children: ReactNode }) => {
    const { ready } = useContext(TransitionContext);
    return (
        <div style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}>
            {children}
        </div>
    );
};

// ── RouteTransition — kept as a no-op default export so existing imports work ─
const RouteTransition = () => null;
export default RouteTransition;
