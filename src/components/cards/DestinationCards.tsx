import { motion } from "framer-motion";
import { destinations } from "../../utils/travelData";

const DestinationCards = () => {
    return (
        <section
            className="
        relative
        z-20
        mx-auto
        grid
        max-w-7xl
        gap-8
        px-6
        py-32
        md:grid-cols-2
        lg:grid-cols-4
      "
        >
            {destinations.map((item, index) => (
                <motion.div
                    key={item.id}
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
                        delay: index * 0.15,
                    }}
                    viewport={{
                        once: true,
                    }}
                    whileHover={{
                        y: -15,
                    }}
                    className="
            glass
            overflow-hidden
            rounded-[2rem]
          "
                >
                    <div className="overflow-hidden">
                        <motion.img
                            whileHover={{
                                scale: 1.08,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            src={item.image}
                            alt={item.title}
                            className="
                h-[420px]
                w-full
                object-cover
              "
                        />
                    </div>

                    <div className="p-6">
                        <p
                            className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/50
              "
                        >
                            {item.location}
                        </p>

                        <h2
                            className="
                mt-4
                text-3xl
                font-bold
              "
                        >
                            {item.title}
                        </h2>

                        <p
                            className="
                mt-4
                text-sm
                leading-relaxed
                text-white/70
              "
                        >
                            Experience cinematic landscapes and unforgettable adventures.
                        </p>
                    </div>
                </motion.div>
            ))}
        </section>
    );
};

export default DestinationCards;