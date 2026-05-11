"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Client } from "@/lib/seed-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HealthPill, StatusBadge } from "@/components/status";
import { AiHealthBadge } from "@/components/ai-health-badge";
import { Button } from "@/components/ui/button";

export function ClientTable({ clients }: { clients: Client[] }) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const filtered = clients.filter((client) => {
    const matches = `${client.name} ${client.industry} ${client.owner} ${client.city}`.toLowerCase().includes(query.toLowerCase());
    return matches && (status === "All" || client.status === status);
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-3 h-5 w-5 text-zinc-500" />
          <Input className="pl-12" placeholder="Search 200+ clients by name, industry, owner, or city..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "At Risk", "Onboarding", "Paused"].map((item) => (
            <Button key={item} variant={status === item ? "gradient" : "secondary"} size="sm" onClick={() => setStatus(item)}>{item}</Button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl/70">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>ARR</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 80).map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Link href={`/clients/${client.id}`} className="block">
                      <span className="font-medium text-white">{client.name}</span>
                      <span className="mt-1 block text-sm text-zinc-500">{client.industry} • {client.city}</span>
                    </Link>
                  </TableCell>
                  <TableCell><StatusBadge status={client.status} /></TableCell>
                  <TableCell><AiHealthBadge client={client} /></TableCell>
                  <TableCell>{formatCurrency(client.arr)}</TableCell>
                  <TableCell>{client.owner}</TableCell>
                  <TableCell>{formatDate(client.lastContact)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <p className="text-sm text-zinc-500">Showing {Math.min(filtered.length, 80)} of {filtered.length} matching clients. Seed contains {clients.length} clients.</p>
    </div>
  );
}
