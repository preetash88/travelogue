import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
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

import HomePage from "./pages/HomePage";
import StatePage from "./pages/StatePage";

import { type IndiaState } from "./utils/travelData";

function App() {
    const [formOpen, setFormOpen] = useState(false);
    const [prefilledPlace, setPrefilledPlace] = useState("");
    const [prefilledState, setPrefilledState] = useState("");
    const [pickerOpen, setPickerOpen] = useState(false);
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

            <DynamicLighting />
            <AmbientParticles />
            <LuxuryCursor />

            <Navbar
                onContactClick={() => openForm()}
                onDestinationsClick={() => setPickerOpen(true)}
            />

            <main className="relative overflow-x-hidden bg-[#050816] text-white">
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage onInterest={openForm} explorerState={explorerState} />}
                    />
                    <Route
                        path="/in/:stateSlug"
                        element={<StatePage onInterest={openForm} />}
                    />
                    <Route
                        path="/in/:stateSlug/:destSlug"
                        element={<StatePage onInterest={openForm} />}
                    />
                </Routes>

                <BookingSection onInterest={openForm} />
                <Footer onContactClick={() => openForm()} />
            </main>
        </SmoothScroll>
    );
}

export default App;
