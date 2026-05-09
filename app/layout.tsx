import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { CursorGlow } from "@/components/ui/cursor-glow";

export const metadata: Metadata = {
  title: "NovaBridge Client OS | Ark Portfolio Portal",
  description: "Enterprise client management platform portfolio demo with seeded SaaS data."
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
