import Link from "next/link";
import { format } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getBookings, customerName } from "@/lib/queries";
import { bookingStatusMobileClass, bookingStatusLabel } from "@/lib/status";
import { db } from "@/lib/db";

export default async function TodayPage() {
  const [bookings, revenueAgg, leadCount] = await Promise.all([
    getBookings(),
    db.booking.aggregate({ _sum: { price: true } }),
    db.customer.count(),
  ]);

  const upNext = bookings.filter((b) => b.scheduledAt).slice(0, 3);
  const revenue = Number(revenueAgg._sum.price ?? 0);

  return (
    <div>
      <MobileHeader
        title="Today"
        subtitle={format(new Date(), "EEEE, MMMM d")}
      />

      <div className="px-6 pt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card-bg rounded-2xl p-3 shadow-sm">
            <p className="text-fg-subtle text-[11px] font-medium tracking-wide uppercase">
              Revenue
            </p>
            <p className="text-fg mt-1 text-lg font-bold">
              ${revenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-card-bg rounded-2xl p-3 shadow-sm">
            <p className="text-fg-subtle text-[11px] font-medium tracking-wide uppercase">
              Leads
            </p>
            <p className="text-fg mt-1 text-lg font-bold">{leadCount}</p>
          </div>
          <div className="bg-card-bg rounded-2xl p-3 shadow-sm">
            <p className="text-fg-subtle text-[11px] font-medium tracking-wide uppercase">
              Jobs
            </p>
            <p className="text-fg mt-1 text-lg font-bold">{bookings.length}</p>
          </div>
        </div>

        <h2 className="text-fg-subtle mt-6 mb-2 text-xs font-semibold tracking-wide uppercase">
          Up Next
        </h2>
        <div className="space-y-2">
          {upNext.map((job) => (
            <Link
              key={job.id}
              href={`/mobile/jobs/${job.id}`}
              className="bg-card-bg flex items-center justify-between rounded-2xl p-4 shadow-sm"
            >
              <div>
                <p className="text-fg font-semibold">
                  {customerName(job.customer)}
                </p>
                <p className="text-fg-muted text-sm">
                  {job.scheduledAt && format(job.scheduledAt, "h:mm a")} ·{" "}
                  {job.service?.name}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${bookingStatusMobileClass[job.status]}`}
              >
                {bookingStatusLabel[job.status]}
              </span>
            </Link>
          ))}
          {upNext.length === 0 && (
            <p className="bg-card-bg text-fg-subtle rounded-2xl p-4 text-center text-sm shadow-sm">
              Nothing scheduled yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
