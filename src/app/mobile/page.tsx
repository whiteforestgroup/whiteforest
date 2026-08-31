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
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Revenue
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">
              ${revenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Leads
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">{leadCount}</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Jobs
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">
              {bookings.length}
            </p>
          </div>
        </div>

        <h2 className="mt-6 mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
          Up Next
        </h2>
        <div className="space-y-2">
          {upNext.map((job) => (
            <Link
              key={job.id}
              href={`/mobile/jobs/${job.id}`}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold text-stone-900">
                  {customerName(job.customer)}
                </p>
                <p className="text-sm text-stone-500">
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
            <p className="rounded-2xl bg-white p-4 text-center text-sm text-stone-400 shadow-sm">
              Nothing scheduled yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
