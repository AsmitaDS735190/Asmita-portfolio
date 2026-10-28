import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { Achievements } from './components/Achievements.tsx';
import { Journey } from './components/Journey.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { MatrixRain } from './components/MatrixRain.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { ThemeMode, THEME_CONFIGS } from './utils/portfolio.ts';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [theme, setTheme] = useState<ThemeMode>('green');
  const [matrixRain, setMatrixRain] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [customCursor, setCustomCursor] = useState<boolean>(true);

  // Set CSS custom properties for active theme
  useEffect(() => {
    const config = THEME_CONFIGS[theme];
    document.documentElement.style.setProperty('--theme-primary', config.primary);
    document.documentElement.style.setProperty('--theme-secondary', config.secondary);
  }, [theme]);

  // Section observer for active navbar links
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'achievements', 'journey', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 150;
          if (scrollY >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090D] text-[#E8EDF5] selection:bg-[#B6FF5C]/30 selection:text-[#B6FF5C] font-sans antialiased overflow-x-hidden">
      {/* Background Matrix Rain Effect */}
      <MatrixRain enabled={matrixRain} theme={theme} />

      {/* Desktop Custom Cyber Cursor */}
      <CustomCursor enabled={customCursor} theme={theme} />

      {/* Floating Glass Navigation */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        onThemeChange={setTheme}
        matrixRain={matrixRain}
        onToggleMatrixRain={() => setMatrixRain(!matrixRain)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        customCursor={customCursor}
        onToggleCursor={() => setCustomCursor(!customCursor)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero theme={theme} soundEnabled={soundEnabled} />
        <About theme={theme} soundEnabled={soundEnabled} />
        <Skills theme={theme} soundEnabled={soundEnabled} />
        <Projects theme={theme} soundEnabled={soundEnabled} />
        <Achievements theme={theme} soundEnabled={soundEnabled} />
        <Journey theme={theme} soundEnabled={soundEnabled} />
        <Contact theme={theme} soundEnabled={soundEnabled} />
      </main>

      {/* Terminal Footer */}
      <Footer theme={theme} soundEnabled={soundEnabled} />
    </div>
  );
}
