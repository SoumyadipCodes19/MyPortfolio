import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  BriefcaseIcon,
  FolderIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', icon: <UserIcon className="w-5 h-5" />, label: 'About' },
    { href: '#experience', icon: <BriefcaseIcon className="w-5 h-5" />, label: 'Experience' },
    { href: '#projects', icon: <FolderIcon className="w-5 h-5" />, label: 'Projects' },
    { href: '#education', icon: <AcademicCapIcon className="w-5 h-5" />, label: 'Education' },
    { href: '#skills', icon: <WrenchScrewdriverIcon className="w-5 h-5" />, label: 'Skills' },
    { href: '#contact', icon: <EnvelopeIcon className="w-5 h-5" />, label: 'Contact' }
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-darkBg/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#about"
            className="relative text-2xl font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="bg-gradient-to-r from-secondary via-purple-400 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              whileHover={{
                backgroundSize: "200% 200%",
                backgroundPosition: "100% 50%"
              }}
            >
              S
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-pink-500 via-purple-400 to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.1,
                  ease: "easeOut"
                }
              }}
              whileHover={{
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 50%"
              }}
            >
              G
            </motion.span>
            <motion.div
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-secondary via-purple-400 to-pink-500 opacity-0"
              initial={{ scale: 0 }}
              whileHover={{ 
                opacity: 0.15,
                scale: 1,
                transition: {
                  duration: 0.3
                }
              }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="nav-link group flex items-center gap-2 text-textSecondary hover:text-secondary transition-colors"
                custom={i}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="text-secondary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span className="hidden lg:inline">{item.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-textSecondary hover:text-secondary"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 right-0 bg-darkBg/95 backdrop-blur-md shadow-lg"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="nav-link flex items-center gap-3 text-textSecondary hover:text-secondary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                    custom={i}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className="text-secondary"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 