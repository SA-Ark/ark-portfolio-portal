import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-semibold text-white", className)}>
      {name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
    </div>
  );
}
