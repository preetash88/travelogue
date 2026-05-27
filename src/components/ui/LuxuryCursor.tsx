import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const LuxuryCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, {
        damping: 25,
        stiffness: 250,
    });

    const springY = useSpring(mouseY, {
        damping: 25,
        stiffness: 250,
    });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 12);

            mouseY.set(e.clientY - 12);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <motion.div
            style={{
                x: springX,
                y: springY,
            }}
            className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        hidden
        h-6
        w-6
        rounded-full
        border
        border-white/40
        bg-white/10
        backdrop-blur-sm
        md:block
      "
        />
    );
};

export default LuxuryCursor;