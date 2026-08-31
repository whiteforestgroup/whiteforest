import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getCustomer } from "@/lib/queries";
import { bookingStatusLabel } from "@/lib/status";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = await getCustomer(id);
  if (!customer) return notFound();

  const history = [
    ...customer.bookings.map((b) => ({
      label: `${b.service?.name ?? "Job"} — ${bookingStatusLabel[b.status]}`,
      date: b.scheduledAt ?? b.createdAt,
    })),
    ...customer.invoices.map((i) => ({
      label: `Invoice — $${Number(i.amount).toFixed(2)} (${i.status})`,
      date: i.createdAt,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div>
      <MobileHeader
        title={`${customer.firstName} ${customer.lastName}`}
        subtitle={customer.phone}
        back={{ label: "Customers", href: "/mobile/customers" }}
      />

      <div className="px-6 pt-4">
        <div className="bg-card-bg rounded-2xl p-4 shadow-sm">
          <div className="border-card-border flex items-center gap-3 border-b pb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-base font-semibold text-amber-800">
              {customer.firstName[0]}
              {customer.lastName[0]}
            </div>
            <div>
              <p className="text-fg font-semibold">
                {customer.firstName} {customer.lastName}
              </p>
              <p className="text-fg-muted text-sm">{customer.phone}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 pb-1.5">
            <span className="text-fg-muted text-sm">Address</span>
            <span className="text-fg font-medium">
              {[customer.city, customer.state].filter(Boolean).join(", ") ||
                "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-fg-muted text-sm">Stage</span>
            <span className="text-fg font-medium">
              {customer.stage?.name ?? "—"}
            </span>
          </div>
        </div>

        <h2 className="text-fg-subtle mt-6 mb-2 text-xs font-semibold tracking-wide uppercase">
          Recent History
        </h2>
        <div className="space-y-2">
          {history.map((item, i) => (
            <div key={i} className="bg-card-bg rounded-2xl p-4 shadow-sm">
              <p className="text-fg font-medium">{item.label}</p>
              <p className="text-fg-subtle mt-0.5 text-sm">
                {format(item.date, "MMM d, yyyy")}
              </p>
            </div>
          ))}
          {history.length === 0 && (
            <p className="bg-card-bg text-fg-subtle rounded-2xl p-4 text-center text-sm shadow-sm">
              No history yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
