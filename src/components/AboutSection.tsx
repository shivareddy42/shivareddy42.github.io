import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "4.0", label: "GPA", sub: "MS CS @ UCF" },
  { value: "3+", label: "Years", sub: "Professional Exp." },
  { value: "10K+", label: "Users", sub: "Platform Scale" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      {/* Section label */}
      <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${vis ? "opacity-100" : "opacity-0 translate-y-4"}`}>
        <span className="font-mono text-xs text-primary tracking-widest uppercase">01</span>
        <div className="h-px flex-1 bg-border max-w-[60px]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">About</span>
      </div>

      <div className="grid lg:grid-cols-5 gap-16">
        {/* Left — text */}
        <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0 translate-y-6"}`}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 text-foreground">
            I build the systems <br />
            <span className="text-primary italic">behind the product.</span>
          </h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I'm a software engineer who thrives at the intersection of enterprise platforms
              and intelligent systems. Currently at <span className="text-foreground font-medium">BeOne Medicines</span>,
              I architect integrations that serve thousands of employees — connecting ServiceNow, SAP Ariba,
              OneTrust, and DocuSign into unified workflows that cut approval cycles by 70%.
            </p>
            <p>
              Before that, I was at <span className="text-foreground font-medium">Baantics Solutions</span> in Hyderabad,
              where I was promoted six months early to build distributed data services handling
              2M+ daily transactions. I refactored monoliths into microservices and set up CI/CD
              pipelines with zero-downtime deployments.
            </p>
            <p>
              Alongside my full-time role, I teach <span className="text-foreground font-medium">Computer Networks</span> as
              a Graduate TA at UCF — instruction and code reviews for 170+ students each semester.
              I'm finishing my MS in Computer Science with a 4.0 GPA in May 2026.
            </p>
          </div>
        </div>

        {/* Right — stats */}
        <div className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-700 delay-500 ${vis ? "opacity-100" : "opacity-0 translate-y-6"}`}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="p-6 rounded-sm border border-border/60 bg-card/30 card-hover"
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <span className="block font-display text-4xl sm:text-5xl font-bold text-primary mb-1">{s.value}</span>
              <span className="block font-mono text-xs text-foreground tracking-wide uppercase mb-1">{s.label}</span>
              <span className="block text-sm text-muted-foreground">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
