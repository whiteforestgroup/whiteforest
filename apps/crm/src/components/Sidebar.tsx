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

import { Avatar } from "@/components/ui/avatar";

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
    <aside className="flex w-60 shrink-0 flex-col border-r border-neutral-200 bg-white">
      <div className="flex items-center gap-2 border-b border-neutral-200 px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-neutral-900">
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
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-neutral-200 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar className="h-8 w-8">WF</Avatar>
          <div className="text-xs">
            <div className="font-medium text-neutral-900">
              Whiteforest Admin
            </div>
            <div className="text-neutral-500">Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
