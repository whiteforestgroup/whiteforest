"use client";

import { useState } from "react";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScheduleBookingDialog } from "@/components/admin/ScheduleBookingDialog";
import type { BookingStatus } from "@/generated/prisma/client";

type Booking = {
  id: string;
  customerName: string;
  vehicle: string;
  service: string;
  scheduledAt: string | null;
  status: BookingStatus;
};

type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string | null;
};
type Service = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
};

const STATUS_DOT: Record<BookingStatus, string> = {
  NEW: "bg-amber-500",
  SCHEDULED: "bg-blue-500",
  IN_PROGRESS: "bg-purple-500",
  COMPLETED: "bg-emerald-500",
  CANCELED: "bg-neutral-400",
};

export function CalendarScheduler({
  weekStartIso,
  prevWeekHref,
  nextWeekHref,
  bookings,
  customers,
  services,
}: {
  weekStartIso: string;
  prevWeekHref: string;
  nextWeekHref: string;
  bookings: Booking[];
  customers: Customer[];
  services: Service[];
}) {
  const [dialogDate, setDialogDate] = useState<string | null>(null);
  const weekStart = new Date(weekStartIso);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-fg text-2xl font-bold tracking-tight">
            Calendar
          </h1>
          <p className="text-fg-muted mt-1 text-sm">
            Week of {format(weekStart, "MMMM d, yyyy")} — click a day to
            schedule a job.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={prevWeekHref}
            className="border-card-border bg-card-bg text-fg-muted flex h-9 w-9 items-center justify-center rounded-lg border"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Link
            href={nextWeekHref}
            className="border-card-border bg-card-bg text-fg-muted flex h-9 w-9 items-center justify-center rounded-lg border"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayBookings = bookings.filter(
            (b) =>
              b.scheduledAt &&
              format(new Date(b.scheduledAt), "yyyy-MM-dd") === dayKey,
          );
          const isToday = dayKey === today;
          return (
            <Card
              key={dayKey}
              className={`min-h-40 p-3 ${isToday ? "border-accent bg-app-bg" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-fg-subtle text-xs font-medium tracking-wide uppercase">
                    {format(day, "EEE")}
                  </div>
                  <div className="text-fg text-lg font-semibold">
                    {format(day, "d")}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDialogDate(dayKey)}
                  className="bg-accent flex h-6 w-6 items-center justify-center rounded-full text-white"
                  aria-label={`Schedule a job on ${dayKey}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3 space-y-1.5">
                {dayBookings.map((b) => (
                  <div
                    key={b.id}
                    className="border-card-border bg-card-bg rounded-lg border px-2 py-1.5 text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[b.status]}`}
                      />
                      <span className="text-fg truncate font-medium">
                        {b.customerName}
                      </span>
                    </div>
                    <div className="text-fg-muted mt-0.5 pl-3">
                      {b.scheduledAt &&
                        format(new Date(b.scheduledAt), "h:mm a")}{" "}
                      · {b.service}
                    </div>
                  </div>
                ))}
                {dayBookings.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setDialogDate(dayKey)}
                    className="text-fg-subtle w-full rounded-lg border border-dashed border-current px-2 py-3 text-center text-xs"
                  >
                    No jobs — add one
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {dialogDate && (
        <ScheduleBookingDialog
          date={dialogDate}
          customers={customers}
          services={services}
          onClose={() => setDialogDate(null)}
        />
      )}
    </div>
  );
}
