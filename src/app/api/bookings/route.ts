import { NextResponse } from "next/server";
import { servicePackages } from "@/lib/services";
import { tenant } from "@/lib/tenant";
import { db } from "@/lib/db";
import { notifyOwnerOfNewLead, sendLeadAutoReply } from "@/lib/notify";

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "packageId",
  "preferredDate",
  "address",
] as const;

// Site packages (marketing-facing) map onto the CRM's Service catalog by name.
const PACKAGE_TO_SERVICE_NAME: Record<string, string> = {
  essential: "Essential Wash",
  signature: "Signature Detail",
  ultimate: "Ultimate Correction",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || typeof body[field] !== "string") {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 },
      );
    }
  }

  const pkg = servicePackages.find((p) => p.id === body.packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: "Unknown package selected." },
      { status: 400 },
    );
  }

  const service = await db.service.findFirst({
    where: { name: PACKAGE_TO_SERVICE_NAME[pkg.id] ?? pkg.name },
  });

  const [firstName, ...rest] = String(body.name).trim().split(/\s+/);
  const lastName = rest.join(" ") || "—";

  let customer = await db.customer.findFirst({ where: { phone: body.phone } });

  if (!customer) {
    const newLeadStage = await db.pipelineStage.findFirst({
      orderBy: { order: "asc" },
    });
    customer = await db.customer.create({
      data: {
        firstName,
        lastName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        leadSource: "Website",
        stageId: newLeadStage?.id,
      },
    });
  }

  const booking = await db.booking.create({
    data: {
      customerId: customer.id,
      serviceId: service?.id,
      status: "NEW",
      scheduledAt: new Date(body.preferredDate),
      price: service?.price ?? pkg.price,
      address: body.address,
      notes: typeof body.notes === "string" ? body.notes : null,
    },
  });

  const [ownerResult, replyResult] = await Promise.allSettled([
    notifyOwnerOfNewLead({
      name: `${firstName} ${lastName}`,
      phone: body.phone,
      email: body.email,
      packageName: pkg.name,
      address: body.address,
    }),
    sendLeadAutoReply(
      { name: firstName, email: body.email },
      tenant.businessName,
    ),
  ]);
  if (ownerResult.status === "rejected")
    console.error("Owner notification failed:", ownerResult.reason);
  if (replyResult.status === "rejected")
    console.error("Lead auto-reply failed:", replyResult.reason);

  return NextResponse.json(
    { ok: true, bookingId: booking.id },
    { status: 201 },
  );
}
