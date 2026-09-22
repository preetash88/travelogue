import iceland from "../assets/destinations/iceland.avif";
import bali from "../assets/destinations/bali2.avif";
import kerala from "../assets/destinations/kerala1.avif";
import norway from "../assets/destinations/norway2.avif";
import yosemite from "../assets/destinations/yosemite1.avif";
import antarctica from "../assets/destinations/antarctica1.avif";
import canada from "../assets/destinations/canadian1.avif";
import italy from "../assets/destinations/italy1.avif";
import netherlands from "../assets/destinations/netherlands1.avif";
import spain from "../assets/destinations/spain1.avif";
import sydney from "../assets/destinations/sydney1.avif";

// Varanasi placeholder — replace with your high-res Ganga Aarti / Ghat image
// when you source a copyright-free one. Drop it into src/assets/destinations/
// and update this import.
// e.g.: import varanasi from "../assets/destinations/varanasi_ghats.avif";
const varanasi = kerala; // ← placeholder: Kerala's warm tones are the closest match

export const destinations = [
    {
        id: 0,
        title: "VARANASI",
        location: "Kashi — The First City of the World",
        image: varanasi,
        description:
            "The eternal city on the Ganges. Watch the sacred Ganga Aarti at dawn, glide past ancient ghats in a wooden boat, and feel a civilisation older than time.",
        isDefault: true,
    },
    {
        id: 1,
        title: "KERALA",
        location: "God's Own Country",
        image: kerala,
        description:
            "Drift through emerald backwaters, sleep on a houseboat, and wake to spice-scented hill stations.",
    },
    {
        id: 2,
        title: "ICELAND",
        location: "Nordic Escape",
        image: iceland,
        description:
            "Aurora-lit skies, thundering waterfalls, and volcanic landscapes — nature at its most dramatic.",
    },
    {
        id: 3,
        title: "BALI",
        location: "Island Paradise",
        image: bali,
        description:
            "Rice terraces, ancient temples, and turquoise surf define this spiritual island escape.",
    },
    {
        id: 4,
        title: "NORWAY",
        location: "Norway Fjords",
        image: norway,
        description:
            "Glacier-carved fjords, midnight sun, and Viking heritage in the land of the northern lights.",
    },
    {
        id: 5,
        title: "YOSEMITE",
        location: "American National Parks",
        image: yosemite,
        description:
            "Half Dome at sunrise, giant sequoias, and mirror-still valleys — America's crown jewel.",
    },
    {
        id: 6,
        title: "ANTARCTICA",
        location: "Icy Antarctica",
        image: antarctica,
        description:
            "The last great wilderness — icebergs the size of cities and silence that speaks.",
    },
    {
        id: 7,
        title: "CANADA",
        location: "Canadian Rockies",
        image: canada,
        description:
            "Turquoise glacier lakes, moose-dotted forests, and skies so big they humble you.",
    },
    {
        id: 8,
        title: "ITALY",
        location: "Italian Alps",
        image: italy,
        description:
            "Renaissance art, Roman ruins, Dolomite peaks, and the world's finest cuisine.",
    },
    {
        id: 9,
        title: "NETHERLANDS",
        location: "Dutch Windmills",
        image: netherlands,
        description:
            "Tulip fields in bloom, canal-side cycling, and the quiet magic of Golden Age art.",
    },
    {
        id: 10,
        title: "SPAIN",
        location: "Ambient Barcelona",
        image: spain,
        description:
            "Gaudí's dreamscapes, flamenco rhythms, and a coastline made for golden evenings.",
    },
    {
        id: 11,
        title: "SYDNEY",
        location: "Sydney Opera House",
        image: sydney,
        description:
            "Harbour bridges, surf beaches, and a city that always feels like summer.",
    },
];

// ─── India State Explorer Data ────────────────────────────────────────────────
// 5 best places per state / UT.
// images: we reuse existing assets as placeholders.
// When you have real images, add them to src/assets/destinations/
// and update the image fields here.

export interface IndiaPlace {
    name: string;
    tagline: string;
    description: string;
    image: string; // local import or URL
    bestTime: string;
    type: string; // e.g. "Heritage", "Nature", "Spiritual"
}

export interface IndiaState {
    state: string;
    capital: string;
    tagline: string;
    places: IndiaPlace[];
}

const ph = {
    kerala,
    bali,
    iceland,
    norway,
    yosemite,
    antarctica,
    canada,
    italy,
    netherlands,
    spain,
    sydney,
    varanasi,
};

export const indiaStates: IndiaState[] = [
    {
        state: "Uttar Pradesh",
        capital: "Lucknow",
        tagline: "The soul of ancient India — Ganga, ghats, and grandeur.",
        places: [
            { name: "Varanasi (Kashi)", tagline: "The first city of the world", description: "Sacred ghats, Ganga Aarti at dawn, and a living civilisation older than history. A boat ride at sunrise here is a rite of passage.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Agra", tagline: "Where love was built in marble", description: "The Taj Mahal needs no introduction — but the Agra Fort and Mehtab Bagh across the river are equally breathtaking.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Ayodhya", tagline: "Birthplace of Lord Ram", description: "A city reborn — the Ram Mandir, the Saryu ghats, and the ancient temples make this one of India's holiest destinations.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Mathura & Vrindavan", tagline: "The land of Krishna", description: "Temple bells, Holi celebrations, and the divine fragrance of champa flowers fill these twin cities year-round.", image: ph.kerala, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Lucknow", tagline: "City of Nawabs and Tehzeeb", description: "Tunde ke Kababs, the Bara Imambara, and a culture of elegance that lingers long after you leave.", image: ph.spain, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Rajasthan",
        capital: "Jaipur",
        tagline: "Land of kings, forts, and the golden desert.",
        places: [
            { name: "Jaisalmer", tagline: "The Golden City in the Thar", description: "Sand dunes at twilight, camel safaris under a billion stars, and a fort that rises from the desert like a mirage.", image: ph.antarctica, bestTime: "Oct – Feb", type: "Desert" },
            { name: "Udaipur", tagline: "The City of Lakes", description: "Palaces floating on still lakes, rooftop dinners, and sunsets that turn the whole city gold.", image: ph.netherlands, bestTime: "Sep – Mar", type: "Heritage" },
            { name: "Jodhpur", tagline: "The Blue City", description: "A blue labyrinth of houses beneath the mighty Mehrangarh Fort — every alley is a photograph.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Ranthambore", tagline: "Where tigers rule the ruins", description: "India's most cinematic tiger reserve — spot a Bengal tiger against a 10th-century fort backdrop.", image: ph.yosemite, bestTime: "Oct – Jun", type: "Wildlife" },
            { name: "Pushkar", tagline: "The sacred lake town", description: "The world's only Brahma temple, pink-tinged sunrises over the ghats, and the legendary Pushkar Camel Fair.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
        ],
    },
    {
        state: "Kerala",
        capital: "Thiruvananthapuram",
        tagline: "God's Own Country — backwaters, spices, and serenity.",
        places: [
            { name: "Alleppey (Alappuzha)", tagline: "The Venice of the East", description: "Houseboat nights on the backwaters, coir-scented canals, and sunsets that turn the water to amber.", image: ph.kerala, bestTime: "Sep – Mar", type: "Backwaters" },
            { name: "Munnar", tagline: "Tea country in the clouds", description: "Rolling hills blanketed in green tea estates, misty mornings, and the rare Neelakurinji flower.", image: ph.norway, bestTime: "Sep – Mar", type: "Hills" },
            { name: "Wayanad", tagline: "Wild heart of Kerala", description: "Tribal villages, ancient caves, wildlife sanctuaries, and waterfalls hidden in dense jungle.", image: ph.yosemite, bestTime: "Oct – May", type: "Nature" },
            { name: "Kovalam", tagline: "Crescent of golden sand", description: "A lighthouse beach, Ayurvedic resorts, and some of the best seafood on the Malabar Coast.", image: ph.sydney, bestTime: "Sep – Mar", type: "Beach" },
            { name: "Thekkady (Periyar)", tagline: "Spice and wildlife", description: "Boat rides on Periyar Lake past wild elephants, cardamom estates, and bamboo rafting in the forest.", image: ph.canada, bestTime: "Sep – May", type: "Wildlife" },
        ],
    },
    {
        state: "Himachal Pradesh",
        capital: "Shimla",
        tagline: "Mountains, monasteries, and mountain air.",
        places: [
            { name: "Spiti Valley", tagline: "The middle land between India and Tibet", description: "Moon-like landscapes, ancient Buddhist monasteries at 4,000m, and roads that test your soul.", image: ph.iceland, bestTime: "Jun – Sep", type: "Adventure" },
            { name: "Manali", tagline: "Gateway to the Himalayas", description: "Snow peaks, the Rohtang Pass, river rafting on the Beas, and cosy cafes in Old Manali.", image: ph.norway, bestTime: "Oct – Jun", type: "Adventure" },
            { name: "Shimla", tagline: "The Queen of Hill Stations", description: "Colonial-era heritage, the iconic toy train, Mall Road walks, and snow in winter.", image: ph.canada, bestTime: "Mar – Jun, Dec – Jan", type: "Hills" },
            { name: "Dharamshala & McLeod Ganj", tagline: "Little Lhasa in the Himalayas", description: "The Dalai Lama's residence, Tibetan culture, and treks to the Triund ridge above the clouds.", image: ph.bali, bestTime: "Mar – Jun, Sep – Nov", type: "Culture" },
            { name: "Kasol & Parvati Valley", tagline: "Himalayan hippie heaven", description: "Trout streams, pine forests, Israeli cafes, and the famous Kheerganga hot springs trek.", image: ph.yosemite, bestTime: "Mar – Jun, Sep – Nov", type: "Trekking" },
        ],
    },
    {
        state: "Goa",
        capital: "Panaji",
        tagline: "Sun, sea, spice, and a Portuguese soul.",
        places: [
            { name: "Old Goa", tagline: "Baroque grandeur in the tropics", description: "The Basilica of Bom Jesus, Se Cathedral, and the smell of incense that floats through 500-year-old churches.", image: ph.italy, bestTime: "Nov – Feb", type: "Heritage" },
            { name: "Palolem Beach", tagline: "The most beautiful beach in India", description: "A perfect crescent of white sand, calm waters, and beach huts that let you fall asleep to the sound of waves.", image: ph.sydney, bestTime: "Nov – Feb", type: "Beach" },
            { name: "Dudhsagar Falls", tagline: "Milk sea in the jungle", description: "India's tallest waterfall cascades through lush Western Ghats forest — best reached by jeep through the wild.", image: ph.yosemite, bestTime: "Jun – Sep", type: "Nature" },
            { name: "Arambol", tagline: "Bohemian Goa", description: "A sweet freshwater lake behind the beach, drum circles at sunset, and the last patch of old Goa's free spirit.", image: ph.bali, bestTime: "Nov – Feb", type: "Beach" },
            { name: "Panaji", tagline: "Latin Quarter of India", description: "Fontainhas' painted Portuguese houses, feni in heritage bars, and the Mandovi River at golden hour.", image: ph.netherlands, bestTime: "Nov – Mar", type: "Culture" },
        ],
    },
    {
        state: "Uttarakhand",
        capital: "Dehradun",
        tagline: "Devbhoomi — the land of the gods.",
        places: [
            { name: "Valley of Flowers", tagline: "Himalayan meadow in full bloom", description: "A UNESCO World Heritage Site that explodes into 500 species of wildflowers each monsoon.", image: ph.norway, bestTime: "Jul – Aug", type: "Nature" },
            { name: "Rishikesh", tagline: "The yoga capital of the world", description: "Ganga rafting, suspension bridges, ashrams, and a spiritual energy that stays with you.", image: ph.varanasi, bestTime: "Sep – Jun", type: "Spiritual" },
            { name: "Kedarnath", tagline: "Shrine above the clouds", description: "One of the Char Dham — a trek through snow to a Shiva temple that has stood for 1,200 years.", image: ph.iceland, bestTime: "May – Jun, Sep – Oct", type: "Spiritual" },
            { name: "Jim Corbett National Park", tagline: "India's oldest tiger reserve", description: "Jeep safaris at dawn, elephant grass taller than your vehicle, and the distant roar of a Bengal tiger.", image: ph.yosemite, bestTime: "Nov – Jun", type: "Wildlife" },
            { name: "Auli", tagline: "India's ski destination", description: "Himalayan ski slopes, the world's highest gondola ride, and a view of Nanda Devi on a clear day.", image: ph.canada, bestTime: "Dec – Mar", type: "Adventure" },
        ],
    },
    {
        state: "Tamil Nadu",
        capital: "Chennai",
        tagline: "Dravidian temples, silk, and coastal grandeur.",
        places: [
            { name: "Madurai", tagline: "Temple city that never sleeps", description: "The Meenakshi Amman Temple's gopurams painted in vivid mythological figures — a living, breathing sacred city.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Ooty (Udhagamandalam)", tagline: "The Queen of the Nilgiris", description: "Toy train through tea estates, Nilgiri hills in a blue mist, and strawberry farms at cool altitude.", image: ph.norway, bestTime: "Apr – Jun, Sep – Nov", type: "Hills" },
            { name: "Mahabalipuram", tagline: "Shore temples and rock-cut art", description: "7th-century stone rathas by the sea, a Shore Temple at sunrise, and rock sculptures older than memory.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Rameswaram", tagline: "Island of pilgrims and sea", description: "The longest temple corridor in India, the Pamban Bridge, and the southernmost tip of the subcontinent.", image: ph.varanasi, bestTime: "Oct – Apr", type: "Spiritual" },
            { name: "Kodaikanal", tagline: "Princess of Hill Stations", description: "A star-shaped lake, silver cascade waterfalls, and pine forests wrapped in silver mist.", image: ph.canada, bestTime: "Apr – Jun, Sep – Oct", type: "Hills" },
        ],
    },
    {
        state: "Maharashtra",
        capital: "Mumbai",
        tagline: "From the Sahyadris to the sea.",
        places: [
            { name: "Mumbai", tagline: "Maximum city, infinite stories", description: "Marine Drive at night, the Gateway of India, Dharavi, Bollywood, and the best street food in the country.", image: ph.spain, bestTime: "Oct – Feb", type: "City" },
            { name: "Ajanta & Ellora Caves", tagline: "Rock-cut masterpieces", description: "Buddhist, Hindu, and Jain cave temples carved between the 2nd century BCE and 12th century CE.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Mahabaleshwar", tagline: "Strawberry country", description: "Panoramic valley views, strawberry farms, and crisp air above the Western Ghats.", image: ph.norway, bestTime: "Feb – May", type: "Hills" },
            { name: "Lonar Crater Lake", tagline: "A meteor made a lake", description: "The only saline crater lake in Asia, formed by a meteor 50,000 years ago — serene, eerie, and unforgettable.", image: ph.iceland, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Kolhapur", tagline: "The city of the goddess", description: "The Mahalakshmi Temple, royal palaces, kolhapuri chappals, and misal pav that needs no justification.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Karnataka",
        capital: "Bengaluru",
        tagline: "Garden city, ancient temples, and wild coastline.",
        places: [
            { name: "Hampi", tagline: "Ruins of the Vijayanagara Empire", description: "Boulder-strewn hills, a river, and the ghost of a 14th-century empire that stretched across the Deccan.", image: ph.italy, bestTime: "Oct – Feb", type: "Heritage" },
            { name: "Coorg (Kodagu)", tagline: "Scotland of India", description: "Coffee estates, misty hills, waterfalls, and a warrior culture that produced India's finest soldiers.", image: ph.norway, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Mysuru (Mysore)", tagline: "City of palaces and incense", description: "The Mysore Palace lit up at night is one of India's great spectacles — and the Dasara festival its crown.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Gokarna", tagline: "Sacred beach town", description: "Om Beach, Kudle Beach, and the Mahabaleshwar Temple — Goa's soul without the crowd.", image: ph.sydney, bestTime: "Oct – Mar", type: "Beach" },
            { name: "Chikmagalur", tagline: "Coffee country in the clouds", description: "The birthplace of Indian coffee, with Mullayanagiri rising above sea-level mist and bison in the forests.", image: ph.canada, bestTime: "Sep – Jan", type: "Hills" },
        ],
    },
    {
        state: "West Bengal",
        capital: "Kolkata",
        tagline: "Rabindranath, Rasgulla, and the River Ganges.",
        places: [
            { name: "Kolkata", tagline: "City of joy, city of intellect", description: "Howrah Bridge, hand-pulled rickshaws, the Durga Puja, and adda over chai — India's cultural capital.", image: ph.spain, bestTime: "Oct – Mar", type: "City" },
            { name: "Darjeeling", tagline: "Queen of the Hills and the tea", description: "Toy train, Tiger Hill sunrise with Kanchenjunga, and the finest first-flush Darjeeling tea.", image: ph.norway, bestTime: "Mar – May, Sep – Nov", type: "Hills" },
            { name: "Sundarbans", tagline: "The largest mangrove delta", description: "Royal Bengal tigers, estuarine crocodiles, and boat safaris through a shifting river delta that belongs to no one.", image: ph.canada, bestTime: "Oct – Mar", type: "Wildlife" },
            { name: "Bishnupur", tagline: "Terracotta temple town", description: "17th-century terra-cotta temples, Baluchari silk sarees, and the Malla king's palaces in laterite.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Murshidabad", tagline: "Nawab's capital on the Bhagirathi", description: "The Hazarduari Palace, the Imambara, and a crumbling grandeur that speaks of lost empires.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Gujarat",
        capital: "Gandhinagar",
        tagline: "Salt deserts, lions, and Gujarati hospitality.",
        places: [
            { name: "Rann of Kutch", tagline: "The white desert under moonlight", description: "A salt flat so vast it becomes a sea of white under the full moon — the Rann Utsav is India's most surreal festival.", image: ph.antarctica, bestTime: "Nov – Feb", type: "Nature" },
            { name: "Gir National Park", tagline: "Last refuge of the Asiatic lion", description: "The only place on Earth outside Africa where you can see lions in the wild.", image: ph.yosemite, bestTime: "Dec – Apr", type: "Wildlife" },
            { name: "Dwarka", tagline: "Krishna's kingdom by the sea", description: "One of the Char Dham — a temple city where the sea and the sacred converge.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Ahmedabad", tagline: "India's first World Heritage City", description: "Pol houses, the Sabarmati Ashram, and some of the finest Art Deco in Asia.", image: ph.netherlands, bestTime: "Oct – Feb", type: "Heritage" },
            { name: "Saputara", tagline: "Gujarat's only hill station", description: "Sunrise Lake, Saputa Valley, and the cool air of the Sahyadris in the heart of Gujarat.", image: ph.norway, bestTime: "Jun – Sep, Nov – Feb", type: "Hills" },
        ],
    },
    {
        state: "Punjab",
        capital: "Chandigarh",
        tagline: "The land of five rivers and the Golden Temple.",
        places: [
            { name: "Amritsar", tagline: "The Golden Temple & Wagah Border", description: "The Harmandir Sahib at dawn — gold reflected in still water — and the Wagah Border ceremony at sunset.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Chandigarh", tagline: "Le Corbusier's city", description: "India's most planned city — the Rock Garden, Sukhna Lake, and a grid that still feels futuristic.", image: ph.netherlands, bestTime: "Oct – Mar", type: "City" },
            { name: "Anandpur Sahib", tagline: "Birthplace of the Khalsa", description: "The Virasat-e-Khalsa museum is one of Asia's finest — and Hola Mohalla here is unlike anything else.", image: ph.varanasi, bestTime: "Feb – Mar, Oct – Nov", type: "Spiritual" },
            { name: "Fazilka", tagline: "India's last village before Pakistan", description: "A quiet border town with the atmosphere of Partition-era Punjab still thick in the air.", image: ph.antarctica, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Patiala", tagline: "City of royal heritage", description: "The Qila Mubarak, Sheesh Mahal, and the famous Patiala peg — this city pours generously.", image: ph.spain, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Madhya Pradesh",
        capital: "Bhopal",
        tagline: "The heart of India — tigers, temples, and tribes.",
        places: [
            { name: "Khajuraho", tagline: "Temples of love in stone", description: "10th-century Chandela temples adorned with breathtaking erotic and celestial sculptures — a UNESCO World Heritage Site.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Bandhavgarh", tagline: "Highest density of tigers in India", description: "Jeep safaris in dense sal forest, an ancient fort inside the park, and Bengal tigers at every turn.", image: ph.canada, bestTime: "Oct – Jun", type: "Wildlife" },
            { name: "Orchha", tagline: "A kingdom frozen in time", description: "Cenotaphs on the river, palaces that double as forest lodges, and the Chaturbhuj Temple.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Pachmarhi", tagline: "Queen of the Satpuras", description: "Waterfalls, ancient rock paintings, British-era bungalows, and the best jungle trails in central India.", image: ph.yosemite, bestTime: "Oct – Jun", type: "Nature" },
            { name: "Mandu", tagline: "City of love and monsoon", description: "A medieval hill fort city best seen in the rains — romantic, ruined, and utterly cinematic.", image: ph.norway, bestTime: "Jul – Sep, Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Jammu & Kashmir",
        capital: "Srinagar",
        tagline: "Paradise on Earth — houseboats, saffron, and snow.",
        places: [
            { name: "Srinagar", tagline: "Dal Lake and the Mughal Gardens", description: "A shikara at dawn on Dal Lake with the Himalayas behind the mist — nothing else comes close.", image: ph.norway, bestTime: "Apr – Oct", type: "Nature" },
            { name: "Gulmarg", tagline: "The meadow of flowers", description: "Asia's highest gondola, ski slopes in winter, and wildflower meadows in summer.", image: ph.iceland, bestTime: "Dec – Feb (ski), May – Sep (meadow)", type: "Adventure" },
            { name: "Pahalgam", tagline: "Valley of Shepherds", description: "The Lidder River, Betaab Valley, and the base camp for the Amarnath Yatra.", image: ph.canada, bestTime: "May – Sep", type: "Nature" },
            { name: "Leh", tagline: "The roof of the world", description: "Pangong Lake, Nubra Valley, sand dunes at 10,000 feet, and monasteries that cling to cliff faces.", image: ph.iceland, bestTime: "Jun – Sep", type: "Adventure" },
            { name: "Sonamarg", tagline: "Meadow of Gold", description: "A glacial valley that blazes gold in autumn — the gateway to Thajiwas Glacier.", image: ph.norway, bestTime: "May – Sep", type: "Nature" },
        ],
    },
    {
        state: "Andhra Pradesh",
        capital: "Amaravati",
        tagline: "Spiritual shores, spicy cuisine, and ancient dynasties.",
        places: [
            { name: "Tirupati", tagline: "The most visited pilgrimage in the world", description: "Lord Venkateswara on the Tirumala hills — more devotees visit here annually than the Vatican and Mecca combined.", image: ph.bali, bestTime: "Sep – Feb", type: "Spiritual" },
            { name: "Araku Valley", tagline: "The coffee valley of the Eastern Ghats", description: "Tribal culture, coffee plantations, and a train journey through 58 tunnels in the ghats.", image: ph.norway, bestTime: "Sep – Mar", type: "Nature" },
            { name: "Hampi (Andhra side)", tagline: "Deccan ruins", description: "Ancient temples, the Tungabhadra River, and a landscape that looks like it belongs to another planet.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Vizag (Visakhapatnam)", tagline: "The City of Destiny", description: "Rishikonda Beach, the Araku gorge, submarine museum, and the meeting of the Eastern Ghats and the Bay of Bengal.", image: ph.sydney, bestTime: "Oct – Feb", type: "City" },
            { name: "Lepakshi", tagline: "Hanging pillar and Nandi monolith", description: "A 16th-century Vijayanagara temple with a mysterious hanging pillar and India's largest Nandi statue.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Telangana",
        capital: "Hyderabad",
        tagline: "Biryani, pearls, and a Nizam's legacy.",
        places: [
            { name: "Hyderabad", tagline: "City of Nizams", description: "Charminar, Golconda Fort, Irani chai, and the world's most debated biryani.", image: ph.spain, bestTime: "Oct – Feb", type: "City" },
            { name: "Warangal", tagline: "Kakatiya capital", description: "The Thousand Pillar Temple and Ramappa Temple (UNESCO) — Kakatiya dynasty in stone.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Nagarjunasagar", tagline: "One of the world's largest dams", description: "A Buddhist island in a reservoir — ruins of the Nagarjunakonda civilisation beneath the water.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Medak", tagline: "Cathedral in rural Telangana", description: "The Medak Cathedral — one of India's most unexpected architectural wonders, in a small town.", image: ph.bali, bestTime: "Oct – Feb", type: "Heritage" },
            { name: "Pochampally", tagline: "Silk saree village", description: "The village where the Ikat weave was born — watch weavers at work and buy direct from the loom.", image: ph.spain, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Odisha",
        capital: "Bhubaneswar",
        tagline: "Temple city, tribal culture, and turtle coast.",
        places: [
            { name: "Puri", tagline: "Char Dham on the Bay of Bengal", description: "The Jagannath Temple, the Rath Yatra procession, and one of India's finest beaches.", image: ph.bali, bestTime: "Oct – Feb", type: "Spiritual" },
            { name: "Konark Sun Temple", tagline: "A chariot of stone", description: "A 13th-century temple designed as the sun god's chariot, with 24 intricately carved wheels.", image: ph.italy, bestTime: "Oct – Feb", type: "Heritage" },
            { name: "Chilika Lake", tagline: "Asia's largest coastal lagoon", description: "Flamingos, Irrawaddy dolphins, migratory birds, and a sunset that turns the whole lake red.", image: ph.netherlands, bestTime: "Nov – Mar", type: "Nature" },
            { name: "Simlipal National Park", tagline: "Tigers, elephants, and waterfalls", description: "A core zone of Project Tiger with ancient sal forests, the Barehipani waterfall, and tribal communities.", image: ph.canada, bestTime: "Nov – May", type: "Wildlife" },
            { name: "Raghurajpur", tagline: "Heritage craft village", description: "Every house in this village is an artist's studio — Pattachitra paintings, stone carving, and palm leaf art.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Bihar",
        capital: "Patna",
        tagline: "The cradle of empires, Buddhism, and Magadha.",
        places: [
            { name: "Bodh Gaya", tagline: "Where the Buddha attained enlightenment", description: "The Mahabodhi Temple, the Bodhi Tree, and an international community of Buddhist pilgrims from across the world.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Nalanda", tagline: "The ancient university", description: "The ruins of the world's first residential university, where Xuanzang once studied Sanskrit and logic.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Rajgir", tagline: "Capital of ancient Magadha", description: "The Griddhakuta hill where the Buddha preached, hot springs, and the Japanese Peace Pagoda.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Vaishali", tagline: "Birthplace of Lord Mahavira", description: "One of the world's first republics — ancient pillars of Ashoka and the Buddha's last sermon site.", image: ph.bali, bestTime: "Oct – Feb", type: "Heritage" },
            { name: "Vikramshila", tagline: "The lost tantric university", description: "A 8th-century Buddhist centre of learning whose ruins sit on the banks of the Ganges.", image: ph.iceland, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Assam",
        capital: "Dispur",
        tagline: "Tea gardens, rhinos, and the Brahmaputra.",
        places: [
            { name: "Kaziranga National Park", tagline: "Last stronghold of the one-horned rhino", description: "Two-thirds of the world's Indian rhinoceros population, tigers, elephants, and the Brahmaputra at the edge.", image: ph.canada, bestTime: "Nov – Apr", type: "Wildlife" },
            { name: "Manas National Park", tagline: "UNESCO World Heritage, wildlife wonder", description: "Golden langur, pygmy hog, and clouded leopard in a UNESCO Tiger Reserve at the Bhutan foothills.", image: ph.yosemite, bestTime: "Nov – Apr", type: "Wildlife" },
            { name: "Majuli", tagline: "World's largest river island", description: "A freshwater island in the Brahmaputra with ancient satras (monasteries), Vaishnavite culture, and mask making.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
            { name: "Tezpur", tagline: "The city of blood and beauty", description: "Ancient temples, tea estates, and the Da Parbatia sculptures that are among India's earliest Hindu art.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Haflong", tagline: "The Switzerland of Assam", description: "A hill station in Dima Hasao with a sapphire lake, pine forests, and tribal Dimasa culture.", image: ph.norway, bestTime: "Oct – Apr", type: "Hills" },
        ],
    },
    {
        state: "Sikkim",
        capital: "Gangtok",
        tagline: "Buddhist kingdom beneath Kanchenjunga.",
        places: [
            { name: "Gangtok", tagline: "The hilltop capital", description: "Rumtek Monastery, a cable car above the clouds, and a view of Kanchenjunga that stops your breath.", image: ph.norway, bestTime: "Mar – May, Oct – Dec", type: "Hills" },
            { name: "Gurudongmar Lake", tagline: "One of the world's highest lakes", description: "A sacred lake at 17,800 feet that never fully freezes — pilgrims trek here in reverence and awe.", image: ph.iceland, bestTime: "May – Nov", type: "Nature" },
            { name: "Pelling", tagline: "Kanchenjunga at your window", description: "Rabdentse ruins, Khangchendzonga falls, and the world's longest skywalk at 100m above a ravine.", image: ph.canada, bestTime: "Mar – Jun, Sep – Dec", type: "Nature" },
            { name: "Yumthang Valley", tagline: "Valley of Flowers at 11,000 feet", description: "Hot springs, yaks, and a meadow of primula and rhododendrons in the North Sikkim wilderness.", image: ph.iceland, bestTime: "Apr – May", type: "Nature" },
            { name: "Yuksom", tagline: "First capital of Sikkim", description: "The starting point of the Goecha La trek, ancient coronation sites, and the deepest feeling of the Himalaya.", image: ph.yosemite, bestTime: "Mar – May, Sep – Nov", type: "Adventure" },
        ],
    },
    {
        state: "Meghalaya",
        capital: "Shillong",
        tagline: "The abode of clouds — wettest, greenest, most beautiful.",
        places: [
            { name: "Cherrapunji (Sohra)", tagline: "The wettest place on Earth", description: "Double-decker living root bridges, Nohkalikai Falls dropping 1,115 feet, and clouds that flow through your fingers.", image: ph.yosemite, bestTime: "Jun – Sep (waterfalls), Oct – May (clear)", type: "Nature" },
            { name: "Dawki", tagline: "The transparent river", description: "The Umngot River is so clear your boat appears to float on glass — best seen at dawn.", image: ph.norway, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Mawlynnong", tagline: "Asia's cleanest village", description: "A Khasi village so spotless it has won the title multiple times — a lesson in community pride.", image: ph.bali, bestTime: "Oct – Jun", type: "Culture" },
            { name: "Shillong", tagline: "Scotland of the East", description: "Elephant Falls, Ward's Lake, rock music culture, and a cool climate that never wears out its welcome.", image: ph.canada, bestTime: "Apr – Jun, Sep – Nov", type: "City" },
            { name: "Nongkhnum Island", tagline: "India's largest river island in Meghalaya", description: "A sandbar river island with rice fields, orchards, and the Khynriam and Nongkhnum rivers on either side.", image: ph.netherlands, bestTime: "Oct – Apr", type: "Nature" },
        ],
    },
    {
        state: "Arunachal Pradesh",
        capital: "Itanagar",
        tagline: "The land of the dawn-lit mountains.",
        places: [
            { name: "Tawang", tagline: "The largest Buddhist monastery in India", description: "A 17th-century monastery at 10,000 feet, glacial lakes, and the Sela Pass in perpetual snow.", image: ph.iceland, bestTime: "Mar – Oct", type: "Spiritual" },
            { name: "Ziro Valley", tagline: "Apatani tribe and rice fields", description: "UNESCO-nominated rice fields, the Apatani tribe, and the Ziro Music Festival in the bamboo groves.", image: ph.norway, bestTime: "Sep – Oct, Mar – May", type: "Culture" },
            { name: "Namdapha National Park", tagline: "Tiger, snow leopard, elephant, clouded leopard", description: "One of India's most biodiverse parks — four big cats, three primate species, and forests that have never been logged.", image: ph.canada, bestTime: "Nov – Apr", type: "Wildlife" },
            { name: "Mechuka", tagline: "Hidden valley near the China border", description: "An almost secret valley with a medieval monastery, a glacial river, and peaks above 7,000m.", image: ph.iceland, bestTime: "Oct – May", type: "Adventure" },
            { name: "Dong", tagline: "India's easternmost point", description: "The first place in India to see the sunrise — a village where dawn arrives before the rest of the country wakes.", image: ph.bali, bestTime: "Oct – Mar", type: "Nature" },
        ],
    },
    {
        state: "Nagaland",
        capital: "Kohima",
        tagline: "Naga warrior culture and the Hornbill Festival.",
        places: [
            { name: "Hornbill Festival, Kisama", tagline: "Festival of Festivals", description: "All 16 Naga tribes gather in December — a festival of dance, war chants, traditional food, and warrior attire.", image: ph.bali, bestTime: "Dec 1–10", type: "Culture" },
            { name: "Kohima War Cemetery", tagline: "The battle that saved India", description: "The WWII Battle of Kohima is called the 'turning point of the Pacific War' — a cemetery of extraordinary solemnity.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Dzükou Valley", tagline: "The valley of flowers of the Northeast", description: "A high-altitude valley that blooms with seasonal wildflowers accessible from both Nagaland and Manipur.", image: ph.yosemite, bestTime: "Jul – Sep (flowers), Dec – Jan (snow)", type: "Nature" },
            { name: "Mokokchung", tagline: "Ao Naga heartland", description: "The cultural capital of the Ao tribe — morungs (youth dormitories), ancient village trails, and rice wine.", image: ph.canada, bestTime: "Oct – Apr", type: "Culture" },
            { name: "Khonoma", tagline: "India's first green village", description: "A Naga village that banned hunting in 1998 — now a conservation model with wildlife coming back.", image: ph.norway, bestTime: "Sep – Mar", type: "Nature" },
        ],
    },
    {
        state: "Manipur",
        capital: "Imphal",
        tagline: "The jewelled land — Loktak, dance, and orchids.",
        places: [
            { name: "Loktak Lake", tagline: "The floating island lake", description: "Circular floating islands of vegetation (phumdis) on India's largest freshwater lake — and the last home of the brow-antlered deer.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Keibul Lamjao National Park", tagline: "The only floating national park in the world", description: "Built on the phumdis of Loktak, this park protects the endangered Sangai (brow-antlered deer) — unique on Earth.", image: ph.canada, bestTime: "Oct – Mar", type: "Wildlife" },
            { name: "Imphal", tagline: "The women's market and war cemeteries", description: "Ima Keithel — a market run exclusively by women for 500 years — and WWII cemeteries that move you to silence.", image: ph.spain, bestTime: "Oct – Mar", type: "Culture" },
            { name: "Dzükou Valley (Manipur side)", tagline: "Shared with Nagaland", description: "Trek from Manipur into this high-altitude wildflower paradise straddling the state border.", image: ph.yosemite, bestTime: "Jul – Sep, Dec – Jan", type: "Nature" },
            { name: "Moreh", tagline: "India-Myanmar border town", description: "A frontier bazaar where Indian and Burmese traders meet — teak, jade, and textiles from both sides.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Mizoram",
        capital: "Aizawl",
        tagline: "The land of blue hills, bamboo forests, and song.",
        places: [
            { name: "Aizawl", tagline: "City on a ridge", description: "A city built vertically on a mountain ridge — bazaars, churches, and sunsets over the Tlawng valley.", image: ph.spain, bestTime: "Oct – May", type: "City" },
            { name: "Phawngpui Blue Mountain", tagline: "Roof of Mizoram", description: "Mizoram's highest peak (2,157m) with rare orchids, serow, and the ghost of Mizo folklore.", image: ph.norway, bestTime: "Oct – Apr", type: "Nature" },
            { name: "Vantawng Falls", tagline: "Highest waterfall in Mizoram", description: "A 750-foot cascade through dense bamboo forest — best reached on a forest trail.", image: ph.yosemite, bestTime: "Jul – Oct", type: "Nature" },
            { name: "Reiek Heritage Village", tagline: "Mizo culture preserved", description: "Traditional Mizo houses, the Ramhuai stone, and panoramic views of the surrounding hills.", image: ph.bali, bestTime: "Oct – Apr", type: "Culture" },
            { name: "Champhai", tagline: "Fruit bowl of Mizoram", description: "A valley town on the Myanmar border with fruit orchards, the Rih Dil lake legend, and the Murlen forest.", image: ph.canada, bestTime: "Oct – Mar", type: "Nature" },
        ],
    },
    {
        state: "Tripura",
        capital: "Agartala",
        tagline: "Palace, pilgrimage, and pristine forest.",
        places: [
            { name: "Ujjayanta Palace", tagline: "Maháraja's palace in the city", description: "A 1901 palace with Mughal and Baroque elements, now a state museum with Tripuri tribal artifacts.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Neermahal", tagline: "Water palace in a lake", description: "A summer palace built in the middle of Rudrasagar Lake — reached by boat and glowing at sunset.", image: ph.netherlands, bestTime: "Sep – Mar", type: "Heritage" },
            { name: "Tripura Sundari Temple", tagline: "One of 51 Shakti Peethas", description: "An ancient temple with a sacred tank and one of the most revered Devi shrines in eastern India.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Jampui Hills", tagline: "Mist and orange blossom", description: "The northernmost hill range in Tripura, with Mizo communities, orange orchards, and spectacular views.", image: ph.norway, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Unakoti", tagline: "Rock-cut Shiva heads in the jungle", description: "Ninth-century rock-cut sculptures of Shiva — one head 30 feet tall — hidden in a jungle waterfall setting.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Jharkhand",
        capital: "Ranchi",
        tagline: "Waterfalls, tribal culture, and the Santhal heartland.",
        places: [
            { name: "Hundru Falls", tagline: "Subarnarekha in free fall", description: "One of the highest waterfalls in Jharkhand — the Subarnarekha River drops 98m into a gorge of ancient rocks.", image: ph.yosemite, bestTime: "Jul – Oct", type: "Nature" },
            { name: "Betla National Park", tagline: "Palamau Tiger Reserve", description: "One of India's original nine tiger reserves, with leopards, elephants, and Mughal-era fort ruins inside the forest.", image: ph.canada, bestTime: "Nov – Mar", type: "Wildlife" },
            { name: "Deoghar (Baidyanath Dham)", tagline: "Jyotirlinga in the jungle", description: "One of the 12 Jyotirlingas of Shiva — the Shravani Mela brings millions of devotees carrying Ganga water.", image: ph.varanasi, bestTime: "Jul – Aug (Mela), Oct – Mar (pilgrimage)", type: "Spiritual" },
            { name: "Rajrappa", tagline: "Confluence of rivers and goddesses", description: "The Bhairavi Temple at the confluence of Damodar and Bhairavi rivers — a sacred site of ancient power.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Panchghagh Falls", tagline: "Five streams, one plunge", description: "Five mountain streams converge and fall together — a natural wonder in the Chakradharpur wilderness.", image: ph.norway, bestTime: "Aug – Oct", type: "Nature" },
        ],
    },
    {
        state: "Chhattisgarh",
        capital: "Raipur",
        tagline: "Ancient temples, tribal heartland, and hidden waterfalls.",
        places: [
            { name: "Chitrakote Falls", tagline: "India's Niagara", description: "The widest waterfall in India — the Indravati River spreads almost a kilometre before its horseshoe plunge.", image: ph.yosemite, bestTime: "Jul – Nov", type: "Nature" },
            { name: "Sirpur", tagline: "Buddhist ruins on the Mahanadi", description: "5th-century temples, Buddhist stupas, and the Gandheshwar Temple that resisted centuries of invasion.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Bastar (Jagdalpur)", tagline: "Tribal art and Gondi culture", description: "Dhokra metal casting, the Bastar Dussehra, and tribal markets where ancient customs still govern daily life.", image: ph.bali, bestTime: "Oct – Feb", type: "Culture" },
            { name: "Kanger Valley National Park", tagline: "Limestone caves and flying squirrels", description: "The Kotumsar Cave — one of India's longest natural caves — with stalactites, blind fish, and underground rivers.", image: ph.canada, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Mainpat", tagline: "Chhattisgarh's mini Tibet", description: "A Tibetan refugee colony settled in a plateau — monasteries, yaks, and a tiger point above the forest.", image: ph.norway, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Haryana",
        capital: "Chandigarh",
        tagline: "Battlefields, pilgrimages, and the granary of India.",
        places: [
            { name: "Kurukshetra", tagline: "Where the Mahabharata was fought", description: "The sacred battlefield of the Gita, the Brahma Sarovar, and the Jyotisar — where Krishna spoke to Arjuna.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Sultanpur Bird Sanctuary", tagline: "Flamingos on the Delhi outskirts", description: "A wetland sanctuary with Siberian cranes, painted storks, and over 100 migratory species from November.", image: ph.netherlands, bestTime: "Nov – Mar", type: "Nature" },
            { name: "Panipat", tagline: "Three battles that made India", description: "The site of three pivotal battles that decided India's rulers — a rich museum tells all three stories.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Morni Hills", tagline: "Haryana's only hill station", description: "Twin lakes, a Shiva temple on the hilltop, and the Shivalik hills rising from the plains.", image: ph.norway, bestTime: "Feb – Jun, Sep – Nov", type: "Hills" },
            { name: "Pinjore (Yadavindra Gardens)", tagline: "Mughal terraced gardens", description: "Terraced gardens designed in the Mughal style by Nawab Fidai Khan under Aurangzeb.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Himachal Pradesh",
        capital: "Shimla",
        tagline: "Mountains, monasteries, and mountain air.",
        places: [
            { name: "Spiti Valley", tagline: "The middle land between India and Tibet", description: "Moon-like landscapes, ancient Buddhist monasteries at 4,000m, and roads that test your soul.", image: ph.iceland, bestTime: "Jun – Sep", type: "Adventure" },
            { name: "Manali", tagline: "Gateway to the Himalayas", description: "Snow peaks, the Rohtang Pass, river rafting on the Beas, and cosy cafes in Old Manali.", image: ph.norway, bestTime: "Oct – Jun", type: "Adventure" },
            { name: "Shimla", tagline: "The Queen of Hill Stations", description: "Colonial-era heritage, the iconic toy train, Mall Road walks, and snow in winter.", image: ph.canada, bestTime: "Mar – Jun, Dec – Jan", type: "Hills" },
            { name: "Dharamshala & McLeod Ganj", tagline: "Little Lhasa in the Himalayas", description: "The Dalai Lama's residence, Tibetan culture, and treks to the Triund ridge above the clouds.", image: ph.bali, bestTime: "Mar – Jun, Sep – Nov", type: "Culture" },
            { name: "Kasol & Parvati Valley", tagline: "Himalayan hippie heaven", description: "Trout streams, pine forests, Israeli cafes, and the famous Kheerganga hot springs trek.", image: ph.yosemite, bestTime: "Mar – Jun, Sep – Nov", type: "Trekking" },
        ],
    },
    // Union Territories
    {
        state: "Delhi",
        capital: "New Delhi",
        tagline: "Eight cities in one — empires layered upon empires.",
        places: [
            { name: "Old Delhi", tagline: "Mughal heart of the capital", description: "Jama Masjid, Chandni Chowk, the Red Fort, and parathas at Paranthe Wali Gali — history at full volume.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Humayun's Tomb", tagline: "The precursor to the Taj", description: "A UNESCO site that directly inspired the Taj Mahal — Persian gardens, red sandstone, and white marble domes.", image: ph.bali, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Qutub Minar", tagline: "Tallest brick minaret in the world", description: "A 73m victory tower and the nearby Iron Pillar that has not rusted in 1,600 years.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Lodhi Garden", tagline: "Tombs in a park", description: "15th-century Sayyid and Lodi dynasty tombs in a beautifully maintained garden — Delhi's most peaceful hour.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Akshardham Temple", tagline: "Largest Hindu temple complex in the world", description: "A Guinness World Record holder — entirely hand-carved in pink sandstone, with no steel, no concrete.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
        ],
    },
    {
        state: "Puducherry",
        capital: "Puducherry",
        tagline: "A French town on the Coromandel Coast.",
        places: [
            { name: "French Quarter (White Town)", tagline: "Boulevards by the Bay of Bengal", description: "Colonial bungalows painted in ochre and cream, bougainvillea walls, and French-named streets by the sea.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Auroville", tagline: "The city that belongs to no nation", description: "An intentional community founded in 1968 — the Matrimandir geodesic dome is its spiritual centre.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
            { name: "Serenity Beach", tagline: "Sunrise and surf", description: "Pondicherry's quieter northern beach — good surf, sunrise yoga, and fresh fish at the shacks.", image: ph.sydney, bestTime: "Oct – Mar", type: "Beach" },
            { name: "Sri Aurobindo Ashram", tagline: "Philosophy made architecture", description: "A spiritual centre that draws seekers from across the world — the Samadhi (tomb) of Sri Aurobindo and The Mother.", image: ph.varanasi, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Paradise Beach", tagline: "Reached only by boat", description: "A pristine beach accessible only by a short boat ride — white sand, clear water, no vehicles allowed.", image: ph.sydney, bestTime: "Nov – Mar", type: "Beach" },
        ],
    },
    {
        state: "Andaman & Nicobar Islands",
        capital: "Port Blair",
        tagline: "Emerald islands, coral reefs, and cellular history.",
        places: [
            { name: "Havelock Island (Swaraj Dweep)", tagline: "Radhanagar — Asia's best beach", description: "A beach so consistently ranked among Asia's finest that the Andaman Tourism board barely needs to advertise.", image: ph.sydney, bestTime: "Oct – May", type: "Beach" },
            { name: "Neil Island (Shaheed Dweep)", tagline: "The quiet Andaman", description: "Natural rock bridges, bioluminescent plankton in the coves at night, and a village pace that heals.", image: ph.bali, bestTime: "Oct – May", type: "Beach" },
            { name: "Cellular Jail, Port Blair", tagline: "The 'Kala Pani' of the freedom fighters", description: "The colonial prison where India's freedom fighters were exiled — the Light & Sound show is deeply moving.", image: ph.netherlands, bestTime: "Oct – May", type: "Heritage" },
            { name: "Baratang Island", tagline: "Limestone caves and mangroves", description: "A boat through a creek lined by mangroves, past a tribal reserve, to limestone caves and a mud volcano.", image: ph.canada, bestTime: "Oct – May", type: "Nature" },
            { name: "Ross Island (Netaji Subhash Chandra Bose Island)", tagline: "Ruins eaten by roots", description: "A ghost island where jungle roots have swallowed British colonial buildings — deer walk freely between the ruins.", image: ph.italy, bestTime: "Oct – May", type: "Heritage" },
        ],
    },
    {
        state: "Lakshadweep",
        capital: "Kavaratti",
        tagline: "Coral lagoons, coconut islands, and the bluest water in India.",
        places: [
            { name: "Agatti Island", tagline: "India's only coral island with an airstrip", description: "Your gateway to Lakshadweep — land on a coral runway beside a turquoise lagoon.", image: ph.sydney, bestTime: "Oct – May", type: "Beach" },
            { name: "Bangaram Atoll", tagline: "Uninhabited coral luxury", description: "A private island resort on an uninhabited atoll — turtles nesting on the beach, rays in the lagoon.", image: ph.bali, bestTime: "Oct – May", type: "Beach" },
            { name: "Kavaratti", tagline: "The capital under coconut palms", description: "The Ujra Mosque with its whale bone ceiling, a marine aquarium, and the best Malabar biryani outside Kerala.", image: ph.spain, bestTime: "Oct – May", type: "Culture" },
            { name: "Minicoy Island", tagline: "The island with a Maldivian soul", description: "Mahl-speaking islanders, a 19th-century lighthouse, tuna fishing culture, and the Lava dance.", image: ph.netherlands, bestTime: "Oct – May", type: "Culture" },
            { name: "Kalpeni Island", tagline: "Three islands, one lagoon", description: "A lagoon shared with Tilakkam and Pitti islands — the clearest water for snorkelling in India.", image: ph.sydney, bestTime: "Oct – May", type: "Beach" },
        ],
    },
    {
        state: "Dadra & Nagar Haveli and Daman & Diu",
        capital: "Daman",
        tagline: "Portuguese forts, quiet beaches, and jungle tribes.",
        places: [
            { name: "Diu Fort", tagline: "Portuguese bastion by the sea", description: "A 16th-century sea fort with cannons still aimed at the horizon — and sunsets that justify every kilometre.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Nagoa Beach, Diu", tagline: "Palms on a Portuguese coast", description: "A horseshoe beach lined with hoka palms — calm, clean, and entirely different from Indian mainland beaches.", image: ph.sydney, bestTime: "Oct – Mar", type: "Beach" },
            { name: "Vanganga Lake Garden, Silvassa", tagline: "An island garden in tribal country", description: "A freshwater lake island with gardens, boating, and the Warli tribal paintings of the surrounding villages.", image: ph.netherlands, bestTime: "Nov – Feb", type: "Nature" },
            { name: "Satmaliya Deer Park", tagline: "Deer and crocs in the jungle", description: "Spotted deer, peacocks, and a crocodile enclosure in the forest tribal belt of Dadra.", image: ph.canada, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Daman Jetty", tagline: "Where fishermen and history meet", description: "An evening at the jetty watching the fishing fleet return — the light is extraordinary and the fried fish is better.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
        ],
    },
    {
        state: "Chandigarh (UT)",
        capital: "Chandigarh",
        tagline: "Le Corbusier's masterplan meets Nek Chand's dream.",
        places: [
            { name: "Rock Garden", tagline: "A recycled world of 5,000 sculptures", description: "Nek Chand built this 40-acre sculpture garden from industrial waste and demolished building material — secretly.", image: ph.bali, bestTime: "Oct – Mar", type: "Culture" },
            { name: "Sukhna Lake", tagline: "Sunrise walks by the water", description: "A man-made reservoir at the foot of the Shivaliks — migrating birds in winter and rowing at dawn.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Nature" },
            { name: "Capitol Complex", tagline: "UNESCO Le Corbusier landmark", description: "The High Court, Secretariat, and Assembly building — icons of 20th-century modernist architecture.", image: ph.italy, bestTime: "Oct – Mar", type: "Heritage" },
            { name: "Rose Garden", tagline: "Asia's largest rose garden", description: "1,600 species of roses spread over 30 acres — best on a February morning at peak bloom.", image: ph.norway, bestTime: "Feb – Apr", type: "Nature" },
            { name: "Pinjore Heritage Gardens", tagline: "Mughal terraces near the city", description: "A short drive away — terraced Mughal gardens that rival Srinagar's Shalimar Bagh for geometry and calm.", image: ph.netherlands, bestTime: "Oct – Mar", type: "Heritage" },
        ],
    },
    {
        state: "Ladakh (UT)",
        capital: "Leh",
        tagline: "The last frontier — moonscapes, gompas, and the highest roads.",
        places: [
            { name: "Pangong Tso Lake", tagline: "80km lake on the Tibetan plateau", description: "Famous from 3 Idiots — but at 4,350m, the lake turns green, blue, and violet as the day shifts.", image: ph.iceland, bestTime: "May – Sep", type: "Nature" },
            { name: "Nubra Valley", tagline: "Sand dunes between glaciers", description: "Double-humped Bactrian camels on Hunder dunes, apricot orchards, and the Diskit Monastery.", image: ph.antarctica, bestTime: "Jun – Sep", type: "Adventure" },
            { name: "Hemis Monastery", tagline: "Ladakh's largest monastery", description: "The home of the Hemis Festival — masked Cham dances, thangkas unfurled at dawn, and the scent of butter lamps.", image: ph.bali, bestTime: "Jun – Sep", type: "Spiritual" },
            { name: "Zanskar Valley", tagline: "The frozen river trek", description: "The Chadar Trek on the frozen Zanskar River in January — one of the most extreme and beautiful walks on Earth.", image: ph.iceland, bestTime: "Jan – Feb (Chadar), Jun – Sep (valley)", type: "Adventure" },
            { name: "Tso Moriri", tagline: "Flamingos at altitude", description: "A high-altitude lake with black-necked cranes, bar-headed geese, and peaks above 6,000m on all sides.", image: ph.norway, bestTime: "Jun – Sep", type: "Nature" },
        ],
    },
    {
        state: "Jharkhand",
        capital: "Ranchi",
        tagline: "Waterfalls, tribal culture, and the Santhal heartland.",
        places: [
            { name: "Hundru Falls", tagline: "Subarnarekha in free fall", description: "One of the highest waterfalls in Jharkhand — the Subarnarekha River drops 98m into a gorge of ancient rocks.", image: ph.yosemite, bestTime: "Jul – Oct", type: "Nature" },
            { name: "Betla National Park", tagline: "Palamau Tiger Reserve", description: "One of India's original nine tiger reserves, with leopards, elephants, and Mughal-era fort ruins inside the forest.", image: ph.canada, bestTime: "Nov – Mar", type: "Wildlife" },
            { name: "Deoghar (Baidyanath Dham)", tagline: "Jyotirlinga in the jungle", description: "One of the 12 Jyotirlingas of Shiva — the Shravani Mela brings millions of devotees carrying Ganga water.", image: ph.varanasi, bestTime: "Jul – Aug (Mela), Oct – Mar (pilgrimage)", type: "Spiritual" },
            { name: "Rajrappa", tagline: "Confluence of rivers and goddesses", description: "The Bhairavi Temple at the confluence of Damodar and Bhairavi rivers — a sacred site of ancient power.", image: ph.bali, bestTime: "Oct – Mar", type: "Spiritual" },
            { name: "Panchghagh Falls", tagline: "Five streams, one plunge", description: "Five mountain streams converge and fall together — a natural wonder in the Chakradharpur wilderness.", image: ph.norway, bestTime: "Aug – Oct", type: "Nature" },
        ],
    },
];

// dedupe states (Himachal Pradesh appears twice — filter)
const seen = new Set<string>();
export const uniqueIndiaStates = indiaStates.filter((s) => {
    const key = s.state;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
});