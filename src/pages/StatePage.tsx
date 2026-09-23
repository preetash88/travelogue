import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { uniqueIndiaStates, destinations, type IndiaPlace, type IndiaState } from "../utils/travelData";
import MagneticButton from "../components/ui/MagneticButton";

interface Props {
    onInterest: (place?: string, state?: string) => void;
}

// ── Slug helpers ──────────────────────────────────────────────────────────────
const toSlug = (name: string): string =>
    name
        .toLowerCase()
        .replace(/[()]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

const stateBySlug: Record<string, IndiaState> = Object.fromEntries(
    uniqueIndiaStates.map(s => [toSlug(s.state), s])
);

// ── Single destination card (alternating layout) ──────────────────────────────
const DestinationCard = ({ place, state, index, onInterest }: {
    place: IndiaPlace;
    state: IndiaState;
    index: number;
    onInterest: (place: string, state: string) => void;
}) => {
    const imageLeft = index % 2 === 0;

    return (
        <motion.div
            id={`dest-${toSlug(place.name)}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderRadius: "24px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                minHeight: "440px",
            }}
        >
            <div style={{ order: imageLeft ? 0 : 1, position: "relative", overflow: "hidden" }}>
                <motion.img
                    src={place.image}
                    alt={place.name}
                    loading={index === 0 ? "eager" : "lazy"}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
                <div style={{
                    position: "absolute", inset: 0,
                    background: imageLeft
                        ? "linear-gradient(to right, transparent 55%, rgba(5,8,22,0.75))"
                        : "linear-gradient(to left, transparent 55%, rgba(5,8,22,0.75))",
                }} />
            </div>

            <div style={{
                order: imageLeft ? 1 : 0,
                padding: "52px 48px",
                display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px",
                background: "rgba(5,8,22,0.45)",
            }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#22d3ee", fontWeight: 600, margin: 0 }}>
                    {place.type} · {place.bestTime}
                </p>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.025em", color: "white", margin: 0 }}>
                    {place.name.split("(")[0].trim()}
                </h2>
                <p style={{ fontSize: "0.95rem", fontStyle: "italic", color: "rgba(34,211,238,0.7)", lineHeight: 1.5, margin: 0 }}>
                    {place.tagline}
                </p>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(255,255,255,0.52)", maxWidth: "400px", margin: 0 }}>
                    {place.description}
                </p>
                <div style={{ marginTop: "8px" }}>
                    <MagneticButton onClick={() => onInterest(place.name, state.state)}>
                        Show Interest
                    </MagneticButton>
                </div>
            </div>
        </motion.div>
    );
};

// ── StorySection (from master) ────────────────────────────────────────────────
import iceland from "../assets/destinations/iceland.avif";

const StorySection = () => (
    <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:px-12">
        <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }}>
            <p className="mb-6 text-xs uppercase tracking-[0.5em] text-cyan-300">IMMERSIVE EXPERIENCES</p>
            <h2 className="text-5xl font-black leading-none md:text-7xl">TRAVEL<br />BEYOND<br />DESTINATIONS</h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
                Discover cinematic journeys crafted for explorers who seek breathtaking landscapes, unforgettable adventures, and immersive cultural experiences around the world.
            </p>
            <div className="mt-12 flex gap-12">
                <div><h3 className="text-4xl font-black">120+</h3><p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">Destinations</p></div>
                <div><h3 className="text-4xl font-black">4.9</h3><p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">User Rating</p></div>
            </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
            <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 1 }} src={iceland} alt="Travel"
                className="relative h-[700px] w-full rounded-[3rem] object-cover" />
        </motion.div>
    </section>
);

// ── StickyShowcase (from master) ──────────────────────────────────────────────
import bali from "../assets/destinations/bali2.avif";

const StickyShowcase = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} className="relative h-[250vh]">
            <div className="sticky gpu top-0 flex h-screen items-center justify-center overflow-hidden">
                <motion.img style={{ scale }} src={bali} alt="Bali" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <motion.div style={{ opacity }} className="relative z-20 max-w-5xl px-6 text-center">
                    <p className="mb-6 text-xs uppercase tracking-[0.6em] text-cyan-300">IMMERSIVE STORYTELLING</p>
                    <h2 className="text-5xl font-black leading-none md:text-8xl">EVERY JOURNEY<br />TELLS A STORY</h2>
                    <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70">
                        Experience cinematic travel narratives through immersive visuals, layered motion, and carefully crafted storytelling.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// ── StatsSection (from master) ────────────────────────────────────────────────
const stats = [
    { number: "120+", label: "Destinations" },
    { number: "50K+", label: "Travelers" },
    { number: "4.9",  label: "Average Rating" },
    { number: "98%",  label: "Satisfaction" },
];

const StatsSection = () => (
    <section className="relative px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
            {stats.map((item, index) => (
                <motion.div key={item.label}
                    initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }} viewport={{ once: true }}
                    className="glass rounded-[2rem] p-10 text-center"
                >
                    <h2 className="text-5xl font-black md:text-6xl">{item.number}</h2>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                </motion.div>
            ))}
        </div>
    </section>
);

// ── GallerySection (from master) ──────────────────────────────────────────────
const galleryImages = [bali, iceland];

const GallerySection = () => (
    <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
                <p className="mb-6 text-xs uppercase tracking-[0.6em] text-cyan-300">VISUAL JOURNEYS</p>
                <h2 className="text-5xl font-black leading-none md:text-8xl">CINEMATIC<br />GALLERY</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                {galleryImages.map((image, index) => (
                    <motion.div key={index}
                        initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.12 }} viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="group relative overflow-hidden rounded-[2rem]"
                    >
                        <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 1.2 }}
                            src={image} alt="Travel" className="h-[600px] w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-3xl font-black">EXPLORE</h3>
                            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/60">Cinematic Experience</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ── DestinationCards (from master — uses existing destinations data) ───────────
const MasterDestinationCards = () => (
    <section className="relative z-20 mx-auto grid max-w-7xl gap-8 px-6 py-32 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((item, index) => (
            <motion.div key={item.id}
                initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.15 }} viewport={{ once: true }}
                whileHover={{ y: -15 }}
                className="glass overflow-hidden rounded-[2rem]"
            >
                <div className="overflow-hidden">
                    <motion.img whileHover={{ scale: 1.08 }} transition={{ duration: 1 }}
                        src={item.image} alt={item.title} className="h-[420px] w-full object-cover" />
                </div>
                <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.location}</p>
                    <h2 className="mt-4 text-3xl font-bold">{item.title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{item.description}</p>
                </div>
            </motion.div>
        ))}
    </section>
);

// ── VideoSection (from master) ────────────────────────────────────────────────
const VideoSection = () => (
    <section className="relative h-screen overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="/videos/iceland.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/50" />
        <motion.div
            initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }} viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 z-20 max-w-4xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
        >
            <p className="mb-6 text-xs uppercase tracking-[0.6em] text-cyan-300">CINEMATIC JOURNEYS</p>
            <h2 className="text-5xl font-black leading-none md:text-8xl">EXPERIENCE<br />THE WORLD</h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70">
                Dive into breathtaking destinations through immersive storytelling, cinematic visuals, and unforgettable travel experiences.
            </p>
        </motion.div>
    </section>
);

// ── CTASection (from master) ──────────────────────────────────────────────────
const CTASection = ({ onInterest }: { onInterest: () => void }) => (
    <section className="relative overflow-hidden px-6 py-40 text-center">
        <div className="gradient-orb left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
            initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }} viewport={{ once: true }}
            className="relative z-20"
        >
            <p className="mb-6 text-xs uppercase tracking-[0.6em] text-cyan-300">START YOUR JOURNEY</p>
            <h2 className="text-5xl font-black leading-none md:text-8xl">EXPLORE<br />THE UNKNOWN</h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70">
                Curated cinematic travel experiences designed for modern explorers.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onInterest}
                className="glass mt-12 rounded-full px-10 py-5 text-sm uppercase tracking-[0.3em]">
                Begin Adventure
            </motion.button>
        </motion.div>
    </section>
);

// ── TestimonialSection (from master) ─────────────────────────────────────────
const testimonials = [
    { name: "Sophia Williams", text: "An unforgettable cinematic travel experience unlike anything I've seen before." },
    { name: "Ethan Carter",    text: "The storytelling and immersive visuals made every destination feel alive." },
    { name: "Olivia Brown",    text: "Luxury, adventure, and technology blended into one beautiful journey." },
];

const TestimonialSection = () => (
    <section className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
                <p className="mb-6 text-xs uppercase tracking-[0.6em] text-cyan-300">TRAVEL STORIES</p>
                <h2 className="text-5xl font-black leading-none md:text-8xl">WHAT PEOPLE<br />EXPERIENCE</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                {testimonials.map((item, index) => (
                    <motion.div key={item.name}
                        initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }} viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="glass rounded-[2rem] p-10"
                    >
                        <p className="text-lg leading-relaxed text-white/80">"{item.text}"</p>
                        <div className="mt-10">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">Verified Traveler</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ── StatePage ─────────────────────────────────────────────────────────────────
const StatePage = ({ onInterest }: Props) => {
    const { stateSlug, destSlug } = useParams<{ stateSlug: string; destSlug?: string }>();
    const navigate = useNavigate();
    const scrolledRef = useRef(false);

    const stateData: IndiaState | undefined = stateSlug ? stateBySlug[stateSlug] : undefined;

    const targetPlace: IndiaPlace | undefined =
        stateData && destSlug
            ? stateData.places.find(p => toSlug(p.name) === destSlug)
            : undefined;

    // Scroll to destination
    useEffect(() => {
        if (!destSlug || scrolledRef.current) return;
        const attempt = (tries: number) => {
            const el = document.getElementById(`dest-${destSlug}`);
            if (el) {
                setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "center" }); scrolledRef.current = true; }, 100);
            } else if (tries > 0) {
                setTimeout(() => attempt(tries - 1), 300);
            }
        };
        setTimeout(() => attempt(12), 600);
    }, [destSlug]);

    // Scroll to top on state change
    useEffect(() => {
        scrolledRef.current = false;
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [stateSlug]);

    // 404
    if (!stateData) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "48px", textAlign: "center" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "#22d3ee", margin: 0 }}>Not Found</p>
                <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, color: "white", margin: 0 }}>We couldn't find that destination</h1>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
                    Slug: <code style={{ color: "#22d3ee" }}>{stateSlug}</code>
                </p>
                <button onClick={() => navigate("/")}
                    style={{ padding: "14px 36px", background: "#22d3ee", color: "#050816", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: "80px" }}>

            {/* ── State hero header ──────────────────────────────────────── */}
            <div style={{ padding: "64px 48px 40px" }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                        <button onClick={() => navigate("/")}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: 0, transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                            Lamhe
                        </button>
                        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.6rem" }}>→</span>
                        <button onClick={() => navigate("/")}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: 0, transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                            India
                        </button>
                        <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.6rem" }}>→</span>
                        <span style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#22d3ee" }}>{stateData.state}</span>
                        {targetPlace && (
                            <>
                                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.6rem" }}>→</span>
                                <span style={{ fontSize: "0.58rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(34,211,238,0.6)" }}>
                                    {targetPlace.name.split("(")[0].trim()}
                                </span>
                            </>
                        )}
                    </div>

                    {/* State name + tagline */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>
                        <div>
                            <p style={{ fontSize: "0.58rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "#22d3ee", marginBottom: "14px", fontWeight: 600 }}>
                                🇮🇳 India · {stateData.capital}
                            </p>
                            <h1 style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.035em", color: "white", margin: 0 }}>
                                {stateData.state}
                            </h1>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", maxWidth: "460px", paddingBottom: "8px" }}>
                            <div style={{ width: "40px", height: "1px", background: "rgba(34,211,238,0.4)", flexShrink: 0 }} />
                            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.42)", fontStyle: "italic", lineHeight: 1.65, margin: 0 }}>
                                {stateData.tagline}
                            </p>
                        </div>
                    </div>

                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginTop: "20px", marginBottom: 0 }}>
                        {stateData.places.length} curated destinations
                    </p>
                </motion.div>
            </div>

            {/* Divider */}
            <div style={{ margin: "0 48px", height: "1px", background: "rgba(255,255,255,0.06)" }} />

            {/* ── State-specific destination cards ───────────────────────── */}
            <div style={{ padding: "56px 48px 80px", display: "flex", flexDirection: "column", gap: "28px" }}>
                {stateData.places.map((place, i) => (
                    <DestinationCard
                        key={place.name}
                        place={place}
                        state={stateData}
                        index={i}
                        onInterest={(p, s) => onInterest(p, s)}
                    />
                ))}
            </div>

            {/* ── All sections from master branch ────────────────────────── */}
            <StorySection />
            <StickyShowcase />
            <StatsSection />
            <GallerySection />
            <MasterDestinationCards />
            <VideoSection />
            <CTASection onInterest={() => onInterest()} />
            <TestimonialSection />

        </div>
    );
};

export default StatePage;
