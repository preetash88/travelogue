import { motion } from "framer-motion";
import kerala from "../../assets/destinations/kerala1.avif";

const StorySection = () => {
    return (
        <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 md:grid-cols-2 md:px-12">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
            >
                <p className="mb-6 text-xs uppercase tracking-[0.5em] text-cyan-300">
                    INCREDIBLE INDIA
                </p>

                <h2 className="text-5xl font-black leading-none md:text-7xl">
                    TRAVEL
                    <br />
                    WITHIN,
                    <br />
                    DISCOVER
                </h2>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70">
                    India is not one destination — it is 36 worlds. From the frozen passes of Ladakh
                    to the coral atolls of Lakshadweep, from the living root bridges of Meghalaya to
                    the ghats of Kashi — every Lamhe (moment) here is a memory that stays for life.
                </p>

                <div className="mt-12 flex gap-12">
                    <div>
                        <h3 className="text-4xl font-black">36+</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">
                            States & UTs
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-black">4.9</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">
                            Guest Rating
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-black">∞</h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/50">
                            Memories
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative"
            >
                <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
                <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1 }}
                    src={kerala}
                    alt="Kerala Backwaters — God's Own Country"
                    className="relative h-[700px] w-full rounded-[3rem] object-cover"
                />
                <div className="absolute bottom-8 left-8 glass rounded-2xl px-6 py-4">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                        Featured
                    </p>
                    <p className="text-sm font-semibold mt-1">Kerala Backwaters</p>
                </div>
            </motion.div>
        </section>
    );
};

export default StorySection;