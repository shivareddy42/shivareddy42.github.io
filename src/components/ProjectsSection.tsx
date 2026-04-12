import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Mirage",
    tagline: "AI Video Generation Pipeline",
    description:
      "End-to-end pipeline: LLM scene planning, Stable Diffusion keyframe generation with batched CUDA streams and FP16, RIFE frame interpolation, and FFmpeg assembly. 7.2x speedup over naive baseline. Gradio UI with Redis queue for async job processing.",
    tech: ["Python", "PyTorch", "CUDA", "Stable Diffusion", "RIFE", "FFmpeg", "Redis", "Gradio"],
    github: "https://github.com/shivareddy42/mirage",
    highlight: "7.2x speedup",
  },
  {
    title: "Inference Server",
    tagline: "Low-Latency ML Model Serving",
    description:
      "Production inference server with dynamic batching, model versioning, and health monitoring. Supports PyTorch and ONNX Runtime backends with automatic FP16 quantization. Prometheus metrics and Grafana dashboards for SLA tracking.",
    tech: ["Python", "FastAPI", "PyTorch", "ONNX", "Docker", "Prometheus", "Grafana"],
    github: "https://github.com/shivareddy42/inference-server",
    highlight: "54% latency cut",
  },
  {
    title: "DreamForge",
    tagline: "AI Image Generation with Stable Diffusion",
    description:
      "Text-to-image generator built on Stable Diffusion with a Gradio web interface. Features prompt engineering presets, negative prompt support, and batch generation. Optimized with torch.compile and mixed-precision for fast iteration on consumer GPUs.",
    tech: ["Python", "Stable Diffusion", "Gradio", "HuggingFace", "PyTorch"],
    github: "https://github.com/shivareddy42/dreamforge",
    highlight: "Real-time generation",
  },
  {
    title: "Distributed IoT IDS",
    tagline: "ML-Powered Intrusion Detection System",
    description:
      "Distributed intrusion detection for IoT networks using ensemble ML classifiers. Docker-based MQTT broker pipeline with feature extraction, real-time anomaly scoring, and a Streamlit dashboard for network monitoring across edge devices.",
    tech: ["Python", "scikit-learn", "Docker", "MQTT", "Streamlit", "Pandas"],
    github: "https://github.com/shivareddy42/distributed-ids",
    highlight: "Real-time detection",
  },
  {
    title: "Enterprise Approval Hub",
    tagline: "Unified Workflow Orchestration @ BeOne",
    description:
      "Architected a hub consolidating DocuSign, Zoom, and Microsoft Teams approval workflows into a unified ServiceNow Employee Center Pro experience. REST API-driven with OAuth, cutting approval turnaround by 70% across 10K+ employees.",
    tech: ["ServiceNow", "REST API", "OAuth", "JavaScript", "SAP Ariba"],
    highlight: "70% faster approvals",
  },
  {
    title: "SAP Ariba Integration",
    tagline: "ServiceNow-SAP Document Approval Bridge",
    description:
      "Built a ServiceNow integration with SAP Ariba's Document Approval API. Scheduled job with upsert-pattern writes to a custom approvals table, OAuth credential management, and automated sync for cross-platform procurement workflows.",
    tech: ["ServiceNow", "SAP Ariba", "REST API", "OAuth", "Scheduled Jobs"],
    highlight: "Cross-platform sync",
  },
];

const ProjectCard = ({
  project,
  index,
  visible,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
}) => (
  <div
    className={`group relative border border-border/40 bg-card/20 rounded-sm p-6 sm:p-8 card-hover transition-all duration-700 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    style={{ transitionDelay: `${200 + index * 100}ms` }}
  >
    {/* Number */}
    <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-mono text-xs text-muted-foreground/40">
      {String(index + 1).padStart(2, "0")}
    </span>

    {/* Highlight badge */}
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="font-mono text-[11px] text-primary">{project.highlight}</span>
    </div>

    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
      {project.title}
    </h3>
    <p className="font-mono text-xs text-muted-foreground mb-4">{project.tagline}</p>

    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.description}</p>

    {/* Tech */}
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tech.map((t) => (
        <span
          key={t}
          className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-secondary/60 text-secondary-foreground/80 border border-border/30"
        >
          {t}
        </span>
      ))}
    </div>

    {/* Link */}
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-300 group/link"
      >
        <span className="link-underline">View Source</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
      </a>
    )}
  </div>
);

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Section label */}
      <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        <span className="font-mono text-xs text-primary tracking-widest uppercase">02</span>
        <div className="h-px flex-1 bg-border max-w-[60px]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Projects</span>
      </div>

      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        Selected <span className="text-primary italic">Work</span>
      </h2>
      <p className={`text-muted-foreground mb-14 max-w-xl transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        A mix of personal projects and professional work. All source available on{" "}
        <a
          href="https://github.com/shivareddy42"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary link-underline"
        >
          GitHub
        </a>.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} visible={vis} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
