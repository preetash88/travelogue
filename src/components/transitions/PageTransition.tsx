import { motion } from "framer-motion";

const PageTransition = () => {
    return (
        <motion.div
            initial={{
                scaleY: 1,
            }}
            animate={{
                scaleY: 0,
            }}
            transition={{
                duration: 1.2,
                ease: [0.87, 0, 0.13, 1],
            }}
            className="
        pointer-events-none
        fixed
        inset-0
        z-[999999]
        origin-top
        bg-[#050816]
      "
        />
    );
};

export default PageTransition;