import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import bali from "../../assets/destinations/bali1.avif";

const StickyShowcase = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            className="
        relative
        h-[250vh]
      "
        >
            <div
                className="
          sticky
          top-0
          flex
          h-screen
          items-center
          justify-center
          overflow-hidden
        "
            >
                <motion.img
                    style={{
                        scale,
                    }}
                    src={bali}
                    alt="Bali"
                    className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
                />

                <div
                    className="
            absolute
            inset-0
            bg-black/50
          "
                />

                <motion.div
                    style={{
                        opacity,
                    }}
                    className="
            relative
            z-20
            max-w-5xl
            px-6
            text-center
          "
                >
                    <p
                        className="
              mb-6
              text-xs
              uppercase
              tracking-[0.6em]
              text-cyan-300
            "
                    >
                        IMMERSIVE STORYTELLING
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
              leading-none
              md:text-8xl
            "
                    >
                        EVERY JOURNEY
                        <br />
                        TELLS A STORY
                    </h2>

                    <p
                        className="
              mx-auto
              mt-8
              max-w-2xl
              text-base
              leading-relaxed
              text-white/70
            "
                    >
                        Experience cinematic travel narratives through immersive visuals,
                        layered motion, and carefully crafted storytelling.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default StickyShowcase;