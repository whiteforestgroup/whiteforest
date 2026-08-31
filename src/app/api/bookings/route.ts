import { NextResponse } from "next/server";
import { servicePackages } from "@/lib/services";

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "packageId",
  "preferredDate",
  "address",
] as const;

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

  if (!servicePackages.some((pkg) => pkg.id === body.packageId)) {
    return NextResponse.json(
      { error: "Unknown package selected." },
      { status: 400 },
    );
  }

  // TODO: persist to the CRM's data store once it has a shared backend/API.
  console.log("New booking request:", body);

  return NextResponse.json({ ok: true }, { status: 201 });
}
