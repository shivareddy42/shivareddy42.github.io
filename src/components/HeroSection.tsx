import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const roles = [
  "Software Engineer",
  "Systems Builder",
  "ML Infrastructure",
  "Platform Architect",
];

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setRoleIdx((p) => (p + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[150px] anim-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[120px] anim-float" style={{ animationDelay: "2.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Status line */}
        <div
          className={`flex items-center gap-3 mb-10 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs text-muted-foreground tracking-wide">
            Software Developer @ BeOne Medicines
          </span>
        </div>

        {/* Name */}
        <h1
          className={`font-display font-bold leading-[0.9] tracking-tight mb-6 ${loaded ? "anim-hero-name" : "opacity-0"}`}
          style={{ animationDelay: "400ms" }}
        >
          <span className="block text-6xl sm:text-8xl md:text-[7.5rem] text-foreground">
            Shiva Reddy
          </span>
          <span className="block text-5xl sm:text-7xl md:text-[6rem] text-primary mt-2">
            Peddireddy
          </span>
        </h1>

        {/* Accent line */}
        <div
          className={`h-px bg-primary mb-8 ${loaded ? "anim-hero-line" : "opacity-0"}`}
          style={{ animationDelay: "800ms", maxWidth: "200px" }}
        />

        {/* Role typewriter */}
        <div
          className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="font-mono text-sm sm:text-base text-muted-foreground">$</span>
          <span className="font-mono text-sm sm:text-base text-foreground">{text}</span>
          <span className="inline-block w-[2px] h-5 bg-primary animate-pulse" />
        </div>

        {/* Description */}
        <p
          className={`max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed mb-12 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "1200ms" }}
        >
          Building enterprise platforms at scale. MS Computer Science @ UCF with a 4.0 GPA.
          I design systems that bridge the gap between research and production.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center gap-4 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "1400ms" }}
        >
          <a
            href="https://github.com/shivareddy42"
            target="_blank"
            rel="noopener noreferrer"
            className="group font-mono text-sm px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/shivareddy42"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-6 py-3 border border-border text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 rounded-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:shivareddy761005@gmail.com"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300 link-underline"
          >
            shivareddy761005@gmail.com
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "2000ms" }}
      >
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
