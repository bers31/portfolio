import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Brain, Database, Zap, Award, Briefcase, GraduationCap, Star, 
  MapPin, Calendar, Globe, BookOpen, Trophy, Target, Sparkles, 
  ChevronRight, Download, ExternalLink, Mail, Phone, Linkedin,
  ArrowRight, TrendingUp, Users, Coffee, Heart
} from 'lucide-react';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' }
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const personalInfo = {
    name: "Bernardo Nandaniar Sunia",
    title: "AI/ML Developer & Informatics Student",
    university: "Diponegoro University",
    gpa: "3.77/4.0",
    semester: "6th Semester",
    location: "Semarang, Indonesia",
    languages: ["English (CEFR 488)", "Indonesian (Native)"],
  };

  const achievements = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Built AI chatbot serving correctional facility with 95% accuracy",
      color: "from-blue-500 to-cyan-500",
      stats: "95% Accuracy",
      bgColor: "rgba(59, 130, 246, 0.1)"
    },
    {
      icon: TrendingUp,
      title: "Data Analysis",
      description: "Analyzed 500K+ tweets with 92% sentiment classification accuracy",
      color: "from-purple-500 to-pink-500",
      stats: "500K+ Tweets",
      bgColor: "rgba(147, 51, 234, 0.1)"
    },
    {
      icon: Zap,
      title: "System Performance",
      description: "Developed multilingual IR system with sub-second response times",
      color: "from-green-500 to-teal-500",
      stats: "<1s Response",
      bgColor: "rgba(34, 197, 94, 0.1)"
    }
  ];

  const coreCompetencies = [
    { name: "Machine Learning & Deep Learning", icon: Brain, level: 90, color: "blue" },
    { name: "Full-Stack Development", icon: Code, level: 85, color: "green" },
    { name: "Data Analysis & Visualization", icon: Database, level: 92, color: "purple" },
    { name: "AI/NLP Solutions", icon: Zap, level: 88, color: "yellow" },
    { name: "Project Management", icon: Briefcase, level: 83, color: "pink" },
    { name: "Research & Development", icon: BookOpen, level: 87, color: "indigo" }
  ];

  const highlights = [
    {
      icon: Users,
      title: "Mentored 20+ Students",
      description: "Laboratory Teaching Assistant raising average lab grades by 15%",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Coffee,
      title: "12 Projects Experience",
      description: "Successfully delivered complex AI/ML and web development projects",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Trophy,
      title: "Multiple Certifications",
      description: "PyTorch, Oracle Database, Java, Cloud Computing, and more",
      color: "from-amber-500 to-orange-500"
    }
  ];

  // New sections utilizing unused imports
  const awards = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Maintained 3.77 GPA throughout academic journey",
      year: "2022-2025"
    },
    {
      icon: Trophy,
      title: "Project Innovation",
      description: "Outstanding performance in AI/ML development projects",
      year: "2024"
    },
    {
      icon: Star,
      title: "Teaching Excellence",
      description: "Recognized for exceptional mentoring and teaching skills",
      year: "2023-2024"
    }
  ];

  const goals = [
    {
      icon: Target,
      title: "Short-term Goals",
      items: [
        "Complete Master's degree in AI/ML",
        "Publish research papers",
        "Expand open-source contributions"
      ]
    },
    {
      icon: Sparkles,
      title: "Long-term Vision",
      items: [
        "Lead AI innovation in healthcare",
        "Build impactful tech solutions",
        "Mentor next generation developers"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      green: "text-green-400 bg-green-500/10 border-green-500/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
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

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300">About Me</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Passionate Developer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Transforming complex data into actionable insights through innovative AI/ML solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="inline-flex items-center px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                <GraduationCap className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-300">Informatics Student</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                <Brain className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-sm text-purple-300">AI/ML Developer</span>
              </div>
              <div className="inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                <MapPin className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm text-green-300">Semarang, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Profile Photo & Quick Info */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-600/30 backdrop-blur-sm">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto md:mx-0 mb-6 overflow-hidden border-4 border-blue-400/30 shadow-2xl">
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white">
                      B
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-3xl font-bold text-white">{personalInfo.name}</h2>
                  <p className="text-xl text-blue-400 font-semibold">{personalInfo.title}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                      <span>{personalInfo.university}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>GPA: {personalInfo.gpa}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <span>{personalInfo.semester}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-purple-400" />
                      <span>{personalInfo.languages.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/30 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a
                      href="https://wa.me/6289520501678"
                      className="inline-flex items-center px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg border border-green-500/30 transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                    <a
                      href="https://linkedin.com/in/bernardo-sunia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/30 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href=resumeFile;
                        link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }} className="inline-flex items-center px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg border border-amber-500/30 transition-all duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span>Resume</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Key Achievements
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    activeCard === index ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${achievement.bgColor}, rgba(31, 41, 55, 0.3))`,
                  }}
                >
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} mb-4`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">{achievement.stats}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-6 border border-gray-600/30 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                      <award.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                      <p className="text-yellow-400 text-sm font-medium">{award.year}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Core Competencies
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreCompetencies.map((skill, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${getColorClasses(skill.color)}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${skill.color === 'blue' ? 'bg-blue-500/20' : skill.color === 'green' ? 'bg-green-500/20' : skill.color === 'purple' ? 'bg-purple-500/20' : skill.color === 'yellow' ? 'bg-yellow-500/20' : skill.color === 'pink' ? 'bg-pink-500/20' : 'bg-indigo-500/20'}`}>
                      <skill.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold ml-3">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        skill.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                        skill.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                        skill.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                        skill.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                        skill.color === 'pink' ? 'bg-gradient-to-r from-pink-500 to-pink-400' :
                        'bg-gradient-to-r from-indigo-500 to-indigo-400'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">{skill.level}% Proficiency</p>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                Goals & Vision
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-600/30 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
                      <goal.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white ml-4">{goal.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {goal.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Professional Highlights
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl p-6 bg-gray-800/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${highlight.color} mb-4`}>
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{highlight.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="https://bit.ly/bernardo-project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <Heart className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 transition-colors" fill="currentColor"/>
              Ready to collaborate on innovative projects
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
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
    </div>
  );
};

export default About;