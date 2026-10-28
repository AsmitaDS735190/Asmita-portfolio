import React, { useState } from 'react';
import { Award, CheckCircle2, Flag, Target, Sparkles, BookCheck, ShieldAlert, Plus } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface AchievementsProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

interface AchievementItem {
  id: string;
  category: 'certificate' | 'milestone' | 'training' | 'goal';
  title: string;
  issuerOrContext: string;
  dateOrTarget: string;
  description: string;
  isGenuine: boolean;
}

const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    category: 'certificate',
    title: 'Python for Data Science Specialization',
    issuerOrContext: 'Academic Coursework & Certified Training',
    dateOrTarget: '2025 – 2026',
    description: 'Practical training on tabular data exploration, vectorization, and statistical data cleaning with Python.',
    isGenuine: true,
  },
  {
    id: 'ach-2',
    category: 'training',
    title: 'Data Structures & Algorithms in C++',
    issuerOrContext: 'Core Computer Science Lab // GEC',
    dateOrTarget: 'Semester III – Ongoing',
    description: 'Rigorous implementation of stacks, queues, trees, and graph algorithms with optimal time-space complexity.',
    isGenuine: true,
  },
  {
    id: 'ach-3',
    category: 'milestone',
    title: 'B.Tech Data Science Cohort Second-Year Progression',
    issuerOrContext: 'Global Engineering College, Jabalpur',
    dateOrTarget: 'Academic Year 2025–2026',
    description: 'Maintaining continuous academic dedication and collaborative peer study in foundational Data Science subjects.',
    isGenuine: true,
  },
  {
    id: 'ach-4',
    category: 'goal',
    title: 'Target: Kaggle Competitions & ML Open-Source Contribution',
    issuerOrContext: 'Future Milestone [Editable Placeholder]',
    dateOrTarget: 'Upcoming 2026–2027',
    description: 'Planned target to deploy end-to-end ML prediction pipelines and contribute to community open-source repositories.',
    isGenuine: false,
  },
  {
    id: 'ach-5',
    category: 'certificate',
    title: 'Web Development Foundations & Git Workflows',
    issuerOrContext: 'Hands-on Student Project [Editable]',
    dateOrTarget: '2026 Target',
    description: 'Mastering modern front-end component systems and Git version-controlled collaboration.',
    isGenuine: false,
  },
  {
    id: 'ach-6',
    category: 'goal',
    title: 'Target: Data Science Research Paper / Tech Symposium',
    issuerOrContext: 'Future Academic Milestone [Editable]',
    dateOrTarget: 'Target 2027',
    description: 'Exploring machine learning applications in sustainability and urban predictive systems.',
    isGenuine: false,
  },
];

export const Achievements: React.FC<AchievementsProps> = ({ theme, soundEnabled }) => {
  const [items, setItems] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

  const currentTheme = THEME_CONFIGS[theme];

  const filtered = activeCategory === 'all' 
    ? items 
    : items.filter((item) => item.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certificate':
        return <Award className="w-5 h-5" />;
      case 'training':
        return <BookCheck className="w-5 h-5" />;
      case 'milestone':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'goal':
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  return (
    <section id="achievements" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
              <span style={{ color: currentTheme.primary }}>04</span>
              <span>/</span>
              <span>HONORS &amp; MILESTONES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Achievements &amp; Certifications
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-xl">
              Academic milestones, verified certifications, and aspirational technical goals. Genuine accomplishments are highlighted; rest remain editable placeholders.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#10141C] border border-white/10 shrink-0 font-mono text-xs">
            {[
              { id: 'all', label: 'All Wall' },
              { id: 'certificate', label: 'Certificates' },
              { id: 'training', label: 'Training' },
              { id: 'milestone', label: 'Milestones' },
              { id: 'goal', label: 'Goals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  cyberAudio.click(soundEnabled);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
                style={activeCategory === tab.id ? { color: currentTheme.primary } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Holographic Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                cyberAudio.click(soundEnabled);
                setSelectedItem(item);
              }}
              className="group p-6 rounded-2xl glass-panel border border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = currentTheme.primary;
                e.currentTarget.style.boxShadow = `0 10px 30px ${currentTheme.borderGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top ambient holographic gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  background: item.isGenuine
                    ? `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                    : 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-xl bg-black/50 border border-white/10"
                    style={{ color: currentTheme.primary }}
                  >
                    {getCategoryIcon(item.category)}
                  </div>

                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                      item.isGenuine
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : 'border-white/15 text-white/40 bg-white/5'
                    }`}
                  >
                    {item.isGenuine ? 'VERIFIED RECORD' : 'EDITABLE PLACEHOLDER'}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1 font-mono text-xs text-white/50">{item.issuerOrContext}</p>
                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                <span>{item.dateOrTarget}</span>
                <span className="text-[11px] group-hover:text-white transition-colors">
                  View Detail →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inspector */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#07090D] border border-white/20 shadow-2xl space-y-4 font-sans"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 50px ${currentTheme.borderGlow}`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl bg-black border border-white/10"
                    style={{ color: currentTheme.primary }}
                  >
                    {getCategoryIcon(selectedItem.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-white/50 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-white/40 uppercase block mb-1">ISSUED BY / CONTEXT:</span>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-white">
                    {selectedItem.issuerOrContext}
                  </div>
                </div>

                <div>
                  <span className="text-white/40 uppercase block mb-1">TIMEFRAME / TARGET:</span>
                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-white">
                    {selectedItem.dateOrTarget}
                  </div>
                </div>

                <div>
                  <span className="text-white/40 uppercase block mb-1">DETAILED LOG:</span>
                  <p className="text-white/80 font-sans text-sm leading-relaxed p-2.5 rounded-lg bg-black/40 border border-white/5">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-2.5 rounded-xl font-mono text-xs font-semibold text-black cursor-pointer"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  CLOSE INSPECTOR
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
