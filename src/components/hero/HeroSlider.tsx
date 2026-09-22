import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useMousePosition from "../../hook/useMousePosition.ts";
import varanasi from "../../assets/destinations/ghat_benaras.avif";

interface Props {
    onInterest: () => void;
}

// ── Tricolor — slightly darkened so all 3 read on any background ─────────────
// Saffron darkened to #E8820C (original #FF9933 disappears on orange sky)
// White replaced with #F0EEE8 (warm off-white, still reads "white" but not invisible)
// Green kept as #138808 but darkened slightly to #0D7A06
const SAFFRON = "#E8820C";
const WHITE = "#F5F5F0";
const GREEN = "#0D7A06";

const tricolor: React.CSSProperties = {
    background: `linear-gradient(to right,
        ${SAFFRON} 0%, ${SAFFRON} 33.33%,
        ${WHITE}   33.33%, ${WHITE} 66.66%,
        ${GREEN}   66.66%, ${GREEN} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "inline-block",
    width: "100%",
    filter: "drop-shadow(0 2px 8px rgba(0,0,0,1)) drop-shadow(0 0px 2px rgba(0,0,0,1))",
};

const HeroSlider = ({ onInterest }: Props) => {
    const { x, y } = useMousePosition();

    return (
        <section style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            flexShrink: 0,
        }}>

            {/* ── Image — dramatic zoom pulse + drift ────────────────── */}
            {/*
                Strategy: two layered animations
                1. A strong zoom-in (1 → 1.12) over 12s, then snap back and repeat
                   — feels like the camera is breathing in
                2. Simultaneous left-right drift
                3. Mouse parallax on top
                All on the compositor via willChange:transform — zero layout cost
            */}
            <motion.div
                className="absolute inset-0 gpu"
                animate={{
                    scale: [1, 1.12, 1.06, 1.14, 1],
                    x: [0, -24, 14, -18, 0],
                    y: [0, -16, -28, -10, 0],
                    rotate: [0, 0.6, -0.4, 0.7, 0],
                }}
                transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],   // strong ease — fast out, slow in
                    times: [0, 0.35, 0.6, 0.82, 1],
                }}
                style={{
                    x: x * 20,
                    y: y * 20,
                    willChange: "transform",
                    transformOrigin: "60% 55%",  // zoom towards the ghat area
                }}
            >
                <img
                    src={varanasi}
                    alt="Varanasi ghats at golden hour"
                    loading="eager"
                    fetchPriority="high"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(1.08) saturate(1.12) contrast(1.04)",
                    }}
                />
            </motion.div>

            {/* ── Overlays ───────────────────────────────────────────── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                boxShadow: "inset 0 0 140px rgba(5,8,22,0.5)",
            }} />
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "20%", zIndex: 3, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(5,8,22,0.4) 0%, transparent 100%)",
            }} />
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "22%", zIndex: 3, pointerEvents: "none",
                background: "linear-gradient(to top, #050816 0%, rgba(5,8,22,0.6) 50%, transparent 100%)",
            }} />

            {/* ── Hero copy — bottom left ────────────────────────────── */}
            <div style={{
                position: "absolute",
                bottom: "11%",
                left: "48px",
                zIndex: 10,
                maxWidth: "580px",
            }}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        letterSpacing: "0.6em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.92)",
                        marginBottom: "14px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8), 0 2px 12px rgba(0,0,0,0.6)",
                    }}
                >
                    India · The Eternal Journey
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{
                        fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.75)",
                        marginBottom: "28px",
                        textShadow: "0 1px 6px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)",
                        maxWidth: "480px",
                    }}
                >
                    Every ghat, every forest, every desert, every backwater —
                    curated moments across 36 states and union territories of Incredible India.
                </motion.p>
            </div>

            {/* ── Scroll indicator ──────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                style={{
                    position: "absolute",
                    bottom: "3%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <span style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}>
                    Scroll
                </span>

                {/* Three staggered chevrons */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                    {[0, 1, 2].map((i) => (
                        <motion.svg
                            key={i}
                            width="16" height="9"
                            viewBox="0 0 16 9"
                            fill="none"
                            animate={{ opacity: [0.15, 0.85, 0.15], y: [0, 3, 0] }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        >
                            <path
                                d="M1 1L8 8L15 1"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSlider;