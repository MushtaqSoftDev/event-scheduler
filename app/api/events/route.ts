import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title, description, overview, image, venue,
      location, date, time, mode, audience,
      agenda, organizer, tags,
    } = body;

    if (!title || !description || !overview || !image || !venue ||
        !location || !date || !time || !mode || !audience ||
        !agenda?.length || !organizer || !tags?.length) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title, description, overview, image, venue,
      location, date, time, mode, audience,
      agenda, organizer, tags,
    });

    return NextResponse.json(
      { message: 'Event created successfully!', slug: event.slug },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('POST /api/events error:', error);

    if (error instanceof Error && error.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'An event with this title already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
