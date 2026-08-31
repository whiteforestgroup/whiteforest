import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Detailing CRM",
  description: "Manage bookings, jobs, and customers.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <div className="flex-1 bg-neutral-50">
        <main className="mx-auto max-w-6xl px-8 py-10">{children}</main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
