import { AnimatePresence, motion } from "framer-motion";

interface Props {
    open: boolean;
}

const MobileMenu = ({ open }: Props) => {
    return (
        <AnimatePresence>
            {open && (
            <motion.div
                initial={{
        opacity: 0,
    }}
    animate={{
        opacity: 1,
    }}
    exit={{
        opacity: 0,
    }}
    className="
    fixed
    inset-0
    z-40
    flex
    flex-col
    items-center
    justify-center
    gap-10
    bg-[#050816]/95
    backdrop-blur-2xl
    "
    >
    {[
            "Destinations",
        "Experiences",
        "Stories",
        "Gallery",
        "Contact",
].map((item, index) => (
        <motion.button
            key={item}
    initial={{
        opacity: 0,
            y: 40,
    }}
    animate={{
        opacity: 1,
            y: 0,
    }}
    transition={{
        delay: index * 0.08,
    }}
    className="
    text-3xl
    font-bold
    tracking-[0.2em]
    "
    >
    {item}
    </motion.button>
))}
    </motion.div>
)}
    </AnimatePresence>
);
};

export default MobileMenu;