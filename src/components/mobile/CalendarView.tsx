"use client";

import { useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { bookingStatusMobileClass } from "@/lib/status";
import type { BookingStatus } from "@/generated/prisma/client";

const START_HOUR = 8;
const END_HOUR = 17;
const HOUR_HEIGHT = 56;

type CalendarEvent = {
  id: string;
  customerName: string;
  service: string;
  status: BookingStatus;
  scheduledAt: string;
  durationMinutes: number;
};

export function CalendarView({ events }: { events: CalendarEvent[] }) {
  const [visibleDays, setVisibleDays] = useState(7);
  const anchor = events[0] ? new Date(events[0].scheduledAt) : new Date();
  const weekStart = startOfWeek(anchor, { weekStartsOn: 0 });
  const days = Array.from({ length: visibleDays }, (_, i) =>
    addDays(weekStart, i),
  );
  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, i) => START_HOUR + i,
  );
  const dayColWidth = visibleDays > 3 ? 64 : 120;
  const gridTemplate = `40px repeat(${days.length}, minmax(${dayColWidth}px, 1fr))`;

  return (
    <div>
      <MobileHeader
        title={format(weekStart, "MMMM yyyy")}
        action={
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <span className="text-xl leading-none">+</span>
          </button>
        }
      />

      <div className="flex items-center justify-between px-6 pt-4">
        <div className="flex items-center gap-1 text-sm font-medium text-stone-600">
          <ChevronLeft className="h-4 w-4" />
          {format(days[0], "MMM d")}
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setVisibleDays((d) => Math.max(1, d - 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full text-stone-500"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-14 text-center text-xs text-stone-500">
            {visibleDays === 7
              ? "7 days"
              : `${visibleDays} day${visibleDays > 1 ? "s" : ""}`}
          </span>
          <button
            type="button"
            onClick={() => setVisibleDays((d) => Math.min(7, d + 1))}
            className="flex h-6 w-6 items-center justify-center rounded-full text-stone-500"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto px-6 pb-4">
        <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
          <div />
          {days.map((day) => (
            <div key={day.toISOString()} className="pb-1 text-center">
              <div className="text-[10px] font-medium text-stone-400 uppercase">
                {format(day, "EEE")}
              </div>
              <div className="text-sm font-semibold text-stone-900">
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
          <div>
            {hours.map((hour) => (
              <div
                key={hour}
                style={{ height: HOUR_HEIGHT }}
                className="pr-2 text-right text-[10px] text-stone-400"
              >
                {hour % 12 === 0 ? 12 : hour % 12}
                {hour >= 12 ? "P" : "A"}
              </div>
            ))}
          </div>
          {days.map((day) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const dayEvents = events.filter(
              (e) => format(new Date(e.scheduledAt), "yyyy-MM-dd") === dayKey,
            );
            return (
              <div
                key={dayKey}
                className="relative border-l border-stone-200"
                style={{ height: HOUR_HEIGHT * hours.length }}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="border-b border-stone-100"
                    style={{ height: HOUR_HEIGHT }}
                  />
                ))}
                {dayEvents.map((event) => {
                  const eventDate = new Date(event.scheduledAt);
                  const startHour =
                    eventDate.getHours() + eventDate.getMinutes() / 60;
                  const top = (startHour - START_HOUR) * HOUR_HEIGHT;
                  const height = (event.durationMinutes / 60) * HOUR_HEIGHT;
                  return (
                    <div
                      key={event.id}
                      className={`absolute right-0.5 left-0.5 overflow-hidden rounded-md px-1.5 py-1 text-[10px] leading-tight font-medium shadow-sm ${bookingStatusMobileClass[event.status]}`}
                      style={{ top, height: Math.max(height, 20) }}
                    >
                      <span className="block truncate font-semibold">
                        {event.customerName}
                      </span>
                      {visibleDays <= 3 && (
                        <span className="block truncate opacity-90">
                          {event.service}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
