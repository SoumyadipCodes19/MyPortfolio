import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiStar } from 'react-icons/fi';

const certifications = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University & DeepLearning.AI',
    credentialId: 'B2JJJS9EACDY',
    verifyUrl: 'https://coursera.org/verify/B2JJJS9EACDY',
    description: 'Comprehensive specialization covering supervised learning, advanced ML algorithms, and best practices for building real-world ML systems.',
    tags: ['Supervised Learning', 'Neural Networks', 'TensorFlow', 'Scikit-learn', 'Python'],
    color: '#00F5FF',
  },
];

const activities = [
  {
    title: 'Internal Affairs Secretary',
    org: 'Aikyataan (Bengali Literary Association), VIT',
    period: '2025 – 2026',
    description: 'Led 500+ attendee cultural events and coordinated 300+ members, streamlining operations and communication for the Bengali literary society.',
    color: '#7B2FFF',
  },
  {
    title: 'Coordinator, R&R Domain',
    org: 'graVITas \'25 — VIT\'s International Tech Fest',
    period: '2025',
    description: 'Managed the Rewards & Recognition domain for one of India\'s largest student-run tech fests.',
    color: '#00FF88',
  },
  {
    title: 'Proshows Coordinator',
    org: 'Riviera \'26 — VIT\'s International Cultural Fest',
    period: '2026',
    description: 'Coordinated the main stage shows at Riviera, VIT\'s flagship international cultural festival.',
    color: '#00F5FF',
  },
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-28 relative overflow-hidden">
      <div className="mesh-orb w-72 h-72 bg-emerald-neon/8 bottom-10 right-10" style={{ position: 'absolute' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">06. Achievements</p>
          <h2 className="section-title">Certifications & Activities</h2>
          <div className="w-16 h-1 mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #00FF88, #00F5FF)' }} />
        </motion.div>

        {/* Certification Card */}
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <motion.div
              className="glass-card p-8 relative overflow-hidden group"
              whileHover={{
                borderColor: cert.color + '40',
                boxShadow: `0 0 50px ${cert.color}15`,
              }}
              style={{ cursor: 'default' }}
              transition={{ duration: 0.25 }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at left, ${cert.color}06, transparent 60%)`,
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: cert.color + '15', border: `1px solid ${cert.color}30` }}
                    >
                      <FiAward className="w-5 h-5" style={{ color: cert.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{cert.title}</h3>
                      <p className="text-sm" style={{ color: cert.color }}>{cert.issuer}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-4">{cert.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  <span className="font-mono text-xs text-text-muted">
                    Credential ID: {cert.credentialId}
                  </span>
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0">
                  <motion.a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-lg transition-all"
                    style={{
                      background: cert.color + '10',
                      color: cert.color,
                      border: `1px solid ${cert.color}30`,
                    }}
                    whileHover={{ scale: 1.03, background: cert.color + '20' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Verify
                  </motion.a>
                  <div
                    className="flex items-center gap-1 justify-center"
                    style={{ color: cert.color }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-3 h-3" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Activities */}
        <p className="section-label mb-6 mt-4">Leadership & Activities</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activities.map((act, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.div
                className="glass-card p-6 h-full group"
                whileHover={{
                  borderColor: act.color + '40',
                  boxShadow: `0 0 25px ${act.color}12`,
                }}
                style={{ cursor: 'default' }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-1.5 h-8 rounded-full mb-4"
                  style={{ background: act.color, boxShadow: `0 0 10px ${act.color}60` }}
                />
                <span className="font-mono text-xs text-text-muted mb-2 block">{act.period}</span>
                <h4 className="font-bold text-text-primary mb-1">{act.title}</h4>
                <p className="text-sm mb-3" style={{ color: act.color }}>{act.org}</p>
                <p className="text-sm text-text-secondary">{act.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
