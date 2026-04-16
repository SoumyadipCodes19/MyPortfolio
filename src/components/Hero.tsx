import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiTerminal } from 'react-icons/fi';
import { useTypewriter } from '../hooks/useTypewriter';
import CodeWindow from './CodeWindow';

const Hero: React.FC = () => {
  const typewriterText = useTypewriter({
    words: [
      'Full-Stack Developer',
      'ML Engineer',
      'AI Enthusiast',
      'RAG Builder',
      'CS @ VIT Vellore',
    ],
    typeSpeed: 65,
    deleteSpeed: 40,
    pauseTime: 2200,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1.2 + i * 0.1 },
    }),
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background mesh orbs */}
      <div className="mesh-orb w-96 h-96 bg-cyan-neon/10 top-20 left-10" style={{ position: 'absolute' }} />
      <div className="mesh-orb w-80 h-80 bg-violet-neon/10 bottom-20 right-20" style={{ position: 'absolute' }} />
      <div className="mesh-orb w-64 h-64 bg-emerald-neon/8 top-1/2 left-1/2" style={{ position: 'absolute' }} />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 pt-24 pb-16 relative z-10">

        {/* Main hero row: left text | right = photo + code window */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* ── Left: Text Content ── */}
          <motion.div
            className="flex-1 max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-mono text-sm text-emerald-neon bg-emerald-neon/8 border border-emerald-neon/20 px-4 py-2 rounded-full inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-neon animate-pulse inline-block" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
            >
              <span className="text-text-primary">Soumyadip</span>
              <br />
              <span className="gradient-text">Ghosh</span>
            </motion.h1>

            {/* Typewriter role — terminal-style */}
            <motion.div variants={itemVariants} className="mb-5 h-10 flex items-center">
              <span className="font-mono text-xl text-text-secondary flex items-center gap-2">
                <span className="text-emerald-neon">❯</span>
                <span className="text-text-muted">./run</span>
                <span className="text-cyan-neon font-semibold">{typewriterText}</span>
                <span className="inline-block w-0.5 h-5 bg-cyan-neon ml-0.5 animate-blink" />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg leading-relaxed mb-6 max-w-lg"
            >
              CS Engineer at VIT Vellore building intelligent, scalable software.
              Passionate about{' '}
              <span className="text-cyan-neon">Machine Learning</span>,{' '}
              <span className="text-violet-neon">RAG pipelines</span>, and crafting
              full-stack products that solve real problems.
            </motion.p>

            {/* Quick stats — dev-style */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              {[
                { label: 'CGPA', value: '8.36' },
                { label: 'Projects', value: '5+' },
                { label: 'Internships', value: '2' },
                { label: 'YOE', value: '1+' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card px-4 py-2 flex items-center gap-2"
                  style={{ border: '1px solid rgba(0,245,255,0.1)' }}
                >
                  <span className="font-mono text-xs text-text-muted">{stat.label}:</span>
                  <span className="font-mono text-sm text-cyan-neon font-bold">{stat.value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="https://drive.google.com/file/d/120QEPvMLounbsDOlvn9T_7d4w-eidxOB/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-2 relative z-10">
                  <FiDownload className="w-4 h-4" />
                  Download Resume
                </span>
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-outline flex items-center gap-2"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <FiArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              <span className="text-text-muted font-mono text-xs mr-3">find me on</span>
              {[
                { icon: <FiGithub className="w-5 h-5" />, href: 'https://github.com/SoumyadipCodes19', label: 'GitHub' },
                { icon: <FiLinkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/soumyadip-ghosh-sg19082004/', label: 'LinkedIn' },
                { icon: <FiMail className="w-5 h-5" />, href: 'mailto:soumyadip.ghosh2023@vitstudent.ac.in', label: 'Email' },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-text-secondary hover:text-cyan-neon transition-all duration-200"
                  custom={i}
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.15, y: -2, boxShadow: '0 0 20px rgba(0,245,255,0.25)' }}
                  whileTap={{ scale: 0.92 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Photo + Code Window ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            {/* Photo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
            >
              <motion.div
                className="photo-halo relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(0,245,255,0.25) 0%, rgba(123,47,255,0.2) 45%, transparent 70%)',
                    transform: 'scale(1.3)',
                    filter: 'blur(20px)',
                    zIndex: -1,
                  }}
                />

                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '1.5px solid transparent',
                    borderTopColor: 'rgba(0,245,255,0.6)',
                    borderRightColor: 'rgba(123,47,255,0.3)',
                    transform: 'scale(1.12)',
                    zIndex: 20,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '1px solid transparent',
                    borderBottomColor: 'rgba(0,255,136,0.4)',
                    borderLeftColor: 'rgba(0,245,255,0.2)',
                    transform: 'scale(1.22)',
                    zIndex: 19,
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Photo container */}
                <div
                  className="relative z-10 overflow-hidden"
                  style={{
                    width: '280px',
                    height: '320px',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    border: '2px solid rgba(0,245,255,0.2)',
                    boxShadow: '0 0 60px rgba(0,245,255,0.15), 0 0 120px rgba(123,47,255,0.1)',
                    background: 'linear-gradient(180deg, rgba(0,245,255,0.05) 0%, rgba(123,47,255,0.08) 100%)',
                  }}
                >
                  <img
                    src="/soumyadip.png"
                    alt="Soumyadip Ghosh"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -bottom-3 -right-4 glass-card px-3 py-1.5 z-30"
                  style={{ border: '1px solid rgba(0,255,136,0.3)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                >
                  <span className="font-mono text-xs text-emerald-neon">CGPA 8.36 ✦</span>
                </motion.div>
                <motion.div
                  className="absolute -top-2 -left-6 glass-card px-3 py-1.5 z-30"
                  style={{ border: '1px solid rgba(123,47,255,0.3)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                >
                  <span className="font-mono text-xs text-violet-neon">Software Developer ✦</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Code Window below photo */}
            <CodeWindow />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-xs text-text-muted tracking-widest">SCROLL</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-cyan-neon to-transparent"
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;