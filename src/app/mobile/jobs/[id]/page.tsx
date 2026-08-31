import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { JobDetailActions } from "@/components/mobile/JobDetailActions";
import { getBooking } from "@/lib/queries";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getBooking(id);
  if (!job) return notFound();

  return (
    <div>
      <MobileHeader
        title={`${job.customer.firstName} ${job.customer.lastName}`}
        subtitle={[job.customer.address, job.customer.city]
          .filter(Boolean)
          .join(", ")}
        back={{ label: "Jobs", href: "/mobile/jobs" }}
      />

      <div className="px-6 pt-4">
        <div className="bg-card-bg rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-fg-muted text-sm">Service</span>
            <span className="text-fg font-medium">
              {job.service?.name ?? "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-fg-muted text-sm">Time</span>
            <span className="text-fg font-medium">
              {job.scheduledAt ? format(job.scheduledAt, "h:mm a") : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-fg-muted text-sm">Price</span>
            <span className="text-fg font-medium">
              ${Number(job.price).toFixed(2)}
            </span>
          </div>
        </div>

        <JobDetailActions
          bookingId={job.id}
          firstName={job.customer.firstName}
          initialBeforePhoto={Boolean(job.beforePhotoUrl)}
          initialAfterPhoto={Boolean(job.afterPhotoUrl)}
          isCompleted={job.status === "COMPLETED"}
        />
      </div>
    </div>
  );
}
