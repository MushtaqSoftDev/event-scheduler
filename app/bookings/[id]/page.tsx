import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Booking from '@/database/booking.model';
import Event from '@/database/event.model';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingConfirmationPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const booking = await Booking.findById(id).lean();
  if (!booking) notFound();

  const event = await Event.findById(booking.eventId).lean();
  if (!event) notFound();

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const registeredOn = new Date(booking.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section id="booking-confirmation">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 border border-green-700 rounded-full mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="!text-3xl lg:!text-4xl">Registration Confirmed!</h1>
          <p className="text-light-200 mt-2">You have successfully registered for this event.</p>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-xl p-6 mb-8 space-y-6">
          <h2 className="font-schibsted-grotesk text-xl font-bold border-b border-gray-700 pb-3">
            Your Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-light-200 text-sm">Full Name</p>
              <p className="text-white text-lg font-medium">{booking.name}</p>
            </div>
            <div>
              <p className="text-light-200 text-sm">Email Address</p>
              <p className="text-white text-lg font-medium">{booking.email}</p>
            </div>
            <div>
              <p className="text-light-200 text-sm">Registered On</p>
              <p className="text-white text-lg font-medium">{registeredOn}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-100 border border-dark-200 rounded-xl overflow-hidden mb-8">
          <Image
            src={event.image}
            alt={event.title}
            width={700}
            height={300}
            className="w-full h-[200px] object-cover"
          />
          <div className="p-6 space-y-4">
            <h2 className="font-schibsted-grotesk text-xl font-bold">
              {event.title}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <span className="text-light-200">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="venue" width={14} height={14} />
                <span className="text-light-200">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="date" width={14} height={14} />
                <span className="text-light-200">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="time" width={14} height={14} />
                <span className="text-light-200">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="mode" width={14} height={14} />
                <span className="text-light-200">{event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/pin.svg" alt="organizer" width={14} height={14} />
                <span className="text-light-200">{event.organizer}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map((tag: string) => (
                <span key={tag} className="pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/events/${event.slug}`}
            className="bg-dark-200 hover:bg-dark-200/80 text-white text-center rounded-lg px-6 py-3 transition-colors"
          >
            View Event Details
          </Link>
          <Link
            href="/"
            className="bg-blue hover:bg-blue/80 text-dark-100 text-center font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    </section>
  );
}
