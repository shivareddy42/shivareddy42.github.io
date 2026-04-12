import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-primary font-semibold tracking-wider">
          SR<span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className={`font-mono text-xs tracking-wider transition-colors duration-300 uppercase ${
                activeSection === item.href.slice(1)
                  ? "text-primary text-glow"
                  : "text-muted-foreground hover:text-primary"
              }`}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/shivareddy42" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs px-3 py-2 rounded-md text-muted-foreground hover:text-primary transition-colors duration-300">
            GitHub
          </a>
          <a href="mailto:shivareddy761005@gmail.com"
            className="font-mono text-xs px-4 py-2 rounded-md border-glow bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-300">
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
