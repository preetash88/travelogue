import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react";
import type {IndiaPlace, IndiaState} from "../../utils/travelData";
import {LOAD_ALL_EVENT, storyId} from "../../utils/pageAnchor";

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
    const imgRef = useRef<HTMLImageElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const [load, setLoad] = useState(false);          // start fetching the images
    const [imgReady, setImgReady] = useState(false); // first image fetched AND decoded

    // Card pictures. One per place today; add more to `gallery` in travelData.ts later.
    const photos = place.gallery && place.gallery.length > 0 ? place.gallery : [place.image];
    const [active, setActive] = useState(0);
    const [leaving, setLeaving] = useState<number | null>(null);
    const [tick, setTick] = useState(0);
    const [flow, setFlow] = useState<"next" | "prev">("next"); // which way the last change went
    const stackCount = Math.min(3, photos.length - 1);       // cards peeking out below

    // Start fetching: when near the screen, OR a little after load (staggered),
    // OR instantly when a long scroll is about to happen.
    useEffect(() => {
        const el = rowRef.current;
        if (!armed || !el) return;

        const start = () => setLoad(true);
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) start();
            },
            {rootMargin: "2000px 0px"}
        );
        io.observe(el);
        const staggered = window.setTimeout(start, 800 + index * 450);
        window.addEventListener(LOAD_ALL_EVENT, start);

        return () => {
            io.disconnect();
            window.clearTimeout(staggered);
            window.removeEventListener(LOAD_ALL_EVENT, start);
        };
    }, [armed, index]);

    // Decode the first image off-screen, so the reveal starts on a ready image.
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

    // Once the first photo is up, quietly warm up the others.
    useEffect(() => {
        if (!imgReady || photos.length < 2) return;
        photos.slice(1).forEach(src => {
            const im = new Image();
            im.decoding = "async";
            im.src = src;
            im.decode().catch(() => { /* ignore */
            });
        });
    }, [imgReady, photos]);

    useEffect(() => () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
    }, []);

    const goTo = (next: number, direction: "next" | "prev") => {
        if (next === active || photos.length < 2) return;
        setFlow(direction);
        setLeaving(active);
        setActive(next);
        setTick(t => t + 1);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setLeaving(null), 650);
    };
    const step = (delta: 1 | -1) =>
        goTo((active + delta + photos.length) % photos.length, delta === 1 ? "next" : "prev");
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
            <Reveal y={40} delay={0.1} hold={!imgReady}>
                <div
                    className="gallery"
                    data-active={active}
                    data-flow={flow}
                >
                    {/* Cards stacked underneath — their bottom edges peek out */}
                    {Array.from({length: stackCount}, (_, i) => stackCount - i).map(k => (
                        <div
                            key={`stack-${tick}-${k}`}
                            className={`gallery__stack ${tick > 0 ? "gallery__stack--shift" : ""}`}
                            style={{"--k": k, "--from": flow === "next" ? k + 1 : k - 1} as CSSProperties}
                        >
                            <img
                                src={load ? photos[(active + k) % photos.length] : undefined}
                                alt=""
                                aria-hidden="true"
                                decoding="async"
                                style={{objectPosition: place.focus ?? "center"}}
                            />
                        </div>
                    ))}

                    <div className="gallery__zoom">
                        {leaving !== null && (
                            <img
                                key={`out-${tick}`}
                                src={photos[leaving]}
                                alt=""
                                aria-hidden="true"
                                decoding="async"
                                className="gallery__layer gallery__layer--out"
                                style={{objectPosition: place.focus ?? "center"}}
                            />
                        )}
                        <img
                            key={`in-${tick}`}
                            ref={imgRef}
                            src={load ? photos[active] : undefined}
                            alt={`${place.name} — photo ${active + 1} of ${photos.length}`}
                            decoding="async"
                            className={`gallery__layer ${leaving !== null ? "gallery__layer--in" : ""}`}
                            style={{objectPosition: place.focus ?? "center"}}
                        />
                    </div>

                    {/* Subtle gradient on bottom of image */}
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        borderRadius: "0 0 2.5rem 2.5rem",
                        background: "linear-gradient(to top, rgba(5,8,22,0.3), transparent)",
                        zIndex: 3,
                        pointerEvents: "none",
                    }}/>

                    {photos.length > 1 && (
                        <>
                            {/* Arrows on BOTH sides of every card */}
                            <button
                                type="button"
                                className="gallery__arrow gallery__arrow--left"
                                onClick={() => step(-1)}
                                aria-label={`Previous photo of ${place.name}`}
                            >
                                <ChevronLeft size={22}/>
                            </button>
                            <button
                                type="button"
                                className="gallery__arrow gallery__arrow--right"
                                onClick={() => step(1)}
                                aria-label={`Next photo of ${place.name}`}
                            >
                                <ChevronRight size={22}/>
                            </button>

                            <div className="gallery__dots">
                                {photos.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        aria-label={`Show photo ${i + 1} of ${place.name}`}
                                        onClick={() => goTo(i, i > active ? "next" : "prev")}
                                        className={`gallery__dot ${i === active ? "is-active" : ""}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Reveal>
        </div>
    );

    return (
        <div id={storyId(index)} ref={rowRef} style={{
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