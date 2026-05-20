export interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    excerpt: string;
    image: string;
    featured: boolean;
    content?: string[];
}

export const posts: BlogPost[] = [
    {
        id: 1,
        title: 'The Future of AI in Software Development',
        category: 'AI Solutions',
        author: 'Siam Ahmed',
        date: 'July 29, 2024',
        readTime: '7 min',
        excerpt: 'Explore how AI is revolutionizing the software development lifecycle.',
        image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
        featured: true,
        content: [
            "Artificial Intelligence (AI) is no longer just a buzzword; it's a transformative force reshaping the software development landscape.",
            "From automated code generation to intelligent debugging and testing, AI tools are empowering developers to build faster, smarter, and more reliable software.",
            "## The Rise of AI-Assisted Coding",
            "Tools like GitHub Copilot and ChatGPT have demonstrated the potential of LLMs in assisting developers. These tools can generate boilerplate code, suggest optimizations, and even explain complex logic.",
            "## Automated Testing and Debugging",
            "AI-driven testing frameworks can automatically generate test cases, identify edge cases, and even predict potential failure points before deployment.",
            "## The Future is Collaborative",
            "The future of software development isn't about AI replacing developers, but rather AI augmenting human creativity and problem-solving skills."
        ]
    },
    {
        id: 2,
        title: 'Scaling SaaS Platforms with AWS',
        category: 'Case Studies',
        author: 'Sarah Chen',
        date: 'July 25, 2024',
        readTime: '9 min',
        excerpt: 'Architecture and strategies for scaling high-traffic SaaS applications.',
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop',
        featured: true,
        content: [
            "Scaling a SaaS platform to handle millions of users requires a robust and flexible architecture.",
            "AWS provides a comprehensive suite of services that enable developers to build scalable, resilient, and high-performance applications.",
            "## Key Strategies for Scaling",
            "1. **Microservices Architecture:** Breaking down monolithic applications into smaller, independent services.",
            "2. **Serverless Computing:** Using AWS Lambda to run code without provisioning or managing servers.",
            "3. **Database Scaling:** Leveraging Amazon Aurora and DynamoDB for high availability and performance."
        ]
    },
    {
        id: 3,
        title: 'UI/UX Principles for Conversion',
        category: 'Design',
        author: 'Marcus Johnson',
        date: 'July 22, 2024',
        readTime: '5 min',
        excerpt: 'Core design principles that improve engagement and conversion rates.',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop',
        featured: false,
        content: [
            "Good design is not just about making things look pretty; it's about solving problems and guiding users towards their goals.",
            "## Clarity and Simplicity",
            "A cluttered interface confuses users. Focus on clarity and simplicity to ensure that users can easily find what they are looking for.",
            "## Visual Hierarchy",
            "Use size, color, and spacing to create a visual hierarchy that guides the user's eye to the most important elements.",
            "## Consistency",
            "Consistent design elements build trust and make the interface easier to learn and use."
        ]
    },
    {
        id: 4,
        title: 'Getting Started with Google Tag Manager',
        category: 'Marketing',
        author: 'Emily Park',
        date: 'July 18, 2024',
        readTime: '6 min',
        excerpt: 'A beginner-friendly guide to GTM and analytics insights.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        featured: false,
        content: [
            "Google Tag Manager (GTM) is a powerful tool that allows marketers to manage and deploy marketing tags without modifying code.",
            "## Why Use GTM?",
            "- **Agility:** Marketers can add and update tags quickly without relying on developers.",
            "- **Accuracy:** Reduces the risk of errors associated with manual tagging.",
            "- **Performance:** GTM loads tags asynchronously, improving page load speeds."
        ]
    },
    {
        id: 5,
        title: 'Building Secure APIs with Node.js',
        category: 'Development',
        author: 'Sarah Chen',
        date: 'July 15, 2024',
        readTime: '8 min',
        excerpt: 'Creating secure token-based authentication for Node.js APIs.',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
        featured: false,
        content: [
            "Security is a top priority when building APIs. Node.js offers a robust ecosystem for implementing secure authentication and authorization mechanisms.",
            "## Token-Based Authentication",
            "JSON Web Tokens (JWT) are a popular standard for securing APIs. They allow you to transmit information securely between parties as a JSON object.",
            "## Implementing JWT in Node.js",
            "1. Install `jsonwebtoken` package.",
            "2. Create a middleware to verify tokens.",
            "3. Protect sensitive routes with the middleware."
        ]
    },
];
