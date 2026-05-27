import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import MobileMenu from "./MobileMenu";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MobileMenu open={open} />

            <motion.nav
                initial={{
                    y: -80,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1,
                }}
                className="
          fixed
          left-0
          top-0
          z-50
          flex
          w-full
          items-center
          justify-between
          px-6
          py-6
          md:px-12
        "
            >
                <div
                    className="
            glass
            rounded-full
            px-6
            py-3
            text-sm
            tracking-[0.4em]
          "
                >
                    TRAVELOGUE
                </div>

                <div
                    className="
            glass
            hidden
            items-center
            gap-8
            rounded-full
            px-8
            py-3
            md:flex
          "
                >
                    <button>Destinations</button>
                    <button>Experiences</button>
                    <button>Stories</button>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="
            glass
            rounded-full
            p-4
            md:hidden
          "
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.nav>
        </>
    );
};

export default Navbar;