"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import { bookings, statusLabels, type BookingStatus } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badgeVariant: Record<
  BookingStatus,
  "amber" | "blue" | "purple" | "emerald"
> = {
  new: "amber",
  scheduled: "blue",
  in_progress: "purple",
  completed: "emerald",
};

const bookingDates = bookings.map(
  (b) => new Date(`${b.preferredDate}T00:00:00`),
);

export default function CalendarPage() {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date("2026-08-19T00:00:00"),
  );

  const selectedKey = selected ? format(selected, "yyyy-MM-dd") : null;
  const dayBookings = bookings.filter((b) => b.preferredDate === selectedKey);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        Calendar
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Select a day to see its scheduled jobs.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="p-4">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            defaultMonth={new Date("2026-08-01T00:00:00")}
            modifiers={{ hasBooking: bookingDates }}
            modifiersClassNames={{ hasBooking: "font-semibold text-blue-700" }}
            classNames={{
              day_button:
                "flex h-9 w-9 items-center justify-center rounded-lg text-sm hover:bg-neutral-100",
              selected: "bg-neutral-900! text-white! hover:bg-neutral-900!",
              today: "underline",
              month_caption:
                "flex items-center justify-center py-2 font-semibold",
              weekday: "text-xs font-medium text-neutral-400",
              nav: "flex items-center justify-between",
            }}
          />
        </Card>

        <Card className="p-0">
          <div className="border-b border-neutral-100 px-6 py-4">
            <h3 className="font-semibold text-neutral-900">
              {selected
                ? format(selected, "EEEE, MMMM d, yyyy")
                : "No day selected"}
            </h3>
            <p className="text-sm text-neutral-500">
              {dayBookings.length} job{dayBookings.length === 1 ? "" : "s"}{" "}
              scheduled
            </p>
          </div>
          <ul className="divide-y divide-neutral-100">
            {dayBookings.map((b) => (
              <li
                key={b.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-neutral-900">
                    {b.customerName}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {b.packageName} · {b.vehicle}
                  </p>
                </div>
                <Badge variant={badgeVariant[b.status]}>
                  {statusLabels[b.status]}
                </Badge>
              </li>
            ))}
            {dayBookings.length === 0 && (
              <li className="px-6 py-8 text-center text-sm text-neutral-400">
                No jobs scheduled for this day.
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
}
