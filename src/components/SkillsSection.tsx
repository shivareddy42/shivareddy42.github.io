import { useEffect, useRef, useState } from "react";

const categories = [
  {
    title: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C++", "SQL", "Go"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Spring Boot", "React", "Node.js", "FastAPI", "PyTorch", "JUnit", "PyTest"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform"],
  },
  {
    title: "Data & ML",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Stable Diffusion", "ONNX Runtime", "scikit-learn"],
  },
  {
    title: "Platforms & Tools",
    skills: ["ServiceNow", "SAP Ariba", "OneTrust", "Git", "Linux", "Prometheus", "Grafana"],
  },
  {
    title: "Concepts",
    skills: ["Distributed Systems", "Microservices", "REST APIs", "OAuth", "CI/CD", "TDD", "System Design"],
  },
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Section label */}
      <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        <span className="font-mono text-xs text-primary tracking-widest uppercase">04</span>
        <div className="h-px flex-1 bg-border max-w-[60px]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Skills</span>
      </div>

      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-14 transition-all duration-700 delay-100 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        Technical <span className="text-primary italic">Arsenal</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className={`border border-border/40 bg-card/20 rounded-sm p-6 card-hover transition-all duration-700 ${
              vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${200 + i * 80}ms` }}
          >
            <h3 className="font-mono text-xs text-primary tracking-wide uppercase mb-5">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] px-3 py-1.5 rounded-sm bg-secondary/50 text-foreground/70 border border-border/30 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
