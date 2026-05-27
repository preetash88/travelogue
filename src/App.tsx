import DestinationCards from "./components/cards/DestinationCards";
import HeroSlider from "./components/hero/HeroSlider";
import Navbar from "./components/navbar/Navbar";

import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";
import GallerySection from "./components/sections/GallerySection";
import MarqueeSection from "./components/sections/MarqueeSection";
import StatsSection from "./components/sections/StatsSection";
import StickyShowcase from "./components/sections/StickyShowcase";
import StorySection from "./components/sections/StorySection";
import VideoSection from "./components/sections/VideoSection";
import BookingSection from "./components/sections/BookingSection";
import TestimonialSection from "./components/sections/TestimonialSection";

import PageTransition from "./components/transitions/PageTransition";

import AmbientParticles from "./components/ui/AmbientParticles";
import DynamicLighting from "./components/ui/DynamicLighting";
import LoaderScreen from "./components/ui/LoaderScreen";
import LuxuryCursor from "./components/ui/LuxuryCursor";
import SmoothScroll from "./components/ui/SmoothScroll";

function App() {
    return (
        <SmoothScroll>
            <LoaderScreen/>

            <PageTransition/>

            <main className="relative overflow-hidden bg-[#050816] text-white">
                <DynamicLighting/>

                <AmbientParticles/>

                <LuxuryCursor/>

                <Navbar/>

                <HeroSlider/>

                <MarqueeSection/>

                <StorySection/>

                <StickyShowcase/>

                <StatsSection/>

                <GallerySection/>

                <DestinationCards/>

                <VideoSection/>

                <CTASection/>
                <TestimonialSection/>

                <BookingSection/>

                <Footer/>
            </main>
        </SmoothScroll>
    );
}

export default App;