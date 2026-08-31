import { getBookings } from "@/lib/queries";
import { CalendarView } from "@/components/mobile/CalendarView";

export default async function CalendarPage() {
  const bookings = await getBookings();

  const events = bookings
    .filter((b) => b.scheduledAt)
    .map((b) => ({
      id: b.id,
      customerName: `${b.customer.firstName} ${b.customer.lastName}`,
      service: b.service?.name ?? "—",
      status: b.status,
      scheduledAt: b.scheduledAt!.toISOString(),
      durationMinutes: b.durationMinutes,
    }));

  return <CalendarView events={events} />;
}
