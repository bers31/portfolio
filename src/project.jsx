import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  MapPin, 
  Star, 
  ArrowRight,
  Code,
  Brain,
  Target,
  Database,
  Globe,
  Zap,
  Award,
  ChevronRight,
  Filter,
  Search,
  Eye,
  TrendingUp,
  Mail,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import foto1 from './images/foto1.png';
import foto2 from './images/foto2.png';
import foto3 from './images/foto3.png';
import foto4 from './images/foto4.png';
import foto5 from './images/foto5.png';
import foto6 from './images/foto6.png';
import foto7 from './images/foto7.png';
import foto8 from './images/foto8.png';
import foto9 from './images/foto9.png';
import foto10 from './images/foto10.png';
import foto11 from './images/foto11.png';
import foto12 from './images/foto12.png';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';

const navigationItems = [
  { name: 'Home', path: '/', isInternal: false },
  { name: 'About', path: '/about', isInternal: false },
  { name: 'Projects', path: '/projects', isInternal: false },
  { name: 'Experience', path: '/experience', isInternal: false },
  { name: 'Skills', path: '/skills', isInternal: false },
  { name: 'Contact', path: '/contact', isInternal: false }
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "AI-Driven Information Center Chatbot",
      subtitle: "Revolutionizing Correctional Facility Communication",
      period: "May 2025 - Jul 2025",
      organization: "Class II Ambarawa Correctional Facility",
      category: "AI/ML",
      featured: true,
      image: foto1,
      technologies: ["Python", "Flask", "OpenAI GPT API", "SQLite", "JavaScript", "HTML5", "CSS3"],
      description: "Architected a comprehensive AI-powered chatbot system that transformed how inmates' families access information about visitation rules, health services, and rehabilitation programs. The system serves as a 24/7 digital information center, eliminating the need for physical contact while providing instant, accurate responses.",
      highlights: [
        "Integrated OpenAI GPT API with custom prompts delivering context-aware responses in formal Bahasa Indonesia",
        "Built secure admin dashboard with role-based access control and brute-force protection",
        "Implemented real-time content management system for non-technical staff",
        "Achieved 95% accuracy in information delivery with graceful fallback messaging",
        "Enhanced user engagement through Web Push notifications and offline caching"
      ],
      impact: {
        users: "500+",
        accuracy: "95%",
        responseTime: "<2s"
      },
      gradient: "from-purple-600 via-pink-600 to-red-500",
      bgPattern: "bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Automated_Information_System_Chatbot",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Automated_Information_System_Chatbot/"
    },
    {
      id: 2,
      title: "Twitter Information Diffusion & Sentiment Analysis",
      subtitle: "Large-Scale Social Media Analytics Platform",
      period: "Apr 2025 - Jun 2025",
      organization: "Diponegoro University",
      category: "Data Science",
      featured: false,
      image: foto2,
      technologies: ["Python", "Tweepy", "NetworkX", "Scikit-learn", "Pandas", "Matplotlib"],
      description: "Developed a sophisticated data analytics platform capable of processing 500,000+ tweets daily, providing deep insights into information diffusion patterns and sentiment trends across social media networks.",
      highlights: [
        "Achieved 92% accuracy in sentiment classification using ensemble methods",
        "Identified top 1% most influential users through advanced network analysis",
        "Boosted model accuracy by 18% through robust data preprocessing pipeline",
        "Revealed three major community clusters driving topic virality",
        "Processed real-time data streams with fault-tolerance mechanisms"
      ],
      impact: {
        tweets: "500K+",
        accuracy: "92%",
        improvement: "18%"
      },
      gradient: "from-blue-600 via-cyan-600 to-teal-500",
      bgPattern: "bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Twitter_Information_Diffusion%26Sentiment_Analysis",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Twitter_Information_Diffusion%26Sentiment_Analysis/"
    },
    {
      id: 3,
      title: "Advanced Information Retrieval System",
      subtitle: "Multilingual Neural Search Engine",
      period: "Aug 2024 - Dec 2024",
      organization: "Diponegoro University",
      category: "AI/ML",
      featured: true,
      image: foto3,
      technologies: ["Python", "mBERT", "PyTorch", "FAISS", "Streamlit", "Hugging Face"],
      description: "Built a cutting-edge multilingual neural information retrieval system using fine-tuned mBERT, enabling semantic search across Indonesian and English documents with unprecedented speed and accuracy.",
      highlights: [
        "Achieved sub-second query response times with FAISS optimization",
        "Significant performance uplift over traditional BM25 baselines",
        "Implemented dynamic embedding visualizations and similarity heatmaps",
        "Ensured reproducibility through Docker containerization",
        "Fine-tuned mBERT for cross-lingual semantic understanding"
      ],
      impact: {
        responseTime: "<1s",
        languages: "2",
        accuracy: "High"
      },
      gradient: "from-green-600 via-emerald-600 to-teal-500",
      bgPattern: "bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Advance_Information_Retrieval_System",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Advance_Information_Retrieval_System/"
    },
    {
      id: 4,
      title: "Financial Reporting Application",
      subtitle: "Enterprise-Grade Financial Management System",
      period: "Dec 2024 - Feb 2025",
      organization: "East Semarang District",
      category: "Full Stack",
      featured: false,
      image: foto4,
      technologies: ["React.js", "MySQL", "Prisma", "Node.js", "Express.js", "Chart.js"],
      description: "Developed a comprehensive financial reporting system that revolutionized how financial data is processed, visualized, and accessed by stakeholders across the organization.",
      highlights: [
        "Optimized data retrieval with Prisma ORM and MySQL for lightning-fast queries",
        "Built interactive dashboard with real-time financial visualizations",
        "Implemented secure authentication and role-based access control",
        "Enhanced UI/UX for intuitive user experience across all devices",
        "Integrated dynamic Chart.js visualizations for complex financial data"
      ],
      impact: {
        users: "100+",
        efficiency: "40%",
        accuracy: "99%"
      },
      gradient: "from-orange-600 via-red-600 to-pink-500",
      bgPattern: "bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Financial_Reporting_Application",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Financial_Reporting_Application/"
    },
    {
      id: 5,
      title: "Student Performance Clustering System",
      subtitle: "AI-Powered Educational Analytics",
      period: "Aug 2024 - Dec 2024",
      organization: "Diponegoro University",
      category: "Data Science",
      featured: false,
      image: foto5,
      technologies: ["Python", "K-Means", "Streamlit", "Scikit-learn", "Pandas"],
      description: "Engineered an unsupervised learning system that enables educators to identify distinct student performance groups and tailor educational interventions for improved academic outcomes.",
      highlights: [
        "Implemented advanced K-Means clustering for student segmentation",
        "Created interactive Streamlit interface for real-time analysis",
        "Validated clustering results using silhouette scores and statistical metrics",
        "Enabled actionable insights for personalized education strategies",
        "Designed intuitive visualizations for non-technical educators"
      ],
      impact: {
        clusters: "5",
        accuracy: "88%",
        insights: "Real-time"
      },
      gradient: "from-indigo-600 via-purple-600 to-pink-500",
      bgPattern: "bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Unsupervised_Learning_Project",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Unsupervised_Learning_Project/"
    },
    {
      id: 6,
      title: "YC Electric E-Commerce Platform",
      subtitle: "Custom E-Commerce Solution",
      period: "Jan 2022 - Jan 2024",
      organization: "YC Electric",
      category: "Web Development",
      featured: false,
      image: foto6,
      technologies: ["HTML5", "CSS3", "JavaScript", "MySQL", "PHP"],
      description: "Led the complete development of a custom e-commerce platform that successfully attracted 500+ active users with comprehensive shopping features and optimized performance.",
      highlights: [
        "Achieved sub-2-second page load times through optimization",
        "Increased organic traffic by 40% through SEO best practices",
        "Boosted customer retention by 25% through A/B testing",
        "Managed 100+ products with 50+ daily transactions",
        "Implemented secure payment processing and user authentication"
      ],
      impact: {
        users: "500+",
        traffic: "+40%",
        retention: "+25%"
      },
      gradient: "from-yellow-600 via-orange-600 to-red-500",
      bgPattern: "bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Custom_E_Commerce_Website",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Custom_E_Commerce_Website/"
    },
    {
      id: 7,
      title: "3D Minecraft Game Development",
      subtitle: "Interactive 3D Gaming Experience",
      period: "2023 - 2024",
      organization: "Personal Project",
      category: "Game Development",
      featured: false,
      image: foto7,
      technologies: ["C++", "OpenGL", "Matrix Math", "3D Graphics"],
      description: "Designed and developed a 3D game inspired by Minecraft featuring a bear character in a fully immersive 3D environment with interactive objects and dynamic world generation.",
      highlights: [
        "Created dynamic 3D world with interactive objects using OpenGL",
        "Implemented matrix manipulation for efficient 3D rendering",
        "Designed intuitive control system for immersive gameplay",
        "Optimized performance for smooth gameplay on various hardware",
        "Integrated user feedback to enhance gaming experience"
      ],
      impact: {
        fps: "60+",
        objects: "1000+",
        performance: "Optimized"
      },
      gradient: "from-green-600 via-lime-600 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-green-900/20 via-lime-900/20 to-emerald-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/3D_Minecraft_Development",
      liveUrl: "https://bers31.github.io/bernardo.github.io/3D_Minecraft_Development/"
    },
    {
      id: 8,
      title: "Student Information System (SI-MAS)",
      subtitle: "Academic Management Platform",
      period: "2023 - 2024",
      organization: "University Project",
      category: "Full Stack",
      featured: false,
      image: foto8,
      technologies: ["Laravel", "MySQL", "PHP", "Bootstrap", "jQuery"],
      description: "Developed an integrated web-based Student Information System serving over 1,000 students and 100 academic advisors with streamlined course registration and academic records management.",
      highlights: [
        "Served 1,000+ students and 100+ academic advisors efficiently",
        "Reduced course registration time by 30% through automation",
        "Implemented secure authentication and data protection",
        "Created automated validation processes reducing human error",
        "Established comprehensive documentation and training materials"
      ],
      impact: {
        users: "1000+",
        timeReduction: "30%",
        accuracy: "99%"
      },
      gradient: "from-blue-600 via-indigo-600 to-purple-500",
      bgPattern: "bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Student_Academic_Information_System",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Student_Academic_Information_System/"
    },
    {
      id: 9,
      title: "Advanced Customer Segmentation System",
      subtitle: "Supervised Learning Customer Analytics",
      period: "Mar 2024 - May 2024",
      organization: "Diponegoro University",
      category: "Data Science",
      featured: false,
      image: foto9,
      technologies: ["Python", "Random Forest", "SVM", "XGBoost", "k-NN", "Streamlit"],
      description: "Engineered a sophisticated customer segmentation system using advanced supervised learning algorithms, achieving highly actionable segmentation that empowers businesses to target customer groups effectively.",
      highlights: [
        "Implemented cutting-edge models including Random Forest, SVM, XGBoost, and k-NN",
        "Achieved significant improvement in segmentation accuracy and operational efficiency",
        "Developed interactive Streamlit interface for dynamic exploration",
        "Performed rigorous model evaluation and hyperparameter tuning",
        "Integrated real-time customer data analysis features"
      ],
      impact: {
        accuracy: "95%",
        models: "4",
        efficiency: "+40%"
      },
      gradient: "from-cyan-600 via-blue-600 to-indigo-500",
      bgPattern: "bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-indigo-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Supervised_Learning_Project",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Supervised_Learning_Project/"
    },
    {
      id: 10,
      title: "Custom Search Engine with VSM & LSI",
      subtitle: "Advanced Information Retrieval System",
      period: "Sep 2024 - Nov 2024",
      organization: "Diponegoro University",
      category: "AI/ML",
      featured: true,
      image: foto10,
      technologies: ["Python", "Streamlit", "Sastrawi", "NLTK", "scikit-learn", "TF-IDF"],
      description: "Designed and deployed an interactive search engine showcasing advanced document retrieval techniques using both Vector Space Model (VSM) and Latent Semantic Indexing (LSI) for Indonesian text processing.",
      highlights: [
        "Engineered robust text-preprocessing pipeline with Indonesian stopword removal",
        "Implemented Vector Space Model with TF and TF-IDF weighting schemes",
        "Extended retrieval capabilities through LSI using Truncated SVD",
        "Achieved notable improvements in top-of-list relevance using Accuracy@K metrics",
        "Developed dynamic visualizations of topic distributions and document similarity"
      ],
      impact: {
        topics: "10",
        accuracy: "92%",
        languages: "ID"
      },
      gradient: "from-emerald-600 via-teal-600 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Custom_Search_Engine_With_VSM%26LSI",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Custom_Search_Engine_With_VSM%26LSI/"
    },
    {
      id: 11,
      title: "Greenhouse Gas Emissions Prediction",
      subtitle: "Environmental Data Analytics & Forecasting",
      period: "Jan 2024 - Mar 2024",
      organization: "Environmental Research Project",
      category: "Data Science",
      featured: false,
      image: foto11,
      technologies: ["Python", "R", "Excel", "Time Series Analysis", "Regression"],
      description: "Built a predictive model for forecasting greenhouse gas emissions over the next decade, delivering insights that support policy development for emissions reduction and environmental planning.",
      highlights: [
        "Collected and cleaned extensive environmental datasets for accurate analysis",
        "Employed trend analysis and time-series techniques for decade-long predictions",
        "Achieved high reliability and alignment with environmental data trends",
        "Collaborated with environmental experts to refine model parameters",
        "Provided actionable insights through comprehensive data visualizations"
      ],
      impact: {
        forecast: "10 years",
        accuracy: "High",
        datasets: "Multiple"
      },
      gradient: "from-green-600 via-emerald-600 to-teal-500",
      bgPattern: "bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Greenhouse_Gas_Emissions_Prediction%26Analysis",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Greenhouse_Gas_Emissions_Prediction%26Analysis/"
    },
    {
      id: 12,
      title: "Excel Data Analysis Dashboard",
      subtitle: "Advanced Business Intelligence Platform",
      period: "Jan 2022 - Jul 2022",
      organization: "Business Analytics Project",
      category: "Data Analysis",
      featured: false,
      image: foto12,
      technologies: ["Microsoft Excel", "Pivot Tables", "VLOOKUP", "Conditional Formatting"],
      description: "Conceptualized and developed an advanced data analysis dashboard in Microsoft Excel, transforming complex datasets into visually compelling, actionable insights to drive data-informed decision-making.",
      highlights: [
        "Crafted dynamic and interactive visualizations with sophisticated charts",
        "Engineered robust pivot tables for multi-dimensional data exploration",
        "Designed impactful KPI summaries with visually striking metrics",
        "Integrated user-friendly slicers and interactive filters for real-time customization",
        "Harnessed advanced Excel capabilities including VLOOKUP and SUMIFS"
      ],
      impact: {
        kpis: "Multiple",
        efficiency: "+60%",
        users: "50+"
      },
      gradient: "from-orange-600 via-amber-600 to-yellow-500",
      bgPattern: "bg-gradient-to-br from-orange-900/20 via-amber-900/20 to-yellow-900/20",
      githubUrl: "https://github.com/bers31/bernardo.github.io/tree/main/Data_Analysis_Excel",
      liveUrl: "https://bers31.github.io/bernardo.github.io/Data_Analysis_Excel/"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', count: projects.length, icon: Globe },
    { key: 'AI/ML', label: 'AI & Machine Learning', count: projects.filter(p => p.category === 'AI/ML').length, icon: Brain },
    { key: 'Data Science', label: 'Data Science', count: projects.filter(p => p.category === 'Data Science').length, icon: Database },
    { key: 'Data Analysis', label: 'Data Analysis', count: projects.filter(p => p.category === 'Data Analysis').length, icon: Target },
    { key: 'Full Stack', label: 'Full Stack', count: projects.filter(p => p.category === 'Full Stack').length, icon: Code },
    { key: 'Web Development', label: 'Web Development', count: projects.filter(p => p.category === 'Web Development').length, icon: Globe },
    { key: 'Game Development', label: 'Game Development', count: projects.filter(p => p.category === 'Game Development').length, icon: Zap }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  const TechBadge = ({ tech }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-blue-300 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
      {tech}
    </span>
  );

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto object-contain max-h-full"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600/80 hover:bg-blue-500/80 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                {project.category}
              </span>
              {project.featured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400 text-lg mb-4">{project.subtitle}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.organization}
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <Award className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Impact Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(project.impact).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                      {value}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project, featured = false }) => (
    <div
      data-animate
      id={`project-${project.id}`}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 ${
        featured ? 'lg:col-span-2' : ''
      } ${isVisible[`project-${project.id}`] ? 'animate-in slide-in-from-bottom-8' : ''}`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${project.bgPattern}`}></div>
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setSelectedProject(project)}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-white" />
          </button>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4 text-white" />
          </a>
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {project.featured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                {project.category}
              </span>
            </div>
            
            <h3 className={`font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${project.gradient} group-hover:bg-clip-text transition-all duration-300 ${
              featured ? 'text-xl' : 'text-lg'
            }`}>
              {project.title}
            </h3>
            
            <p className="text-gray-400 text-sm font-medium mb-3">
              {project.subtitle}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.period}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.organization}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          {project.description.length > 150 ? `${project.description.substring(0, 150)}...` : project.description}
        </p>

        {/* Key Highlights */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Achievements</h4>
          <ul className="space-y-1">
            {project.highlights.slice(0, featured ? 3 : 2).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                <ChevronRight className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                {highlight.length > 80 ? `${highlight.substring(0, 80)}...` : highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Impact Metrics */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(project.impact).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`text-sm font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {value}
                </div>
                <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.technologies.length > (featured ? 6 : 4) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700/80 text-gray-400">
                +{project.technologies.length - (featured ? 6 : 4)} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button 
          onClick={() => setSelectedProject(project)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
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
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-full text-sm text-gray-300 mb-6">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Portfolio Showcase
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Innovative solutions that blend cutting-edge technology with real-world impact
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span>8 Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>AI & ML Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-green-400" />
                <span>Full Stack Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search - MODIFIED SECTION */}
      <section className="py-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Search Bar - Now on top */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
                />
              </div>
            </div>

            {/* Category Filters - Now in 2 rows */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">Filter by Category</span>
              </div>
              
              {/* First row - 4 categories */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.slice(0, 4).map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        selectedCategory === category.key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25'
                          : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-600/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.label}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.key 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Second row - remaining categories */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.slice(4).map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        selectedCategory === category.key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25'
                          : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-600/50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {category.label}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.key 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-gray-400">Showcasing the most impactful and innovative work</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="py-20 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">All Projects</h2>
            <p className="text-gray-400">Comprehensive portfolio of technical achievements</p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-sm text-gray-400">Ready to collaborate?</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-gray-300 text-lg mb-8">
            Ready to collaborate on your next innovative project? Let's discuss how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com"}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
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
              className="flex items-center gap-2 px-8 py-3 border-2 border-blue-500 rounded-lg font-semibold text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <Award className="w-4 h-4" />
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

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

export default ProjectsPage;