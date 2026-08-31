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
            className="bg-card-bg flex items-center justify-between rounded-2xl p-4 shadow-sm"
          >
            <div>
              <p className="text-fg font-semibold">{service.name}</p>
              <p className="text-fg-muted text-sm">
                {service.durationMinutes} min
              </p>
            </div>
            <div className="text-right">
              {service.originalPrice && (
                <p className="text-fg-subtle text-xs line-through">
                  ${Number(service.originalPrice)}
                </p>
              )}
              <p className="text-fg font-semibold">${Number(service.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
