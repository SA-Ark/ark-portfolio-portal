import { KanbanBoard } from "@/components/kanban-board";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/seed-data";

export default function ProjectsPage() {
  return (
    <>
      <section className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Project management</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Drag cards across stages to simulate a live project Kanban board with milestones, budgets, owners, priorities, and time tracking.</p>
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Delivery board</CardTitle>
          <CardDescription>48 seeded projects across enterprise client accounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <KanbanBoard projects={projects} />
        </CardContent>
      </Card>
    </>
  );
}
