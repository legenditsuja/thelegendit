import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Code, Smartphone, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Web Development', description: 'Websites, e-commerce & apps', icon: <Code size={18} />, color: 'purple' },
        { name: 'Mobile Application', description: 'iOS & Android apps', icon: <Smartphone size={18} />, color: 'blue' },
        { name: 'AI Integration', description: 'RAG, agents & LLMs', icon: <Brain size={18} />, color: 'emerald' },
      ],
    },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar - Hidden for now
      <div className="fixed top-0 left-0 right-0 z-50 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm">
          <span className="text-white/90">Free AI consultation for startups</span>
          <Link to="/contact" className="text-white font-medium inline-flex items-center gap-1 hover:underline underline-offset-2">
            Book now <ArrowRight size={12} />
          </Link>
        </div>
      </div>
      */}

      {/* Main Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-neutral-800' : 'bg-transparent'
        }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'}`}>
            <Link to="/" className="flex items-center gap-2 group">
             <h1 className='text-2xl font-bold'>The Legend It</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                      }`
                    }
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </NavLink>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 py-2 w-72 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to="/services"
                            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-800 transition-colors"
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dropItem.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                              dropItem.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-emerald-500/10 text-emerald-400'
                              }`}>
                              {dropItem.icon}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{dropItem.name}</p>
                              <p className="text-xs text-neutral-400">{dropItem.description}</p>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact" className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-neutral-100 rounded-full transition-all duration-200">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 -mr-2 text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-neutral-900 border-l border-neutral-700 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-display font-bold text-white">Menu</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-lg font-medium rounded-xl transition-all ${isActive ? 'text-white bg-neutral-800' : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-neutral-700">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-black bg-white hover:bg-neutral-100 rounded-full transition-all"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;
