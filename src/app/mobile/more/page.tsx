import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { ThemeToggle } from "@/components/ThemeToggle";

const ROWS = [
  { label: "Invoices", href: "/mobile/more/invoices" },
  { label: "Services", href: "/mobile/more/services" },
  { label: "Expenses", href: "/mobile/more/expenses" },
  {
    label: "Branding",
    sub: "Colors, logo, business info",
    href: "/mobile/more",
  },
  { label: "Job Photo Requirement", sub: "Bypass code", href: "/mobile/more" },
];

export default function MorePage() {
  return (
    <div>
      <MobileHeader title="More" />

      <div className="flex items-center justify-between px-6 pt-4">
        <span className="text-fg-muted text-sm font-medium">Appearance</span>
        <ThemeToggle />
      </div>

      <div className="mt-4 space-y-2 px-6">
        {ROWS.map((row) => (
          <Link
            key={row.label}
            href={row.href}
            className="bg-card-bg flex items-center justify-between rounded-2xl p-4 shadow-sm"
          >
            <div>
              <p className="text-fg font-semibold">{row.label}</p>
              {row.sub && (
                <p className="text-sm text-amber-700/80">{row.sub}</p>
              )}
            </div>
            <ChevronRight className="text-fg-subtle h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
