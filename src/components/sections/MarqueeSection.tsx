import { motion } from "framer-motion";

const items = [
    "ICELAND",
    "NORWAY",
    "BALI",
    "SWITZERLAND",
    "TOKYO",
    "PARIS",
];

const MarqueeSection = () => {
    return (
        <section
            className="
        overflow-hidden
        border-y
        border-white/10
        py-10
      "
        >
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                }}
                className="
          flex
          min-w-max
          gap-16
        "
            >
                {[...items, ...items].map((item, index) => (
                    <h2
                        key={index}
                        className="
              text-5xl
              font-black
              tracking-[0.2em]
              text-white/10
              md:text-7xl
            "
                    >
                        {item}
                    </h2>
                ))}
            </motion.div>
        </section>
    );
};

export default MarqueeSection;