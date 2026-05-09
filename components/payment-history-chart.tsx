"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { invoices } from "@/lib/seed-data";
import { formatCurrency } from "@/lib/utils";

const data = Array.from({ length: 8 }, (_, index) => {
  const monthInvoices = invoices.filter((_, i) => i % 8 === index);
  return {
    month: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][index],
    paid: monthInvoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0),
    outstanding: monthInvoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0)
  };
});

export function PaymentHistoryChart() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-96 w-full rounded-2xl bg-white/[0.04]" />;
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" tickFormatter={(value) => `$${Number(value) / 1000}K`} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: "16px", color: "#fafafa" }} formatter={(value) => formatCurrency(Number(value))} />
          <Bar dataKey="paid" stackId="a" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="outstanding" stackId="a" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
