'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';

interface Props {
  slug: string;
  eventTitle: string;
}

export default function RegistrationForm({ slug, eventTitle }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(`/api/events/${slug}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Registration failed');
        return;
      }

      posthog.capture('event_registered', {
        event_slug: slug,
        event_title: eventTitle,
      });

      router.push(`/bookings/${data.bookingId}`);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="book-event">
      <h2>Register for this Event</h2>
      <p className="text-light-200 text-sm">
        Fill in your details below to secure your spot.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {status === 'error' && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
            {message}
          </div>
        )}

        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    </section>
  );
}
