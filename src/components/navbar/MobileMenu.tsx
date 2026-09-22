import { AnimatePresence, motion } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    onContactClick: () => void;
}

const MobileMenu = ({ open, onClose, onContactClick }: Props) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#050816]/95 backdrop-blur-2xl"
                >
                    {/* Brand in mobile menu */}
                    <div className="text-center mb-4">
                        <h1 className="text-4xl font-black tracking-[0.4em]">LAMHE</h1>
                        <p className="text-xs tracking-[0.4em] text-white/40 uppercase mt-1">
                            Memories of India
                        </p>
                    </div>

                    {["Destinations", "Experiences", "Stories", "Gallery"].map((item, index) => (
                        <motion.button
                            key={item}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            onClick={onClose}
                            className="text-3xl font-bold tracking-[0.2em]"
                        >
                            {item}
                        </motion.button>
                    ))}

                    <motion.button
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36 }}
                        onClick={() => {
                            onClose();
                            onContactClick();
                        }}
                        className="bg-cyan-400 text-black font-black rounded-full px-10 py-4 text-lg tracking-[0.2em] uppercase mt-4"
                    >
                        Plan My Trip
                    </motion.button>

                    {/* Contact info in mobile menu */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-white/40 text-xs tracking-[0.2em] uppercase"
                    >
                        <p>hello@lamhe.in</p>
                        <p className="mt-1">+91 99999 99999</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;