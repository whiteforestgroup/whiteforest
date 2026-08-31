import { notFound } from "next/navigation";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { mobileCustomers } from "@/lib/mobile-data";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = mobileCustomers.find((c) => c.id === id);
  if (!customer) return notFound();

  return (
    <div>
      <MobileHeader
        title={customer.name}
        subtitle={customer.phone}
        back={{ label: "Customers", href: "/mobile/customers" }}
      />

      <div className="px-6 pt-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-base font-semibold text-amber-800">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-stone-900">{customer.name}</p>
              <p className="text-sm text-stone-500">{customer.phone}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 pb-1.5">
            <span className="text-sm text-stone-500">Address</span>
            <span className="font-medium text-stone-900">{customer.city}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-500">Stage</span>
            <span className="font-medium text-stone-900">{customer.stage}</span>
          </div>
        </div>

        <h2 className="mt-6 mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
          Recent History
        </h2>
        <div className="space-y-2">
          {customer.history.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >
              <p className="font-medium text-stone-900">{item.label}</p>
              <p className="mt-0.5 text-sm text-stone-400">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
