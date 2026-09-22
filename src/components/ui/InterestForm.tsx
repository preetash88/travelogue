import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    prefilledPlace?: string;
    prefilledState?: string;
}

const WHATSAPP_NUMBER = "919999999999";
const EMAIL_TO = "hello@lamhe.in";

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "13px 18px",
    fontSize: "0.85rem",
    color: "white",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.58rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.35)",
    marginBottom: "8px",
    fontWeight: 600,
};

const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column" as const,
};

const InterestForm = ({ open, onClose, prefilledPlace = "", prefilledState = "" }: Props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        destination: prefilledPlace ? `${prefilledPlace}, ${prefilledState}` : "",
        travelDate: "",
        groupSize: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    const handleClose = () => {
        setSubmitted(false);
        setLoading(false);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const destination = prefilledPlace ? `${prefilledPlace}, ${prefilledState}` : form.destination;
        const subject = encodeURIComponent(`Lamhe Travel Interest — ${destination || "India"}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDestination: ${destination}\nTravel Date: ${form.travelDate}\nGroup Size: ${form.groupSize}\n\nMessage:\n${form.message}`
        );
        window.open(`mailto:${EMAIL_TO}?subject=${subject}&body=${body}`, "_blank");
        setLoading(false);
        setSubmitted(true);
    };

    const destination = prefilledPlace ? `${prefilledPlace}, ${prefilledState}` : form.destination;

    // focused border helper
    const dynInput = (name: string): React.CSSProperties => ({
        ...inputStyle,
        borderColor: focused === name ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)",
    });

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 99998,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(5,8,22,0.82)",
                        backdropFilter: "blur(18px)",
                        padding: "16px",
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.94, opacity: 0, y: 32 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.94, opacity: 0, y: 32 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "660px",
                            maxHeight: "92vh",
                            overflowY: "auto",
                            background: "rgba(12,16,32,0.96)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "28px",
                            boxShadow: "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                        }}
                    >
                        {/* ── Close ──────────────────────────────────────────── */}
                        <button
                            onClick={handleClose}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                zIndex: 10,
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "rgba(255,255,255,0.5)",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                            }}
                        >
                            <X size={15} />
                        </button>

                        <div style={{ padding: "40px 40px 36px" }}>
                            {!submitted ? (
                                <>
                                    {/* ── Header ─────────────────────────────── */}
                                    <p style={{
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.55em",
                                        textTransform: "uppercase",
                                        color: "#22d3ee",
                                        marginBottom: "14px",
                                        fontWeight: 600,
                                    }}>
                                        Show Interest
                                    </p>

                                    <div style={{ marginBottom: "8px", lineHeight: 1 }}>
                                        <span style={{
                                            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.02em",
                                            color: "white",
                                            display: "block",
                                        }}>
                                            Plan Your
                                        </span>
                                        <span style={{
                                            fontFamily: "'Pacifico', cursive",
                                            fontSize: "clamp(1.6rem, 4.5vw, 2.5rem)",
                                            WebkitTextStroke: "0.4px white",
                                            color: "white",
                                            display: "block",
                                            lineHeight: 1.3,
                                        }}>
                                            lamhe
                                        </span>
                                    </div>

                                    <p style={{
                                        fontSize: "0.82rem",
                                        color: "rgba(255,255,255,0.4)",
                                        marginBottom: "32px",
                                        lineHeight: 1.6,
                                    }}>
                                        Fill in your details — our team will reach out within 24 hours.
                                    </p>

                                    {/* ── Form ───────────────────────────────── */}
                                    <form onSubmit={handleSubmit}>
                                        {/* Row 1 */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Your Name *</label>
                                                <input
                                                    required
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="Preetam Sahu"
                                                    style={dynInput("name")}
                                                    onFocus={() => setFocused("name")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Email Address *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="you@email.com"
                                                    style={dynInput("email")}
                                                    onFocus={() => setFocused("email")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2 */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Phone / WhatsApp *</label>
                                                <input
                                                    required
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    style={dynInput("phone")}
                                                    onFocus={() => setFocused("phone")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Group Size</label>
                                                <select
                                                    name="groupSize"
                                                    value={form.groupSize}
                                                    onChange={handleChange}
                                                    style={{ ...dynInput("groupSize"), cursor: "pointer" }}
                                                    onFocus={() => setFocused("groupSize")}
                                                    onBlur={() => setFocused(null)}
                                                >
                                                    <option value="" style={{ background: "#0c1020" }}>Select size</option>
                                                    <option value="Solo" style={{ background: "#0c1020" }}>Solo (1)</option>
                                                    <option value="Couple" style={{ background: "#0c1020" }}>Couple (2)</option>
                                                    <option value="Small Group (3-5)" style={{ background: "#0c1020" }}>Small Group (3–5)</option>
                                                    <option value="Group (6-10)" style={{ background: "#0c1020" }}>Group (6–10)</option>
                                                    <option value="Large Group (10+)" style={{ background: "#0c1020" }}>Large Group (10+)</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Row 3 */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Destination of Interest</label>
                                                <input
                                                    name="destination"
                                                    value={prefilledPlace ? destination : form.destination}
                                                    onChange={handleChange}
                                                    placeholder="Varanasi, Uttar Pradesh"
                                                    style={dynInput("destination")}
                                                    onFocus={() => setFocused("destination")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                            <div style={fieldStyle}>
                                                <label style={labelStyle}>Preferred Travel Month</label>
                                                <input
                                                    name="travelDate"
                                                    value={form.travelDate}
                                                    onChange={handleChange}
                                                    placeholder="e.g. October 2025"
                                                    style={dynInput("travelDate")}
                                                    onFocus={() => setFocused("travelDate")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div style={{ ...fieldStyle, marginBottom: "24px" }}>
                                            <label style={labelStyle}>Anything else you'd like us to know?</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={3}
                                                placeholder="Special requirements, budget range, occasion..."
                                                style={{
                                                    ...dynInput("message"),
                                                    resize: "none",
                                                    lineHeight: 1.6,
                                                    borderColor: focused === "message" ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)",
                                                }}
                                                onFocus={() => setFocused("message")}
                                                onBlur={() => setFocused(null)}
                                            />
                                        </div>

                                        {/* ── CTA row ────────────────────────── */}
                                        <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
                                            <motion.button
                                                type="submit"
                                                disabled={loading}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                style={{
                                                    flex: 1,
                                                    background: "#22d3ee",
                                                    color: "#050816",
                                                    border: "none",
                                                    borderRadius: "50px",
                                                    padding: "15px 24px",
                                                    fontWeight: 700,
                                                    fontSize: "0.82rem",
                                                    letterSpacing: "0.04em",
                                                    cursor: "pointer",
                                                    opacity: loading ? 0.6 : 1,
                                                    transition: "opacity 0.2s",
                                                }}
                                            >
                                                {loading ? "Sending..." : "Send My Interest →"}
                                            </motion.button>

                                            <motion.a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in a trip to ${destination || "India"} through Lamhe.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1px solid rgba(255,255,255,0.12)",
                                                    borderRadius: "50px",
                                                    padding: "15px 22px",
                                                    fontSize: "0.82rem",
                                                    fontWeight: 600,
                                                    color: "rgba(255,255,255,0.75)",
                                                    textDecoration: "none",
                                                    whiteSpace: "nowrap",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                💬 WhatsApp
                                            </motion.a>
                                        </div>

                                        {/* Call line */}
                                        <p style={{
                                            textAlign: "center",
                                            fontSize: "0.62rem",
                                            color: "rgba(255,255,255,0.25)",
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            marginTop: "16px",
                                        }}>
                                            Or call us at{" "}
                                            <a href="tel:+919999999999" style={{ color: "rgba(34,211,238,0.65)", textDecoration: "none" }}>
                                                +91 99999 99999
                                            </a>
                                        </p>
                                    </form>
                                </>
                            ) : (
                                /* ── Success state ─────────────────────────── */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: "center", padding: "48px 0" }}
                                >
                                    <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>🙏</div>
                                    <h3 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "12px" }}>
                                        Namaste!
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", maxWidth: "380px", margin: "0 auto", lineHeight: 1.7 }}>
                                        Thank you, <strong style={{ color: "white" }}>{form.name}</strong>. Our team will
                                        reach out to you at{" "}
                                        <strong style={{ color: "#22d3ee" }}>{form.phone || form.email}</strong> within 24 hours
                                        to curate your perfect Lamhe.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={handleClose}
                                        style={{
                                            marginTop: "32px",
                                            background: "rgba(255,255,255,0.07)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: "50px",
                                            padding: "14px 36px",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.3em",
                                            textTransform: "uppercase",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Continue Exploring
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InterestForm;