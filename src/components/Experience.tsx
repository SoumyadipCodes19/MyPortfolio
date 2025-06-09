import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: 'ScientiFlow',
      position: 'Intern',
      period: 'May 2025 – Present',
      location: 'Remote',
      description: [
        'Designed a data visualization tool for researchers to create and customize publication-ready scientific plots from CSV data.',
        'Implemented real-time plot previews, drag-and-drop interface, and export options (PNG, PDF, SVG) with a focus on academic precision and usability.'
      ]
    },
    {
      company: 'LaunchLab',
      position: 'Intern',
      period: 'May 2025 – Present',
      location: 'Remote',
      description: [
        'Designed and developed a responsive and user-friendly frontend for the website, ensuring smooth navigation, visual appeal, and seamless user experience.',
        'Configured and deployed a custom domain (launchlab-ai.com) on Vercel using IONOS DNS, including DNS record management, SSL setup, and TTL optimization.'
      ]
    },
    {
      company: 'Samsung R&D Institute India',
      position: 'Student Intern',
      period: 'Sept 2024 – May 2025',
      location: 'Remote',
      description: [
        'Collaborating with industry professionals on real-world projects, currently working on text block alignment detection to advance document processing and text analysis.',
        'Gaining hands-on experience in research-driven development while applying Python, DSA, and problem-solving skills in a fast-paced, innovation-focused environment.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-darkBg">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center gap-2 mb-12"
          variants={itemVariants}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-secondary"
          >
            <BriefcaseIcon className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-textPrimary">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-primary p-6 rounded-lg shadow-lg border border-secondary/10"
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div 
                className="flex flex-col md:flex-row md:items-center justify-between mb-4"
                variants={itemVariants}
              >
                <div>
                  <motion.h3 
                    className="text-xl font-bold text-textPrimary mb-1"
                    whileHover={{ scale: 1.05, color: "#64ffda" }}
                  >
                    {exp.company || exp.position}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-secondary"
                    whileHover={{ scale: 1.05 }}
                  >
                    {exp.position}
                  </motion.p>
                </div>
                <motion.p 
                  className="text-textSecondary mt-2 md:mt-0"
                  variants={itemVariants}
                >
                  {exp.duration || exp.period}
                </motion.p>
              </motion.div>

              <motion.ul className="space-y-3 text-textSecondary">
                {exp.description.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    variants={listItemVariants}
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className="text-secondary mt-1.5"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      •
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience; 