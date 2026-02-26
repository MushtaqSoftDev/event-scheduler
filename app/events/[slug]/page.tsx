import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import RegistrationForm from '@/components/RegistrationForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;

  await connectDB();
  const event = await Event.findOne({ slug }).lean();

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="event">
      <Link href="/" className="flex items-center gap-2 text-light-200 hover:text-white mb-6 w-fit transition-colors">
        <Image src="/icons/pin.svg" alt="back" width={14} height={14} className="rotate-90" />
        Back to Events
      </Link>

      <div className="header">
        <div className="flex flex-wrap gap-2 mb-2">
          {event.tags.map((tag: string) => (
            <span key={tag} className="pill">{tag}</span>
          ))}
        </div>
        <h1 className="!text-4xl lg:!text-5xl">{event.title}</h1>
        <p>{event.overview}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={900}
            height={457}
            className="banner"
            priority
          />

          <div className="flex-col-gap-2">
            <h2>About the Event</h2>
            <p>{event.description}</p>
          </div>

          <div className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="location" width={16} height={16} />
                <p><strong>Location:</strong> {event.location}</p>
              </div>
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="venue" width={16} height={16} />
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="date" width={16} height={16} />
                <p><strong>Date:</strong> {formattedDate}</p>
              </div>
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="time" width={16} height={16} />
                <p><strong>Time:</strong> {event.time}</p>
              </div>
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="mode" width={16} height={16} />
                <p><strong>Mode:</strong> {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}</p>
              </div>
              <div className="flex-row-gap-2">
                <Image src="/icons/pin.svg" alt="organizer" width={16} height={16} />
                <p><strong>Organizer:</strong> {event.organizer}</p>
              </div>
            </div>
          </div>

          <div className="flex-col-gap-2">
            <h2>Target Audience</h2>
            <p>{event.audience}</p>
          </div>

          <div className="agenda">
            <h2>Agenda</h2>
            <ul>
              {event.agenda.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <RegistrationForm slug={slug} eventTitle={event.title} />
          </div>
        </aside>
      </div>
    </section>
  );
}
