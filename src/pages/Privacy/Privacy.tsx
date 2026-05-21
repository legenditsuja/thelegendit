import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
    const lastUpdated = 'February 16, 2026';

    const sections = [
        {
            icon: <Shield className="w-6 h-6 text-purple-400" />,
            title: 'Information We Collect',
            content: [
                'Personal Information: Name, email address, phone number, and company details when you contact us or request a quote.',
                'Usage Data: IP address, browser type, device information, and pages visited to analyze and improve our services.',
                'Cookies: We use cookies to enhance your browsing experience and remember your preferences.'
            ]
        },
        {
            icon: <Lock className="w-6 h-6 text-blue-400" />,
            title: 'How We Use Your Information',
            content: [
                'To provide and maintain our services',
                'To notify you about changes to our services',
                'To provide customer support',
                'To gather analysis or valuable information so that we can improve our services',
                'To monitor the usage of our services',
                'To detect, prevent and address technical issues'
            ]
        },
        {
            icon: <Eye className="w-6 h-6 text-pink-400" />,
            title: 'Data Security',
            content: [
                'We implement appropriate technical and organizational measures to maintain the safety of your personal information.',
                'Your data is stored on secure servers and protected against unauthorized access, alteration, disclosure, or destruction.',
                'However, no method of transmission over the Internet or method of electronic storage is 100% secure.'
            ]
        },
        {
            icon: <FileText className="w-6 h-6 text-green-400" />,
            title: 'Your Rights',
            content: [
                'You have the right to access, update, or delete your personal information.',
                'You can object to the processing of your personal data.',
                'You can request a copy of the data we adhere to.',
                'To exercise these rights, please contact us at info@thelegendit.com.'
            ]
        }
    ];

    return (
        <main className="bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white transition-colors duration-300 min-h-screen pt-24 pb-12">
            {/* Hero Section */}
            <section className="relative px-6 lg:px-8 mb-20">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                            <span className="text-neutral-900 dark:text-white">Privacy</span> <span className="text-shimmer">Policy</span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            We value your privacy and are committed to protecting your personal data.
                            Here's how we collect, use, and safeguard your information.
                        </p>
                        <p className="mt-4 text-sm text-neutral-500">
                            Last Updated: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-neutral-100/50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-purple-500/20 transition-colors duration-300"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 p-3 bg-neutral-200 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                    {section.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-display font-bold mb-4 text-neutral-900 dark:text-white">
                                        {section.title}
                                    </h2>
                                    <ul className="space-y-3">
                                        {section.content.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 mt-2.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center p-12 rounded-3xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
                >
                    <h3 className="text-2xl font-display font-bold mb-4 text-neutral-900 dark:text-white">Have questions about your privacy?</h3>
                    <p className="text-neutral-400 mb-8">
                        If you have any questions or structure about our Privacy Policy, please contact us.
                    </p>
                    <a
                        href="mailto:info@thelegendit.com"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </main>
    );
};

export default Privacy;
