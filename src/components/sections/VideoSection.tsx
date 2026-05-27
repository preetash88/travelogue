import { motion } from "framer-motion";

const VideoSection = () => {
    return (
        <section
            className="
        relative
        h-screen
        overflow-hidden
      "
        >
            <video
                autoPlay
                muted
                loop
                playsInline
                className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
            >
                <source src="/videos/iceland.mp4" type="video/mp4" />
            </video>

            <div
                className="
          absolute
          inset-0
          bg-black/50
        "
            />

            <div
                className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#050816]
          via-transparent
          to-[#050816]/50
        "
            />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 80,
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
                className="
          absolute
          left-1/2
          top-1/2
          z-20
          max-w-4xl
          -translate-x-1/2
          -translate-y-1/2
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
                    CINEMATIC JOURNEYS
                </p>

                <h2
                    className="
            text-5xl
            font-black
            leading-none
            md:text-8xl
          "
                >
                    EXPERIENCE
                    <br />
                    THE WORLD
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
                    Dive into breathtaking destinations through immersive storytelling,
                    cinematic visuals, and unforgettable travel experiences.
                </p>
            </motion.div>
        </section>
    );
};

export default VideoSection;