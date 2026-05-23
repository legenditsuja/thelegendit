import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import type { Theme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={15} className="text-amber-500" /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={15} className="text-violet-400" /> },
    { value: 'system', label: 'System', icon: <Monitor size={15} className="text-neutral-500 dark:text-neutral-400" /> },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={18} className="text-amber-500 transition-transform duration-300 hover:rotate-45" />;
      case 'dark':
        return <Moon size={18} className="text-violet-400 transition-transform duration-300 hover:-rotate-12" />;
      default:
        return resolvedTheme === 'dark' 
          ? <Monitor size={18} className="text-violet-400" /> 
          : <Monitor size={18} className="text-amber-500" />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1.5 p-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-sm hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500 transition-colors focus:outline-none"
        aria-label="Toggle theme"
      >
        <span className="flex items-center justify-center w-5 h-5">
          {getThemeIcon()}
        </span>
        <ChevronDown size={12} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-36 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl p-1.5 z-[100] backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1">
              {themeOptions.map((option) => {
                const isActive = theme === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      setIsOpen(false);
                    }}
                    className={`relative flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-neutral-100 dark:bg-neutral-900 text-purple-600 dark:text-purple-400'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {option.icon}
                    </span>
                    <span>{option.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeThemeDot"
                        className="absolute right-3 w-1 h-1 rounded-full bg-purple-500"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
