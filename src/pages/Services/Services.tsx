import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Smartphone, Brain, Globe, ShoppingCart,
  Server, Palette, Zap, Layers, MapPin, Rocket, MessageSquare,
  Users, Cpu, Settings, CheckCircle2, X, Search, SlidersHorizontal,
  ArrowUpRight, Sparkles, Star,
} from 'lucide-react';
import CursorGlow from '../../components/CursorGlow/CursorGlow';

/* ─── Theme ─── */
const CAT_THEME: Record<string, { color: string; glow: string; dim: string; gradient: string }> = {
  web: { color: '#a78bfa', glow: 'rgba(167,139,250,0.5)', dim: 'rgba(167,139,250,0.09)', gradient: 'linear-gradient(135deg,#6d28d9,#a78bfa)' },
  mobile: { color: '#38bdf8', glow: 'rgba(56,189,248,0.5)', dim: 'rgba(56,189,248,0.09)', gradient: 'linear-gradient(135deg,#0369a1,#38bdf8)' },
  ai: { color: '#34d399', glow: 'rgba(52,211,153,0.5)', dim: 'rgba(52,211,153,0.09)', gradient: 'linear-gradient(135deg,#065f46,#34d399)' },
};

const CAT_LABELS: Record<string, string> = { web: 'Web Dev', mobile: 'Mobile', ai: 'AI / ML' };

/* ─── Data ─── */
type ServiceItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  maintenance: string;
  catId: string;
};

const ALL_SERVICES: ServiceItem[] = [
  // Web
  { catId: 'web', title: 'Landing Page Design', description: 'Immersive 3D & GSAP animations that turn visitors into customers.', icon: <Globe size={16} />, features: ['Custom 3D Elements', 'GSAP Animation', 'Conversion Optimization', 'Responsive Design'], maintenance: 'Monthly Performance Checks' },
  { catId: 'web', title: 'E-commerce Store', description: 'Custom Shopify & WooCommerce stores with advanced plugin development.', icon: <ShoppingCart size={16} />, features: ['Shopify/WooCommerce', 'Payment Gateway', 'Inventory Management', 'Custom Themes'], maintenance: 'Security Updates & Backups' },
  { catId: 'web', title: 'LMS/ERP/POS', description: 'Custom internal tools to automate your workflow end-to-end.', icon: <Server size={16} />, features: ['Role-Based Access', 'Automated Workflows', 'Real-time Reporting', 'API Integration'], maintenance: 'Server Monitoring & Updates' },
  { catId: 'web', title: 'UI/UX Design', description: 'Figma/Adobe XD to high-performance, responsive code.', icon: <Palette size={16} />, features: ['User Research', 'Wireframing & Prototyping', 'Design System', 'Usability Testing'], maintenance: 'Design Iterations' },
  { catId: 'web', title: 'Performance & SEO', description: 'Technical audits and speed optimization for higher rankings.', icon: <Zap size={16} />, features: ['Core Web Vitals', 'On-Page SEO', 'Speed Optimization', 'Technical Audit'], maintenance: 'Monthly SEO Reports' },
  // Mobile
  { catId: 'mobile', title: 'Cross-Platform Apps', description: 'High-performance Flutter & React Native apps for iOS & Android.', icon: <Layers size={16} />, features: ['One Codebase', 'Native Performance', 'Offline Support', 'App Store Deployment'], maintenance: 'OS Updates Compatibility' },
  { catId: 'mobile', title: 'Web-to-Mobile Transformation', description: 'Convert your web platform into a native-feel mobile app.', icon: <Smartphone size={16} />, features: ['PWA Functionality', 'Push Notifications', 'Device Features', 'App Shell Architecture'], maintenance: 'Regular App Updates' },
  { catId: 'mobile', title: 'On-Demand Ecosystems', description: 'Uber-style solutions with real-time GPS, payments & multi-user interfaces.', icon: <MapPin size={16} />, features: ['Real-time Tracking', 'In-app Payments', 'User/Driver/Admin Apps', 'Rating System'], maintenance: '24/7 Server Uptime' },
  { catId: 'mobile', title: 'IoT Dashboards', description: 'Real-time monitoring & control for smart devices with low-latency data sync.', icon: <Cpu size={16} />, features: ['MQTT/WebSocket', 'Data Visualization', 'Remote Control', 'Alert System'], maintenance: 'Device Firmware Updates' },
  { catId: 'mobile', title: 'ASO & Launch Strategy', description: 'Metadata optimization for maximum app store visibility.', icon: <Rocket size={16} />, features: ['Keyword Research', 'Screenshot Design', 'Description Optimization', 'Review Management'], maintenance: 'Rank Tracking' },
  // AI
  { catId: 'ai', title: 'RAG', description: '"Chat with your Data" systems for secure document querying.', icon: <MessageSquare size={16} />, features: ['Vector Database', 'Semantic Search', 'Context Awareness', 'Secure Data Handling'], maintenance: 'Model Retraining' },
  { catId: 'ai', title: 'AI Customer Support', description: 'Intelligent assistants with multi-lingual support & human-in-the-loop escalation.', icon: <Users size={16} />, features: ['NLP/NLU', 'Multi-channel Support', 'Sentiment Analysis', 'Seamless Escalation'], maintenance: 'Conversation Flow Updates' },
  { catId: 'ai', title: 'Autonomous AI Agents', description: 'Multi-step automation for lead nurturing, data entry & business processes.', icon: <Settings size={16} />, features: ['Task Automation', 'Decision Making Logic', 'CRM Integration', 'Adaptive Learning'], maintenance: 'Workflow Optimization' },
  { catId: 'ai', title: 'Custom LLM Fine-Tuning', description: 'Optimized open-source models (Llama 3, Mistral) for industry-specific accuracy.', icon: <Cpu size={16} />, features: ['Dataset Preparation', 'Model Training', 'Evaluation & Benchmarking', 'Deployment'], maintenance: 'Model Updates' },
];

const CATEGORY_META: { id: string; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'all', label: 'All Services', icon: <SlidersHorizontal size={14} />, description: `${ALL_SERVICES.length} services` },
  { id: 'web', label: 'Web Dev', icon: <Code size={14} />, description: `${ALL_SERVICES.filter(s => s.catId === 'web').length} services` },
  { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone size={14} />, description: `${ALL_SERVICES.filter(s => s.catId === 'mobile').length} services` },
  { id: 'ai', label: 'AI & ML', icon: <Brain size={14} />, description: `${ALL_SERVICES.filter(s => s.catId === 'ai').length} services` },
];

const technologies = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Flutter', 'React Native', 'TensorFlow', 'OpenAI', 'AWS', 'Google Cloud', 'Docker'];

const processSteps = [
  { number: '01', title: 'Discovery', description: 'Deep dive into your vision, goals, and challenges.' },
  { number: '02', title: 'Strategy', description: 'Tailored roadmap with clear milestones & deliverables.' },
  { number: '03', title: 'Design', description: 'Intuitive interfaces and seamless user experiences.' },
  { number: '04', title: 'Development', description: 'Robust, scalable, and maintainable solutions.' },
  { number: '05', title: 'Testing', description: 'Rigorous QA to ensure quality and reliability.' },
  { number: '06', title: 'Launch', description: 'Seamless deployment with ongoing support.' },
];

/* ─── Service Card ─── */
const ServiceCard: React.FC<{
  service: ServiceItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}> = ({ service, index, isSelected, onClick }) => {
  const theme = CAT_THEME[service.catId];
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.42, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      layout
      onMouseMove={onMove}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(160deg, #0d0d1c 0%, #08080f 100%)' }}
        animate={isSelected
          ? { boxShadow: `0 0 0 1.5px ${theme.color}, 0 12px 48px ${theme.glow}, 0 2px 12px rgba(0,0,0,0.7)` }
          : { boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 12px rgba(0,0,0,0.5)' }
        }
        transition={{ duration: 0.3 }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(200px circle at ${mx.get()}% ${my.get()}%, ${theme.dim} 0%, transparent 100%)` }}
        />

        {/* Top accent strip */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${theme.color}90, transparent)` }}
          animate={{ opacity: isSelected ? 1 : 0.2 }}
          transition={{ duration: 0.3 }}
        />

        {/* Selected ring pulse */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ boxShadow: [`0 0 0 0px ${theme.color}30`, `0 0 0 6px ${theme.color}00`] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}

        <div className="relative z-10 p-5 flex flex-col gap-4 h-full">
          {/* Icon + badge row */}
          <div className="flex items-start justify-between">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 transition-all duration-300"
              style={{ color: theme.color, borderColor: `${theme.color}30`, background: theme.dim }}
              animate={isSelected ? { boxShadow: `0 0 18px ${theme.glow}` } : { boxShadow: 'none' }}
            >
              {service.icon}
            </motion.div>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border"
              style={{ color: theme.color, borderColor: `${theme.color}30`, background: theme.dim }}
            >
              {CAT_LABELS[service.catId]}
            </span>
          </div>

          {/* Title + description */}
          <div className="flex-1">
            <h3 className="font-display text-[15px] font-bold text-white leading-snug mb-2 group-hover:text-white transition-colors">
              {service.title}
            </h3>
            <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Bottom row */}
          <div
            className="flex items-center justify-between pt-3 border-t"
            style={{ borderColor: `${theme.color}15` }}
          >
            <span className="text-[10px] font-medium text-neutral-600">
              {service.features.length} features
            </span>
            <motion.div
              className="flex items-center gap-1 text-[11px] font-bold"
              style={{ color: theme.color }}
              animate={isSelected ? { x: 3 } : { x: 0 }}
            >
              Details <ArrowUpRight size={11} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Right Drawer ─── */
const ServiceDrawer: React.FC<{
  service: ServiceItem;
  onClose: () => void;
}> = ({ service, onClose }) => {
  const theme = CAT_THEME[service.catId];

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[80]"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <motion.aside
        className="fixed top-0 right-0 bottom-0 z-[90] flex flex-col overflow-hidden"
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'linear-gradient(160deg, rgba(11,11,22,0.99) 0%, rgba(7,7,13,1) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderLeft: `1px solid ${theme.color}30`,
        }}
        initial={{ x: '110%' }}
        animate={{ x: 0 }}
        exit={{ x: '110%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.9 }}
      >
        {/* Glow left edge */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[1px]"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${theme.color} 40%, ${theme.color} 60%, transparent 100%)` }}
        />

        {/* Top ambient glow */}
        <div
          className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 0%, ${theme.glow.replace('0.5', '0.15')}, transparent 70%)` }}
        />

        {/* Header */}
        <div className="relative flex-shrink-0 p-7 pb-0">
          <div className="flex items-start justify-between gap-4 mb-6">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border"
              style={{ color: theme.color, borderColor: `${theme.color}45`, background: theme.dim, boxShadow: `0 0 28px ${theme.glow}` }}
            >
              {React.createElement((service.icon as React.ReactElement<{ size?: number }>).type, { size: 22 })}
            </div>

            {/* Right: category + close */}
            <div className="flex items-center gap-2 mt-1 flex-shrink-0">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                style={{ color: theme.color, borderColor: `${theme.color}35`, background: theme.dim }}
              >
                {CAT_LABELS[service.catId]}
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/25 transition-all"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <X size={13} />
              </motion.button>
            </div>
          </div>

          {/* Service name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-2" style={{ color: theme.color }}>
              Service Overview
            </p>
            <h2 className="font-display text-2xl font-bold text-white leading-snug">
              {service.title}
            </h2>
            <p className="mt-2.5 text-sm text-neutral-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${theme.color}40, transparent)` }} />
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-7 pt-5 space-y-6">
          {/* Features */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              What's Included
            </p>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <motion.li
                  key={f}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 + i * 0.07 }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: theme.dim, border: `1px solid ${theme.color}35` }}
                  >
                    <CheckCircle2 size={11} style={{ color: theme.color }} />
                  </div>
                  <span className="text-sm text-neutral-300">{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Maintenance card */}
          <motion.div
            className="relative rounded-xl p-4 overflow-hidden border"
            style={{ borderColor: `${theme.color}25`, background: theme.dim }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(90deg, ${theme.color}50, transparent)` }}
            />
            <div className="flex items-start gap-3">
              <Star size={14} className="mt-0.5 flex-shrink-0" style={{ color: theme.color }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: theme.color }}>
                  Ongoing Maintenance
                </p>
                <p className="text-sm text-neutral-300">{service.maintenance}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative flex-shrink-0 p-7 pt-4">
          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${theme.color}30, transparent)` }} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
            className="space-y-3"
          >
            <Link
              to="/contact"
              className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: theme.gradient,
                color: '#fff',
                boxShadow: `0 8px 36px ${theme.glow}`,
              }}
            >
              <Sparkles size={14} />
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-center text-[10px] text-neutral-600">
              Free consultation · No commitment required
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
};

/* ─── Main Page ─── */
const Services: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_SERVICES.filter((s) => {
      const catMatch = activeCat === 'all' || s.catId === activeCat;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some(f => f.toLowerCase().includes(q))
      );
    });
  }, [query, activeCat]);

  const handleSelect = useCallback((s: ServiceItem) => {
    setSelectedService(prev => prev?.title === s.title ? null : s);
  }, []);

  const handleClose = useCallback(() => setSelectedService(null), []);

  return (
    <main className="bg-black text-white relative">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-slow-spin">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[130px]" />
          <div className="absolute top-3/4 left-1/2 w-[500px] h-[500px] bg-blue-600/8  rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-3/4 w-[400px] h-[400px] bg-emerald-500/6 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <CursorGlow containerRef={heroRef} />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-1/3 w-[520px] h-[520px] bg-purple-500/25 rounded-full blur-[150px]" />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/18 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-sm text-purple-300">What We Do</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="hero-title">
              <span className="text-white">Pick Your</span><br />
              <span className="text-shimmer">Services</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="hero-subtitle mt-6 text-neutral-300 max-w-2xl">
              From AI-driven innovations to pixel-perfect development — a complete suite of services to elevate your business.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
            >
              {[
                { label: 'Services', val: ALL_SERVICES.length.toString() },
                { label: 'Categories', val: '3' },
                { label: 'Technologies', val: technologies.length.toString() },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black text-white">{val}</span>
                  <span className="text-sm text-neutral-500">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search + Filter bar */}
      <section className="sticky top-0 z-40 border-t border-neutral-800/50 py-4 backdrop-blur-xl" style={{ background: 'rgba(0,0,0,0.85)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search services, features..."
                className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-neutral-600 border border-neutral-800 outline-none focus:border-neutral-600 transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <X size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-0.5 sm:pb-0 flex-shrink-0">
              {CATEGORY_META.map(cat => {
                const theme = cat.id !== 'all' ? CAT_THEME[cat.id] : null;
                const isActive = activeCat === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 border"
                    style={isActive && theme
                      ? { background: theme.dim, borderColor: `${theme.color}45`, color: theme.color, boxShadow: `0 0 16px ${theme.glow}` }
                      : isActive
                        ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }
                        : { background: 'transparent', borderColor: 'rgba(255,255,255,0.07)', color: 'rgb(115,115,115)' }
                    }
                  >
                    {cat.icon}
                    {cat.label}
                    <span className="opacity-50">{cat.description}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Result count + active filter label */}
          <motion.div layout className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                {activeCat === 'all' ? 'All Services' : CATEGORY_META.find(c => c.id === activeCat)?.label}
              </h2>
              <p className="text-neutral-500 text-sm mt-0.5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                {query ? ` for "${query}"` : ''}
              </p>
            </div>
            {selectedService && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleClose}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs text-neutral-400 hover:text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <X size={12} /> Clear selection
              </motion.button>
            )}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((service, idx) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    index={idx}
                    isSelected={selectedService?.title === service.title}
                    onClick={() => handleSelect(service)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <Search size={40} className="text-neutral-700 mb-4" />
                <p className="text-neutral-400 font-medium">No services found</p>
                <p className="text-neutral-600 text-sm mt-1">Try a different search term or category</p>
                <button
                  onClick={() => { setQuery(''); setActiveCat('all'); }}
                  className="mt-4 px-5 py-2 rounded-xl border border-neutral-700 text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Drawer */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDrawer
            key={selectedService.title}
            service={selectedService}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Technologies */}
      <section className="py-24 border-t border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="section-label">Our Stack</p>
            <h2 className="section-title">Technologies We Use</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.08 }}
                className="px-5 py-2.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 border-t border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="section-label">Our Process</p>
            <h2 className="section-title">How We Work</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <span className="font-display text-6xl font-black text-purple-400/35 group-hover:text-purple-400/55 transition-colors duration-300">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-semibold text-white mt-2">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Have a Project</span><br />
              <span className="text-purple-400">in Mind?</span>
            </h2>
            <p className="mt-6 text-xl text-neutral-300 max-w-xl mx-auto">
              Let's discuss how we can turn your ideas into reality.
            </p>
            <div className="mt-10">
              <Link to="/contact" className="btn-primary group text-base px-10 py-4">
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Services;