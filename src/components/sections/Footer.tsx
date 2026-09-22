interface Props {
    onContactClick: () => void;
}

const Footer = ({ onContactClick }: Props) => {
    return (
        <footer style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "56px 48px 40px",
        }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

                {/* Top row */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "48px",
                    marginBottom: "48px",
                }}>

                    {/* Brand */}
                    <div>
                        <div style={{ marginBottom: "16px" }}>
                            <span style={{
                                fontFamily: "'Pacifico', cursive",
                                fontSize: "1.7rem",
                                WebkitTextStroke: "0.5px white",
                                color: "white",
                                display: "block",
                                lineHeight: 1,
                                letterSpacing: "0.02em",
                            }}>
                                lamhe
                            </span>
                            <span style={{
                                display: "block",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.5rem",
                                letterSpacing: "0.48em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.35)",
                                marginTop: "5px",
                            }}>
                                Memories of India
                            </span>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.7 }}>
                            Curated travel experiences across every state and union territory of Incredible India.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{ fontSize: "0.55rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "20px", fontWeight: 600 }}>
                            Get In Touch
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {[
                                { label: "hello@lamhe.in", href: "mailto:hello@lamhe.in" },
                                { label: "+91 99999 99999", href: "tel:+919999999999" },
                                { label: "WhatsApp Us", href: "https://wa.me/919999999999" },
                            ].map((l) => (
                                <a key={l.label} href={l.href}
                                    target={l.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.48)", textDecoration: "none", transition: "color 0.2s" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <p style={{ fontSize: "0.55rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "20px", fontWeight: 600 }}>
                            Follow the Journey
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                            {["Instagram", "YouTube", "Twitter / X"].map((s) => (
                                <button key={s}
                                    style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.48)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, transition: "color 0.2s" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onContactClick}
                            style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#22d3ee")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                        >
                            Plan My Trip →
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                }}>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
                        © 2026 Lamhe. All Rights Reserved.
                    </p>
                    <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.14)" }}>
                        Crafted with love for Incredible India 🇮🇳
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;