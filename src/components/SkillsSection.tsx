import { useEffect, useRef, useState } from "react";
import { Code2, Cloud, Brain, Wrench, Database, Shield } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Java", level: 95 },
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "C++", level: 75 },
      { name: "SQL", level: 85 },
      { name: "Go", level: 65 },
    ],
    color: "primary",
  },
  {
    title: "Frameworks",
    icon: Wrench,
    skills: [
      { name: "Spring Boot", level: 92 },
      { name: "React", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "JUnit", level: 90 },
      { name: "PyTest", level: 85 },
    ],
    color: "accent",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 82 },
      { name: "Jenkins", level: 80 },
      { name: "GitHub Actions", level: 88 },
    ],
    color: "glow-warm",
  },
  {
    title: "Data & Storage",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 78 },
      { name: "Redis", level: 82 },
      { name: "Prometheus", level: 75 },
    ],
    color: "primary",
  },
  {
    title: "AI Tools",
    icon: Brain,
    skills: [
      { name: "LangChain", level: 80 },
      { name: "OpenAI API", level: 85 },
      { name: "Copilot", level: 92 },
      { name: "Claude Code", level: 88 },
    ],
    color: "accent",
  },
  {
    title: "Concepts",
    icon: Shield,
    skills: [
      { name: "Distributed Systems", level: 88 },
      { name: "OOD", level: 92 },
      { name: "TDD", level: 85 },
      { name: "Microservices", level: 88 },
    ],
    color: "glow-warm",
  },
];

const SkillBar = ({ name, level, visible, delay, color }: { name: string; level: number; visible: boolean; delay: number; color: string }) => {
  const colorMap: Record<string, string> = {
    primary: "bg-primary",
    accent: "bg-accent",
    "glow-warm": "bg-glow-warm",
  };
  const glowMap: Record<string, string> = {
    primary: "shadow-[0_0_10px_hsl(185,80%,55%,0.4)]",
    accent: "shadow-[0_0_10px_hsl(260,70%,60%,0.4)]",
    "glow-warm": "shadow-[0_0_10px_hsl(35,90%,55%,0.4)]",
  };

  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-foreground/70 group-hover:text-foreground transition-colors">{name}</span>
        <span className={`font-mono text-[10px] text-muted-foreground transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorMap[color]} ${glowMap[color]} transition-all duration-1000 ease-out`}
          style={{
            width: visible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto" ref={ref}>
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-primary/60 tracking-[0.3em] uppercase">// arsenal</span>
        <h2 className="text-4xl sm:text-5xl font-bold mt-4 gradient-text">Tech Arsenal</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          const colorTextMap: Record<string, string> = {
            primary: "text-primary",
            accent: "text-accent",
            "glow-warm": "text-glow-warm",
          };
          const borderMap: Record<string, string> = {
            primary: "border-primary/15 hover:border-primary/30",
            accent: "border-accent/15 hover:border-accent/30",
            "glow-warm": "border-glow-warm/15 hover:border-glow-warm/30",
          };

          return (
            <div
              key={cat.title}
              className={`rounded-xl border bg-card/20 backdrop-blur-sm p-6 transition-all duration-700 hover:bg-card/50 ${borderMap[cat.color]} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-secondary/50 ${colorTextMap[cat.color]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    visible={visible}
                    delay={i * 100 + j * 80}
                    color={cat.color}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;
