import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, Send } from 'lucide-react';
import CursorGlow from '../../components/CursorGlow/CursorGlow';
// import ContactHero3D from '../../components/ContactHero3D/ContactHero3D';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const Contact: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = React.useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'info@thelegendit.com', href: 'mailto:info@thelegendit.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+880 1304 984 437', href: 'tel:+8801304984437' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Bashundhara R/A, Dhaka', href: '#' },
    { icon: <Clock size={20} />, label: 'Hours', value: 'Mon - Fri, 9AM - 6PM BST', href: '#' },
  ];

  const faqs = [
    { q: 'What is the first step to start a project?', a: 'Get in touch through this form or email us. We\'ll schedule a free discovery call.' },
    { q: 'How long to get a project quote?', a: 'After the discovery call, we typically provide a proposal within 3-5 business days.' },
    { q: 'Do you work with non-technical founders?', a: 'Yes! We guide non-technical founders through the entire development process.' },
    { q: 'What post-launch support do you provide?', a: 'We offer flexible support and maintenance packages for long-term success.' },
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const contactFormEndpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '').trim();
      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
      const normalizedApiBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
      const contactEndpoint = contactFormEndpoint || (normalizedApiBaseUrl ? `${normalizedApiBaseUrl}/api/contact` : '/api/contact');

      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type') || '';
      let result: { message?: string; errors?: Array<{ message?: string }> } = {};

      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const responseText = await response.text();

        if (responseText.toLowerCase().includes('<!doctype') || responseText.toLowerCase().includes('<html')) {
          throw new Error('Contact API is not reachable from this domain. Please configure the production API URL.');
        }

        throw new Error('Unexpected server response. Please try again later.');
      }

      if (!response.ok) {
        const providerError = result.errors?.find((item) => item?.message)?.message;
        throw new Error(providerError || result.message || 'Unable to send your message right now.');
      }

      setSubmitMessage({ type: 'success', text: 'Thanks! Your message has been sent successfully.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send your message right now.';
      setSubmitMessage({ type: 'error', text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden py-12 md:py-16 lg:py-20">
        <CursorGlow containerRef={heroRef} />

        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] animate-subtle-glow" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-subtle-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm">
                <span className="text-sm text-purple-300">Contact Us</span>
              </motion.div>

              <h1 className="hero-title">
                <span className="text-white">Let's Build</span>
                <br />
                <span className="text-shimmer bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">Something Great</span>
              </h1>

              <p className="hero-subtitle mt-6 max-w-xl text-neutral-300">
                Have a project in mind or just want to say hello?
                We'd love to hear from you.
              </p>
            </motion.div>

            {/* Right 3D Model */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden md:block h-[500px] w-full relative"
            >
              {/* <ContactHero3D /> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-12 md:py-16 lg:py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className="p-6 md:p-8 lg:p-10 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                <h2 className="font-display text-2xl font-bold text-white mb-8">Send us a message</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-neutral-300 mb-2">Your Name</label>
                      <input type="text" id="name" className="input" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-neutral-300 mb-2">Email Address</label>
                      <input type="email" id="email" className="input" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-neutral-300 mb-2">Phone Number</label>
                    <input type="tel" id="phone" className="input" placeholder="+8801XXXXXXXXX" value={formData.phone} onChange={handleInputChange} required />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm text-neutral-300 mb-2">Company (Optional)</label>
                    <input type="text" id="company" className="input" placeholder="Your Company" value={formData.company} onChange={handleInputChange} />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm text-neutral-300 mb-2">What can we help with?</label>
                    <select id="service" className="input" value={formData.service} onChange={handleInputChange} required>
                      <option value="" className="bg-white dark:bg-black text-neutral-950 dark:text-white">Select a service</option>
                      <option value="web" className="bg-white dark:bg-black text-neutral-950 dark:text-white">Web Development</option>
                      <option value="ai" className="bg-white dark:bg-black text-neutral-950 dark:text-white">AI & Machine Learning</option>
                      <option value="design" className="bg-white dark:bg-black text-neutral-950 dark:text-white">UI/UX Design</option>
                      <option value="mobile" className="bg-white dark:bg-black text-neutral-950 dark:text-white">Mobile Development</option>
                      <option value="consulting" className="bg-white dark:bg-black text-neutral-950 dark:text-white">Technical Consulting</option>
                      <option value="other" className="bg-white dark:bg-black text-neutral-950 dark:text-white">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm text-neutral-300 mb-2">Project Details</label>
                    <textarea id="message" rows={5} className="input resize-none" placeholder="Tell us about your project, timeline, and budget..." value={formData.message} onChange={handleInputChange} required />
                  </div>

                  {submitMessage && (
                    <p className={submitMessage.type === 'success' ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>
                      {submitMessage.text}
                    </p>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center text-base py-4 group disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6">
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href} className="flex items-start gap-4 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">{item.label}</p>
                    <p className="font-display font-medium text-white">{item.value}</p>
                  </div>
                </a>
              ))}

              <div className="rounded-2xl overflow-hidden border border-neutral-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29205.9453439261!2d90.4022279486328!3d23.789744900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a097d13911%3A0x2fe57059737f795a!2sBashundhara%20Residential%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1722204569123!5m2!1sen!2sbd"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-900/30 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.1 }} className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/50">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/30 transition-colors">
                  <span className="font-display font-medium text-white">{faq.q}</span>
                  <ChevronDown size={20} className={`text-neutral-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={false} animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }} className="overflow-hidden">
                  <p className="px-6 pb-6 text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;