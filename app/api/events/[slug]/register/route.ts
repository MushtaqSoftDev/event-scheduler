import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import Booking from '@/database/booking.model';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const { name, email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const existingBooking = await Booking.findOne({
      eventId: event._id,
      email: email.toLowerCase().trim(),
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You have already registered for this event' },
        { status: 409 }
      );
    }

    const booking = await Booking.create({
      eventId: event._id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
    });

    return NextResponse.json(
      { message: 'Registration successful!', bookingId: booking._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/events/[slug]/register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
