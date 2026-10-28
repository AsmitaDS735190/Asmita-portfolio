import React, { useState, useEffect } from 'react';
import { ArrowDown, Code2, Sparkles, Terminal as TerminalIcon, Cpu, Binary, Layers } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface HeroProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

const CYCLING_TITLES = [
  'Data Science Student',
  'Aspiring Developer',
  'Creative Thinker',
  'Tech Explorer',
];

const TERMINAL_LOGS = [
  'INITIALIZING DIGITAL UNIVERSE CORE...',
  'NEURAL GRAPH PIPELINE: ONLINE',
  'HOST: GLOBAL ENG COLLEGE // JABALPUR',
  'STUDENT IDENT: ASMITA KUMARI [B.TECH 2ND YR]',
  'DATA ARCHITECTURE SYNCHRONIZED [PANDAS/SKLEARN]',
  'ENVIRONMENT READY. WELCOME, VISITOR.',
];

export const Hero: React.FC<HeroProps> = ({ theme, soundEnabled }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  const currentTheme = THEME_CONFIGS[theme];

  // Cycling Typewriter Effect for subtitles
  useEffect(() => {
    const currentFull = CYCLING_TITLES[titleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFull.length) {
        timer = setTimeout(() => {
          setDisplayText(currentFull.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % CYCLING_TITLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  // Decorative live terminal logger
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    cyberAudio.click(soundEnabled);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden cyber-grid-bg"
    >
      {/* Ambient background glow orbs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentTheme.primary }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-25"
        style={{ backgroundColor: currentTheme.secondary }}
      />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Narrative & Terminal Kicker */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Terminal status label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10141C]/80 border border-white/10 backdrop-blur-md">
              <span
                className="w-2 h-2 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: currentTheme.primary }}
              />
              <span
                className="w-2 h-2 -ml-4.5 rounded-full"
                style={{ backgroundColor: currentTheme.primary }}
              />
              <span className="font-mono text-xs tracking-wider uppercase text-[#E8EDF5]/90">
                SYSTEM ONLINE // WELCOME TO MY DIGITAL WORLD
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                Hey, I&apos;m{' '}
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${currentTheme.primary} 0%, #E8EDF5 50%, ${currentTheme.secondary} 100%)`,
                  }}
                >
                  Asmita.
                </span>
              </h1>
              
              <p className="text-lg sm:text-2xl font-light text-[#E8EDF5]/80 max-w-xl">
                Building my future, one line of code at a time.
              </p>
            </div>

            {/* Dynamic Typing Title Badge */}
            <div className="flex items-center gap-2.5 py-1.5 px-4 rounded-xl bg-[#10141C]/70 border border-white/10 font-mono text-sm sm:text-base text-[#E8EDF5]">
              <span className="text-white/40">&gt;</span>
              <span className="font-medium text-white">{displayText}</span>
              <span
                className="w-2 h-4 inline-block animate-terminal-blink"
                style={{ backgroundColor: currentTheme.primary }}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('about')}
                className="group relative px-6 py-3 rounded-xl font-mono text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer overflow-hidden shadow-lg text-black"
                style={{
                  backgroundColor: currentTheme.primary,
                  boxShadow: `0 0 25px ${currentTheme.borderGlow}`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore My Universe</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>

              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 rounded-xl font-mono text-sm font-semibold tracking-wider text-[#E8EDF5] bg-[#10141C]/80 border border-white/15 hover:border-white/40 hover:bg-[#10141C] transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <span>View My Projects</span>
              </button>
            </div>

            {/* Live Terminal Animation Box */}
            <div className="w-full max-w-lg mt-4 p-3.5 rounded-xl bg-[#07090D]/90 border border-white/10 font-mono text-xs text-[#E8EDF5]/70 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-white/40">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-white/60" />
                  <span>TERMINAL_OUTPUT.LOG</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-white/40 font-mono flex items-center justify-between">
                  <span>[LIVE STREAM]</span>
                  <span className="text-[10px]" style={{ color: currentTheme.primary }}>● ACTIVE</span>
                </div>
                <div className="text-white/90 truncate flex items-center gap-2">
                  <span className="text-emerald-400">&gt;&gt;</span>
                  <span>{TERMINAL_LOGS[logIndex]}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Abstract Glowing Digital Orb & Cyber Environment */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 sm:w-96 aspect-square flex items-center justify-center">
              
              {/* Outer decorative spinning rings */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin"
                style={{ animationDuration: '30s' }}
              />
              <div
                className="absolute -inset-4 rounded-full border border-white/10 animate-spin"
                style={{ animationDuration: '45s', animationDirection: 'reverse' }}
              />

              {/* Glowing Orb Image Asset */}
              <div className="relative w-64 sm:w-80 h-64 sm:h-80 rounded-full overflow-hidden border-2 shadow-2xl transition-all duration-500 group"
                style={{
                  borderColor: currentTheme.primary,
                  boxShadow: `0 0 50px ${currentTheme.borderGlow}`,
                }}
              >
                <img
                  src="/src/assets/images/cyber_orb_core_1793167211294.jpg"
                  alt="Neon Soul Digital Orb Core"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Cyber Scanline overlay */}
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
                
                {/* Soft gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090D]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Code Snippet Card #1 */}
              <div className="absolute -top-4 -right-4 sm:-right-8 p-3 rounded-xl bg-[#10141C]/90 border border-white/10 backdrop-blur-md shadow-2xl font-mono text-[11px] text-[#E8EDF5]/90 animate-bounce"
                style={{ animationDuration: '6s' }}
              >
                <div className="flex items-center gap-1.5 text-white/40 mb-1">
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>pandas.core</span>
                </div>
                <p className="text-white font-semibold">df.explore(insights=True)</p>
              </div>

              {/* Floating System Tag Card #2 */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 p-3 rounded-xl bg-[#10141C]/90 border border-white/10 backdrop-blur-md shadow-2xl font-mono text-[11px] text-[#E8EDF5]/90 animate-bounce"
                style={{ animationDuration: '7s' }}
              >
                <div className="flex items-center gap-1.5 text-white/40 mb-1">
                  <Binary className="w-3 h-3" style={{ color: currentTheme.primary }} />
                  <span>ALGO_NODE</span>
                </div>
                <p className="text-white font-semibold">B.Tech DS // Yr 2</p>
              </div>

              {/* Floating Orbital Node #3 */}
              <div className="absolute top-1/2 -left-8 p-2 rounded-lg bg-[#07090D]/90 border border-white/15 text-[10px] font-mono text-white/70 backdrop-blur-sm hidden sm:block">
                <span>LATENCY: 0.2ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex flex-col items-center justify-center pt-8 z-10">
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll to About Me section"
          className="group flex flex-col items-center gap-2 font-mono text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span className="tracking-widest">INITIALIZE SCROLL</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-white/50 transition-colors">
            <span
              className="w-1.5 h-2.5 rounded-full animate-bounce"
              style={{ backgroundColor: currentTheme.primary }}
            />
          </div>
        </button>
      </div>
    </section>
  );
};
