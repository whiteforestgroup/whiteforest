import { addDays, startOfWeek } from "date-fns";
import { CalendarScheduler } from "@/components/admin/CalendarScheduler";
import { getBookings, customerName, vehicleLabel } from "@/lib/queries";
import { db } from "@/lib/db";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const anchor = week ? new Date(`${week}T00:00:00`) : new Date();
  const weekStart = startOfWeek(anchor, { weekStartsOn: 1 });
  const prevWeek = addDays(weekStart, -7).toISOString().slice(0, 10);
  const nextWeek = addDays(weekStart, 7).toISOString().slice(0, 10);

  const [bookings, customers, services] = await Promise.all([
    getBookings(),
    db.customer.findMany({ orderBy: { firstName: "asc" } }),
    db.service.findMany({ where: { active: true }, orderBy: { price: "asc" } }),
  ]);

  return (
    <CalendarScheduler
      weekStartIso={weekStart.toISOString()}
      prevWeekHref={`/admin/calendar?week=${prevWeek}`}
      nextWeekHref={`/admin/calendar?week=${nextWeek}`}
      bookings={bookings.map((b) => ({
        id: b.id,
        customerName: customerName(b.customer),
        vehicle: vehicleLabel(b.vehicle),
        service: b.service?.name ?? "—",
        scheduledAt: b.scheduledAt?.toISOString() ?? null,
        status: b.status,
      }))}
      customers={customers.map((c) => ({
        id: c.id,
        name: customerName(c),
        phone: c.phone,
        address: c.address,
      }))}
      services={services.map((s) => ({
        id: s.id,
        name: s.name,
        price: Number(s.price),
        durationMinutes: s.durationMinutes,
      }))}
    />
  );
}
