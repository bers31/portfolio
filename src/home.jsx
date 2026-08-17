import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Download, ArrowRight, ArrowUpRight,
  CheckCircle2, XCircle, Database, TrendingUp, Search, BarChart2,
  Briefcase, GraduationCap, Award, Menu, X, ShieldCheck, ChevronDown, Sparkles
} from 'lucide-react';
import foto from './images/foto.png';
import resumeFile from './assets/CV - Bernardo Nandaniar Sunia.pdf';
import resumeFile1 from './assets/Resume - Bernardo Nandaniar Sunia.pdf';

/* ================================================================
   Design tokens (kept inline for quick reference while editing)
   paper    #FAF9F5   ink     #1C2333
   gold     #AD7F2E → #D9AD5C   terracotta #BC5B39 → #E0916D
   emerald  #2F6B4F → #5FA07E   negative   #A8453B
================================================================= */

/* ---------- Data ---------- */
const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

const stats = [
  { number: '3.78', label: 'GPA, Cumlaude', icon: Award, color: '#AD7F2E' },
  { number: '94%', label: 'Best Model F1-Score', icon: TrendingUp, color: '#2F6B4F' },
  { number: '4', label: 'Systems Live in Production', icon: Briefcase, color: '#BC5B39' },
  { number: '2', label: 'IP-Registered Works', icon: ShieldCheck, color: '#AD7F2E' },
];

const techStack = [
  'Python', 'PyTorch', 'SBERT', 'mBERT', 'Scikit-learn', 'FAISS', 'SQL',
  'React JS', 'Pandas', 'NumPy', 'Streamlit', 'Sastrawi', 'ASQE / ABSA', 'Docker',
];

const focusAreas = [
  { icon: Search, title: 'NLP & Sentiment Analysis', desc: 'Aspect-based sentiment and opinion extraction from unstructured review text.', color: '#AD7F2E' },
  { icon: BarChart2, title: 'Data Analysis & Visualization', desc: 'Turning raw data into dashboards and insight people can actually act on.', color: '#BC5B39' },
  { icon: Database, title: 'Machine Learning', desc: 'Building classification, extraction, and recommendation models grounded in real data.', color: '#2F6B4F' },
  { icon: TrendingUp, title: 'Statistics & Research', desc: 'Hypothesis testing and quantitative analysis to support real decisions.', color: '#AD7F2E' },
];

const otherProjectsTeaser = [
  { category: 'PT Wiraky Nusa Telekomunikasi', title: 'Maribaya Chatbot', desc: 'An NLP embedding-based chatbot that answers visitor questions, with an admin dashboard and automatic log rotation.', color: '#AD7F2E' },
  { category: 'PT Wiraky Nusa Telekomunikasi', title: 'Review Form & Anomaly Detection', desc: '15-minute access tokens and a 3-tier anomaly detection system for Maribaya & Glamping guest reviews.', color: '#BC5B39' },
  { category: 'PT Wiraky Nusa Telekomunikasi', title: 'Property Data Analytics', desc: 'A dual-schema database, operational and analytical, for judging fair pricing and investment potential.', color: '#2F6B4F' },
];

const experiencePreview = [
  { icon: Briefcase, role: 'Data Analyst', company: 'PT Wiraky Nusa Telekomunikasi', period: '2026 – Present', current: true },
  { icon: Briefcase, role: 'Automated Information System Chatbot Developer', company: 'Class II Ambarawa Correctional Facility', period: 'May – Jul 2025', current: false },
  { icon: GraduationCap, role: 'Laboratory Teaching Assistant', company: 'Computer Laboratory, Universitas Diponegoro', period: 'Jun 2023 – Jun 2025', current: false },
];

// Real example from the work report: "Tempatnya bagus, tapi parkirannya sempit."
const quadExamples = [
  { aspect: 'tempat', aspectScore: '0.9', category: 'tempat', categoryScore: '1.0', opinion: 'bagus', opinionScore: '0.9', sentimentScore: '1.0', positive: true },
  { aspect: 'parkir', aspectScore: '0.9', category: 'fasilitas', categoryScore: '0.9', opinion: 'sempit', opinionScore: '0.9', sentimentScore: '0.9', positive: false },
];

/* ---------- Motion helpers (no external deps: IntersectionObserver + rAF) ---------- */
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
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
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
  <div
    aria-hidden="true"
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ background: `radial-gradient(circle at 30% 30%, ${from}, ${to} 70%)` }}
  />
);

const ConfidenceBar = ({ score, color }) => (
  <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${parseFloat(score) * 100}%`, background: color }} />
  </div>
);

/* ---------- Shared bits (copied into every page so each file stands alone) ---------- */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-mono-data { font-family: 'IBM Plex Mono', monospace; }
    .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }

    /* ---------- Background ---------- */
    .site-background {
      background-color: #F5F1E8;
      background-image:
        radial-gradient(circle at 15% 10%, rgba(217,173,92,0.14), transparent 28%),
        radial-gradient(circle at 85% 25%, rgba(188,91,57,0.10), transparent 25%),
        radial-gradient(circle at 50% 90%, rgba(47,107,79,0.08), transparent 30%),
        linear-gradient(rgba(28,35,51,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(28,35,51,0.025) 1px, transparent 1px);
      background-size:
        auto,
        auto,
        auto,
        42px 42px,
        42px 42px;
      background-attachment: fixed;
    }

    /* ---------- Navbar ---------- */
    .site-navbar {
      background: rgba(28, 35, 51, 0.94);
      border-color: rgba(255,255,255,0.12);
      box-shadow:
        0 8px 30px rgba(28,35,51,0.16),
        0 1px 0 rgba(255,255,255,0.06) inset;
    }

    .site-navbar-scrolled {
      background: rgba(28, 35, 51, 0.98);
      box-shadow:
        0 10px 35px rgba(28,35,51,0.20),
        0 1px 0 rgba(255,255,255,0.08) inset;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes drift {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(24px, -18px) scale(1.06); }
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.65; }
    }

    @keyframes photoZoom { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.035); } }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .gradient-text {
      background: linear-gradient(
        100deg,
        #D9AD5C,
        #E0916D 45%,
        #D9AD5C
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradientShift 6s ease-in-out infinite;
    }
  `}</style>
);

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'bg-[#E7E8E3] border-[#C8C9C1] shadow-[0_5px_20px_rgba(28,35,51,0.14)]' : 'bg-[#E7E8E3] border-[#C8C9C1] shadow-[0_4px_16px_rgba(28,35,51,0.09)]'}`}>
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
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#AD7F2E] to-[#BC5B39] transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
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
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium ${location.pathname === item.path ? 'bg-white text-[#1C2333] shadow-sm' : 'text-stone-500'}`}
              >
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

/* ---------- Page ---------- */
const Home = () => {
  return (
    <div className="min-h-screen site-background font-body text-[#1C2333] overflow-x-hidden">
      <GlobalStyles />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
        <Blob className="w-[380px] h-[380px] -top-36 -right-16" from="#D9AD5C3D" to="#D9AD5C00" />
        <Blob className="w-[300px] h-[300px] bottom-0 right-16" from="#5FA07E30" to="#5FA07E00" />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #DBD7C9 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }}
        />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">
            <Reveal className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-5">
                <Sparkles className="w-3.5 h-3.5" /> NLP Engineer · Data Scientist · ML Engineer
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] mb-4">
                Bernardo Nandaniar <span className="gradient-text">Sunia</span>
              </h1>
              <p className="font-display text-xl lg:text-2xl text-[#1C2333]/70 font-medium mb-5">
                NLP Engineer <span className="text-stone-400">·</span> Data Scientist <span className="text-stone-400">·</span> Machine Learning Engineer
              </p>
              <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
                Informatics graduate from Universitas Diponegoro, Cum Laude with a GPA of 3.78, and Data Analyst at PT Wiraky Nusa Telekomunikasi. Focused on data analytics, NLP, and aspect-based sentiment analysis, with experience developing ASQE to transform unstructured customer reviews into structured insights for data-driven decision-making
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
                <span className="inline-flex items-center gap-1.5 font-mono-data text-[11px] font-medium text-[#1C2333] border border-stone-300 rounded-full px-3 py-1.5 bg-white shadow-[0_2px_8px_rgba(28,35,51,0.06)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#AD7F2E]" /> 2 works registered as IP, Ministry of Law RI
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono-data text-[11px] font-medium text-[#1C2333] border border-stone-300 rounded-full px-3 py-1.5 bg-white shadow-[0_2px_8px_rgba(28,35,51,0.06)]">
                  4 systems live in production
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
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
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resumeFile;
                    link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white rounded-md font-medium text-sm text-[#1C2333] transition-all duration-300 hover:border-[#AD7F2E] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Download className="w-4 h-4" /> Download CV
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resumeFile1;
                    link.download = 'Resume - Bernardo Nandaniar Sunia.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white rounded-md font-medium text-sm text-[#1C2333] transition-all duration-300 hover:border-[#AD7F2E] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {[
                  { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com', icon: Mail, label: 'Email' },
                  { href: 'https://linkedin.com/in/bernardo-sunia/', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://github.com/bers31', icon: Github, label: 'GitHub' },
                  { href: 'https://wa.me/6289520501678', icon: Phone, label: 'WhatsApp' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="p-2.5 border border-stone-200 bg-white rounded-md text-stone-500 transition-all duration-300 hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-md"
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #AD7F2E, #BC5B39)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200} className="shrink-0 relative">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2.2rem] opacity-40 blur-2xl"
                  style={{ background: 'linear-gradient(135deg, #AD7F2E 0%, #D9AD5C 35%, #BC5B39 70%, #2F6B4F 100%)', animation: 'photoZoom 5s ease-in-out infinite', boxShadow: '0 25px 60px rgba(28,35,51,0.18)' }}
                />
                <div
                  className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-[2rem] p-[4px] shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #AD7F2E 0%, #D9AD5C 35%, #BC5B39 70%, #2F6B4F 100%)', animation: 'photoZoom 5s ease-in-out infinite', boxShadow: '0 25px 60px rgba(28,35,51,0.18)' }}
                >
                  <div className="w-full h-full rounded-[1.55rem] overflow-hidden bg-stone-100 border-4 border-[#FAF9F5]">
                    <img src={foto} alt="Bernardo Nandaniar Sunia" className="w-full h-full object-cover" style={{ animation: 'photoZoom 5s ease-in-out infinite' }} />
                  </div>
                </div>
                <div className="absolute -top-7 -right-7 lg:-right-10 bg-white rounded-full shadow-xl border-2 border-[#D9AD5C]/40 w-20 h-20 flex flex-col items-center justify-center" style={{ animation: 'float 4s ease-in-out infinite' }}>
                  <span className="font-display text-lg font-bold leading-none text-[#AD7F2E]">3.78</span>
                  <span className="font-mono-data text-[12px] text-stone-400 mt-1">GPA</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-stone-400" style={{ animation: 'float 2.6s ease-in-out infinite' }}>
          <span className="font-mono-data text-[9px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Core toolkit */}
      <section className="py-14 border-y border-[#E5D8BD] bg-[#FBF5E8]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-7">
            <p className="font-mono-data text-[11px] tracking-widest uppercase text-stone-400">Core Toolkit</p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map((t, i) => (
              <Reveal key={i} delay={i * 25}>
                <span className="inline-flex items-center font-mono-data text-sm text-[#1C2333] border border-stone-200 bg-[#FAF9F5] rounded-full px-4 py-2 whitespace-nowrap transition-all duration-300 hover:border-[#AD7F2E] hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                  {t}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature: ASQE demo */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <Blob className="w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2" from="#AD7F2E14" to="#AD7F2E00" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs tracking-widest uppercase text-[#AD7F2E] mb-3">
              <span className="w-6 h-px bg-[#AD7F2E]" /> Flagship Project · PT Wiraky Nusa Telekomunikasi
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-3">From Review Text to Structured Data</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A working example from Aspect-Sentiment Quad Extraction (ASQE), built for Maribaya and Glamping guest reviews. One sentence, decomposed into structured data with the model's own confidence scores.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative rounded-2xl p-[1.5px] shadow-xl" style={{ background: 'linear-gradient(120deg, #AD7F2E55, #BC5B3955, #2F6B4F55)' }}>
              <div className="bg-white rounded-[calc(1rem-1.5px)] p-8 lg:p-10">
                <p className="font-display text-lg lg:text-xl leading-relaxed">
                  &quot;<span className="border-b-2 border-[#1C2333]/30">Tempatnya</span> <span className="border-b-2 border-[#2F6B4F]">bagus</span>, tapi <span className="border-b-2 border-[#1C2333]/30">parkirannya</span> <span className="border-b-2 border-[#A8453B]">sempit</span>.&quot;
                </p>
                <p className="text-xs text-stone-400 mt-2 italic">Original guest review in Indonesian. Approximate translation: &quot;The place is great, but the parking is tight.&quot;</p>

                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {quadExamples.map((q, i) => (
                    <div key={i} className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ borderTop: `3px solid ${q.positive ? '#2F6B4F' : '#A8453B'}` }}>
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
          </Reveal>

          <Reveal delay={200} className="text-center mt-6">
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1C2333] hover:text-[#AD7F2E] transition-colors group">
              Read the full case study <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Other projects teaser */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold">More From PT Wiraky Nusa Telekomunikasi</h2>
            <Link to="/projects" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {otherProjectsTeaser.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <Link
                  to="/projects"
                  className="group block h-full p-5 rounded-xl bg-white border border-stone-200 overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.color }} />
                  <div className="font-mono-data text-[10px] uppercase tracking-wider text-stone-400 mb-2">{p.category}</div>
                  <h3 className="font-display font-semibold mb-1.5 transition-colors" style={{ color: 'inherit' }}>
                    <span className="group-hover:text-[#1C2333]">{p.title}</span>
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: p.color }}>
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/projects" className="sm:hidden mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-[#FBF0EA] border-y border-[#E7D2C7]">
        <Blob className="w-[320px] h-[320px] -top-24 -left-10" from="#AD7F2E14" to="#AD7F2E00" />
        <Blob className="w-[280px] h-[280px] -bottom-24 -right-10" from="#2F6B4F14" to="#2F6B4F00" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={i} delay={i * 100} className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="font-display text-3xl lg:text-4xl font-bold text-[#1C2333] mb-1">
                  <AnimatedNumber value={stat.number} />
                </div>
                <div className="text-xs lg:text-sm text-stone-500">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-3">Focus Areas</h2>
            <p className="text-stone-600">Core competencies behind accurate, relevant analysis</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group h-full p-6 border border-stone-200 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: undefined }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)` }}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience preview */}
      <section className="py-20 lg:py-24 bg-[#FCF9F2] border-t border-[#E8DED0]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold">Experience</h2>
            <Link to="/experience" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-[#1C2333] transition-colors">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="space-y-4">
            {experiencePreview.map((exp, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 sm:gap-5 p-5 border border-[#E5DDD0] rounded-xl bg-[#FFFDF8] transition-all duration-300 hover:border-[#AD7F2E]/40 hover:shadow-md">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: exp.current ? 'linear-gradient(135deg, #AD7F2E, #BC5B39)' : '#F5F3EC' }}>
                    <exp.icon className={`w-5 h-5 ${exp.current ? 'text-white' : 'text-[#1C2333]'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-semibold">{exp.role}</h3>
                      {exp.current && <span className="font-mono-data text-[10px] uppercase tracking-wider bg-[#2F6B4F]/10 text-[#2F6B4F] px-2 py-0.5 rounded-full">Current</span>}
                    </div>
                    <p className="text-sm text-stone-500">{exp.company}</p>
                  </div>
                  <span className="font-mono-data text-xs text-stone-400 shrink-0">{exp.period}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Link to="/experience" className="sm:hidden mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl p-10 lg:p-16 text-center border border-[#AD7F2E]/25" style={{ background: 'linear-gradient(135deg, #FFFFFF, #FBF1DD)' }}>
              <Blob className="w-[260px] h-[260px] -top-16 -right-16" from="#D9AD5C40" to="#D9AD5C00" />
              <Blob className="w-[220px] h-[220px] -bottom-20 -left-14" from="#5FA07E30" to="#5FA07E00" />
              <div className="relative">
                <h2 className="font-display text-2xl lg:text-3xl font-semibold mb-3 text-[#1C2333]">Get In Touch</h2>
                <p className="text-stone-600 mb-8 max-w-xl mx-auto">
                  Open to discussing or collaborating on text mining, sentiment analysis, and data analysis more broadly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                    <Mail className="w-4 h-4" /> Email Me
                  </a>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 bg-white text-[#1C2333] rounded-md font-medium text-sm transition-all duration-300 hover:border-[#AD7F2E] hover:-translate-y-0.5">
                    Contact Page
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

export default Home;