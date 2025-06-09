import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const socialLinks = [
    {
      icon: <FiGithub className="w-6 h-6" />,
      href: 'https://github.com/SoumyadipCodes19',
      label: 'GitHub'
    },
    {
      icon: <FiLinkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/soumyadip-ghosh-sg19082004/',
      label: 'LinkedIn'
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      href: 'mailto:soumyadip.ghosh2023@vitstudent.ac.in',
      label: 'Email'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 bg-darkBg">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl">
          <motion.p 
            className="text-secondary mb-4 font-mono"
            variants={itemVariants}
          >
            Hi, my name is
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-textPrimary to-secondary bg-clip-text text-transparent animate-gradient"
            variants={itemVariants}
          >
            Soumyadip Ghosh
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-4xl text-textSecondary mb-6 font-semibold"
            variants={itemVariants}
          >
            Computer Science Student at VIT
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-textSecondary max-w-2xl mb-8 leading-relaxed"
            variants={itemVariants}
          >
            I'm a developer with a strong foundation in Java, C++, and Python, experienced in Full-Stack Web and App Development, Machine Learning, and Software Engineering.
            I focus on building efficient, scalable solutions, combining technical depth with a problem-solving mindset to drive impactful results.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            variants={itemVariants}
          >
            <motion.a 
              href="mailto:soumyadip.ghosh2023@vitstudent.ac.in" 
              className="btn group flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get in Touch
            </motion.a>
            <motion.a 
              href="#projects" 
              className="btn group flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="group-hover:translate-x-1 transition-transform">View Projects</span>
            </motion.a>
          </motion.div>
          <motion.div 
            className="flex gap-6"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors"
                aria-label={link.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.8 + (index * 0.1) }
                }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 