import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";

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

      <div className="space-y-2 px-6 pt-4">
        {ROWS.map((row) => (
          <Link
            key={row.label}
            href={row.href}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-900">{row.label}</p>
              {row.sub && (
                <p className="text-sm text-amber-700/80">{row.sub}</p>
              )}
            </div>
            <ChevronRight className="h-4 w-4 text-stone-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
