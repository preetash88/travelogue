import { useEffect, useState } from "react";

const useMousePosition = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            setPosition({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
            });
        };

        window.addEventListener("mousemove", updateMouse);

        return () => {
            window.removeEventListener("mousemove", updateMouse);
        };
    }, []);

    return position;
};

export default useMousePosition;