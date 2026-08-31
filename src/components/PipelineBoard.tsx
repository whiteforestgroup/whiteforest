"use client";

import { useState, useTransition } from "react";
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
import { toast } from "sonner";
import type { BookingStatus } from "@/generated/prisma/client";
import { bookingStatusColumns, bookingStatusLabel } from "@/lib/status";
import { customerName, vehicleLabel } from "@/lib/format";
import { updateBookingStatus } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PipelineBooking = {
  id: string;
  status: BookingStatus;
  price: number;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string | null;
  };
  vehicle: {
    year: number | null;
    make: string | null;
    model: string | null;
  } | null;
  service: { name: string } | null;
};

const COLUMN_ACCENTS: Record<BookingStatus, string> = {
  NEW: "border-t-amber-400",
  SCHEDULED: "border-t-blue-400",
  IN_PROGRESS: "border-t-purple-400",
  COMPLETED: "border-t-emerald-400",
  CANCELED: "border-t-neutral-300",
};

const COLUMN_COUNT_STYLE: Record<
  BookingStatus,
  "amber" | "blue" | "purple" | "emerald"
> = {
  NEW: "amber",
  SCHEDULED: "blue",
  IN_PROGRESS: "purple",
  COMPLETED: "emerald",
  CANCELED: "emerald",
};

function BookingCard({ booking }: { booking: PipelineBooking }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: booking.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab p-4 active:cursor-grabbing"
    >
      <div className="flex items-start justify-between">
        <p className="font-medium text-neutral-900">
          {customerName(booking.customer)}
        </p>
        <span className="text-sm font-semibold text-neutral-900">
          ${booking.price}
        </span>
      </div>
      <p className="mt-1 text-xs font-medium text-neutral-500">
        {booking.service?.name ?? "—"}
      </p>
      <div className="mt-3 space-y-1 text-xs text-neutral-500">
        <div className="flex items-center gap-1.5">
          <Car className="h-3.5 w-3.5" />
          {vehicleLabel(booking.vehicle)}
        </div>
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          {booking.customer.phone}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {booking.customer.address ?? "No address on file"}
        </div>
      </div>
    </Card>
  );
}

function Column({
  status,
  bookings,
}: {
  status: BookingStatus;
  bookings: PipelineBooking[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-2xl border-t-4 bg-neutral-50",
        COLUMN_ACCENTS[status],
        isOver && "ring-2 ring-neutral-300",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-neutral-900">
          {bookingStatusLabel[status]}
        </h3>
        <Badge variant={COLUMN_COUNT_STYLE[status]}>{bookings.length}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {bookings.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 p-4 text-center text-xs text-neutral-400">
            No jobs here
          </div>
        )}
      </div>
    </div>
  );
}

export function PipelineBoard({
  initialBookings,
}: {
  initialBookings: PipelineBooking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const newStatus = over.id as BookingStatus;
    const moved = bookings.find((b) => b.id === active.id);
    if (!moved || moved.status === newStatus) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === active.id ? { ...b, status: newStatus } : b)),
    );
    toast.success(
      `${customerName(moved.customer)} moved to ${bookingStatusLabel[newStatus]}`,
    );

    startTransition(() => {
      updateBookingStatus(String(active.id), newStatus).catch(() => {
        toast.error("Couldn't save that move — reverting.");
        setBookings((prev) =>
          prev.map((b) =>
            b.id === active.id ? { ...b, status: moved.status } : b,
          ),
        );
      });
    });
  }

  const activeBooking = bookings.find((b) => b.id === activeId);

  return (
    <DndContext
      id="pipeline-board"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {bookingStatusColumns.map((status) => (
          <Column
            key={status}
            status={status}
            bookings={bookings.filter((b) => b.status === status)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeBooking ? <BookingCard booking={activeBooking} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
