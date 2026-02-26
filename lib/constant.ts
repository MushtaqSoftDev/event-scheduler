export type EventItem = {
    image: string;
    title: string;
    slug: string;
    description: string;
    overview: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: 'online' | 'offline' | 'hybrid';
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
};

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: 'World Artificial Intelligence Cannes Festival',
        slug: 'world-artificial-intelligence-cannes-festival-2026',
        description: 'The World AI Cannes Festival (WAICF) is the premier international gathering dedicated to exploring breakthroughs in artificial intelligence. Bringing together researchers, industry leaders, and startups, this festival offers deep dives into generative AI, robotics, ethics, and real-world deployments across healthcare, finance, and sustainability.',
        overview: 'Three days of keynotes, panels, workshops, and demos showcasing cutting-edge AI research and enterprise applications. Network with 10,000+ attendees from 90 countries.',
        venue: 'Palais des Festivals et des Congrès',
        location: 'Cannes, France',
        date: '2026-02-12',
        time: '09:00 AM',
        mode: 'offline',
        audience: 'AI researchers, ML engineers, data scientists, CTOs, and tech investors',
        agenda: [
            'Opening keynote: The State of AI in 2026',
            'Panel: Responsible AI — Regulation & Ethics',
            'Workshop: Fine-tuning Large Language Models',
            'Demo arena: Startup pitches & live product demos',
            'Networking reception & awards ceremony',
        ],
        organizer: 'WAICF Organization Committee',
        tags: ['AI', 'Machine Learning', 'Deep Learning', 'GenAI', 'Robotics'],
    },
    {
        image: '/images/event.jpeg',
        title: 'MWC Summit Spain',
        slug: 'mwc-summit-barcelona-2026',
        description: 'Mobile World Congress (MWC) Barcelona is the world\'s most influential connectivity event. It showcases the latest innovations in 5G, IoT, AI-powered networks, and immersive technologies while bringing together mobile operators, device manufacturers, and technology providers from every corner of the globe.',
        overview: 'Four-day summit featuring 2,000+ exhibitors, 100+ hours of content, and demos from the biggest names in telecom and mobile technology.',
        venue: 'Fira Barcelona Gran Via',
        location: 'Barcelona, Spain',
        date: '2026-03-05',
        time: '09:00 AM',
        mode: 'hybrid',
        audience: 'Telecom engineers, mobile developers, IoT specialists, and connectivity leaders',
        agenda: [
            'Keynote: 6G Vision & the Road Ahead',
            'Track: AI-Native Networks',
            'Track: Immersive Experiences — AR/VR/XR',
            'Exhibit hall tours with guided demos',
            'Ministerial programme & policy roundtables',
        ],
        organizer: 'GSMA',
        tags: ['5G', 'IoT', 'Mobile', 'Telecom', 'AR/VR'],
    },
    {
        image: '/images/event2.png',
        title: 'CloudFest',
        slug: 'sustainability-of-everything',
        description: 'CloudFest is the world\'s largest cloud industry conference, uniting hosting providers, SaaS companies, and infrastructure engineers. This year\'s theme — "Sustainability of Everything" — puts the spotlight on green computing, energy-efficient data centers, and sustainable software architecture.',
        overview: 'Three days of talks, hackathons, and executive meet-ups inside Europe-Park, blending serious tech content with a one-of-a-kind venue experience.',
        venue: 'Europa-Park Resort',
        location: 'Europe-Park, Germany',
        date: '2026-03-23',
        time: '09:00 AM',
        mode: 'offline',
        audience: 'Cloud architects, DevOps engineers, hosting providers, and SaaS founders',
        agenda: [
            'Opening: Sustainability of Everything — Why It Matters Now',
            'Workshop: Carbon-Aware Kubernetes Scheduling',
            'Panel: Green Data Centers — From Hype to Reality',
            'Hackathon: Build a Zero-Waste Cloud App',
            'CloudFest Night — networking party in the park',
        ],
        organizer: 'CloudFest GmbH',
        tags: ['Cloud', 'Sustainability', 'DevOps', 'Kubernetes', 'SaaS'],
    },
    {
        image: '/images/event3.png',
        title: 'DEVDAYS EUROPE',
        slug: 'devdays-europe-2026',
        description: 'DEVDAYS Europe is the premier developer conference in the Baltics, covering modern software engineering practices from cloud-native development and platform engineering to AI-assisted coding. The event attracts passionate developers who want to sharpen their skills and learn directly from industry practitioners.',
        overview: 'Two days of hands-on workshops and inspiring talks by 60+ international speakers in the heart of Vilnius.',
        venue: 'Simbiocity Nova',
        location: 'Simbiocity Nova, Vilnius',
        date: '2026-05-20',
        time: '09:00 AM',
        mode: 'offline',
        audience: 'Full-stack developers, platform engineers, and software architects',
        agenda: [
            'Keynote: The Developer Experience Revolution',
            'Track: Platform Engineering Best Practices',
            'Workshop: Building Production-Ready AI Agents',
            'Track: Modern Frontend — Server Components & Beyond',
            'Closing panel: What\'s Next for Software Engineering?',
        ],
        organizer: 'DEVDAYS Team',
        tags: ['Software Engineering', 'Platform Engineering', 'AI', 'Frontend', 'Cloud Native'],
    },
    {
        image: '/images/event4.png',
        title: 'HumanX',
        slug: '#1-AI-Gathering-2026',
        description: 'HumanX is the #1 AI gathering that bridges the gap between cutting-edge AI research and human-centric design. Held in San Francisco, it brings together the brightest minds in AI safety, alignment, human-computer interaction, and enterprise AI adoption to shape the future of human-AI collaboration.',
        overview: 'Three days of curated conversations, live demos, and fireside chats with AI pioneers. Limited to 3,000 attendees for maximum engagement.',
        venue: 'Moscone Center',
        location: 'San Francisco, California',
        date: '2026-06-09',
        time: '09:00 AM',
        mode: 'hybrid',
        audience: 'AI leaders, product managers, UX researchers, and enterprise decision-makers',
        agenda: [
            'Opening: The Human Side of AI',
            'Fireside chat: AI Safety & Alignment in Practice',
            'Workshop: Designing AI-First Products',
            'Demo showcase: Enterprise AI Case Studies',
            'Closing: Building Trust in AI Systems',
        ],
        organizer: 'HumanX Foundation',
        tags: ['AI', 'Human-AI Interaction', 'AI Safety', 'Enterprise AI', 'UX'],
    },
    {
        image: '/images/event5.png',
        title: 'Teck Week London',
        slug: 'london-tech-week-2026',
        description: 'London Tech Week is the UK\'s flagship technology festival, celebrating innovation across fintech, healthtech, cybersecurity, and deep tech. The week-long series of events spans multiple venues across London and attracts founders, investors, policymakers, and technologists from around the world.',
        overview: 'A week of 200+ events including keynotes at Queen Elizabeth II Centre, satellite meetups, startup showcases, and policy forums.',
        venue: 'Queen Elizabeth II Centre & multiple venues',
        location: 'London, UK',
        date: '2026-06-08',
        time: '09:00 AM',
        mode: 'hybrid',
        audience: 'Tech founders, investors, policymakers, and senior engineers',
        agenda: [
            'Opening ceremony & keynote address',
            'Track: Fintech Innovation & Open Banking',
            'Track: Cybersecurity in the Age of AI',
            'Startup pitch competition & investor matchmaking',
            'Closing gala & awards night',
        ],
        organizer: 'London & Partners',
        tags: ['Fintech', 'Cybersecurity', 'Deep Tech', 'Startups', 'Innovation'],
    },
];

export default events;
