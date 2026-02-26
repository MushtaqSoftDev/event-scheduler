'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    overview: '',
    image: '',
    venue: '',
    location: '',
    date: '',
    time: '',
    mode: 'offline' as 'online' | 'offline' | 'hybrid',
    audience: '',
    agenda: '',
    organizer: '',
    tags: '',
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const agendaList = form.agenda.split('\n').map((s) => s.trim()).filter(Boolean);
    const tagsList = form.tags.split(',').map((s) => s.trim()).filter(Boolean);

    if (agendaList.length === 0) {
      setStatus('error');
      setErrorMsg('At least one agenda item is required');
      return;
    }

    if (tagsList.length === 0) {
      setStatus('error');
      setErrorMsg('At least one tag is required');
      return;
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          agenda: agendaList,
          tags: tagsList,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to create event');
        return;
      }

      router.push(`/events/${data.slug}`);
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Event Title</label>
        <input
          id="title"
          type="text"
          placeholder="e.g. React Summit 2026"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          required
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="overview">Overview (short summary)</label>
        <textarea
          id="overview"
          placeholder="A brief overview of the event..."
          value={form.overview}
          onChange={(e) => updateField('overview', e.target.value)}
          required
          maxLength={500}
          className="!min-h-[80px]"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Full Description</label>
        <textarea
          id="description"
          placeholder="Detailed description of the event..."
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          required
          maxLength={1000}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          type="text"
          placeholder="https://example.com/event-banner.jpg or /images/event.png"
          value={form.image}
          onChange={(e) => updateField('image', e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="venue">Venue</label>
          <input
            id="venue"
            type="text"
            placeholder="e.g. Convention Center Hall A"
            value={form.venue}
            onChange={(e) => updateField('venue', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="e.g. San Francisco, CA"
            value={form.location}
            onChange={(e) => updateField('location', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="text"
            placeholder="e.g. 09:00 AM"
            value={form.time}
            onChange={(e) => updateField('time', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mode">Mode</label>
          <select
            id="mode"
            value={form.mode}
            onChange={(e) => updateField('mode', e.target.value)}
            required
          >
            <option value="offline">Offline (In-Person)</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="organizer">Organizer</label>
          <input
            id="organizer"
            type="text"
            placeholder="e.g. Tech Events Inc."
            value={form.organizer}
            onChange={(e) => updateField('organizer', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="audience">Target Audience</label>
        <input
          id="audience"
          type="text"
          placeholder="e.g. Frontend developers, React engineers"
          value={form.audience}
          onChange={(e) => updateField('audience', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="agenda">Agenda (one item per line)</label>
        <textarea
          id="agenda"
          placeholder={"Opening keynote\nWorkshop: Hands-on React\nPanel discussion\nNetworking session"}
          value={form.agenda}
          onChange={(e) => updateField('agenda', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          placeholder="e.g. React, Frontend, JavaScript, Web"
          value={form.tags}
          onChange={(e) => updateField('tags', e.target.value)}
          required
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
          {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
}
