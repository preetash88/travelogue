import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoaderScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{
                        opacity: 0,
                        y: -100,
                    }}
                    transition={{
                        duration: 1,
                    }}
                    className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            bg-[#050816]
          "
                >
                    <div className="text-center">
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            className="
                text-5xl
                font-black
                tracking-[0.4em]
                md:text-7xl
              "
                        >
                            TRAVELOGUE
                        </motion.h1>

                        <motion.div
                            initial={{
                                width: 0,
                            }}
                            animate={{
                                width: "220px",
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                            }}
                            className="
                mx-auto
                mt-8
                h-[2px]
                rounded-full
                bg-white
              "
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoaderScreen;