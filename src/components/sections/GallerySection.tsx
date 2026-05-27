import { motion } from "framer-motion";

import bali from "../../assets/destinations/bali1.avif";
import iceland from "../../assets/destinations/iceland1.avif";
// import norway from "../../assets/destinations/norway.avif";
// import switzerland from "../../assets/destinations/switzerland.avif";

// const images = [bali, iceland, norway, switzerland];
const images = [bali, iceland];

const GallerySection = () => {
    return (
        <section
            className="
        relative
        px-6
        py-32
      "
        >
            <div
                className="
          mx-auto
          max-w-7xl
        "
            >
                <div className="mb-20 text-center">
                    <p
                        className="
              mb-6
              text-xs
              uppercase
              tracking-[0.6em]
              text-cyan-300
            "
                    >
                        VISUAL JOURNEYS
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
              leading-none
              md:text-8xl
            "
                    >
                        CINEMATIC
                        <br />
                        GALLERY
                    </h2>
                </div>

                <div
                    className="
            grid
            gap-8
            md:grid-cols-2
          "
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
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
                                delay: index * 0.12,
                            }}
                            viewport={{
                                once: true,
                            }}
                            whileHover={{
                                y: -10,
                            }}
                            className="
                group
                relative
                overflow-hidden
                rounded-[2rem]
              "
                        >
                            <motion.img
                                whileHover={{
                                    scale: 1.06,
                                }}
                                transition={{
                                    duration: 1.2,
                                }}
                                src={image}
                                alt="Travel"
                                className="
                  h-[600px]
                  w-full
                  object-cover
                "
                            />

                            <div
                                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-transparent
                  to-transparent
                "
                            />

                            <div
                                className="
                  absolute
                  bottom-8
                  left-8
                "
                            >
                                <h3
                                    className="
                    text-3xl
                    font-black
                  "
                                >
                                    EXPLORE
                                </h3>

                                <p
                                    className="
                    mt-2
                    text-sm
                    uppercase
                    tracking-[0.3em]
                    text-white/60
                  "
                                >
                                    Cinematic Experience
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;