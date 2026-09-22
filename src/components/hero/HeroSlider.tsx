import { motion } from "framer-motion";
import useMousePosition from "../../hook/useMousePosition.ts";
import MagneticButton from "../ui/MagneticButton";

// Varanasi placeholder — swap this import when you have the real Ganga Aarti image:
// import varanasi from "../../assets/destinations/varanasi_ghats.avif";
import varanasi from "../../assets/destinations/benaras_5.avif";

interface Props {
    onInterest: () => void;
}

const HeroSlider = ({ onInterest }: Props) => {
    const { x, y } = useMousePosition();

    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* ── Parallax image layer ───────────────────────────────────────── */}
            <motion.div
                className="absolute inset-0 gpu"
                animate={{
                    scale: [1, 1.008, 1],
                    x: [0, -12, 0],
                    y: [-50, -100, -50],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    x: x * 18,
                    y: y * 18,
                }}
            >
                <img
                    src={varanasi}
                    alt="Varanasi — Kashi, the eternal city on the Ganges"
                    loading="eager"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center gpu"
                />
            </motion.div>

            {/* ── Gradient layers (identical to original) ───────────────────── */}
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

            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-black/20" />

            {/* ── Hero copy — cinematic entrance, no destination name ────────── */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">

                {/* Eyebrow — fades in first */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                    className="mb-6 text-xs uppercase tracking-[0.65em] text-white/55 md:text-sm"
                >
                    India • The Eternal Journey
                </motion.p>

                {/* Brand name — the centrepiece */}
                <motion.h1
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-[5.5rem] font-black leading-none tracking-[-0.04em] text-[#f8f8f8]/90 md:text-[10rem] lg:text-[14rem]"
                >
                    
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
                    className="mt-5 text-sm tracking-[0.4em] text-white/40 uppercase md:text-base"
                >
                    Memories of India
                </motion.p>

                {/* Descriptor line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                    className="mt-8 max-w-xl text-sm leading-relaxed text-white/50 md:text-base"
                >
                    Every ghats, every forest, every desert, every backwater —
                    curated moments across 36 states and union territories of Incredible India.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                    className="mt-10"
                >
                    <MagneticButton onClick={onInterest}>
                        Begin Your Journey
                    </MagneticButton>
                </motion.div>
            </div>

            {/* ── Scroll indicator ──────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent"
                />
            </motion.div>

            {/* ── Ambient edge vignette ─────────────────────────────────────── */}
            <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_120px_rgba(5,8,22,0.6)]" />
        </section>
    );
};

export default HeroSlider;