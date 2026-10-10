import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {showCover} from "../../utils/routeBlock";
import {COUNTRIES} from "../../utils/countries";

// ═══════════════════════════════════════════════════════════════════════════════
//  SCROLL SPEED — the only numbers you need to tune (pixels per second).
//  Speed is measured per row, so it stays the same however many items a row has.
// ═══════════════════════════════════════════════════════════════════════════════
const STATES_SPEED = 120;   // top row    (bigger = faster)
const DESTS_SPEED = 140;    // bottom row (bigger = faster)

// Slug helper — must match travelData.ts / StatePage.tsx exactly.
const toSlug = (name: string): string =>
    name.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const UT_NAMES = new Set([
    "Delhi", "Puducherry", "Chandigarh", "Lakshadweep", "Ladakh",
    "Andaman & Nicobar Islands", "Dadra & Nagar Haveli and Daman & Diu", "Jammu & Kashmir",
]);

interface RegionItem { name: string; sub: string; slug: string; }
interface DestItem { name: string; sub: string; regionSlug: string; destSlug: string; destIndex: number; }

// ── Marquee row — constant speed, always wide enough to loop seamlessly ───────
function MarqueeRow<T extends { name: string; sub: string }>({
                                                                 items, direction, speed, onItemClick, rowType,
                                                             }: {
    items: T[]; direction: "left" | "right"; speed: number;
    onItemClick?: (item: T) => void; rowType: "state" | "dest";
}) {
    const [paused, setPaused] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [repeat, setRepeat] = useState(1);          // copies of `items` per half of the track
    const trackRef = useRef<HTMLDivElement>(null);

    const half = useMemo(() => Array.from({length: repeat}, () => items).flat(), [items, repeat]);
    const track = useMemo(() => [...half, ...half], [half]);
    const animationName = direction === "left" ? "marquee-left" : "marquee-right";

    useLayoutEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const measure = () => {
            const halfWidth = el.scrollWidth / 2;
            const oneSetWidth = halfWidth / repeat;
            if (oneSetWidth <= 0) return;
            // A short list (e.g. 6 regions) must still cover the screen, or the loop shows a gap.
            const needed = Math.max(1, Math.ceil(window.innerWidth / oneSetWidth));
            if (needed !== repeat) { setRepeat(needed); return; }
            const next = halfWidth / speed;           // duration = distance ÷ speed → constant px/s
            setDuration(prev => (prev !== null && Math.abs(prev - next) / next < 0.02 ? prev : next));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [speed, items, repeat]);

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{display: "flex", minWidth: "max-content"}}
        >
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    minWidth: "max-content",
                    animation: duration ? `${animationName} ${duration}s linear infinite` : "none",
                    animationPlayState: paused ? "paused" : "running",
                    willChange: "transform",
                }}
            >
                {track.map((item, i) => (
                    <MarqueeItem
                        key={`${item.name}-${i}`}
                        name={item.name}
                        sub={item.sub}
                        rowType={rowType}
                        onClick={onItemClick ? () => onItemClick(item) : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Single item ───────────────────────────────────────────────────────────────
const MarqueeItem = ({name, sub, rowType, onClick}: {
    name: string; sub: string; rowType: "state" | "dest"; onClick?: () => void;
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "8px",
                padding: rowType === "state" ? "0 36px" : "0 28px",
                whiteSpace: "nowrap",
                background: "none",
                border: "none",
                outline: "none",
                cursor: onClick ? "pointer" : "default",
                userSelect: "none",
            }}
        >
            <span style={{
                fontSize: rowType === "state" ? "1.05rem" : "0.82rem",
                fontWeight: rowType === "state" ? 900 : 800,
                letterSpacing: rowType === "state" ? "0.3em" : "0.22em",
                textTransform: "uppercase",
                color: hovered
                    ? (rowType === "state" ? "rgba(255,255,255,1)" : "rgba(34,211,238,1)")
                    : (rowType === "state" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.38)"),
                transition: "color 0.25s ease",
            }}>
                {name}
            </span>

            <span style={{
                fontSize: "0.5rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: hovered
                    ? (rowType === "state" ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.5)")
                    : "transparent",
                transition: "color 0.25s ease",
                marginBottom: "1px",
            }}>
                {sub}
            </span>

            <span style={{
                fontSize: rowType === "state" ? "0.38rem" : "0.3rem",
                color: "rgba(255,255,255,0.08)",
                marginLeft: "4px",
            }}>
                ◆
            </span>
        </button>
    );
};

// ── Section ───────────────────────────────────────────────────────────────────
// Shows exactly what the StateExplorer below has selected (India by default):
//   top row    = every state / UT of that country, same order as the explorer
//   bottom row = every destination of those states, grouped state by state
interface Props { countryCode: string; }

const MarqueeSection = ({countryCode}: Props) => {
    const navigate = useNavigate();
    const country = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];
    const countrySlug = country.code.toLowerCase();

    const regionItems = useMemo<RegionItem[]>(() => country.regions.map(r => ({
        name: r.name.toUpperCase(),
        sub: country.code === "IN" ? (UT_NAMES.has(r.name) ? "UT" : "State") : country.regionLabel,
        slug: toSlug(r.name),
    })), [country]);

    const destItems = useMemo<DestItem[]>(() => country.regions.flatMap(r =>
        r.places.map((p, i) => ({
            name: p.name.split("(")[0].trim().toUpperCase(),
            sub: p.type,
            regionSlug: toSlug(r.name),
            destSlug: toSlug(p.name),            // full name — exactly what StatePage matches on
            destIndex: i,
        }))
    ), [country]);

    // Countries marked "coming soon" are shown but have no pages to open yet.
    const handleRegionClick = country.available
        ? (item: RegionItem) => {
            showCover();
            navigate(`/${countrySlug}/${item.slug}`);
        }
        : undefined;

    // ?scrollTo=<card index> — index 0 included: the first card is below the hero too.
    const handleDestClick = country.available
        ? (item: DestItem) => {
            showCover();
            navigate(`/${countrySlug}/${item.regionSlug}/${item.destSlug}?scrollTo=${item.destIndex}`);
        }
        : undefined;

    return (
        <section style={{
            overflow: "hidden",
            borderTop: "none",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0",
            position: "relative",
            marginTop: 0,
        }}>
            {/* Edge fades */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                pointerEvents: "none",
                background: "linear-gradient(to right, #050816 0%, transparent 6%, transparent 94%, #050816 100%)",
            }}/>

            {/* Row 1 — the country's states / UTs / provinces… */}
            <div style={{
                padding: "22px 0 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
            }}>
                <MarqueeRow
                    key={`regions-${country.code}`}
                    items={regionItems}
                    direction="left"
                    speed={STATES_SPEED}
                    onItemClick={handleRegionClick}
                    rowType="state"
                />
            </div>

            {/* Row 2 — …and all of their destinations. */}
            <div style={{padding: "16px 0 22px", overflow: "hidden"}}>
                {destItems.length > 0 ? (
                    <MarqueeRow
                        key={`dests-${country.code}`}
                        items={destItems}
                        direction="right"
                        speed={DESTS_SPEED}
                        onItemClick={handleDestClick}
                        rowType="dest"
                    />
                ) : (
                    // No destinations yet (coming-soon country): keep the row's height so the page
                    // below doesn't jump when the user switches country in the explorer.
                    <div aria-hidden="true" style={{display: "flex", visibility: "hidden"}}>
                        <MarqueeItem name="·" sub="" rowType="dest"/>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MarqueeSection;