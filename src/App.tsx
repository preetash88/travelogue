import { useState } from "react";

import HeroSlider from "./components/hero/HeroSlider";
import Navbar from "./components/navbar/Navbar";
import MarqueeSection from "./components/sections/MarqueeSection";
import StateExplorer from "./components/sections/StateExplorer";
import BookingSection from "./components/sections/BookingSection";
import Footer from "./components/sections/Footer";

import PageTransition from "./components/transitions/PageTransition";
import AmbientParticles from "./components/ui/AmbientParticles";
import DynamicLighting from "./components/ui/DynamicLighting";
import InterestForm from "./components/ui/InterestForm";
import LoaderScreen from "./components/ui/LoaderScreen";
import LuxuryCursor from "./components/ui/LuxuryCursor";
import SmoothScroll from "./components/ui/SmoothScroll";
import DestinationPicker from "./components/ui/DestinationPicker";

import { type IndiaState } from "./utils/travelData";

function App() {
    const [formOpen, setFormOpen] = useState(false);
    const [prefilledPlace, setPrefilledPlace] = useState("");
    const [prefilledState, setPrefilledState] = useState("");

    // Destination picker state
    const [pickerOpen, setPickerOpen] = useState(false);

    // State selected via picker — passed into StateExplorer
    const [explorerState, setExplorerState] = useState<IndiaState | null>(null);

    const openForm = (place = "", state = "") => {
        setPrefilledPlace(place);
        setPrefilledState(state);
        setFormOpen(true);
    };

    const handleExplore = (_country: string, state: IndiaState) => {
        setExplorerState(state);
    };

    return (
        <SmoothScroll>
            <LoaderScreen />
            <PageTransition />

            <InterestForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                prefilledPlace={prefilledPlace}
                prefilledState={prefilledState}
            />

            <DestinationPicker
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onExplore={handleExplore}
            />

            <main className="relative overflow-x-hidden bg-[#050816] text-white"
                style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <DynamicLighting />
                <AmbientParticles />
                <LuxuryCursor />

                <Navbar 
                onContactClick={() => openForm()}
                onDestinationsClick={() => setPickerOpen(true)}
                 />

                <HeroSlider onInterest={() => openForm()} />

                <MarqueeSection />

                {/* <StorySection /> */}

                {/* <StickyShowcase /> */}

                {/* <StatsSection /> */}

                {/* <GallerySection /> */}

                <StateExplorer 
                onInterest={openForm}
                initialState={explorerState}
                 />

                {/* <DestinationCards /> */}

                {/* <VideoSection /> */}

                {/* <CTASection onInterest={() => openForm()} /> */}

                {/* <TestimonialSection /> */}

                <BookingSection onInterest={openForm} />

                <Footer onContactClick={() => openForm()} />
            </main>
        </SmoothScroll>
    );
}

export default App;