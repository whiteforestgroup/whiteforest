import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RevenueChart } from "@/components/RevenueChart";
import {
  getBookings,
  getPipelineStagesWithCustomers,
  customerName,
} from "@/lib/queries";
import { db } from "@/lib/db";
import { bookingStatusMobileClass, bookingStatusLabel } from "@/lib/status";

export default async function Dashboard() {
  const [bookings, customerCount, stages] = await Promise.all([
    getBookings(),
    db.customer.count(),
    getPipelineStagesWithCustomers(),
  ]);

  const newLeadsCount =
    stages.find((s) => s.order === 0)?.customers.length ?? 0;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const jobsThisWeek = bookings.filter(
    (b) => b.scheduledAt && b.scheduledAt >= weekAgo,
  ).length;
  const revenue = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  const stats = [
    { label: "Revenue", value: `$${revenue.toLocaleString()}` },
    { label: "New Leads", value: newLeadsCount },
    { label: "Jobs This Week", value: jobsThisWeek },
    { label: "Customers", value: customerCount },
  ];

  const revenueByDate = new Map<string, number>();
  for (const b of bookings) {
    if (!b.scheduledAt) continue;
    const key = format(b.scheduledAt, "yyyy-MM-dd");
    revenueByDate.set(key, (revenueByDate.get(key) ?? 0) + Number(b.price));
  }
  const chartData = Array.from(revenueByDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({ date, revenue }));

  const upcoming = bookings.filter((b) => b.scheduledAt).slice(0, 4);
  const maxStageCount = Math.max(...stages.map((s) => s.customers.length), 1);

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-fg-muted mt-1 text-sm">
        {format(new Date(), "EEEE, MMMM d, yyyy")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-fg-muted text-xs font-medium tracking-wide uppercase">
              {stat.label}
            </p>
            <p className="text-fg mt-2 text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Revenue This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData} />
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="py-0">
          <CardHeader className="pt-4">
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-0 pb-2">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="border-card-border flex items-center justify-between border-b px-6 py-3 last:border-0"
              >
                <div>
                  <p className="text-fg font-medium">
                    {customerName(b.customer)}
                  </p>
                  <p className="text-fg-muted text-sm">
                    {format(b.scheduledAt!, "h:mm a")} ·{" "}
                    {b.service?.name ?? "—"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${bookingStatusMobileClass[b.status]}`}
                >
                  {bookingStatusLabel[b.status]}
                </span>
              </div>
            ))}
            {upcoming.length === 0 && (
              <p className="text-fg-muted px-6 py-6 text-center text-sm">
                Nothing scheduled.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="pt-4">
            <CardTitle>Customers by Stage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-6">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="text-fg-muted w-24 shrink-0 text-sm">
                  {stage.name}
                </span>
                <div className="bg-app-bg h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{
                      width: `${(stage.customers.length / maxStageCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-fg w-8 shrink-0 text-right text-sm font-semibold">
                  {stage.customers.length}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
