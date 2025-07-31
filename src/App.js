import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your page components
import Home from './home';
import About from './about';
import ProjectsPage from './project';
import SkillsPage from './skill';
import ExperiencePage from './experience';
import Contact from './contact';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: Home page */}
        <Route path="/" element={<Home />} />

        {/* Other pages */}
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Redirect any unknown path to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;