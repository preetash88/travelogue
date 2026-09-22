import { motion } from "framer-motion";
import useMousePosition from "../../hook/useMousePosition.ts";
import MagneticButton from "../ui/MagneticButton";
import varanasi from "../../assets/destinations/ghat_benaras.avif";

interface Props {
    onInterest: () => void;
}

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

            {/* ── Parallax image ─────────────────────────────────────── */}
            <motion.div
                className="absolute inset-0 gpu"
                animate={{ scale: [1, 1.006, 1], x: [0, -10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                style={{ x: x * 14, y: y * 14 }}
            >
                <img
                    src={varanasi}
                    alt="Varanasi ghats at golden hour"
                    loading="eager"
                    fetchPriority="high"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
            </motion.div>

            {/* ── Overlays — minimal, keep image bright ─────────────── */}
            {/* Thin vignette on all edges */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                boxShadow: "inset 0 0 120px rgba(5,8,22,0.45)",
            }} />

            {/* Top fade — just enough for navbar legibility */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "20%", zIndex: 3, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(5,8,22,0.35) 0%, transparent 100%)",
            }} />

            {/* Bottom fade — seamless merge into dark background */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "22%", zIndex: 3, pointerEvents: "none",
                background: "linear-gradient(to top, #050816 0%, rgba(5,8,22,0.6) 50%, transparent 100%)",
            }} />

            {/* ── Hero copy — bottom left ────────────────────────────── */}
            <div style={{
                position: "absolute",
                bottom: "11%",          /* sits above the bottom fade */
                left: "48px",
                zIndex: 10,
                maxWidth: "600px",
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
                        color: "rgb(255, 255, 255)",
                        marginBottom: "14px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
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
                        color: "rgb(255, 255, 255)",
                        marginBottom: "28px",
                        textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                        maxWidth: "480px",
                    }}
                >
                    Every ghat, every forest, every desert, every backwater —
                    curated moments across 36 states and union territories of Incredible India.
                </motion.p>

                {/* <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    <MagneticButton onClick={onInterest}>
                        Begin Your Journey
                    </MagneticButton>
                </motion.div> */}
            </div>

            {/* ── Scroll indicator — anchored just above bottom fade ─── */}
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
                    gap: "6px",
                }}
            >
                <span style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}>
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        width: "1px",
                        height: "28px",
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                    }}
                />
            </motion.div>
        </section>
    );
};

export default HeroSlider;