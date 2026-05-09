import Link from "next/link";
import { Mail, Phone, MapPin, FileText, MessageSquare, BriefcaseBusiness } from "lucide-react";
import { SmartCompose, SchedulingPanel, DocumentSummarizer } from "@/components/ai/ai-panels";
import { HealthBreakdown, HealthPill, StatusBadge } from "@/components/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getClient, getClientDocuments, getClientInvoices, getClientMessages, getClientProjects } from "@/lib/seed-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MotionSection } from "@/components/ui/motion";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getClient(id);
  const clientProjects = getClientProjects(client.id);
  const clientInvoices = getClientInvoices(client.id);
  const clientMessages = getClientMessages(client.id);
  const clientDocuments = getClientDocuments(client.id);

  return (
    <>
      <MotionSection className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3"><StatusBadge status={client.status} /><Badge variant="outline">{client.tier}</Badge></div>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">{client.name}</h1>
          <p className="text-lg leading-8 text-zinc-400">{client.industry} relationship led by {client.owner}. Next recommended action: {client.nextAction}.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient">Start QBR brief</Button>
            <Link href="/projects"><Button variant="outline">Open projects</Button></Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4"><CardTitle>Client health score</CardTitle><HealthPill score={client.healthScore} /></div>
            <CardDescription>AI-assisted scoring based on four relationship signals.</CardDescription>
          </CardHeader>
          <CardContent><HealthBreakdown health={client.health} /></CardContent>
        </Card>
      </MotionSection>

      <MotionSection className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          [Mail, client.email, "Primary email"],
          [Phone, client.phone, "Phone"],
          [MapPin, client.city, "Location"],
          [FileText, formatCurrency(client.arr), "Annual recurring revenue"]
        ].map(([Icon, value, label]) => (
          <Card key={label as string}><CardContent className="p-6"><Icon className="mb-4 h-6 w-6 text-cyan-400" /><p className="text-sm text-zinc-500">{label as string}</p><p className="mt-2 text-base font-medium text-white">{value as string}</p></CardContent></Card>
        ))}
      </MotionSection>

      <MotionSection className="grid gap-8 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BriefcaseBusiness className="h-6 w-6 text-cyan-400" /> Project timeline</CardTitle><CardDescription>Current and historical delivery milestones.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {(clientProjects.length ? clientProjects : []).map((project) => (
              <div key={project.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4">
                <div className="flex items-start justify-between gap-4"><p className="text-base font-medium text-white">{project.name}</p><StatusBadge status={project.status} /></div>
                <p className="mt-2 text-sm text-zinc-500">{project.milestone} • due {formatDate(project.dueDate)} • {project.trackedHours}h tracked</p>
              </div>
            ))}
            {!clientProjects.length ? <p className="text-base text-zinc-400">No active project records for this seeded account.</p> : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Invoices</CardTitle><CardDescription>Stripe-style invoice status and line item summary.</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>
              <TableBody>
                {clientInvoices.slice(0, 6).map((invoice) => <TableRow key={invoice.id}><TableCell>{invoice.id}<span className="block text-sm text-zinc-500">Due {formatDate(invoice.dueDate)}</span></TableCell><TableCell><StatusBadge status={invoice.status} /></TableCell><TableCell>{formatCurrency(invoice.amount)}</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </MotionSection>

      <MotionSection className="grid gap-8 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Documents</CardTitle><CardDescription>Client vault with version history.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {clientDocuments.slice(0, 5).map((doc) => <div key={doc.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4"><p className="text-base font-medium text-white">{doc.name}</p><p className="text-sm text-zinc-500">{doc.folder} • {doc.version} • {formatDate(doc.updatedAt)}</p></div>)}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6 text-violet-400" /> Message thread</CardTitle><CardDescription>Mocked real-time project conversation history.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {clientMessages.slice(0, 7).map((message) => <div key={message.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4"><div className="mb-2 flex flex-wrap items-center gap-2"><p className="text-base font-medium text-white">{message.author}</p><Badge variant="outline">{message.role}</Badge><span className="text-sm text-zinc-500">{formatDate(message.sentAt)}</span></div><p className="text-base leading-7 text-zinc-300">{message.body}</p></div>)}
          </CardContent>
        </Card>
      </MotionSection>

      <MotionSection className="grid gap-8 xl:grid-cols-3">
        <SmartCompose clientName={client.name} />
        <SchedulingPanel />
        <DocumentSummarizer />
      </MotionSection>
    </>
  );
}
