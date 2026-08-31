import { customers } from "@/lib/mock-data";
import { Phone, Mail, Search } from "lucide-react";

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customers</h1>
          <p className="mt-1 text-sm text-slate-500">
            {customers.length} customers across all locations.
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers..."
            disabled
            className="w-64 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Vehicle</th>
              <th className="px-6 py-3">Visits</th>
              <th className="px-6 py-3">Total Spent</th>
              <th className="px-6 py-3">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="font-medium text-slate-900">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {customer.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {customer.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">{customer.vehicle}</td>
                <td className="px-6 py-4 text-slate-700">{customer.visits}</td>
                <td className="px-6 py-4 font-medium text-slate-900">${customer.totalSpent}</td>
                <td className="px-6 py-4 text-slate-500">{customer.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
