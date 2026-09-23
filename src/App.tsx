import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import BookingSection from "./components/sections/BookingSection";
import Footer from "./components/sections/Footer";

import PageTransition from "./components/transitions/PageTransition";
import { TransitionProvider, RouteGate } from "./components/transitions/RouteTransition";
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
    const [formOpen, setFormOpen]             = useState(false);
    const [prefilledPlace, setPrefilledPlace] = useState("");
    const [prefilledState, setPrefilledState] = useState("");
    const [pickerOpen, setPickerOpen]         = useState(false);
    const [explorerState, setExplorerState]   = useState<IndiaState | null>(null);

    const openForm = (place = "", state = "") => {
        setPrefilledPlace(place);
        setPrefilledState(state);
        setFormOpen(true);
    };

    return (
        <SmoothScroll>
            <LoaderScreen />
            <PageTransition />

            {/*
             * TransitionProvider must be an ANCESTOR of both the curtain
             * logic AND RouteGate. It watches location, drives ready state,
             * and renders the curtain. RouteGate reads ready from context
             * and hides/shows its children accordingly.
             *
             * Previous bug: RouteTransition (Provider) and RouteGate
             * (Consumer) were SIBLINGS — so RouteGate always read the
             * default context { ready: true } and never actually hid.
             */}
            <TransitionProvider>
                <InterestForm
                    open={formOpen}
                    onClose={() => setFormOpen(false)}
                    prefilledPlace={prefilledPlace}
                    prefilledState={prefilledState}
                />
                <DestinationPicker
                    open={pickerOpen}
                    onClose={() => setPickerOpen(false)}
                    onExplore={(_country, state: IndiaState) => setExplorerState(state)}
                />

                <DynamicLighting />
                <AmbientParticles />
                <LuxuryCursor />

                <Navbar
                    onContactClick={() => openForm()}
                    onDestinationsClick={() => setPickerOpen(true)}
                />

                {/* RouteGate is INSIDE TransitionProvider — context works correctly */}
                <RouteGate>
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
                </RouteGate>
            </TransitionProvider>
        </SmoothScroll>
    );
}

export default App;
