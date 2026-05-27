import { motion } from "framer-motion";
import iceland from "../../assets/destinations/iceland1.avif";

const StorySection = () => {
    return (
        <section
            className="
        relative
        mx-auto
        grid
        min-h-screen
        max-w-7xl
        items-center
        gap-16
        px-6
        py-32
        md:grid-cols-2
        md:px-12
      "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    x: -100,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                }}
                transition={{
                    duration: 1.2,
                }}
                viewport={{
                    once: true,
                }}
            >
                <p
                    className="
            mb-6
            text-xs
            uppercase
            tracking-[0.5em]
            text-cyan-300
          "
                >
                    IMMERSIVE EXPERIENCES
                </p>

                <h2
                    className="
            text-5xl
            font-black
            leading-none
            md:text-7xl
          "
                >
                    TRAVEL
                    <br />
                    BEYOND
                    <br />
                    DESTINATIONS
                </h2>

                <p
                    className="
            mt-8
            max-w-xl
            text-base
            leading-relaxed
            text-white/70
          "
                >
                    Discover cinematic journeys crafted for explorers who seek
                    breathtaking landscapes, unforgettable adventures, and immersive
                    cultural experiences around the world.
                </p>

                <div className="mt-12 flex gap-12">
                    <div>
                        <h3 className="text-4xl font-black">120+</h3>

                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">
                            Destinations
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-black">4.9</h3>

                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">
                            User Rating
                        </p>
                    </div>
                </div>
            </motion.div>

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
                    duration: 1.2,
                }}
                viewport={{
                    once: true,
                }}
                className="relative"
            >
                <div
                    className="
            absolute
            -inset-10
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
                />

                <motion.img
                    whileHover={{
                        scale: 1.03,
                    }}
                    transition={{
                        duration: 1,
                    }}
                    src={iceland}
                    alt="Travel"
                    className="
            relative
            h-[700px]
            w-full
            rounded-[3rem]
            object-cover
          "
                />
            </motion.div>
        </section>
    );
};

export default StorySection;