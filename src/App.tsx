import { useState } from "react";

import DestinationCards from "./components/cards/DestinationCards";
import HeroSlider from "./components/hero/HeroSlider";
import Navbar from "./components/navbar/Navbar";

import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";
import GallerySection from "./components/sections/GallerySection";
import MarqueeSection from "./components/sections/MarqueeSection";
import StatsSection from "./components/sections/StatsSection";
import StateExplorer from "./components/sections/StateExplorer";
import StickyShowcase from "./components/sections/StickyShowcase";
import StorySection from "./components/sections/StorySection";
import VideoSection from "./components/sections/VideoSection";
import BookingSection from "./components/sections/BookingSection";
import TestimonialSection from "./components/sections/TestimonialSection";

import PageTransition from "./components/transitions/PageTransition";

import AmbientParticles from "./components/ui/AmbientParticles";
import DynamicLighting from "./components/ui/DynamicLighting";
import InterestForm from "./components/ui/InterestForm";
import LoaderScreen from "./components/ui/LoaderScreen";
import LuxuryCursor from "./components/ui/LuxuryCursor";
import SmoothScroll from "./components/ui/SmoothScroll";

function App() {
    const [formOpen, setFormOpen] = useState(false);
    const [prefilledPlace, setPrefilledPlace] = useState("");
    const [prefilledState, setPrefilledState] = useState("");

    const openForm = (place = "", state = "") => {
        setPrefilledPlace(place);
        setPrefilledState(state);
        setFormOpen(true);
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

            <main className="relative overflow-x-hidden bg-[#050816] text-white" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <DynamicLighting />
                <AmbientParticles />
                <LuxuryCursor />

                <Navbar onContactClick={() => openForm()} />

                <HeroSlider onInterest={() => openForm()} />

                <MarqueeSection />

                {/* <StorySection /> */}

                {/* <StickyShowcase /> */}

                {/* <StatsSection /> */}

                {/* <GallerySection /> */}

                {/* <StateExplorer onInterest={openForm} /> */}

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