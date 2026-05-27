const AmbientParticles = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {[...Array(8)].map((_, index) => (
                <span
                    key={index}
                    className="
            absolute
            h-2
            w-2
            rounded-full
            bg-cyan-300/20
            blur-sm
            animate-pulse
          "
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 6}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default AmbientParticles;