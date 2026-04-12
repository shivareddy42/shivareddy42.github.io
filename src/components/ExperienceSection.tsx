import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "BeOne Medicines",
    role: "Software Developer",
    period: "Jun 2025 — Present",
    location: "San Carlos, CA (Remote)",
    type: "work" as const,
    bullets: [
      "Architecting ServiceNow-SAP Ariba integration using Document Approval API with OAuth and upsert-pattern scheduled jobs",
      "Built Approval Hub in Employee Center Pro, consolidating DocuSign, Zoom, and Teams — 70% faster approval cycles for 10K+ employees",
      "Designed ServiceNow-OneTrust integration pushing CMDB business app data including system owner fields",
      "Implemented Virtual Agent with NLU intent classification, reducing L1/L2 support ticket volume by 35%",
    ],
  },
  {
    company: "University of Central Florida",
    role: "Graduate Teaching Assistant — Computer Networks",
    period: "Aug 2025 — Present",
    location: "Orlando, FL",
    type: "education" as const,
    bullets: [
      "Instruction and code review for 170+ students per semester in networking and systems programming",
      "Automated grading infrastructure, contributing to 25% improvement in student lab performance",
    ],
  },
  {
    company: "Baantics Solutions",
    role: "Software Development Engineer",
    period: "May 2022 — Jun 2024",
    location: "Hyderabad, India",
    type: "work" as const,
    tag: "Promoted 6 months early",
    bullets: [
      "Built distributed data processing service handling 2M+ daily transactions with 40% latency reduction through connection pooling and write-behind caching",
      "Refactored Python monolith into modular microservices, reducing production incidents by 30%",
      "Established CI/CD pipelines with zero-downtime deployments for a team of 8 engineers",
    ],
  },
];

const education = [
  {
    school: "University of Central Florida",
    degree: "MS Computer Science",
    period: "Aug 2024 — May 2026",
    gpa: "4.0 GPA",
    focus: "Distributed Systems, AI/ML, Cloud Computing, IoT Security",
  },
  {
    school: "Sreenidhi Institute of Science & Technology",
    degree: "B.Tech Computer Science",
    period: "Nov 2020 — May 2024",
    gpa: "8.6/10",
    focus: "Computer Science and Engineering",
  },
];

const ExperienceSection = () => {
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
        <span className="font-mono text-xs text-primary tracking-widest uppercase">03</span>
        <div className="h-px flex-1 bg-border max-w-[60px]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Experience</span>
      </div>

      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-14 transition-all duration-700 delay-100 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        Where I've <span className="text-primary italic">Built</span>
      </h2>

      {/* Work experience */}
      <div className="space-y-8 mb-20">
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className={`relative border border-border/40 bg-card/20 rounded-sm p-6 sm:p-8 card-hover transition-all duration-700 ${
              vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${300 + i * 150}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">{exp.company}</h3>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {exp.tag && (
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-sm bg-primary/10 text-primary border border-primary/20">
                    {exp.tag}
                  </span>
                )}
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
              </div>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground/60 mb-5">{exp.location}</p>
            <ul className="space-y-3">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={`mb-6 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "800ms" }}>
        <h3 className="font-display text-2xl font-bold text-foreground mb-8">
          Education
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {education.map((ed, i) => (
          <div
            key={ed.school}
            className={`border border-border/40 bg-card/20 rounded-sm p-6 card-hover transition-all duration-700 ${
              vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${900 + i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-display text-lg font-semibold text-foreground">{ed.degree}</h4>
                <p className="text-sm text-muted-foreground">{ed.school}</p>
              </div>
              <span className="font-mono text-xs text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-sm border border-primary/20">
                {ed.gpa}
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground/60 mb-2">{ed.period}</p>
            <p className="text-sm text-muted-foreground">{ed.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
