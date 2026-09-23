import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
}

// Expose lenis globally so RouteTransition can call scrollTo(0) on route change
declare global {
    interface Window { __lenis?: Lenis; }
}

const SmoothScroll = ({ children }: Props) => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
            touchMultiplier: 2,
        });

        window.__lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
