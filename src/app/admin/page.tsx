import {
  bookings,
  statusLabels,
  dashboardActivity,
  type BookingStatus,
} from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevenueChart } from "@/components/RevenueChart";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const badgeVariant: Record<
  BookingStatus,
  "amber" | "blue" | "purple" | "emerald"
> = {
  new: "amber",
  scheduled: "blue",
  in_progress: "purple",
  completed: "emerald",
};

export default function Dashboard() {
  const newCount = bookings.filter((b) => b.status === "new").length;
  const scheduledCount = bookings.filter(
    (b) => b.status === "scheduled",
  ).length;
  const revenue = bookings.reduce((sum, b) => sum + b.price, 0);

  const stats = [
    { label: "New Requests", value: newCount },
    { label: "Scheduled Jobs", value: scheduledCount },
    { label: "Pipeline Revenue", value: `$${revenue.toLocaleString()}` },
    { label: "Active Customers", value: 6 },
  ];

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
          <RevenueChart />
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
                <TableHead>Package</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.slice(0, 5).map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="font-medium text-neutral-900">
                      {booking.customerName}
                    </div>
                    <div className="text-neutral-500">{booking.vehicle}</div>
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {booking.packageName}
                    <div className="text-neutral-500">${booking.price}</div>
                  </TableCell>
                  <TableCell className="text-neutral-700">
                    {booking.preferredDate}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badgeVariant[booking.status]}>
                      {statusLabels[booking.status]}
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
              {dashboardActivity.map((item) => (
                <li key={item.id} className="px-6 py-4">
                  <p className="text-sm text-neutral-800">{item.text}</p>
                  <p className="mt-1 text-xs text-neutral-400">{item.time}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
