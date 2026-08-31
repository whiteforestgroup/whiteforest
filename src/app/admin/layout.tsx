import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

// Every page under /admin reads live data — never statically prerender it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "White Label CRM",
  description: "Manage bookings, jobs, and customers.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <div className="bg-app-bg flex-1">
        <div className="flex justify-end px-8 pt-6">
          <ThemeToggle />
        </div>
        <main className="mx-auto max-w-6xl px-8 pt-4 pb-10">{children}</main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
