import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';

const experiences = [
  {
    company: 'ScientiFlow',
    role: 'Intern',
    period: 'May 2025 – July 2025',
    location: 'Remote',
    color: '#00F5FF',
    tags: ['React.js', 'Data Visualization', 'CSV', 'Drag & Drop', 'SVG'],
    bullets: [
      'Designed a data visualization tool for researchers to create and customize publication-ready scientific plots from CSV data.',
      'Implemented real-time plot previews, drag-and-drop interface, and export options (PNG, PDF, SVG) with a focus on academic precision and usability.',
    ],
  },
  {
    company: 'Samsung R&D Institute India',
    role: 'Student Intern',
    period: 'Sept 2024 – May 2025',
    location: 'Remote',
    color: '#7B2FFF',
    tags: ['Python', 'DSA', 'NLP', 'Document Processing', 'Text Analysis'],
    bullets: [
      'Collaborated with industry professionals on real-world projects, working on text block alignment detection to advance document processing and text analysis.',
      'Gained hands-on experience in research-driven development while applying Python, DSA, and problem-solving skills in a fast-paced, innovation-focused environment.',
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="mesh-orb w-96 h-96 bg-violet-neon/8 -top-20 right-0" style={{ position: 'absolute' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">02. Work</p>
          <h2 className="section-title">Experience</h2>
          <div className="w-16 h-1 mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)' }} />
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, #00F5FF, #7B2FFF, transparent)' }} />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="md:pl-12 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 -translate-x-1/2 hidden md:block"
                  style={{
                    borderColor: exp.color,
                    background: '#050510',
                    boxShadow: `0 0 12px ${exp.color}80`,
                  }}
                />

                <motion.div
                  className="glass-card p-8 group"
                  whileHover={{
                    scale: 1.015,
                    borderColor: exp.color + '50',
                    boxShadow: `0 0 40px ${exp.color}15`,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'default' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <FiBriefcase className="w-4 h-4" style={{ color: exp.color }} />
                        <h3 className="text-xl font-bold text-text-primary">{exp.company}</h3>
                      </div>
                      <p className="font-semibold" style={{ color: exp.color }}>
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-text-secondary text-sm font-mono">
                      <span className="flex items-center gap-2">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiMapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-text-secondary"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;