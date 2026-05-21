import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Target, Eye, Linkedin, Twitter, Github, ChevronDown,
  Sparkles, Users, Award, Zap, ArrowUpRight, CheckCircle2,
} from 'lucide-react';
import CursorGlow from '../../components/CursorGlow/CursorGlow';

/* ─── Helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Data ─── */
const journey = [
  { year: '2019', title: 'The Genesis', description: 'Founded with a mission to bridge business needs and technology.', color: '#a78bfa' },
  { year: '2020', title: 'First Major Project', description: 'Delivered a complex e-commerce platform, establishing our reputation.', color: '#60a5fa' },
  { year: '2021', title: 'Team Expansion', description: 'Grew our team with specialized talent in UI/UX and marketing.', color: '#38bdf8' },
  { year: '2022', title: 'AI Integration', description: 'Launched our first AI-powered analytics tool.', color: '#34d399' },
  { year: '2023', title: 'SaaS Launch', description: 'Released our first proprietary SaaS product.', color: '#fb923c' },
  { year: '2024', title: 'Global Recognition', description: 'Received industry awards and expanded internationally.', color: '#f472b6' },
  { year: '2025', title: 'Future Forward', description: 'Pioneering new frontiers in AI and decentralized applications.', color: '#a78bfa' },
];

const team = [
  {
    name: 'John Doe',
    role: 'Frontend Developer',
    image: 'https://via.placeholder.com/300',
    social: { li: '#', tw: '#', gh: '#' },
    color: '#a78bfa'
  },
  {
    name: 'Jane Smith',
    role: 'Backend Developer',
    image: 'https://via.placeholder.com/300',
    social: { li: '#', tw: '#', gh: '#' },
    color: '#38bdf8'
  },
  {
    name: 'Michael Johnson',
    role: 'UI/UX Designer',
    image: 'https://via.placeholder.com/300',
    social: { li: '#', tw: '#', gh: '#' },
    color: '#34d399'
  },
  {
    name: 'Emily Davis',
    role: 'Project Manager',
    image: 'https://via.placeholder.com/300',
    social: { li: '#', tw: '#', gh: '#' },
    color: '#f472b6'
  },
];

const values = [
  { icon: <Sparkles size={22} />, title: 'Innovation', description: 'Pushing boundaries with cutting-edge solutions that redefine what\'s possible.', color: '#a78bfa' },
  { icon: <Users size={22} />, title: 'Collaboration', description: 'Working together as one team to achieve exceptional results for our clients.', color: '#38bdf8' },
  { icon: <Award size={22} />, title: 'Excellence', description: 'Committed to the highest quality in every line of code and pixel of design.', color: '#34d399' },
  { icon: <Zap size={22} />, title: 'Agility', description: 'Adapting quickly to deliver optimal outcomes in fast-changing environments.', color: '#fb923c' },
];

const faqs = [
  { q: 'What makes The Legend It different?', a: 'Our "innovation-first" approach. We partner with you to discover what\'s possible, not just what\'s safe. Every project starts with deep strategic thinking before any code is written.' },
  { q: 'How do you ensure project success?', a: 'Transparency, agile methodology, and a dedicated project manager keep everything on track. We hold weekly syncs, maintain detailed documentation, and provide real-time updates.' },
  { q: 'Do you work with startups?', a: 'Absolutely. Our processes scale for startups and enterprises alike. We\'ve helped zero-to-one products launch and enterprise systems modernize with equal care.' },
  { q: 'What is the typical engagement process?', a: 'Discovery → Strategy → Design → Development → QA → Launch → Support. Each phase has clear deliverables and sign-off before we move forward.' },
];


const About: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-black text-white">
      {/* ── HERO (UNCHANGED) ── */}
      <section ref={heroRef} className="relative min-h-fit md:min-h-[60vh] flex items-center overflow-hidden py-12 md:py-16 lg:py-20">
        <CursorGlow containerRef={heroRef} />

        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-subtle-glow" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px] animate-subtle-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm">
                <span className="text-sm text-purple-300">About Us</span>
              </motion.div>

              <h1 className="hero-title">
                <span className="text-white">Pioneering the</span>
                <br />
                <span className="text-shimmer bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Future of Digital</span>
              </h1>

              <p className="hero-subtitle mt-6 max-w-xl text-neutral-300">
                We craft intelligent, human-centered software solutions that
                transform businesses and define the future of technology.
              </p>
            </motion.div>

            {/* Right placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden md:block h-[500px] w-full relative"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MISSION & VISION — redesigned
      ════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 lg:py-28 overflow-hidden border-t border-neutral-800/50\">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-12 md:mb-16 lg:mb-20\">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-5" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              What Drives Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight">
              Purpose &{' '}
              <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Direction
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Target size={28} />,
                title: 'Our Mission',
                text: 'To empower businesses with transformative technology, creating intelligent software that drives growth, efficiency, and a competitive edge in every market we touch.',
                color: '#a78bfa',
                tag: 'Mission',
                items: ['Client-first approach', 'Measurable outcomes', 'Long-term partnerships'],
              },
              {
                icon: <Eye size={28} />,
                title: 'Our Vision',
                text: 'To be a globally recognized leader in AI-driven innovation, known for our commitment to quality, client success, and shaping the technology of tomorrow.',
                color: '#38bdf8',
                tag: 'Vision',
                items: ['Global reach', 'AI-first thinking', 'Industry recognition'],
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeUp(i * 0.15)}
                className="group relative rounded-3xl p-8 overflow-hidden"
                style={{ background: 'linear-gradient(145deg,rgba(14,14,24,0.95),rgba(8,8,14,1))', border: '1px solid rgba(255,255,255,0.06)' }}
                whileHover={{ borderColor: `${card.color}50`, boxShadow: `0 0 60px ${card.color}15`, y: -4 }}
                transition={{ duration: 0.35 }}
              >
                {/* Glow top-right */}
                <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{ background: card.color }} />
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${card.color}70,transparent)` }} />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border" style={{ color: card.color, borderColor: `${card.color}30`, background: `${card.color}10` }}>
                      {card.icon}
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-black" style={{ color: card.color }}>{card.tag}</span>
                      <h3 className="font-display text-2xl font-bold text-white mt-0.5">{card.title}</h3>
                    </div>
                  </div>

                  <p className="text-neutral-400 leading-relaxed mb-8">{card.text}</p>

                  <ul className="space-y-2.5">
                    {card.items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                        <CheckCircle2 size={14} style={{ color: card.color }} className="shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          VALUES — horizontal card strip with stagger
      ════════════════════════════════════════ */}
      <section className="relative py-28 border-t border-neutral-800/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
                <Sparkles size={11} /> Core Values
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                What We Stand For
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed md:text-right">
              These principles guide every decision, every line of code, and every client interaction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl p-7 overflow-hidden flex flex-col"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', minHeight: '220px' }}
                whileHover={{ y: -6, borderColor: `${v.color}50`, boxShadow: `0 0 40px ${v.color}18` }}
              >
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" style={{ background: v.color }} />

                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border relative z-10" style={{ color: v.color, background: `${v.color}12`, borderColor: `${v.color}30` }}>
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 relative z-10">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed relative z-10 flex-1">{v.description}</p>

                <div className="mt-5 pt-4 border-t relative z-10 flex items-center gap-2" style={{ borderColor: `${v.color}15` }}>
                  <div className="w-6 h-[2px] rounded-full" style={{ background: v.color }} />
                  <span className="text-[10px] tracking-widest uppercase font-black opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: v.color }}>Learn more</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JOURNEY — Staggered chapter grid
      ════════════════════════════════════════ */}
      <section className="relative py-28 border-t border-neutral-800/50 overflow-hidden">
        {/* bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-[160px]" />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                The{' '}
                <span style={{ background: 'linear-gradient(90deg,#a78bfa,#f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Journey
                </span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed md:text-right">
              Six years of building, shipping, and growing — one chapter at a time.
            </p>
          </motion.div>

          {/* Chapter grid — 2 rows, 4 + 3 cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-3xl overflow-hidden cursor-default
                  ${i === 0 || i === 6 ? 'md:col-span-2' : 'md:col-span-1'}
                `}
                style={{
                  background: 'linear-gradient(145deg,rgba(14,14,24,0.95),rgba(8,8,14,1))',
                  border: `1px solid rgba(255,255,255,0.05)`,
                  minHeight: i % 3 === 0 ? '280px' : '220px',
                }}
                whileHover={{
                  borderColor: `${item.color}55`,
                  boxShadow: `0 0 50px ${item.color}15, 0 20px 60px rgba(0,0,0,0.5)`,
                  y: -4,
                }}
              >
                {/* Giant watermark year */}
                <div
                  className="absolute -bottom-4 -right-3 font-display font-black leading-none select-none pointer-events-none transition-opacity duration-500 opacity-[0.04] group-hover:opacity-[0.12]"
                  style={{
                    fontSize: 'clamp(4rem,10vw,7rem)',
                    color: item.color,
                  }}
                >
                  {item.year}
                </div>

                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg,transparent,${item.color}80,transparent)` }}
                  initial={{ opacity: 0.15 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Corner glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                  style={{ background: item.color }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  {/* Step badge + year */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-display text-xs font-black opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Title & desc */}
                  <div className="mt-auto">
                    <div className="w-6 h-[2px] rounded-full mb-3" style={{ background: item.color }} />
                    <h3 className="font-display text-base font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom animated progress bar */}
          <motion.div
            className="mt-12 h-px"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0, background: 'linear-gradient(90deg,#a78bfa,#f472b6,#38bdf8,transparent)' }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          TEAM — Cinematic hover cards
      ════════════════════════════════════════ */}
      <section className="relative py-28 border-t border-neutral-800/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-purple-500/6 rounded-full blur-[150px]" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-sky-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
                Our Team
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Meet the Experts
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed md:text-right">
              A tight-knit group of builders, designers, and strategists obsessed with quality.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                whileHover={{ borderColor: `${member.color}50`, y: -6, boxShadow: `0 20px 60px ${member.color}15` }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden aspect-[3/4]">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(60%)' }}
                    whileHover={{ scale: 1.06, filter: 'grayscale(0%)' }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  {/* Color accent top */}
                  <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg,transparent,${member.color},transparent)` }} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />

                  {/* Social links overlay */}
                  <motion.div
                    className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100"
                    initial={{ x: 10 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      { icon: <Linkedin size={13} />, href: member.social.li },
                      { icon: <Twitter size={13} />, href: member.social.tw },
                      { icon: <Github size={13} />, href: member.social.gh },
                    ].map((s, si) => (
                      <a key={si} href={s.href} className="w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                        style={{ background: 'rgba(0,0,0,0.6)', border: `1px solid ${member.color}40` }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </motion.div>

                  {/* Info at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="w-6 h-[2px] mb-2 rounded-full" style={{ background: member.color }} />
                    <h3 className="font-display text-base font-bold text-white leading-tight">{member.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: member.color }}>{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FAQ — Premium accordion
      ════════════════════════════════════════ */}
      <section className="relative py-28 border-t border-neutral-800/50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/4 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-5" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}>
              FAQ
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight">
              Common{' '}
              <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <motion.div
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    animate={isOpen
                      ? { borderColor: 'rgba(167,139,250,0.4)', boxShadow: '0 0 0 1px rgba(167,139,250,0.2), 0 8px 40px rgba(167,139,250,0.1)' }
                      : { borderColor: 'rgba(255,255,255,0.06)', boxShadow: 'none' }
                    }
                    style={{ border: '1px solid rgba(255,255,255,0.06)', background: isOpen ? 'rgba(14,14,28,0.98)' : 'rgba(255,255,255,0.02)' }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 p-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div
                        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black font-mono transition-all duration-300"
                        style={isOpen
                          ? { background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', color: '#fff', boxShadow: '0 4px 16px rgba(167,139,250,0.4)' }
                          : { background: 'rgba(255,255,255,0.05)', color: 'rgb(115,115,115)' }
                        }
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span className={`flex-1 font-display text-base font-semibold transition-colors duration-300 ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
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
                            <p className="text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
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
          CTA — Cinematic full-bleed
      ════════════════════════════════════════ */}
      <section className="relative py-36 border-t border-neutral-800/50 overflow-hidden">
        {/* Multi-layer bg */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[200px]" style={{ background: 'radial-gradient(ellipse,rgba(124,58,237,0.15),transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.18em] uppercase mb-8"
              style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.22)', color: '#a78bfa' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Let's Work Together
            </motion.div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6">
              <span className="text-white">Ready to Partner</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                With Us?
              </span>
            </h2>

            <p className="text-xl text-neutral-400 max-w-md mx-auto mb-12 leading-relaxed">
              Let's build something extraordinary together. Every great product starts with a conversation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary group text-base px-10 py-4">
                Get in Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/projects" className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors group">
                See Our Work <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Accent bottom line */}
            <motion.div
              className="mt-20 mx-auto h-px max-w-xs"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(167,139,250,0.5),rgba(244,114,182,0.5),transparent)' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;