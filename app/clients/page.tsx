import { ClientTable } from "@/components/client-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clients } from "@/lib/seed-data";
import { MotionSection } from "@/components/ui/motion";

export default function ClientsPage() {
  return (
    <>
      <MotionSection className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Client portfolio</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Searchable, filterable relationship table with health score indicators, account ownership, annual recurring revenue, and contact recency across 200+ seeded accounts.</p>
      </MotionSection>
      <Card>
        <CardHeader>
          <CardTitle>All client relationships</CardTitle>
          <CardDescription>Click any client to open the enterprise account workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientTable clients={clients} />
        </CardContent>
      </Card>
    </>
  );
}
