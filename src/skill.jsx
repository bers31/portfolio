import React, { useState, useEffect } from 'react';
import { 
  Code, Brain, Database, Zap, Award, Star, ChevronRight, 
  Cpu, Globe, Palette, BarChart3, Shield, Smartphone,
  GitBranch, Server, Cloud, BookOpen, Trophy, Target,
  Sparkles, Rocket, Flame, Heart, Eye
} from 'lucide-react';
import sertifikat from './images/sertifikat.jpg';
import sertifikat1 from './images/sertifikat1.jpg';
import sertifikat2 from './images/sertifikat2.jpg';
import sertifikat3 from './images/sertifikat3.jpg';
import sertifikat4 from './images/sertifikat4.png';
import sertifikat5 from './images/sertifikat5.jpg';
import { Link } from 'react-router-dom';

const SkillsPage = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [visibleSkills, setVisibleSkills] = useState({});
  const [animationKey, setAnimationKey] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const skillCategories = {
    technical: {
      title: 'Technical Skills',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python', level: 95, icon: Code, color: 'from-yellow-400 to-yellow-600', description: 'Advanced proficiency in data science, ML, and backend development', projects: 15, yearsExp: 4 },
        { name: 'Machine Learning', level: 90, icon: Brain, color: 'from-purple-500 to-pink-500', description: 'Scikit-learn, TensorFlow, PyTorch for predictive modeling', projects: 12, yearsExp: 3 },
        { name: 'React.js', level: 85, icon: Globe, color: 'from-blue-400 to-blue-600', description: 'Modern frontend development with hooks and state management', projects: 10, yearsExp: 2 },
        { name: 'SQL/Database', level: 88, icon: Database, color: 'from-green-500 to-emerald-500', description: 'MySQL, PostgreSQL, database design and optimization', projects: 18, yearsExp: 3 },
        { name: 'Data Analysis', level: 92, icon: BarChart3, color: 'from-orange-500 to-red-500', description: 'Pandas, NumPy, statistical analysis and visualization', projects: 20, yearsExp: 4 },
        { name: 'Deep Learning', level: 85, icon: Cpu, color: 'from-indigo-500 to-purple-600', description: 'Neural networks, NLP, computer vision applications', projects: 8, yearsExp: 2 }
      ]
    },
    frameworks: {
      title: 'Frameworks & Tools',
      icon: Server,
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Flask/Django', level: 88, icon: Server, color: 'from-green-600 to-green-700', description: 'Python web frameworks for scalable applications', projects: 14, yearsExp: 3 },
        { name: 'Node.js', level: 82, icon: Zap, color: 'from-green-400 to-green-600', description: 'JavaScript runtime for backend development', projects: 9, yearsExp: 2 },
        { name: 'Docker', level: 80, icon: Cloud, color: 'from-blue-500 to-blue-700', description: 'Containerization and deployment automation', projects: 11, yearsExp: 2 },
        { name: 'Git/GitHub', level: 90, icon: GitBranch, color: 'from-orange-500 to-orange-600', description: 'Version control and collaborative development', projects: 25, yearsExp: 4 },
        { name: 'Streamlit', level: 88, icon: Smartphone, color: 'from-red-500 to-red-600', description: 'Rapid prototyping for data science applications', projects: 7, yearsExp: 1 },
        { name: 'OpenAI API', level: 85, icon: Sparkles, color: 'from-purple-400 to-purple-600', description: 'GPT integration and AI-powered solutions', projects: 6, yearsExp: 1 }
      ]
    },
    specialization: {
      title: 'Specializations',
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Natural Language Processing', level: 88, icon: Brain, color: 'from-violet-500 to-violet-700', description: 'Text analysis, sentiment analysis, language models', projects: 10, yearsExp: 3 },
        { name: 'Information Retrieval', level: 85, icon: BookOpen, color: 'from-blue-600 to-indigo-600', description: 'Search systems, FAISS, semantic similarity', projects: 8, yearsExp: 2 },
        { name: 'Data Visualization', level: 90, icon: Palette, color: 'from-pink-500 to-rose-600', description: 'Matplotlib, Seaborn, interactive dashboards', projects: 16, yearsExp: 3 },
        { name: 'Network Analysis', level: 82, icon: Globe, color: 'from-cyan-500 to-blue-500', description: 'NetworkX, graph theory, social network analysis', projects: 5, yearsExp: 2 },
        { name: 'AI Chatbot Development', level: 92, icon: Sparkles, color: 'from-yellow-400 to-orange-500', description: 'Conversational AI, context-aware responses', projects: 12, yearsExp: 2 },
        { name: 'Performance Optimization', level: 87, icon: Rocket, color: 'from-emerald-400 to-green-600', description: 'System tuning, algorithm optimization, caching', projects: 13, yearsExp: 3 }
      ]
    }
  };

  const achievements = [
    {
      title: 'AI Chatbot Excellence',
      description: 'Built chatbot with 95% accuracy for correctional facility',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
      metric: '95%',
      badge: 'Security Certified'
    },
    {
      title: 'Big Data Analytics',
      description: 'Analyzed 500K+ tweets with 92% sentiment accuracy',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-600',
      metric: '500K+',
      badge: 'Data Expert'
    },
    {
      title: 'Performance Optimization',
      description: 'Achieved sub-second query response times',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      metric: '<1s',
      badge: 'Speed Optimizer'
    },
    {
      title: 'User Engagement',
      description: 'Increased platform engagement by 40%',
      icon: Flame,
      color: 'from-red-500 to-pink-500',
      metric: '40%',
      badge: 'Growth Hacker'
    }
  ];

  const certificates = [
    { 
      name: 'Intellectual Property Certificate – Chatbot', 
      issuer: 'REPUBLIC OF INDONESIA MINISTRY OF LAW', 
      year: '2025', 
      color: 'from-green-500 to-emerald-600', 
      verified: true,
      image: sertifikat
    },
    { 
      name: 'PyTorch and Generative AI', 
      issuer: 'Avalon AI', 
      year: '2024', 
      color: 'from-orange-400 to-red-500', 
      verified: true,
      image: sertifikat1
    },
    { 
      name: 'Database Programming with SQL', 
      issuer: 'Oracle Academy', 
      year: '2024', 
      color: 'from-blue-500 to-indigo-600', 
      verified: true,
      image: sertifikat2
    },
    { 
      name: 'Java Programming', 
      issuer: 'Oracle Academy', 
      year: '2024', 
      color: 'from-red-500 to-orange-600', 
      verified: true,
      image: sertifikat3
    },
    { 
      name: 'Cloud Computing', 
      issuer: 'Alibaba Cloud', 
      year: '2024', 
      color: 'from-blue-400 to-cyan-500', 
      verified: true,
      image: sertifikat4
    },
    { 
      name: 'Data Analysis Bootcamp', 
      issuer: 'Diponegoro University', 
      year: '2023', 
      color: 'from-purple-500 to-pink-600', 
      verified: true,
      image: sertifikat5
    }
  ];

  const [selectedCertImage, setSelectedCertImage] = useState(null);

  // Security Features Section
  const securityFeatures = [
    { name: 'Data Encryption', level: 90, description: 'Advanced encryption protocols and secure data handling' },
    { name: 'Authentication Systems', level: 88, description: 'Multi-factor authentication and user verification' },
    { name: 'Security Auditing', level: 85, description: 'Code review and vulnerability assessment' },
    { name: 'Compliance Standards', level: 87, description: 'GDPR, SOC2, and industry compliance frameworks' }
  ];

  // Awards and Recognition
  const awards = [
    { title: 'Innovation Excellence', year: '2024', category: 'AI Development' },
    { title: 'Outstanding Performance', year: '2023', category: 'Data Science' },
    { title: 'Technical Leadership', year: '2024', category: 'Team Collaboration' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleSkills(prev => ({ ...prev, [activeCategory]: true }));
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeCategory]);

  useEffect(() => {
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 1000);
    return () => clearTimeout(statsTimer);
  }, []);

  const SkillCard = ({ skill, index }) => (
    <div 
      key={`${skill.name}-${animationKey}`}
      className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1 cursor-pointer"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animation: visibleSkills[activeCategory] ? 'slideInUp 0.6s ease-out forwards' : 'none'
      }}
      onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl bg-gradient-to-r ${skill.color} shadow-lg`}>
            <skill.icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
            {skill.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            {skill.level}%
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(skill.level / 20) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {skill.description}
      </p>
      
      {/* Enhanced stats section */}
      {selectedSkill === skill && (
        <div className="mb-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Projects: {skill.projects}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300">Experience: {skill.yearsExp} years</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ 
              width: visibleSkills[activeCategory] ? `${skill.level}%` : '0%',
              animationDelay: `${index * 0.1 + 0.5}s`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation - DIPERBAIKI */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bernardo
            </div>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            <button className="md:hidden text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Technical Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming complex challenges into elegant solutions through cutting-edge technology and innovative thinking
            </p>
          </div>

          {/* Overall Stats */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text mb-2">
                  {skillCategories.technical.skills.length + skillCategories.frameworks.skills.length + skillCategories.specialization.skills.length}
                </div>
                <div className="text-gray-400 text-sm">Technical Skills</div>
              </div>
              <div className="text-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-2">
                  {certificates.length}
                </div>
                <div className="text-gray-400 text-sm">Certifications</div>
              </div>
              <div className="text-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
                  {achievements.length}
                </div>
                <div className="text-gray-400 text-sm">Key Achievements</div>
              </div>
              <div className="text-center bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">
                  {awards.length}
                </div>
                <div className="text-gray-400 text-sm">Awards</div>
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setVisibleSkills({});
                  setSelectedSkill(null);
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/25`
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.title}</span>
                {activeCategory === key && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {/* Security Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Security & Protection
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl mb-4 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="w-full bg-gray-700/50 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${feature.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Key Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10 transform hover:-translate-y-1"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl mb-4 shadow-lg`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                      {achievement.metric}
                    </div>
                    <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs text-white">
                      {achievement.badge}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Awards & Recognition
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <span className="text-sm text-gray-500 font-medium">{award.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {award.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {award.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Professional Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 transform hover:-translate-y-1"
                >
                  <div className={`w-full h-1 bg-gradient-to-r ${cert.color} rounded-full mb-4`}></div>
                  
                  {/* Gambar sertifikat - BAGIAN BARU */}
                  {cert.image && (
                    <div className="mb-4 relative overflow-hidden rounded-lg bg-gray-700/30 aspect-video">
                      <img 
                        src={cert.image} 
                        alt={`Certificate: ${cert.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback jika gambar tidak ada */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 hidden items-center justify-center">
                        <Trophy className="w-12 h-12 text-gray-400" />
                      </div>
                      {/* Overlay hover dengan icon Eye */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        onClick={() => setSelectedCertImage(cert)}
                      >
                        <div className="flex items-center space-x-2 text-white text-sm font-medium px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm border border-white/20">
                          <Eye className="w-4 h-4" />
                          <span>View Certificate</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                      {cert.verified && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{cert.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {cert.issuer}
                  </p>
                  {cert.verified && (
                    <div className="mt-3 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-400">Verified</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Image Modal */}
          {selectedCertImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedCertImage(null)}
            >
              <div 
                className="relative max-w-4xl max-h-[90vh] bg-gray-800 rounded-2xl overflow-hidden border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedCertImage.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedCertImage.issuer} • {selectedCertImage.year}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCertImage(null)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <img 
                    src={selectedCertImage.image} 
                    alt={`Certificate: ${selectedCertImage.name}`}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Bernardo Nandaniar Sunia. Crafted with passion and precision.
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse fill-current" />
              <span>and React.js</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsPage;