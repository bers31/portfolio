import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Phone, MapPin, Linkedin, ExternalLink, Code, Brain, Database, Zap, Award, Briefcase, GraduationCap, Star, Download, ArrowRight, Play, Sparkles, Trophy, Target, Lightbulb, Heart } from 'lucide-react';
import foto from './images/foto.png';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const dynamicTexts = [
    "AI/ML Developer",
    "Data Scientist",
    "Full-Stack Developer",
    "Problem Solver",
    "Innovation Catalyst"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dynamicTexts.length]);

  // Mapping untuk navigasi
  const navigationItems = [
    { name: 'Home', path: '/', isInternal: false },
    { name: 'About', path: '/about', isInternal: false },
    { name: 'Projects', path: '/projects', isInternal: false },
    { name: 'Experience', path: '/experience', isInternal: false },
    { name: 'Skills', path: '/skills', isInternal: false },
    { name: 'Contact', path: '/contact', isInternal: false }
  ];

  const stats = [
    { number: "6+", label: "Projects Completed", icon: Trophy },
    { number: "500K+", label: "Data Points Analyzed", icon: Database },
    { number: "95%", label: "AI Model Accuracy", icon: Target },
    { number: "3.77", label: "GPA Achievement", icon: Award }
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: "AI Innovation",
      description: "Built intelligent chatbot serving correctional facility with 95% accuracy",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Zap,
      title: "Big Data Analysis",
      description: "Analyzed 500K+ tweets with 92% sentiment classification accuracy",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "System Architecture",
      description: "Developed multilingual IR system with sub-second response times",
      color: "from-green-400 to-blue-500"
    }
  ];

  const techStack = [
    { name: "Python", color: "bg-yellow-500" },
    { name: "React.js", color: "bg-cyan-500" },
    { name: "TensorFlow", color: "bg-orange-500" },
    { name: "PyTorch", color: "bg-red-500" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "MySQL", color: "bg-blue-500" },
    { name: "Docker", color: "bg-blue-400" },
    { name: "AWS", color: "bg-orange-400" }
  ];

  const expertise = [
    { icon: Code, title: "Full-Stack Development", desc: "Building end-to-end applications" },
    { icon: Brain, title: "Artificial Intelligence", desc: "ML models and neural networks" },
    { icon: Database, title: "Data Engineering", desc: "Big data processing and analytics" },
    { icon: Zap, title: "Performance Optimization", desc: "Scalable and efficient solutions" }
  ];

  const experience = [
    {
      icon: Briefcase,
      role: "AI/ML Developer",
      company: "Correctional Facility Project",
      period: "2024",
      achievements: ["95% chatbot accuracy", "Real-time response system", "User satisfaction improvement"]
    },
    {
      icon: GraduationCap,
      role: "Data Science Researcher",
      company: "University Project",
      period: "2023-2024",
      achievements: ["500K+ tweets analyzed", "92% sentiment accuracy", "Publication ready research"]
    }
  ];

  const location = {
    city: "Semarang",
    region: "Central Java",
    country: "Indonesia"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background with Parallax */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s', transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s', transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px)` }}
        ></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
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
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Profile Image with Enhanced Animation */}
            <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative inline-block">
                <div className="w-56 h-56 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full p-1 animate-zoom-pulse">
                  <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-52 h-52 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold text-white">
                      <img src={foto} alt="Deskripsi gambar" className="w-52 h-52 rounded-full object-cover"></img>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Main Title with Animation */}
            <div className={`mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Bernardo Nandaniar Sunia
              </h1>
              <div className="text-2xl md:text-3xl text-gray-300 mb-2">
                Informatics Student & 
              </div>
              <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent min-h-[3rem] flex items-center justify-center">
                <span className="animate-pulse">{dynamicTexts[currentText]}</span>
              </div>
            </div>

            {/* Location with MapPin */}
            <div className={`mb-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>{location.city}, {location.region}, {location.country}</span>
              </div>
            </div>

            {/* Description */}
            <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transforming complex data into actionable insights through innovative 
                <span className="text-blue-400 font-semibold"> AI/ML solutions</span>. 
                Building the future with code, creativity, and cutting-edge technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => window.open("https://bit.ly/bernardo-project", "_blank")}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center space-x-2"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href=resumeFile;
                    link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="group px-8 py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:border-blue-600 transition-all duration-300 flex items-center space-x-2"
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className={`mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:bg-blue-500/10"
                >
                  <Mail className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="https://linkedin.com/in/bernardo-sunia/" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:bg-blue-500/10">
                  <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a href="https://bit.ly/bernardo-project" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:bg-purple-500/10">
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </a>
                <a href="https://wa.me/6289520501678" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-green-500 transition-all duration-300 hover:bg-green-500/10">
                  <Phone className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="relative z-10 py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-in slide-in-from-bottom-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Areas of Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Specialized skills that drive innovation and deliver results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, index) => (
              <div
                key={index}
                className={`group text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-in slide-in-from-bottom-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section id="projects" className="relative z-10 py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              What I Do Best
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Turning innovative ideas into reality through cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-in slide-in-from-bottom-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${highlight.color} rounded-t-2xl`}></div>
                <div className={`w-16 h-16 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{highlight.title}</h3>
                <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Building impactful solutions through hands-on experience
            </p>
          </div>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] ${
                  isVisible ? 'animate-in slide-in-from-bottom-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <exp.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-white">{exp.role}</h3>
                    <p className="text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-4">{exp.period}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="flex items-center space-x-1 px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{achievement}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="relative z-10 py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Tech Arsenal
            </h2>
            <p className="text-lg text-gray-300">
              Mastering the tools that shape tomorrow's digital landscape
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-in slide-in-from-bottom-8' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${tech.color} group-hover:scale-110 transition-transform`}></div>
                  <span className="text-gray-300 font-medium">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and turn your innovative ideas into reality. 
              I'm always excited to work on challenging projects that make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Start a Conversation</span>
              </button>

              <button
                onClick={() => window.open("https://bit.ly/bernardo-project", "_blank")}
                className="group px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500 hover:border-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>View Full Project</span>
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

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.8s ease-out forwards;
        }
        
        .slide-in-from-bottom-8 {
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default Home;