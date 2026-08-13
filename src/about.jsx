import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Download, ArrowRight, Menu, X,
  MapPin, GraduationCap, Languages, Compass, ShieldCheck,
  BrainCircuit, Layers, TrendingUp, Quote,
  LineChart, Briefcase, ChevronRight
} from 'lucide-react';
import foto from './images/foto.png';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';

/* ================= Data ================= */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const quickFacts = [
  { icon: MapPin, label: 'Location', value: 'Semarang, Indonesia' },
  { icon: GraduationCap, label: 'Education', value: 'BSc Informatics, Universitas Diponegoro' },
  { icon: Briefcase, label: 'Current Role', value: 'Data Analyst, PT Wiraky Nusa Telekomunikasi' },
  { icon: Languages, label: 'Languages', value: 'Indonesian (native), English (CEFR 488)' },
  { icon: Compass, label: 'Current Focus', value: 'NLP & Aspect-Based Sentiment Analysis' },
];

const snapshotStats = [
  { number: '3.78', label: 'GPA, Cumlaude', color: '#AD7F2E' },
  { number: '94%', label: 'Best Model F1-Score', color: '#2F6B4F' },
  { number: '4', label: 'Systems Live in Production', color: '#BC5B39' },
  { number: '2', label: 'IP-Registered Works', color: '#AD7F2E' },
];

const achievementSpotlight = [
  {
    icon: LineChart, label: 'Current Focus', stat: 'ASQE', color: '#2F6B4F',
    title: 'Aspect-Sentiment Quad Extraction',
    org: 'PT Wiraky Nusa Telekomunikasi',
    desc: 'Built a system that extracts aspect, opinion, category, and sentiment together from a single guest review, each with its own confidence score. Goes beyond a single rating to show what a review is actually about.',
  },
  {
    icon: GraduationCap, label: 'Thesis Research', stat: '94% F1', color: '#AD7F2E',
    title: 'TF-IDF vs. SBERT',
    org: 'Universitas Diponegoro',
    desc: "Compared sparse and dense text representations for aspect-based sentiment classification on 1,000+ annotated Shopee reviews. SBERT won, and the method became the foundation for ASQE.",
  },
  {
    icon: Briefcase, label: 'In Production', stat: '4 Systems', color: '#BC5B39',
    title: 'Four Systems, Live',
    org: 'PT Wiraky Nusa Telekomunikasi',
    desc: 'A chatbot, a guest review analytics platform, an aspect-sentiment engine, and a property data system, all running today and supporting real operations.',
  },
];

const recognition = [
  { icon: GraduationCap, title: 'Cumlaude Graduate', desc: 'GPA 3.78 out of 4.0, Universitas Diponegoro, awarded March 2026.', color: '#AD7F2E' },
  { icon: ShieldCheck, title: 'IP Certificate, Software', desc: "Registered with Indonesia's Ministry of Law, 2026.", color: '#2F6B4F' },
  { icon: ShieldCheck, title: 'IP Certificate, Chatbot', desc: "Registered with Indonesia's Ministry of Law, 2025.", color: '#BC5B39' },
];

const principles = [
  {
    icon: ShieldCheck,
    title: 'Verify before full automation',
    desc: 'Machine-labeled datasets, including for ASQE, are treated as drafts that need manual verification, not final ground truth.',
    color: '#AD7F2E',
  },
  {
    icon: Layers,
    title: 'Separate what changes often from what does not',
    desc: 'The property analytics system splits the database into an operational schema (price, listings) and an analytical schema (IHPR, BI Rate, census), keeping the system efficient.',
    color: '#BC5B39',
  },
  {
    icon: BrainCircuit,
    title: 'Weak signals, combined, become strong',
    desc: 'The logic behind anomaly detection in guest reviews: text or rating similarity alone means little, but becomes a strong signal when paired with repeated identity.',
    color: '#2F6B4F',
  },
  {
    icon: TrendingUp,
    title: 'A single rating is never enough',
    desc: 'The core motivation for ASQE: one rating score can hide a mix of good and bad experience within the same review.',
    color: '#AD7F2E',
  },
];

const timelineMini = [
  { year: '2022', text: 'Started the Informatics degree at Universitas Diponegoro, alongside part-time work at YC Electric.' },
  { year: '2023 – 2025', text: 'Laboratory Teaching Assistant, supporting 20+ students per semester in programming logic.' },
  { year: '2024 – 2025', text: 'Cross-domain internships: a financial reporting application (East Semarang District) and an information chatbot (Class II Ambarawa Correctional Facility).' },
  { year: '2025 – 2026', text: 'Thesis on text representation (TF-IDF vs. SBERT) for aspect-based sentiment classification. Graduated Cum Laude, March 2026.' },
  { year: '2026 – Present', text: 'Joined PT Wiraky Nusa Telekomunikasi as Data Analyst. Built ASQE, a chatbot, and data analysis systems end to end.' },
];

const whatsNext = [
  'Mapping which aspects guests discuss most over time, to catch a rising complaint before it grows into a pattern',
  'Clustering aspect categories automatically as new topics emerge in the review data, using BERTopic in zero-shot mode',
  'Weighting review clusters against real business outcomes, rating, repeat booking, and cancellation rate, not just how often a topic comes up',
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
    @keyframes photoZoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.035); } }
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
const About = () => {
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % achievementSpotlight.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const active = achievementSpotlight[activeSpotlight];

  return (
    <div className="min-h-screen site-background font-body text-[#1C2333] overflow-x-hidden">
      <GlobalStyles />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <Blob className="w-[380px] h-[380px] -top-32 -right-16" from="#D9AD5C33" to="#D9AD5C00" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-5">
              <span className="w-6 h-px bg-[#AD7F2E]" /> About
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.15] max-w-3xl mb-6">
              Informatics graduate. Data Analyst. Builder of production NLP systems.
            </h1>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl">
              I work at the intersection of data analysis, machine learning, and natural language processing, with customer reviews as the raw material I turn into structured, decision-ready data most often.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="space-y-6">
              <Reveal>
                <div className="relative w-40 lg:w-full max-w-[220px]">
                  <div aria-hidden="true" className="absolute -inset-3 rounded-[1.9rem] opacity-40 blur-xl" style={{ background: 'linear-gradient(135deg, #AD7F2E 0%, #D9AD5C 35%, #BC5B39 70%, #2F6B4F 100%)', animation: 'photoZoom 5s ease-in-out infinite' }} />
                  <div className="relative rounded-[1.75rem] p-[4px] shadow-xl" style={{ background: 'linear-gradient(135deg, #AD7F2E 0%, #D9AD5C 35%, #BC5B39 70%, #2F6B4F 100%)' }}>
                    <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden bg-stone-100 border-4 border-[#FAF9F5]">
                      <img src={foto} alt="Bernardo Nandaniar Sunia" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="border border-stone-200 rounded-xl bg-white p-5">
                  <h2 className="font-mono-data text-[11px] uppercase tracking-wider text-stone-400 mb-4">Quick Facts</h2>
                  <dl className="space-y-4">
                    {quickFacts.map((f, i) => (
                      <div key={i} className="flex gap-3">
                        <f.icon className="w-4 h-4 text-[#AD7F2E] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-xs text-stone-400">{f.label}</dt>
                          <dd className="text-sm font-medium leading-snug">{f.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resumeFile;
                    link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md font-medium text-sm text-white shadow-lg shadow-[#1C2333]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}
                >
                  <Download className="w-4 h-4" /> Download CV
                </button>
              </Reveal>
            </aside>

            {/* Narrative */}
            <div className="space-y-16">
              {/* From research to production */}
              <Reveal>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-4">From Research to Production System</h2>
                <div className="space-y-4 text-stone-600 leading-relaxed">
                  <p>
                    Thesis: TF-IDF versus SBERT for aspect-based sentiment classification on e-commerce reviews. Over 1,000 Shopee reviews annotated by three independent annotators, Fleiss&apos; Kappa above 0.9. SBERT won, with a 94% F1-Score.
                  </p>
                  <p>
                    That result is the foundation of <span className="font-semibold text-[#1C2333]">Aspect-Sentiment Quad Extraction (ASQE)</span>, the system built at PT Wiraky Nusa Telekomunikasi that extracts aspect, opinion, category, and sentiment together from a single review, each with its own confidence score. ASQE is the current focus.
                  </p>
                  <p>
                    Beyond ASQE: an NLP-based information chatbot, a guest review system with layered anomaly detection, and a property database that separates operational data from macroeconomic indicators. All four systems run in production. Two of them, the software platform and the chatbot, are registered as Intellectual Property with Indonesia&apos;s Ministry of Law.
                  </p>
                </div>
              </Reveal>

              {/* Achievement Spotlight, interactive */}
              <Reveal>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-2">Where the Work Stands</h2>
                <p className="text-stone-600 mb-6 max-w-2xl">Three snapshots of the work in progress, in more detail.</p>
                <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm">
                  <div className="grid sm:grid-cols-3 border-b border-stone-200">
                    {achievementSpotlight.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSpotlight(i)}
                        className={`flex items-center gap-2.5 p-4 text-left transition-all duration-300 ${i === activeSpotlight ? 'bg-[#F5F1E8]' : 'hover:bg-stone-50'} ${i > 0 ? 'border-l border-stone-200' : ''}`}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{ background: i === activeSpotlight ? `linear-gradient(135deg, ${a.color}, ${a.color}CC)` : '#EFEBE0' }}
                        >
                          <a.icon className={`w-4.5 h-4.5 ${i === activeSpotlight ? 'text-white' : 'text-stone-400'}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono-data text-[9px] uppercase tracking-wider text-stone-400">{a.label}</p>
                          <p className="font-display text-sm font-semibold truncate">{a.stat}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-xl font-semibold mb-1">{active.title}</h3>
                    <p className="text-sm mb-3 font-medium" style={{ color: active.color }}>{active.org}</p>
                    <p className="text-stone-600 leading-relaxed">{active.desc}</p>
                  </div>
                  <div className="flex gap-1.5 px-6 sm:px-8 pb-6">
                    {achievementSpotlight.map((a, i) => (
                      <span key={i} className="h-1 flex-1 rounded-full transition-all duration-500" style={{ background: i === activeSpotlight ? a.color : '#E7E5DC' }} />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Pull quote */}
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl border border-[#AD7F2E]/25 p-8" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FBF1DD)' }}>
                  <Blob className="w-[220px] h-[220px] -top-16 -right-16" from="#D9AD5C40" to="#D9AD5C00" />
                  <div className="relative">
                    <Quote className="w-6 h-6 text-[#AD7F2E]/60 mb-3" />
                    <p className="font-display text-xl lg:text-2xl leading-snug text-[#1C2333] mb-3">
                      Reading a pattern in a messy dataset and reading a pattern on a chessboard use the same muscle.
                    </p>
                    <p className="text-stone-600 leading-relaxed max-w-2xl">
                      Outside work: chess and other logic games. The habit carries over into how I approach data. Read the pattern, weigh a few possibilities before settling on one, and do not stop at the first explanation that looks right, especially when the data disagrees with the initial assumption. That happens more often than not in sentiment analysis.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Working principles */}
              <Reveal>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-2">Working Principles</h2>
                <p className="text-stone-600 mb-8 max-w-2xl">Four decisions pulled directly from systems already built and shipped.</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {principles.map((p, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <div className="group h-full p-5 border border-stone-200 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)` }}>
                          <p.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold mb-1.5 leading-snug">{p.title}</h3>
                        <p className="text-sm text-stone-500 leading-relaxed">{p.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* Snapshot stats */}
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-[#FBF0EA] border border-[#E7D2C7] py-8 px-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {snapshotStats.map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="font-display text-3xl font-bold text-[#1C2333]"><AnimatedNumber value={s.number} /></div>
                        <div className="text-xs text-stone-500 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Recognition */}
              <Reveal>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-2">Recognition</h2>
                <p className="text-stone-600 mb-8 max-w-2xl">Formal acknowledgment behind the work, not self-assessed.</p>
                <div className="grid sm:grid-cols-3 gap-5">
                  {recognition.map((r, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <div className="h-full p-5 rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}CC)` }}>
                          <r.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-sm mb-1.5 leading-snug">{r.title}</h3>
                        <p className="text-xs text-stone-500 leading-relaxed">{r.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* Timeline */}
              <Reveal>
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-8">A Short Timeline</h2>
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-[#AD7F2E] via-stone-300 to-transparent" />
                  <div className="space-y-8">
                    {timelineMini.map((t, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#AD7F2E]" />
                        <div className="font-mono-data text-xs text-[#AD7F2E] mb-1">{t.year}</div>
                        <p className="text-stone-600 leading-relaxed">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/experience" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors mt-6 group">
                  See full work experience <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>

              {/* Where this is headed */}
              <Reveal>
                <div className="border border-dashed border-stone-300 rounded-2xl p-6 sm:p-8">
                  <h2 className="font-display text-xl font-semibold mb-1">Where This Is Headed</h2>
                  <p className="text-sm text-stone-500 mb-6 max-w-2xl">Development directions in progress for ASQE, once the core extraction pipeline is stable.</p>
                  <ul className="space-y-3 mb-5">
                    {whatsNext.map((w, i) => (
                      <li key={i} className="flex gap-3 text-sm text-stone-600 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-[#AD7F2E] shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors group">
                    See the full ASQE roadmap <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl p-10 lg:p-14 text-center border border-[#AD7F2E]/25" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FBF1DD)' }}>
              <Blob className="w-[240px] h-[240px] -bottom-16 -left-16" from="#5FA07E33" to="#5FA07E00" />
              <div className="relative">
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-3">See the Work Directly</h2>
                <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                  Full case studies, ASQE, the chatbot, anomaly detection, and property data analytics, are on the Projects page.
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

export default About;