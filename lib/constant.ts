export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;  // e.g '2026-11-05'
    time: string;  // 09:00 AM
};

export const events: EventItem[] = [
    {
        image: '/images/event1.png',
        title: 'World Artificial Intelligence Cannes Festival',
        slug: 'world-artificial-intelligence-cannes-festival-2026',
        location: 'Cannes, France',
        date: '2026-02-12',
        time: '09:00 AM',
    },
    {
        image: '/images/event.jpeg',
        title: 'MWC Summit Spain',
        slug: 'mwc-summit-barcelona-2026',
        location: 'Barcelona, Spain',
        date: '2026-03-05',
        time: '09:00 AM',
    },
    {
        image: '/images/event2.png',
        title: 'CloudFest',
        slug: 'sustainability-of-everything',
        location: 'Europe-Park, Germany',
        date: '2026-03-23',
        time: '09:00 AM',
    },
    {
        image: '/images/event3.png',
        title: 'DEVDAYS EUROPE',
        slug: 'devdays-europe-2026',
        location: 'Simbiocity Nova, Vilnius',
        date: '2026-05-20',
        time: '09:00 AM',
    },
    {
        image: '/images/event4.png',
        title: 'HumanX',
        slug: '#1-AI-Gathering-2026',
        location: 'San Francisco, California',
        date: '2026-06-09',
        time: '09:00 AM',
    },
     {
        image: '/images/event5.png',
        title: 'Teck Week London',
        slug: 'london-tech-week-2026',
        location: 'London, UK',
        date: '2026-06-08',
        time: '09:00 AM',
    },
];

export default events;