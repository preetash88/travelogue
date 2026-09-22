import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const LuxuryCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            // Offset by half the cursor size (8px) to centre it on the pointer
            mouseX.set(e.clientX - 8);
            mouseY.set(e.clientY - 8);
        };

        window.addEventListener("mousemove", move, { passive: true });
        return () => window.removeEventListener("mousemove", move);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x: mouseX,
                y: mouseY,
                position: "fixed",
                top: 0,
                left: 0,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.15)",
                pointerEvents: "none",
                zIndex: 99999,
                // GPU-accelerate so it never drops a frame
                willChange: "transform",
            }}
        />
    );
};

export default LuxuryCursor;