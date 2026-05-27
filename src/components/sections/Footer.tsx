const Footer = () => {
    return (
        <footer
            className="
        border-t
        border-white/10
        px-6
        py-12
      "
        >
            <div
                className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          justify-between
          gap-6
          md:flex-row
        "
            >
                <h2
                    className="
            text-xl
            font-black
            tracking-[0.3em]
          "
                >
                    TRAVELOGUE
                </h2>

                <div
                    className="
            flex
            gap-8
            text-sm
            text-white/60
          "
                >
                    <button>Instagram</button>
                    <button>Twitter</button>
                    <button>YouTube</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;