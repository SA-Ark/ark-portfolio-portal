"use client";

import * as React from "react";
import { CalendarClock, Sparkles, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

export function SmartCompose({ clientName }: { clientName: string }) {
  const [loading, setLoading] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-cyan-400" /> Smart Compose</CardTitle>
        <CardDescription>Generate a polished proposal follow-up from project context.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="gradient" onClick={() => { setLoading(true); setTimeout(() => { setDraft(`Hi ${clientName} team,\n\nThank you for the productive roadmap session. Based on the current milestones, we recommend prioritizing the client analytics rollout, procurement approval path, and a two-week enablement sprint. Ark Portal can deliver the next phase within six weeks with weekly executive readouts and a shared risk tracker.\n\nIf helpful, I can hold Tuesday 10:30 AM or Thursday 2:00 PM for a decision meeting.\n\nBest,\nMaya`); setLoading(false); }, 900); }}>
          {loading ? "Generating draft..." : "Generate proposal email"}
        </Button>
        <Textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="AI-generated draft appears here..." />
      </CardContent>
    </Card>
  );
}

export function SchedulingPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><CalendarClock className="h-6 w-6 text-violet-400" /> AI Scheduling</CardTitle>
        <CardDescription>Suggested meeting windows based on stakeholder availability and urgency.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {["Tue, Feb 10 • 10:30–11:15 AM PT", "Wed, Feb 11 • 1:00–1:45 PM PT", "Thu, Feb 12 • 2:00–2:45 PM PT"].map((time) => (
          <div key={time} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4 text-base text-zinc-200">{time}</div>
        ))}
      </CardContent>
    </Card>
  );
}

export function DocumentSummarizer() {
  const [summary, setSummary] = React.useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><UploadCloud className="h-6 w-6 text-cyan-400" /> Document Summarizer</CardTitle>
        <CardDescription>Mock contract upload that returns a pre-generated executive summary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <button onClick={() => setSummary(true)} className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-white/[0.04] p-8 text-center transition hover:border-cyan-400 hover:bg-blue-500/5">
          <UploadCloud className="mb-3 h-8 w-8 text-zinc-400" />
          <span className="text-base text-zinc-200">Drop Master Services Agreement.pdf</span>
          <span className="text-sm text-zinc-500">Click to simulate upload and summarize</span>
        </button>
        {summary ? (
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-base leading-7 text-blue-100">
            Summary: 24-month managed services agreement with quarterly roadmap reviews, SOC 2 data handling requirements, milestone-based invoicing, and a 30-day termination assistance clause. No unusual indemnity language detected.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
