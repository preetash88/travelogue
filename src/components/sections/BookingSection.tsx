import { motion } from "framer-motion";

const BookingSection = () => {
    return (
        <section
            className="
        relative
        px-6
        py-40
      "
        >
            <div
                className="
          mx-auto
          max-w-6xl
          overflow-hidden
          rounded-[3rem]
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-2xl
          md:p-20
        "
            >
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
                        CURATED JOURNEYS
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
              leading-none
              md:text-8xl
            "
                    >
                        PLAN YOUR
                        <br />
                        NEXT ESCAPE
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
                        Personalized cinematic travel experiences crafted for modern
                        explorers seeking unforgettable adventures.
                    </p>

                    <div
                        className="
              mt-14
              flex
              flex-col
              gap-4
              md:flex-row
              md:justify-center
            "
                    >
                        <input
                            type="text"
                            placeholder="Destination"
                            className="
                glass
                rounded-full
                px-8
                py-5
                outline-none
              "
                        />

                        <input
                            type="text"
                            placeholder="Travel Date"
                            className="
                glass
                rounded-full
                px-8
                py-5
                outline-none
              "
                        />

                        <motion.button
                            whileHover={{
                                scale: 1.04,
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                            className="
                rounded-full
                bg-cyan-400
                px-10
                py-5
                font-semibold
                text-black
              "
                        >
                            Explore
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BookingSection;