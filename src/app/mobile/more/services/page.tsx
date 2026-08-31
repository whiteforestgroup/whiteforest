import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getServices } from "@/lib/queries";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <MobileHeader
        title="Services"
        back={{ label: "More", href: "/mobile/more" }}
      />

      <div className="space-y-2 px-6 pt-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-900">{service.name}</p>
              <p className="text-sm text-stone-500">
                {service.durationMinutes} min
              </p>
            </div>
            <div className="text-right">
              {service.originalPrice && (
                <p className="text-xs text-stone-400 line-through">
                  ${Number(service.originalPrice)}
                </p>
              )}
              <p className="font-semibold text-stone-900">
                ${Number(service.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
