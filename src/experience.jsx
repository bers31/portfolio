import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Menu, X, MapPin, ArrowRight, ArrowUpRight,
  Briefcase, GraduationCap, MessageSquare, ClipboardList, LineChart,
  Building2, Users, Landmark, Calendar, Star, ExternalLink,
  Target, Code2, ShieldCheck, Radio, Clock, TrendingUp, BrainCircuit, Database, Settings
} from 'lucide-react';

/* ================= Data ================= */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const headerBadges = [
  { icon: MapPin, text: 'Semarang, Indonesia' },
  { icon: Calendar, text: '2022 – Present' },
  { icon: Star, text: 'Bachelor of Informatics, Cumlaude' },
];

const experienceStats = [
  { number: '4+', label: 'Years of Combined Experience', icon: Clock, color: '#AD7F2E' },
  { number: '5', label: 'Professional Roles Held', icon: Briefcase, color: '#2F6B4F' },
  { number: '20+', label: 'Students Mentored Per Semester', icon: Users, color: '#BC5B39' },
  { number: '15%', label: 'Lab Grade Improvement', icon: TrendingUp, color: '#AD7F2E' },
];

const technicalExpertise = [
  {
    title: 'Programming & Development',
    icon: Code2,
    color: '#AD7F2E',
    skills: ['Python', 'JavaScript', 'ReactJS', 'SQL'],
  },
  {
    title: 'AI & NLP',
    icon: BrainCircuit,
    color: '#2F6B4F',
    skills: ['NLP Embedding', 'ASQE / ABSA', 'Sentence-Transformers', 'Anomaly Detection'],
  },
  {
    title: 'Systems & Deployment',
    icon: Database,
    color: '#BC5B39',
    skills: ['Schema Design', 'Railway Deployment', 'Full-Stack Architecture', 'Admin Dashboards'],
  },
  {
    title: 'Process & Mentoring',
    icon: Settings,
    color: '#AD7F2E',
    skills: ['Requirements Gathering', 'QA Testing', 'Mentoring', 'Assessment Design'],
  },
];

const wirakyStreams = [
  {
    icon: MessageSquare,
    title: 'Maribaya Chatbot',
    color: '#AD7F2E',
    points: [
      'NLP embedding-based chatbot, matching visitor input to the closest known question for the most relevant answer',
      '100-character input limit, keeping the database efficient and embedding fast',
      'Conversation logs auto-deleted after 30 days to manage storage',
      'Admin dashboard for CRUD operations, protected by an access key',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Review Form & Anomaly Detection',
    color: '#BC5B39',
    points: [
      'Auto-generated access tokens with a 15-minute expiry, blocking unauthorized form access',
      'F&B rating, email, and review text fields made optional to reduce friction for guests',
      'Separate dashboards for Resort and Glamping Tent, with filtering and CSV export',
      'Three-tier anomaly detection built from four signals: repeated identity, text similarity, rating pattern similarity, and off-hours submissions',
    ],
  },
  {
    icon: LineChart,
    title: 'ABSA, Aspect-Sentiment Quad Extraction',
    color: '#2F6B4F',
    featured: true,
    points: [
      'Extracts aspect term, opinion term, aspect category, and sentiment together from a single review, each with a confidence score',
      'Adapted the public Airyroom hotel review dataset from aspect-sentiment pairs into full quads',
      'Built 1,000 original Maribaya reviews for fine-tuning, targeting hard cases: sarcasm, double negation, slang, code-mixing, emoji as sentiment',
      'Current focus. Full case study on the Projects page',
    ],
  },
  {
    icon: Landmark,
    title: 'Property Data Analytics',
    color: '#AD7F2E',
    points: [
      'Two-schema database, operational (price, listings) and analytical (macro indicators), keeping the system efficient',
      'Integrates IHPR, inflation, regional minimum wage, population census, BI Rate, GDP growth, and Price-to-Income Ratio',
      'Investment analysis workflow from macro conditions down to individual listing evaluation',
      'Role-based frontend, admin CRUD and read-only user, with CSV export',
    ],
  },
];

const experiences = [
  {
    role: 'Automated Information System Chatbot Developer',
    company: 'Class II Ambarawa Correctional Facility',
    period: 'May 2025 – Jul 2025',
    duration: '3 months',
    type: 'Internship',
    location: 'Ambarawa, Indonesia',
    icon: MessageSquare,
    color: '#AD7F2E',
    desc: 'Led end-to-end development of an automated information chatbot supporting access to information within the correctional facility.',
    points: [
      'Ran stakeholder interviews and defined system requirements from the ground up',
      'Optimized training datasets for more relevant, consistent chatbot responses',
      'Handled QA testing and post-release performance monitoring',
    ],
    tags: ['Python', 'NLP', 'Requirements Gathering', 'QA Testing'],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Automated_Information_System_Chatbot',
    live: 'https://bers31.github.io/bernardo.github.io/Automated_Information_System_Chatbot/',
  },
  {
    role: 'Laboratory Teaching Assistant',
    company: 'Computer Laboratory, Universitas Diponegoro',
    period: 'Jun 2023 – Jun 2025',
    duration: '2 years',
    type: 'Part-Time',
    location: 'Semarang, Indonesia',
    icon: GraduationCap,
    color: '#2F6B4F',
    desc: 'Supported students in programming logic and designed the assessments used to evaluate them.',
    points: [
      'Supported 20+ students per semester in Python and algorithmic logic',
      'Designed structured assessments to objectively measure IT competency',
      'Contributed to a 15% increase in average lab scores',
    ],
    tags: ['Python', 'Mentoring', 'Assessment Design', 'Algorithmic Logic'],
  },
  {
    role: 'Financial Reporting Application Developer',
    company: 'East Semarang District',
    period: 'Dec 2024 – Feb 2025',
    duration: '3 months',
    type: 'Internship',
    location: 'Semarang, Indonesia',
    icon: Building2,
    color: '#BC5B39',
    desc: 'Built a full-stack financial reporting application, from requirements through staff training.',
    points: [
      'Developed the application with ReactJS, JavaScript, and SQL from the ground up',
      'Owned the process from requirements gathering to interface development',
      'Trained staff to operate the system independently, improving data accuracy and operational efficiency',
    ],
    tags: ['ReactJS', 'JavaScript', 'SQL', 'Full-Stack'],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Financial_Reporting_Application',
    live: 'https://bers31.github.io/bernardo.github.io/Financial_Reporting_Application/',
  },
  {
    role: 'Assistant Manager, Supply Chain Assistant & Creative Designer',
    company: 'YC Electric',
    period: 'Jan 2022 – Dec 2024',
    duration: '3 years',
    type: 'Part-Time',
    location: 'Semarang, Indonesia',
    icon: Users,
    color: '#AD7F2E',
    desc: 'Three roles at once: operations, logistics, and design. An early lesson in working across functions.',
    points: [
      'Optimized inventory tracking and simplified supplier logistics',
      'Produced 30+ promotional materials using digital design tools',
      'Strengthened brand visibility through consistent marketing materials',
    ],
    tags: ['Inventory Management', 'Supply Chain', 'Adobe Photoshop & Illustrator'],
    github: 'https://github.com/bers31/bernardo.github.io/tree/main/Custom_E_Commerce_Website',
    live: 'https://bers31.github.io/bernardo.github.io/Custom_E_Commerce_Website/',
  },
];

const buildApproach = [
  { step: '01', icon: Target, title: 'Understand the Problem', desc: 'Stakeholder interviews and requirements gathering before writing code. The starting point for the Ambarawa chatbot, the financial reporting app, and every system at PT Wiraky.', color: '#AD7F2E' },
  { step: '02', icon: Code2, title: 'Build for the Real Constraint', desc: 'Development shaped by the actual problem, not a generic template: embedding-based matching for a chatbot, token expiry for a review form, dual schemas for a property database.', color: '#BC5B39' },
  { step: '03', icon: ShieldCheck, title: 'Verify Before Trusting', desc: 'QA testing across the board, and for machine-labeled data specifically, manual verification before it is treated as ground truth.', color: '#2F6B4F' },
  { step: '04', icon: Radio, title: 'Monitor After Launch', desc: 'Performance monitoring, log rotation, and dashboard-based tracking once a system is live, not just at handoff.', color: '#AD7F2E' },
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

const AnimatedNumber = ({ value, duration = 1400 }) => {
  const [ref, inView] = useInView(0.6);
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const match = String(value).match(/^([\d.]+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const [, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref}>{display}</span>;
};

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

/* ================= Page ================= */
const ExperiencePage = () => {
  return (
    <div className="min-h-screen site-background font-body text-[#1C2333] overflow-x-hidden">
      <GlobalStyles />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-14 lg:pt-40 lg:pb-16 overflow-hidden">
        <Blob className="w-[380px] h-[380px] -top-32 -right-16" from="#5FA07E30" to="#5FA07E00" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-5">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Experience
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.15] max-w-3xl mb-6">
              A Track Record in Data Analysis and NLP
            </h1>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl mb-6">
              Chronological history, most recent first, from part-time work during university to a full-time Data Analyst role.
            </p>
            <div className="flex flex-wrap gap-2">
              {headerBadges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 font-mono-data text-[11px] font-medium text-[#1C2333] border border-stone-300 rounded-full px-3 py-1.5 bg-white shadow-[0_2px_8px_rgba(28,35,51,0.06)]">
                  <b.icon className="w-3.5 h-3.5 text-[#AD7F2E]" /> {b.text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience stats */}
      <section className="relative pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#FBF0EA] border border-[#E7D2C7] py-8 px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {experienceStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="font-display text-3xl lg:text-4xl font-bold text-[#1C2333] mb-1">
                      <AnimatedNumber value={stat.number} />
                    </div>
                    <div className="text-xs lg:text-sm text-stone-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PT Wiraky, flagship entry */}
      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl p-[1.5px] shadow-xl" style={{ background: 'linear-gradient(120deg, #AD7F2E, #BC5B39, #2F6B4F)' }}>
              <div className="bg-white rounded-[calc(1rem-1.5px)] overflow-hidden">
                <div className="px-6 sm:px-10 py-8" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-[#D9AD5C]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">Data Analyst</h2>
                          <span className="font-mono-data text-[10px] uppercase tracking-wider bg-[#5FA07E]/25 text-[#B8E4CC] px-2 py-0.5 rounded-full">Current</span>
                          <span className="font-mono-data text-[10px] uppercase tracking-wider bg-white/10 text-stone-300 px-2 py-0.5 rounded-full">Full-Time</span>
                        </div>
                        <p className="text-stone-300 text-sm">PT Wiraky Nusa Telekomunikasi</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-stone-300">
                      <span className="font-mono-data">2026 – Present</span>
                      <span className="flex items-center gap-1 text-stone-400"><MapPin className="w-3.5 h-3.5" /> Bandung, Indonesia</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-10 py-8">
                  <p className="text-stone-600 leading-relaxed max-w-3xl mb-8">
                    Full ownership of the data systems supporting Maribaya Resort &amp; Glamping operations and the company&apos;s property analytics unit: an information chatbot, a guest review system with anomaly detection, an aspect-based sentiment system, and a property database built for investment analysis.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {wirakyStreams.map((s, i) => (
                      <div key={i} className={`p-5 rounded-xl border ${s.featured ? 'border-[#2F6B4F] bg-[#2F6B4F]/[0.04] ring-1 ring-[#2F6B4F]/25' : 'border-stone-200'}`}>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}CC)` }}>
                            <s.icon className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="font-display font-semibold text-sm leading-snug">{s.title}</h3>
                          {s.featured && <span className="font-mono-data text-[9px] uppercase tracking-wider text-[#2F6B4F] ml-auto shrink-0">Core Focus</span>}
                        </div>
                        <ul className="space-y-1.5">
                          {s.points.map((pt, j) => (
                            <li key={j} className="text-xs text-stone-500 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-200">
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'NLP Embedding', 'SQL', 'ASQE / ABSA', 'React JS', 'Railway', 'Anomaly Detection'].map((t, i) => (
                        <span key={i} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                      ))}
                    </div>
                    <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors shrink-0 group">
                      Read the full case studies <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline, remaining experiences */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="relative pl-8 sm:pl-10">
            <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#AD7F2E] via-stone-300 to-transparent" />
            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <Reveal key={i} delay={i * 60} className="relative">
                  <div className="absolute -left-8 sm:-left-10 top-1 w-[19px] h-[19px] sm:w-[23px] sm:h-[23px] rounded-full bg-[#F5F1E8] border-2 flex items-center justify-center" style={{ borderColor: exp.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                  </div>
                  <div className="border border-stone-200 rounded-xl bg-white p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}CC)` }}>
                          <exp.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold leading-snug">{exp.role}</h3>
                          <p className="text-sm text-stone-500">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-stone-400 shrink-0">
                        <span className="font-mono-data">{exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="font-mono-data text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${exp.color}18`, color: exp.color }}>{exp.type}</span>
                      <span className="font-mono-data text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">{exp.duration}</span>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed mb-4">{exp.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="text-sm text-stone-500 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#AD7F2E]">
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((t, j) => (
                          <span key={j} className="font-mono-data text-[11px] text-stone-500 border border-stone-200 rounded-full px-3 py-1">{t}</span>
                        ))}
                      </div>
                      {exp.github && (
                        <div className="flex items-center gap-3 shrink-0">
                          <a href={exp.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
                            <Github className="w-3.5 h-3.5" /> Code
                          </a>
                          <a href={exp.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors">
                            Live Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Education node */}
              <Reveal delay={experiences.length * 60} className="relative">
                <div className="absolute -left-8 sm:-left-10 top-1 w-[19px] h-[19px] sm:w-[23px] sm:h-[23px] rounded-full bg-[#F5F1E8] border-2 border-[#AD7F2E] flex items-center justify-center">
                  <GraduationCap className="w-2.5 h-2.5 text-[#AD7F2E]" />
                </div>
                <div className="border border-dashed border-stone-300 rounded-xl bg-white/60 p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display font-semibold leading-snug">Bachelor of Informatics</h3>
                      <p className="text-sm text-stone-500">Universitas Diponegoro, GPA 3.78 (Cumlaude)</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-stone-400 shrink-0">
                      <span className="font-mono-data">Aug 2022 – Mar 2026</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Semarang, Indonesia</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-20 lg:py-24 bg-[#FCF9F2] border-t border-[#E8DED0]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Technical Expertise
            </div>
            <h2 className="font-display text-3xl font-semibold mb-3">Tools Across Every Role</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Grouped by category, drawn directly from the roles above. A deeper, evidence-linked breakdown lives on the Skills page.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {technicalExpertise.map((cat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="h-full p-5 rounded-xl border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}CC)` }}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-3 leading-snug">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.skills.map((s, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cat.color }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="text-center mt-8">
            <Link to="/skills" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors group">
              See the full skills breakdown <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How I approach a build */}
      <section className="py-14 border-y border-[#E5D8BD] bg-[#FBF5E8]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Working Process
            </div>
            <h2 className="font-display text-3xl font-semibold mb-3">How I Approach a Build</h2>
            <p className="text-stone-600 max-w-xl mx-auto">The same four phases, visible across every role above, from a government facility chatbot to production systems at PT Wiraky.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {buildApproach.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="relative h-full p-5 rounded-xl border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <span className="font-mono-data text-3xl font-semibold text-stone-100">{step.step}</span>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center -mt-2 mb-3" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)` }}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1.5 leading-snug">{step.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{step.desc}</p>
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
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-3">Every Role, One Level Deeper</h2>
                <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                  Full case studies, with problem context, approach, and outcome, are on the Projects page.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://bit.ly/bernardo-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white shadow-lg shadow-[#1C2333]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}
                  >
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white rounded-md font-medium text-sm text-[#1C2333] transition-all duration-300 hover:border-[#AD7F2E] hover:-translate-y-0.5">
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExperiencePage;