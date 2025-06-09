import React from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FolderIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'CSV Plotter',
      description: 'Engineered a React-based CSV visualization tool that converts spreadsheet data into interactive charts using Recharts and Tailwind CSS, enabling dynamic data analysis.',
      technologies: ['React.js', 'Tailwind.css', 'Plotly.js', 'Recharts'],
      github: 'https://github.com/SoumyadipCodes19/CSV-Plotter',
      demo: 'https://csv-plotter.vercel.app/'
    },
    {
      title: 'DeadZone',
      description: 'Engineered a React.js web application that maps network dead zones through real-time speed testing and geolocation data, featuring an intelligent reliability scoring system to optimize network coverage across locations.',
      technologies: ['React.js', 'Tailwind.css', 'Axis', 'Leaflet.js'],
      github: 'https://github.com/SoumyadipCodes19/DeadZone',
      demo: 'https://deadzone-beige.vercel.app/'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const techStackVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
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

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-darkBg">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center gap-2 mb-12"
          variants={titleVariants}
        >
          <motion.div
            whileHover="hover"
            variants={iconVariants}
            className="text-secondary"
          >
            <FolderIcon className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-textPrimary">Projects</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-primary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={projectVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-2xl font-semibold text-textPrimary mb-4">{project.title}</h3>
              <p className="text-textSecondary mb-6">{project.description}</p>
              <motion.ul 
                className="flex flex-wrap gap-2 mb-6"
                variants={techStackVariants}
              >
                {project.technologies.map((tech) => (
                  <motion.li
                    key={tech}
                    className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="flex gap-4">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-secondary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGithub className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-secondary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiExternalLink className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects; 