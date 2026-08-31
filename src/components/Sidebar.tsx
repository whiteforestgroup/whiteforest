"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  Zap,
  CalendarDays,
  ClipboardList,
  Wrench,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Pipeline", href: "/admin/pipeline", icon: KanbanSquare },
  { label: "Automations", href: "/admin/automations", icon: Zap },
  { label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
  { label: "Jobs", href: "/admin/jobs", icon: ClipboardList },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Invoices", href: "/admin/invoices", icon: Receipt },
  { label: "Expenses", href: "/admin/expenses", icon: Wallet },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-sidebar flex w-60 shrink-0 flex-col text-white">
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
        <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-lg">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          White Label CRM
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
            WF
          </div>
          <div className="text-xs">
            <div className="font-medium">Whiteforest Admin</div>
            <div className="text-white/50">Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
