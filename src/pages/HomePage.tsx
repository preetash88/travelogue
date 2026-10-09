import HeroSlider from "../components/hero/HeroSlider";
import MarqueeSection from "../components/sections/MarqueeSection";
import StateExplorer from "../components/sections/StateExplorer";
import { type IndiaState } from "../utils/travelData";
import {useEffect} from "react";

interface Props {
    onInterest: (place?: string, state?: string) => void;
    explorerState: IndiaState | null;
}

const HomePage = ({ onInterest, explorerState }: Props) => {

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
            <MarqueeSection />
            <StateExplorer
                onInterest={(place, state) => onInterest(place, state)}
                initialState={explorerState}
            />
        </>
    );
};

export default HomePage;
