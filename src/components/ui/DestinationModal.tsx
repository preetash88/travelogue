import { AnimatePresence, motion } from "framer-motion";

interface Props {
    open: boolean;
    onClose: () => void;
    image: string;
    title: string;
}

const DestinationModal = ({
                              open,
                              onClose,
                              image,
                              title,
                          }: Props) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            bg-black/80
            p-6
            backdrop-blur-xl
          "
                    onClick={onClose}
                >
                    <motion.div
                        initial={{
                            scale: 0.9,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        exit={{
                            scale: 0.9,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="
              relative
              max-w-5xl
              overflow-hidden
              rounded-[3rem]
            "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={image}
                            alt={title}
                            className="
                max-h-[80vh]
                w-full
                object-cover
              "
                        />

                        <div
                            className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-transparent
                to-transparent
              "
                        />

                        <div
                            className="
                absolute
                bottom-10
                left-10
              "
                        >
                            <h2
                                className="
                  text-5xl
                  font-black
                "
                            >
                                {title}
                            </h2>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DestinationModal;