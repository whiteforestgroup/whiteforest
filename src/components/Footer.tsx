import { tenant } from "@/lib/tenant";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {tenant.businessName}. All rights
          reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={`tel:${tenant.phone.replace(/[^\d+]/g, "")}`}
            className="hover:text-slate-900"
          >
            {tenant.phone}
          </a>
          <a href={`mailto:${tenant.email}`} className="hover:text-slate-900">
            {tenant.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
