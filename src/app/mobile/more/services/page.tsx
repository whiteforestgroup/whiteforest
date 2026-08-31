import { MobileHeader } from "@/components/mobile/MobileHeader";
import { mobileServices } from "@/lib/mobile-data";

export default function ServicesPage() {
  return (
    <div>
      <MobileHeader
        title="Services"
        back={{ label: "More", href: "/mobile/more" }}
      />

      <div className="space-y-2 px-6 pt-4">
        {mobileServices.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-900">{service.name}</p>
              <p className="text-sm text-stone-500">{service.duration}</p>
            </div>
            <div className="text-right">
              {service.originalPrice && (
                <p className="text-xs text-stone-400 line-through">
                  ${service.originalPrice}
                </p>
              )}
              <p className="font-semibold text-stone-900">${service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
