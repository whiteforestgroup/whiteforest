// Thin notification layer for automations. Sends real email via Resend's
// HTTP API when RESEND_API_KEY is set; otherwise logs what would have been
// sent so automations are safe to run/test before real credentials exist.

const OWNER_EMAIL = process.env.OWNER_NOTIFICATION_EMAIL ?? "";
const FROM_EMAIL =
  process.env.NOTIFICATION_FROM_EMAIL ?? "onboarding@resend.dev";

async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to) {
    console.log(
      `[notify:skipped] to=${to || "(no address configured)"} subject="${subject}"\n${text}`,
    );
    return { sent: false as const };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, text }),
  });

  if (!res.ok) {
    console.error(`[notify:failed] ${res.status} ${await res.text()}`);
    return { sent: false as const };
  }

  return { sent: true as const };
}

export async function notifyOwnerOfNewLead(lead: {
  name: string;
  phone: string;
  email: string;
  packageName: string;
  address: string;
}) {
  return sendEmail({
    to: OWNER_EMAIL,
    subject: `New lead: ${lead.name} (${lead.packageName})`,
    text: `New booking request from your website.\n\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nPackage: ${lead.packageName}\nAddress: ${lead.address}\n\nView it in the CRM: /admin/pipeline`,
  });
}

export async function sendLeadAutoReply(
  lead: { name: string; email: string },
  businessName: string,
) {
  return sendEmail({
    to: lead.email,
    subject: `We got your request — ${businessName}`,
    text: `Hi ${lead.name},\n\nThanks for booking with ${businessName}! We received your request and will text or call you shortly to confirm a time.\n\n— ${businessName}`,
  });
}

export async function sendIdleFollowUp(
  lead: { name: string; email: string },
  businessName: string,
) {
  return sendEmail({
    to: lead.email,
    subject: `Still interested? — ${businessName}`,
    text: `Hi ${lead.name},\n\nJust checking in — you reached out to ${businessName} a few days ago. Want us to get you on the schedule? Reply to this email or give us a call.\n\n— ${businessName}`,
  });
}
