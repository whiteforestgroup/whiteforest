import { bookings } from "@/lib/mock-data";
import { addDays, format, startOfWeek } from "date-fns";

export default function CalendarPage() {
  const weekStart = startOfWeek(new Date("2026-08-17"), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Calendar</h1>
      <p className="mt-1 text-sm text-slate-500">Week of {format(weekStart, "MMMM d, yyyy")}</p>

      <div className="mt-8 grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayBookings = bookings.filter((b) => b.preferredDate === dayKey);
          const isToday = dayKey === "2026-08-19";
          return (
            <div
              key={dayKey}
              className={`min-h-40 rounded-xl border p-3 ${
                isToday ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {format(day, "EEE")}
              </div>
              <div className="text-lg font-semibold text-slate-900">{format(day, "d")}</div>
              <div className="mt-3 space-y-2">
                {dayBookings.map((b) => (
                  <div
                    key={b.id}
                    className="rounded-lg bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-800"
                  >
                    {b.customerName}
                    <div className="text-blue-600">{b.packageName}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
