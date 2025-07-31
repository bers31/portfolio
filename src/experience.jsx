import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Award, 
  ChevronRight, 
  Code, 
  Users, 
  TrendingUp, 
  Zap,
  Building,
  Clock,
  Star,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Target,
  Trophy,
  GitBranch,
  Database,
  Brain,
  Monitor,
  Settings,
  Heart
} from 'lucide-react';

const ExperiencePage = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    // Real-time clock for enhanced interactivity
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const experiences = [
    {
      id: 1,
      role: "Intern - Automated Information System Chatbot Developer",
      company: "Class II Ambarawa Correctional Facility",
      period: "May 2025 – Jul 2025",
      duration: "3 months",
      type: "Internship",
      location: "Ambarawa, Indonesia",
      description: "Spearheaded the development of an AI-powered chatbot system that revolutionized information access for visitors and staff at the correctional facility.",
      achievements: [
        "Built full-stack AI chatbot with 95% accuracy in responding to facility inquiries",
        "Integrated OpenAI GPT API with custom prompts for context-aware responses",
        "Implemented secure admin dashboard with role-based access control",
        "Reduced visitor inquiry response time from 24 hours to instant",
        "Enhanced user engagement through Web Push notifications"
      ],
      skills: ["Python", "Flask", "OpenAI API", "JavaScript", "SQLite", "AI/ML"],
      highlights: [
        { icon: Users, text: "Improved visitor experience for 500+ monthly visitors" },
        { icon: Zap, text: "Instant response time vs 24-hour manual processing" },
        { icon: Award, text: "Recognized for innovation in government digitization" }
      ],
      gradient: "from-purple-500 via-pink-500 to-red-500",
      bgPattern: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
      repository: "https://github.com/bers31/bernardo.github.io/tree/main/Automated_Information_System_Chatbot",
      liveDemo: "https://bers31.github.io/bernardo.github.io/Automated_Information_System_Chatbot"
    },
    {
      id: 2,
      role: "Laboratory Teaching Assistant",
      company: "Computer Laboratory Diponegoro University",
      period: "Jun 2023 – Jun 2025",
      duration: "2 years",
      type: "Part-time",
      location: "Semarang, Indonesia",
      description: "Mentored students in programming fundamentals while supporting laboratory operations and curriculum development.",
      achievements: [
        "Mentored 20+ students per semester in programming fundamentals",
        "Increased average lab assignment grades by 15% through personalized guidance",
        "Developed interactive coding tutorials for complex algorithms",
        "Streamlined lab equipment management and maintenance procedures",
        "Collaborated with faculty to enhance curriculum effectiveness"
      ],
      skills: ["Teaching", "Python", "Java", "C++", "Mentoring", "Curriculum Development"],
      highlights: [
        { icon: Users, text: "Mentored 160+ students across 8 semesters" },
        { icon: TrendingUp, text: "15% improvement in average student grades" },
        { icon: Star, text: "Consistently rated 4.8/5 by students" }
      ],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgPattern: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      repository: "https://github.com/bers31/bernardo.github.io/tree/main/Student_Academic_Information_System",
      liveDemo: "https://bers31.github.io/bernardo.github.io/Student_Academic_Information_System/"
    },
    {
      id: 3,
      role: "Intern - Financial Reporting Application Developer",
      company: "East Semarang District",
      period: "Dec 2024 – Feb 2025",
      duration: "3 months",
      type: "Internship",
      location: "Semarang, Indonesia",
      description: "Engineered a comprehensive financial reporting system that transformed data accessibility and processing efficiency for district operations.",
      achievements: [
        "Developed full-stack financial reporting application using React.js and Node.js",
        "Optimized database queries resulting in 60% faster report generation",
        "Built interactive dashboard with real-time data visualizations",
        "Implemented secure authentication and role-based access control",
        "Enhanced data accuracy through automated validation systems"
      ],
      skills: ["React.js", "Node.js", "MySQL", "Prisma", "Data Visualization", "Authentication"],
      highlights: [
        { icon: Database, text: "Processed 10,000+ financial records daily" },
        { icon: TrendingUp, text: "60% improvement in report generation speed" },
        { icon: Target, text: "100% data accuracy through automated validation" }
      ],
      gradient: "from-green-500 via-emerald-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
      repository: "https://github.com/bers31/bernardo.github.io/tree/main/Financial_Reporting_Application",
      liveDemo: "https://bers31.github.io/bernardo.github.io/Financial_Reporting_Application/"
    },
    {
      id: 4,
      role: "Freelance - Assistant Manager & Supply Chain Assistant",
      company: "YC Electric",
      period: "Jan 2022 – Dec 2024",
      duration: "3 years",
      type: "Freelance",
      location: "Semarang, Indonesia",
      description: "Led operational excellence initiatives while developing the company's first e-commerce platform, driving digital transformation and business growth.",
      achievements: [
        "Developed custom e-commerce platform attracting 500+ active users",
        "Optimized inventory management reducing stock discrepancies by 30%",
        "Streamlined supply chain operations improving delivery time by 25%",
        "Increased organic traffic by 40% through SEO optimization",
        "Managed 100+ products with 50+ daily transactions"
      ],
      skills: ["E-commerce", "Supply Chain", "Project Management", "SEO", "Inventory Management"],
      highlights: [
        { icon: TrendingUp, text: "40% increase in organic website traffic" },
        { icon: Users, text: "500+ active users on e-commerce platform" },
        { icon: Award, text: "Led company's digital transformation initiative" }
      ],
      gradient: "from-orange-500 via-red-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-orange-900/20 to-red-900/20",
      repository: "https://github.com/bers31/bernardo.github.io/tree/main/Custom_E_Commerce_Website",
      liveDemo: "https://bers31.github.io/bernardo.github.io/Custom_E_Commerce_Website/"
    }
  ];

  const stats = [
    { number: "2+", label: "Years Experience", icon: Clock },
    { number: "4", label: "Major Projects", icon: Briefcase },
    { number: "160+", label: "Students Mentored", icon: Users },
    { number: "95%", label: "Success Rate", icon: Trophy }
  ];

  const skillCategories = [
    {
      title: "Programming & Development",
      skills: ["Python", "JavaScript", "React.js", "Node.js", "Java", "C++"],
      icon: Code,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "AI & Machine Learning",
      skills: ["OpenAI API", "TensorFlow", "PyTorch", "NLP", "Data Analysis"],
      icon: Brain,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Database & Backend",
      skills: ["MySQL", "SQLite", "Prisma", "Flask", "Express.js"],
      icon: Database,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Tools & Management",
      skills: ["Git", "Docker", "Project Management", "Teaching", "SEO"],
      icon: Settings,
      color: "from-orange-500 to-red-600"
    }
  ];

  const additionalMetrics = [
    { icon: GitBranch, label: "Code Commits", value: "1,200+" },
    { icon: Monitor, label: "UI/UX Projects", value: "15" },
    { icon: Brain, label: "AI Models Trained", value: "8" },
    { icon: Database, label: "Databases Managed", value: "12" }
  ];

  const workflowSteps = [
    { 
      step: "1", 
      title: "Analysis & Planning", 
      description: "Requirements gathering and system architecture design",
      icon: Target,
      color: "from-blue-500 to-purple-500"
    },
    { 
      step: "2", 
      title: "Development & Testing", 
      description: "Agile development with continuous integration",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    { 
      step: "3", 
      title: "Deployment & Monitoring", 
      description: "Production deployment with performance monitoring",
      icon: Monitor,
      color: "from-pink-500 to-red-500"
    },
    { 
      step: "4", 
      title: "Optimization & Maintenance", 
      description: "Continuous improvement and system maintenance",
      icon: Settings,
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="hero">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
              <Briefcase className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">Professional Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Professional Journey
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transforming ideas into impactful solutions through innovative technology and strategic thinking
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <MapPin className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm text-gray-300">Semarang, Indonesia</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">2022 - Present</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm text-gray-300">Informatics Student</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Clock className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-sm text-gray-300">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    timeZone: 'Asia/Jakarta'
                  })} WIB
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-700 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="stats">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Metrics */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${isVisible['additional-metrics'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="additional-metrics">
            {additionalMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                  </div>
                  <metric.icon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-16 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible['workflow-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="workflow-header">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Development Workflow
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A systematic approach to delivering high-quality solutions
            </p>
          </div>

          <div className={`grid md:grid-cols-4 gap-8 transition-all duration-700 ${isVisible['workflow-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="workflow-steps">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm mr-3`}>
                      {step.step}
                    </div>
                    <step.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible['timeline-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="timeline-header">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Professional Experience Timeline
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive journey through my professional development and achievements
            </p>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative transition-all duration-700 ${
                  isVisible[`exp-${exp.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex items-center`}
                data-animate
                id={`exp-${exp.id}`}
              >
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-30"></div>
                
                {/* Timeline Node */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10"></div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div
                    className={`${exp.bgPattern} backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer transform hover:scale-105 ${
                      activeCard === exp.id 
                        ? 'border-purple-500/70 shadow-lg shadow-purple-500/20 scale-105' 
                        : 'border-gray-700/50 hover:border-gray-600/50'
                    }`}
                    onMouseEnter={() => setActiveCard(exp.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${exp.gradient} p-[1px] rounded-t-2xl`}>
                      <div className="bg-gray-900/95 rounded-t-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                            <div className="flex items-center text-purple-400 font-semibold mb-1">
                              <Building className="w-4 h-4 mr-2" />
                              {exp.company}
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              {exp.period}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className={`px-3 py-1 bg-gradient-to-r ${exp.gradient} text-white text-xs rounded-full font-medium`}>
                              {exp.type}
                            </span>
                            <span className="text-gray-400 text-xs">{exp.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 bg-gray-800/80 backdrop-blur-sm">
                      <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                      {/* Key Highlights */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-purple-300 flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          Key Highlights
                        </h4>
                        <div className="grid gap-2">
                          {exp.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center text-sm text-gray-300">
                              <div className="p-1 bg-purple-500/20 rounded-full mr-3">
                                <highlight.icon className="w-3 h-3 text-purple-400" />
                              </div>
                              {highlight.text}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-green-300 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Key Achievements
                        </h4>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start text-sm text-gray-300">
                              <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-blue-300 flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 bg-gradient-to-r ${exp.gradient} bg-opacity-20 text-white text-xs rounded-full border border-gray-600 hover:border-gray-500 transition-colors`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-3">
                        <button 
                          onClick={() => window.open(exp.repository, '_blank')}
                          className="flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors"
                        >
                          <GitBranch className="w-4 h-4 mr-2" />
                          Repository
                        </button>
                        <button 
                          onClick={() => window.open(exp.liveDemo, '_blank')}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg text-sm transition-colors border border-purple-500/30"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          LiveURL
                        </button>
                      </div>
                    </div>

                    {/* Animated Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} transition-opacity duration-300 rounded-2xl pointer-events-none ${
                      activeCard === exp.id ? 'opacity-20' : 'opacity-0'
                    }`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible['skills-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="skills-header">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Skills and technologies mastered through professional experience
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 ${isVisible['skills-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="skills-grid">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 bg-gradient-to-r ${category.color} bg-opacity-20 rounded-full mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`transition-all duration-700 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} data-animate id="cta">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how my experience and skills can contribute to your next innovative project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://bit.ly/bernardo-portfolio", "_blank")} 
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Full Project
              </button>
              <button 
                onClick={() => window.open("https://wa.me/6289520501678", "_blank")}
                className="px-8 py-3 border-2 border-purple-500 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default ExperiencePage;