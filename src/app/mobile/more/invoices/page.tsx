import { MobileHeader } from "@/components/mobile/MobileHeader";
import { invoices, invoiceStatusClass } from "@/lib/mobile-data";

export default function InvoicesPage() {
  return (
    <div>
      <MobileHeader
        title="Invoices"
        back={{ label: "More", href: "/mobile/more" }}
      />

      <div className="space-y-2 px-6 pt-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-900">
                {invoice.customerName}
              </p>
              <p className="text-sm text-stone-500">
                ${invoice.amount.toFixed(2)}
                {invoice.date && ` · ${invoice.date}`}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${invoiceStatusClass[invoice.status]}`}
            >
              {invoice.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
