import mongoose from 'mongoose';
import Event from '../database/event.model';
import { events } from './constant';

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined. Make sure .env has MONGODB_URI set.');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Event.deleteMany({});
  console.log('Cleared existing events');

  for (const event of events) {
    await Event.create(event);
    console.log(`Seeded "${event.title}" (slug: ${event.slug})`);
  }

  console.log('Seeding complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
