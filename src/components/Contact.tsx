import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin } from 'react-icons/fi';

const contactLinks = [
  {
    icon: <FiMail className="w-5 h-5" />,
    label: 'Email',
    value: 'soumyadip.ghosh2023@vitstudent.ac.in',
    href: 'mailto:soumyadip.ghosh2023@vitstudent.ac.in',
    color: '#00F5FF',
  },
  {
    icon: <FiLinkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    value: 'soumyadip-ghosh-sg19082004',
    href: 'https://www.linkedin.com/in/soumyadip-ghosh-sg19082004/',
    color: '#7B2FFF',
  },
  {
    icon: <FiGithub className="w-5 h-5" />,
    label: 'GitHub',
    value: 'SoumyadipCodes19',
    href: 'https://github.com/SoumyadipCodes19',
    color: '#00FF88',
  },
  {
    icon: <FiMapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Vellore, Tamil Nadu',
    href: null,
    color: '#7B2FFF',
  },
];

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('soumyadip.ghosh2023@vitstudent.ac.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background orbs */}
      <div className="mesh-orb w-96 h-96 bg-cyan-neon/10 top-0 left-1/2 -translate-x-1/2" style={{ position: 'absolute' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">07. Connect</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            I'm always open to discussing new projects, opportunities, or just having a great conversation about tech.
          </p>
          <div className="w-16 h-1 mt-4 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)' }} />
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.button
            onClick={handleCopyEmail}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3 rounded-2xl"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              {copied ? (
                <>✓ Copied!</>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Say Hello
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {link.href ? (
                <motion.a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card p-5 flex items-center gap-4 group block"
                  whileHover={{
                    borderColor: link.color + '40',
                    boxShadow: `0 0 25px ${link.color}12`,
                    x: 4,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: link.color + '15', border: `1px solid ${link.color}25` }}
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-text-muted mb-0.5">{link.label}</p>
                    <p className="text-text-primary text-sm font-medium truncate group-hover:text-white transition-colors">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ) : (
                <div className="glass-card p-5 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: link.color + '15', border: `1px solid ${link.color}25` }}
                  >
                    <span style={{ color: link.color }}>{link.icon}</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-muted mb-0.5">{link.label}</p>
                    <p className="text-text-primary text-sm font-medium">{link.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-xs text-text-muted">
            Designed & Built by{' '}
            <span className="gradient-text-cyan-violet font-semibold">Soumyadip Ghosh</span>
            {' '}· {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;