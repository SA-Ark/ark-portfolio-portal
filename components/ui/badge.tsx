import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "warning" | "danger" | "outline" }) {
  const variants = {
    default: "bg-cyan-400/15 text-cyan-100 ring-cyan-400/30",
    success: "bg-emerald-500/15 text-emerald-200 ring-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
    danger: "bg-rose-500/15 text-rose-200 ring-rose-500/30",
    outline: "bg-white/[0.04] text-zinc-300 ring-white/[0.08] backdrop-blur-xl"
  };
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset", variants[variant], className)} {...props} />;
}
