"use client";

import * as React from "react";
import { GripVertical } from "lucide-react";
import type { Project, ProjectStatus } from "@/lib/seed-data";
import { clients } from "@/lib/seed-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/status";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const columns: ProjectStatus[] = ["To Do", "In Progress", "Review", "Done"];

export function KanbanBoard({ projects }: { projects: Project[] }) {
  const [items, setItems] = React.useState(projects);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const move = (status: ProjectStatus) => {
    if (!dragging) return;
    setItems((current) => current.map((project) => project.id === dragging ? { ...project, status } : project));
    setDragging(null);
  };
  return (
    <div className="grid gap-5 xl:grid-cols-4">
      {columns.map((column) => {
        const columnProjects = items.filter((project) => project.status === column);
        return (
          <Card key={column} onDragOver={(event) => event.preventDefault()} onDrop={() => move(column)} className="min-h-96">
            <CardHeader>
              <CardTitle className="flex items-center justify-between"><span>{column}</span><Badge variant="outline">{columnProjects.length}</Badge></CardTitle>
              <CardDescription>Drop cards here to update project stage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {columnProjects.map((project) => {
                const client = clients.find((item) => item.id === project.clientId);
                return (
                  <article key={project.id} draggable onDragStart={() => setDragging(project.id)} onDragEnd={() => setDragging(null)} className="cursor-grab rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/40 active:cursor-grabbing">
                    <div className="mb-3 flex items-start justify-between gap-3"><GripVertical className="mt-1 h-5 w-5 text-zinc-600" /><StatusBadge status={project.priority} /></div>
                    <h3 className="font-heading text-xl font-semibold text-white">{project.name}</h3>
                    <p className="mt-2 text-base text-zinc-400">{client?.name}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-zinc-500">
                      <span>{formatCurrency(project.budget)}</span>
                      <span>{project.trackedHours}h tracked</span>
                      <span className="col-span-2">Due {formatDate(project.dueDate)}</span>
                    </div>
                    <div className="mt-4 rounded-xl bg-white/[0.06] p-3 text-sm text-zinc-400">Milestone: {project.milestone}</div>
                  </article>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
