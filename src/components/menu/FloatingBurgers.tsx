const EMOJIS = ["🍔", "🍟", "🌭", "🧀", "🥤", "🍕"];

const FloatingBurgers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => {
        const emoji = EMOJIS[i % EMOJIS.length];
        const left = (i * 17 + 5) % 100;
        const delay = (i * 1.7) % 12;
        const duration = 10 + (i % 5) * 3;
        const size = 16 + (i % 4) * 6;

        return (
          <span
            key={i}
            className="absolute animate-float-up"
            style={{
              left: `${left}%`,
              bottom: "-40px",
              fontSize: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0.12,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
};

export default FloatingBurgers;
