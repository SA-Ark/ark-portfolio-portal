"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BriefcaseBusiness, Building2, FileText, FolderOpen, Home, Menu, MessageSquare, Settings, ShieldCheck } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/clients", label: "Clients", icon: Building2 },
  { href: "/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/documents", label: "Documents", icon: FolderOpen },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Team & RBAC", icon: Settings }
];

function SidebarContent() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-cyan-400/20">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-heading text-2xl font-semibold text-white">Ark Portal</p>
          <p className="text-sm text-[#8888a0]">Practice Management</p>
        </div>
      </Link>
      <nav className="space-y-2">
        {nav.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-base text-zinc-400 transition-all hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white",
                active && "border-cyan-400/30 bg-cyan-400/10 text-cyan-100 shadow-[0_0_30px_rgba(0,212,255,0.14)]"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-[20px] border border-white/[0.06] bg-white/[0.04] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Avatar name="Maya Chen" />
          <div>
            <p className="text-base font-medium text-white">Maya Chen</p>
            <p className="text-sm text-[#8888a0]">Admin • demo@arkdev.io</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[#e8e8ed]">
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-80 border-r border-white/[0.06] bg-[#050510]/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:block">
        <SidebarContent />
      </aside>
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#050510]/70 px-4 py-4 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link href="/" className="font-heading text-2xl font-semibold">Ark Portal</Link>
          <Sheet trigger={<Button variant="secondary" size="sm"><Menu className="h-5 w-5" /> Menu</Button>}>
            <SidebarContent />
          </Sheet>
        </div>
      </header>
      <main className="lg:pl-80">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          <div className="fade-page space-y-20 md:space-y-[120px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
