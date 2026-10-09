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
            lerp: 0.15,
            smoothWheel: true,
            touchMultiplier: 2,
        });

        window.__lenis = lenis;

        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId); // stop the loop (it used to keep running after unmount)
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;