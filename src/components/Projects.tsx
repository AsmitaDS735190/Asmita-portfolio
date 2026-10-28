import React, { useState } from 'react';
import { ExternalLink, Github, Code2, Sparkles, Layers, PlusCircle, Edit2, Check } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface ProjectsProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  statusBadge: string;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'DataPulse // Predictive Analytics Suite',
    description:
      'A data science workflow exploring exploratory data analysis (EDA), predictive statistical regression, and correlation heatmaps for structured multi-variable datasets.',
    image: '/src/assets/images/project_data_viz_1793167213039.jpg',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    demoUrl: '#demo-datapulse',
    githubUrl: 'https://github.com/asmita-kumari',
    statusBadge: 'Academic Project // Editable',
  },
  {
    id: 'proj-2',
    title: 'PathMatrix // Graph Algorithm Visualizer',
    description:
      'Interactive visualizer demonstrating traversal and shortest path computation on weighted graph networks, comparing Dijkstra and Breadth-First algorithms.',
    image: '/src/assets/images/project_algo_graph_1793167214017.jpg',
    tags: ['C++', 'Data Structures', 'Algorithms', 'Interactive Graph'],
    demoUrl: '#demo-pathmatrix',
    githubUrl: 'https://github.com/asmita-kumari',
    statusBadge: 'Core DSA // Editable',
  },
  {
    id: 'proj-3',
    title: 'CyberTerminal // Developer Portfolio Core',
    description:
      'Futuristic luxury cyberpunk personal website and developer terminal built with React 19, TypeScript, Tailwind CSS, and full-stack Express API transmission handling.',
    image: '/src/assets/images/project_dev_terminal_1793167213182.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
    demoUrl: '#',
    githubUrl: 'https://github.com/asmita-kumari',
    statusBadge: 'Production Build // Active',
  },
];

export const Projects: React.FC<ProjectsProps> = ({ theme, soundEnabled }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // New project state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('Python, Data Science');
  const [newGithub, setNewGithub] = useState('https://github.com/asmita-kumari');

  const currentTheme = THEME_CONFIGS[theme];

  const handleOpenModal = (project: ProjectItem) => {
    cyberAudio.click(soundEnabled);
    setActiveModalProject(project);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    cyberAudio.switch(soundEnabled);

    const added: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      image: '/src/assets/images/project_data_viz_1793167213039.jpg',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      demoUrl: '#',
      githubUrl: newGithub.trim() || 'https://github.com/asmita-kumari',
      statusBadge: 'Custom Showcase // Added',
    };

    setProjects([added, ...projects]);
    setNewTitle('');
    setNewDesc('');
    setIsAddingProject(false);
  };

  return (
    <section id="projects" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
              <span style={{ color: currentTheme.primary }}>03</span>
              <span>/</span>
              <span>CREATIVE REPOSITORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-light max-w-xl">
              Futuristic experiments, algorithmic visualizers, and data science explorations. Customizable placeholders ready for live repositories.
            </p>
          </div>

          <button
            onClick={() => {
              cyberAudio.click(soundEnabled);
              setIsAddingProject(!isAddingProject);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 bg-[#10141C] text-xs font-mono text-white transition-all cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" style={{ color: currentTheme.primary }} />
            <span>{isAddingProject ? 'Cancel Entry' : '+ Add Custom Project'}</span>
          </button>
        </div>

        {/* Add Project Form Collapsible */}
        {isAddingProject && (
          <form
            onSubmit={handleAddProject}
            className="mb-12 p-6 rounded-2xl glass-panel border border-white/20 space-y-4 max-w-2xl font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-bold text-white uppercase">NEW PROJECT ENTRY</span>
              <span className="text-white/40">CUSTOMIZE PORTFOLIO</span>
            </div>

            <div className="space-y-1">
              <label className="text-white/60 block">Project Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Neural Sentiment Classifier"
                className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/60 block">Description</label>
              <textarea
                required
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe the problem, technologies, and outcomes..."
                className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-white/60 block">Tech Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Python, Scikit-learn, SQL"
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 block">GitHub Repository URL</label>
                <input
                  type="url"
                  value={newGithub}
                  onChange={(e) => setNewGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-semibold text-black cursor-pointer transition-all"
              style={{ backgroundColor: currentTheme.primary }}
            >
              SAVE PROJECT TO REPOSITORY
            </button>
          </form>
        )}

        {/* 3 Elegant Futuristic Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl glass-panel overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = currentTheme.primary;
                e.currentTarget.style.boxShadow = `0 15px 35px ${currentTheme.borderGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-black/70">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />
                
                {/* Status Indicator Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#07090D]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/80">
                  {project.statusBadge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Technology Tags (Clean unboxed text with typographic separators per constitution) */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-white/50">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="hover:text-white transition-colors">{tag}</span>
                        {idx < project.tags.length - 1 && (
                          <span className="text-white/20" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 py-2 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Project</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-lg border border-white/15 bg-black/40 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Inspection Modal */}
        {activeModalProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModalProject(null)}
          >
            <div
              className="max-w-2xl w-full rounded-2xl bg-[#07090D] border border-white/20 shadow-2xl overflow-hidden font-sans"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 50px ${currentTheme.borderGlow}`,
              }}
            >
              <div className="relative aspect-video w-full bg-black">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-black"
                  aria-label="Close project modal"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="font-mono text-xs text-white/50 block mb-1">
                    PROJECT ARCHIVE // {activeModalProject.statusBadge}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {activeModalProject.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="py-2">
                  <span className="font-mono text-xs text-white/40 block mb-2">
                    TECHNOLOGIES DEPLOYED:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40">
                    Source code repository hosted on GitHub
                  </span>
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-black cursor-pointer"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    <Github className="w-4 h-4" />
                    <span>OPEN REPO ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
