import { Cpu, MapPin, Zap, Github } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <span className="font-mono text-xs text-primary/60 tracking-[0.3em] uppercase">// about</span>

      <div className="mt-8 space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          I'm an <span className="gradient-text">ML engineer</span> who builds{" "}
          <span className="gradient-text-warm">intelligent systems that scale</span>.
        </h2>

        <div className="grid sm:grid-cols-3 gap-3 mt-8">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card/30 border border-border/30 hover:border-primary/20 transition-colors">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">SWE @ BeOne Medicines</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card/30 border border-border/30 hover:border-accent/20 transition-colors">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground/80">San Carlos, CA / Orlando, FL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card/30 border border-border/30 hover:border-glow-warm/20 transition-colors">
            <Zap className="w-4 h-4 text-glow-warm" />
            <span className="text-sm text-foreground/80">MS CS @ UCF, 4.0 GPA</span>
          </div>
        </div>

        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          I design and ship end-to-end ML systems, from training pipelines and
          model optimization to real-time inference at scale. By day I architect
          enterprise platforms at BeOne Medicines serving 10,000+ employees.
          After hours I go deep on performance: custom kernels, distributed
          training, LLM serving engines, and high-throughput data pipelines
          that turn research into production.
        </p>

        <a
          href="https://github.com/shivareddy42"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-primary/70 hover:text-primary transition-colors group"
        >
          <Github className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-700" />
          <span>See my work on GitHub →</span>
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
