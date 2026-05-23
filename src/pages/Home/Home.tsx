import React, { Suspense, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Smartphone, Bot, Play,
  Star, ChevronDown, Zap,
  Globe, MessageSquare, ArrowUpRight,
  CheckCircle2, Sparkles, TrendingUp,
} from 'lucide-react';
import Hero3D from '../../components/Hero3D/Hero3D';

/* ─── Data ─── */
const stats = [
  { num: 15, suffix: '+', label: 'Projects Delivered', desc: 'End-to-end products shipped across 5+ countries.', color: '#a78bfa' },
  { num: 20, suffix: '+', label: 'Happy Clients', desc: 'Long-term partnerships built on trust & results.', color: '#38bdf8' },
  { num: 5, suffix: '+', label: 'Years of Expertise', desc: 'Deep mastery in software, AI & digital strategy.', color: '#34d399' },
];

const topProjects = [
  { id: 1, title: 'Unies', category: 'PWA Application', image: 'https://res.cloudinary.com/di1vdilgj/image/upload/v1771708404/Screenshot_2026-02-16_at_11.06.49_PM_n4djxo.png', color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', link: 'https://unies.com.bd' },
  { id: 2, title: 'Uixpertise', category: 'WordPress Dev', image: 'https://res.cloudinary.com/di1vdilgj/image/upload/v1771708404/Screenshot_2026-02-16_at_11.07.38_PM_v5n4hb.png', color: '#f472b6', glow: 'rgba(244,114,182,0.4)', link: 'https://uixpertise.com' },
  { id: 3, title: 'Lyvaa', category: 'E-Commerce', image: 'https://res.cloudinary.com/di1vdilgj/image/upload/v1771911849/Screenshot_2026-02-16_at_11.09.54_PM_zrj1xi.png', color: '#38bdf8', glow: 'rgba(56,189,248,0.4)', link: 'https://lyvaa.com' },
  { id: 4, title: 'Being Smile', category: 'Crowd Funding', image: 'https://res.cloudinary.com/di1vdilgj/image/upload/v1771708404/Screenshot_2026-02-16_at_11.11.31_PM_lqwd4s.png', color: '#34d399', glow: 'rgba(52,211,153,0.4)', link: 'https://beingsmile.org' },
];

const services = [
  { icon: <Globe size={20} />, title: 'Web Development', description: 'High-conversion landing pages, e-commerce & enterprise systems with stunning animations.', color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', dim: 'rgba(167,139,250,0.09)', features: ['React / Next.js', 'E-commerce', 'Enterprise LMS/ERP'] },
  { icon: <Smartphone size={20} />, title: 'Mobile Application', description: 'Cross-platform Flutter & React Native apps with on-demand ecosystems and IoT dashboards.', color: '#38bdf8', glow: 'rgba(56,189,248,0.35)', dim: 'rgba(56,189,248,0.09)', features: ['Flutter / React Native', 'IoT Dashboards', 'App Store Launch'] },
  { icon: <Bot size={20} />, title: 'AI Integration', description: 'Enterprise RAG systems, AI customer support, and autonomous agents with custom LLM fine-tuning.', color: '#34d399', glow: 'rgba(52,211,153,0.35)', dim: 'rgba(52,211,153,0.09)', features: ['RAG / LLM Fine-tuning', 'AI Chatbots', 'Autonomous Agents'] },
];

const processSteps = [
  { number: '01', title: 'Discovery', description: 'Understanding your vision, challenges, and goals through collaborative workshops.', icon: <MessageSquare size={16} /> },
  { number: '02', title: 'Strategy', description: 'Crafting a tailored roadmap with clear milestones and measurable outcomes.', icon: <Zap size={16} /> },
  { number: '03', title: 'Execution', description: 'Building and testing with agile methodologies and continuous delivery.', icon: <Code size={16} /> },
  { number: '04', title: 'Launch', description: 'Seamless deployment with ongoing support and performance optimization.', icon: <Sparkles size={16} /> },
];

const testimonials = [
  { quote: 'The Legend It transformed our business with their AI-powered solutions. The platform they delivered exceeded every expectation.', author: 'Sarah Chen', role: 'CTO, TechVentures', rating: 5, initial: 'SC', color: '#a78bfa' },
  { quote: 'Their ML expertise helped us achieve a 40% increase in operational efficiency. Outstanding team to work with.', author: 'Michael Roberts', role: 'CEO, DataFlow Inc', rating: 5, initial: 'MR', color: '#38bdf8' },
  { quote: 'A truly collaborative partner. They delivered a product our customers absolutely love. 10/10 would recommend.', author: 'Emily Watson', role: 'Product Lead, Innovate Labs', rating: 5, initial: 'EW', color: '#34d399' },
];

const faqs = [
  { q: 'What technologies do you specialize in?', a: 'We specialize in React, Next.js, Node.js, Python, AI/ML, cloud platforms (AWS, GCP), Flutter, React Native, and more — covering the full modern stack.' },
  { q: 'How long does a typical project take?', a: 'Timelines vary by scope and complexity. A standard web project takes 4–8 weeks, while enterprise platforms or AI integrations can take 10–16 weeks from discovery to launch.' },
  { q: 'Do you provide post-launch support?', a: 'Yes! We offer comprehensive support and maintenance packages for long-term partnerships, including bug fixes, feature updates, security patches, and performance monitoring.' },
  { q: 'What industries do you serve?', a: 'We work across fintech, healthcare, e-commerce, edtech, SaaS, and enterprise sectors — bringing deep domain expertise to every project.' },
];

const clients = ['Unies', 'Uixpertise', 'Lyvaa', 'The Legend It', 'Tusqa Well Being', 'AcholComputers', 'Dr Shaiful Islam', 'N3X Venture'];

/* ─── Animated Counter ─── */
function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

/* ─── Premium Stat Block ─── */
const StatBlock: React.FC<{ stat: typeof stats[0]; index: number }> = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCounter(stat.num, inView);

  const themes = [
    {
      accent: '#a78bfa',
      borderClass: 'border-purple-200 dark:border-purple-900/30',
      bgClass: 'bg-purple-50/40 dark:bg-purple-950/5',
      textClass: 'text-purple-600 dark:text-purple-400',
    },
    {
      accent: '#38bdf8',
      borderClass: 'border-sky-200 dark:border-sky-900/30',
      bgClass: 'bg-sky-50/40 dark:bg-sky-950/5',
      textClass: 'text-sky-600 dark:text-sky-400',
    },
    {
      accent: '#34d399',
      borderClass: 'border-emerald-200 dark:border-emerald-900/30',
      bgClass: 'bg-emerald-50/40 dark:bg-emerald-950/5',
      textClass: 'text-emerald-600 dark:text-emerald-400',
    },
  ];
  const t = themes[index] || themes[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between p-8 rounded-3xl overflow-hidden border transition-all duration-300 ${t.borderClass} ${t.bgClass}`}
      style={{
        minHeight: '260px',
      }}
      whileHover={{
        y: -6,
        borderColor: t.accent,
        boxShadow: `0 0 40px ${t.accent}25, 0 16px 48px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Corner glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-700" style={{ background: t.accent }} />

      {/* Top row */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${t.borderClass} ${t.bgClass} ${t.textClass}`}
        >
          Impact
        </span>
        <TrendingUp size={16} className={`opacity-40 group-hover:opacity-100 transition-opacity ${t.textClass}`} />
      </div>

      {/* Big number */}
      <div
        className={`font-display font-black leading-none tracking-tighter mb-4 select-none ${t.textClass}`}
        style={{
          fontSize: 'clamp(5rem, 10vw, 7.5rem)',
          filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.04))`,
        }}
      >
        {count}{stat.suffix}
      </div>

      {/* Bottom */}
      <div>
        <div className="w-8 h-[2px] mb-3 rounded-full" style={{ background: t.accent }} />
        <p className="font-display text-base font-bold text-neutral-900 dark:text-white mb-1">{stat.label}</p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{stat.desc}</p>
      </div>
    </motion.div>
  );
};

/* ─── Project preview card ─── */
const ProjectCard: React.FC<{ p: typeof topProjects[0]; index: number }> = ({ p, index }) => (
  <Link to="/projects">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeIn' }}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
      whileHover={{ y: -2, boxShadow: `0 0 0 1px ${p.color}30, 0 6px 16px rgba(0,0,0,0.28)` }}
    >
      <motion.img
        src={p.image}
        alt={p.title}
        className="w-full h-full object-cover"
        style={{ filter: 'grayscale(50%)' }}
        whileHover={{ scale: 1.07, filter: 'grayscale(0%)' }}
        transition={{ duration: 0.55 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      {/* Accent top */}
      <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${p.color}60,transparent)` }} initial={{ opacity: 0.2 }} whileHover={{ opacity: 0.55 }} />
      {/* Category badge */}
      <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md" style={{ color: p.color, borderColor: `${p.color}40`, background: 'rgba(0,0,0,0.65)' }}>
        {p.category}
      </div>
      {/* Arrow */}
      <motion.div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: p.color }} initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <ArrowUpRight size={13} color="#000" />
      </motion.div>
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <h3 className="font-display text-lg font-bold text-white leading-tight">{p.title}</h3>
      </div>
    </motion.div>
  </Link>
);

/* ─── Main ─── */
const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white overflow-hidden transition-colors duration-300">

      {/* ════════════════════════════════════════
          HERO — UNCHANGED
      ════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100vh-100px)] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[200px] animate-subtle-glow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[180px] animate-subtle-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-sm text-purple-300">Now accepting new projects</span>
              </motion.div>
              <h1 className="hero-title">
                <span className="block text-neutral-900 dark:text-white">We Build</span>
                <span className="block text-shimmer">Digital Products</span>
                <span className="block text-neutral-600 dark:text-neutral-400">That Matter</span>
              </h1>
              <p className="hero-subtitle mt-6 mx-auto lg:mx-0">
                From AI-powered innovations to pixel-perfect interfaces, we craft software solutions that transform businesses.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link to="/contact" className="btn-primary group">
                  Start a Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-secondary group">
                  <Play size={16} className="text-purple-400" />
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-800 hidden lg:block">
                <p className="text-xs text-neutral-400 mb-3">Trusted by innovative companies</p>
                <div className="flex flex-wrap items-center gap-5">
                  {clients.slice(0, 4).map((client) => (
                    <span key={client} className="text-sm font-display font-medium text-neutral-500 hover:text-white transition-colors">{client}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-32 h-32 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" /></div>}>
                  <Hero3D />
                </Suspense>
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-8 right-0 p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 backdrop-blur-sm z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"><Bot size={16} className="text-white" /></div>
                    <div><p className="text-[10px] text-neutral-400">AI Integration</p><p className="text-xs font-medium text-white">GPT-4 Ready</p></div>
                  </div>
                </motion.div>
                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-8 left-0 p-3 rounded-xl bg-neutral-900/90 border border-neutral-700 backdrop-blur-sm z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><Code size={16} className="text-white" /></div>
                    <div><p className="text-[10px] text-neutral-400">Full Stack</p><p className="text-xs font-medium text-white">React + Node</p></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 rounded-full border-2 border-neutral-600 flex items-start justify-center p-1.5">
            <div className="w-1 h-1.5 rounded-full bg-purple-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          CLIENT MARQUEE
      ════════════════════════════════════════ */}
      <section className="py-6 border-y border-neutral-800/50">
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-24" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
            {[...clients, ...clients].map((client, i) => (
              <span key={i} className="text-lg font-display font-medium text-neutral-500 hover:text-white whitespace-nowrap transition-colors cursor-default">{client}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BY THE NUMBERS — Premium Redesign
      ════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden border-t border-neutral-800/50">
        {/* Multi-orb background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/8 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px]" />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-[11px] font-black tracking-[0.18em] uppercase" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                By The Numbers
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] font-black text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
                Driving real
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(90deg, #a78bfa 0%, #a78bfa 50%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  impact globally.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-neutral-500 max-w-xs leading-relaxed lg:text-right"
            >
              Every number reflects a real partnership, a shipped product, and a lasting relationship.
            </motion.p>
          </div>

          {/* Stat blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat, i) => <StatBlock key={stat.label} stat={stat} index={i} />)}
          </div>

          {/* Bottom accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="mt-12 h-px"
          >
            <div className="h-full w-full" style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.6), rgba(56,189,248,0.6), rgba(52,211,153,0.6), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TOP 4 PROJECTS
      ════════════════════════════════════════ */}
      <section className="py-24 border-t border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Featured Work</motion.p>
              <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Top Projects</motion.h2>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link to="/projects" className="hidden sm:flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors group">
                View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topProjects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-purple-400">
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES — redesigned, links to /services
      ════════════════════════════════════════ */}
      <section className="py-24 border-t border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>What We Offer</motion.p>
              <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Services</motion.h2>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link to="/services" className="hidden sm:flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors group">
                All services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/services" className="block h-full group">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden h-full flex flex-col p-7 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-gradient-to-br dark:from-[#0e0e1c] dark:to-[#08080f] transition-all duration-300"
                    whileHover={{ y: -2, boxShadow: `0 0 0 1px ${svc.color}30, 0 6px 16px rgba(0,0,0,0.06)` }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                  >
                    {/* Accent top bar */}
                    <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${svc.color}60,transparent)` }} initial={{ opacity: 0.2 }} whileHover={{ opacity: 0.55 }} />

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border mb-6 transition-all duration-300" style={{ color: svc.color, borderColor: `${svc.color}35`, background: svc.dim }}>
                      {svc.icon}
                    </div>

                    <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white mb-3">{svc.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-5 flex-1">{svc.description}</p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-6">
                      {svc.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-neutral-650 dark:text-neutral-400">
                           <CheckCircle2 size={12} style={{ color: svc.color }} className="flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA row */}
                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${svc.color}15` }}>
                      <span className="text-xs text-neutral-500 dark:text-neutral-600">Click to explore</span>
                      <motion.span className="flex items-center gap-1 text-xs font-bold" style={{ color: svc.color }} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                        Learn more <ArrowUpRight size={12} />
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROCESS — horizontal timeline redesign
      ════════════════════════════════════════ */}
      <section className="py-24 border-t border-neutral-800/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.p className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>How We Work</motion.p>
            <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Our Process</motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.3),rgba(167,139,250,0.3),transparent)' }} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.48, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  {/* Circle node */}
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 border"
                    style={{ background: 'linear-gradient(135deg,#0e0e1c,#070710)', borderColor: 'rgba(167,139,250,0.2)' }}
                    whileHover={{ boxShadow: '0 0 0 1.5px rgba(167,139,250,0.45)', scale: 1.02 }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                  >
                    <span className="font-display text-2xl font-black text-white" >{step.number}</span>
                  </motion.div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-purple-400">{step.icon}</div>
                    <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-neutral-650 dark:text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS — premium card redesign
      ════════════════════════════════════════ */}
      <section className="py-24 border-t border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.p className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Testimonials</motion.p>
            <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>What Clients Say</motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden p-7 flex flex-col gap-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-gradient-to-br dark:from-[#0e0e1c] dark:to-[#08080f] transition-all duration-300"
                whileHover={{ y: -5, boxShadow: `0 0 0 1.5px ${item.color}40, 0 12px 40px rgba(0,0,0,0.08)` }}
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${item.color}70,transparent)` }} />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, si) => (
                    <Star key={si} size={13} fill={item.color} style={{ color: item.color }} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed flex-1">"{item.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: `${item.color}15` }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0"
                    style={{ color: item.color, borderColor: `${item.color}40`, background: `${item.color}12` }}
                  >
                    {item.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">{item.author}</p>
                    <p className="text-[11px] text-neutral-500">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ — redesigned
      ════════════════════════════════════════ */}
      <section className="py-24 border-t border-neutral-800/40 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/4 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.p className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>FAQ</motion.p>
            <motion.h2 className="section-title" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Common Questions</motion.h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.08 }}
                >
                  <motion.div
                    className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                      isOpen
                        ? 'border-purple-300 dark:border-purple-500/35 bg-purple-50/30 dark:bg-[#0e0e1c]/95'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-white/2'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 p-6 text-left"
                    >
                      {/* Number pill */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black font-mono transition-all duration-300 ${
                          isOpen
                            ? 'bg-gradient-to-br from-purple-600 to-purple-400 text-white shadow-lg shadow-purple-500/20'
                            : 'bg-neutral-100 text-neutral-550 dark:bg-white/5 dark:text-neutral-400'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      <span className={`flex-1 font-display text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-purple-600 dark:text-white' : 'text-neutral-800 dark:text-neutral-300'}`}>
                        {faq.q}
                      </span>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                        style={{ color: isOpen ? '#a78bfa' : 'rgb(115,115,115)' }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-20">
                            <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg,rgba(167,139,250,0.3),transparent)' }} />
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="py-32 border-t border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-neutral-900 dark:text-white">Ready to Build</span>
              <br />
              <span className="text-shimmer">Something Great?</span>
            </h2>
            <p className="mt-8 text-xl text-neutral-600 dark:text-neutral-350 max-w-xl mx-auto">Let's transform your ideas into reality.</p>
            <div className="mt-12">
              <Link to="/contact" className="btn-primary group text-base px-10 py-4">
                Start Your Project
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;