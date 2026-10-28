import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface FooterProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

export const Footer: React.FC<FooterProps> = ({ theme, soundEnabled }) => {
  const currentTheme = THEME_CONFIGS[theme];

  const scrollToTop = () => {
    cyberAudio.click(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07090D] border-t border-white/10 pt-16 pb-12 font-mono text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Terminal Cursor */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white tracking-widest">
              <span>DESIGNED WITH CURIOSITY // BUILT BY ASMITA</span>
              <span
                className="w-2.5 h-4 inline-block animate-terminal-blink"
                style={{ backgroundColor: currentTheme.primary }}
              />
            </div>
            <p className="text-white/40 text-xs">
              B.Tech Data Science // Global Engineering College, Jabalpur
            </p>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:kumariasmita826@gmail.com"
              aria-label="Email Asmita Kumari"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/asmita-kumari"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/asmita-kumari"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 bg-[#10141C] text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[11px]">
          <div>
            <span>© {new Date().getFullYear()} Asmita Kumari. All systems operational.</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Aesthetic: NEON SOUL // DIGITAL UNIVERSE</span>
            <span>·</span>
            <span style={{ color: currentTheme.primary }}>STATUS: ONLINE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
