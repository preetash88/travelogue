import {Menu, X} from "lucide-react";
import {motion} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router-dom";
import {uniqueIndiaStates} from "../../utils/travelData";
import MobileMenu from "./MobileMenu";

interface Props {
    onContactClick: () => void;
    onDestinationsClick?: () => void;
}

// Same slug rule StatePage uses, so the URL segment maps back to a state name
const toSlug = (name: string): string =>
    name.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const Navbar = ({onContactClick, onDestinationsClick}: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Which state page are we on? (undefined on the home page)
    const stateMatch = useMatch("/in/:stateSlug/*");
    const currentState = stateMatch
        ? uniqueIndiaStates.find(s => toSlug(s.state) === stateMatch.params.stateSlug)
        : undefined;

    const goHome = () => {
        navigate("/");
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const goToExplorer = () => {
        navigate("/");
        setTimeout(() => {
            document.getElementById("state-explorer")?.scrollIntoView({behavior: "smooth"});
        }, 300);
    };

    return (
        <>
            <MobileMenu open={open} onClose={() => setOpen(false)} onContactClick={onContactClick}/>

            <motion.nav
                initial={{y: -80, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 1, ease: "easeOut"}}
                className="fixed left-0 top-0 z-50 flex w-full items-center justify-between"
                style={{padding: "10px 40px 0 25px"}}
            >
                {/* Logo — showCover on mousedown so cover is up before navigate fires */}
                <div
                    className="flex flex-col"
                    style={{paddingTop: "4px", cursor: "pointer"}}
                    onClick={goHome}
                    role="link"
                    aria-label="Go to home"
                >
                    <span className="navbar-brand text-gray-200" style={{fontSize: "2.7rem"}}>
                        lamhe
                    </span>
                    <span
                        className="navbar-sub"
                        style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.48em",
                            color: "rgb(255,255,255)",
                            textShadow: "0 1px 6px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8)",
                            marginTop: "2px"
                        }}
                    >
                        Moments that Matter
                    </span>
                </div>

                {/* "You are here" chip — only on state pages, centred in the bar */}
                {/* "You are here" chip — only on state pages, centred in the bar */}
                {currentState && (
                    <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 top-[10px] hidden items-center justify-center md:flex">
                        <motion.button
                            key={currentState.state}
                            initial={{opacity: 0, y: -6}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.4}}
                            onClick={() => (window as any).__lenis?.scrollTo(0, {duration: 1.2})}
                            aria-label={`You are exploring ${currentState.state}. Back to top`}
                            className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/20 bg-black/35 px-5 py-2"
                        >
            <span
                className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]"/>
                            <span
                                className="text-xs font-medium uppercase tracking-[0.35em] text-white/90"
                                style={{textShadow: "0 1px 6px rgba(0,0,0,0.6)"}}
                            >
                {currentState.state}
            </span>
                        </motion.button>
                    </div>
                )}

                {/* Desktop nav */}
                <div className="hidden items-center gap-10 md:flex">
                    <button className="navbar-link" onClick={onDestinationsClick ?? goToExplorer}>
                        Destinations
                    </button>
                    <button className="navbar-link">Experiences</button>
                    <button className="navbar-link">Stories</button>

                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={onContactClick}
                        className="navbar-link rounded-full border border-white/30 px-6 py-2 hover:border-cyan-400 hover:text-cyan-300 transition-colors duration-250"
                        style={{letterSpacing: "0.12em", fontSize: "0.9rem"}}
                    >
                        PLAN MY TRIP
                    </motion.button>
                </div>

                {/* Mobile hamburger */}
                <motion.button
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2"
                    style={{color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.9)"}}
                >
                    {open ? <X size={22}/> : <Menu size={22}/>}
                </motion.button>
            </motion.nav>
        </>
    );
};

export default Navbar;
