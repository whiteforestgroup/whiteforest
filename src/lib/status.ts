// Presentation-only lookup maps keyed by the real Prisma enums (src/generated/prisma).
import type { BookingStatus, InvoiceStatus } from "@/generated/prisma/client";

export const bookingStatusLabel: Record<BookingStatus, string> = {
  NEW: "New",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};

export const bookingStatusBadge: Record<
  BookingStatus,
  "amber" | "blue" | "purple" | "emerald"
> = {
  NEW: "amber",
  SCHEDULED: "blue",
  IN_PROGRESS: "purple",
  COMPLETED: "emerald",
  CANCELED: "emerald",
};

export const bookingStatusMobileClass: Record<BookingStatus, string> = {
  NEW: "bg-amber-100 text-amber-800",
  SCHEDULED: "bg-[#2f4a28] text-white",
  IN_PROGRESS: "bg-sky-600 text-white",
  COMPLETED: "bg-stone-200 text-stone-600",
  CANCELED: "bg-stone-200 text-stone-600",
};

export const bookingStatusColumns: BookingStatus[] = [
  "NEW",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
];

export const invoiceStatusClass: Record<InvoiceStatus, string> = {
  PAID: "bg-[#2f4a28] text-white",
  SENT: "bg-sky-600 text-white",
  OVERDUE: "bg-red-600 text-white",
  DRAFT: "bg-stone-200 text-stone-600",
};

export const invoiceStatusLabel: Record<InvoiceStatus, string> = {
  PAID: "Paid",
  SENT: "Sent",
  OVERDUE: "Overdue",
  DRAFT: "Draft",
};
