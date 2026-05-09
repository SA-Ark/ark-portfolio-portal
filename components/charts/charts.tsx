"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, LabelList, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { pipelineData, retentionData, revenueData } from "@/lib/seed-data";
import { formatCurrency } from "@/lib/utils";

function ChartFrame({ children, className = "h-80" }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={`${className} w-full rounded-2xl bg-zinc-950`} />;
  return <div className={`${className} w-full`}>{children}</div>;
}

const tooltip = {
  contentStyle: {
    background: "#09090b",
    border: "1px solid #27272a",
    borderRadius: "16px",
    color: "#fafafa"
  },
  labelStyle: { color: "#fafafa" }
};

export function RevenueAreaChart() {
  return (
    <ChartFrame>
      <ResponsiveContainer>
        <AreaChart data={revenueData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" tickFormatter={(value) => `$${Number(value) / 1000}K`} tickLine={false} axisLine={false} />
          <Tooltip {...tooltip} formatter={(value) => formatCurrency(Number(value))} />
          <Area type="monotone" dataKey="revenue" stroke="#60a5fa" fill="url(#revenue)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function RevenueLineChart() {
  return (
    <ChartFrame>
      <ResponsiveContainer>
        <LineChart data={revenueData} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" tickFormatter={(value) => `$${Number(value) / 1000}K`} tickLine={false} axisLine={false} />
          <Tooltip {...tooltip} formatter={(value) => formatCurrency(Number(value))} />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#8b5cf6" }} />
          <Line type="monotone" dataKey="pipeline" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function RetentionDonutChart() {
  const colors = ["#3b82f6", "#8b5cf6", "#f43f5e"];
  return (
    <ChartFrame className="h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={retentionData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={105} paddingAngle={4}>
            {retentionData.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
          </Pie>
          <Tooltip {...tooltip} />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function PipelineFunnelChart() {
  return (
    <ChartFrame className="h-72">
      <ResponsiveContainer>
        <FunnelChart>
          <Tooltip {...tooltip} />
          <Funnel dataKey="value" data={pipelineData} fill="#3b82f6" stroke="#111827">
            <LabelList position="right" fill="#fafafa" stroke="none" dataKey="stage" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function UtilizationBarChart() {
  return (
    <ChartFrame className="h-72">
      <ResponsiveContainer>
        <BarChart data={revenueData}>
          <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#a1a1aa" tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} />
          <Tooltip {...tooltip} formatter={(value) => `${value}%`} />
          <Bar dataKey="utilization" radius={[10, 10, 0, 0]} fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
