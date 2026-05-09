import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "warning" | "danger" | "outline" }) {
  const variants = {
    default: "bg-blue-500/15 text-blue-200 ring-blue-500/30",
    success: "bg-emerald-500/15 text-emerald-200 ring-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
    danger: "bg-rose-500/15 text-rose-200 ring-rose-500/30",
    outline: "bg-zinc-950 text-zinc-300 ring-zinc-700"
  };
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset", variants[variant], className)} {...props} />;
}
