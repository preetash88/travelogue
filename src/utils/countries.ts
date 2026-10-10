// Single source of truth for the country → region → destination data.
// Used by BOTH the StateExplorer (selector + cards) and the MarqueeSection,
// so the two can never disagree about what exists.

import {uniqueIndiaStates, type IndiaPlace} from "./travelData";

export interface Region {
    name: string;
    capital: string;
    tagline: string;
    places: IndiaPlace[];
}

export interface Country {
    code: string;
    flag: string;
    name: string;
    regionLabel: string;
    available: boolean;
    regions: Region[];
    comingSoonText: string;
}

const sortedIndiaStates = [...uniqueIndiaStates].sort((a, b) => a.state.localeCompare(b.state));

export const COUNTRIES: Country[] = [
    {
        code: "IN",
        flag: "🇮🇳",
        name: "India",
        regionLabel: "State / UT",
        available: true,
        comingSoonText: "",
        regions: sortedIndiaStates.map(s => ({name: s.state, capital: s.capital, tagline: s.tagline, places: s.places})),
    },
    {
        code: "BT",
        flag: "🇧🇹",
        name: "Bhutan",
        regionLabel: "Dzongkhag",
        available: false,
        comingSoonText: "Bhutan's 20 Dzongkhags — from Thimphu to Bumthang — are being curated. Coming soon.",
        regions: [
            {name: "Thimphu", capital: "Thimphu City", tagline: "The capital kingdom", places: []},
            {name: "Paro", capital: "Paro Town", tagline: "Tigers nest and river valleys", places: []},
            {name: "Punakha", capital: "Punakha Town", tagline: "Ancient winter capital", places: []},
            {name: "Bumthang", capital: "Jakar", tagline: "The spiritual heartland", places: []},
            {name: "Wangdue Phodrang", capital: "Wangdue Town", tagline: "Gateway to the south", places: []},
            {name: "Haa", capital: "Haa Town", tagline: "Hidden valley in the west", places: []},
        ],
    },
    {
        code: "LK",
        flag: "🇱🇰",
        name: "Sri Lanka",
        regionLabel: "Province",
        available: false,
        comingSoonText: "Sri Lanka's 9 Provinces — from the Cultural Triangle to the Southern Coast — are being curated. Coming soon.",
        regions: [
            {name: "Western Province", capital: "Colombo", tagline: "The urban coast", places: []},
            {name: "Central Province", capital: "Kandy", tagline: "Highlands and heritage", places: []},
            {name: "Southern Province", capital: "Galle", tagline: "Colonial forts and surf", places: []},
            {name: "Northern Province", capital: "Jaffna", tagline: "Tamil culture and temples", places: []},
            {name: "Eastern Province", capital: "Trincomalee", tagline: "Blue lagoons and beaches", places: []},
            {name: "North Western Province", capital: "Kurunegala", tagline: "Ancient kingdoms", places: []},
        ],
    },
    {
        code: "MV",
        flag: "🇲🇻",
        name: "Maldives",
        regionLabel: "Atoll",
        available: false,
        comingSoonText: "Maldives' 20 Atolls — from Malé to Addu — are being curated. Coming soon.",
        regions: [
            {name: "Malé Atoll", capital: "Malé City", tagline: "The urban island", places: []},
            {name: "Ari Atoll", capital: "Mahibadhoo", tagline: "Diving paradise", places: []},
            {name: "Baa Atoll", capital: "Eydhafushi", tagline: "UNESCO Biosphere", places: []},
            {name: "Addu Atoll", capital: "Hithadhoo", tagline: "Southernmost Maldives", places: []},
            {name: "Lhaviyani Atoll", capital: "Naifaru", tagline: "Resort islands", places: []},
            {name: "Noonu Atoll", capital: "Manadhoo", tagline: "Overwater bungalows", places: []},
        ],
    },
];