import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Sophia Williams",
        text: "An unforgettable cinematic travel experience unlike anything I’ve seen before.",
    },

    {
        name: "Ethan Carter",
        text: "The storytelling and immersive visuals made every destination feel alive.",
    },

    {
        name: "Olivia Brown",
        text: "Luxury, adventure, and technology blended into one beautiful journey.",
    },
];

const TestimonialSection = () => {
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
                        TRAVEL STORIES
                    </p>

                    <h2
                        className="
              text-5xl
              font-black
              leading-none
              md:text-8xl
            "
                    >
                        WHAT PEOPLE
                        <br />
                        EXPERIENCE
                    </h2>
                </div>

                <div
                    className="
            grid
            gap-8
            md:grid-cols-3
          "
                >
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{
                                opacity: 0,
                                y: 60,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 1,
                                delay: index * 0.1,
                            }}
                            viewport={{
                                once: true,
                            }}
                            whileHover={{
                                y: -10,
                            }}
                            className="
                glass
                rounded-[2rem]
                p-10
              "
                        >
                            <p
                                className="
                  text-lg
                  leading-relaxed
                  text-white/80
                "
                            >
                                “{item.text}”
                            </p>

                            <div className="mt-10">
                                <h3 className="font-bold">{item.name}</h3>

                                <p
                                    className="
                    mt-2
                    text-xs
                    uppercase
                    tracking-[0.3em]
                    text-white/40
                  "
                                >
                                    Verified Traveler
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;