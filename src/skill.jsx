import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Menu, X, Award, ShieldCheck,
  Code2, BrainCircuit, BarChart3, Database, ArrowUpRight,
  ExternalLink, CheckCircle2, Lock, KeyRound, UserCheck, Radar,
  TrendingUp, Layers, Eye
} from 'lucide-react';

import sertifikat from './images/sertifikat.jpg';
import sertifikat1 from './images/sertifikat1.jpg';
import sertifikat2 from './images/sertifikat2.jpg';
import sertifikat3 from './images/sertifikat3.jpg';
import sertifikat4 from './images/sertifikat4.png';
import sertifikat5 from './images/sertifikat5.jpg';
import sertifikat6 from './images/sertifikat6.jpg';
import sertifikat7 from './images/sertifikat7.png';
import sertifikat8 from './images/sertifikat8.jpg';

/* ================= Data ================= */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const skillTabs = [
  {
    key: 'core', label: 'Core Languages & Tools', icon: Code2, color: '#AD7F2E',
    skills: [
      { name: 'Python', evidence: 'Primary language across every analysis and ML project' },
      { name: 'SQL', evidence: 'Operational and analytical schema design, Property Data Analytics' },
      { name: 'JavaScript / ReactJS', evidence: 'Financial Reporting App, this portfolio' },
      { name: 'Git & GitHub', evidence: 'Version control across every project' },
      { name: 'Pandas & NumPy', evidence: 'Data processing across every project' },
      { name: 'Jupyter Notebook', evidence: 'Research and model experimentation environment' },
    ],
  },
  {
    key: 'ai-ml', label: 'AI & Machine Learning', icon: BrainCircuit, color: '#2F6B4F',
    skills: [
      { name: 'PyTorch', evidence: 'Fine-tuning mBERT, deep learning experiments' },
      { name: 'SBERT / Sentence-Transformers', evidence: 'Thesis research, 94% F1-Score' },
      { name: 'mBERT', evidence: 'Advanced Information Retrieval System' },
      { name: 'Scikit-learn', evidence: 'Classification, clustering, model evaluation' },
      { name: 'FAISS', evidence: 'Embedding-based semantic search' },
      { name: 'ASQE / ABSA', evidence: 'Current focus at PT Wiraky Nusa Telekomunikasi' },
    ],
  },
  {
    key: 'systems', label: 'Systems & Specializations', icon: Database, color: '#BC5B39',
    skills: [
      { name: 'Schema Design', evidence: 'Operational vs. analytical, Property Data Analytics' },
      { name: 'Token-Based Security', evidence: 'Guest review form, 15-minute expiry' },
      { name: 'Role-Based Access Control', evidence: 'Admin and user frontend on the property system' },
      { name: 'Anomaly & Fraud Detection', evidence: '3-tier detection for guest reviews' },
      { name: 'Dashboard Design', evidence: 'Maribaya and Glamping review visualization' },
      { name: 'Deployment (Railway)', evidence: '4 systems live in production' },
    ],
  },
];

const additionalSkills = [
  'Docker', 'Sastrawi', 'BERTopic', 'Matplotlib', 'Streamlit', 'Statsmodels & SciPy',
  'Microsoft Excel', 'Admin CRUD Dashboards', 'Requirements Gathering', 'QA Testing',
  'Dataset Annotation', 'Process Modeling', 'Indonesian (Native)', 'English (CEFR 488)',
];

const certificates = [
  { title: 'Intellectual Property Certificate, Software', issuer: 'Ministry of Law, Republic of Indonesia', year: '2026', badge: true, image: sertifikat5 },
  { title: 'Intellectual Property Certificate, Chatbot', issuer: 'Ministry of Law, Republic of Indonesia', year: '2025', badge: true, image: sertifikat },
  { title: 'Data Classification and Summarization Using IBM Granite', issuer: 'IBM SkillsBuild', year: '2025', image: sertifikat6 },
  { title: 'AI Engineer', issuer: 'Hcelerate', year: '2025', image: sertifikat7 },
  { title: 'PyTorch & Generative AI', issuer: 'Avalon AI', year: '2024', image: sertifikat1 },
  { title: 'Database Programming with SQL', issuer: 'Oracle Academy', year: '2024', image: sertifikat2 },
  { title: 'Java Programming', issuer: 'Oracle Academy', year: '2024', image: sertifikat3 },
  { title: 'Cloud Computing', issuer: 'Alibaba Cloud', year: '2024', image: sertifikat4 },
  { title: 'Data Analysis Bootcamp', issuer: 'Universitas Diponegoro', year: '2023', image: sertifikat8},
];

const credibilityStats = [
  { number: '18', label: 'Technical Skills', color: '#AD7F2E' },
  { number: '9', label: 'Certifications', color: '#2F6B4F' },
  { number: '4', label: 'Key Achievements', color: '#BC5B39' },
  { number: '3', label: 'Recognition Highlights', color: '#AD7F2E' },
];

const recognitionHighlights = [
  { icon: Award, title: 'Cumlaude Graduate', desc: 'GPA 3.78, Universitas Diponegoro, 2026' },
  { icon: ShieldCheck, title: 'IP Certificate: Software', desc: 'Ministry of Law RI, 2026' },
  { icon: ShieldCheck, title: 'IP Certificate: Chatbot', desc: 'Ministry of Law RI, 2025' },
];

const achievements = [
  {
    icon: TrendingUp, metric: '94%', title: 'SBERT Outperforms TF-IDF', color: '#2F6B4F',
    desc: 'F1-Score achieved in thesis research comparing text representations for aspect-based sentiment classification, the method later extended into ASQE.',
  },
  {
    icon: BarChart3, metric: '500K+', title: 'Large-Scale Text Analysis', color: '#AD7F2E',
    desc: 'Tweets analyzed for sentiment and information diffusion modeling, identifying influential users and community clusters.',
  },
  {
    icon: Award, metric: '3.78', title: 'Cumlaude Graduate', color: '#BC5B39',
    desc: 'GPA out of 4.0, Bachelor of Informatics, Universitas Diponegoro, awarded March 2026.',
  },
  {
    icon: Layers, metric: '4', title: 'Production-Grade Systems', color: '#2F6B4F',
    desc: 'Live systems at PT Wiraky Nusa Telekomunikasi: chatbot, review analytics, ASQE, and a property data platform.',
  },
];

const securityMeasures = [
  {
    icon: KeyRound, title: 'Token-Based Access',
    desc: 'The guest review form uses auto-generated tokens with a 15-minute expiry, blocking access without a valid link.',
  },
  {
    icon: UserCheck, title: 'Role-Based Access Control',
    desc: 'The property data platform separates admin, full CRUD, from user, read-only, at the frontend level.',
  },
  {
    icon: Lock, title: 'Access-Key Protected Dashboards',
    desc: 'Admin panels for the chatbot and the review form both require a valid access key before any data is exposed.',
  },
  {
    icon: Radar, title: 'Anomaly & Fraud Detection',
    desc: 'A three-tier detection system flags suspicious guest reviews by combining four independent signals.',
  },
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
const Skills = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTab, setActiveTab] = useState('core');
  const currentTab = skillTabs.find((t) => t.key === activeTab) || skillTabs[0];

  return (
    <div className="min-h-screen site-background font-body text-[#1C2333] overflow-x-hidden">
      <GlobalStyles />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-14 lg:pt-40 lg:pb-16 overflow-hidden">
        <Blob className="w-[380px] h-[380px] -top-32 -right-16" from="#D9AD5C30" to="#D9AD5C00" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-5">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Skills &amp; Certifications
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.15] max-w-3xl mb-6">
              Every skill here has been used, not just listed.
            </h1>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Instead of a self-rated percentage bar, each tool below is tied to the real project where it was actually applied.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Credibility stats */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#FBF0EA] border border-[#E7D2C7] py-8 px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {credibilityStats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-3xl font-bold text-[#1C2333]"><AnimatedNumber value={s.number} /></div>
                    <div className="text-xs text-stone-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skill tabs */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="flex flex-wrap justify-center gap-3 mb-10">
            {skillTabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'text-white shadow-lg' : 'text-stone-500 bg-white border border-stone-200 hover:border-stone-400'}`}
                  style={active ? { background: `linear-gradient(135deg, ${tab.color}, ${tab.color}CC)` } : undefined}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {currentTab.skills.map((s, i) => (
              <Reveal key={`${currentTab.key}-${s.name}`} delay={i * 60}>
                <div className="h-full p-5 rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-2 h-2 rounded-full mb-3" style={{ background: currentTab.color }} />
                  <h3 className="font-display font-semibold text-sm mb-1.5">{s.name}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{s.evidence}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="border border-dashed border-stone-300 rounded-2xl p-6 sm:p-7">
              <h3 className="font-mono-data text-[11px] uppercase tracking-wider text-stone-400 mb-4">Also Working With</h3>
              <div className="flex flex-wrap gap-2">
                {additionalSkills.map((s, i) => (
                  <span key={i} className="font-mono-data text-xs text-stone-600 border border-stone-200 bg-[#F5F1E8] rounded-full px-3 py-1.5">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recognition highlights */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {recognitionHighlights.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-stone-200 bg-white">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #AD7F2E, #BC5B39)' }}>
                    <r.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm leading-snug">{r.title}</p>
                    <p className="text-xs text-stone-400">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 lg:py-24 bg-[#FCF9F2] border-t border-[#E8DED0]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Achievements
            </div>
            <h2 className="font-display text-3xl font-semibold mb-3">Numbers That Hold Up</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Verified results, each traceable to a specific project or record.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="h-full p-5 rounded-xl border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)` }}>
                    <a.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-display text-2xl font-bold mb-1" style={{ color: a.color }}>{a.metric}</div>
                  <h3 className="font-display font-semibold text-sm mb-2 leading-snug">{a.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Access Control */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Security &amp; Access Control
            </div>
            <h2 className="font-display text-3xl font-semibold mb-3">Built With Access in Mind</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Real mechanisms shipped in production, not a checklist of buzzwords.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityMeasures.map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="h-full p-5 rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2 leading-snug">{s.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-14 border-y border-[#E5D8BD] bg-[#FBF5E8] pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Certifications
            </div>
            <h2 className="font-display text-3xl font-semibold mb-3">Formal Recognition</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Two of these are Intellectual Property certificates from Indonesia's Ministry of Law, proof that the systems built were substantial enough to register formally.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.map((cert, i) => (
              <Reveal key={i} delay={(i % 6) * 60}>
                <div className={`group h-full rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cert.badge ? 'border-[#AD7F2E]' : 'border-stone-200'}`}>
                  <button
                    onClick={() => cert.image && setSelectedCert(cert)}
                    disabled={!cert.image}
                    className={`relative aspect-[4/3] w-full overflow-hidden flex items-center justify-center ${cert.badge ? 'bg-[#AD7F2E]/[0.06]' : 'bg-stone-100'}`}
                  >
                    {cert.image ? (
                      <>
                        <img src={cert.image} alt={`${cert.title} certificate`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-[#1C2333]/0 group-hover:bg-[#1C2333]/50 transition-all duration-300 flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                            <Eye className="w-4 h-4 text-[#1C2333]" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Award className="w-10 h-10 text-stone-300" />
                    )}
                  </button>
                  <div className={`p-5 ${cert.badge ? 'bg-[#AD7F2E]/[0.04]' : 'bg-[#F5F1E8]'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: cert.badge ? 'linear-gradient(135deg, #AD7F2E, #BC5B39)' : '#FFFFFF', border: cert.badge ? 'none' : '1px solid #E7E5E4' }}>
                        {cert.badge ? <ShieldCheck className="w-4.5 h-4.5 text-white" /> : <Award className="w-4.5 h-4.5 text-[#1C2333]" />}
                      </div>
                      <span className="font-mono-data text-xs text-stone-400">{cert.year}</span>
                    </div>
                    <h3 className="font-display font-semibold text-sm leading-snug mb-1">{cert.title}</h3>
                    <p className="text-xs text-stone-500">{cert.issuer}</p>
                    {cert.badge && (
                      <span className="inline-flex items-center gap-1 font-mono-data text-[9px] uppercase tracking-wider text-[#AD7F2E] mt-3">
                        <CheckCircle2 className="w-3 h-3" /> Intellectual Property
                      </span>
                    )}
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
              <Blob className="w-[240px] h-[240px] -bottom-16 -left-16" from="#5FA07E33" to="#5FA07E00" />
              <div className="relative">
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-3">See These Skills in Action</h2>
                <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                  Full case studies, from ASQE to the property database architecture, are on the Projects page.
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

      {selectedCert && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(28, 35, 51, 0.72)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedCert(null)}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-stone-200">
              <div>
                <h3 className="font-display font-semibold">{selectedCert.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{selectedCert.issuer} · {selectedCert.year}</p>
              </div>
              <button onClick={() => setSelectedCert(null)} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-[#1C2333] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <img src={selectedCert.image} alt={`${selectedCert.title} certificate, full size`} className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;