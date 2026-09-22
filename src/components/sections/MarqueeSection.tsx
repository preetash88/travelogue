import { motion } from "framer-motion";
import { useState } from "react";

const row1 = [
    { name: "VARANASI",   sub: "Uttar Pradesh" },
    { name: "KERALA",     sub: "God's Own Country" },
    { name: "RAJASTHAN",  sub: "Land of Kings" },
    { name: "SIKKIM",     sub: "Himalayan Kingdom" },
    { name: "GOA",        sub: "Sun & Sea" },
    { name: "LADAKH",     sub: "The High Desert" },
    { name: "MEGHALAYA",  sub: "Abode of Clouds" },
    { name: "HAMPI",      sub: "Vijayanagara" },
    { name: "COORG",      sub: "Scotland of India" },
    { name: "ARUNACHAL",  sub: "Dawn-Lit Mountains" },
    { name: "ANDAMANS",   sub: "Coral & Turquoise" },
    { name: "SPITI",      sub: "Middle Land" },
];

const row2 = [
    { name: "KASHMIR",    sub: "Paradise on Earth" },
    { name: "OOTY",       sub: "Nilgiri Hills" },
    { name: "MUNNAR",     sub: "Tea Country" },
    { name: "JAISALMER",  sub: "Golden City" },
    { name: "KAZIRANGA",  sub: "Rhino Country" },
    { name: "TAWANG",     sub: "Buddhist Kingdom" },
    { name: "DAWKI",      sub: "Crystal River" },
    { name: "PALOLEM",    sub: "Perfect Crescent" },
    { name: "ZIRO",       sub: "Apatani Valley" },
    { name: "PANGONG",    sub: "Azure at Altitude" },
    { name: "ORCHHA",     sub: "Frozen in Time" },
    { name: "BODH GAYA",  sub: "The Enlightened" },
];

const MarqueeItem = ({ name, sub }: { name: string; sub: string }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "10px",
                padding: "0 40px",
                whiteSpace: "nowrap",
                cursor: "default",
                userSelect: "none",
                transition: "opacity 0.3s",
            }}
        >
            {/* Main destination name */}
            <span style={{
                fontSize: "1.05rem",
                fontWeight: 900,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: hovered ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.22)",
                transition: "color 0.3s ease",
            }}>
                {name}
            </span>

            {/* Sub label — only visible on hover */}
            <span style={{
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: hovered ? "rgba(34,211,238,0.75)" : "transparent",
                transition: "color 0.3s ease",
                marginBottom: "1px",
            }}>
                {sub}
            </span>

            {/* Separator dot */}
            <span style={{
                fontSize: "0.4rem",
                color: "rgba(255,255,255,0.1)",
                marginLeft: "6px",
            }}>
                ◆
            </span>
        </span>
    );
};

const MarqueeSection = () => {
    return (
        <section style={{
            overflow: "hidden",
            borderTop: "none",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0",
            position: "relative",
            marginTop: 0,
        }}>
            {/* Fade masks on left and right edges */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to right, #050816 0%, transparent 8%, transparent 92%, #050816 100%)",
            }} />

            {/* Row 1 — left to right */}
            <div style={{
                padding: "20px 0 14px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                    style={{ display: "flex", minWidth: "max-content" }}
                >
                    {[...row1, ...row1].map((item, i) => (
                        <MarqueeItem key={i} name={item.name} sub={item.sub} />
                    ))}
                </motion.div>
            </div>

            {/* Row 2 — right to left, slightly slower */}
            <div style={{ padding: "14px 0 20px" }}>
                <motion.div
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
                    style={{ display: "flex", minWidth: "max-content" }}
                >
                    {[...row2, ...row2].map((item, i) => (
                        <MarqueeItem key={i} name={item.name} sub={item.sub} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MarqueeSection;