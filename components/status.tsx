import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const variant = status === "Paid" || status === "Active" || status === "Done" ? "success" : status === "Overdue" || status === "At Risk" || status === "Critical" ? "danger" : status === "Pending" || status === "Review" || status === "Onboarding" ? "warning" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}

export function HealthPill({ score }: { score: number }) {
  const color = score >= 85 ? "text-emerald-300 bg-emerald-500/10 ring-emerald-500/30" : score >= 70 ? "text-amber-300 bg-amber-500/10 ring-amber-500/30" : "text-rose-300 bg-rose-500/10 ring-rose-500/30";
  return <span className={`inline-flex min-w-16 items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ${color}`}>{score}</span>;
}

export function HealthBreakdown({ health }: { health: { responseTimeTrend: number; meetingFrequency: number; invoicePaymentSpeed: number; messageSentiment: number } }) {
  const rows = [
    ["Response time trend", health.responseTimeTrend],
    ["Meeting frequency", health.meetingFrequency],
    ["Invoice payment speed", health.invoicePaymentSpeed],
    ["Message sentiment", health.messageSentiment]
  ] as const;
  return (
    <div className="space-y-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="mb-2 flex items-center justify-between text-base"><span className="text-zinc-300">{label}</span><span className="font-medium text-white">{value}%</span></div>
          <div className="h-2 rounded-full bg-white/[0.06]"><div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${value}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
