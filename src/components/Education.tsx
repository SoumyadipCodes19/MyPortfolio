import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar } from 'react-icons/fi';

const education = [
  {
    institution: 'Vellore Institute of Technology',
    degree: 'B.Tech — Computer Science & Engineering (Bioinformatics)',
    period: '2023 – Present',
    location: 'Vellore, Tamil Nadu',
    cgpa: '8.36 / 10',
    color: '#00F5FF',
    coursework: [
      'Programming in Python & Java',
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Discrete Mathematics & Graph Theory',
      'Software Engineering',
      'Probability & Statistics',
    ],
    highlights: [
      'Internal Affairs Secretary — Aikyataan (Bengali Literary Association)',
      'Led 500+ attendee events, coordinated 300+ members',
      'Coordinator, R&R domain — graVITas \'25',
      'Proshows Coordinator — Riviera \'26',
    ],
  },
  {
    institution: 'East West Model School',
    degree: 'Secondary (ICSE) & Higher Secondary (ISC)',
    period: '2009 – 2022',
    location: 'Burdwan, West Bengal',
    cgpa: null,
    color: '#7B2FFF',
    coursework: [],
    highlights: [
      'Scored 94.4% in Class X Boards (ICSE)',
      'Scored 92.6% in Class XII Boards (ISC)',
      'Active participant in Cultural & Technical events',
    ],
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-28 relative overflow-hidden">
      <div className="mesh-orb w-80 h-80 bg-violet-neon/8 top-0 left-0" style={{ position: 'absolute' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">05. Background</p>
          <h2 className="section-title">Education</h2>
          <div className="w-16 h-1 mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)' }} />
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <motion.div
                className="glass-card p-8 relative overflow-hidden group"
                whileHover={{
                  borderColor: edu.color + '40',
                  boxShadow: `0 0 40px ${edu.color}12`,
                }}
                style={{ cursor: 'default' }}
                transition={{ duration: 0.2 }}
              >
                {/* Gradient corner accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top right, ${edu.color}, transparent 70%)`,
                  }}
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    {/* CGPA badge */}
                    {edu.cgpa && (
                      <motion.span
                        className="font-mono text-xs px-3 py-1 rounded-full inline-block mb-3"
                        style={{
                          background: edu.color + '15',
                          color: edu.color,
                          border: `1px solid ${edu.color}30`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        CGPA: {edu.cgpa}
                      </motion.span>
                    )}
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{edu.institution}</h3>
                    <p className="font-medium" style={{ color: edu.color }}>{edu.degree}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 text-text-secondary text-sm font-mono flex-shrink-0">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiMapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                {/* Coursework */}
                {edu.coursework.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Relevant Coursework</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((c) => (
                        <span key={c} className="tech-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div>
                  <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Highlights</p>
                  <ul className="space-y-2">
                    {edu.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-text-secondary text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: edu.color }} />
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;