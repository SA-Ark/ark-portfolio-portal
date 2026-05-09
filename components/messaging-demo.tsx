"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { messages, projects } from "@/lib/seed-data";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MessagingDemo() {
  const [projectId, setProjectId] = React.useState(projects[0].id);
  const [extra, setExtra] = React.useState<string[]>([]);
  const thread = messages.filter((message) => message.projectId === projectId).slice(0, 10);
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  return (
    <div className="grid gap-8 xl:grid-cols-[0.45fr_1fr]">
      <Card>
        <CardHeader><CardTitle>Project threads</CardTitle><CardDescription>Mock WebSocket channels.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {projects.slice(0, 14).map((item) => <button key={item.id} onClick={() => { setProjectId(item.id); setExtra([]); }} className={`w-full rounded-2xl border p-4 text-left text-base transition ${projectId === item.id ? "border-cyan-400 bg-cyan-400/10 text-white" : "border-white/[0.06] bg-white/[0.04] text-zinc-300 hover:border-zinc-700"}`}>{item.name}<span className="mt-1 block text-sm text-zinc-500">{item.status} • {item.owner}</span></button>)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{project.name}</CardTitle><CardDescription>Realistic message history with simulated live sends.</CardDescription></CardHeader>
        <CardContent>
          <div className="mb-6 max-h-[640px] space-y-4 overflow-y-auto pr-2">
            {[...thread.map((message) => ({ id: message.id, author: message.author, role: message.role, body: message.body, date: message.sentAt })), ...extra.map((body, index) => ({ id: `extra-${index}`, author: "Maya Chen", role: "Manager" as const, body, date: new Date().toISOString() }))].map((message) => <div key={message.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4"><div className="mb-2 flex flex-wrap items-center gap-2"><p className="text-base font-medium text-white">{message.author}</p><Badge variant="outline">{message.role}</Badge><span className="text-sm text-zinc-500">{formatDate(message.date)}</span></div><p className="text-base leading-7 text-zinc-300">{message.body}</p></div>)}
          </div>
          <form className="flex gap-3" onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; const input = form.elements.namedItem("message") as HTMLInputElement; if (input.value.trim()) { setExtra((current) => [...current, input.value.trim()]); input.value = ""; } }}>
            <Input name="message" placeholder="Type a message to simulate WebSocket delivery..." />
            <Button variant="gradient" type="submit"><Send className="h-5 w-5" /></Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
