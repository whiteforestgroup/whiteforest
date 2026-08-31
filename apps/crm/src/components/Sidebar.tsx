"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  CalendarDays,
  MessageSquare,
  Settings,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Detailing CRM
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-200 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
            WF
          </div>
          <div className="text-xs">
            <div className="font-medium text-slate-900">Whiteforest Admin</div>
            <div className="text-slate-500">Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
