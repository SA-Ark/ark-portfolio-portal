"use client";

import { useEffect, useState } from "react";
import type { Client } from "@/lib/seed-data";

interface AiScore {
  score: number;
  label: string;
  reason: string;
  generated: boolean;
}

export function AiHealthBadge({ client }: { client: Client }) {
  const [data, setData] = useState<AiScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchScore = () => {
    if (data || loading) return;
    setLoading(true);
    fetch("/api/ai/health-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client }),
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ score: client.healthScore, label: "Error", reason: "Failed to fetch", generated: false }))
      .finally(() => setLoading(false));
  };

  // Prefetch on mount for visible rows
  useEffect(() => {
    // Use the static score but allow AI override on click
  }, []);

  const score = data?.score ?? client.healthScore;
  const color =
    score >= 80
      ? "text-emerald-300 bg-emerald-500/10 ring-emerald-500/30"
      : score >= 50
      ? "text-amber-300 bg-amber-500/10 ring-amber-500/30"
      : "text-rose-300 bg-rose-500/10 ring-rose-500/30";

  return (
    <div className="relative">
      <button
        onClick={() => {
          fetchScore();
          setExpanded(!expanded);
        }}
        className={`inline-flex min-w-16 items-center justify-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ring-1 transition-all ${color}`}
      >
        {loading ? (
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          score
        )}
        {data?.generated && (
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" title="AI-scored" />
        )}
      </button>
      {expanded && data && (
        <div className="absolute z-50 top-full mt-1 left-0 w-64 bg-zinc-900 border border-white/10 rounded-xl p-3 shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">{data.label}</span>
            <span className={`text-xs ${data.generated ? "text-violet-400" : "text-zinc-500"}`}>
              {data.generated ? "AI" : "Static"}
            </span>
          </div>
          <p className="text-xs text-zinc-400">{data.reason}</p>
        </div>
      )}
    </div>
  );
}
