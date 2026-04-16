export interface PortfolioChunk {
  id: string;
  title: string;
  content: string;
  category: 'bio' | 'experience' | 'project' | 'skill' | 'education' | 'certification' | 'contact';
}

export const portfolioChunks: PortfolioChunk[] = [
  // ── Bio ──────────────────────────────────────────────
  {
    id: 'bio',
    title: 'About Soumyadip',
    content:
      'Soumyadip Ghosh is a Computer Science & Engineering (Bioinformatics) student at Vellore Institute of Technology (VIT), Vellore, Tamil Nadu. CGPA: 8.36. He is passionate about Machine Learning, RAG pipelines, LangChain, and building full-stack products that solve real problems. He is currently available for opportunities and internships.',
    category: 'bio',
  },

  // ── Experience ───────────────────────────────────────
  {
    id: 'exp-scientiflow',
    title: 'ScientiFlow Internship',
    content:
      'Soumyadip worked as an Intern at ScientiFlow (Remote) from May 2025 to July 2025. He designed a data visualization tool for researchers to create and customize publication-ready scientific plots from CSV data. He implemented real-time plot previews, drag-and-drop interface, and export options (PNG, PDF, SVG) with a focus on academic precision and usability. Tech: React.js, CSV, SVG, Drag & Drop.',
    category: 'experience',
  },
  {
    id: 'exp-samsung',
    title: 'Samsung R&D Internship',
    content:
      'Soumyadip worked as a Student Intern at Samsung R&D Institute India (Remote) from September 2024 to May 2025. He collaborated with industry professionals on text block alignment detection to advance document processing and text analysis. He applied Python, Data Structures and Algorithms, and research-driven development in a fast-paced, innovation-focused environment. Tech: Python, DSA, Computer Vision, NLP.',
    category: 'experience',
  },

  // ── Projects ─────────────────────────────────────────
  {
    id: 'proj-sql-builder',
    title: 'Visual SQL Builder',
    content:
      'Visual SQL Builder is a full-stack project by Soumyadip. It features a React-based UI and a secure Deno-powered Supabase Edge Function, enabling users to build complex SQL queries visually and safely without writing raw SQL. Tech: React.js, Deno, Supabase, Edge Functions, SQL, TypeScript. Live at: visual-sql-builder.vercel.app. GitHub: github.com/SoumyadipCodes19/Visual_SQL_Builder.',
    category: 'project',
  },
  {
    id: 'proj-deadzone',
    title: 'DeadZone - Network Intelligence App',
    content:
      'DeadZone is a React.js web application that maps network dead zones through real-time speed testing and geolocation data. It features an intelligent reliability scoring system to optimize network coverage across locations. Tech: React.js, Leaflet.js, Geolocation API, Axios, Tailwind CSS. Live at: deadzone-beige.vercel.app. GitHub: github.com/SoumyadipCodes19/DeadZone.',
    category: 'project',
  },
  {
    id: 'proj-returns-intelligence',
    title: 'Returns Intelligence System - AI/ML Project',
    content:
      'Returns Intelligence System is a full-stack AI-powered system for Walmart retail returns management. It uses a Stacking Classifier combining Random Forest and Logistic Regression to predict return likelihood with ~85% accuracy. It features intelligent routing decisions: Restock, Resell Secondary, Refund Only, Donate/Recycle, or Manual Review. This is an AI and machine learning project. Tech: Python, FastAPI, scikit-learn, React, Pandas, NumPy. GitHub: github.com/SoumyadipCodes19/returns-intelligence-system.',
    category: 'project',
  },
  {
    id: 'proj-chrona',
    title: 'CHRONA - Premium Calendar App',
    content:
      'CHRONA is a premium, high-tactile wall calendar application built with Next.js 14, TypeScript, Framer Motion, and vanilla CSS. It blends the classic aesthetic of a physical wall calendar with advanced digital productivity tools including Web Audio API and ICS export. Tech: Next.js 14, TypeScript, Framer Motion, Web Audio API, CSS. Live at: chrona-pi.vercel.app. GitHub: github.com/SoumyadipCodes19/CHRONA.',
    category: 'project',
  },
  {
    id: 'proj-csv-plotter',
    title: 'CSV Plotter - Data Visualization',
    content:
      'CSV Plotter is a React-based data visualization tool that converts spreadsheet/CSV data into interactive, publication-ready charts with real-time rendering and multiple chart types. Tech: React.js, Recharts, Tailwind CSS, CSV, JavaScript. Live at: csv-plotter.vercel.app. GitHub: github.com/SoumyadipCodes19/CSV_Plotter.',
    category: 'project',
  },

  // ── Skills ───────────────────────────────────────────
  {
    id: 'skills-languages',
    title: 'Programming Languages',
    content:
      'Soumyadip is proficient in the following programming languages: Python, C++, Java, JavaScript, TypeScript. Python is his primary language for ML and scripting.',
    category: 'skill',
  },
  {
    id: 'skills-ai-ml',
    title: 'AI, ML and RAG Skills',
    content:
      'Soumyadip has strong skills in Artificial Intelligence and Machine Learning. He works with TensorFlow, scikit-learn, LangChain, OpenAI APIs, RAG (Retrieval-Augmented Generation) pipelines, Vector Databases, NLP, and ML model implementation. He is experienced in building RAG systems, LLM-powered applications, and classical ML models.',
    category: 'skill',
  },
  {
    id: 'skills-frontend',
    title: 'Frontend Development Skills',
    content:
      'Soumyadip is skilled in frontend development with React.js, Next.js 14, Tailwind CSS, Framer Motion, Vite, HTML5, CSS3, and vanilla CSS.',
    category: 'skill',
  },
  {
    id: 'skills-backend',
    title: 'Backend and DevOps Skills',
    content:
      'Soumyadip knows Node.js, FastAPI (Python), Deno, Supabase, Git, Docker, REST APIs, and Supabase Edge Functions. He is comfortable with full-stack development and backend APIs.',
    category: 'skill',
  },

  // ── Education ────────────────────────────────────────
  {
    id: 'edu-vit',
    title: 'VIT Vellore Education',
    content:
      'Soumyadip is pursuing B.Tech in Computer Science and Engineering (Bioinformatics) at Vellore Institute of Technology (VIT), Vellore, Tamil Nadu (2023 – Present). CGPA: 8.36 / 10. Relevant coursework: Programming in Python and Java, Data Structures and Algorithms, Object-Oriented Programming, Discrete Mathematics and Graph Theory, Software Engineering, Probability and Statistics.',
    category: 'education',
  },
  {
    id: 'edu-school',
    title: 'School Education',
    content:
      'Soumyadip attended East West Model School, Burdwan, West Bengal. He scored 94.4% in Class X Boards (ICSE) and 92.6% in Class XII Boards (ISC).',
    category: 'education',
  },

  // ── Certifications & Leadership ──────────────────────
  {
    id: 'cert-ml',
    title: 'Machine Learning Specialization',
    content:
      'Soumyadip has completed the Machine Learning Specialization by Stanford University and DeepLearning.AI on Coursera. Credential ID: B2JJJS9EACDY. Topics: supervised learning, neural networks, TensorFlow, scikit-learn, Python. This is a widely respected ML certification.',
    category: 'certification',
  },
  {
    id: 'leadership',
    title: 'Leadership and Extracurriculars',
    content:
      'Soumyadip is the Internal Affairs Secretary of Aikyataan (Bengali Literary Association) at VIT, managing 500+ attendee events and 300+ members. He was a Coordinator for the R&R domain at graVITas \'25 (VIT\'s International Tech Fest) and Proshows Coordinator at Riviera \'26 (VIT\'s International Cultural Fest).',
    category: 'certification',
  },

  // ── Contact ──────────────────────────────────────────
  {
    id: 'contact',
    title: 'Contact Information',
    content:
      'You can contact Soumyadip Ghosh at: Email: soumyadip.ghosh2023@vitstudent.ac.in. LinkedIn: linkedin.com/in/soumyadip-ghosh-sg19082004. GitHub: github.com/SoumyadipCodes19. Location: Vellore, Tamil Nadu.',
    category: 'contact',
  },
];
