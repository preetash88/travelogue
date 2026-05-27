import useEmblaCarousel from "embla-carousel-react";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {destinations} from "../../utils/travelData";
import useMousePosition from "../../hook/useMousePosition.ts";
import MagneticButton from "../ui/MagneticButton";

const AUTOPLAY_DELAY = 5000;

const HeroSlider = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const {x, y} = useMousePosition();

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 35,
        dragFree: false,
    });

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);

        onSelect();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, AUTOPLAY_DELAY);

        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full">
                    {destinations.map((item, index) => (
                        <div
                            key={item.id}
                            className="embla__slide relative h-full min-w-full overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    scale: selectedIndex === index ? 1 : 1.04,
                                    x: x * 30,
                                    y: y * 30,
                                }}
                                transition={{
                                    duration: 6,
                                    ease: "easeOut",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    className="
                    h-full
                    w-full
                    object-cover
                    gpu
                  "
                                />
                            </motion.div>

                            <motion.div
                                animate={{
                                    opacity: selectedIndex === index ? 1 : 0.6,
                                }}
                                transition={{
                                    duration: 1.2,
                                }}
                                className="
                  absolute
                  inset-0
                  bg-black/40
                "
                            />

                            <div
                                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#050816]
                  via-transparent
                  to-black/40
                "
                            />

                            <motion.div
                                animate={{
                                    y: selectedIndex === index ? 0 : 60,
                                    opacity: selectedIndex === index ? 1 : 0,
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeOut",
                                }}
                                className="
                  absolute
                  bottom-20
                  left-6
                  z-20
                  max-w-4xl
                  md:left-12
                "
                            >
                                <p
                                    className="
                    mb-4
                    text-xs
                    uppercase
                    tracking-[0.5em]
                    text-white/70
                    md:text-sm
                  "
                                >
                                    {item.location}
                                </p>

                                <h1
                                    className="
                    text-5xl
                    font-black
                    leading-none
                    md:text-8xl
                    lg:text-[11rem]
                  "
                                >
                                    {item.title}
                                </h1>

                                <p
                                    className="
                    mt-6
                    max-w-xl
                    text-sm
                    leading-relaxed
                    text-white/70
                    md:text-base
                  "
                                >
                                    Discover breathtaking landscapes, cinematic journeys,
                                    immersive cultures, and unforgettable experiences.
                                </p>

                                <MagneticButton
                  //                   whileHover={{
                  //                       scale: 1.05,
                  //                   }}
                  //                   whileTap={{
                  //                       scale: 0.96,
                  //                   }}
                  //                   className="
                  //   glass
                  //   mt-8
                  //   rounded-full
                  //   px-8
                  //   py-4
                  //   text-sm
                  //   uppercase
                  //   tracking-[0.2em]
                  // "
                                >
                                    Explore Destination
                                </MagneticButton>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="
          absolute
          bottom-8
          left-1/2
          z-30
          flex
          -translate-x-1/2
          gap-3
        "
            >
                {destinations.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className="
              relative
              h-[3px]
              w-16
              overflow-hidden
              rounded-full
              bg-white/20
            "
                    >
                        <motion.div
                            animate={{
                                width: selectedIndex === index ? "100%" : "0%",
                            }}
                            transition={{
                                duration: 4.8,
                                ease: "linear",
                            }}
                            className="
                absolute
                left-0
                top-0
                h-full
                bg-white
              "
                        />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;