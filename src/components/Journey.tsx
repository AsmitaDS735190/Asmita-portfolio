import React, { useState } from 'react';
import { Compass, Milestone, Sparkles, BookOpen, Laptop, Code2, Database, Rocket } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface JourneyProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

interface MilestoneItem {
  id: string;
  step: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  skillsAcquired: string[];
  icon: React.ElementType;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'm1',
    step: '01',
    year: '2023 – 2024',
    title: 'Starting My Programming Journey',
    subtitle: 'The Spark of Curiosity',
    description:
      'Wrote my first lines of code, understanding logic, control flow, problem solving, and the thrill of seeing programs execute.',
    skillsAcquired: ['Logic Building', 'Problem Solving', 'Terminal Basics'],
    icon: Code2,
  },
  {
    id: 'm2',
    step: '02',
    year: '2024',
    title: 'Beginning My B.Tech Degree',
    subtitle: 'Global Engineering College, Jabalpur',
    description:
      'Stepped into university life to pursue B.Tech in Data Science. Immersed in foundational engineering mathematics, discrete structures, and algorithmic principles.',
    skillsAcquired: ['Computer Science Fundamentals', 'Academic Rigor', 'Collaboration'],
    icon: BookOpen,
  },
  {
    id: 'm3',
    step: '03',
    year: '2024 – 2025',
    title: 'Exploring Data Science',
    subtitle: 'Unlocking Insights from Data',
    description:
      'Discovered the power of Python, Pandas, statistical modeling, and data visualization. Learned how datasets can uncover hidden trends and solve real-world problems.',
    skillsAcquired: ['Python', 'Pandas & NumPy', 'Data Visualization', 'EDA'],
    icon: Database,
  },
  {
    id: 'm4',
    step: '04',
    year: '2025',
    title: 'Learning New Programming Languages',
    subtitle: 'C++, Java & Modern Web Stack',
    description:
      'Broadened my computational horizons with C++ for object-oriented data structures, Java for robust programming paradigms, and HTML/CSS for web design.',
    skillsAcquired: ['C++', 'Java OOP', 'Data Structures', 'HTML & CSS'],
    icon: Laptop,
  },
  {
    id: 'm5',
    step: '05',
    year: '2025 – 2026',
    title: 'Building My First Portfolio Projects',
    subtitle: 'Turning Ideas Into Code',
    description:
      'Synthesizing data science techniques and web interfaces into personal projects and this digital universe portfolio. Constantly shipping and learning.',
    skillsAcquired: ['React & TypeScript', 'Git & GitHub', 'System Architecture', 'UI Polish'],
    icon: Rocket,
  },
];

export const Journey: React.FC<JourneyProps> = ({ theme, soundEnabled }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem>(MILESTONES[4]);
  const currentTheme = THEME_CONFIGS[theme];

  return (
    <section id="journey" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
            <span style={{ color: currentTheme.primary }}>05</span>
            <span>/</span>
            <span>CHRONOLOGY &amp; EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            My Learning Journey
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-xl">
            From first lines of code to advanced Data Science models and interactive web applications. Click any milestone node to view details.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (>= lg) */}
        <div className="hidden lg:block mb-16">
          <div className="relative pt-8 pb-12">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            
            {/* Active connecting glow line */}
            <div
              className="absolute top-1/2 left-8 h-0.5 -translate-y-1/2 z-0 transition-all duration-500"
              style={{
                width: `${(MILESTONES.findIndex((m) => m.id === selectedMilestone.id) / (MILESTONES.length - 1)) * 90}%`,
                backgroundColor: currentTheme.primary,
                boxShadow: `0 0 12px ${currentTheme.primary}`,
              }}
            />

            {/* Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {MILESTONES.map((item, idx) => {
                const isSelected = selectedMilestone.id === item.id;
                const IconComp = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      cyberAudio.click(soundEnabled);
                      setSelectedMilestone(item);
                    }}
                    className="group flex flex-col items-center cursor-pointer transition-all focus:outline-none"
                    aria-label={`Milestone ${item.step}: ${item.title}`}
                  >
                    {/* Glowing Node Circle */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                        isSelected
                          ? 'scale-115 text-black shadow-xl'
                          : 'bg-[#10141C] text-white/60 border-white/20 hover:border-white/50 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isSelected ? currentTheme.primary : '#10141C',
                        borderColor: isSelected ? currentTheme.primary : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: isSelected ? `0 0 25px ${currentTheme.borderGlow}` : 'none',
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* Step & Title */}
                    <div className="mt-4 text-center max-w-[180px]">
                      <span className="font-mono text-[10px] text-white/40 block">
                        STAGE {item.step} // {item.year}
                      </span>
                      <p
                        className={`text-xs font-semibold mt-1 transition-colors leading-tight ${
                          isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline (< lg) */}
        <div className="lg:hidden space-y-6 mb-12">
          {MILESTONES.map((item) => {
            const isSelected = selectedMilestone.id === item.id;
            const IconComp = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => {
                  cyberAudio.click(soundEnabled);
                  setSelectedMilestone(item);
                }}
                className={`p-5 rounded-2xl glass-panel border transition-all cursor-pointer ${
                  isSelected ? 'border-white/40 shadow-xl' : 'border-white/10'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: currentTheme.primary,
                        boxShadow: `0 0 20px ${currentTheme.borderGlow}`,
                      }
                    : undefined
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl shrink-0"
                    style={{
                      backgroundColor: isSelected ? currentTheme.primary : '#10141C',
                      color: isSelected ? '#000000' : currentTheme.primary,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-white/50 block">
                      STAGE {item.step} · {item.year}
                    </span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-white/70">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Detail Terminal Card */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/20 relative overflow-hidden font-mono">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary}, transparent)`,
            }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-2">
            <div>
              <span className="text-xs text-white/40 block mb-1">
                MILESTONE LOG // STAGE {selectedMilestone.step}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                {selectedMilestone.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/60">{selectedMilestone.year}</span>
              <span className="block text-xs font-semibold" style={{ color: currentTheme.primary }}>
                {selectedMilestone.subtitle}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed font-light mb-6">
            {selectedMilestone.description}
          </p>

          <div>
            <span className="text-xs text-white/40 block mb-3">KEY CAPABILITIES ACQUIRED:</span>
            <div className="flex flex-wrap gap-2">
              {selectedMilestone.skillsAcquired.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-md bg-black/60 border border-white/15 text-xs text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
