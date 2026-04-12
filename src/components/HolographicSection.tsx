import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  id?: string;
  className?: string;
}

const HolographicSection = ({ children, id, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: [0, 0.1, 0.2] }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Parallax depth on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewH / 2;
      setParallaxY(center * -0.04);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 px-6 ${className}`}
    >
      {/* Holographic border */}
      <div
        className={`absolute inset-x-6 md:inset-x-12 inset-y-0 rounded-2xl border transition-all duration-1000 ${
          visible ? "border-primary/10 opacity-100" : "border-transparent opacity-0"
        }`}
        style={{
          boxShadow: visible
            ? `inset 0 0 60px hsl(185 80% 55% / 0.03), 0 0 40px hsl(185 80% 55% / 0.02)`
            : "none",
        }}
      >
        {/* Scanline */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(185 80% 55% / 0.15) 2px, hsl(185 80% 55% / 0.15) 4px)`,
          }}
        />

        {/* Corners */}
        {visible && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/30 rounded-br-2xl" />
          </>
        )}
      </div>

      {/* Content with parallax */}
      <div
        className={`relative z-10 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
        }`}
        style={{ transform: visible ? `translateY(${parallaxY}px)` : undefined }}
      >
        {children}
      </div>
    </section>
  );
};

export default HolographicSection;
