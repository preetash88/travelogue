import { useState } from "react";

// ── Routing metadata — ready for React Router when you wire it up ─────────────
// State click  → navigate to `/${stateSlug}`
// Dest click   → navigate to `/${stateSlug}/${destSlug}`
//                + scroll to element with id `dest-${destSlug}`

export interface StateItem {
    name: string;
    slug: string;
    sub: string;        // region type label
}

export interface DestItem {
    name: string;
    sub: string;
    stateSlug: string;
    destSlug: string;
    route: string;      // full path: /${stateSlug}/${destSlug}
}

// ── Row 1: All 36 Indian States & UTs ────────────────────────────────────────
const STATES: StateItem[] = [
    { name: "UTTAR PRADESH",   slug: "uttar-pradesh",   sub: "State" },
    { name: "RAJASTHAN",       slug: "rajasthan",        sub: "State" },
    { name: "KERALA",          slug: "kerala",           sub: "State" },
    { name: "HIMACHAL PRADESH",slug: "himachal-pradesh", sub: "State" },
    { name: "GOA",             slug: "goa",              sub: "State" },
    { name: "UTTARAKHAND",     slug: "uttarakhand",      sub: "State" },
    { name: "TAMIL NADU",      slug: "tamil-nadu",       sub: "State" },
    { name: "MAHARASHTRA",     slug: "maharashtra",      sub: "State" },
    { name: "KARNATAKA",       slug: "karnataka",        sub: "State" },
    { name: "WEST BENGAL",     slug: "west-bengal",      sub: "State" },
    { name: "GUJARAT",         slug: "gujarat",          sub: "State" },
    { name: "PUNJAB",          slug: "punjab",           sub: "State" },
    { name: "MADHYA PRADESH",  slug: "madhya-pradesh",   sub: "State" },
    { name: "JAMMU & KASHMIR", slug: "jammu-kashmir",    sub: "UT" },
    { name: "ANDHRA PRADESH",  slug: "andhra-pradesh",   sub: "State" },
    { name: "TELANGANA",       slug: "telangana",        sub: "State" },
    { name: "ODISHA",          slug: "odisha",           sub: "State" },
    { name: "BIHAR",           slug: "bihar",            sub: "State" },
    { name: "ASSAM",           slug: "assam",            sub: "State" },
    { name: "SIKKIM",          slug: "sikkim",           sub: "State" },
    { name: "MEGHALAYA",       slug: "meghalaya",        sub: "State" },
    { name: "ARUNACHAL PRADESH",slug:"arunachal-pradesh",sub: "State" },
    { name: "NAGALAND",        slug: "nagaland",         sub: "State" },
    { name: "MANIPUR",         slug: "manipur",          sub: "State" },
    { name: "MIZORAM",         slug: "mizoram",          sub: "State" },
    { name: "TRIPURA",         slug: "tripura",          sub: "State" },
    { name: "JHARKHAND",       slug: "jharkhand",        sub: "State" },
    { name: "CHHATTISGARH",    slug: "chhattisgarh",     sub: "State" },
    { name: "HARYANA",         slug: "haryana",          sub: "State" },
    { name: "DELHI",           slug: "delhi",            sub: "UT" },
    { name: "PUDUCHERRY",      slug: "puducherry",       sub: "UT" },
    { name: "ANDAMAN & NICOBAR",slug:"andaman-nicobar-islands", sub: "UT" },
    { name: "LAKSHADWEEP",     slug: "lakshadweep",      sub: "UT" },
    { name: "DADRA & DAMAN & DIU",slug:"dadra-nagar-haveli-and-daman-diu", sub: "UT" },
    { name: "CHANDIGARH",      slug: "chandigarh-ut",    sub: "UT" },
    { name: "LADAKH",          slug: "ladakh-ut",        sub: "UT" },
];

// ── Row 2: Top destinations across all states ─────────────────────────────────
const DESTS: DestItem[] = [
    { name:"VARANASI",      sub:"The First City",       stateSlug:"uttar-pradesh",   destSlug:"varanasi",          route:"/uttar-pradesh/varanasi" },
    { name:"AGRA",          sub:"Taj Mahal",             stateSlug:"uttar-pradesh",   destSlug:"agra",              route:"/uttar-pradesh/agra" },
    { name:"AYODHYA",       sub:"Birthplace of Ram",     stateSlug:"uttar-pradesh",   destSlug:"ayodhya",           route:"/uttar-pradesh/ayodhya" },
    { name:"LUCKNOW",       sub:"City of Nawabs",        stateSlug:"uttar-pradesh",   destSlug:"lucknow",           route:"/uttar-pradesh/lucknow" },
    { name:"JAISALMER",     sub:"Golden City",           stateSlug:"rajasthan",       destSlug:"jaisalmer",         route:"/rajasthan/jaisalmer" },
    { name:"UDAIPUR",       sub:"City of Lakes",         stateSlug:"rajasthan",       destSlug:"udaipur",           route:"/rajasthan/udaipur" },
    { name:"JODHPUR",       sub:"Blue City",             stateSlug:"rajasthan",       destSlug:"jodhpur",           route:"/rajasthan/jodhpur" },
    { name:"PUSHKAR",       sub:"Sacred Lake Town",      stateSlug:"rajasthan",       destSlug:"pushkar",           route:"/rajasthan/pushkar" },
    { name:"ALLEPPEY",      sub:"Venice of the East",    stateSlug:"kerala",          destSlug:"alleppey",          route:"/kerala/alleppey" },
    { name:"MUNNAR",        sub:"Tea Country",           stateSlug:"kerala",          destSlug:"munnar",            route:"/kerala/munnar" },
    { name:"WAYANAD",       sub:"Wild Heart",            stateSlug:"kerala",          destSlug:"wayanad",           route:"/kerala/wayanad" },
    { name:"THEKKADY",      sub:"Spice & Wildlife",      stateSlug:"kerala",          destSlug:"thekkady",          route:"/kerala/thekkady" },
    { name:"SPITI VALLEY",  sub:"Middle Land",           stateSlug:"himachal-pradesh",destSlug:"spiti-valley",      route:"/himachal-pradesh/spiti-valley" },
    { name:"MANALI",        sub:"Gateway to Himalayas",  stateSlug:"himachal-pradesh",destSlug:"manali",            route:"/himachal-pradesh/manali" },
    { name:"SHIMLA",        sub:"Queen of Hills",        stateSlug:"himachal-pradesh",destSlug:"shimla",            route:"/himachal-pradesh/shimla" },
    { name:"DHARAMSHALA",   sub:"Little Lhasa",          stateSlug:"himachal-pradesh",destSlug:"dharamshala",       route:"/himachal-pradesh/dharamshala" },
    { name:"PALOLEM",       sub:"Perfect Beach",         stateSlug:"goa",             destSlug:"palolem",           route:"/goa/palolem" },
    { name:"OLD GOA",       sub:"Baroque Grandeur",      stateSlug:"goa",             destSlug:"old-goa",           route:"/goa/old-goa" },
    { name:"ARAMBOL",       sub:"Bohemian Goa",          stateSlug:"goa",             destSlug:"arambol",           route:"/goa/arambol" },
    { name:"RISHIKESH",     sub:"Yoga Capital",          stateSlug:"uttarakhand",     destSlug:"rishikesh",         route:"/uttarakhand/rishikesh" },
    { name:"KEDARNATH",     sub:"Above the Clouds",      stateSlug:"uttarakhand",     destSlug:"kedarnath",         route:"/uttarakhand/kedarnath" },
    { name:"VALLEY OF FLOWERS",sub:"Himalayan Bloom",   stateSlug:"uttarakhand",     destSlug:"valley-of-flowers", route:"/uttarakhand/valley-of-flowers" },
    { name:"MADURAI",       sub:"Temple City",           stateSlug:"tamil-nadu",      destSlug:"madurai",           route:"/tamil-nadu/madurai" },
    { name:"OOTY",          sub:"Queen of Nilgiris",     stateSlug:"tamil-nadu",      destSlug:"ooty",              route:"/tamil-nadu/ooty" },
    { name:"MAHABALIPURAM", sub:"Shore Temples",         stateSlug:"tamil-nadu",      destSlug:"mahabalipuram",     route:"/tamil-nadu/mahabalipuram" },
    { name:"KODAIKANAL",    sub:"Princess of Hills",     stateSlug:"tamil-nadu",      destSlug:"kodaikanal",        route:"/tamil-nadu/kodaikanal" },
    { name:"MUMBAI",        sub:"Maximum City",          stateSlug:"maharashtra",     destSlug:"mumbai",            route:"/maharashtra/mumbai" },
    { name:"AJANTA & ELLORA",sub:"Rock-Cut Caves",      stateSlug:"maharashtra",     destSlug:"ajanta-ellora",     route:"/maharashtra/ajanta-ellora" },
    { name:"LONAR CRATER",  sub:"Meteor Lake",           stateSlug:"maharashtra",     destSlug:"lonar-crater",      route:"/maharashtra/lonar-crater" },
    { name:"HAMPI",         sub:"Vijayanagara Ruins",    stateSlug:"karnataka",       destSlug:"hampi",             route:"/karnataka/hampi" },
    { name:"COORG",         sub:"Coffee Country",        stateSlug:"karnataka",       destSlug:"coorg",             route:"/karnataka/coorg" },
    { name:"MYSURU",        sub:"City of Palaces",       stateSlug:"karnataka",       destSlug:"mysuru",            route:"/karnataka/mysuru" },
    { name:"GOKARNA",       sub:"Sacred Beach",          stateSlug:"karnataka",       destSlug:"gokarna",           route:"/karnataka/gokarna" },
    { name:"DARJEELING",    sub:"Tea & Mountains",       stateSlug:"west-bengal",     destSlug:"darjeeling",        route:"/west-bengal/darjeeling" },
    { name:"SUNDARBANS",    sub:"Tiger Delta",           stateSlug:"west-bengal",     destSlug:"sundarbans",        route:"/west-bengal/sundarbans" },
    { name:"RANN OF KUTCH", sub:"White Desert",          stateSlug:"gujarat",         destSlug:"rann-of-kutch",     route:"/gujarat/rann-of-kutch" },
    { name:"GIR FOREST",    sub:"Asiatic Lions",         stateSlug:"gujarat",         destSlug:"gir-forest",        route:"/gujarat/gir-forest" },
    { name:"AMRITSAR",      sub:"Golden Temple",         stateSlug:"punjab",          destSlug:"amritsar",          route:"/punjab/amritsar" },
    { name:"ANANDPUR SAHIB",sub:"Khalsa Birthplace",    stateSlug:"punjab",          destSlug:"anandpur-sahib",    route:"/punjab/anandpur-sahib" },
    { name:"KHAJURAHO",     sub:"Temples of Love",       stateSlug:"madhya-pradesh",  destSlug:"khajuraho",         route:"/madhya-pradesh/khajuraho" },
    { name:"BANDHAVGARH",   sub:"Tiger Density",         stateSlug:"madhya-pradesh",  destSlug:"bandhavgarh",       route:"/madhya-pradesh/bandhavgarh" },
    { name:"ORCHHA",        sub:"Frozen in Time",        stateSlug:"madhya-pradesh",  destSlug:"orchha",            route:"/madhya-pradesh/orchha" },
    { name:"SRINAGAR",      sub:"Dal Lake",              stateSlug:"jammu-kashmir",   destSlug:"srinagar",          route:"/jammu-kashmir/srinagar" },
    { name:"GULMARG",       sub:"Meadow of Flowers",     stateSlug:"jammu-kashmir",   destSlug:"gulmarg",           route:"/jammu-kashmir/gulmarg" },
    { name:"LEH",           sub:"Roof of World",         stateSlug:"jammu-kashmir",   destSlug:"leh",               route:"/jammu-kashmir/leh" },
    { name:"TIRUPATI",      sub:"Most Visited Shrine",   stateSlug:"andhra-pradesh",  destSlug:"tirupati",          route:"/andhra-pradesh/tirupati" },
    { name:"VIZAG",         sub:"City of Destiny",       stateSlug:"andhra-pradesh",  destSlug:"vizag",             route:"/andhra-pradesh/vizag" },
    { name:"HYDERABAD",     sub:"City of Nizams",        stateSlug:"telangana",       destSlug:"hyderabad",         route:"/telangana/hyderabad" },
    { name:"WARANGAL",      sub:"Kakatiya Capital",      stateSlug:"telangana",       destSlug:"warangal",          route:"/telangana/warangal" },
    { name:"PURI",          sub:"Char Dham Coast",       stateSlug:"odisha",          destSlug:"puri",              route:"/odisha/puri" },
    { name:"KONARK",        sub:"Sun Temple",            stateSlug:"odisha",          destSlug:"konark",            route:"/odisha/konark" },
    { name:"CHILIKA LAKE",  sub:"Flamingo Lagoon",       stateSlug:"odisha",          destSlug:"chilika-lake",      route:"/odisha/chilika-lake" },
    { name:"BODH GAYA",     sub:"Enlightenment Site",    stateSlug:"bihar",           destSlug:"bodh-gaya",         route:"/bihar/bodh-gaya" },
    { name:"NALANDA",       sub:"Ancient University",    stateSlug:"bihar",           destSlug:"nalanda",           route:"/bihar/nalanda" },
    { name:"KAZIRANGA",     sub:"Rhino Capital",         stateSlug:"assam",           destSlug:"kaziranga",         route:"/assam/kaziranga" },
    { name:"MAJULI",        sub:"River Island",          stateSlug:"assam",           destSlug:"majuli",            route:"/assam/majuli" },
    { name:"GANGTOK",       sub:"Hilltop Capital",       stateSlug:"sikkim",          destSlug:"gangtok",           route:"/sikkim/gangtok" },
    { name:"GURUDONGMAR",   sub:"Sacred High Lake",      stateSlug:"sikkim",          destSlug:"gurudongmar",       route:"/sikkim/gurudongmar" },
    { name:"CHERRAPUNJI",   sub:"Wettest on Earth",      stateSlug:"meghalaya",       destSlug:"cherrapunji",       route:"/meghalaya/cherrapunji" },
    { name:"DAWKI",         sub:"Crystal River",         stateSlug:"meghalaya",       destSlug:"dawki",             route:"/meghalaya/dawki" },
    { name:"TAWANG",        sub:"Largest Monastery",     stateSlug:"arunachal-pradesh",destSlug:"tawang",           route:"/arunachal-pradesh/tawang" },
    { name:"ZIRO VALLEY",   sub:"Apatani Tribe",         stateSlug:"arunachal-pradesh",destSlug:"ziro-valley",      route:"/arunachal-pradesh/ziro-valley" },
    { name:"HORNBILL FESTIVAL",sub:"Festival of Festivals",stateSlug:"nagaland",      destSlug:"hornbill-festival", route:"/nagaland/hornbill-festival" },
    { name:"DZUKOU VALLEY", sub:"Wildflower Valley",     stateSlug:"nagaland",        destSlug:"dzukou-valley",     route:"/nagaland/dzukou-valley" },
    { name:"LOKTAK LAKE",   sub:"Floating Islands",      stateSlug:"manipur",         destSlug:"loktak-lake",       route:"/manipur/loktak-lake" },
    { name:"AIZAWL",        sub:"City on Ridge",         stateSlug:"mizoram",         destSlug:"aizawl",            route:"/mizoram/aizawl" },
    { name:"NEERMAHAL",     sub:"Water Palace",          stateSlug:"tripura",         destSlug:"neermahal",         route:"/tripura/neermahal" },
    { name:"UNAKOTI",       sub:"Rock-Cut Shiva",        stateSlug:"tripura",         destSlug:"unakoti",           route:"/tripura/unakoti" },
    { name:"DEOGHAR",       sub:"Jyotirlinga",           stateSlug:"jharkhand",       destSlug:"deoghar",           route:"/jharkhand/deoghar" },
    { name:"CHITRAKOTE FALLS",sub:"India Niagara",       stateSlug:"chhattisgarh",    destSlug:"chitrakote-falls",  route:"/chhattisgarh/chitrakote-falls" },
    { name:"BASTAR",        sub:"Tribal Heartland",      stateSlug:"chhattisgarh",    destSlug:"bastar",            route:"/chhattisgarh/bastar" },
    { name:"KURUKSHETRA",   sub:"Mahabharata Battlefield",stateSlug:"haryana",        destSlug:"kurukshetra",       route:"/haryana/kurukshetra" },
    { name:"OLD DELHI",     sub:"Mughal Heart",          stateSlug:"delhi",           destSlug:"old-delhi",         route:"/delhi/old-delhi" },
    { name:"HUMAYUN TOMB",  sub:"Precursor to Taj",      stateSlug:"delhi",           destSlug:"humayun-tomb",      route:"/delhi/humayun-tomb" },
    { name:"AKSHARDHAM",    sub:"Grand Temple",          stateSlug:"delhi",           destSlug:"akshardham",        route:"/delhi/akshardham" },
    { name:"AUROVILLE",     sub:"Experimental City",     stateSlug:"puducherry",      destSlug:"auroville",         route:"/puducherry/auroville" },
    { name:"HAVELOCK ISLAND",sub:"Asia's Best Beach",    stateSlug:"andaman-nicobar-islands",destSlug:"havelock-island",route:"/andaman-nicobar-islands/havelock-island" },
    { name:"CELLULAR JAIL", sub:"Kala Pani",             stateSlug:"andaman-nicobar-islands",destSlug:"cellular-jail",route:"/andaman-nicobar-islands/cellular-jail" },
    { name:"BANGARAM ATOLL",sub:"Uninhabited Luxury",    stateSlug:"lakshadweep",     destSlug:"bangaram-atoll",    route:"/lakshadweep/bangaram-atoll" },
    { name:"PANGONG LAKE",  sub:"80km Azure Lake",       stateSlug:"ladakh-ut",       destSlug:"pangong-lake",      route:"/ladakh-ut/pangong-lake" },
    { name:"NUBRA VALLEY",  sub:"Sand Dunes & Camels",   stateSlug:"ladakh-ut",       destSlug:"nubra-valley",      route:"/ladakh-ut/nubra-valley" },
    { name:"ZANSKAR VALLEY",sub:"Frozen River Trek",     stateSlug:"ladakh-ut",       destSlug:"zanskar-valley",    route:"/ladakh-ut/zanskar-valley" },
];

// ── Marquee row — pauses on hover, items clickable ───────────────────────────
function MarqueeRow<T extends { name: string; sub: string }>({
    items,
    direction,
    duration,
    onItemClick,
    rowType,
}: {
    items: T[];
    direction: "left" | "right";
    duration: number;
    onItemClick: (item: T) => void;
    rowType: "state" | "dest";
}) {
    const [paused, setPaused] = useState(false);
    const doubled = [...items, ...items];

    const animationName = direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ display: "flex", minWidth: "max-content" }}
        >
            <div
                style={{
                    display: "flex",
                    minWidth: "max-content",
                    animation: `${animationName} ${duration}s linear infinite`,
                    animationPlayState: paused ? "paused" : "running",
                    willChange: "transform",
                }}
            >
                {doubled.map((item, i) => (
                    <MarqueeItem
                        key={`${item.name}-${i}`}
                        name={item.name}
                        sub={item.sub}
                        rowType={rowType}
                        onClick={() => onItemClick(item)}
                    />
                ))}
            </div>
        </div>
    );
}
// ── Single item ───────────────────────────────────────────────────────────────
const MarqueeItem = ({
    name, sub, rowType, onClick,
}: {
    name: string;
    sub: string;
    rowType: "state" | "dest";
    onClick: () => void;
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
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            {/* Name */}
            <span style={{
                fontSize: rowType === "state" ? "1.05rem" : "0.82rem",
                fontWeight: rowType === "state" ? 900 : 700,
                letterSpacing: rowType === "state" ? "0.3em" : "0.22em",
                textTransform: "uppercase",
                color: hovered
                    ? (rowType === "state" ? "rgba(255,255,255,0.95)" : "rgba(34,211,238,0.95)")
                    : (rowType === "state" ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.16)"),
                transition: "color 0.25s ease",
            }}>
                {name}
            </span>

            {/* Sub — cyan for states, white for dests on hover */}
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

            {/* Separator */}
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
const MarqueeSection = () => {

    // Placeholder handlers — swap these for router.push() when you wire routing
    const handleStateClick = (item: StateItem) => {
        console.log(`[ROUTE] → /${item.slug}`);
        // router.push(`/${item.slug}`);
    };

    const handleDestClick = (item: DestItem) => {
        console.log(`[ROUTE] → ${item.route}`);
        // router.push(item.route);
        // then: document.getElementById(`dest-${item.destSlug}`)?.scrollIntoView()
    };

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
            }} />

            {/* Row 1 — States, left to right, 65s */}
            <div style={{
                padding: "22px 0 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
            }}>
                <MarqueeRow
                    items={STATES}
                    direction="left"
                    duration={85}
                    onItemClick={handleStateClick}
                    rowType="state"
                />
            </div>

            {/* Row 2 — Destinations, right to left, 95s */}
            <div style={{ padding: "16px 0 22px", overflow: "hidden" }}>
                <MarqueeRow
                    items={DESTS}
                    direction="right"
                    duration={120}
                    onItemClick={handleDestClick}
                    rowType="dest"
                />
            </div>
        </section>
    );
};

export default MarqueeSection;