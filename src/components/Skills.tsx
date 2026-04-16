import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiPython, SiCplusplus, SiOpenjdk, SiJavascript, SiTypescript,
  SiTensorflow, SiScikitlearn, SiLangchain, SiOpenai,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiVite,
  SiNodedotjs, SiDeno, SiSupabase, SiGit, SiPostman, SiDocker,
  SiLeaflet, SiPandas, SiNumpy, SiFastapi,
} from 'react-icons/si';
import { VscTerminalBash } from 'react-icons/vsc';
import { TbBrain } from 'react-icons/tb';

type Skill = { name: string; icon?: React.ReactNode; color?: string };
type SkillCategory = {
  name: string;
  terminalName: string;
  accentColor: string;
  skills: Skill[];
};

const iconStyle = (color = '#8892B0') => ({
  fontSize: '1rem',
  color,
  flexShrink: 0 as const,
});

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    terminalName: 'languages',
    accentColor: '#00F5FF',
    skills: [
      { name: 'Python', icon: <SiPython style={iconStyle('#3776AB')} />, color: '#3776AB' },
      { name: 'C++', icon: <SiCplusplus style={iconStyle('#00599C')} />, color: '#00599C' },
      { name: 'Java', icon: <SiOpenjdk style={iconStyle('#ED8B00')} />, color: '#ED8B00' },
      { name: 'JavaScript', icon: <SiJavascript style={iconStyle('#F7DF1E')} />, color: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript style={iconStyle('#3178C6')} />, color: '#3178C6' },
    ],
  },
  {
    name: 'AI & Machine Learning',
    terminalName: 'ai_ml',
    accentColor: '#7B2FFF',
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow style={iconStyle('#FF6F00')} />, color: '#FF6F00' },
      { name: 'scikit-learn', icon: <SiScikitlearn style={iconStyle('#F7931E')} />, color: '#F7931E' },
      { name: 'LangChain', icon: <SiLangchain style={iconStyle('#7B2FFF')} />, color: '#7B2FFF' },
      { name: 'OpenAI APIs', icon: <SiOpenai style={iconStyle('#10A37F')} />, color: '#10A37F' },
      { name: 'RAG Pipelines', icon: <TbBrain style={iconStyle('#7B2FFF')} />, color: '#7B2FFF' },
      { name: 'Pandas', icon: <SiPandas style={iconStyle('#150458')} />, color: '#9B59B6' },
      { name: 'NumPy', icon: <SiNumpy style={iconStyle('#013243')} />, color: '#4ECDC4' },
    ],
  },
  {
    name: 'Frontend',
    terminalName: 'frontend',
    accentColor: '#00FF88',
    skills: [
      { name: 'React.js', icon: <SiReact style={iconStyle('#61DAFB')} />, color: '#61DAFB' },
      { name: 'Next.js', icon: <SiNextdotjs style={iconStyle('#fff')} />, color: '#ffffff' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss style={iconStyle('#38BDF8')} />, color: '#38BDF8' },
      { name: 'Framer Motion', icon: <SiFramer style={iconStyle('#fff')} />, color: '#ffffff' },
      { name: 'Vite', icon: <SiVite style={iconStyle('#646CFF')} />, color: '#646CFF' },
    ],
  },
  {
    name: 'Backend & APIs',
    terminalName: 'backend',
    accentColor: '#00F5FF',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs style={iconStyle('#339933')} />, color: '#339933' },
      { name: 'FastAPI', icon: <SiFastapi style={iconStyle('#009688')} />, color: '#009688' },
      { name: 'Deno', icon: <SiDeno style={iconStyle('#fff')} />, color: '#ffffff' },
      { name: 'Supabase', icon: <SiSupabase style={iconStyle('#3ECF8E')} />, color: '#3ECF8E' },
      { name: 'REST APIs', icon: <SiPostman style={iconStyle('#FF6C37')} />, color: '#FF6C37' },
    ],
  },
  {
    name: 'Tools & DevOps',
    terminalName: 'tools',
    accentColor: '#7B2FFF',
    skills: [
      { name: 'Git', icon: <SiGit style={iconStyle('#F05032')} />, color: '#F05032' },
      { name: 'Docker', icon: <SiDocker style={iconStyle('#2496ED')} />, color: '#2496ED' },
      { name: 'Leaflet.js', icon: <SiLeaflet style={iconStyle('#199900')} />, color: '#199900' },
      { name: 'Bash/Shell', icon: <VscTerminalBash style={iconStyle('#00FF88')} />, color: '#00FF88' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.04 },
  }),
};

const Skills: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? skillCategories.filter((c) => c.terminalName === activeFilter)
    : skillCategories;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="mesh-orb w-72 h-72 bg-cyan-neon/8 top-10 right-10" style={{ position: 'absolute' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">04. Toolkit</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="w-16 h-1 mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #00F5FF, #00FF88)' }} />
        </motion.div>

        {/* Terminal-style filter bar */}
        <motion.div
          className="glass-card p-4 mb-8 flex flex-wrap gap-2 items-center"
          style={{ border: '1px solid rgba(0,245,255,0.1)' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mono text-sm text-emerald-neon mr-1">❯</span>
          <span className="font-mono text-sm text-text-muted mr-3">filter --category</span>
          <button
            className="font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200"
            style={{
              background: !activeFilter ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.04)',
              color: !activeFilter ? '#00F5FF' : '#8892B0',
              border: `1px solid ${!activeFilter ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}
            onClick={() => setActiveFilter(null)}
          >
            all
          </button>
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.terminalName}
              className="font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200"
              style={{
                background: activeFilter === cat.terminalName ? cat.accentColor + '15' : 'rgba(255,255,255,0.04)',
                color: activeFilter === cat.terminalName ? cat.accentColor : '#8892B0',
                border: `1px solid ${activeFilter === cat.terminalName ? cat.accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
              }}
              onClick={() => setActiveFilter(activeFilter === cat.terminalName ? null : cat.terminalName)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.terminalName}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill Category Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {filtered.map((cat) => (
            <motion.div
              key={cat.name}
              variants={cardVariants}
              layout
              className="glass-card p-6 group"
              whileHover={{
                borderColor: cat.accentColor + '40',
                boxShadow: `0 0 30px ${cat.accentColor}10`,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Category header — terminal path style */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-1.5 h-6 rounded-full"
                  style={{ background: cat.accentColor, boxShadow: `0 0 8px ${cat.accentColor}60` }}
                />
                <div>
                  <p className="font-mono text-xs" style={{ color: cat.accentColor + '80' }}>
                    ~/skills/{cat.terminalName}
                  </p>
                  <h3 className="font-semibold text-text-primary text-sm">{cat.name}</h3>
                </div>
              </div>

              {/* Skill pills with icons */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i}
                    variants={pillVariants}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid rgba(255,255,255,0.07)`,
                    }}
                    whileHover={{
                      scale: 1.06,
                      y: -2,
                      background: (skill.color ?? cat.accentColor) + '15',
                      borderColor: (skill.color ?? cat.accentColor) + '30',
                    }}
                  >
                    {skill.icon && <span className="flex-shrink-0">{skill.icon}</span>}
                    <span className="font-mono text-xs text-text-secondary">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;