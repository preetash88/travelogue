import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const DynamicLighting = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, {
        stiffness: 40,
        damping: 20,
    });

    const y = useSpring(mouseY, {
        stiffness: 40,
        damping: 20,
    });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX - 300);

            mouseY.set(e.clientY - 300);
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <motion.div
            style={{
                x,
                y,
            }}
            className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-0
        hidden
        h-[600px]
        w-[600px]
        rounded-full
        bg-cyan-400/5
        blur-[80px]
        md:block
      "
        />
    );
};

export default DynamicLighting;