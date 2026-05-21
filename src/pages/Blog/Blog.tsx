import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Clock, User, Calendar, ArrowRight,
  Sparkles, Tag, TrendingUp, X, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CursorGlow from '../../components/CursorGlow/CursorGlow';
import { posts } from '../../data/blogData';

/* ─── Category colour map ─── */
const CAT_THEME: Record<string, { color: string; glow: string; dim: string }> = {
  'All': { color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', dim: 'rgba(167,139,250,0.09)' },
  'AI Solutions': { color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', dim: 'rgba(167,139,250,0.09)' },
  'Case Studies': { color: '#38bdf8', glow: 'rgba(56,189,248,0.35)', dim: 'rgba(56,189,248,0.09)' },
  'Design': { color: '#f472b6', glow: 'rgba(244,114,182,0.35)', dim: 'rgba(244,114,182,0.09)' },
  'Marketing': { color: '#fb923c', glow: 'rgba(251,146,60,0.35)', dim: 'rgba(251,146,60,0.09)' },
  'Development': { color: '#34d399', glow: 'rgba(52,211,153,0.35)', dim: 'rgba(52,211,153,0.09)' },
};
const t = (cat: string) => CAT_THEME[cat] ?? CAT_THEME['All'];

const CATEGORIES = ['All', 'AI Solutions', 'Development', 'Design', 'Case Studies', 'Marketing'];

/* ─── Featured hero card ─── */
const FeaturedCard: React.FC<{ post: typeof posts[0]; index: number }> = ({ post, index }) => {
  const theme = t(post.category);
  const big = index === 0;

  return (
    <Link to={`/blog/${post.id}`} className={big ? 'lg:row-span-2' : ''}>
      <motion.article
        className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
        style={{ minHeight: big ? 480 : 220 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
      >
        {/* Image */}
        <motion.img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'grayscale(30%)' }}
          whileHover={{ scale: 1.06, filter: 'grayscale(0%)' }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

        {/* Glow border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }}
          whileHover={{ boxShadow: `0 0 0 1.5px ${theme.color}50, 0 16px 60px ${theme.glow}` }}
          transition={{ duration: 0.35 }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-7 flex flex-col justify-end z-10">
          {/* Top badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md"
              style={{ color: theme.color, borderColor: `${theme.color}45`, background: 'rgba(0,0,0,0.65)' }}
            >
              {post.category}
            </span>
            {post.featured && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 text-amber-400 bg-black/60 border border-amber-400/30">
                <Sparkles size={8} /> Featured
              </span>
            )}
          </div>

          {/* Text */}
          <div>
            <h3 className={`font-display font-black text-white leading-tight mb-3 ${big ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
              {post.title}
            </h3>
            {big && (
              <p className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5"><User size={11} />{post.author}</span>
                <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
              </div>
              <motion.div
                className="flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100"
                style={{ color: theme.color }}
                initial={{ x: -6 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.2 }}
              >
                Read more <ChevronRight size={12} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

/* ─── Regular post card ─── */
const PostCard: React.FC<{ post: typeof posts[0]; index: number }> = ({ post, index }) => {
  const theme = t(post.category);

  return (
    <Link to={`/blog/${post.id}`}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="group cursor-pointer h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-300"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(160deg,#0e0e1c,#080810)' }}
        whileHover={{
          y: -6,
          boxShadow: `0 0 0 1.5px ${theme.color}45, 0 16px 48px ${theme.glow}`,
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(45%)' }}
            whileHover={{ scale: 1.08, filter: 'grayscale(0%)' }}
            transition={{ duration: 0.55 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1c] via-transparent to-transparent" />

          {/* Category badge */}
          <div
            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md"
            style={{ color: theme.color, borderColor: `${theme.color}40`, background: 'rgba(0,0,0,0.7)' }}
          >
            {post.category}
          </div>

          {/* Accent top strip */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${theme.color}80, transparent)` }}
            initial={{ opacity: 0.2 }}
            whileHover={{ opacity: 1 }}
          />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-display text-[15px] font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-white transition-colors">
            {post.title}
          </h3>
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-3 border-t"
            style={{ borderColor: `${theme.color}15` }}
          >
            <div className="flex items-center gap-3 text-[11px] text-neutral-500">
              <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
            </div>
            <motion.span
              className="flex items-center gap-1 text-[11px] font-bold"
              style={{ color: theme.color }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
            >
              Read <ArrowRight size={10} />
            </motion.span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

/* ─── Main Blog Page ─── */
const Blog: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() =>
    posts.filter(post => {
      const catOk = activeCategory === 'All' || post.category === activeCategory;
      const q = searchTerm.toLowerCase();
      const srchOk = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return catOk && srchOk;
    }), [activeCategory, searchTerm]);

  const featuredPosts = useMemo(() => filteredPosts.filter(p => p.featured), [filteredPosts]);
  const regularPosts = useMemo(() => filteredPosts.filter(p => !p.featured), [filteredPosts]);

  return (
    <main className="bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white transition-colors duration-300">
      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[800px] h-[800px] bg-purple-600/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-600/6  rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[56vh] flex items-center overflow-hidden pt-8">
        <CursorGlow containerRef={heroRef} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            {/* Left */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm"
              >
                <TrendingUp size={13} className="text-purple-400" />
                <span className="text-sm text-purple-300">Blog & Insights</span>
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
              >
                <span className="text-white">Insights &</span>
                <br />
                <span className="text-shimmer">Resources</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle mt-6 text-neutral-400 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Deep dives into AI, software engineering, and digital innovation — from experts who build it.
              </motion.p>
            </div>

            {/* Right — stats */}
            <motion.div
              className="flex gap-8 flex-shrink-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { val: posts.length.toString(), label: 'Articles' },
                { val: CATEGORIES.length - 1 + '+', label: 'Topics' },
                { val: '5+', label: 'Authors' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-4xl font-black text-white">{val}</p>
                  <p className="text-xs text-neutral-500 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sticky search + filter bar ── */}
      <div className="sticky top-0 z-40 border-y border-neutral-200/50 dark:border-neutral-800/50 py-4 backdrop-blur-xl bg-white/85 dark:bg-black/85 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search articles…"
              className="w-full h-10 pl-9 pr-9 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 border border-neutral-200 focus:border-neutral-355 dark:text-white dark:placeholder-neutral-600 dark:border-neutral-800 dark:focus:border-neutral-600 transition-colors outline-none bg-neutral-100/50 dark:bg-white/5"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  <X size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto flex-shrink-0">
            {CATEGORIES.map(cat => {
              const theme = t(cat);
              const active = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all duration-300"
                  style={active
                    ? { color: theme.color, borderColor: `${theme.color}45`, background: theme.dim, boxShadow: `0 0 14px ${theme.glow}` }
                    : { color: 'rgb(115,115,115)', borderColor: 'rgba(255,255,255,0.07)', background: 'transparent' }
                  }
                >
                  <Tag size={10} />
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* Result count */}
          {(searchTerm || activeCategory !== 'All') && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-neutral-500 flex-shrink-0 hidden lg:block"
            >
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
            </motion.p>
          )}
        </div>
      </div>

      {/* ── Featured grid ── */}
      <AnimatePresence>
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles size={14} className="text-amber-400" />
                <h2 className="font-display text-lg font-bold text-white">Featured</h2>
              </div>

              {/* Asymmetric featured grid: big card left, 2 smaller right */}
              <div className="grid lg:grid-cols-3 gap-5 lg:grid-rows-2">
                {featuredPosts.slice(0, 1).map((post) => (
                  <FeaturedCard key={post.id} post={post} index={0} />
                ))}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featuredPosts.slice(1, 3).map((post, i) => (
                    <FeaturedCard key={post.id} post={post} index={i + 1} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* ── Latest articles ── */}
      <section className={`pb-24 ${featuredPosts.length > 0 ? 'border-t border-neutral-800/40 pt-16' : 'pt-16'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-lg font-bold text-white">
              {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
            </h2>
            <span className="text-xs text-neutral-500">
              {regularPosts.length} article{regularPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <Search size={44} className="text-neutral-800 mb-4" />
              <p className="text-neutral-400 font-medium">No articles found</p>
              <p className="text-neutral-600 text-sm mt-1 mb-5">Try a different search or category</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="px-5 py-2 rounded-xl border border-neutral-700 text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {regularPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 border-t border-neutral-800/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
              <Sparkles size={22} className="text-purple-400" />
            </div>

            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
                Stay <span className="text-purple-400">Updated</span>
              </h2>
              <p className="mt-4 text-neutral-400 max-w-md mx-auto">
                Get the latest insights on AI, technology, and digital innovation delivered to your inbox.
              </p>
            </div>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-12 px-5 rounded-2xl text-sm text-neutral-900 placeholder-neutral-400 border border-neutral-200 focus:border-neutral-300 dark:text-white dark:placeholder-neutral-600 dark:border-neutral-800 dark:focus:border-neutral-650 transition-colors outline-none bg-neutral-100/50 dark:bg-white/5"
              />
              <motion.button
                type="submit"
                className="h-12 px-6 rounded-2xl font-bold text-sm text-black flex items-center gap-2 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', boxShadow: '0 6px 28px rgba(167,139,250,0.35)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe <ArrowRight size={14} />
              </motion.button>
            </form>

            <p className="text-xs text-neutral-600">No spam. Unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blog;