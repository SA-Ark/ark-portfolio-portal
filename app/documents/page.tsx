import { DocumentSummarizer } from "@/components/ai/ai-panels";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clients, documents } from "@/lib/seed-data";
import { formatDate } from "@/lib/utils";
import { MotionSection } from "@/components/ui/motion";

export default function DocumentsPage() {
  const folders = ["Contracts", "Statements of Work", "Security", "Invoices", "Research"];
  return (
    <>
      <MotionSection className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Document vault</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Client-scoped file browser with folders, document versions, owners, update timestamps, and AI contract summarization.</p>
      </MotionSection>
      <MotionSection className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
        <Card>
          <CardHeader><CardTitle>Folders</CardTitle><CardDescription>Per-client vault categories.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {folders.map((folder) => <div key={folder} className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4 text-base text-white"><span>{folder}</span><Badge variant="outline">{documents.filter((document) => document.folder === folder).length}</Badge></div>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent documents</CardTitle><CardDescription>Versioned files across priority accounts.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {documents.slice(0, 20).map((document) => {
              const client = clients.find((item) => item.id === document.clientId);
              return <div key={document.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-base font-medium text-white">{document.name}</p><Badge>{document.version}</Badge></div><p className="mt-2 text-sm text-zinc-500">{client?.name} • {document.folder} • {document.owner} • {formatDate(document.updatedAt)}</p></div>;
            })}
          </CardContent>
        </Card>
      </MotionSection>
      <DocumentSummarizer />
    </>
  );
}
