import { tenant } from "@/lib/tenant";

export function Hero() {
  return (
    <section
      id="top"
      className="text-white"
      style={{
        background: `linear-gradient(135deg, ${tenant.colors.primary}, ${tenant.colors.primaryDark})`,
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: tenant.colors.accent, color: tenant.colors.primaryDark }}
        >
          Now booking in {tenant.serviceArea}
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          {tenant.tagline}
        </h1>
        <p className="max-w-xl text-lg text-white/80">
          Mobile detailing that comes to you. Pick a package, choose a time, and we&apos;ll
          handle the rest &mdash; no shop visit required.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#booking"
            className="rounded-full px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: tenant.colors.accent }}
          >
            Book Your Detail
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Packages
          </a>
        </div>
      </div>
    </section>
  );
}
