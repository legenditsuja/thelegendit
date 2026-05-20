import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '/services' },
      { name: 'AI & Machine Learning', href: '/services' },
      { name: 'UI/UX Design', href: '/services' },
      { name: 'Software & SaaS', href: '/services' },
      { name: 'Digital Marketing', href: '/services' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/contact' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Case Studies', href: '/projects' },
      { name: 'Documentation', href: '/blog' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
    ],
  };

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-black border-t border-neutral-800">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/NEEXZEN%20LOGO_LARGE.png"
                alt="Neexzen Logo"
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-6 text-neutral-400 text-sm leading-relaxed max-w-sm">
              Building breakthrough software solutions for the modern enterprise.
              We transform ideas into powerful digital experiences.
            </p>

            <div className="mt-8 space-y-3">
              <a href="mailto:info@neexzen.com" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors">
                <Mail size={16} className="text-purple-400" />
                info@neexzen.com
              </a>
              <a href="tel:+8801304984437" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors">
                <Phone size={16} className="text-purple-400" />
                +880 1304 984 437
              </a>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="text-purple-400" />
                Bashundhara R/A, Dhaka
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white">Ready to start your project?</h3>
              <p className="mt-1 text-sm text-neutral-300">Let's discuss how we can help transform your business.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-black bg-white hover:bg-neutral-100 rounded-full transition-all group"
            >
              Get in Touch
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {currentYear} Neexzen. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
              <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;