import { useEffect, useRef, useState } from "react";
import { Building2, GraduationCap, Rocket, ArrowRight, Zap } from "lucide-react";

const experiences = [
  {
    company: "BeOne Medicines",
    role: "Software Engineer (Enterprise Platform)",
    note: "Promoted from Intern",
    period: "Jun 2025 — Present",
    location: "San Carlos, CA",
    type: "work" as const,
    color: "primary",
    impact: "70%",
    impactLabel: "Faster Approvals",
    highlights: [
      "Architected Approval Hub consolidating DocuSign, Zoom, and Teams for 70% faster approvals across 10K+ employees",
      "Designed 200+ regression test scenarios maintaining 99.8% platform uptime",
      "Built Virtual Agent with NLU intent classification, cutting support tickets by 35%",
    ],
  },
  {
    company: "University of Central Florida",
    role: "Graduate Teaching Assistant",
    note: "Alongside full-time SWE role",
    period: "Aug 2025 — Present",
    location: "Orlando, FL",
    type: "education" as const,
    color: "accent",
    impact: "170+",
    impactLabel: "Students Taught",
    highlights: [
      "Instruction and code review for 170+ students in networking and OOP",
      "Automated grading scripts, driving 25% improvement in student lab performance",
    ],
  },
  {
    company: "Baantics Solutions",
    role: "Software Development Engineer (Platform)",
    note: "Promoted 6 months early",
    period: "May 2022 — Jun 2024",
    location: "Hyderabad, India",
    type: "work" as const,
    color: "glow-warm",
    impact: "2M+",
    impactLabel: "Daily Transactions",
    highlights: [
      "Distributed data service handling 2M+ daily transactions with 40% latency reduction",
      "Refactored Python monolith to microservices for 30% fewer production incidents",
      "CI/CD pipelines with zero-downtime deployments for a team of 8",
    ],
  },
  {
    company: "UCF, MS Computer Science",
    role: "4.0 GPA",
    note: "",
    period: "Aug 2024 — May 2026",
    location: "Orlando, FL",
    type: "education" as const,
    color: "accent",
    impact: "4.0",
    impactLabel: "GPA",
    highlights: [
      "Focus: Distributed Systems, AI/ML, Cloud Computing",
    ],
  },
  {
    company: "SNIST, B.Tech CS",
    role: "8.6/10 GPA",
    note: "",
    period: "Nov 2020 — May 2024",
    location: "Hyderabad, India",
    type: "education" as const,
    color: "accent",
    impact: "8.6",
    impactLabel: "GPA /10",
    highlights: [
      "Computer Science and Engineering",
    ],
  },
];

const glowColors: Record<string, string> = {
  primary: "hsl(185, 80%, 55%)",
  accent: "hsl(260, 70%, 60%)",
  "glow-warm": "hsl(35, 90%, 55%)",
};

/* ── Animated connection beam ── */
const ConnectionBeam = ({ visible, color, nextColor }: { visible: boolean; color: string; nextColor: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 6;
    canvas.height = canvas.parentElement?.offsetHeight || 100;

    let t = 0;
    let raf: number;
    const draw = () => {
      t += 0.025;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Core gradient line
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, color);
      grad.addColorStop(1, nextColor);
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = grad;
      ctx.fillRect(2, 0, 2, canvas.height);

      // Flowing particles
      for (let i = 0; i < 8; i++) {
        const y = ((t * 50 + i * (canvas.height / 8)) % (canvas.height + 20)) - 10;
        const alpha = 0.5 + Math.sin(t * 3 + i * 0.7) * 0.3;
        const radius = 1 + Math.sin(t * 2 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(3, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }

      // Occasional bright pulse
      const pulseY = ((t * 80) % (canvas.height + 40)) - 20;
      ctx.beginPath();
      ctx.arc(3, pulseY, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      // Glow
      ctx.beginPath();
      ctx.arc(3, pulseY, 6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.15;
      ctx.fill();

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [visible, color, nextColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-[23px] top-12 bottom-0 pointer-events-none"
      style={{ width: "6px", opacity: visible ? 1 : 0, transition: "opacity 1s" }}
    />
  );
};

/* ── Holographic ring on hover ── */
const HoloRing = ({ color, active }: { color: string; active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 80;
    canvas.height = 80;

    let t = 0;
    let raf: number;
    const draw = () => {
      t += 0.03;
      ctx.clearRect(0, 0, 80, 80);
      for (let i = 0; i < 4; i++) {
        const start = t * (0.8 + i * 0.2) + (i * Math.PI) / 2;
        const len = 0.5 + Math.sin(t * 1.5 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(40, 40, 30 + i * 3, start, start + len);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.25 - i * 0.05;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      // Center pulse
      const pulseR = 24 + Math.sin(t * 2) * 3;
      ctx.beginPath();
      ctx.arc(40, 40, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active, color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{ width: "80px", height: "80px", left: "-16px", top: "-16px", opacity: active ? 1 : 0, transition: "opacity 0.5s" }}
    />
  );
};

/* ── Impact Badge ── */
const ImpactBadge = ({ value, label, color, visible }: { value: string; label: string; color: string; visible: boolean }) => (
  <div
    className="absolute -top-3 -right-3 flex flex-col items-center justify-center w-16 h-16 rounded-full backdrop-blur-md border transition-all duration-700"
    style={{
      borderColor: `${color}40`,
      background: `radial-gradient(circle, ${color}15, transparent)`,
      boxShadow: visible ? `0 0 20px ${color}20, inset 0 0 15px ${color}10` : "none",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.5)",
    }}
  >
    <span className="text-sm font-bold font-mono" style={{ color }}>{value}</span>
    <span className="text-[8px] text-muted-foreground leading-tight text-center">{label}</span>
  </div>
);

/* ── Timeline Node ── */
const TimelineNode = ({ exp, index, visible }: { exp: typeof experiences[0]; index: number; visible: boolean }) => {
  const isWork = exp.type === "work";
  const [hovered, setHovered] = useState(false);
  const [expandedHighlight, setExpandedHighlight] = useState(-1);
  const color = glowColors[exp.color];

  const bgClasses: Record<string, string> = {
    primary: "bg-primary/20",
    accent: "bg-accent/20",
    "glow-warm": "bg-glow-warm/20",
  };
  const borderClasses: Record<string, string> = {
    primary: "border-primary/30",
    accent: "border-accent/30",
    "glow-warm": "border-glow-warm/30",
  };

  return (
    <div
      className={`relative transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${index * 250}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setExpandedHighlight(-1); }}
    >
      <div className="flex gap-6 items-start">
        {/* Timeline dot + beam */}
        <div className="flex flex-col items-center flex-shrink-0 relative">
          <div
            className={`relative w-12 h-12 rounded-full border-2 ${borderClasses[exp.color]} ${bgClasses[exp.color]} flex items-center justify-center transition-all duration-500 cursor-default`}
            style={{
              boxShadow: `0 0 ${hovered ? 40 : 15}px ${color}${hovered ? "50" : "25"}, 0 0 ${hovered ? 80 : 30}px ${color}${hovered ? "20" : "08"}`,
              transform: hovered ? "scale(1.2) rotate(10deg)" : "scale(1) rotate(0deg)",
            }}
          >
            {isWork ? (
              exp.note?.includes("Promoted") ? <Rocket className="w-5 h-5 text-primary" /> : <Building2 className="w-5 h-5 text-primary" />
            ) : (
              <GraduationCap className="w-5 h-5 text-accent" />
            )}
            <HoloRing color={color} active={hovered} />
          </div>

          {index < experiences.length - 1 && (
            <div className="relative flex-grow min-h-[80px]">
              <ConnectionBeam
                visible={visible}
                color={color}
                nextColor={glowColors[experiences[index + 1].color]}
              />
            </div>
          )}
        </div>

        {/* Card */}
        <div
          className={`relative flex-grow rounded-xl border backdrop-blur-sm p-6 transition-all duration-700 overflow-hidden ${borderClasses[exp.color]}`}
          style={{
            transitionDelay: `${index * 250 + 100}ms`,
            background: hovered
              ? `linear-gradient(135deg, hsl(var(--card) / 0.7), hsl(var(--card) / 0.3))`
              : `hsl(var(--card) / 0.3)`,
            boxShadow: hovered
              ? `inset 0 1px 0 ${color}25, 0 0 50px ${color}12, 0 10px 40px ${color}08`
              : `inset 0 1px 0 ${color}10`,
            transform: visible
              ? hovered ? "translateX(6px) scale(1.01)" : "translateX(0) scale(1)"
              : "translateX(40px) scale(0.95)",
            borderColor: hovered ? `${color}50` : undefined,
          }}
        >
          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
              top: hovered ? undefined : "-2px",
              animation: hovered ? "experienceScan 2.5s ease-in-out infinite" : "none",
            }}
          />

          {/* Corner accents */}
          {hovered && (
            <>
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l rounded-tl-xl" style={{ borderColor: `${color}40` }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r rounded-br-xl" style={{ borderColor: `${color}40` }} />
            </>
          )}

          {/* Impact badge */}
          <ImpactBadge value={exp.impact} label={exp.impactLabel} color={color} visible={visible} />

          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-mono text-[11px] text-muted-foreground">{exp.period}</span>
            {exp.note && (
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1"
                style={{
                  borderColor: `${color}20`,
                  background: `${color}08`,
                  color: color,
                }}
              >
                <Zap className="w-2.5 h-2.5" />
                {exp.note}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground pr-16">{exp.company}</h3>
          <p className="text-sm text-muted-foreground mb-4">{exp.role} · {exp.location}</p>

          {/* Interactive highlights */}
          <ul className="space-y-2.5">
            {exp.highlights.map((h, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-sm cursor-default transition-all duration-300 rounded-lg px-2 py-1.5 -mx-2"
                style={{
                  background: expandedHighlight === j ? `${color}08` : "transparent",
                  borderLeft: expandedHighlight === j ? `2px solid ${color}40` : "2px solid transparent",
                }}
                onMouseEnter={() => setExpandedHighlight(j)}
                onMouseLeave={() => setExpandedHighlight(-1)}
              >
                <ArrowRight
                  className="w-3 h-3 mt-1.5 flex-shrink-0 transition-all duration-300"
                  style={{
                    color: expandedHighlight === j ? color : `${color}60`,
                    transform: expandedHighlight === j ? "translateX(2px) scale(1.2)" : "none",
                  }}
                />
                <span
                  className="transition-colors duration-300"
                  style={{
                    color: expandedHighlight === j ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.8)",
                  }}
                >
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom gradient accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
            style={{
              background: hovered
                ? `linear-gradient(90deg, transparent, ${color}50, transparent)`
                : "transparent",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes experienceScan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-4xl mx-auto" ref={ref}>
      <div className="text-center mb-20">
        <span className="font-mono text-xs text-primary/60 tracking-[0.3em] uppercase">// journey</span>
        <h2 className="text-4xl sm:text-5xl font-bold mt-4 gradient-text">The Path So Far</h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Milestones that shaped how I think about engineering
        </p>
        {/* Decorative line under heading */}
        <div className="mx-auto mt-6 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="space-y-2">
        {experiences.map((exp, i) => (
          <TimelineNode key={i} exp={exp} index={i} visible={visible} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
