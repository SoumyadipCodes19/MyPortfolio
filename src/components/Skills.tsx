import React from 'react';
import { motion } from 'framer-motion';
import { 
  WrenchScrewdriverIcon,
  CommandLineIcon,
  CpuChipIcon,
  WindowIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <CommandLineIcon className="w-6 h-6" />,
      skills: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Kotlin']
    },
    {
      title: 'Frameworks & Tools',
      icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
      skills: ['TensorFlow', 'scikit-learn', 'Git', 'React.js', 'Tailwind.css', 'Node.js', 'Framer Motion', 'Vite' ]
    },
    {
      title: 'Development',
      icon: <CpuChipIcon className="w-6 h-6" />,
      skills: ['Web Development', 'App Development', 'Machine Learning Model Implementation']
    },
    {
      title: 'Analytical Skills',
      icon: <WindowIcon className="w-6 h-6" />,
      skills: ['Critical Thinking', 'Problem Solving', 'Data Analysis']
    },
    {
      title: 'Languages',
      icon: <LanguageIcon className="w-6 h-6" />,
      skills: ['English', 'Hindi', 'Bengali']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-darkBg">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="section-title flex items-center gap-2 text-3xl font-bold text-textPrimary mb-12 text-center"
          variants={categoryVariants}
        >
          <WrenchScrewdriverIcon className="w-6 h-6 text-secondary" />
          Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="group bg-cardBg p-6 rounded-lg border border-secondary/10 hover:border-secondary transition-all duration-300"
              variants={categoryVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors duration-300">
                  <span className="text-secondary">{category.icon}</span>
                </div>
                <motion.h3 
                  className="text-xl font-bold text-textPrimary group-hover:text-secondary transition-colors"
                  variants={skillVariants}
                >
                  {category.title}
                </motion.h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-3 py-1.5 bg-darkBg text-textSecondary rounded-full text-sm border border-secondary/10 hover:border-secondary hover:text-secondary transition-all duration-300"
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.1,
                      color: 'var(--color-secondary)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 