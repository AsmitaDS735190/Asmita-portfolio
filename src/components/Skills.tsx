import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Coffee, 
  Code2, 
  GitBranch, 
  Database, 
  Edit3, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { ThemeMode, THEME_CONFIGS, SkillItem, filterSkills } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface SkillsProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    status: 'Core Foundation & Scripting',
    description: 'Data manipulation, algorithmic problem solving, scripting, and scientific libraries.',
    iconName: 'Terminal',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    status: 'Object-Oriented & DSA',
    description: 'System-level thinking, memory models, object-oriented design, and competitive coding.',
    iconName: 'Cpu',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    status: 'Active Academic Practice',
    description: 'Core OOP paradigms, robust class hierarchies, robust standard libraries, and application architecture.',
    iconName: 'Coffee',
  },
  {
    id: 'htmlcss',
    name: 'HTML & CSS',
    category: 'tools',
    status: 'Frontend Layouts & Styling',
    description: 'Semantic markup, modern CSS grid/flexbox layouts, responsive design, and aesthetic interfaces.',
    iconName: 'Code2',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    status: 'Version Control & Workflow',
    description: 'Branching, commit hygiene, collaborative code reviews, remote synchronization, and open source exploration.',
    iconName: 'GitBranch',
  },
  {
    id: 'datascience',
    name: 'Data Science',
    category: 'datascience',
    status: 'Specialization Focus',
    description: 'Statistical reasoning, data wrangling with Pandas/NumPy, exploratory visualization, and introductory machine learning.',
    iconName: 'Database',
  },
];

export const Skills: React.FC<SkillsProps> = ({ theme, soundEnabled }) => {
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [tempStatus, setTempStatus] = useState<string>('');
  const [inspectedSkill, setInspectedSkill] = useState<SkillItem | null>(null);

  const currentTheme = THEME_CONFIGS[theme];

  const handleStartEdit = (skill: SkillItem, e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.click(soundEnabled);
    setEditingSkillId(skill.id);
    setTempStatus(skill.status);
  };

  const handleSaveStatus = (id: string, e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cyberAudio.switch(soundEnabled);
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: tempStatus.trim() || s.status } : s))
    );
    setEditingSkillId(null);
  };

  const filteredSkills = filterSkills(skills, activeFilter);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Terminal':
        return <Terminal className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Coffee':
        return <Coffee className="w-6 h-6" />;
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6" />;
      case 'Database':
      default:
        return <Database className="w-6 h-6" />;
    }
  };

  return (
    <section id="skills" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
              <span style={{ color: currentTheme.primary }}>02</span>
              <span>/</span>
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Skills &amp; Capabilities
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-xl">
              Foundational languages, developer tooling, and analytical workflows I actively practice and expand.
            </p>
          </div>

          {/* Category Tabs (Functional filter controls) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#10141C] border border-white/10 shrink-0 font-mono text-xs">
            {[
              { id: 'all', label: 'All Arsenal' },
              { id: 'languages', label: 'Languages' },
              { id: 'tools', label: 'Tools' },
              { id: 'datascience', label: 'Data Science' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  cyberAudio.click(soundEnabled);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-white/15 text-white font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                style={activeFilter === tab.id ? { color: currentTheme.primary } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const isEditing = editingSkillId === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => {
                  cyberAudio.click(soundEnabled);
                  setInspectedSkill(skill);
                }}
                className="group relative p-6 rounded-2xl glass-panel transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = currentTheme.primary;
                  e.currentTarget.style.boxShadow = `0 10px 30px ${currentTheme.borderGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Card Top: Icon & Category Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-xl bg-black/50 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: currentTheme.primary }}
                    >
                      {renderIcon(skill.iconName)}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-white/40">
                        {skill.category}
                      </span>
                      <button
                        onClick={(e) => handleStartEdit(skill, e)}
                        title="Edit learning status"
                        className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        aria-label={`Edit status for ${skill.name}`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-white transition-colors">
                    {skill.name}
                  </h3>

                  {/* Editable Learning Status Badge */}
                  <div className="mt-2">
                    {isEditing ? (
                      <form
                        onSubmit={(e) => handleSaveStatus(skill.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 mt-1"
                      >
                        <input
                          type="text"
                          value={tempStatus}
                          onChange={(e) => setTempStatus(e.target.value)}
                          className="bg-black/80 border border-white/30 rounded px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 w-full"
                          autoFocus
                          placeholder="e.g. Core Foundation"
                        />
                        <button
                          type="submit"
                          className="p-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                          title="Save status"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white/70">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: currentTheme.primary }}
                        />
                        <span>{skill.status}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Description Revealed on Hover / Active */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed group-hover:text-white/90 transition-colors">
                    {skill.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span className="flex items-center gap-1 group-hover:text-white/70 transition-colors">
                      <Info className="w-3 h-3" />
                      <span>Inspect Details</span>
                    </span>
                    <span style={{ color: currentTheme.primary }}>[ACTIVE]</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Inspected Skill Details */}
        {inspectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setInspectedSkill(null)}
          >
            <div
              className="max-w-md w-full p-6 rounded-2xl bg-[#07090D] border border-white/20 shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 40px ${currentTheme.borderGlow}`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="p-2 rounded-lg bg-black border border-white/10"
                    style={{ color: currentTheme.primary }}
                  >
                    {renderIcon(inspectedSkill.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{inspectedSkill.name}</h3>
                    <span className="text-xs font-mono text-white/50 uppercase">
                      {inspectedSkill.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setInspectedSkill(null)}
                  className="text-white/50 hover:text-white p-1 rounded-md"
                  aria-label="Close skill modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-white/40 uppercase block mb-1">Learning Status:</span>
                  <div className="p-2 rounded bg-black/60 border border-white/10 text-white font-medium">
                    {inspectedSkill.status}
                  </div>
                </div>

                <div>
                  <span className="text-white/40 uppercase block mb-1">Core Description:</span>
                  <p className="text-white/80 leading-relaxed font-sans text-sm">
                    {inspectedSkill.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-white/50 text-[11px]">
                  <span>Status verified: B.Tech 2nd Year Curriculum</span>
                  <span style={{ color: currentTheme.primary }}>STATUS: EXPANDING</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setInspectedSkill(null)}
                  className="w-full py-2 rounded-xl text-xs font-mono font-semibold text-black cursor-pointer"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  DISMISS INSPECTOR
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
