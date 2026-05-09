import Link from "next/link";
import { ArrowRight, DollarSign, Sparkles, Users, Workflow } from "lucide-react";
import { RevenueAreaChart } from "@/components/charts/charts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthPill, StatusBadge } from "@/components/status";
import { clients, invoices, projects, recentActivity } from "@/lib/seed-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MotionSection } from "@/components/ui/motion";

export default function DashboardPage() {
  const activeClients = clients.filter((client) => client.status === "Active").length;
  const revenue = invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingActions = clients.filter((client) => client.status === "At Risk" || client.status === "Onboarding").length;
  const topClients = clients.slice(0, 6);

  return (
    <>
      <MotionSection className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <Badge>Portfolio showcase • Enterprise client management</Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">Client operations built for high-touch enterprise teams.</h1>
          <p className="max-w-3xl text-lg leading-8 text-zinc-400">NovaBridge Client OS brings relationships, projects, invoices, documents, messages, analytics, RBAC, and mocked AI assistance into one polished multi-tenant SaaS workspace.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/clients"><Button variant="gradient" size="lg">Explore clients <ArrowRight className="h-5 w-5" /></Button></Link>
            <Link href="/analytics"><Button variant="outline" size="lg">View analytics</Button></Link>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-cyan-400" /> AI briefing</CardTitle>
            <CardDescription>Mocked assistant summary for the weekly client leadership review.</CardDescription>
          </CardHeader>
          <CardContent className="text-base leading-7 text-zinc-300">Three strategic accounts show expansion potential this month. Atlas Meridian requires security-signoff attention, while NovaBridge Technologies is ready for phase-two proposal delivery.</CardContent>
        </Card>
      </MotionSection>

      <MotionSection className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active clients", activeClients.toString(), Users],
          ["Recognized revenue", formatCurrency(revenue), DollarSign],
          ["Open projects", projects.filter((project) => project.status !== "Done").length.toString(), Workflow],
          ["Pending actions", pendingActions.toString(), Sparkles]
        ].map(([label, value, Icon]) => (
          <Card key={label as string}>
            <CardContent className="p-6">
              <Icon className="mb-5 h-7 w-7 text-cyan-400" />
              <p className="text-base text-zinc-500">{label as string}</p>
              <p className="mt-2 font-heading text-3xl font-semibold text-white">{value as string}</p>
            </CardContent>
          </Card>
        ))}
      </MotionSection>

      <MotionSection className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue momentum</CardTitle>
            <CardDescription>12-month revenue trend from seeded portfolio data.</CardDescription>
          </CardHeader>
          <CardContent><RevenueAreaChart /></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Relationship events, AI notes, and invoice updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((item) => <div key={item} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4 text-base leading-7 text-zinc-300">{item}</div>)}
          </CardContent>
        </Card>
      </MotionSection>

      <MotionSection>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-white">Priority relationships</h2>
            <p className="mt-2 text-base text-zinc-400">Health scoring, last contact, and next action guidance.</p>
          </div>
          <Link href="/clients"><Button variant="secondary">All clients</Button></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {topClients.map((client) => (
            <Link href={`/clients/${client.id}`} key={client.id}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4"><CardTitle>{client.name}</CardTitle><HealthPill score={client.healthScore} /></div>
                  <CardDescription>{client.industry} • {client.city}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatusBadge status={client.status} />
                  <p className="text-base text-zinc-300">Next: {client.nextAction}</p>
                  <p className="text-sm text-zinc-500">Last contact {formatDate(client.lastContact)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </MotionSection>
    </>
  );
}
