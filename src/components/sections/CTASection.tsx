import { motion } from "framer-motion";

const CTASection = () => {
    return (
        <section
            className="
        relative
        overflow-hidden
        px-6
        py-40
        text-center
      "
        >
            <div
                className="
          gradient-orb
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
            />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 100,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                }}
                viewport={{
                    once: true,
                }}
                className="relative z-20"
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
                    START YOUR JOURNEY
                </p>

                <h2
                    className="
            text-5xl
            font-black
            leading-none
            md:text-8xl
          "
                >
                    EXPLORE
                    <br />
                    THE UNKNOWN
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
                    Curated cinematic travel experiences designed for modern explorers.
                </p>

                <motion.button
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.96,
                    }}
                    className="
            glass
            mt-12
            rounded-full
            px-10
            py-5
            text-sm
            uppercase
            tracking-[0.3em]
          "
                >
                    Begin Adventure
                </motion.button>
            </motion.div>
        </section>
    );
};

export default CTASection;