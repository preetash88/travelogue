import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    prefilledPlace?: string;
    prefilledState?: string;
}

const WHATSAPP_NUMBER = "919999999999";
const EMAIL_TO = "hello@lamhe.in";

// ── Border radius token — change once, applies everywhere ─────────────────────
const R = "14px";

// ── Country data with dial codes + phone digit rules ─────────────────────────
const COUNTRIES = [
    { code: "IN", flag: "🇮🇳", name: "India", dial: "+91", digits: 10 },
    { code: "AU", flag: "🇦🇺", name: "Australia", dial: "+61", digits: 9 },
    { code: "US", flag: "🇺🇸", name: "USA", dial: "+1", digits: 10 },
    { code: "GB", flag: "🇬🇧", name: "UK", dial: "+44", digits: 10 },
    { code: "CA", flag: "🇨🇦", name: "Canada", dial: "+1", digits: 10 },
    { code: "SG", flag: "🇸🇬", name: "Singapore", dial: "+65", digits: 8 },
    { code: "AE", flag: "🇦🇪", name: "UAE", dial: "+971", digits: 9 },
    { code: "DE", flag: "🇩🇪", name: "Germany", dial: "+49", digits: 10 },
    { code: "FR", flag: "🇫🇷", name: "France", dial: "+33", digits: 9 },
    { code: "JP", flag: "🇯🇵", name: "Japan", dial: "+81", digits: 10 },
    { code: "NZ", flag: "🇳🇿", name: "New Zealand", dial: "+64", digits: 9 },
    { code: "ZA", flag: "🇿🇦", name: "South Africa", dial: "+27", digits: 9 },
    { code: "NL", flag: "🇳🇱", name: "Netherlands", dial: "+31", digits: 9 },
    { code: "CH", flag: "🇨🇭", name: "Switzerland", dial: "+41", digits: 9 },
    { code: "IT", flag: "🇮🇹", name: "Italy", dial: "+39", digits: 10 },
    { code: "ES", flag: "🇪🇸", name: "Spain", dial: "+34", digits: 9 },
];

const GROUP_SIZES = ["Solo (1)", "Couple (2)", "Small Group (3–5)", "Group (6–10)", "Large Group (10+)"];

// ── Shared styles ─────────────────────────────────────────────────────────────
const fieldBox: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: R,
    padding: "11px 16px",
    fontSize: "0.83rem",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
};

const label: React.CSSProperties = {
    display: "block",
    fontSize: "0.55rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.32)",
    marginBottom: "6px",
    fontWeight: 600,
};

// ── Custom dropdown component ─────────────────────────────────────────────────
function CustomSelect({
    options, value, onChange, placeholder, focused, onFocus, onBlur,
}: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                onBlur();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [onBlur]);

    return (
        <div ref={ref} style={{ position: "relative" }}>
            <button
                type="button"
                onClick={() => { setOpen(!open); open ? onBlur() : onFocus(); }}
                style={{
                    ...fieldBox,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderColor: focused ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)",
                    transition: "border-color 0.2s",
                }}
            >
                <span style={{ color: value ? "white" : "rgba(255,255,255,0.28)" }}>
                    {value || placeholder}
                </span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", color: "rgba(255,255,255,0.35)", flexShrink: 0 }}
                >
                    <ChevronDown size={15} />
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: 0,
                            right: 0,
                            zIndex: 100,
                            background: "rgba(10,14,28,0.98)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: R,
                            overflow: "hidden",
                            boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                            transformOrigin: "top",
                        }}
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onChange(opt); setOpen(false); onBlur(); }}
                                style={{
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "10px 16px",
                                    fontSize: "0.82rem",
                                    color: value === opt ? "#22d3ee" : "rgba(255,255,255,0.7)",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                                    transition: "background 0.15s, color 0.15s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                            >
                                {opt}
                                {value === opt && <Check size={13} color="#22d3ee" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Country picker + phone input combo ───────────────────────────────────────
function PhoneField({
    country, onCountryChange, phone, onPhoneChange, focused, onFocus, onBlur, error,
}: {
    country: typeof COUNTRIES[0];
    onCountryChange: (c: typeof COUNTRIES[0]) => void;
    phone: string;
    onPhoneChange: (v: string) => void;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
    error: string;
}) {
    const [dialOpen, setDialOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setDialOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div>
            <label style={label}>Phone / WhatsApp *</label>
            <div
                ref={ref}
                style={{
                    display: "flex",
                    gap: "0",
                    borderRadius: R,
                    border: `1px solid ${error ? "rgba(239,68,68,0.6)" : focused ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)"}`,
                    background: "rgba(255,255,255,0.04)",
                    transition: "border-color 0.2s",
                    overflow: "visible",
                    position: "relative",
                }}
            >
                {/* Country dial button */}
                <button
                    type="button"
                    onClick={() => setDialOpen(!dialOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "11px 12px 11px 14px",
                        background: "transparent",
                        border: "none",
                        borderRight: "1px solid rgba(255,255,255,0.08)",
                        cursor: "pointer",
                        color: "white",
                        fontSize: "0.82rem",
                        flexShrink: 0,
                        borderRadius: `${R} 0 0 ${R}`,
                        whiteSpace: "nowrap",
                    }}
                >
                    <span style={{ fontSize: "1rem" }}>{country.flag}</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>{country.dial}</span>
                    <motion.span
                        animate={{ rotate: dialOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}
                    >
                        <ChevronDown size={13} />
                    </motion.span>
                </button>

                {/* Number input */}
                <input
                    type="tel"
                    value={phone}
                    onChange={e => onPhoneChange(e.target.value.replace(/\D/g, ""))}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={`${country.digits} digit number`}
                    maxLength={country.digits}
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        padding: "11px 14px",
                        fontSize: "0.83rem",
                        color: "white",
                        minWidth: 0,
                    }}
                />

                {/* Digit counter */}
                <span style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    fontSize: "0.65rem",
                    color: phone.length === country.digits
                        ? "rgba(34,211,238,0.7)"
                        : "rgba(255,255,255,0.22)",
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                }}>
                    {phone.length}/{country.digits}
                </span>

                {/* Country dropdown */}
                <AnimatePresence>
                    {dialOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            transition={{ duration: 0.18 }}
                            onWheel={(e) => e.stopPropagation()}
                            style={{
                                position: "absolute",
                                top: "calc(100% + 4px)",
                                left: 0,
                                width: "240px",
                                zIndex: 200,
                                background: "rgba(10,14,28,0.98)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: R,
                                overflow: "hidden",          // clip the rounded corners
                                maxHeight: "220px",
                                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                                transformOrigin: "top",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    overflowY: "scroll",          // force scroll track to always exist
                                    overscrollBehavior: "contain",
                                    flex: 1,
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "rgba(255,255,255,0.15) transparent",
                                }}
                                onWheel={(e) => {
                                    e.stopPropagation();          // stop the page from scrolling
                                }}
                                onTouchMove={(e) => {
                                    e.stopPropagation();          // stop trackpad swipe from hitting the overlay
                                }}
                            >
                                {COUNTRIES.map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => { onCountryChange(c); setDialOpen(false); }}
                                        style={{
                                            width: "100%",
                                            textAlign: "left",
                                            padding: "9px 14px",
                                            fontSize: "0.8rem",
                                            color: country.code === c.code ? "#22d3ee" : "rgba(255,255,255,0.7)",
                                            background: "transparent",
                                            border: "none",
                                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            transition: "background 0.15s",
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <span style={{ fontSize: "1rem", flexShrink: 0 }}>{c.flag}</span>
                                        <span style={{ flex: 1 }}>{c.name}</span>
                                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>{c.dial}</span>
                                        {country.code === c.code && <Check size={12} color="#22d3ee" />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Validation error */}
            {error && (
                <p style={{ fontSize: "0.65rem", color: "rgba(239,68,68,0.85)", marginTop: "5px", letterSpacing: "0.02em" }}>
                    {error}
                </p>
            )}
        </div>
    );
}

// ── Main form ─────────────────────────────────────────────────────────────────
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
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState("");

    const handleClose = () => { setSubmitted(false); setLoading(false); setPhoneError(""); onClose(); };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const validatePhone = () => {
        if (form.phone.length !== country.digits) {
            setPhoneError(`${country.name} numbers must be exactly ${country.digits} digits`);
            return false;
        }
        setPhoneError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePhone()) return;
        setLoading(true);
        const dest = prefilledPlace ? `${prefilledPlace}, ${prefilledState}` : form.destination;
        const fullPhone = `${country.dial} ${form.phone}`;
        const subject = encodeURIComponent(`Lamhe Travel Interest — ${dest || "India"}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${fullPhone}\nDestination: ${dest}\nTravel Date: ${form.travelDate}\nGroup Size: ${form.groupSize}\n\nMessage:\n${form.message}`
        );
        window.open(`mailto:${EMAIL_TO}?subject=${subject}&body=${body}`, "_blank");
        setLoading(false);
        setSubmitted(true);
    };

    const dynBorder = (name: string) =>
        focused === name ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)";

    const dest = prefilledPlace ? `${prefilledPlace}, ${prefilledState}` : form.destination;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    style={{
                        position: "fixed", inset: 0, zIndex: 99998,
                        background: "rgba(5,8,22,0.82)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        overflow: "hidden",          // overlay never scrolls
                        display: "flex",
                        alignItems: "center",        // vertically centred
                        justifyContent: "center",
                        padding: "32px 16px",
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.94, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.94, opacity: 0, y: 24 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: "800px",
                            maxHeight: "90vh",           // cap to viewport
                            background: "rgba(10,14,28,0.97)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: R,
                            boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                            overflow: "hidden",          // clips scrollbar to rounded corners
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={handleClose}
                            style={{
                                position: "absolute", top: "18px", right: "18px", zIndex: 10,
                                width: "32px", height: "32px", borderRadius: "50%",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                cursor: "pointer", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                color: "rgba(255,255,255,0.45)", transition: "all 0.2s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                        >
                            <X size={14} />
                        </button>

                        <div style={{
                            padding: "36px 40px 32px",
                            overflowY: "auto",
                            overscrollBehavior: "contain",
                            flex: 1,
                            // Thin custom scrollbar that respects the modal's dark theme
                            scrollbarWidth: "thin",
                            scrollbarColor: "rgba(255,255,255,0.12) transparent",
                        }}>
                            {!submitted ? (
                                <>
                                    <p style={{ fontSize: "0.58rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "#22d3ee", marginBottom: "10px", fontWeight: 600 }}>
                                        Show Interest
                                    </p>
                                    <div style={{ marginBottom: "8px" }}>
                                        <span style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "white", marginRight: "12px" }}>
                                            Plan Your
                                        </span>
                                        <span style={{ fontFamily: "'Pacifico', cursive", fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)", WebkitTextStroke: "0.4px white", color: "white" }}>
                                            lamhe
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", marginBottom: "26px", lineHeight: 1.5 }}>
                                        Fill in your details — our team will reach out within 24 hours.
                                    </p>

                                    <form onSubmit={handleSubmit}>
                                        {/* Row 1 — Name + Email */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                                            <div>
                                                <label style={label}>Your Name *</label>
                                                <input
                                                    required name="name" value={form.name}
                                                    onChange={handleChange} placeholder="Preetam Sahu"
                                                    style={{ ...fieldBox, borderColor: dynBorder("name") }}
                                                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                            <div>
                                                <label style={label}>Email Address *</label>
                                                <input
                                                    required type="email" name="email" value={form.email}
                                                    onChange={handleChange} placeholder="you@email.com"
                                                    style={{ ...fieldBox, borderColor: dynBorder("email") }}
                                                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2 — Phone (full width) + Group size */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                                            <PhoneField
                                                country={country}
                                                onCountryChange={(c) => { setCountry(c); setPhoneError(""); }}
                                                phone={form.phone}
                                                onPhoneChange={(v) => { setForm(p => ({ ...p, phone: v })); if (phoneError) setPhoneError(""); }}
                                                focused={focused === "phone"}
                                                onFocus={() => setFocused("phone")}
                                                onBlur={() => setFocused(null)}
                                                error={phoneError}
                                            />
                                            <div>
                                                <label style={label}>Group Size</label>
                                                <CustomSelect
                                                    options={GROUP_SIZES}
                                                    value={form.groupSize}
                                                    onChange={(v) => setForm(p => ({ ...p, groupSize: v }))}
                                                    placeholder="Select size"
                                                    focused={focused === "groupSize"}
                                                    onFocus={() => setFocused("groupSize")}
                                                    onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 3 — Destination + Date */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                                            <div>
                                                <label style={label}>Destination of Interest</label>
                                                <input
                                                    name="destination"
                                                    value={prefilledPlace ? dest : form.destination}
                                                    onChange={handleChange} placeholder="Varanasi, Uttar Pradesh"
                                                    style={{ ...fieldBox, borderColor: dynBorder("destination") }}
                                                    onFocus={() => setFocused("destination")} onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                            <div>
                                                <label style={label}>Preferred Travel Month</label>
                                                <input
                                                    name="travelDate" value={form.travelDate}
                                                    onChange={handleChange} placeholder="e.g. October 2025"
                                                    style={{ ...fieldBox, borderColor: dynBorder("travelDate") }}
                                                    onFocus={() => setFocused("travelDate")} onBlur={() => setFocused(null)}
                                                />
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div style={{ marginBottom: "22px" }}>
                                            <label style={label}>Anything else you'd like us to know?</label>
                                            <textarea
                                                name="message" value={form.message}
                                                onChange={handleChange} rows={2}
                                                placeholder="Special requirements, budget range, occasion..."
                                                style={{
                                                    ...fieldBox, resize: "none", lineHeight: 1.6,
                                                    borderColor: focused === "message" ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)",
                                                }}
                                                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                                            />
                                        </div>

                                        {/* CTAs */}
                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                            <motion.button
                                                type="submit" disabled={loading}
                                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                style={{
                                                    flex: 1, background: "#22d3ee", color: "#050816",
                                                    border: "none", borderRadius: "50px",
                                                    padding: "13px 24px", fontWeight: 700,
                                                    fontSize: "0.8rem", letterSpacing: "0.04em",
                                                    cursor: "pointer", opacity: loading ? 0.6 : 1,
                                                }}
                                            >
                                                {loading ? "Sending..." : "Send My Interest →"}
                                            </motion.button>
                                            <motion.a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in a trip to ${dest || "India"} through Lamhe.`)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "7px",
                                                    background: "rgba(255,255,255,0.05)",
                                                    border: "1px solid rgba(255,255,255,0.11)",
                                                    borderRadius: "50px", padding: "13px 22px",
                                                    fontSize: "0.8rem", fontWeight: 600,
                                                    color: "rgba(255,255,255,0.7)", textDecoration: "none",
                                                    whiteSpace: "nowrap", cursor: "pointer",
                                                }}
                                            >
                                                💬 WhatsApp
                                            </motion.a>
                                        </div>

                                        <p style={{ textAlign: "center", fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "12px" }}>
                                            Or call us at{" "}
                                            <a href="tel:+919999999999" style={{ color: "rgba(34,211,238,0.6)", textDecoration: "none" }}>
                                                +91 99999 99999
                                            </a>
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "48px 0" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🙏</div>
                                    <h3 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "10px" }}>Namaste!</h3>
                                    <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.48)", maxWidth: "360px", margin: "0 auto", lineHeight: 1.7 }}>
                                        Thank you, <strong style={{ color: "white" }}>{form.name}</strong>. Our team will reach out to{" "}
                                        <strong style={{ color: "#22d3ee" }}>{`${country.dial} ${form.phone}` || form.email}</strong> within 24 hours.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleClose}
                                        style={{
                                            marginTop: "28px", background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.11)", borderRadius: "50px",
                                            padding: "12px 32px", fontSize: "0.68rem", letterSpacing: "0.3em",
                                            textTransform: "uppercase", color: "white", cursor: "pointer",
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