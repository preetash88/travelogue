import { motion } from "framer-motion";
import type { IndiaPlace, IndiaState } from "../../utils/travelData";

interface Props {
    state: IndiaState;
    onExploreMore: () => void;
}

const DestinationStories = ({ state, onExploreMore }: Props) => {
    return (
        <section style={{ background: "#050816", padding: "0 0 80px" }}>

            {/* Section label */}
            <div style={{ padding: "72px 48px 0" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <p style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.55em",
                        textTransform: "uppercase",
                        color: "#22d3ee",
                        fontWeight: 600,
                        marginBottom: "12px",
                    }}>
                        {state.state} · All Destinations
                    </p>
                    <div style={{ width: "40px", height: "1px", background: "rgba(34,211,238,0.3)" }} />
                </motion.div>
            </div>

            {/* One row per destination */}
            {state.places.map((place, i) => {
                const imageLeft = i % 2 !== 0; // text-left/image-right first, then flips
                return (
                    <DestinationRow
                        key={place.name}
                        place={place}
                        index={i}
                        imageLeft={imageLeft}
                    />
                );
            })}

            {/* Explore More — scrolls to BookingSection */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "24px 48px 0",
                }}
            >
                <motion.button
                    onClick={onExploreMore}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        background: "none",
                        border: "1px solid rgba(34,211,238,0.3)",
                        borderRadius: "999px",
                        padding: "14px 28px",
                        cursor: "pointer",
                        color: "#22d3ee",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        transition: "border-color 0.25s, background 0.25s",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(34,211,238,0.08)";
                        e.currentTarget.style.borderColor = "rgba(34,211,238,0.6)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
                    }}
                >
                    Plan Your Trip
                    <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span>
                </motion.button>
            </motion.div>
        </section>
    );
};

// ── Single alternating row ────────────────────────────────────────────────────
const DestinationRow = ({
    place,
    index,
    imageLeft,
}: {
    place: IndiaPlace;
    index: number;
    imageLeft: boolean;
}) => {
    const textContent = (
        <motion.div
            initial={{ opacity: 0, x: imageLeft ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                padding: imageLeft ? "0 0 0 40px" : "0 40px 0 0",
            }}
        >
            {/* Index number */}
            <p style={{
                fontSize: "0.52rem",
                letterSpacing: "0.5em",
                textTransform: "uppercase",
                color: "rgba(34,211,238,0.5)",
                fontWeight: 600,
                margin: 0,
            }}>
                {String(index + 1).padStart(2, "0")} · {place.type}
            </p>

            {/* Destination name */}
            <h2 style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "white",
                margin: 0,
            }}>
                {place.name.split("(")[0].trim()}
            </h2>

            {/* Tagline */}
            <p style={{
                fontSize: "1rem",
                fontStyle: "italic",
                color: "rgba(34,211,238,0.65)",
                lineHeight: 1.5,
                margin: 0,
            }}>
                {place.tagline}
            </p>

            {/* Description — more detailed */}
            <p style={{
                fontSize: "0.92rem",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.52)",
                maxWidth: "480px",
                margin: 0,
            }}>
                {place.description}
            </p>

            {/* Best time chip */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
                <p style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    margin: 0,
                }}>
                    Best time · {place.bestTime}
                </p>
            </div>
        </motion.div>
    );

    const imageContent = (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            style={{ position: "relative" }}
        >
            {/* Ambient glow */}
            <div style={{
                position: "absolute",
                inset: "-24px",
                borderRadius: "50%",
                background: "rgba(34,211,238,0.06)",
                filter: "blur(40px)",
                zIndex: 0,
            }} />

            {/* Image */}
            <motion.img
                src={place.image}
                alt={place.name}
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "520px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "2.5rem",
                    display: "block",
                }}
            />

            {/* Subtle gradient on bottom of image */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                borderRadius: "0 0 2.5rem 2.5rem",
                background: "linear-gradient(to top, rgba(5,8,22,0.5), transparent)",
                zIndex: 2,
                pointerEvents: "none",
            }} />
        </motion.div>
    );

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            alignItems: "center",
            minHeight: "600px",
            padding: "48px 48px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}>
            {imageLeft ? (
                <>
                    <div style={{ order: 0 }}>{imageContent}</div>
                    <div style={{ order: 1 }}>{textContent}</div>
                </>
            ) : (
                <>
                    <div style={{ order: 0 }}>{textContent}</div>
                    <div style={{ order: 1 }}>{imageContent}</div>
                </>
            )}
        </div>
    );
};

export default DestinationStories;
