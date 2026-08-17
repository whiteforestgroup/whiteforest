import { servicePackages } from "@/lib/services";
import { tenant } from "@/lib/tenant";

export function ServicePackages() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Service Packages
        </h2>
        <p className="mt-3 text-slate-600">
          Straightforward pricing, no surprises. Every package can be tailored to your
          vehicle at booking.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicePackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`flex flex-col rounded-2xl border-2 p-6 ${
              pkg.featured ? "shadow-lg" : "border-slate-200 shadow-sm"
            }`}
            style={pkg.featured ? { borderColor: tenant.colors.accent } : undefined}
          >
            {pkg.featured && (
              <span
                className="mb-3 w-fit rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: tenant.colors.primary }}
              >
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-semibold text-slate-900">{pkg.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{pkg.description}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">${pkg.price}</span>
              <span className="text-sm text-slate-500">/ {pkg.duration}</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-slate-600">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden style={{ color: tenant.colors.accent }}>
                    &#10003;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={`#booking?package=${pkg.id}`}
              className="mt-6 rounded-full px-4 py-2 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: tenant.colors.primary }}
            >
              Choose {pkg.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
