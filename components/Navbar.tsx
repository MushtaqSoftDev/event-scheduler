'use client';
import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';

export default function Navbar() {
    const handleLogoClick = () => {
        posthog.capture('logo_clicked', {
            nav_element: 'logo',
        });
    };

    const handleNavClick = (navItem: string) => {
        posthog.capture(`nav_${navItem}_clicked`, {
            nav_element: navItem,
        });
    };

    return (
        <header>
            <nav>
                <Link href='/' className='logo' onClick={handleLogoClick}>
                    <Image src='/icons/logo.png' alt='Logo' width={24} height={24} />

                    <p>Tech Event</p>
                </Link>
                <ul>
                    <Link href="/" onClick={() => handleNavClick('home')}>Home</Link>
                    <Link href="/events" onClick={() => handleNavClick('events')}>Events</Link>
                    <Link href="/add-event" onClick={() => handleNavClick('create_event')}>Create Event</Link>
                </ul>
            </nav>
        </header>
    )
}