import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const LuxuryCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = {
        damping: 35,
        stiffness: 2000,
        mass: 0.10,
    };

    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 8);

            mouseY.set(e.clientY - 8);
        };

        window.addEventListener("mousemove", moveCursor, {
            passive: true,
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <motion.div
            style={{
                x: cursorX,
                y: cursorY,
            }}
            className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]
        hidden
        h-4
        w-4
        rounded-full
        border
        border-white/70
        bg-white/20
        md:block
      "
        />
    );
};

export default LuxuryCursor;