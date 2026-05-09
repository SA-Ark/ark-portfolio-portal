import { Dialog } from "@/components/ui/dialog";
import { PaymentHistoryChart } from "@/components/payment-history-chart";
import { StatusBadge } from "@/components/status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clients, invoices } from "@/lib/seed-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function InvoicesPage() {
  const paid = invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const pending = invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  return (
    <>
      <section className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Invoicing</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Stripe-style billing workspace with invoice detail dialogs, payment status, line items, and payment history visualization.</p>
      </section>
      <section className="grid gap-5 md:grid-cols-3">
        <Card><CardContent className="p-6"><p className="text-base text-zinc-500">Collected</p><p className="mt-2 font-heading text-3xl font-semibold text-white">{formatCurrency(paid)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-base text-zinc-500">Outstanding</p><p className="mt-2 font-heading text-3xl font-semibold text-white">{formatCurrency(pending)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-base text-zinc-500">Overdue count</p><p className="mt-2 font-heading text-3xl font-semibold text-white">{invoices.filter((invoice) => invoice.status === "Overdue").length}</p></CardContent></Card>
      </section>
      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader><CardTitle>Invoice list</CardTitle><CardDescription>50+ seeded invoices with realistic K–200K amounts.</CardDescription></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Client</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead><TableHead></TableHead></TableRow></TableHeader>
                <TableBody>
                  {invoices.slice(0, 28).map((invoice) => {
                    const client = clients.find((item) => item.id === invoice.clientId);
                    return <TableRow key={invoice.id}><TableCell className="font-medium text-white">{invoice.id}<span className="block text-sm text-zinc-500">Due {formatDate(invoice.dueDate)}</span></TableCell><TableCell>{client?.name}</TableCell><TableCell><StatusBadge status={invoice.status} /></TableCell><TableCell>{formatCurrency(invoice.amount)}</TableCell><TableCell><Dialog title={`${invoice.id} details`} trigger={<Button variant="secondary" size="sm">View</Button>}><div className="space-y-6"><div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"><p className="text-sm text-zinc-500">Bill to</p><p className="mt-1 text-xl font-semibold text-white">{client?.name}</p><p className="mt-2 text-base text-zinc-400">Issued {formatDate(invoice.issueDate)} • Due {formatDate(invoice.dueDate)}</p></div><div className="space-y-3">{invoice.lineItems.map((item) => <div key={item.label} className="flex items-center justify-between rounded-2xl bg-zinc-900 p-4 text-base"><span>{item.label}</span><span>{formatCurrency(item.amount)}</span></div>)}</div><div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-xl font-semibold"><span>Total</span><span>{formatCurrency(invoice.amount)}</span></div></div></Dialog></TableCell></TableRow>;
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Payment history</CardTitle><CardDescription>Monthly collections and outstanding balance trends.</CardDescription></CardHeader>
          <CardContent><PaymentHistoryChart /></CardContent>
        </Card>
      </section>
    </>
  );
}
