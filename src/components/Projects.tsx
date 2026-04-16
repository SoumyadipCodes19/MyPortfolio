import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

const featuredProjects = [
  {
    id: 'sql-builder',
    title: 'Visual SQL Builder',
    subtitle: 'Full-Stack Query Engine',
    description:
      'Engineered a full-stack Visual SQL Builder with a React-based UI and a secure Deno-powered Supabase Edge Function, enabling users to build complex SQL queries visually and safely without writing raw SQL.',
    tags: ['React.js', 'Deno', 'Supabase', 'Edge Functions', 'SQL', 'TypeScript'],
    github: 'https://github.com/SoumyadipCodes19/Visual_SQL_Builder',
    demo: 'https://visual-sql-builder.vercel.app/',
    accentColor: '#00F5FF',
    pattern: 'grid',
  },
  {
    id: 'deadzone',
    title: 'DeadZone',
    subtitle: 'Network Intelligence App',
    description:
      'Engineered a React.js web application that maps network dead zones through real-time speed testing and geolocation data, featuring an intelligent reliability scoring system to optimize network coverage across locations.',
    tags: ['React.js', 'Leaflet.js', 'Geolocation API', 'Axios', 'Tailwind'],
    github: 'https://github.com/SoumyadipCodes19/DeadZone',
    demo: 'https://deadzone-beige.vercel.app/',
    accentColor: '#7B2FFF',
    pattern: 'dots',
  },
];

const otherProjects = [
  {
    id: 'returns-intelligence',
    title: 'Returns Intelligence System',
    subtitle: 'AI-Powered ML System',
    description:
      'A full-stack AI system predicting product return likelihood for retail using a Stacking Classifier (Random Forest + Logistic Regression) with intelligent routing — Restock, Resell, Donate, or Manual Review. ~85% accuracy.',
    tags: ['Python', 'FastAPI', 'scikit-learn', 'React', 'Pandas', 'NumPy'],
    github: 'https://github.com/SoumyadipCodes19/returns-intelligence-system',
    demo: null,
    accentColor: '#00FF88',
    badge: 'AI · ML',
  },
  {
    id: 'chrona',
    title: 'CHRONA',
    subtitle: 'Premium Calendar App',
    description:
      'A premium, high-tactile wall calendar built with Next.js 14, TypeScript, and Framer Motion — blending physical calendar aesthetics with digital productivity, Web Audio API, and ICS export functionality.',
    tags: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Web Audio API', 'CSS'],
    github: 'https://github.com/SoumyadipCodes19/CHRONA',
    demo: 'https://chrona-pi.vercel.app',
    accentColor: '#00F5FF',
    badge: 'Design · UX',
  },
  {
    id: 'csv-plotter',
    title: 'CSV Plotter',
    subtitle: 'Data Visualization Tool',
    description:
      'A React-based CSV visualization tool that converts spreadsheet data into interactive, publication-ready charts with real-time rendering, multiple chart types, and a clean intuitive interface.',
    tags: ['React.js', 'Recharts', 'Tailwind CSS', 'CSV', 'JavaScript'],
    github: 'https://github.com/SoumyadipCodes19/CSV_Plotter',
    demo: 'https://csv-plotter.vercel.app',
    accentColor: '#7B2FFF',
    badge: 'Data · Viz',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Projects: React.FC = () => {
  const [_hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div
        className="mesh-orb w-80 h-80 bg-emerald-neon/8 bottom-0 left-20"
        style={{ position: 'absolute' }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">03. Work</p>
          <h2 className="section-title">Projects</h2>
          <div
            className="w-16 h-1 mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, #7B2FFF, #00FF88)' }}
          />
        </motion.div>

        {/* Featured — 2-col top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="relative group"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.div
                className="glass-card p-8 h-full relative overflow-hidden"
                whileHover={{
                  scale: 1.01,
                  boxShadow: `0 0 50px ${project.accentColor}20`,
                  borderColor: project.accentColor + '40',
                }}
                style={{ minHeight: '300px' }}
                transition={{ duration: 0.25 }}
              >
                {/* Hover pattern */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      project.pattern === 'grid'
                        ? `linear-gradient(${project.accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}08 1px, transparent 1px)`
                        : `radial-gradient(${project.accentColor}15 1px, transparent 1px)`,
                    backgroundSize:
                      project.pattern === 'grid' ? '30px 30px' : '20px 20px',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${project.accentColor}08, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className="font-mono text-xs mb-2 block"
                        style={{ color: project.accentColor }}
                      >
                        {project.subtitle}
                      </span>
                      <h3 className="text-2xl font-bold text-text-primary">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-xs px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: project.accentColor + '15',
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                      }}
                    >
                      Featured
                    </span>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 rounded-full"
                        style={{
                          background: project.accentColor + '10',
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <FiGithub className="w-4 h-4" /> Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono transition-colors"
                      style={{ color: project.accentColor }}
                      whileHover={{ x: 3 }}
                    >
                      <FiExternalLink className="w-4 h-4" /> Live Demo{' '}
                      <FiArrowRight className="w-3 h-3" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects — 3-col bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i + 2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative group"
            >
              <motion.div
                className="glass-card p-6 h-full relative overflow-hidden flex flex-col"
                whileHover={{
                  scale: 1.015,
                  boxShadow: `0 0 35px ${project.accentColor}18`,
                  borderColor: project.accentColor + '35',
                }}
                transition={{ duration: 0.22 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${project.accentColor}06, transparent 65%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="font-mono text-xs block mb-1"
                        style={{ color: project.accentColor }}
                      >
                        {project.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2"
                      style={{
                        background: project.accentColor + '12',
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}25`,
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: project.accentColor + '08',
                          color: project.accentColor + 'CC',
                          border: `1px solid ${project.accentColor}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                      whileHover={{ x: 2 }}
                    >
                      <FiGithub className="w-3.5 h-3.5" /> Code
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono transition-colors"
                        style={{ color: project.accentColor }}
                        whileHover={{ x: 2 }}
                      >
                        <FiExternalLink className="w-3.5 h-3.5" /> Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/SoumyadipCodes19"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiGithub className="w-4 h-4" />
            More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;