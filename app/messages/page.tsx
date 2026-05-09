import { MessagingDemo } from "@/components/messaging-demo";

export default function MessagesPage() {
  return (
    <>
      <section className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Real-time messaging</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Mocked WebSocket chat interface for project threads with realistic seeded client, manager, staff, and AI-assistant messages.</p>
      </section>
      <MessagingDemo />
    </>
  );
}
