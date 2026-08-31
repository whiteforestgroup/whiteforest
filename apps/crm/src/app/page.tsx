import { bookings, statusLabels, statusStyles, dashboardActivity } from "@/lib/mock-data";

export default function Dashboard() {
  const newCount = bookings.filter((b) => b.status === "new").length;
  const scheduledCount = bookings.filter((b) => b.status === "scheduled").length;
  const revenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const stats = [
    { label: "New Requests", value: newCount },
    { label: "Scheduled Jobs", value: scheduledCount },
    { label: "Pipeline Revenue", value: `$${revenue.toLocaleString()}` },
    { label: "Active Customers", value: 6 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Overview of incoming bookings across your business.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Package</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{booking.customerName}</div>
                    <div className="text-slate-500">{booking.vehicle}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {booking.packageName}
                    <div className="text-slate-500">${booking.price}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{booking.preferredDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {dashboardActivity.map((item) => (
              <li key={item.id} className="px-6 py-4">
                <p className="text-sm text-slate-800">{item.text}</p>
                <p className="mt-1 text-xs text-slate-400">{item.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
