import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Send, 
  MessageCircle, 
  Clock, 
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Copy,
  Download,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Encode subject & body
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    // NOTE: parameter "su" untuk subject, "&" sebelum param berikutnya
    const gmailLink =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=suniabernardo@gmail.com` +
      `&su=${subject}` +
      `&body=${body}`;

    // buka compose Gmail di tab yang sama
    window.open(gmailLink, '_self');

    // reset UI
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'suniabernardo@gmail.com',
      link:  'https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      description: 'Drop me a line anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 89520501678',
      link: 'tel:+6289520501678',
      color: 'from-green-500 to-emerald-500',
      description: 'Available Mon-Fri, 9AM-6PM'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Semarang, Indonesia',
      link: 'https://maps.google.com/?q=Semarang,Indonesia',
      color: 'from-purple-500 to-pink-500',
      description: 'Central Java, GMT+7'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'bernardo-sunia',
      link: 'https://linkedin.com/in/bernardo-sunia/',
      color: 'from-blue-600 to-indigo-600',
      description: 'Professional network'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'bernardo-sunia',
      link: 'https://github.com/bers31',
      color: 'from-gray-600 to-gray-800',
      description: 'Code repositories'
    }
  ];

  const quickStats = [
    { number: '3.77', label: 'Current GPA', icon: Star },
    { number: '10+', label: 'Projects Completed', icon: CheckCircle },
    { number: '2+', label: 'Years Experience', icon: Clock },
    { number: '500+', label: 'Users Served', icon: MessageCircle }
  ];

  const availability = [
    { type: 'Full-time Opportunities', available: true, note: 'Open to remote or hybrid' },
    { type: 'Internships', available: true, note: 'AI/ML and Software Development' },
    { type: 'Freelance Projects', available: true, note: 'Web development & data analysis' },
    { type: 'Collaborative Research', available: true, note: 'Academic or industry projects' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pt-16">
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
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      
      {/* Interactive Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-blue-400/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Additional floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header Section */}
        <div 
          id="header"
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-6 relative">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Let's Create
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? I'm here to help you build innovative solutions 
            that make a difference. Let's start the conversation!
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </a>
            <a
              href="https://bit.ly/bernardo-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-gray-600 hover:border-gray-500"
            >
              <ExternalLink className="w-5 h-5" />
              <span>View Project</span>
            </a>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div 
          id="stats"
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${
            isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:animate-bounce" />
              <div className="text-2xl font-bold text-white mb-1 relative z-10">{stat.number}</div>
              <div className="text-sm text-gray-400 relative z-10">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <div 
            id="contact-form"
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible['contact-form'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Send Me a Message</h2>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                    placeholder="Project Collaboration"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-500"
                    placeholder="Tell me about your project idea..."
                  ></textarea>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-center space-x-2 animate-pulse">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Message sent successfully!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Availability Status */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Availability</h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                {availability.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className={`w-3 h-3 rounded-full mt-1 transition-all duration-300 ${item.available ? 'bg-green-400 group-hover:animate-pulse' : 'bg-red-400'}`}></div>
                    <div>
                      <div className="text-white font-medium group-hover:text-green-400 transition-colors">{item.type}</div>
                      <div className="text-sm text-gray-400">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div 
            id="contact-info"
            className={`space-y-8 transition-all duration-1000 delay-400 ${
              isVisible['contact-info'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{info.description}</p>
                      <div className="flex items-center space-x-2">
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                        <button
                          onClick={() => copyToClipboard(info.value, info.title)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                        >
                          <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                        {copiedField === info.title && (
                          <span className="text-green-400 text-sm animate-pulse">Copied!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">Quick Actions</h3>
              <div className="space-y-4 relative z-10">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-between shadow-lg hover:shadow-xl"
                >
                  <span>Quick Email</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/bernardo-sunia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-between shadow-lg hover:shadow-xl"
                >
                  <span>View LinkedIn</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a
                  href="https://bit.ly/bernardo-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-between shadow-lg hover:shadow-xl"
                >
                  <span>Full Project</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href=resumeFile;
                    link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-between shadow-lg hover:shadow-xl"
                >
                  <span>Download Resume</span>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Enhanced Response Time */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <div className="flex items-center space-x-3 mb-4 relative z-10">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Usually responds within 24 hours</span>
              </div>
              <p className="text-gray-300 text-sm relative z-10">
                I check my messages regularly and aim to respond to all inquiries promptly. 
                For urgent matters, feel free to call or message me directly.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div 
          id="footer"
          className={`mt-16 pt-8 border-t border-gray-800 text-center transition-all duration-1000 delay-500 ${
            isVisible.footer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-400 mb-4">
            Ready to build something extraordinary together?
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/bernardo-sunia/" 
              className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com/bers31" 
              className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://bit.ly/bernardo-portfolio" 
              className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform duration-300"
            >
              <ExternalLink className="w-6 h-6" />
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

export default Contact;