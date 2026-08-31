import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { db } from "@/lib/db";

export default async function MobileCustomersPage() {
  const customers = await db.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <MobileHeader
        title="Customers"
        subtitle={`${customers.length} total`}
        action={
          <Link
            href="/mobile/customers/new"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />

      <div className="px-6 pt-4">
        <Link
          href="/mobile/pipeline"
          className="mb-4 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
        >
          <span className="font-semibold text-stone-900">View Pipeline</span>
          <span className="text-sm text-amber-600">See all stages →</span>
        </Link>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search customers..."
            disabled
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pr-3 pl-9 text-sm text-stone-700 placeholder:text-stone-400"
          />
        </div>

        <div className="mt-4 space-y-2">
          {customers.map((customer) => (
            <Link
              key={customer.id}
              href={`/mobile/customers/${customer.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-800">
                {customer.firstName[0]}
                {customer.lastName[0]}
              </div>
              <div>
                <p className="font-semibold text-stone-900">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className="text-sm text-stone-500">{customer.phone}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
