import DestinationCards from "./components/cards/DestinationCards";
import HeroSlider from "./components/hero/HeroSlider";
import Navbar from "./components/navbar/Navbar";
import MarqueeSection from "./components/sections/MarqueeSection";
import StickyShowcase from "./components/sections/StickyShowcase";
import StorySection from "./components/sections/StorySection";
import VideoSection from "./components/sections/VideoSection";
import AmbientParticles from "./components/ui/AmbientParticles";
import LuxuryCursor from "./components/ui/LuxuryCursor";
import SmoothScroll from "./components/ui/SmoothScroll";

function App() {
    return (
        <SmoothScroll>
            <main className="relative overflow-hidden bg-[#050816] text-white">
                <AmbientParticles />

                <LuxuryCursor />

                <Navbar />

                <HeroSlider />

                <MarqueeSection />

                <StorySection />

                <StickyShowcase />

                <DestinationCards />

                <VideoSection />
            </main>
        </SmoothScroll>
    );
}

export default App;