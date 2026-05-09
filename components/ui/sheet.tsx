"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sheet({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
          <aside className="h-full w-80 border-r border-white/[0.06] bg-white/[0.04] p-5 animate-in fade-in">
            <div className="mb-6 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close navigation"><X className="h-5 w-5" /></Button>
            </div>
            {children}
          </aside>
        </div>
      ) : null}
    </>
  );
}
