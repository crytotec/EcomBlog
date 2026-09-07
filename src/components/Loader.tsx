const C = {
  ink: "#1B1B16",
  paper: "#EFE7D8",
  paperDark: "#E3D9C4",
  cream: "#F7F2E7",
  oxblood: "#7A2E2E",
  forest: "#37483B",
  gold: "#B08D57",
};

export default function Loader() {
  return (
    <div
      style={{ backgroundColor: C.paper, color: C.ink }}
      className="min-h-screen w-full flex flex-col items-center justify-center gap-5"
    >
      {/* Book spine flip loader */}
      <div className="flex items-end gap-1.5">
        {[C.oxblood, C.forest, C.gold, C.ink].map((color, i) => (
          <div
            key={i}
            className="w-3 rounded-t-[2px] animate-bounce"
            style={{
              backgroundColor: color,
              height: 28,
              animationDelay: `${i * 0.12}s`,
              animationDuration: "0.9s",
            }}
          />
        ))}
      </div>

      <p
        className="text-xs uppercase tracking-[0.2em]"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8674" }}
      >
        Turning the page...
      </p>
    </div>
  );
}