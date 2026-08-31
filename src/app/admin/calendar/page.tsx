import { addDays, format, startOfWeek } from "date-fns";
import { Card } from "@/components/ui/card";
import { getBookings, customerName } from "@/lib/queries";

export default async function CalendarPage() {
  const bookings = await getBookings();
  const weekStart = startOfWeek(new Date("2026-08-17"), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Calendar</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Week of {format(weekStart, "MMMM d, yyyy")}
      </p>

      <div className="mt-8 grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayBookings = bookings.filter(
            (b) =>
              b.scheduledAt && format(b.scheduledAt, "yyyy-MM-dd") === dayKey,
          );
          const isToday = dayKey === "2026-08-19";
          return (
            <Card
              key={dayKey}
              className={`min-h-40 p-3 ${isToday ? "border-accent bg-app-bg" : ""}`}
            >
              <div className="text-fg-subtle text-xs font-medium tracking-wide uppercase">
                {format(day, "EEE")}
              </div>
              <div className="text-fg text-lg font-semibold">
                {format(day, "d")}
              </div>
              <div className="mt-3 space-y-2">
                {dayBookings.map((b) => (
                  <div
                    key={b.id}
                    className="rounded-lg bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-800"
                  >
                    {customerName(b.customer)}
                    <div className="text-blue-600">
                      {b.service?.name ?? "—"}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
