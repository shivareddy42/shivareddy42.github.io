import { useState, useRef, useEffect, useCallback } from "react";
import { Brain, Server, BarChart3, Shield, Cpu, Cloud, X, Zap, MonitorSpeaker, Layers, Github } from "lucide-react";

const projects = [
  // GPU projects first
  {
    title: "CUDA Ray Tracer",
    subtitle: "Real-time photorealistic rendering on GPU",
    description: "Implemented a path-tracing renderer in CUDA C++ capable of rendering 1M+ ray bounces per frame at 60fps on an RTX 4090. Features BVH acceleration structures, importance sampling, and denoising via OptiX AI. Achieved 120x speedup over CPU baseline.",
    tech: ["CUDA", "C++", "OptiX", "OpenGL", "BVH"],
    domain: "GPU Computing",
    icon: Zap,
    metrics: [
      { label: "Speedup vs CPU", value: 95 },
      { label: "Frame Rate", value: 60 },
    ],
    color: "#22c55e",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "GPU Particle Simulation",
    subtitle: "N-body physics with compute shaders",
    description: "Built an N-body gravitational simulation handling 2M+ particles in real-time using WebGPU compute shaders. Spatial hashing via Morton codes for O(n log n) neighbor lookups. Includes Barnes-Hut approximation for galaxy-scale simulations with interactive force tuning.",
    tech: ["WebGPU", "WGSL", "TypeScript", "Three.js", "Compute Shaders"],
    domain: "GPU Computing",
    icon: MonitorSpeaker,
    metrics: [
      { label: "Particles", value: 98 },
      { label: "GPU Utilization", value: 92 },
    ],
    color: "#f43f5e",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Tensor Kernel Optimizer",
    subtitle: "Custom GEMM kernels for transformer inference",
    description: "Wrote hand-tuned matrix multiplication kernels in CUDA targeting Ampere tensor cores, achieving 85% of cuBLAS throughput on FP16 GEMM. Integrated into a custom transformer inference engine, cutting LLM token latency by 3x compared to vanilla PyTorch.",
    tech: ["CUDA", "PTX", "Python", "PyTorch", "Triton"],
    domain: "GPU / ML Infra",
    icon: Layers,
    metrics: [
      { label: "cuBLAS Parity", value: 85 },
      { label: "Latency Cut", value: 67 },
    ],
    color: "#06b6d4",
    github: "https://github.com/shivareddy42",
  },
  // ML + other projects
  {
    title: "AI Code Review",
    subtitle: "LLM-powered CI pipeline intelligence",
    description: "Built a GPT-4 + LangChain tool that analyzes pull requests for anti-patterns, security gaps, and missing test coverage. Integrated into GitHub Actions CI with few-shot prompt engineering reaching 91% precision on flagging genuine issues.",
    tech: ["Python", "LangChain", "OpenAI API", "GitHub Actions"],
    domain: "Machine Learning",
    icon: Brain,
    metrics: [
      { label: "Precision", value: 91 },
      { label: "Review Effort Saved", value: 45 },
    ],
    color: "#00d4ff",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Multi-Tenant Platform",
    subtitle: "Enterprise SaaS at scale",
    description: "Orchestrated a multi-tenant SaaS backend with role-based access control, serving 1,000+ concurrent users with sub-200ms response times. JUnit/Mockito test suites achieving 94% coverage, Kubernetes autoscaling for 99.9% availability.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"],
    domain: "Cloud & DevOps",
    icon: Cloud,
    metrics: [
      { label: "Test Coverage", value: 94 },
      { label: "Uptime", value: 99.9 },
    ],
    color: "#a855f7",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Real-Time Analytics",
    subtitle: "10K+ events/sec streaming pipeline",
    description: "Live analytics dashboard with WebSocket streaming from Node.js backend processing 10K+ events per second. Redis caching layer cut DB load by 60%. Deployed with Docker Compose and wired Prometheus/Grafana for SLA alerting.",
    tech: ["React", "Node.js", "WebSocket", "Redis", "Prometheus"],
    domain: "Data Engineering",
    icon: BarChart3,
    metrics: [
      { label: "Throughput", value: 95 },
      { label: "DB Load Reduced", value: 60 },
    ],
    color: "#f59e0b",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Enterprise Approval Hub",
    subtitle: "Unified workflow orchestration",
    description: "Architected an enterprise-wide hub consolidating DocuSign, Zoom, and Microsoft Teams into a unified REST API-driven workflow. Cut approval turnaround by 70% across 10,000+ employees with automated regression suites covering 200+ integration scenarios.",
    tech: ["Java", "REST API", "ServiceNow", "NLU"],
    domain: "Enterprise Platform",
    icon: Server,
    metrics: [
      { label: "Speed Boost", value: 70 },
      { label: "Scale", value: 85 },
    ],
    color: "#00d4ff",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Distributed Data Service",
    subtitle: "2M+ daily transaction processing",
    description: "Shipped a distributed data processing service handling 2M+ daily transaction records with connection pooling and write-behind caching to cut query latency by 40%. Refactored legacy Python monolith into modular microservices.",
    tech: ["Java", "Python", "PyTest", "Jenkins", "Docker"],
    domain: "Data Engineering",
    icon: Cpu,
    metrics: [
      { label: "Daily Volume", value: 88 },
      { label: "Latency Cut", value: 40 },
    ],
    color: "#a855f7",
    github: "https://github.com/shivareddy42",
  },
  {
    title: "Virtual Agent with NLU",
    subtitle: "AI-powered support automation",
    description: "Built conversational Virtual Agent flows with NLU intent classification, reducing L1/L2 support ticket volume by 35% and freeing engineering time for feature development across enterprise support channels.",
    tech: ["Python", "NLU", "ServiceNow", "REST API"],
    domain: "AI / Security",
    icon: Shield,
    metrics: [
      { label: "Tickets Reduced", value: 35 },
      { label: "Intent Accuracy", value: 88 },
    ],
    color: "#f59e0b",
    github: "https://github.com/shivareddy42",
  },
];

/* ── Particle explosion on click ── */
interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; color: string; size: number;
}

const useClickExplosion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ps = particlesRef.current;
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.vx *= 0.98; p.life -= 0.02;
      if (p.life <= 0) { ps.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8; ctx.shadowColor = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = p.color; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3); ctx.stroke();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    if (ps.length > 0) rafRef.current = requestAnimationFrame(animate);
  }, []);

  const explode = useCallback((x: number, y: number, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = x - rect.left; const cy = y - rect.top;
    const colors = [color, "#ffffff", `${color}88`, "#00d4ff", "#a855f7"];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40 + Math.random() * 0.5;
      const speed = 2 + Math.random() * 6;
      particlesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
        life: 0.6 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 3,
      });
    }
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) { canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, []);

  return { canvasRef, explode };
};

/* ── Metric Ring ── */
const MetricRing = ({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = () => {
        start += 2;
        if (start > value) { setAnimated(value); return; }
        setAnimated(start);
        requestAnimationFrame(step);
      };
      step();
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--border))" strokeWidth="3" opacity={0.2} />
          <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 4px ${color}55)` }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-foreground">
          {animated}{value < 100 ? "%" : ""}
        </span>
      </div>
      <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
};

/* ── Project Card ── */
const ProjectCard = ({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: (e: React.MouseEvent) => void }) => {
  const Icon = project.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm p-5 cursor-pointer transition-all duration-500"
      style={{
        boxShadow: hovered
          ? `0 0 40px ${project.color}15, 0 8px 32px ${project.color}10, inset 0 1px 0 ${project.color}15`
          : `inset 0 1px 0 hsl(var(--border) / 0.1)`,
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Glow top border */}
      <div className="absolute top-0 left-4 right-4 h-[1px] transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`, opacity: hovered ? 1 : 0 }}
      />

      {/* Scan line on hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div className="absolute left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`, animation: hovered ? "scanDown 1.5s ease-in-out infinite" : "none" }}
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg transition-all duration-300"
            style={{ backgroundColor: `${project.color}10`, border: `1px solid ${project.color}25`, boxShadow: hovered ? `0 0 16px ${project.color}20` : "none" }}
          >
            <Icon className="w-4 h-4" style={{ color: project.color }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: project.color }}>{project.domain}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/70 font-mono mb-4 leading-relaxed">{project.subtitle}</p>

      {/* Metric rings */}
      <div className="flex justify-center gap-6 mb-4">
        {project.metrics.map((m, i) => (
          <MetricRing key={m.label} value={m.value} label={m.label} color={project.color} delay={index * 150 + i * 300} />
        ))}
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground/70 font-mono">{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground/70 font-mono">+{project.tech.length - 3}</span>
        )}
      </div>

      {/* Hover hint */}
      <div className="absolute bottom-2 right-3 text-[9px] font-mono text-muted-foreground/40 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}>click to explore →</div>
    </div>
  );
};

/* ── Project Detail Modal ── */
const ProjectDetail = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
  const Icon = project.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />
      <div
        className="relative max-w-lg w-full rounded-2xl border border-border/40 bg-card/90 backdrop-blur-xl p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 60px ${project.color}22, 0 0 120px ${project.color}11` }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: project.color }} />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: project.color }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: project.color }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: project.color }} />

        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}>
            <Icon className="w-6 h-6" style={{ color: project.color }} />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: project.color }}>{project.domain}</span>
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          </div>
        </div>

        <p className="font-mono text-xs text-primary/60 mb-4">{project.subtitle}</p>

        <div className="flex justify-center gap-8 mb-6">
          {project.metrics.map((m, i) => (
            <MetricRing key={m.label} value={m.value} label={m.label} color={project.color} delay={i * 200} />
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full font-mono border transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: `${project.color}10`, borderColor: `${project.color}30`, color: project.color }}>
              {t}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-300 group"
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="w-4 h-4 text-primary group-hover:rotate-[360deg] transition-transform duration-700" />
          <span className="font-mono text-xs text-primary">View on GitHub</span>
        </a>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const ProjectsSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { canvasRef, explode } = useClickExplosion();

  const handleClick = (e: React.MouseEvent, index: number) => {
    explode(e.clientX, e.clientY, projects[index].color);
    setSelected(index);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" style={{ width: "100%", height: "100%" }} />

      <style>{`
        @keyframes scanDown { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
      `}</style>

      <div className="text-center mb-10">
        <span className="font-mono text-xs text-primary/60 tracking-[0.3em] uppercase">// projects</span>
        <h2 className="text-4xl sm:text-5xl font-bold mt-4 gradient-text">What I've Shipped</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
          Click any project to trigger a deep dive. All source on{" "}
          <a href="https://github.com/shivareddy42" target="_blank" rel="noopener noreferrer"
            className="text-primary hover:underline">GitHub</a>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} onClick={(e) => handleClick(e, i)} />
        ))}
      </div>

      {selected !== null && (
        <ProjectDetail project={projects[selected]} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default ProjectsSection;
