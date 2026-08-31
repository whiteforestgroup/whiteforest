"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { BookingStatus } from "@/generated/prisma/client";

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
