import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

const LoaderScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{opacity: 0, y: -100}}
                    transition={{duration: 1}}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050816]"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{opacity: 0, y: 40}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                        >
                            {/* Pacifico script — matches the navbar logo exactly */}
                            <span
                                className="navbar-brand text-gray-200"
                                style={{fontSize: "7rem"}}
                            >
            lamhe
        </span>
                        </motion.div>
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1, delay: 0.4}}
                            className="navbar-sub mt-2 text-white/50"
                            style={{letterSpacing: "0.48em", fontSize: "0.85rem"}}
                        >
                            Moments that Matter
                        </motion.p>
                        <motion.div
                            initial={{width: 0}}
                            animate={{width: "200px"}}
                            transition={{duration: 2.2, ease: "easeInOut"}}
                            className="mx-auto mt-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderScreen;