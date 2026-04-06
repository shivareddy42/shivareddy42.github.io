import { useEffect, useState, useRef } from "react";
import { Terminal, Briefcase, Github } from "lucide-react";

const roles = [
  "ML Systems Engineer",
  "AI Infrastructure Architect",
  "Deep Learning Engineer",
  "Distributed Systems Builder",
  "Full-Stack ML Engineer",
];

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const glyphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    const gateTimer = setTimeout(() => setGateOpen(true), 1800);
    return () => { clearTimeout(timer); clearTimeout(gateTimer); };
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Holographic shimmer canvas behind the name
  useEffect(() => {
    const canvas = glyphRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 600;
    canvas.height = 200;
    let raf: number;
    let t = 0;
    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, 600, 200);
      for (let i = 0; i < 30; i++) {
        const x = (i * 20 + t * 40) % 620 - 10;
        const y = 100 + Math.sin(t + i * 0.4) * 30;
        const alpha = 0.03 + Math.sin(t * 2 + i) * 0.02;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185, 80%, 55%, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cyber grid floor */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{
            background: `
              linear-gradient(to top, hsl(220 20% 4% / 0) 0%, hsl(220 20% 4%) 100%),
              repeating-linear-gradient(90deg, hsl(185 80% 55% / 0.06) 0px, transparent 1px, transparent 60px),
              repeating-linear-gradient(0deg, hsl(185 80% 55% / 0.06) 0px, transparent 1px, transparent 60px)
            `,
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-20 left-[10%] w-96 h-96 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-[10%] w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      {/* Gate structure */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute left-0 top-0 h-full bg-background/95 border-r border-primary/20 z-30 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: gateOpen ? "0%" : "50%", boxShadow: gateOpen ? "none" : "10px 0 60px hsl(185 80% 55% / 0.15)" }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute inset-0 grid-bg-dense" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
        </div>
        <div
          className="absolute right-0 top-0 h-full bg-background/95 border-l border-primary/20 z-30 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: gateOpen ? "0%" : "50%", boxShadow: gateOpen ? "none" : "-10px 0 60px hsl(185 80% 55% / 0.15)" }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute inset-0 grid-bg-dense" />
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-20 text-center px-6 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-glow bg-primary/5 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-glow-online opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-glow-online" />
          </span>
          <span className="font-mono text-xs text-foreground/70">SWE @ BeOne Medicines · ML Systems</span>
          <Briefcase className="w-3.5 h-3.5 text-primary/60" />
        </div>

        {/* Name with parallax + hover + holographic shimmer */}
        <div
          ref={nameRef}
          className="relative mb-2 cursor-default select-none"
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
          style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`, transition: "transform 0.3s ease-out" }}
        >
          {/* Shimmer canvas */}
          <canvas
            ref={glyphRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            style={{ mixBlendMode: "screen" }}
          />

          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-none relative select-none">
            <span
              className={`inline-block transition-all duration-700 gradient-name-shiva ${nameHovered ? "name-glow-intense" : "name-glow-subtle"}`}
              style={{
                letterSpacing: nameHovered ? "0.05em" : "-0.05em",
              }}
            >
              SHIVA
            </span>
          </h1>

          {/* Decorative underline glow */}
          <div
            className="mx-auto h-[2px] rounded-full transition-all duration-700"
            style={{
              width: nameHovered ? "80%" : "40%",
              background: "linear-gradient(90deg, transparent, hsl(185 80% 55% / 0.6), hsl(260 70% 60% / 0.4), transparent)",
              boxShadow: nameHovered ? "0 0 20px hsl(185 80% 55% / 0.4)" : "none",
            }}
          />

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mt-3 select-none">
            <span
              className={`inline-block transition-all duration-500 gradient-name-last ${nameHovered ? "" : ""}`}
              style={{
                filter: nameHovered ? "drop-shadow(0 0 50px hsl(35 90% 55% / 0.5))" : "drop-shadow(0 0 30px hsl(35 90% 55% / 0.2))",
              }}
            >
              PEDDIREDDY
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="font-mono text-xs text-primary/50 tracking-[0.5em] uppercase">AI · ML · Systems</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Role typewriter */}
        <div className="h-12 flex items-center justify-center mb-6">
          <Terminal className="w-4 h-4 text-primary/40 mr-2" />
          <span className="font-mono text-lg sm:text-xl text-primary">{displayText}</span>
          <span className="inline-block w-0.5 h-6 bg-primary ml-0.5 animate-pulse-glow" />
        </div>

        <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
          Full-time SWE building enterprise platforms at scale. I design ML pipelines,
          optimize model inference, and architect distributed training systems.
          MS CS @ UCF (4.0 GPA). I make machines think faster.
        </p>

        {/* GitHub CTA */}
        <a
          href="https://github.com/shivareddy42"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/50 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_40px_hsl(185,80%,55%,0.15)]"
        >
          <Github className="w-5 h-5 text-primary group-hover:rotate-[360deg] transition-transform duration-700" />
          <span className="font-mono text-sm text-primary">github.com/shivareddy42</span>
          <span className="text-xs text-primary/40 group-hover:text-primary/70 transition-colors">→</span>
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
