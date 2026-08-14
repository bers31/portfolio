import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Menu, X,
  ExternalLink, CheckCircle2, XCircle, MessageSquare, ClipboardList, LineChart,
  Landmark, ShieldCheck, Lock, Layers, TrendingUp, Users, Clock, Filter,
  Brain, BarChart3, Target, Code2, Globe, Gamepad2, Sparkles, AlertTriangle,
  Tablet, Smartphone, MonitorSmartphone, GraduationCap,
  Search, Eye, Award, Calendar, Code
} from 'lucide-react';

// PT Wiraky Nusa Telekomunikasi case studies
import wirakyAsqe from './images/wiraky-asqe.png';
import wirakyFormulir from './images/wiraky-formulir-anomali.png';
import wirakyChatbot from './images/wiraky-chatbot.png';
import wirakyProperti from './images/wiraky-properti.png';

// Academic and other projects
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
import foto13 from './images/foto13.png';

/* ================= Data ================= */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const quickLinks = [
  { id: 'asqe', label: 'ASQE' },
  { id: 'formulir-anomali', label: 'Review & Anomaly Detection' },
  { id: 'chatbot', label: 'Maribaya Chatbot' },
  { id: 'properti', label: 'Property Analytics' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'other', label: 'Other Projects' },
];

const quadExamples = [
  { aspect: 'tempat', aspectScore: '0.9', category: 'tempat', categoryScore: '1.0', opinion: 'bagus', opinionScore: '0.9', sentimentScore: '1.0', positive: true },
  { aspect: 'parkir', aspectScore: '0.9', category: 'fasilitas', categoryScore: '0.9', opinion: 'sempit', opinionScore: '0.9', sentimentScore: '0.9', positive: false },
];

const misalignmentReasons = [
  { title: 'Aggregated Sub-Experiences', desc: 'A rating of 3 given even though the review describes a great pool but tight parking.' },
  { title: 'Different Individual Scales', desc: 'A rating of 3 can mean "decent" to one guest and "disappointing" to another.' },
  { title: 'Aspect Mentioned, Not Rated, or the Reverse', desc: 'Some aspects are rated but never mentioned in the text, or mentioned but never rated.' },
  { title: 'Based on General Impression', desc: 'Ratings often reflect an overall impression rather than a logical breakdown per aspect.' },
];

const asqeSubtasks = [
  { n: '01', title: 'Aspect Term Extraction', desc: 'The word or phrase being evaluated, for example "the place" or "parking."' },
  { n: '02', title: 'Opinion Term Extraction', desc: 'The word or phrase expressing an opinion on that aspect, for example "great" or "tight."' },
  { n: '03', title: 'Aspect Category Detection', desc: 'Grouping the aspect term into a broader category. "Parking" maps to "facilities."' },
  { n: '04', title: 'Sentiment Classification', desc: 'Polarity of each opinion term: positive or negative.' },
];

const asqeHardCases = [
  'Sarcasm', 'Double / multi negation', 'Dense, multi-aspect reviews', 'Informal language & slang',
  'Abbreviations & typos', 'Code-mixing', 'Ambiguity', 'Implicit aspect-sentiment',
  'Emoji as sentiment marker', 'Conditional sentences', 'Comparatives', 'Temporal references',
  'Repeated intensifiers ("so so bad")', 'Internet culture shorthand', 'Mixed sentiment, one aspect',
];

const asqeRoadmap = [
  { title: 'Timeline-Based Aspect Mapping', desc: 'Tracking which aspects are discussed most in a given period, as a signal of what matters most to guests.' },
  { title: 'Emerging Issue Detection', desc: 'Tracking topic activity over time to catch a rising complaint on a specific aspect before it fades.' },
  { title: 'Aspect Category Clustering', desc: 'Manual and BERTopic zero-shot. Text is matched to a predefined topic list via similarity threshold, and unmatched text feeds a clustering pipeline for new topics.' },
  { title: 'Cluster Weighting Against Business Outcomes', desc: 'Correlating clusters with rating, repeat booking, and cancellation rate. A rare complaint tied to churn can matter more than a frequent, minor one.' },
  { title: 'Fast Dominant-Aspect Analysis', desc: 'Surfacing which aspects skew positive or negative, as a quick input for evaluation.' },
];

const anomalySignals = [
  { icon: Users, title: 'Repeated Identity', strength: 'Strong when combined', desc: 'Same name, age, and city appearing within a 15-minute window signals cached browser data reused for spam.' },
  { icon: MessageSquare, title: 'Review Text Similarity', strength: 'Weak alone', desc: 'Generic reviews like "good" or "highly recommended" naturally repeat. Only meaningful when paired with another signal.' },
  { icon: LineChart, title: 'Rating Pattern Similarity', strength: 'Weak alone', desc: 'Guests often give similar ratings by coincidence. Only significant when paired with repeated identity.' },
  { icon: Clock, title: 'Off-Hours Submission', strength: 'Strong, absolute', desc: 'Specific to Maribaya: submissions outside operating hours (08:00 to 17:00) are an absolute signal, since reviews should only come in during that window.' },
];

const anomalyTiers = [
  { level: 'Strong', tone: 'negative', desc: 'Off-hours submission (absolute), or repeated identity combined with text or rating similarity on the same review pair.' },
  { level: 'Medium', tone: 'accent', desc: 'Repeated identity alone, or a combination of rating and text similarity across different identities. Still under discussion for its exact tier.' },
  { level: 'Low', tone: 'neutral', desc: 'Rating similarity alone, or text similarity alone.' },
];

const deviceOptions = [
  { tier: 'Android Tablet + Kiosk Mode', icon: Tablet, price: 'Low', char: 'Simple display, easy to configure, but not built for 24-hour use.', note: 'Cheapest option, easiest to maintain.' },
  { tier: 'Android POS Terminal', icon: Smartphone, price: 'Medium', char: 'Better display, built for 24-hour use, slightly more maintenance than a tablet.', note: 'Most recommended for stability.', recommended: true },
  { tier: 'Industrial Touchscreen Kiosk', icon: MonitorSmartphone, price: 'High', char: 'Professional, eye-catching display, built for 24-hour use, harder to maintain.', note: 'Sturdy and long-lasting.' },
  { tier: 'Floor Standing Kiosk', icon: MonitorSmartphone, price: 'High', char: 'Most professional and eye-catching display, built for 24-hour use, harder to maintain.', note: 'Strongest branding, suited to high-traffic spots.' },
];

const macroIndicators = [
  { code: 'IHPR', desc: 'Residential Property Price Index. National home price data from Bank Indonesia, calculated quarterly.' },
  { code: 'Inflation', desc: 'General rise in goods and services prices, used to calculate real investment return.' },
  { code: 'Regional Min. Wage', desc: 'A rough proxy for local purchasing power, and an input for the Price-to-Income Ratio.' },
  { code: 'Population Census', desc: 'Population size and structure, used to estimate future buyers or renters.' },
  { code: 'BI Rate', desc: "Bank Indonesia's benchmark interest rate, used to estimate mortgage cost." },
  { code: 'GDP Growth', desc: 'A measure of economic health that shapes appetite for home buying.' },
  { code: 'PIR', desc: 'Price-to-Income Ratio, comparing home prices to typical income in an area.' },
];

const propertyInsights = [
  { title: 'Census × Housing Supply', desc: 'Fast population growth paired with limited housing supply signals demand outpacing supply, a potential driver of future price growth.' },
  { title: 'BI Rate × Property Type', desc: 'When interest rates rise, ready-to-rent homes are relatively safer than vacant land relying purely on capital gain, since rental cash flow helps offset mortgage interest.' },
  { title: 'GDP × Price Trend', desc: "A city with above-average economic growth but home prices that have not moved proportionally can be a strong candidate for an area the market has not priced in yet." },
];

const investmentSteps = [
  'Check macro conditions: IHPR, BI Rate, inflation, GDP, census, minimum wage, PIR',
  'Compare across provinces or cities',
  'Drill down into a specific area',
  'Check PIR, or the price-to-income ratio, to assess fair pricing',
  'Benchmark listings against the area average and trend',
  'Final decision: buy, negotiate, wait, or pass',
];

const gridProjects = [
  {
    title: 'Twitter Information Diffusion & Sentiment Analysis', category: 'data-science', image: foto2,
    period: 'Apr – Jun 2025', org: 'Universitas Diponegoro',
    desc: 'A Twitter analysis pipeline for understanding information diffusion and sentiment, from API scraping to network modeling.',
    highlights: ['Analyzed 500K+ tweets for sentiment and diffusion modeling', 'Reached 92% sentiment classification accuracy with ensemble methods', 'Identified the top 1% most influential users and 3 major community clusters'],
    tech: ['Python', 'Tweepy', 'NetworkX', 'Scikit-learn'],
    impact: [{ label: 'Tweets Analyzed', value: '500K+' }, { label: 'Accuracy', value: '92%' }, { label: 'Community Clusters', value: '3' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Twitter_Information_Diffusion%26Sentiment_Analysis',
    live: 'https://bers31.github.io/bernardo.github.io/Twitter_Information_Diffusion%26Sentiment_Analysis/',
  },
  {
    title: 'Advanced Information Retrieval System', category: 'ai-ml', image: foto3,
    period: 'Aug – Dec 2024', org: 'Universitas Diponegoro',
    desc: 'A multilingual (Indonesian-English) semantic search system with fine-tuned mBERT and FAISS indexing.',
    highlights: ['Fine-tuned mBERT for cross-lingual semantic understanding', 'FAISS embeddings outperforming a BM25 baseline', 'Demonstrated through an interactive Streamlit demo'],
    tech: ['Python', 'mBERT', 'PyTorch', 'FAISS', 'Streamlit'],
    impact: [{ label: 'Languages', value: '2' }, { label: 'Index', value: 'FAISS' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Advance_Information_Retrieval_System',
    live: 'https://bers31.github.io/bernardo.github.io/Advance_Information_Retrieval_System/',
  },
  {
    title: 'AI Chatbot, Automated Information System', category: 'ai-ml', image: foto1,
    period: 'May – Jul 2025', org: 'Class II Ambarawa Correctional Facility',
    desc: 'An automated information chatbot for a correctional facility, built end to end.',
    highlights: ['Owned the process from stakeholder interviews to requirements definition', 'Optimized training datasets for response relevance', 'QA testing and post-release performance monitoring'],
    tech: ['Python', 'NLP', 'Requirements Gathering'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Automated_Information_System_Chatbot',
    live: 'https://bers31.github.io/bernardo.github.io/Automated_Information_System_Chatbot/',
    note: 'Full role detail on the Experience page.',
  },
  {
    title: 'Financial Reporting Application', category: 'full-stack', image: foto4,
    period: 'Dec 2024 – Feb 2025', org: 'East Semarang District',
    desc: 'A full-stack financial reporting application supporting district operations and data accuracy.',
    highlights: ['Built with ReactJS, JavaScript, and SQL from the ground up', 'Owned requirements gathering through interface development', 'Trained staff for system adoption'],
    tech: ['ReactJS', 'JavaScript', 'SQL'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Financial_Reporting_Application',
    live: 'https://bers31.github.io/bernardo.github.io/Financial_Reporting_Application/',
    note: 'Full role detail on the Experience page.',
  },
  {
    title: 'Student Performance Clustering', category: 'data-science', image: foto5,
    period: 'Aug – Dec 2024', org: 'Universitas Diponegoro',
    desc: 'An unsupervised learning system grouping student performance to support more targeted educational intervention.',
    highlights: ['K-Means clustering for performance segmentation', 'Cluster quality validated with silhouette score', 'Interactive Streamlit interface for educators'],
    tech: ['Python', 'K-Means', 'Scikit-learn', 'Streamlit'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Students_Performance_Clustering_Unsupervised_Learning_Project',
    live: 'https://bers31.github.io/bernardo.github.io/Students_Performance_Clustering_Unsupervised_Learning_Project/',
  },
  {
    title: 'Advanced Customer Segmentation', category: 'data-science', image: foto9,
    period: 'Aug – Dec 2024', org: 'Universitas Diponegoro',
    desc: 'A supervised learning system for customer segmentation, supporting more targeted marketing strategy.',
    highlights: ['Compared four models: Random Forest, SVM, XGBoost, k-NN', 'Systematic evaluation and hyperparameter tuning', 'Results explored through a Streamlit interface'],
    tech: ['Python', 'Random Forest', 'SVM', 'XGBoost'],
    impact: [{ label: 'Models Compared', value: '4' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Customer_Segmentation_Supervised_Learning_Project',
    live: 'https://bers31.github.io/bernardo.github.io/Customer_Segmentation_Supervised_Learning_Project/',
  },
  {
    title: 'Greenhouse Gas Emissions Prediction', category: 'data-analysis', image: foto11,
    period: 'Feb – Dec 2024', org: 'Environmental Research Project',
    desc: 'A predictive model projecting greenhouse gas emissions trends a decade out, to support policy consideration.',
    highlights: ['Time-series analysis for long-range projection', 'Model parameters validated with domain stakeholders', 'Data visualization for non-technical interpretation'],
    tech: ['Python', 'R', 'Excel', 'Time Series'],
    impact: [{ label: 'Forecast Horizon', value: '10 yrs' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Greenhouse_Gas_Emissions_Prediction%26Analysis',
    live: 'https://bers31.github.io/bernardo.github.io/Greenhouse_Gas_Emissions_Prediction%26Analysis/',
  },
  {
    title: 'Student Academic Information System', category: 'full-stack', image: foto8,
    period: 'Feb – Dec 2024', org: 'Universitas Diponegoro',
    desc: 'An integrated academic management platform for course registration and academic data.',
    highlights: ['Serving 1,000+ students and 100+ academic advisors', 'Sped up course registration by 30% through automation', 'Authentication and user data protection'],
    tech: ['Laravel', 'MySQL', 'PHP', 'Bootstrap'],
    impact: [{ label: 'Students Served', value: '1,000+' }, { label: 'Advisors', value: '100+' }, { label: 'Faster Registration', value: '30%' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Student_Academic_Information_System',
    live: 'https://bers31.github.io/bernardo.github.io/Student_Academic_Information_System/',
  },
  {
    title: 'Custom Search Engine with VSM & LSI', category: 'ai-ml', image: foto10,
    period: 'Feb – Aug 2024', org: 'Universitas Diponegoro',
    desc: 'An Indonesian-language document search engine comparing Vector Space Model and Latent Semantic Indexing.',
    highlights: ['Indonesian text preprocessing with stopword removal (Sastrawi)', 'Retrieval extended with LSI via Truncated SVD', 'Relevance evaluated with an Accuracy@K metric'],
    tech: ['Python', 'Sastrawi', 'NLTK', 'Scikit-learn'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Custom_Search_Engine_With_VSM%26LSI',
    live: 'https://bers31.github.io/bernardo.github.io/Custom_Search_Engine_With_VSM%26LSI/',
  },
  {
    title: '3D Minecraft-Themed Game Development', category: 'game', image: foto7,
    period: 'Jan – Jun 2024', org: 'Universitas Diponegoro',
    desc: 'An interactive 3D game with an explorable world, built from scratch with OpenGL.',
    highlights: ['Interactive 3D world rendering with matrix manipulation', 'Control system designed for smooth gameplay'],
    tech: ['C++', 'OpenGL', '3D Graphics'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/3D_Minecraft_Development',
    live: 'https://bers31.github.io/bernardo.github.io/3D_Minecraft_Development/',
  },
  {
    title: 'YC Electric E-Commerce Platform', category: 'web', image: foto6,
    period: 'Jan 2022 – Jan 2024', org: 'YC Electric',
    desc: "The company's first custom e-commerce platform, from planning through launch.",
    highlights: ['SEO optimization to grow organic traffic', 'Managed 100+ products with active daily transactions', 'Secure authentication and payment handling'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'MySQL', 'PHP'],
    impact: [{ label: 'Products Managed', value: '100+' }],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Custom_E_Commerce_Website',
    live: 'https://bers31.github.io/bernardo.github.io/Custom_E_Commerce_Website/',
  },
  {
    title: 'Excel Data Analysis Dashboard', category: 'data-analysis', image: foto12,
    period: 'Jan – Jul 2022', org: 'Business Analysis Project',
    desc: 'A business intelligence dashboard in Microsoft Excel, turning raw data into actionable insight.',
    highlights: ['Multi-dimensional pivot tables for data exploration', 'Interactive slicers and filters for real-time customization', 'Clear KPI summaries with supporting visualization'],
    tech: ['Microsoft Excel', 'Pivot Tables', 'VLOOKUP'],
    impact: null,
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Data_Analysis_Excel',
    live: 'https://bers31.github.io/bernardo.github.io/Data_Analysis_Excel/',
  },
];

const categories = [
  { key: 'all', label: 'All', icon: Layers, count: gridProjects.length },
  { key: 'ai-ml', label: 'AI & Machine Learning', icon: Brain, count: gridProjects.filter(p => p.category === 'ai-ml').length },
  { key: 'data-science', label: 'Data Science', icon: BarChart3, count: gridProjects.filter(p => p.category === 'data-science').length },
  { key: 'data-analysis', label: 'Data Analysis', icon: Target, count: gridProjects.filter(p => p.category === 'data-analysis').length },
  { key: 'full-stack', label: 'Full-Stack', icon: Code2, count: gridProjects.filter(p => p.category === 'full-stack').length },
  { key: 'web', label: 'Web Development', icon: Globe, count: gridProjects.filter(p => p.category === 'web').length },
  { key: 'game', label: 'Game Development', icon: Gamepad2, count: gridProjects.filter(p => p.category === 'game').length },
];

/* ================= Shared bits ================= */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
};

const ConfidenceBar = ({ score, color }) => (
  <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${parseFloat(score) * 100}%`, background: color }} />
  </div>
);

const Blob = ({ className, from, to }) => (
  <div aria-hidden="true" className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={{ background: `radial-gradient(circle at 30% 30%, ${from}, ${to} 70%)` }} />
);

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-mono-data { font-family: 'IBM Plex Mono', monospace; }
    .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .site-background {
      background-color: #F5F1E8;
      background-image:
        radial-gradient(circle at 15% 10%, rgba(217,173,92,0.14), transparent 28%),
        radial-gradient(circle at 85% 25%, rgba(188,91,57,0.10), transparent 25%),
        radial-gradient(circle at 50% 90%, rgba(47,107,79,0.08), transparent 30%),
        linear-gradient(rgba(28,35,51,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(28,35,51,0.025) 1px, transparent 1px);
      background-size: auto, auto, auto, 42px 42px, 42px 42px;
      background-attachment: fixed;
    }
    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .gradient-text {
      background: linear-gradient(100deg, #D9AD5C, #E0916D 45%, #D9AD5C);
      background-size: 200% auto;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: gradientShift 6s ease-in-out infinite;
    }
    .scroll-mt-nav { scroll-margin-top: 7rem; }
  `}</style>
);

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b bg-[#E7E8E3] border-[#C8C9C1] shadow-[0_4px_16px_rgba(28,35,51,0.09)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-display text-lg font-semibold text-[#1C2333] flex items-center gap-1.5">
            Bernardo Nandaniar <span className="gradient-text">Sunia</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="relative px-4 py-2 text-sm font-medium group">
                  <span className={active ? 'text-[#1C2333]' : 'text-stone-500 group-hover:text-[#1C2333] transition-colors duration-200'}>{item.name}</span>
                  <span className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#AD7F2E] to-[#BC5B39] transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-stone-600" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.name} to={item.path} onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium ${location.pathname === item.path ? 'bg-white text-[#1C2333] shadow-sm' : 'text-stone-500'}`}>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="relative border-t border-[#C8C9C1] bg-[#E7E8E3] overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#AD7F2E]/40 to-transparent" />
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-body text-sm text-stone-400">© 2026 Bernardo Nandaniar Sunia · Data Analyst</p>
      <div className="flex items-center space-x-2">
        {[
          { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com', icon: Mail, label: 'Email' },
          { href: 'https://linkedin.com/in/bernardo-sunia/', icon: Linkedin, label: 'LinkedIn' },
          { href: 'https://github.com/bers31', icon: Github, label: 'GitHub' },
          { href: 'https://wa.me/6289520501678', icon: Phone, label: 'WhatsApp' },
        ].map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
            className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-white hover:bg-gradient-to-br hover:from-[#AD7F2E] hover:to-[#BC5B39] transition-all duration-300">
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

const SectionEyebrow = ({ children }) => (
  <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
    <span className="w-6 h-px bg-[#AD7F2E]" /> {children}
  </div>
);


const WirakyProjectHeader = ({
  eyebrow = 'PT Wiraky Nusa Telekomunikasi',
  title,
  description,
  icon: Icon,
  iconBackground,
  status,
  period,
  featured = false,
}) => (
  <div className={`px-6 sm:px-10 py-8 border-b ${featured ? 'border-white/10' : 'border-stone-200'}`}>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: iconBackground || 'linear-gradient(135deg, #1C2333, #2A3450)' }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-mono-data text-[11px] uppercase tracking-wider ${
                featured ? 'text-[#D9AD5C]' : 'text-[#AD7F2E]'
              }`}
            >
              {eyebrow}
            </span>
          </div>
          <h2
            className={`font-display text-2xl sm:text-3xl font-semibold mt-1 leading-snug ${
              featured ? 'text-white' : 'text-[#1C2333]'
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm leading-relaxed mt-2 max-w-3xl ${
              featured ? 'text-stone-300' : 'text-stone-500'
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {(status || period) && (
        <div className="flex items-center gap-2 shrink-0">
          {status && (
            <span
              className={`font-mono-data text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full ${
                featured
                  ? 'bg-white/10 text-stone-200 border border-white/10'
                  : 'bg-[#AD7F2E]/10 text-[#AD7F2E] border border-[#AD7F2E]/15'
              }`}
            >
              {status}
            </span>
          )}
          {period && (
            <span
              className={`font-mono-data text-xs ${
                featured ? 'text-stone-300' : 'text-stone-400'
              }`}
            >
              {period}
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(28, 35, 51, 0.72)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-stone-100">
          <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#1C2333]/70 text-white hover:bg-[#1C2333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono-data text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#AD7F2E]/10 text-[#AD7F2E]">
              {categories.find((c) => c.key === project.category)?.label || project.category}
            </span>
          </div>
          <h2 className="font-display text-2xl font-semibold mb-1">{project.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 mb-5">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {project.period}</span>
            <span>{project.org}</span>
          </div>
          <p className="text-stone-600 leading-relaxed mb-6">{project.desc}</p>

          <h3 className="font-display font-semibold text-sm mb-3">Key Highlights</h3>
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <Award className="w-4 h-4 text-[#AD7F2E] shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>

          {project.impact && (
            <>
              <h3 className="font-display font-semibold text-sm mb-3">Verified Metrics</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {project.impact.map((m, i) => (
                  <div key={i} className="text-center p-3 rounded-lg bg-[#F5F1E8]">
                    <div className="font-display text-lg font-bold text-[#AD7F2E]">{m.value}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {project.note && <p className="text-xs text-stone-400 italic mb-6">{project.note}</p>}

          <h3 className="font-display font-semibold text-sm mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tech.map((t, i) => (
              <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-5 border-t border-stone-200">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
              <Github className="w-4 h-4" /> Code
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md font-medium text-sm text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
              Live Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= Page ================= */
const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredGrid = gridProjects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = q === '' || p.title.toLowerCase().includes(q) || p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const tierTone = (tone) => {
    if (tone === 'negative') return { text: 'text-[#A8453B]', bg: 'bg-[#A8453B]/10', border: 'border-[#A8453B]/30' };
    if (tone === 'accent') return { text: 'text-[#AD7F2E]', bg: 'bg-[#AD7F2E]/10', border: 'border-[#AD7F2E]/30' };
    return { text: 'text-stone-500', bg: 'bg-stone-100', border: 'border-stone-300' };
  };

  return (
    <div className="min-h-screen site-background font-body text-[#1C2333] overflow-x-hidden">
      <GlobalStyles />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-14 overflow-hidden">
        <Blob className="w-[380px] h-[380px] -top-32 -right-16" from="#D9AD5C30" to="#D9AD5C00" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <SectionEyebrow>Projects</SectionEyebrow>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.15] max-w-3xl mb-6">
              Case studies from real work, not a list of technologies.
            </h1>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl mb-6">
              Starting with four systems built as Data Analyst at PT Wiraky Nusa Telekomunikasi, with Aspect-Sentiment Quad Extraction as the current focus, followed by thesis research and other academic projects.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-stone-500">
              <span className="flex items-center gap-2"><Code className="w-4 h-4 text-[#AD7F2E]" /> 17 Projects</span>
              <span className="flex items-center gap-2"><Brain className="w-4 h-4 text-[#2F6B4F]" /> NLP &amp; ML Focus</span>
              <span className="flex items-center gap-2"><Landmark className="w-4 h-4 text-[#BC5B39]" /> 4 Systems in Production</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick nav */}
      <div  className="relative py-16 lg:py-20 overflow-hidden bg-[#FBF0EA] border-y border-[#E7D2C7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 text-sm">
            {quickLinks.map((q) => (
              <a key={q.id} href={`#${q.id}`} className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7D2C7] text-stone-600 hover:text-[#1C2333] hover:border-[#AD7F2E] hover:shadow-sm whitespace-nowrap transition-all duration-200 shrink-0">
                {q.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ============ ASQE, flagship ============ */}
      <section id="asqe" className="py-16 lg:py-20 scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl p-[1.5px] shadow-xl" style={{ background: 'linear-gradient(120deg, #AD7F2E, #BC5B39, #2F6B4F)' }}>
              <div className="bg-white rounded-[calc(1rem-1.5px)] overflow-hidden">
                <div className="rounded-[calc(1rem-1.5px)] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                  <WirakyProjectHeader
                    eyebrow="PT Wiraky Nusa Telekomunikasi · Featured Work"
                    title="Aspect-Sentiment Quad Extraction (ASQE)"
                    description="A production-focused NLP system for turning Maribaya guest reviews into structured aspect, opinion, category, and sentiment signals."
                    icon={Brain}
                    status="Current Focus"
                    period="2026 · Ongoing"
                    featured
                  />

                </div>

                <div className="aspect-[16/8] w-full bg-stone-100 overflow-hidden">
                  <img src={wirakyAsqe} alt="Aspect-Sentiment Quad Extraction system interface" className="w-full h-full object-cover" loading="lazy" />
                </div>

                <div className="px-6 sm:px-10 py-10 space-y-12">
                  {/* Problem framing */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">Why a Rating Alone Falls Short</h3>
                    <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">
                      Reviews that contradict their own rating, sarcasm, are rare. The more common problem is misalignment at the aspect level: a single rating fails to represent an experience that mixes good and bad.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {misalignmentReasons.map((r, i) => (
                        <div key={i} className="flex gap-3 p-4 rounded-lg bg-[#F5F1E8] border border-stone-200">
                          <span className="font-mono-data text-xs text-[#AD7F2E] shrink-0 mt-0.5">0{i + 1}</span>
                          <div>
                            <p className="font-medium text-sm mb-0.5">{r.title}</p>
                            <p className="text-xs text-stone-500 leading-relaxed">{r.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approach */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">Four Subtasks at Once</h3>
                    <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">
                      A rating or label only answers "how satisfied" (magnitude). ASQE answers the more useful question: "about what, specifically, and why" (content), by running four ABSA subtasks directly on a single review, each with its own confidence score.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {asqeSubtasks.map((s, i) => (
                        <div key={i} className="p-4 rounded-lg border border-stone-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                          <span className="font-mono-data text-2xl font-semibold text-stone-200">{s.n}</span>
                          <p className="font-display font-semibold text-sm mt-2 mb-1 leading-snug">{s.title}</p>
                          <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live example */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">A Real Example</h3>
                    <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">One review sentence, decomposed into structured data:</p>
                    <div className="bg-[#F5F1E8] border border-stone-200 rounded-xl p-6 sm:p-8">
                      <p className="font-display text-lg lg:text-xl leading-relaxed">
                        &quot;<span className="border-b-2 border-[#1C2333]/30">Tempatnya</span> <span className="border-b-2 border-[#2F6B4F]">bagus</span>, tapi <span className="border-b-2 border-[#1C2333]/30">parkirannya</span> <span className="border-b-2 border-[#A8453B]">sempit</span>.&quot;
                      </p>
                      <p className="text-xs text-stone-400 mt-2 italic">Original guest review in Indonesian. Approximate translation: &quot;The place is great, but the parking is tight.&quot;</p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-7">
                        {quadExamples.map((q, i) => (
                          <div key={i} className="bg-white border border-stone-200 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ borderTop: `3px solid ${q.positive ? '#2F6B4F' : '#A8453B'}` }}>
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-mono-data text-[11px] tracking-wider text-stone-400">QUAD-0{i + 1}</span>
                              {q.positive ? (
                                <span className="flex items-center gap-1 text-[#2F6B4F] text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Positive ({q.sentimentScore})</span>
                              ) : (
                                <span className="flex items-center gap-1 text-[#A8453B] text-xs font-semibold"><XCircle className="w-3.5 h-3.5" /> Negative ({q.sentimentScore})</span>
                              )}
                            </div>
                            <dl className="space-y-3 text-sm">
                              <div>
                                <div className="flex justify-between gap-3 mb-1"><dt className="font-mono-data text-[11px] text-stone-400">ASPECT</dt><dd className="font-medium">{q.aspect} <span className="font-mono-data text-stone-400">({q.aspectScore})</span></dd></div>
                                <ConfidenceBar score={q.aspectScore} color={q.positive ? '#2F6B4F' : '#A8453B'} />
                              </div>
                              <div>
                                <div className="flex justify-between gap-3 mb-1"><dt className="font-mono-data text-[11px] text-stone-400">CATEGORY</dt><dd className="font-medium">{q.category} <span className="font-mono-data text-stone-400">({q.categoryScore})</span></dd></div>
                                <ConfidenceBar score={q.categoryScore} color={q.positive ? '#2F6B4F' : '#A8453B'} />
                              </div>
                              <div>
                                <div className="flex justify-between gap-3 mb-1"><dt className="font-mono-data text-[11px] text-stone-400">OPINION</dt><dd className="font-medium italic">&quot;{q.opinion}&quot; <span className="font-mono-data not-italic text-stone-400">({q.opinionScore})</span></dd></div>
                                <ConfidenceBar score={q.opinionScore} color={q.positive ? '#2F6B4F' : '#A8453B'} />
                              </div>
                            </dl>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-stone-400 mt-5">Scores in parentheses are the model's confidence for each extraction subtask.</p>
                    </div>
                  </div>

                  {/* Dataset engineering */}
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">Dataset Engineering</h3>
                    <div className="space-y-3 text-stone-600 leading-relaxed max-w-3xl mb-6">
                      <p>
                        The public Airyroom hotel review dataset, originally built for aspect-sentiment pair extraction, was relabeled for aspect-sentiment quad extraction. Alongside it, 1,000 original Maribaya reviews were built from scratch for fine-tuning, so the model recognizes aspect terms specific to Maribaya that a general-domain dataset would miss.
                      </p>
                      <p>
                        The new dataset targets the hardest cases on purpose, so the model holds up beyond easy examples:
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {asqeHardCases.map((c, i) => (
                        <span key={i} className="font-mono-data text-[11px] text-stone-600 border border-stone-200 bg-white rounded-full px-3 py-1.5">{c}</span>
                      ))}
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-[#AD7F2E]/[0.06] border border-[#AD7F2E]/20">
                      <AlertTriangle className="w-4 h-4 text-[#AD7F2E] shrink-0 mt-0.5" />
                      <p className="text-sm text-stone-600 leading-relaxed">
                        <span className="font-medium text-[#1C2333]">Honest status:</span> the dataset is currently machine-labeled and still requires manual verification before being treated as ground truth. Part of a working principle: automation earns trust after validation, not before.
                      </p>
                    </div>
                  </div>

                  {/* Roadmap */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#AD7F2E]" />
                      <h3 className="font-display text-lg font-semibold">What's Next</h3>
                    </div>
                    <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">Development directions in progress once the extraction pipeline is stable:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {asqeRoadmap.map((r, i) => (
                        <div key={i} className="p-4 rounded-lg border border-dashed border-stone-300">
                          <p className="font-medium text-sm mb-1">{r.title}</p>
                          <p className="text-xs text-stone-500 leading-relaxed">{r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                    {['Python', 'ABSA / ASQE', 'PyTorch', 'Sentence-Transformers', 'BERTopic (exploratory)', 'Dataset Annotation'].map((t, i) => (
                      <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Review Form & Anomaly Detection ============ */}
      <section id="formulir-anomali" className="py-8 lg:py-10 scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <WirakyProjectHeader
                title="Guest Review Form &amp; Anomaly Detection"
                description="First-party review collection system for Maribaya Resort and Glamping, combining token-based access, review dashboards, and anomaly detection."
                icon={ClipboardList}
                iconBackground="linear-gradient(135deg, #BC5B39, #E0916D)"
              />

              <div className="aspect-[16/8] w-full bg-stone-100 overflow-hidden">
                <img src={wirakyFormulir} alt="Guest review form and anomaly detection dashboard" className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="px-6 sm:px-10 py-8 space-y-10">
                <p className="text-stone-600 leading-relaxed max-w-3xl">
                  A first-party service for collecting Maribaya guest reviews, split by Resort and Glamping category. The form is built to stay short and complete at once, enough to surface real insight without discouraging guests from filling it out.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2"><Lock className="w-4 h-4 text-[#AD7F2E]" /> Security &amp; Validation</h3>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">Auto-generated access token, 15-minute expiry, matching the typical time needed to complete a review</li>
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">Form link inaccessible without a valid token, blocking unauthorized submissions</li>
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">F&amp;B rating, email, and review text fields made optional, for guests who did not order food or prefer not to share contact details</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#AD7F2E]" /> Dashboard</h3>
                    <ul className="space-y-2 text-sm text-stone-600">
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">Filterable, visualized review data, both aggregate and by selected filter</li>
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">Full review data exportable as CSV</li>
                      <li className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">Two separate dashboards: Maribaya Resort and Glamping Tent</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <a href="https://visualisasi-review-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C2333] border border-stone-200 rounded-full px-3 py-1.5 hover:border-[#AD7F2E] transition-colors">
                        Resort Dashboard <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href="https://visualisasi-glamping-review-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C2333] border border-stone-200 rounded-full px-3 py-1.5 hover:border-[#AD7F2E] transition-colors">
                        Glamping Dashboard <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Anomaly detection */}
                <div>
                  <h3 className="font-display font-semibold text-base mb-4">Anomaly Detection</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {anomalySignals.map((s, i) => (
                      <div key={i} className="p-4 rounded-lg bg-[#F5F1E8] border border-stone-200">
                        <s.icon className="w-4 h-4 text-[#AD7F2E] mb-2.5" />
                        <p className="font-medium text-sm mb-1 leading-snug">{s.title}</p>
                        <p className="font-mono-data text-[10px] uppercase tracking-wider text-stone-400 mb-2">{s.strength}</p>
                        <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-stone-500 mb-3">Combined signals are grouped into three tiers:</p>
                  <div className="space-y-2.5">
                    {anomalyTiers.map((t, i) => {
                      const tone = tierTone(t.tone);
                      return (
                        <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3.5 rounded-lg border ${tone.border} ${tone.bg}`}>
                          <span className={`font-mono-data text-xs font-semibold uppercase tracking-wider shrink-0 w-20 ${tone.text}`}>{t.level}</span>
                          <p className="text-sm text-stone-600 leading-relaxed">{t.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Device recommendation table */}
                <div>
                  <h3 className="font-display font-semibold text-base mb-1">Device Recommendations for Review Collection</h3>
                  <p className="text-sm text-stone-500 mb-5 max-w-2xl">For a free option, reviews can be collected through a QR code, though this risks anomalous or spam reviews if the link spreads beyond guests. For a paid option, here is the comparison drawn up as a recommendation:</p>
                  <div className="overflow-x-auto -mx-1">
                    <table className="w-full text-sm border-collapse min-w-[640px]">
                      <thead>
                        <tr className="border-b border-stone-300">
                          <th className="text-left font-mono-data text-[10px] uppercase tracking-wider text-stone-400 font-medium py-3 px-3">Device</th>
                          <th className="text-left font-mono-data text-[10px] uppercase tracking-wider text-stone-400 font-medium py-3 px-3">Cost</th>
                          <th className="text-left font-mono-data text-[10px] uppercase tracking-wider text-stone-400 font-medium py-3 px-3">Characteristics</th>
                          <th className="text-left font-mono-data text-[10px] uppercase tracking-wider text-stone-400 font-medium py-3 px-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deviceOptions.map((d, i) => (
                          <tr key={i} className={`border-b border-stone-100 last:border-0 ${d.recommended ? 'bg-[#AD7F2E]/[0.05]' : ''}`}>
                            <td className="py-3.5 px-3 align-top">
                              <div className="flex items-center gap-2">
                                <d.icon className="w-4 h-4 text-stone-400 shrink-0" />
                                <span className="font-medium">{d.tier}</span>
                              </div>
                              {d.recommended && <span className="inline-block mt-1.5 font-mono-data text-[9px] uppercase tracking-wider bg-[#AD7F2E] text-white px-1.5 py-0.5 rounded">Recommended</span>}
                            </td>
                            <td className="py-3.5 px-3 align-top text-stone-500">{d.price}</td>
                            <td className="py-3.5 px-3 align-top text-stone-500 leading-relaxed">{d.char}</td>
                            <td className="py-3.5 px-3 align-top text-stone-500 leading-relaxed">{d.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                  {['SQL', 'Token-Based Security', 'Dashboard Design', 'Anomaly Detection', 'React JS'].map((t, i) => (
                    <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Maribaya Chatbot ============ */}
      <section id="chatbot" className="py-8 lg:py-10 scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <WirakyProjectHeader
                title="Maribaya Information Chatbot"
                description="NLP-based information chatbot that matches user input embeddings against known questions to return the most relevant answer."
                icon={MessageSquare}
                iconBackground="linear-gradient(135deg, #AD7F2E, #D9AD5C)"
              />
              <div className="aspect-[16/8] w-full bg-stone-100 overflow-hidden">
                <img src={wirakyChatbot} alt="Maribaya Chatbot interface" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="px-6 sm:px-10 py-8 space-y-6">
                <p className="text-stone-600 leading-relaxed max-w-3xl">
                  An information chatbot built on Natural Language Processing. Each user input is converted into an embedding representation, then matched against the closest known question to return the most relevant answer.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-[#F5F1E8] border border-stone-200 text-center">
                    <p className="font-display text-2xl font-semibold text-[#1C2333]">100</p>
                    <p className="text-xs text-stone-500 mt-1">Character limit per input, keeping the database efficient and embedding fast</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F5F1E8] border border-stone-200 text-center">
                    <p className="font-display text-2xl font-semibold text-[#1C2333]">30</p>
                    <p className="text-xs text-stone-500 mt-1">Days of log retention before automatic deletion, managing storage</p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F5F1E8] border border-stone-200 text-center">
                    <ShieldCheck className="w-5 h-5 text-[#AD7F2E] mx-auto mb-1" />
                    <p className="text-xs text-stone-500 mt-1">Admin dashboard for CRUD operations, protected by an access key</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'NLP Embedding', 'SQL'].map((t, i) => (
                      <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Property Data Analytics ============ */}
      <section id="properti" className="py-8 lg:py-10 scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <WirakyProjectHeader
                title="Property Analytics &amp; Investment Database"
                description="Property intelligence system combining listing data, macroeconomic indicators, price-to-income analysis, and area-level trends for investment evaluation."
                icon={Landmark}
                iconBackground="linear-gradient(135deg, #2F6B4F, #5FA07E)"
              />
              <div className="aspect-[16/8] w-full bg-stone-100 overflow-hidden">
                <img src={wirakyProperti} alt="Property data analytics dashboard" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="px-6 sm:px-10 py-8 space-y-10">
                <p className="text-stone-600 leading-relaxed max-w-3xl">
                  The database is split into two schemas: <span className="font-medium text-[#1C2333]">operational</span> for data that changes often (price, listings, area trends), and <span className="font-medium text-[#1C2333]">analytical</span> for macro indicators that change rarely, keeping the system efficient without sacrificing analytical depth.
                </p>

                <div>
                  <h3 className="font-display font-semibold text-base mb-4">Macro Indicators Integrated</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {macroIndicators.map((m, i) => (
                      <div key={i} className="p-3.5 rounded-lg bg-[#F5F1E8] border border-stone-200">
                        <span className="font-mono-data text-xs font-semibold text-[#AD7F2E]">{m.code}</span>
                        <p className="text-xs text-stone-500 leading-relaxed mt-1.5">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-base mb-4">Investment Evaluation Workflow</h3>
                  <div className="flex flex-col gap-0">
                    {investmentSteps.map((s, i) => (
                      <div key={i} className="flex items-start gap-4 py-2.5">
                        <div className="flex flex-col items-center shrink-0">
                          <span className="w-6 h-6 rounded-full text-white text-[11px] font-mono-data flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>{i + 1}</span>
                          {i < investmentSteps.length - 1 && <span className="w-px h-6 bg-stone-200 mt-1" />}
                        </div>
                        <p className="text-sm text-stone-600 leading-relaxed pt-0.5">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-base mb-4">Additional Insight</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {propertyInsights.map((ins, i) => (
                      <div key={i} className="p-4 rounded-lg border border-stone-200 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <TrendingUp className="w-4 h-4 text-[#AD7F2E] mb-2" />
                        <p className="font-medium text-sm mb-1.5">{ins.title}</p>
                        <p className="text-xs text-stone-500 leading-relaxed">{ins.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-200">
                  <div className="flex flex-wrap gap-2">
                    {['SQL', 'Database Architecture', 'React JS', 'Role-Based Access'].map((t, i) => (
                      <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Thesis bridge ============ */}
      <section id="thesis" className="py-16 lg:py-20 scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <SectionEyebrow>The Research Behind ASQE</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold max-w-2xl mx-auto mb-3">Before ASQE, There Was This Thesis</h2>
            <p className="text-stone-600 max-w-xl mx-auto">The research foundation behind ASQE: a comparison of TF-IDF and SBERT representations for aspect-based sentiment classification on e-commerce reviews.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <div className="aspect-[16/7] w-full bg-stone-100 overflow-hidden">
                <img src={foto13} alt="Thesis research visualization, TF-IDF vs SBERT" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-[#1C2333]" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg leading-snug">TF-IDF vs. SBERT for Aspect Sentiment Classification on E-Commerce Reviews</h3>
                      <p className="text-sm text-stone-500">Thesis, Universitas Diponegoro</p>
                    </div>
                  </div>
                  <span className="font-mono-data text-xs text-stone-400 shrink-0">Aug 2025 – Feb 2026</span>
                </div>
                <p className="text-stone-600 leading-relaxed max-w-3xl mb-6">
                  Compared sparse (TF-IDF) and dense contextual (SBERT) text representations, paired with Logistic Regression, for aspect-based sentiment classification across seven service aspects in Shopee reviews. Over 1,000 reviews were collected and annotated by three independent annotators, Fleiss&apos; Kappa above 0.9, the methodological foundation later extended into ASQE at PT Wiraky Nusa Telekomunikasi.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-[#F5F1E8]">
                    <p className="font-display text-xl font-semibold">94.44%</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">SBERT Accuracy</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#F5F1E8]">
                    <p className="font-display text-xl font-semibold">91.30%</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">TF-IDF Accuracy</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#F5F1E8]">
                    <p className="font-display text-xl font-semibold">1,000+</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Annotated Reviews</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#F5F1E8]">
                    <p className="font-display text-xl font-semibold">&gt;0.9</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Fleiss&apos; Kappa</p>
                  </div>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">
                  The performance gap was confirmed statistically significant with McNemar&apos;s Test, using grid search on stratified 5-fold cross-validation across per-aspect and universal hyperparameter scenarios, evaluated on six metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC, and PR-AUC.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'SBERT', 'TF-IDF', 'Sastrawi', 'Statsmodels'].map((t, i) => (
                      <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <a href="https://github.com/bers31/bernardo.github.io/tree/main/Aspect_Sentiment_Classification_of_E-Commerce_Reviews_Using_TF-IDF_and_SBERT_Representations" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a href="https://bers31.github.io/bernardo.github.io/Aspect_Sentiment_Classification_of_E-Commerce_Reviews_Using_TF-IDF_and_SBERT_Representations/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors">
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Other projects grid ============ */}
      <section id="other" className="py-20 lg:py-24 bg-[#FCF9F2] border-t border-[#E8DED0] scroll-mt-nav">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <SectionEyebrow>The Rest</SectionEyebrow>
            <h2 className="font-display text-3xl font-semibold mb-3">Academic &amp; Other Projects</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Supporting work built throughout university: data science, full-stack development, and a few detours outside data analysis.</p>
          </Reveal>

          <Reveal delay={80} className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects or technologies"
                className="w-full pl-11 pr-4 py-3 rounded-full border border-stone-200 bg-[#F5F1E8] text-sm focus:outline-none focus:border-[#AD7F2E] focus:ring-2 focus:ring-[#AD7F2E]/15 transition-all"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            {categories.map((c) => (
              <button key={c.key} onClick={() => setSelectedCategory(c.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-300 shrink-0 ${
                  selectedCategory === c.key ? 'text-white border-transparent shadow-md' : 'text-stone-500 border-stone-200 hover:border-stone-400'
                }`}
                style={selectedCategory === c.key ? { background: 'linear-gradient(135deg, #1C2333, #2A3450)' } : undefined}
              >
                <c.icon className="w-3.5 h-3.5" /> {c.label}
                <span className={`font-mono-data text-[10px] px-1.5 py-0.5 rounded-full ${selectedCategory === c.key ? 'bg-white/20' : 'bg-stone-100 text-stone-400'}`}>
                  {c.count}
                </span>
              </button>
            ))}
          </Reveal>

          {filteredGrid.length === 0 && (
            <Reveal className="text-center py-16 text-stone-400 text-sm">
              No projects match &quot;{searchTerm}&quot;. Try a different search or category.
            </Reveal>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGrid.map((p, i) => (
              <Reveal key={p.title} delay={(i % 6) * 60}>
                <div className="group flex flex-col h-full border border-stone-200 rounded-xl bg-[#F5F1E8] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="relative aspect-video w-full bg-stone-100 overflow-hidden block"
                    aria-label={`View details for ${p.title}`}
                  >
                    <img src={p.image} alt={`${p.title} screenshot`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-[#1C2333]/0 group-hover:bg-[#1C2333]/50 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                        <Eye className="w-4.5 h-4.5 text-[#1C2333]" />
                      </div>
                    </div>
                  </button>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono-data text-[10px] text-stone-400">{p.period}</span>
                      <span className="font-mono-data text-[10px] text-stone-400">{p.org}</span>
                    </div>
                    <h3 className="font-display font-semibold mb-2 leading-snug">
                      <button onClick={() => setSelectedProject(p)} className="text-left hover:text-[#AD7F2E] transition-colors">{p.title}</button>
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4">{p.desc}</p>
                    <ul className="space-y-1.5 mb-4">
                      {p.highlights.map((h, j) => (
                        <li key={j} className="text-xs text-stone-500 leading-relaxed pl-3.5 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">{h}</li>
                      ))}
                    </ul>
                    {p.impact && (
                      <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `repeat(${p.impact.length}, minmax(0, 1fr))` }}>
                        {p.impact.map((m, j) => (
                          <div key={j} className="text-center p-2 rounded-lg bg-white border border-stone-200">
                            <div className="font-display text-sm font-bold text-[#AD7F2E]">{m.value}</div>
                            <div className="text-[9px] text-stone-400 leading-tight mt-0.5">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {p.note && <p className="text-[11px] text-stone-400 italic mb-4">{p.note}</p>}
                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {p.tech.map((t, j) => (
                        <span key={j} className="font-mono-data text-[10px] text-stone-500 bg-white border border-stone-200 rounded-full px-2.5 py-1">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-stone-200">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors">
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl p-10 lg:p-14 text-center border border-[#AD7F2E]/25" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FBF1DD)' }}>
              <Blob className="w-[240px] h-[240px] -top-16 -right-16" from="#D9AD5C40" to="#D9AD5C00" />
              <div className="relative">
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-3">Want to Discuss a Project?</h2>
                <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                  Happy to go deeper on the technical detail, from ASQE dataset design to the property database architecture.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white shadow-lg shadow-[#1C2333]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                    <Mail className="w-4 h-4" /> Email Me
                  </a>
                  <Link to="/skills" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white rounded-md font-medium text-sm text-[#1C2333] transition-all duration-300 hover:border-[#AD7F2E] hover:-translate-y-0.5">
                    View Skills
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default ProjectsPage;