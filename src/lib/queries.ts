import { db } from "@/lib/db";

export { vehicleLabel, customerName } from "@/lib/format";

const bookingInclude = {
  customer: true,
  vehicle: true,
  service: true,
} as const;

export async function getBookings() {
  return db.booking.findMany({
    include: bookingInclude,
    orderBy: { scheduledAt: "asc" },
  });
}

export async function getBooking(id: string) {
  return db.booking.findUnique({ where: { id }, include: bookingInclude });
}

export async function getCustomers() {
  const customers = await db.customer.findMany({
    include: {
      vehicles: true,
      bookings: { include: { service: true } },
      invoices: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return customers.map((c) => ({
    ...c,
    totalSpent: c.invoices
      .filter((i) => i.status === "PAID")
      .reduce((sum, i) => sum + Number(i.amount), 0),
    visits: c.bookings.filter((b) => b.status === "COMPLETED").length,
    lastVisit: c.bookings
      .filter((b) => b.scheduledAt)
      .sort((a, b) => b.scheduledAt!.getTime() - a.scheduledAt!.getTime())[0]
      ?.scheduledAt,
  }));
}

export async function getCustomer(id: string) {
  return db.customer.findUnique({
    where: { id },
    include: {
      vehicles: true,
      bookings: {
        include: { service: true },
        orderBy: { scheduledAt: "desc" },
      },
      invoices: { orderBy: { createdAt: "desc" } },
      stage: true,
    },
  });
}

export async function getPipelineStagesWithCustomers() {
  return db.pipelineStage.findMany({
    include: { customers: { orderBy: { updatedAt: "asc" } } },
    orderBy: { order: "asc" },
  });
}

export async function getInvoices() {
  return db.invoice.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getServices() {
  return db.service.findMany({
    where: { active: true },
    orderBy: { price: "asc" },
  });
}

export async function getExpenses() {
  return db.expense.findMany({ orderBy: { date: "desc" } });
}

export async function getMessages() {
  return db.message.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
}
