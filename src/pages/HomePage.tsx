import HeroSlider from "../components/hero/HeroSlider";
import MarqueeSection from "../components/sections/MarqueeSection";
import StateExplorer from "../components/sections/StateExplorer";
import { type IndiaState } from "../utils/travelData";

interface Props {
    onInterest: (place?: string, state?: string) => void;
    explorerState: IndiaState | null;
}

const HomePage = ({ onInterest, explorerState }: Props) => {
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
