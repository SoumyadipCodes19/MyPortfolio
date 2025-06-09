import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Education: React.FC = () => {
  const education = [
    {
      school: 'Vellore Institute of Technology',
      degree: 'B.Tech in Computer Science and Engineering (Bioinformatics)',
      period: '2023 - Present',
      location: 'Vellore, Tamil Nadu',
      achievements: [
        'Current CGPA: 8.38/10',
        'Internal Affairs Secretary of Bengali Literary Association (Aikyataan)',
        'Led 500+ attendee events and coordinated 300+ members, streamlining operations and communication.',
        'Volunteer for the Premium Events domain in graVITas \'24 and Proshows in Riviera \'25.'
      ]
    },
    {
      school: 'East West Model School',
      degree: 'Secondary Education (ICSE) and Higher Secondary Education (ISC)',
      period: '2009 - 2022',
      location: 'Burdwan, West Bengal',
      achievements: [
        'Scored 94.4% in Class X Boards',
        'Scored 92.6% in Class XII Boards',
        'Active participant in Cultural and Technical events'
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      x: 10,
      color: "#64ffda",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
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
    <section id="education" className="py-20 bg-darkBg">
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
            <AcademicCapIcon className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-textPrimary">Education</h2>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="bg-primary p-6 rounded-lg shadow-lg border border-secondary/10"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <motion.h3 
                    className="text-xl font-bold text-textPrimary mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {edu.school}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-secondary mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {edu.degree}
                  </motion.p>
                </div>
                <div className="space-y-2">
                  <motion.div 
                    className="flex items-center gap-2 text-textSecondary"
                    whileHover={{ x: 5 }}
                  >
                    <CalendarIcon className="w-5 h-5" />
                    <span>{edu.period}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-textSecondary"
                    whileHover={{ x: 5 }}
                  >
                    <MapPinIcon className="w-5 h-5" />
                    <span>{edu.location}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.ul className="space-y-3">
                {edu.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-textSecondary"
                    variants={achievementVariants}
                    whileHover="hover"
                  >
                    <motion.span
                      className="text-secondary mt-1.5"
                      whileHover={{ scale: 1.2 }}
                    >
                      •
                    </motion.span>
                    {achievement}
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

export default Education; 