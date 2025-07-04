import React from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      label: 'Location',
      value: 'Vellore, Tamil Nadu',
      icon: <MapPinIcon className="w-5 h-5" />
    },
    {
      label: 'Email',
      value: 'soumyadip.ghosh2023@vitstudent.ac.in',
      href: 'mailto:soumyadip.ghosh2023@vitstudent.ac.in',
      icon: <EnvelopeIcon className="w-5 h-5" />
    }
  ];

  return (
    <section id="contact" className="py-20 bg-darkBg">
      <div className="container mx-auto px-4">
        <h2 className="section-title flex items-center gap-2">
          <EnvelopeIcon className="w-6 h-6 text-secondary" />
          Contact
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-secondary">{info.icon}</span>
                  <span className="text-textSecondary">{info.label}:</span>
                  {info.href ? (
                    <a href={info.href} className="text-textPrimary hover:text-secondary transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-textPrimary">{info.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/soumyadip-ghosh-sg19082004/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary/10 rounded-lg text-secondary hover:bg-secondary/20 transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/SoumyadipCodes19"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary/10 rounded-lg text-secondary hover:bg-secondary/20 transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 