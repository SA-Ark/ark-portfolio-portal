import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { CursorGlow } from "@/components/ui/cursor-glow";

export const metadata: Metadata = {
  title: "Ark Portal | Consulting Practice Management",
  description: "Consulting practice management platform for client relationships, projects, invoices, and analytics."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="aurora-bg" aria-hidden="true" />
        <CursorGlow />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
