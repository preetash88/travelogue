import { useEffect, useState } from "react";
import HeroSlider from "../components/hero/HeroSlider";
import MarqueeSection from "../components/sections/MarqueeSection";
import StateExplorer from "../components/sections/StateExplorer";
import { type IndiaState } from "../utils/travelData";

interface Props {
    onInterest: (place?: string, state?: string) => void;
    explorerState: IndiaState | null;
}

const HomePage = ({ onInterest, explorerState }: Props) => {
    // The country picked in the explorer drives what the marquee above it shows.
    const [countryCode, setCountryCode] = useState("IN");

    // Save scroll position continuously so the Navbar can restore it when
    // the user returns here from a state page via the logo.
    useEffect(() => {
        const save = () => sessionStorage.setItem("home-scroll-y", String(Math.round(window.scrollY)));
        window.addEventListener("scroll", save, { passive: true });
        return () => window.removeEventListener("scroll", save);
    }, []);

    return (
        <>
            <HeroSlider onInterest={() => onInterest()} />
            <MarqueeSection countryCode={countryCode} />
            <StateExplorer
                onInterest={(place, state) => onInterest(place, state)}
                initialState={explorerState}
                countryCode={countryCode}
                onCountryChange={setCountryCode}
            />
        </>
    );
};

export default HomePage;