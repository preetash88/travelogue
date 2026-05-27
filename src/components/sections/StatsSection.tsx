import { motion } from "framer-motion";

const stats = [
    {
        number: "120+",
        label: "Destinations",
    },

    {
        number: "50K+",
        label: "Travelers",
    },

    {
        number: "4.9",
        label: "Average Rating",
    },

    {
        number: "98%",
        label: "Satisfaction",
    },
];

const StatsSection = () => {
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
          grid
          max-w-7xl
          gap-12
          md:grid-cols-4
        "
            >
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
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
                        className="
              glass
              rounded-[2rem]
              p-10
              text-center
            "
                    >
                        <h2
                            className="
                text-5xl
                font-black
                md:text-6xl
              "
                        >
                            {item.number}
                        </h2>

                        <p
                            className="
                mt-4
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/50
              "
                        >
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;