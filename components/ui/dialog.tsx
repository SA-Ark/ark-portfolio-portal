"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dialog({ trigger, title, children }: { trigger: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className={cn("w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl animate-in fade-in")}> 
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold text-white">{title}</h2>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close dialog"><X className="h-5 w-5" /></Button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
