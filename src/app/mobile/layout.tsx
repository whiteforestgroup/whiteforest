import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { MobileTabBar } from "@/components/mobile/MobileTabBar";

// Every page under /mobile reads live data — never statically prerender it.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "White Label CRM — Field App",
  description:
    "The technician-facing mobile app for jobs, customers, and the pipeline.",
};

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card-border flex min-h-screen justify-center py-6">
      <div className="bg-app-bg flex w-full max-w-sm flex-col overflow-hidden rounded-[2rem] shadow-xl">
        <div className="flex-1 overflow-y-auto pb-4">{children}</div>
        <MobileTabBar />
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
