import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed w-full z-50 transition-all duration-500"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: scrolled
          ? 'rgba(5,5,16,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
      }}
    >
      <div className="container mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#about"
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="font-mono text-xl font-bold gradient-text-cyan-violet"
            style={{ letterSpacing: '-0.02em' }}
          >
            SG<span className="text-cyan-neon">.</span>
          </span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="relative px-4 py-2 rounded-lg font-mono text-sm transition-colors duration-200"
              style={{
                color: activeSection === item.id ? '#00F5FF' : '#8892B0',
              }}
              whileHover={{ color: '#00F5FF' }}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="w-5 h-px bg-text-primary block"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
          />
          <motion.span
            className="w-5 h-px bg-text-primary block"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.span
            className="w-5 h-px bg-text-primary block"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
          />
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: 'rgba(5,5,16,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,245,255,0.1)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-mono text-sm py-3 px-4 rounded-lg text-text-secondary hover:text-cyan-neon transition-colors"
                  style={{ background: activeSection === item.id ? 'rgba(0,245,255,0.06)' : 'transparent' }}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 8 }}
                >
                  <span className="text-cyan-neon mr-2 opacity-60">0{i + 1}.</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;