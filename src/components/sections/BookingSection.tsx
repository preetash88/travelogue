import { motion } from "framer-motion";

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
                        { icon: "✉️", title: "Email Us", sub: "hello@lamhe.in", cta: "Fill Interest Form →", onClick: () => onInterest() },
                        { icon: "💬", title: "WhatsApp", sub: "+91 99999 99999", cta: "Chat Now →", href: "https://wa.me/919999999999" },
                        { icon: "📞", title: "Call Us", sub: "+91 99999 99999", cta: "Talk to Us →", href: "tel:+919999999999" },
                    ].map((card) => {
                        const inner = (
                            <>
                                <div style={{ fontSize: "1.5rem", marginBottom: "14px" }}>{card.icon}</div>
                                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "4px" }}>
                                    {card.title}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>
                                    {card.sub}
                                </p>
                                <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(34,211,238,0.6)" }}>
                                    {card.cta}
                                </p>
                            </>
                        );

                        const cardStyle: React.CSSProperties = {
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.09)",
                            background: "rgba(255,255,255,0.03)",
                            padding: "28px",
                            textAlign: "left",
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "inherit",
                            display: "block",
                            transition: "border-color 0.3s, background 0.3s, transform 0.3s",
                        };

                        return card.onClick ? (
                            <motion.button
                                key={card.title}
                                whileHover={{ y: -5, borderColor: "rgba(34,211,238,0.3)" } as any}
                                whileTap={{ scale: 0.97 }}
                                onClick={card.onClick}
                                style={cardStyle}
                            >
                                {inner}
                            </motion.button>
                        ) : (
                            <motion.a
                                key={card.title}
                                href={card.href}
                                target={card.href?.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -5 } as any}
                                whileTap={{ scale: 0.97 }}
                                style={cardStyle}
                            >
                                {inner}
                            </motion.a>
                        );
                    })}
                </div>

                <p style={{ marginTop: "28px", fontSize: "0.72rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.05em" }}>
                    We respond within <strong style={{ color: "rgba(255,255,255,0.45)" }}>24 hours</strong> — usually much faster.
                </p>
            </motion.div>
        </section>
    );
};

export default BookingSection;