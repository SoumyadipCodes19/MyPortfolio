import { Analytics } from '@vercel/analytics/react';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AskMeChat from './components/AskMeChat';

function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      {/* Persistent background layer */}
      <ParticleField />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Global mesh gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0,245,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(123,47,255,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Custom neon cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* RAG-powered AI assistant */}
      <AskMeChat />

      <Analytics />
    </div>
  );
}

export default App;