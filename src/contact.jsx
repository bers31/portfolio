import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail, Phone, Linkedin, Github, Menu, X, MapPin, Send,
  MessageCircle, Briefcase, GraduationCap, CheckCircle2,
  Copy, Check, Download, ArrowRight, FolderGit2
} from 'lucide-react';
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

const contactChannels = [
  { icon: Mail, label: 'Email', value: 'suniabernardo@gmail.com', copyValue: 'suniabernardo@gmail.com', desc: 'Best for detailed messages', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com', color: '#AD7F2E' },
  { icon: Phone, label: 'WhatsApp', value: '+62 895-2050-1678', copyValue: '+62 895-2050-1678', desc: 'For direct or urgent matters', href: 'https://wa.me/6289520501678', color: '#2F6B4F' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/bernardo-sunia', copyValue: 'https://linkedin.com/in/bernardo-sunia/', desc: 'Professional network', href: 'https://linkedin.com/in/bernardo-sunia/', color: '#BC5B39' },
  { icon: Github, label: 'GitHub', value: 'github.com/bers31', copyValue: 'https://github.com/bers31', desc: 'Code and project history', href: 'https://github.com/bers31', color: '#1C2333' },
];

const quickActions = [
  { icon: Mail, label: 'Quick Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com', color: '#AD7F2E' },
  { icon: Linkedin, label: 'View LinkedIn', href: 'https://linkedin.com/in/bernardo-sunia/', color: '#2F6B4F' },
  { icon: FolderGit2, label: 'See Projects', href: '/projects', color: '#BC5B39', internal: true },
];

const quickStats = [
  { number: '3.78', label: 'GPA, Cumlaude', color: '#AD7F2E' },
  { number: '94%', label: 'Best F1-Score', color: '#2F6B4F' },
  { number: '4', label: 'Systems Live in Production', color: '#BC5B39' },
  { number: '2', label: 'IP-Registered Works', color: '#AD7F2E' },
];

const availabilityCards = [
  { icon: Briefcase, title: 'Project Collaboration & Freelance', desc: 'Open to project-based work in data analysis, NLP, or machine learning system development.', color: '#AD7F2E', available: true },
  { icon: MessageCircle, title: 'Research & NLP Discussion', desc: 'Always glad to exchange ideas on aspect-based sentiment analysis, text representation, or NLP more broadly.', color: '#2F6B4F', available: true },
  { icon: GraduationCap, title: 'Data Analysis Consulting', desc: 'Available to help shape an analysis approach or evaluate a model for a specific need.', color: '#BC5B39', available: true },
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
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subject = encodeURIComponent(formData.subject || `Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    setTimeout(() => {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=suniabernardo@gmail.com&su=${subject}&body=${body}`, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

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
              <span className="w-6 h-px bg-[#AD7F2E]" /> Contact
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.15] max-w-3xl mb-6">
              Have data worth analyzing, or just want to talk shop?
            </h1>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Reach out through any of the channels below, or send a message directly through the form.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick stats */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#FBF0EA] border border-[#E7D2C7] py-8 px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {quickStats.map((s, i) => (
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

      {/* Main: channels + form */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[340px_1fr] gap-8">
            {/* Channels */}
            <div className="space-y-4">
              {contactChannels.map((c, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="group flex items-center gap-4 p-5 border border-stone-200 rounded-xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}CC)` }}>
                        <c.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-stone-400">{c.label} · {c.desc}</p>
                        <p className="text-sm font-medium truncate">{c.value}</p>
                      </div>
                    </a>
                    <button
                      onClick={() => copyToClipboard(c.copyValue, c.label)}
                      aria-label={`Copy ${c.label}`}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-stone-400 hover:bg-stone-100 hover:text-[#1C2333] transition-colors"
                    >
                      {copiedField === c.label ? <Check className="w-4 h-4 text-[#2F6B4F]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={contactChannels.length * 60}>
                <div className="flex items-center gap-4 p-5 border border-stone-200 rounded-xl bg-white">
                  <div className="w-11 h-11 rounded-lg bg-stone-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1C2333]" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Location</p>
                    <p className="text-sm font-medium">Semarang, Indonesia · GMT+7</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={(contactChannels.length + 1) * 60}>
                <div className="border border-stone-200 rounded-xl bg-white p-5">
                  <h3 className="font-mono-data text-[11px] uppercase tracking-wider text-stone-400 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    {quickActions.map((qa, i) => {
                      const content = (
                        <>
                          <span className="flex items-center gap-2.5">
                            <qa.icon className="w-4 h-4" style={{ color: qa.color }} /> {qa.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </>
                      );
                      return qa.internal ? (
                        <Link key={i} to={qa.href} className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F5F1E8] transition-colors">
                          {content}
                        </Link>
                      ) : (
                        <a key={i} href={qa.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F5F1E8] transition-colors">
                          {content}
                        </a>
                      );
                    })}
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = resumeFile;
                        link.download = 'CV - Bernardo Nandaniar Sunia.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="group w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F5F1E8] transition-colors"
                    >
                      <span className="flex items-center gap-2.5"><Download className="w-4 h-4 text-[#AD7F2E]" /> Download CV</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={(contactChannels.length + 2) * 60}>
                <div className="rounded-xl p-5 border border-[#5FA07E]/25" style={{ background: 'linear-gradient(135deg, #FFFFFF, #F0F7F3)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#2F6B4F] animate-pulse" />
                    <span className="text-sm font-medium text-[#2F6B4F]">Generally responsive</span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Messages are checked regularly. For anything time-sensitive, WhatsApp tends to get the fastest reply.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={150}>
              <div className="border border-stone-200 rounded-2xl bg-white p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold mb-1">Send a Message</h2>
                <p className="text-sm text-stone-500 mb-6">This form opens a Gmail draft. There is no backend, so nothing written here is stored on a server.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-stone-500 mb-1.5">Name</label>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-2.5 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-[#AD7F2E] focus:ring-2 focus:ring-[#AD7F2E]/15 transition-all" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-stone-500 mb-1.5">Email</label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-[#AD7F2E] focus:ring-2 focus:ring-[#AD7F2E]/15 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-stone-500 mb-1.5">Subject</label>
                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange}
                      placeholder="What is this about?"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-[#AD7F2E] focus:ring-2 focus:ring-[#AD7F2E]/15 transition-all" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-stone-500 mb-1.5">Message</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                      placeholder="Write your message here"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded-md text-sm focus:outline-none focus:border-[#AD7F2E] focus:ring-2 focus:ring-[#AD7F2E]/15 transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm text-white shadow-lg shadow-[#1C2333]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 w-full sm:w-auto"
                    style={{ background: 'linear-gradient(135deg, #1C2333, #2A3450)' }}>
                    {isSubmitting ? (
                      <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> Preparing...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                  {submitted && (
                    <p className="flex items-center gap-1.5 text-sm text-[#2F6B4F]">
                      <CheckCircle2 className="w-4 h-4" /> A Gmail draft opened in a new tab. Continue sending from there.
                    </p>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Availability */}
      <section className="py-14 border-y border-[#E5D8BD] bg-[#FBF5E8] pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <h2 className="font-display text-3xl font-semibold mb-3">Open to Collaboration</h2>
            <p className="text-stone-600 max-w-xl mx-auto">Outside the current full-time role, open to the following:</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {availabilityCards.map((a, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="h-full p-6 border border-stone-200 rounded-xl bg-[#F5F1E8] text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative w-11 h-11 mx-auto mb-4">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}CC)` }}>
                      <a.icon className="w-5 h-5 text-white" />
                    </div>
                    {a.available && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2F6B4F] border-2 border-[#F5F1E8]" />}
                  </div>
                  <h3 className="font-display font-semibold mb-1.5">{a.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;