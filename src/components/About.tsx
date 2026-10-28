import React, { useState } from 'react';
import { GraduationCap, Database, Building2, Terminal, Compass, Target, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface AboutProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

export const About: React.FC<AboutProps> = ({ theme, soundEnabled }) => {
  const [missionExpanded, setMissionExpanded] = useState(false);
  const currentTheme = THEME_CONFIGS[theme];

  const infoCards = [
    {
      label: 'Education',
      value: 'B.Tech, 2nd Year',
      subtext: 'Undergraduate Program',
      icon: GraduationCap,
      code: 'EDU_01',
    },
    {
      label: 'Specialization',
      value: 'Data Science',
      subtext: 'Analytics & Machine Intelligence',
      icon: Database,
      code: 'SPEC_DS',
    },
    {
      label: 'College',
      value: 'Global Engineering College',
      subtext: 'Jabalpur, Madhya Pradesh',
      icon: Building2,
      code: 'INST_GEC',
    },
    {
      label: 'Current Focus',
      value: 'Programming & Web Dev',
      subtext: 'Full-stack foundations & Algorithms',
      icon: Terminal,
      code: 'FOCUS_DEV',
    },
  ];

  return (
    <section id="about" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
            <span style={{ color: currentTheme.primary }}>01</span>
            <span>/</span>
            <span>IDENTITY ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            A Little About Me
          </h2>
          <div
            className="w-16 h-1 rounded-full mt-2"
            style={{ backgroundColor: currentTheme.primary }}
          />
        </div>

        {/* Profile Grid: Left Avatar & Frame, Right Narrative & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar Column with Glowing Cyber Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Outer glowing orbital ring */}
              <div
                className="absolute -inset-4 rounded-full opacity-60 blur-xl transition-all duration-500 group-hover:opacity-100"
                style={{ backgroundColor: currentTheme.primary }}
              />

              {/* Holographic frame wrapper */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-[#10141C] border-2 transition-transform duration-500 group-hover:scale-102"
                style={{
                  borderColor: currentTheme.primary,
                  boxShadow: `0 0 35px ${currentTheme.borderGlow}`,
                }}
              >
                {/* Circular Profile Image */}
                <div className="w-full h-full rounded-full overflow-hidden bg-black/80 relative">
                  <img
                    src="/src/assets/images/asmita_avatar_1793167211114.jpg"
                    alt="Asmita Kumari - Data Science Student"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                </div>
              </div>

              {/* Status Badge beneath image */}
              <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#10141C]/90 border border-white/10 font-mono text-xs text-[#E8EDF5]/80 shadow-lg">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
                <span>STUDENT DEVELOPER // GEC JABALPUR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Information Cards */}
          <div className="lg:col-span-7 space-y-8">
            {/* Introduction Paragraph */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)`,
                }}
              />
              <p className="text-lg sm:text-xl text-[#E8EDF5] leading-relaxed font-light">
                &ldquo;I&apos;m <span className="font-semibold text-white">Asmita Kumari</span>, a Data Science student passionate about technology, programming, creativity, and continuous learning. I&apos;m exploring the world of code, building new skills, and turning ideas into projects.&rdquo;
              </p>
            </div>

            {/* Information Cards 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.label}
                    className="p-5 rounded-xl glass-panel glass-panel-hover flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="p-2.5 rounded-lg bg-black/40 border border-white/10"
                        style={{ color: currentTheme.primary }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] text-white/40 tracking-wider">
                        {card.code}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                        {card.label}
                      </span>
                      <p className="text-base sm:text-lg font-semibold text-white mt-0.5">
                        {card.value}
                      </p>
                      <p className="text-xs text-white/60 mt-0.5">{card.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Card: CURRENT MISSION */}
            <div
              onClick={() => {
                cyberAudio.click(soundEnabled);
                setMissionExpanded(!missionExpanded);
              }}
              className="group p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden relative bg-[#10141C]/80 hover:bg-[#10141C]"
              style={{
                borderColor: missionExpanded ? currentTheme.primary : 'rgba(255, 255, 255, 0.1)',
                boxShadow: missionExpanded ? `0 0 25px ${currentTheme.borderGlow}` : 'none',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setMissionExpanded(!missionExpanded);
                }
              }}
              aria-expanded={missionExpanded}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      backgroundColor: `${currentTheme.primary}20`,
                      color: currentTheme.primary,
                    }}
                  >
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs tracking-wider uppercase text-white/50">
                      CORE DIRECTIVE
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white">
                      CURRENT MISSION
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-white/50 hidden sm:inline">
                    {missionExpanded ? '[COLLAPSE]' : '[EXPAND]'}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 text-white/60 transition-transform duration-300 ${
                      missionExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </div>

              {/* Mantra Text */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                <Sparkles className="w-4 h-4 shrink-0" style={{ color: currentTheme.primary }} />
                <p className="font-mono text-sm sm:text-base font-medium tracking-wide text-white">
                  &ldquo;Learn. Build. Experiment. Repeat.&rdquo;
                </p>
              </div>

              {/* Expanded Narrative */}
              {missionExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-white/80 space-y-2 font-mono leading-relaxed bg-black/40 p-4 rounded-xl">
                  <p>
                    &gt; Every technical journey is forged through deliberate practice. As a 2nd-year student, my goal is to blend rigorous algorithmic thinking with data-driven problem solving.
                  </p>
                  <p>
                    &gt; Exploring machine learning models, modern web interfaces, and version control architecture daily to transform curiosity into real-world impact.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
