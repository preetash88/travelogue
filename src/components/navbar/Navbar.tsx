import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

interface Props {
    onContactClick: () => void;
    onDestinationsClick?: () => void;
}

const Navbar = ({ onContactClick, onDestinationsClick }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const goHome = () => {
        // Navigate to root — React Router unmounts StatePage and mounts HomePage
        // which resets all state naturally since it's a fresh component mount
        navigate("/");
        // Also scroll to top in case we're already on home
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const goToExplorer = () => {
        // If on a sub-page, navigate home first then scroll
        navigate("/");
        setTimeout(() => {
            document.getElementById("state-explorer")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <>
            <MobileMenu open={open} onClose={() => setOpen(false)} onContactClick={onContactClick} />

            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="fixed left-0 top-0 z-50 flex w-full items-center justify-between"
                style={{ padding: "10px 40px 0 25px" }}
            >
                {/* ── Brand — click navigates home and resets everything ── */}
                <div
                    className="flex flex-col"
                    style={{ paddingTop: "4px", cursor: "pointer" }}
                    onClick={goHome}
                    role="link"
                    aria-label="Go to home"
                >
                    <span
                        className="navbar-brand text-gray-200"
                        style={{ fontSize: "2.7rem" }}
                    >
                        lamhe
                    </span>
                    <span
                        className="navbar-sub"
                        style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.48em",
                            color: "rgb(255, 255, 255)",
                            textShadow: "0 1px 6px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8)",
                            marginTop: "2px",
                        }}
                    >
                        Moments that Matter
                    </span>
                </div>

                {/* ── Desktop nav ──────────────────────────────────────── */}
                <div className="hidden items-center gap-10 md:flex">
                    <button
                        className="navbar-link"
                        onClick={onDestinationsClick ?? goToExplorer}
                    >
                        Destinations
                    </button>
                    <button className="navbar-link">Experiences</button>
                    <button className="navbar-link">Stories</button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onContactClick}
                        className="navbar-link rounded-full border border-white/30 px-6 py-2 hover:border-cyan-400 hover:text-cyan-300 transition-colors duration-250"
                        style={{ letterSpacing: "0.12em", fontSize: "0.9rem" }}
                    >
                        PLAN MY TRIP
                    </motion.button>
                </div>

                {/* ── Mobile hamburger ─────────────────────────────────── */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2"
                    style={{
                        color: "rgba(255,255,255,0.85)",
                        textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                    }}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </motion.button>
            </motion.nav>
        </>
    );
};

export default Navbar;
