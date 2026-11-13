import React from "react";
import { Globe, ArrowUpRight, Github, Send } from "lucide-react";
import { translations } from "../data";
import { motion } from "motion/react";

interface HeaderProps {
  language: "en" | "zh";
  setLanguage: (lang: "en" | "zh") => void;
  activeSection: string;
}

export default function Header({ language, setLanguage, activeSection }: HeaderProps) {
  const t = translations.header;
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "cover", label: t.navWork },
    { id: "intro", label: t.navIntro },
    { id: "portfolio", label: t.navPortfolio },
    { id: "contact", label: t.navContact },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isScrolled ? 0 : -100, opacity: isScrolled ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: isScrolled ? "auto" : "none",
      }}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 bg-white/[0.03] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 h-16 flex items-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left spacer where logo was */}
        <div className="w-12 h-4" />

        {/* Floating Center Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-zinc-950/45 border border-zinc-800/60 backdrop-blur-md px-1.5 py-1.5 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive ? "text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    style={{ position: "absolute", inset: 0, backgroundColor: "#ffffff" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label[language]}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            id="language-toggle"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
            className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 text-zinc-300 hover:text-white text-xs font-mono font-medium"
          >
            <Globe className="w-3 h-3 text-zinc-400 animate-pulse" />
            <span>{language === "en" ? "ZH/中文" : "EN/English"}</span>
          </button>

          {/* Social links / external */}
          <div className="flex items-center space-x-1.5 border-l border-zinc-800 pl-3">
            <a
              id="ext-link-behance"
              href="https://www.behance.net"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-200"
              title="Behance"
            >
              <span className="font-mono text-[10px] font-black uppercase">BE</span>
            </a>
            <a
              id="ext-link-artstation"
              href="https://www.artstation.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors duration-200"
              title="ArtStation"
            >
              <span className="font-mono text-[10px] font-black uppercase">AS</span>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
