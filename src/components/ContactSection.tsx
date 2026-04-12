const links = [
  {
    label: "Email",
    value: "shivareddy761005@gmail.com",
    href: "mailto:shivareddy761005@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "/in/shivareddy42",
    href: "https://linkedin.com/in/shivareddy42",
  },
  {
    label: "GitHub",
    value: "shivareddy42",
    href: "https://github.com/shivareddy42",
  },
  {
    label: "Phone",
    value: "+1 (407) 949-7182",
    href: "tel:+14079497182",
  },
  {
    label: "Portfolio",
    value: "shivareddy42.github.io",
    href: "https://shivareddy42.github.io",
  },
];

const ContactSection = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs text-primary tracking-widest uppercase">05</span>
        <div className="h-px flex-1 bg-border max-w-[60px]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Contact</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Let's build <br />
            <span className="text-primary italic">something great.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
            Open to opportunities in software engineering, distributed systems,
            and platform infrastructure. Always interested in challenging problems
            at scale.
          </p>
          <a
            href="mailto:shivareddy761005@gmail.com"
            className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-sm"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="space-y-0">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-5 border-b border-border/40 hover:border-primary/30 transition-all duration-300"
            >
              <span className="font-mono text-xs text-muted-foreground tracking-wide uppercase">{link.label}</span>
              <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors duration-300">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-muted-foreground/40">
          © 2026 Shiva Reddy Peddireddy
        </p>
        <p className="font-mono text-[11px] text-muted-foreground/40">
          Built with React + Tailwind
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
