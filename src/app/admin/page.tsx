import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { RevenueChart } from "@/components/RevenueChart";
import { getBookings, customerName, vehicleLabel } from "@/lib/queries";
import { db } from "@/lib/db";
import { bookingStatusBadge, bookingStatusLabel } from "@/lib/status";

export default async function Dashboard() {
  const [bookings, customerCount, messages] = await Promise.all([
    getBookings(),
    db.customer.count(),
    db.message.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const newCount = bookings.filter((b) => b.status === "NEW").length;
  const scheduledCount = bookings.filter(
    (b) => b.status === "SCHEDULED",
  ).length;
  const revenue = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  const stats = [
    { label: "New Requests", value: newCount },
    { label: "Scheduled Jobs", value: scheduledCount },
    { label: "Pipeline Revenue", value: `$${revenue.toLocaleString()}` },
    { label: "Active Customers", value: customerCount },
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

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Overview of incoming bookings across your business.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-neutral-900">
              {stat.value}
            </p>
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

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="py-0 lg:col-span-2">
          <CardHeader className="pt-4">
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.slice(0, 5).map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium text-neutral-900">
                      {customerName(booking.customer)}
                    </div>
                    <div className="text-neutral-500">
                      {vehicleLabel(booking.vehicle)}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {booking.service?.name ?? "—"}
                    <div className="text-neutral-500">
                      ${Number(booking.price)}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {booking.scheduledAt
                      ? format(booking.scheduledAt, "yyyy-MM-dd")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={bookingStatusBadge[booking.status]}>
                      {bookingStatusLabel[booking.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-neutral-100">
              {messages.map((m) => (
                <li key={m.id} className="px-6 py-4">
                  <p className="text-sm text-neutral-800">
                    {m.direction === "INBOUND"
                      ? "Reply from"
                      : "Message sent to"}{" "}
                    {customerName(m.customer)}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {format(m.createdAt, "MMM d, p")}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
