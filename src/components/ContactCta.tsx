import { tenant } from "@/lib/tenant";

export function ContactCta() {
  return (
    <section id="booking" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Ready to book?
        </h2>
        <p className="mt-3 text-slate-600">
          Call or text us and we&apos;ll get you scheduled — no forms to fill
          out.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${tenant.phone.replace(/[^\d+]/g, "")}`}
            className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: tenant.colors.primary }}
          >
            Call {tenant.phone}
          </a>
          <a
            href={`mailto:${tenant.email}`}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Email us
          </a>
        </div>
      </div>
    </section>
  );
}
