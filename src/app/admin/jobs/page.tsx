import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getBookings, customerName, vehicleLabel } from "@/lib/queries";
import { bookingStatusBadge, bookingStatusLabel } from "@/lib/status";

export default async function JobsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Jobs</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Every booking across the business.
      </p>

      <Card className="mt-8 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="text-fg font-medium">
                  {customerName(booking.customer)}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {vehicleLabel(booking.vehicle)}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {booking.service?.name ?? "—"}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {booking.scheduledAt
                    ? format(booking.scheduledAt, "MMM d, h:mm a")
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={bookingStatusBadge[booking.status]}>
                    {bookingStatusLabel[booking.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-fg font-medium">
                  ${Number(booking.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
