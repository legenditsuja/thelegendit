import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

const Terms: React.FC = () => {
    const lastUpdated = 'February 16, 2026';

    const sections = [
        {
            icon: <CheckCircle className="w-6 h-6 text-purple-400" />,
            title: 'Acceptance of Terms',
            content: [
                'By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
                'If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
                'These materials are protected by applicable copyright and trademark law.'
            ]
        },
        {
            icon: <FileText className="w-6 h-6 text-blue-400" />,
            title: 'Use License',
            content: [
                'Permission is granted to temporarily download one copy of the materials (information or software) on The Legend It\'s website for personal, non-commercial transitory viewing only.',
                'This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.',
                'Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).',
                'Attempt to decompile or reverse engineer any software contained on The Legend It\'s website.'
            ]
        },
        {
            icon: <AlertTriangle className="w-6 h-6 text-pink-400" />,
            title: 'Disclaimer',
            content: [
                'The materials on The Legend It\'s website are provided on an "as is" basis. The Legend It makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.',
                'Further, The Legend It does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.'
            ]
        },
        {
            icon: <Scale className="w-6 h-6 text-green-400" />,
            title: 'Limitations',
            content: [
                'In no event shall The Legend It or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Legend It\'s website.',
                'Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.'
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
                            <span className="text-neutral-900 dark:text-white">Terms of</span> <span className="text-shimmer">Service</span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Please read these terms and conditions carefully before using our service.
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
                    <h3 className="text-2xl font-display font-bold mb-4 text-neutral-900 dark:text-white">Questions regarding our terms?</h3>
                    <p className="text-neutral-400 mb-8">
                        If you have any questions or concerns about our Terms of Service, please contact us.
                    </p>
                    <a
                        href="mailto:info@The Legend It.com"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </main>
    );
};

export default Terms;
