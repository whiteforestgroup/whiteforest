"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Users, MoreHorizontal, Sun } from "lucide-react";

const TABS = [
  { label: "Today", href: "/mobile", icon: Sun },
  { label: "Jobs", href: "/mobile/jobs", icon: CalendarCheck },
  { label: "Customers", href: "/mobile/customers", icon: Users },
  { label: "More", href: "/mobile/more", icon: MoreHorizontal },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="border-card-border bg-card-bg/95 sticky bottom-0 flex items-center justify-around border-t pt-2 pb-2 backdrop-blur">
      {TABS.map((tab) => {
        const active =
          tab.href === "/mobile"
            ? pathname === "/mobile"
            : tab.href === "/mobile/customers"
              ? pathname.startsWith("/mobile/customers") ||
                pathname.startsWith("/mobile/pipeline")
              : pathname.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-1 flex-col items-center gap-1 pb-2"
          >
            <Icon
              className={`h-5 w-5 ${active ? "text-accent" : "text-fg-subtle"}`}
              strokeWidth={active ? 2.5 : 2}
            />
            <span
              className={`text-[11px] ${active ? "text-accent font-semibold" : "text-fg-subtle"}`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
