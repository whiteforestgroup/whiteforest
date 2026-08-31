import Link from "next/link";
import { format } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { getBookings, customerName } from "@/lib/queries";
import { bookingStatusMobileClass, bookingStatusLabel } from "@/lib/status";

type Booking = Awaited<ReturnType<typeof getBookings>>[number];

export default async function JobsPage() {
  const bookings = await getBookings();

  const byDay = new Map<string, Booking[]>();
  for (const job of bookings.filter((b) => b.scheduledAt)) {
    const key = format(job.scheduledAt!, "yyyy-MM-dd");
    const list = byDay.get(key) ?? [];
    list.push(job);
    byDay.set(key, list);
  }
  const days = Array.from(byDay.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <div>
      <MobileHeader title="Jobs" subtitle="This week" />

      <div className="space-y-6 px-6 pt-4">
        {days.map(([date, dayJobs]) => (
          <div key={date}>
            <h2 className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
              {format(new Date(`${date}T00:00:00`), "EEE, MMM d").toUpperCase()}
            </h2>
            <div className="space-y-2">
              {dayJobs.map((job) => (
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
                      {format(job.scheduledAt!, "h:mm a")} · {job.service?.name}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${bookingStatusMobileClass[job.status]}`}
                  >
                    {bookingStatusLabel[job.status]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
