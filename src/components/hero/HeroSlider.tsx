import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { destinations } from "../../utils/travelData";
import useMousePosition from "../../hook/useMousePosition.ts";
import MagneticButton from "../ui/MagneticButton";

const AUTOPLAY_DELAY = 5000;

const HeroSlider = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const { x, y } = useMousePosition();

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
        if (!emblaApi || !autoplay) return;

        const autoplayTimer = setInterval(() => {
            emblaApi.scrollNext();
        }, AUTOPLAY_DELAY);

        return () => clearInterval(autoplayTimer);
    }, [emblaApi, autoplay]);

    useEffect(() => {
        if (!emblaApi) return;

        const stopAutoplay = () => {
            setAutoplay(false);
        };

        emblaApi.on("pointerDown", stopAutoplay);

        return () => {
            emblaApi.off("pointerDown", stopAutoplay);
        };
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
                                    scale:
                                        selectedIndex === index
                                            ? [1, 1.008, 1]
                                            : 1.015,

                                    x:
                                        selectedIndex === index
                                            ? [0, -12, 0]
                                            : x * 0.01,

                                    y:
                                        selectedIndex === index
                                            ? [-50, -100, -50]
                                            : y * 0.01,
                                }}
                                transition={{
                                    duration: 18,
                                    repeat:
                                        selectedIndex === index
                                            ? Infinity
                                            : 0,
                                    ease: "easeInOut",
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
                    object-center
                    gpu
                  "
                                />
                                <div
                                    className="
    absolute
    inset-x-0
    bottom-0
    z-20
    h-[38%]
    bg-gradient-to-t
    from-[#050816]
    via-[#050816]/40
    to-transparent
  "
                                />
                                <motion.div
                                    animate={{
                                        y: [-4, 4, -4],
                                        opacity: [0.65, 0.8, 0.65],
                                    }}
                                    transition={{
                                        duration: 12,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="
absolute
inset-x-0
bottom-0
z-30
h-[42%]
bg-gradient-to-t
from-[#050816]/45
via-[#050816]/10
to-transparent
pointer-events-none
"
                                />
                                <motion.div
                                    animate={{
                                        opacity: [0.08, 0.16, 0.08],
                                        x: [-30, 30, -30],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="
absolute
inset-0
z-10
bg-gradient-to-r
from-white/10
via-transparent
to-white/5
blur-3xl
pointer-events-none
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
                  bg-black/20
                "
                            />

                            <div
                                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#050816]/70
                  via-transparent
                  to-black/20
                "
                            />

                            <motion.div
                                animate={{
                                    y: selectedIndex === index ? 0 : 80,
                                    opacity: selectedIndex === index ? 1 : 0,
                                    scale: selectedIndex === index ? 1 : 0.96,
                                }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeOut",
                                }}
                                className="
                  absolute
                  bottom-8
                  left-32
                  z-20
                  max-w-4xl
                  md:left-44
                  lg:left-52
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
relative
z-10
text-6xl
font-semibold
leading-none
tracking-[-0.04em]
text-[#f8f8f8]/85
md:text-[9rem]
lg:text-[13rem]
tracking-[-0.06em]
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
                    text-white/55
                    md:text-base
                  "
                                >
                                    Discover breathtaking landscapes, cinematic journeys,
                                    immersive cultures, and unforgettable experiences.
                                </p>

                                <MagneticButton
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
    left-8
    top-1/2
    z-30
    hidden
    -translate-y-1/2
    lg:block
  "
            >
                {/*              <div*/}
                {/*                  className="*/}
                {/*  absolute*/}
                {/*  inset-0*/}
                {/*  rounded-[3rem]*/}
                {/*  bg-black/10*/}
                {/*  backdrop-blur-[12px]*/}
                {/*"*/}
                {/*              />*/}
                <button
                    onClick={() => {
                        emblaApi?.scrollPrev();
                        setAutoplay(false);
                    }}
                    className="
        absolute
        left-1/2
        top-[25px]
        z-40
        -translate-x-1/2
        text-white/40
        transition-all
        duration-300
        hover:text-white
    "
                >
                    <span className="text-2xl font-thin">↑</span>
                </button>
                <div
                    className="
      relative
      h-[520px]
      w-[120px]
      overflow-visible
    "
                >
                    {destinations.map((item, index) => {
                        const offset = index - selectedIndex;

                        const isActive = offset === 0;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => {
                                    emblaApi?.scrollTo(index);
                                    setAutoplay(false);
                                }}
                                animate={{
                                    y: offset * 155,
                                    scale: isActive ? 1 : 0.72,
                                    rotateZ: isActive ? 0 : offset * 1.5,
                                    opacity:
                                        Math.abs(offset) > 1
                                            ? 0
                                            : isActive
                                                ? 1
                                                : 0.32
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{
                                    scale: isActive ? 1 : 0.8,
                                }}
                                className="
            absolute
            left-0
            top-1/2
            origin-center
            -translate-y-1/2
          "
                            >
                                {isActive && (
                                    <div
                                        className="
            absolute
            inset-0
            rounded-[2rem]
            bg-cyan-300/10
            blur-2xl
        "
                                    />
                                )}

                                <div
                                    className={`
              relative
              overflow-hidden
              rounded-[2rem]
              transition-all
              duration-700

              ${isActive
                                            ? `
      h-[180px]
      w-[120px]
      border
      border-white/30
      shadow-[0_0_50px_rgba(255,255,255,0.15)]
    `
                                            : `
      h-[110px]
      w-[82px]
      border
      border-white/8
    `
                                        }
            `}
                                >
                                    <>
                                        {/* Background Fill Layer */}
                                        {/* <img
                                            src={item.image}
                                            alt={item.title}
                                            aria-hidden="true"
                                            className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            scale-110
            blur-2xl
            opacity-40
        "
                                        /> */}

                                        {/* Main Cinematic Image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading={index === 0 ? "eager" : "lazy"}
                                            className="
            relative
            z-10
            h-full
            w-full
            object-cover
            object-[center_30%]
            gpu
        "
                                        />
                                    </>

                                    <div
                                        className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/90
                via-black/20
                to-transparent
              "
                                    />
                                </div>

                                <motion.p
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                    }}
                                    className="
              mt-4
              text-center
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-white
            "
                                >
                                    {item.title}
                                </motion.p>
                            </motion.button>
                        );
                    })}
                </div>
                <button
                    onClick={() => {
                        emblaApi?.scrollNext();
                        setAutoplay(false);
                    }}
                    className="
        absolute
        left-1/2
        bottom-[25px]
        z-40
        -translate-x-1/2
        text-white/40
        transition-all
        duration-300
        hover:text-white
    "
                >

                    <span className="text-2xl font-thin">↓</span>
                </button>
            </div>

            <div
                className="
    absolute
    right-8
    top-1/2
    z-30
    hidden
    -translate-y-1/2
    items-center
    gap-6
    lg:flex
  "
            >
                <div
                    className="
      relative
      flex
      h-[320px]
      w-[2px]
      flex-col
      items-center
      justify-between
      rounded-full
      bg-white/15
    "
                >
                    {destinations.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                emblaApi?.scrollTo(index);
                                setAutoplay(false);
                            }}
                            whileHover={{
                                scale: 1.2,
                            }}
                            className="
          relative
          z-10
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full
        "
                        >
                            <motion.div
                                animate={{
                                    scale: selectedIndex === index ? 1.8 : 1,
                                    opacity: selectedIndex === index ? 1 : 0.5,
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                                className={`
            h-2
            w-2
            rounded-full

            ${selectedIndex === index
                                        ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                        : "bg-white/50"
                                    }
          `}
                            />
                        </motion.button>
                    ))}

                    <motion.div
                        animate={{
                            top: `${selectedIndex * 33.3}%`,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="
        absolute
        left-1/2
        h-16
        w-[2px]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-b
        from-white
        via-cyan-200
        to-transparent
      "
                    />
                </div>

                <div
                    className="
      flex
      flex-col
      items-center
      justify-between
      gap-6
    "
                >
                    <motion.span
                        key={selectedIndex}
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="
        text-sm
        font-medium
        tracking-[0.3em]
        text-white/80
      "
                    >
                        {String(selectedIndex + 1).padStart(2, "0")}
                    </motion.span>

                    <div
                        className="
        h-20
        w-px
        bg-white/20
      "
                    />

                    <span
                        className="
        text-xs
        uppercase
        tracking-[0.3em]
        text-white/30
        [writing-mode:vertical-rl]
      "
                    >
                        Explore
                    </span>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;