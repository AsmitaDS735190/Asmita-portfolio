import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface NavbarProps {
  activeSection: string;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  matrixRain: boolean;
  onToggleMatrixRain: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  customCursor: boolean;
  onToggleCursor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  onThemeChange,
  matrixRain,
  onToggleMatrixRain,
  soundEnabled,
  onToggleSound,
  customCursor,
  onToggleCursor,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id: string) => {
    cyberAudio.click(soundEnabled);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTheme = THEME_CONFIGS[theme];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300 ${
              scrolled
                ? 'bg-[#07090D]/85 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-[#10141C]/60 backdrop-blur-md border border-white/5'
            }`}
          >
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('home');
                }}
                className="group flex items-center gap-2 text-sm sm:text-base font-mono font-bold tracking-wider text-[#E8EDF5] hover:text-white transition-colors"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm transition-all duration-300 group-hover:rotate-45"
                  style={{ backgroundColor: currentTheme.primary }}
                />
                <span className="tracking-widest">ASMITA</span>
                <span className="text-white/40 text-xs font-normal">0xDS</span>
              </a>
            </div>

            {/* Zone 2: Desktop Nav Links (Clean Typography) */}
            <div className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest text-[#E8EDF5]/70">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                      isActive ? 'text-white font-semibold' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: currentTheme.primary,
                          boxShadow: `0 0 8px ${currentTheme.primary}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Zone 3: Interactive Controls & Transmit CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Theme Selector Switches */}
              <div
                className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5"
                title="Select Neon Theme"
              >
                {(['green', 'purple', 'cyan'] as ThemeMode[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onThemeChange(t);
                      cyberAudio.switch(soundEnabled);
                    }}
                    aria-label={`Switch theme to ${THEME_CONFIGS[t].label}`}
                    className={`w-5 h-5 rounded-md transition-all duration-200 cursor-pointer ${
                      theme === t ? 'scale-110 ring-2 ring-white/50' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: THEME_CONFIGS[t].primary }}
                  />
                ))}
              </div>

              {/* Sound Toggle (Off by default) */}
              <button
                onClick={() => {
                  onToggleSound();
                  cyberAudio.switch(!soundEnabled);
                }}
                aria-label={soundEnabled ? 'Disable cyber audio sound effects' : 'Enable cyber audio sound effects'}
                title={soundEnabled ? 'Audio: ON (Synthesized Cyber Sound)' : 'Audio: OFF'}
                className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                  soundEnabled
                    ? 'border-[#B6FF5C]/50 text-[#B6FF5C] bg-[#B6FF5C]/10 shadow-[0_0_12px_rgba(182,255,92,0.2)]'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/20 bg-black/30'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Matrix Rain Toggle */}
              <button
                onClick={() => {
                  onToggleMatrixRain();
                  cyberAudio.click(soundEnabled);
                }}
                aria-label={matrixRain ? 'Disable background digital rain' : 'Enable background digital rain'}
                title={matrixRain ? 'Digital Rain: Active' : 'Digital Rain: Paused'}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                  matrixRain
                    ? 'border-white/30 text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                    : 'border-white/10 text-white/50 hover:text-white bg-black/30'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">MATRIX</span>
              </button>

              {/* Transmit Message Button */}
              <button
                onClick={() => scrollTo('contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wide transition-all duration-200 cursor-pointer shadow-sm text-black"
                style={{
                  backgroundColor: currentTheme.primary,
                  boxShadow: `0 0 16px ${currentTheme.borderGlow}`,
                }}
              >
                <span>TRANSMIT</span>
                <span className="text-[10px]">↗</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  cyberAudio.click(soundEnabled);
                }}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden p-2 rounded-xl border border-white/10 text-white/70 hover:text-white bg-black/30 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2">
            <div className="max-w-7xl mx-auto p-4 rounded-2xl bg-[#07090D]/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-3 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-white/60">
                <span>SYSTEM NAVIGATION</span>
                <span style={{ color: currentTheme.primary }}>STATUS: ONLINE</span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left py-2 px-3 rounded-lg text-sm transition-all cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  style={activeSection === link.id ? { borderLeft: `3px solid ${currentTheme.primary}` } : undefined}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-xs text-white/50">THEME ACCENT:</span>
                <div className="flex items-center gap-2">
                  {(['green', 'purple', 'cyan'] as ThemeMode[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        onThemeChange(t);
                        cyberAudio.switch(soundEnabled);
                      }}
                      className={`w-6 h-6 rounded-md cursor-pointer ${
                        theme === t ? 'ring-2 ring-white scale-110' : 'opacity-60'
                      }`}
                      style={{ backgroundColor: THEME_CONFIGS[t].primary }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    onToggleMatrixRain();
                    cyberAudio.click(soundEnabled);
                  }}
                  className="py-1.5 px-3 rounded-lg border border-white/10 bg-white/5 text-white/80 cursor-pointer"
                >
                  Matrix Rain: {matrixRain ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => {
                    onToggleSound();
                    cyberAudio.switch(!soundEnabled);
                  }}
                  className="py-1.5 px-3 rounded-lg border border-white/10 bg-white/5 text-white/80 cursor-pointer"
                >
                  Audio FX: {soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
