import CreateEventForm from '@/components/CreateEventForm';

export default function AddEventPage() {
  return (
    <section id="create-event">
      <h1 className="!text-3xl lg:!text-4xl">Create a New Event</h1>
      <p className="text-light-200 mt-2">
        Fill in the details below to list your event.
      </p>

      <CreateEventForm />
    </section>
  );
}
