import { tenant } from "@/lib/tenant";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          {tenant.businessName}
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex">
          <a href="#services" className="hover:text-slate-900">
            Services
          </a>
          <a href="#booking" className="hover:text-slate-900">
            Book Now
          </a>
          <a
            href={`tel:${tenant.phone.replace(/[^\d+]/g, "")}`}
            className="hover:text-slate-900"
          >
            {tenant.phone}
          </a>
        </nav>
        <a
          href="#booking"
          className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
          style={{ backgroundColor: tenant.colors.primary }}
        >
          Get a Quote
        </a>
      </div>
    </header>
  );
}
