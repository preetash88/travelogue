import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react";
import type {IndiaPlace, IndiaState} from "../../utils/travelData";

interface Props {
    state: IndiaState;
    onExploreMore: () => void;
}

// ── useInView — flips to true (once) the first time the element is on screen ──
const useInView = <T extends HTMLElement>(rootMargin: string) => {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || seen) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            {rootMargin}
        );
        io.observe(el);
        return () => io.disconnect();
    }, [seen, rootMargin]);

    return [ref, seen] as const;
};

// ── Reveal — fade/slide in using CSS transitions (runs on the GPU compositor,
//    not on the main thread, so it never fights with scrolling) ───────────────
const Reveal = ({
                    x = 0,
                    y = 0,
                    delay = 0,
                    hold = false,
                    style,
                    children,
                }: {
    x?: number;
    y?: number;
    delay?: number;
    hold?: boolean; // keep hidden until this is false (e.g. waiting for an image)
    style?: CSSProperties;
    children: ReactNode;
}) => {
    const [ref, seen] = useInView<HTMLDivElement>("0px 0px -80px 0px");
    return (
        <div
            ref={ref}
            className={`reveal ${seen && !hold ? "is-in" : ""}`}
            style={{"--rx": `${x}px`, "--ry": `${y}px`, "--rd": `${delay}s`, ...style} as CSSProperties}
        >
            {children}
        </div>
    );
};

// ── DestinationStories ────────────────────────────────────────────────────────
const DestinationStories = ({state, onExploreMore}: Props) => {
    // Give the hero images a head start before the card images begin loading.
    const [armed, setArmed] = useState(false);
    useEffect(() => {
        const t = window.setTimeout(() => setArmed(true), 600);
        return () => window.clearTimeout(t);
    }, []);

    return (
        <section style={{background: "#050816", padding: "0 0 80px"}}>

            {/* Section label */}
            <div style={{padding: "72px 48px 0"}}>
                <Reveal y={20}>
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
                    <div style={{width: "40px", height: "1px", background: "rgba(34,211,238,0.3)"}}/>
                    <p style={{
                        marginTop: "16px",
                        fontSize: "1rem",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.45)"
                    }}>
                        {state.tagline}
                    </p>
                </Reveal>
            </div>

            {/* One row per destination */}
            {state.places.map((place, i) => (
                <DestinationRow
                    key={place.name}
                    place={place}
                    index={i}
                    imageLeft={i % 2 !== 0}
                    armed={armed}
                />
            ))}

            {/* Explore More — scrolls to BookingSection */}
            <div style={{display: "flex", justifyContent: "flex-end", padding: "24px 48px 0"}}>
                <Reveal y={24} delay={0.1}>
                    <button onClick={onExploreMore} className="story-cta">
                        Plan Your Trip
                        <span style={{fontSize: "1rem", lineHeight: 1}}>→</span>
                    </button>
                </Reveal>
            </div>
        </section>
    );
};

// ── Single alternating row ────────────────────────────────────────────────────
const DestinationRow = ({
                            place,
                            index,
                            imageLeft,
                            armed,
                        }: {
    place: IndiaPlace;
    index: number;
    imageLeft: boolean;
    armed: boolean;
}) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [load, setLoad] = useState(false);       // start fetching the image
    const [imgReady, setImgReady] = useState(false); // image fetched AND decoded

    // 1) Start fetching when the row is within ~2 screens of the viewport.
    useEffect(() => {
        const el = rowRef.current;
        if (!armed || !el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoad(true);
                    io.disconnect();
                }
            },
            {rootMargin: "2000px 0px"}
        );
        io.observe(el);
        return () => io.disconnect();
    }, [armed]);

    // 2) Decode it off-screen, so the reveal animation starts on a ready image.
    useEffect(() => {
        const img = imgRef.current;
        if (!load || !img) return;
        let cancelled = false;
        const ready = () => {
            if (!cancelled) setImgReady(true);
        };
        img.decode().then(ready, ready); // on error, still reveal (shows alt text)
        return () => {
            cancelled = true;
        };
    }, [load]);

    const textContent = (
        <Reveal
            x={imageLeft ? 40 : -40}
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

            {/* Description */}
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
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <div style={{width: "24px", height: "1px", background: "rgba(255,255,255,0.2)"}}/>
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
        </Reveal>
    );

    const imageContent = (
        // Faint placeholder card — holds the space so nothing jumps when the image arrives
        <div style={{
            height: "520px",
            borderRadius: "2.5rem",
            background: "rgba(255,255,255,0.03)",
        }}>
            <Reveal y={40} delay={0.1} hold={!imgReady} style={{position: "relative"}}>
                {/* Ambient glow — plain gradient (no blur filter) */}
                <div style={{
                    position: "absolute",
                    inset: "-24px",
                    borderRadius: "50%",
                    background: "radial-gradient(closest-side, rgba(34,211,238,0.08), transparent)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}/>

                <img
                    ref={imgRef}
                    src={load ? place.image : undefined}
                    alt={place.name}
                    decoding="async"
                    className="card-img"
                    style={{
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        height: "520px",
                        objectFit: "cover",
                        objectPosition: place.focus ?? "center",
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
                }}/>
            </Reveal>
        </div>
    );

    return (
        <div ref={rowRef} style={{
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
                    <div style={{order: 0}}>{imageContent}</div>
                    <div style={{order: 1}}>{textContent}</div>
                </>
            ) : (
                <>
                    <div style={{order: 0}}>{textContent}</div>
                    <div style={{order: 1}}>{imageContent}</div>
                </>
            )}
        </div>
    );
};

export default DestinationStories;