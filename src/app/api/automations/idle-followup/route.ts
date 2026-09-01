import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tenant } from "@/lib/tenant";
import { sendIdleFollowUp } from "@/lib/notify";

export const dynamic = "force-dynamic";

// Triggered on a schedule (see vercel.json) to nudge leads that have gone
// quiet. Follows up once per IDLE_DAYS window — a customer who already got
// a follow-up message inside that window is skipped so this doesn't spam.
const IDLE_DAYS = 3;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - IDLE_DAYS);

  const idleStages = await db.pipelineStage.findMany({
    where: { name: { in: ["New Lead", "Follow Up"] } },
  });

  const candidates = await db.customer.findMany({
    where: {
      stageId: { in: idleStages.map((s) => s.id) },
      updatedAt: { lt: cutoff },
      email: { not: null },
    },
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  const results: { customerId: string; sent: boolean }[] = [];

  for (const customer of candidates) {
    const lastMessage = customer.messages[0];
    if (
      lastMessage &&
      lastMessage.direction === "OUTBOUND" &&
      lastMessage.createdAt > cutoff
    ) {
      continue; // already followed up within the window
    }

    const { sent } = await sendIdleFollowUp(
      { name: customer.firstName, email: customer.email! },
      tenant.businessName,
    );

    await db.message.create({
      data: {
        customerId: customer.id,
        direction: "OUTBOUND",
        channel: "EMAIL",
        body: `Idle follow-up sent (${sent ? "delivered" : "logged only — no RESEND_API_KEY set"}).`,
      },
    });

    results.push({ customerId: customer.id, sent });
  }

  return NextResponse.json({
    checked: candidates.length,
    followedUp: results.length,
    results,
  });
}
