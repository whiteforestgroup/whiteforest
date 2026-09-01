"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { BookingStatus } from "@/generated/prisma/client";
import { notifyOwnerOfNewLead } from "@/lib/notify";

export async function createCustomer(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const leadSource = String(formData.get("leadSource") ?? "Referral");

  if (!firstName || !lastName || !phone) {
    throw new Error("First name, last name, and phone are required.");
  }

  const newLeadStage = await db.pipelineStage.findFirst({
    orderBy: { order: "asc" },
  });

  await db.customer.create({
    data: {
      firstName,
      lastName,
      phone,
      address: address || null,
      leadSource,
      stageId: newLeadStage?.id,
    },
  });

  revalidatePath("/mobile/customers");
  revalidatePath("/admin/customers");
  redirect("/mobile/customers");
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
) {
  await db.booking.update({ where: { id: bookingId }, data: { status } });
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin");
  revalidatePath("/mobile");
  revalidatePath("/mobile/jobs");
}

export async function markBookingComplete(bookingId: string) {
  await db.booking.update({
    where: { id: bookingId },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/mobile/jobs");
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin");
}

export async function setBookingPhoto(
  bookingId: string,
  which: "before" | "after",
  added: boolean,
) {
  await db.booking.update({
    where: { id: bookingId },
    data:
      which === "before"
        ? { beforePhotoUrl: added ? "captured" : null }
        : { afterPhotoUrl: added ? "captured" : null },
  });
  revalidatePath(`/mobile/jobs/${bookingId}`);
}

export async function updateCustomerStage(customerId: string, stageId: string) {
  await db.customer.update({ where: { id: customerId }, data: { stageId } });
  revalidatePath("/mobile/pipeline");
}

export async function createScheduledBooking(formData: FormData) {
  const customerId = String(formData.get("customerId") ?? "");
  const serviceId = String(formData.get("serviceId") ?? "");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "09:00");
  const address = String(formData.get("address") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!serviceId || !date) {
    throw new Error("Service and date are required.");
  }

  const service = await db.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error("Unknown service.");

  let customer;
  if (customerId === "__new__") {
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    if (!firstName || !phone) {
      throw new Error("New customer needs at least a first name and phone.");
    }
    const newLeadStage = await db.pipelineStage.findFirst({
      orderBy: { order: "asc" },
    });
    customer = await db.customer.create({
      data: {
        firstName,
        lastName: lastName || "—",
        phone,
        address: address || null,
        leadSource: "Phone",
        stageId: newLeadStage?.id,
      },
    });
  } else {
    customer = await db.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw new Error("Unknown customer.");
  }

  const scheduledAt = new Date(`${date}T${time}:00`);

  const booking = await db.booking.create({
    data: {
      customerId: customer.id,
      serviceId: service.id,
      status: "SCHEDULED",
      scheduledAt,
      durationMinutes: service.durationMinutes,
      price: service.price,
      address: address || customer.address || "",
      notes: notes || null,
    },
  });

  notifyOwnerOfNewLead({
    name: `${customer.firstName} ${customer.lastName}`,
    phone: customer.phone,
    email: customer.email ?? "",
    packageName: service.name,
    address: booking.address ?? "",
  }).catch((err) => console.error("Schedule notification failed:", err));

  revalidatePath("/admin/calendar");
  revalidatePath("/admin/pipeline");
  revalidatePath("/admin");
  revalidatePath("/admin/customers");
  revalidatePath("/mobile");
  revalidatePath("/mobile/jobs");

  return { bookingId: booking.id };
}
