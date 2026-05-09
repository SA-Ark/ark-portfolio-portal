import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teamMembers } from "@/lib/seed-data";
import { MotionSection } from "@/components/ui/motion";

const roles = [
  { name: "Admin", permissions: ["Billing", "Security", "Users", "All clients"] },
  { name: "Manager", permissions: ["Portfolio", "Projects", "Invoices", "Analytics"] },
  { name: "Staff", permissions: ["Assigned projects", "Messages", "Documents"] },
  { name: "Client", permissions: ["Own projects", "Own documents", "Messages"] }
];

export default function SettingsPage() {
  return (
    <>
      <MotionSection className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Team & RBAC</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Settings view showing role management for Admin, Manager, Staff, and Client personas in a multi-tenant enterprise workspace.</p>
      </MotionSection>
      <MotionSection className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Team members</CardTitle><CardDescription>Five seeded users with realistic access scopes.</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Access</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>{teamMembers.map((member) => <TableRow key={member.id}><TableCell className="font-medium text-white">{member.name}<span className="block text-sm text-zinc-500">{member.email}</span></TableCell><TableCell><Badge>{member.role}</Badge></TableCell><TableCell>{member.access}</TableCell><TableCell><Badge variant={member.status === "Active" ? "success" : "warning"}>{member.status}</Badge></TableCell></TableRow>)}</TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-6 w-6 text-cyan-400" /> Role permissions</CardTitle><CardDescription>Demo role matrix for scoped client operations.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {roles.map((role) => <div key={role.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl p-4"><h3 className="font-heading text-xl font-semibold text-white">{role.name}</h3><div className="mt-3 flex flex-wrap gap-2">{role.permissions.map((permission) => <Badge key={permission} variant="outline">{permission}</Badge>)}</div></div>)}
          </CardContent>
        </Card>
      </MotionSection>
    </>
  );
}
