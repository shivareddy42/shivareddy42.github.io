import { Linkedin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <span className="font-mono text-xs text-primary/60 tracking-[0.3em] uppercase">// connect</span>
      <h2 className="text-4xl sm:text-5xl font-bold mt-4 gradient-text mb-6">Let's Talk</h2>
      <p className="text-muted-foreground mb-12 max-w-md mx-auto">
        Open to opportunities in software engineering, distributed systems, and ML infrastructure. Always down to build something cool.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="mailto:shivareddy761005@gmail.com"
          className="group flex items-center gap-3 px-6 py-3 rounded-lg border-glow bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:box-glow">
          <Mail className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-foreground/80 group-hover:text-foreground">Email</span>
        </a>
        <a href="https://linkedin.com/in/shivareddy42" target="_blank" rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 rounded-lg border-glow bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:box-glow">
          <Linkedin className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-foreground/80 group-hover:text-foreground">LinkedIn</span>
        </a>
        <a href="tel:+14079497182"
          className="group flex items-center gap-3 px-6 py-3 rounded-lg border-glow bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:box-glow">
          <Phone className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm text-foreground/80 group-hover:text-foreground">Call</span>
        </a>
      </div>

      <div className="mt-32 text-center">
        <p className="font-mono text-xs text-muted-foreground/40">
          © 2026 Shiva Reddy Peddireddy
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
