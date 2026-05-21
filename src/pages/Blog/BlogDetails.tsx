import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Clock, User, Calendar, Share2, Tag,
    BookOpen, ChevronRight, Copy, Check, ArrowRight, Sparkles,
} from 'lucide-react';
import { posts } from '../../data/blogData';

/* ─── Category accent colours ─── */
const CAT_THEME: Record<string, { color: string; glow: string; dim: string }> = {
    'AI Solutions': { color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', dim: 'rgba(167,139,250,0.1)' },
    'Case Studies': { color: '#38bdf8', glow: 'rgba(56,189,248,0.4)', dim: 'rgba(56,189,248,0.1)' },
    'Design': { color: '#f472b6', glow: 'rgba(244,114,182,0.4)', dim: 'rgba(244,114,182,0.1)' },
    'Marketing': { color: '#fb923c', glow: 'rgba(251,146,60,0.4)', dim: 'rgba(251,146,60,0.1)' },
    'Development': { color: '#34d399', glow: 'rgba(52,211,153,0.4)', dim: 'rgba(52,211,153,0.1)' },
};

const getTheme = (cat: string) =>
    CAT_THEME[cat] ?? { color: '#a78bfa', glow: 'rgba(167,139,250,0.4)', dim: 'rgba(167,139,250,0.1)' };

/* ─── Related Post Card ─── */
const RelatedCard: React.FC<{ post: typeof posts[0]; index: number }> = ({ post, index }) => {
    const theme = getTheme(post.category);
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className="group"
        >
            <Link to={`/blog/${post.id}`} className="block">
                <motion.div
                    className="rounded-2xl overflow-hidden border transition-all duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(160deg,#0e0e1c,#080810)' }}
                    whileHover={{ boxShadow: `0 0 0 1.5px ${theme.color}50, 0 12px 40px ${theme.glow}` }}
                >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                        <motion.img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            style={{ filter: 'grayscale(40%)' }}
                            whileHover={{ scale: 1.07, filter: 'grayscale(0%)' }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {/* Category badge */}
                        <div
                            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md"
                            style={{ color: theme.color, borderColor: `${theme.color}40`, background: 'rgba(0,0,0,0.6)' }}
                        >
                            {post.category}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h4 className="font-display text-sm font-bold text-white leading-snug line-clamp-2 mb-3 group-hover:text-opacity-90">
                            {post.title}
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                                <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                                <span className="flex items-center gap-1"><Calendar size={10} />{post.date}</span>
                            </div>
                            <motion.div
                                className="flex items-center gap-1 text-[11px] font-bold"
                                style={{ color: theme.color }}
                                animate={{ x: 0 }}
                                whileHover={{ x: 3 }}
                            >
                                Read <ChevronRight size={11} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

/* ─── Content renderer ─── */
const renderContent = (content: string[], color: string) =>
    content.map((block, i) => {
        if (block.startsWith('## ')) {
            return (
                <motion.h2
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-display text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mt-14 mb-5 flex items-center gap-3"
                >
                    <span className="w-1 h-7 rounded-full flex-shrink-0" style={{ background: color }} />
                    {block.replace('## ', '')}
                </motion.h2>
            );
        }
        return (
            <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.04 }}
                className="text-neutral-600 dark:text-neutral-400 leading-[1.9] mb-6 text-[15px] md:text-base"
            >
                {block}
            </motion.p>
        );
    });

/* ─── Main Page ─── */
const BlogDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = posts.find((p) => p.id === Number(id));
    const theme = post ? getTheme(post.category) : getTheme('');

    const [copied, setCopied] = useState(false);
    const [readPercent, setReadPercent] = useState(0);
    const articleRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({ target: articleRef, offset: ['start start', 'end end'] });

    // Reading progress bar
    useEffect(() => {
        const unsub = scrollYProgress.on('change', (v) => setReadPercent(Math.round(v * 100)));
        return unsub;
    }, [scrollYProgress]);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, []);

    const related = post
        ? posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
        : [];
    // Fallback: if not enough same-category posts, fill with others
    const extras = post
        ? posts.filter((p) => p.id !== post.id && p.category !== post.category)
        : [];
    const relatedPosts = [...related, ...extras].slice(0, 3);

    if (!post) {
        return (
            <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white flex flex-col items-center justify-center p-6 gap-6 transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                    <BookOpen size={28} className="text-neutral-400 dark:text-neutral-500" />
                </div>
                <h2 className="text-2xl font-display font-bold">Post not found</h2>
                <p className="text-neutral-500 text-sm">This article doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/blog')} className="btn-primary">
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <main className="bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white transition-colors duration-300 min-h-screen">
            {/* ── Reading progress bar ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
                style={{
                    scaleX: scrollYProgress,
                    background: `linear-gradient(90deg, ${theme.color}, ${theme.glow})`,
                }}
            />

            {/* ── Ambient background ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[180px] opacity-20"
                    style={{ background: theme.color }}
                />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            {/* ── Hero header ── */}
            <section className="relative pt-28 pb-0 px-6 lg:px-8">
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Back link */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-10 group text-sm"
                        >
                            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>
                    </motion.div>

                    <div className="max-w-3xl">
                        {/* Category + read time */}
                        <motion.div
                            className="flex flex-wrap items-center gap-3 mb-6"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                                style={{ color: theme.color, borderColor: `${theme.color}40`, background: theme.dim }}
                            >
                                <Tag size={9} />
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                                <Clock size={12} />
                                {post.readTime} read
                            </span>
                            {post.featured && (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                                    <Sparkles size={9} />
                                    Featured
                                </span>
                            )}
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-black text-neutral-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.7 }}
                        >
                            {post.title}
                        </motion.h1>

                        {/* Author row */}
                        <motion.div
                            className="flex flex-wrap items-center gap-5 pb-10 border-b"
                            style={{ borderColor: `${theme.color}18` }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.28 }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center border text-xs font-bold"
                                    style={{ color: theme.color, borderColor: `${theme.color}40`, background: theme.dim }}
                                >
                                    {post.author.split(' ').map(w => w[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold leading-none">{post.author}</p>
                                    <p className="text-neutral-500 text-xs mt-0.5">Author</p>
                                </div>
                            </div>
                            <div className="h-5 w-px bg-neutral-800" />
                            <span className="flex items-center gap-1.5 text-sm text-neutral-400">
                                <Calendar size={13} style={{ color: theme.color }} />
                                {post.date}
                            </span>
                            {/* Share button */}
                            <div className="ml-auto">
                                <motion.button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-300"
                                    style={copied
                                        ? { color: '#34d399', borderColor: '#34d39940', background: 'rgba(52,211,153,0.08)' }
                                        : { color: 'rgb(115,115,115)', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }
                                    }
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {copied
                                            ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5"><Check size={12} />Copied!</motion.span>
                                            : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5"><Copy size={12} /><Share2 size={12} />Share</motion.span>
                                        }
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Featured Image ── */}
            <section className="px-6 lg:px-8 mt-10 mb-0">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="relative aspect-video rounded-3xl overflow-hidden border"
                        style={{ borderColor: `${theme.color}20` }}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Reading percent badge */}
                        <motion.div
                            className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold text-white"
                            style={{ background: 'rgba(0,0,0,0.65)', borderColor: 'rgba(255,255,255,0.1)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <BookOpen size={11} style={{ color: theme.color }} />
                            {readPercent}% read
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Article body (2-col layout) ── */}
            <article ref={articleRef} className="relative max-w-6xl mx-auto px-6 lg:px-8 py-16">
                <div className="flex gap-14 items-start">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        {post.content
                            ? renderContent(post.content, theme.color)
                            : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-neutral-400 leading-[1.9] text-base"
                                >
                                    {post.excerpt}
                                </motion.p>
                            )
                        }

                        {/* Tags / share footer */}
                        <motion.div
                            className="mt-16 pt-10 border-t flex flex-wrap items-center justify-between gap-4"
                            style={{ borderColor: `${theme.color}18` }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                                    style={{ color: theme.color, borderColor: `${theme.color}40`, background: theme.dim }}
                                >
                                    {post.category}
                                </span>
                                <span className="text-xs text-neutral-600">{post.readTime} read</span>
                            </div>
                            <motion.button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-600 transition-all"
                                style={{ background: 'rgba(255,255,255,0.03)' }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {copied ? <><Check size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /><Share2 size={12} /> Share article</>}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Sticky sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Reading progress card */}
                            <motion.div
                                className="rounded-2xl border p-5"
                                style={{ borderColor: `${theme.color}25`, background: 'rgba(255,255,255,0.02)' }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: theme.color }}>
                                    Reading Progress
                                </p>
                                <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden mb-2">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${readPercent}%`,
                                            background: `linear-gradient(90deg, ${theme.color}, ${theme.glow})`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-neutral-500">{readPercent}% complete</p>
                            </motion.div>

                            {/* Post meta */}
                            <motion.div
                                className="rounded-2xl border p-5 space-y-4"
                                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Article Info</p>
                                {[
                                    { icon: <User size={12} />, label: 'Author', val: post.author },
                                    { icon: <Calendar size={12} />, label: 'Published', val: post.date },
                                    { icon: <Clock size={12} />, label: 'Read time', val: post.readTime },
                                ].map(({ icon, label, val }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="mt-0.5" style={{ color: theme.color }}>{icon}</div>
                                        <div>
                                            <p className="text-[10px] text-neutral-600 uppercase tracking-wider">{label}</p>
                                            <p className="text-xs text-neutral-300 font-medium">{val}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Share */}
                            <motion.button
                                onClick={handleCopy}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all duration-300"
                                style={copied
                                    ? { color: '#34d399', borderColor: '#34d39940', background: 'rgba(52,211,153,0.08)' }
                                    : { color: theme.color, borderColor: `${theme.color}35`, background: theme.dim }
                                }
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                {copied ? <><Check size={13} /> Link copied!</> : <><Share2 size={13} /> Share article</>}
                            </motion.button>
                        </div>
                    </aside>
                </div>
            </article>

            {/* ── Related posts ── */}
            {relatedPosts.length > 0 && (
                <section className="border-t py-20 px-6 lg:px-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <motion.p
                                    className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1"
                                    style={{ color: theme.color }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    Keep Reading
                                </motion.p>
                                <motion.h2
                                    className="font-display text-2xl md:text-3xl font-bold text-white"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    Related Articles
                                </motion.h2>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to="/blog"
                                    className="hidden sm:flex items-center gap-2 text-xs font-bold transition-all"
                                    style={{ color: theme.color }}
                                >
                                    View all posts <ArrowRight size={13} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {relatedPosts.map((p, i) => (
                                <RelatedCard key={p.id} post={p} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="py-28 px-6 lg:px-8 border-t border-neutral-800 relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-10"
                    style={{ background: theme.color }}
                />
                <div className="max-w-2xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                            Ready to build something{' '}
                            <span style={{ color: theme.color }}>amazing?</span>
                        </h2>
                        <p className="text-neutral-400 text-lg mb-8">
                            Let's turn your ideas into reality. Talk to our team today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/contact" className="btn-primary group text-base px-9 py-4">
                                Start a Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/blog" className="btn-secondary text-base px-9 py-4">
                                More Articles
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default BlogDetails;
