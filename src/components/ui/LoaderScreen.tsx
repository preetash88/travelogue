import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050816]"
                >
                    {/* ── Large teal orb sweeping left → right ── */}
                    <motion.div
                        initial={{ x: "-110vw", opacity: 0.9 }}
                        animate={{ x: "110vw", opacity: 0.7 }}
                        transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            width: "55vw",
                            height: "55vw",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(6,182,212,0.10) 45%, transparent 70%)",
                            filter: "blur(60px)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* ── Tighter trailing glow ── */}
                    <motion.div
                        initial={{ x: "-110vw", opacity: 0 }}
                        animate={{ x: "110vw", opacity: 0.5 }}
                        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            width: "30vw",
                            height: "30vw",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(103,232,249,0.28) 0%, transparent 65%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* ── Thin horizontal light ray ── */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: [0, 0.6, 0] }}
                        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            right: 0,
                            height: "1px",
                            transformOrigin: "left",
                            background: "linear-gradient(to right, transparent, rgba(34,211,238,0.8) 40%, rgba(103,232,249,1) 55%, rgba(34,211,238,0.6) 70%, transparent)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* ── Logo + tagline ── */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                            <span
                                className="navbar-brand text-gray-200"
                                style={{ fontSize: "7rem" }}
                            >
                                lamhe
                            </span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9, delay: 0.55 }}
                            className="navbar-sub mt-2 text-white/50"
                            style={{ letterSpacing: "0.48em", fontSize: "0.85rem" }}
                        >
                            Moments that Matter
                        </motion.p>

                        {/* ── Teal progress bar ── */}
                        <div
                            style={{
                                position: "relative",
                                margin: "28px auto 0",
                                width: "200px",
                                height: "2px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,0.08)",
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    transformOrigin: "left",
                                    background: "linear-gradient(to right, #06b6d4, #22d3ee, #67e8f9)",
                                    borderRadius: "999px",
                                    boxShadow: "0 0 12px rgba(34,211,238,0.8)",
                                }}
                            />
                        </div>
                    </div>

                    {/* ── Faint teal vignette at the bottom ── */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "35%",
                            background: "linear-gradient(to top, rgba(6,182,212,0.06), transparent)",
                            pointerEvents: "none",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderScreen;