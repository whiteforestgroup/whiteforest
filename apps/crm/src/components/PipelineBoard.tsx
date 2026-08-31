"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Phone, MapPin, Car } from "lucide-react";
import {
  bookings as initialBookings,
  statusColumns,
  statusLabels,
  type Booking,
  type BookingStatus,
} from "@/lib/mock-data";

const COLUMN_ACCENTS: Record<BookingStatus, string> = {
  new: "border-t-amber-400",
  scheduled: "border-t-blue-400",
  in_progress: "border-t-purple-400",
  completed: "border-t-emerald-400",
};

function BookingCard({ booking }: { booking: Booking }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: booking.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:cursor-grabbing"
    >
      <div className="flex items-start justify-between">
        <p className="font-medium text-slate-900">{booking.customerName}</p>
        <span className="text-sm font-semibold text-slate-900">${booking.price}</span>
      </div>
      <p className="mt-1 text-xs font-medium text-slate-500">{booking.packageName}</p>
      <div className="mt-3 space-y-1 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Car className="h-3.5 w-3.5" />
          {booking.vehicle}
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          {booking.phone}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {booking.address}
        </div>
      </div>
    </div>
  );
}

function Column({ status, bookings }: { status: BookingStatus; bookings: Booking[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-2xl border-t-4 bg-slate-50 ${COLUMN_ACCENTS[status]} ${
        isOver ? "ring-2 ring-slate-300" : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{statusLabels[status]}</h3>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
          {bookings.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {bookings.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-400">
            No jobs here
          </div>
        )}
      </div>
    </div>
  );
}

export function PipelineBoard() {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const newStatus = over.id as BookingStatus;
    setBookings((prev) =>
      prev.map((b) => (b.id === active.id ? { ...b, status: newStatus } : b)),
    );
  }

  const activeBooking = bookings.find((b) => b.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {statusColumns.map((status) => (
          <Column
            key={status}
            status={status}
            bookings={bookings.filter((b) => b.status === status)}
          />
        ))}
      </div>
      <DragOverlay>{activeBooking ? <BookingCard booking={activeBooking} /> : null}</DragOverlay>
    </DndContext>
  );
}
