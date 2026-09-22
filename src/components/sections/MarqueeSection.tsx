import { motion } from "framer-motion";

const row1 = ["VARANASI", "KERALA", "RAJASTHAN", "SIKKIM", "GOA", "LADAKH", "MEGHALAYA", "HAMPI", "COORG", "ARUNACHAL", "ANDAMANS", "SPITI"];
const row2 = ["KASHMIR", "OOTY", "MUNNAR", "JAISALMER", "KAZIRANGA", "TAWANG", "DAWKI", "PALOLEM", "ZIRO", "PANGONG", "HAMPI", "ORCHHA"];

const MarqueeSection = () => {
    return (
        <section style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "28px 0" }}>

            {/* Row 1 — left to right */}
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                style={{ display: "flex", minWidth: "max-content", gap: "0", marginBottom: "10px" }}
            >
                {[...row1, ...row1].map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 900,
                            letterSpacing: "0.38em",
                            color: "rgba(255,255,255,0.14)",
                            textTransform: "uppercase",
                            userSelect: "none",
                            padding: "0 32px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {item}
                        <span style={{ color: "rgba(255,255,255,0.07)", marginLeft: "32px" }}>·</span>
                    </span>
                ))}
            </motion.div>

            {/* Row 2 — right to left */}
            <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
                style={{ display: "flex", minWidth: "max-content", gap: "0" }}
            >
                {[...row2, ...row2].map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 900,
                            letterSpacing: "0.38em",
                            color: "rgba(255,255,255,0.08)",
                            textTransform: "uppercase",
                            userSelect: "none",
                            padding: "0 32px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {item}
                        <span style={{ color: "rgba(255,255,255,0.05)", marginLeft: "32px" }}>·</span>
                    </span>
                ))}
            </motion.div>
        </section>
    );
};

export default MarqueeSection;