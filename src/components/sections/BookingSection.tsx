import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
    onInterest: (place?: string, state?: string) => void;
}

const BookingSection = ({ onInterest }: Props) => {
    return (
        <section style={{ position: "relative", padding: "96px 48px", maxWidth: "100%" }}>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                style={{ maxWidth: "900px" }}
            >
                {/* Label */}
                <p className="mb-4 text-xs uppercase tracking-[0.6em] text-cyan-300">
                    Curated For You
                </p>

                {/* Heading */}
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        color: "white",
                        display: "block",
                        marginBottom: "4px",
                    }}>
                        Plan Your
                    </h2>
                    <span style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        WebkitTextStroke: "0.5px white",
                        color: "white",
                        display: "block",
                        lineHeight: 1.2,
                    }}>
                        lamhe
                    </span>
                </div>

                {/* Description */}
                <p style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.5)",
                    maxWidth: "520px",
                    marginBottom: "48px",
                }}>
                    No generic packages. No cookie-cutter tours. We handcraft every journey
                    around you — your pace, your interests, your India.
                </p>

                {/* Contact cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px",
                    maxWidth: "800px",
                }}>
                    {[
                        { icon: "✉️", title: "Email Us",  sub: "hello@lamhe.in",    cta: "Fill Interest Form →", onClick: () => onInterest() },
                        { icon: "💬", title: "WhatsApp", sub: "+91 99999 99999",   cta: "Chat Now →",           href: "https://wa.me/919999999999" },
                        { icon: "📞", title: "Call Us",   sub: "+91 99999 99999",   cta: "Talk to Us →",         href: "tel:+919999999999" },
                    ].map((card) =>
                        card.onClick
                            ? <ContactCard key={card.title} {...card} onClick={card.onClick} />
                            : <ContactCard key={card.title} {...card} href={card.href} />
                    )}
                </div>

                <p style={{ marginTop: "28px", fontSize: "0.72rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.05em" }}>
                    We respond within <strong style={{ color: "rgba(255,255,255,0.45)" }}>24 hours</strong> — usually much faster.
                </p>
            </motion.div>
        </section>
    );
};

// ── ContactCard — same hover animation as StateExplorer CardItem ──────────────
const ContactCard = ({
    icon, title, sub, cta,
    onClick, href,
}: {
    icon: string; title: string; sub: string; cta: string;
    onClick?: () => void; href?: string;
}) => {
    const [hovered, setHovered] = useState(false);

    const inner = (
        <>
            {/* Water-fill hover layer — identical to StateExplorer */}
            <motion.div
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute", inset: 0,
                    background: "rgba(34,211,238,0.09)",
                    transformOrigin: "left center",
                    borderRadius: "20px",
                    zIndex: 0,
                }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "14px" }}>{icon}</div>
                <p style={{
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: hovered ? "white" : "rgba(255,255,255,0.75)",
                    marginBottom: "4px",
                    transition: "color 0.25s",
                }}>
                    {title}
                </p>
                <p style={{
                    fontSize: "0.75rem",
                    color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                    marginBottom: "16px",
                    transition: "color 0.25s",
                }}>
                    {sub}
                </p>
                <p style={{
                    fontSize: "0.6rem",
                    letterSpacing: hovered ? "0.35em" : "0.25em",
                    textTransform: "uppercase",
                    color: hovered ? "#22d3ee" : "rgba(34,211,238,0.6)",
                    transition: "color 0.25s, letter-spacing 0.3s",
                }}>
                    {cta}
                </p>
            </div>
        </>
    );

    const baseStyle: React.CSSProperties = {
        position: "relative",
        borderRadius: "20px",
        border: `1px solid ${hovered ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.03)",
        padding: "28px",
        textAlign: "left",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        display: "block",
        overflow: "hidden",
        transition: "border-color 0.3s",
    };

    return onClick ? (
        <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={baseStyle}
        >
            {inner}
        </motion.button>
    ) : (
        <motion.a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={baseStyle}
        >
            {inner}
        </motion.a>
    );
};

export default BookingSection;
