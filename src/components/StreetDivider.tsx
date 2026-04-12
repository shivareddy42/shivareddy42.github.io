import { useEffect, useRef, useState } from "react";

interface Props {
  variant?: "lamp" | "neon" | "gate";
  label?: string;
}

const StreetDivider = ({ variant = "lamp", label }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-8 flex items-center justify-center overflow-hidden">
      {/* Horizontal neon line */}
      <div
        className={`absolute left-0 right-0 h-px transition-all duration-1500 ${
          visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(185 80% 55% / 0.2) 20%, hsl(185 80% 55% / 0.4) 50%, hsl(185 80% 55% / 0.2) 80%, transparent 100%)",
        }}
      />

      {/* Street lamp posts */}
      {variant === "lamp" && (
        <>
          <div className={`absolute left-[8%] transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent mx-auto" />
            <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/30 mx-auto -mt-1 animate-pulse-glow" />
            <div className="w-12 h-12 rounded-full bg-primary/5 blur-xl mx-auto -mt-8" />
          </div>
          <div className={`absolute right-[8%] transition-all duration-1000 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-px h-16 bg-gradient-to-b from-accent/40 to-transparent mx-auto" />
            <div className="w-3 h-3 rounded-full bg-accent/20 border border-accent/30 mx-auto -mt-1 animate-pulse-glow" />
            <div className="w-12 h-12 rounded-full bg-accent/5 blur-xl mx-auto -mt-8" />
          </div>
        </>
      )}

      {variant === "neon" && (
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-glow" />
          <div className="absolute inset-0 w-8 h-8 -m-3 rounded-full bg-primary/10 blur-lg" />
        </div>
      )}

      {/* Label */}
      {label && (
        <div className={`relative z-10 px-6 py-2 bg-background transition-all duration-1000 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          <span className="font-mono text-[10px] text-primary/40 tracking-[0.5em] uppercase">{label}</span>
        </div>
      )}
    </div>
  );
};

export default StreetDivider;
