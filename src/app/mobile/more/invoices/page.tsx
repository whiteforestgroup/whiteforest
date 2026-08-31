import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getInvoices } from "@/lib/queries";
import { invoiceStatusClass, invoiceStatusLabel } from "@/lib/status";

export default async function InvoicesPage() {
  const invoices = await getInvoices();

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
                {invoice.customer.firstName} {invoice.customer.lastName}
              </p>
              <p className="text-sm text-stone-500">
                ${Number(invoice.amount).toFixed(2)}
                {invoice.dueDate &&
                  ` · ${invoice.dueDate.toLocaleDateString()}`}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${invoiceStatusClass[invoice.status]}`}
            >
              {invoiceStatusLabel[invoice.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
