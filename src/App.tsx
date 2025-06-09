import { type FC } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'

const App: FC = () => {
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Contact />
    </div>
  )
}

export default App 