import { motion } from "framer-motion";
import {type ReactNode, useRef } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
}

const MagneticButton = ({ children, onClick }: Props) => {
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const button = ref.current;

        if (!button) return;

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;

        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `
      translate(${x * 0.2}px, ${y * 0.2}px)
    `;
    };

    const handleLeave = () => {
        if (!ref.current) return;

        ref.current.style.transform = `
      translate(0px, 0px)
    `;
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className="
        glass
        rounded-full
        px-8
        py-4
        text-sm
        uppercase
        tracking-[0.2em]
        transition-transform
        duration-300
      "
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;