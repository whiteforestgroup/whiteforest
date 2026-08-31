import Link from "next/link";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { jobs, jobStatusClass, jobStatusLabel } from "@/lib/mobile-data";

function formatHour(hour: number) {
  const h = Math.floor(hour);
  const m = hour % 1 === 0.5 ? "30" : "00";
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${m} ${period}`;
}

export default function TodayPage() {
  const upNext = [...jobs]
    .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour)
    .slice(0, 3);

  return (
    <div>
      <MobileHeader title="Today" subtitle="Wednesday, August 26" />

      <div className="px-6 pt-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Revenue
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">$18.2k</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Leads
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">12</p>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium tracking-wide text-stone-400 uppercase">
              Jobs
            </p>
            <p className="mt-1 text-lg font-bold text-stone-900">9</p>
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
                  {job.customerName}
                </p>
                <p className="text-sm text-stone-500">
                  {formatHour(job.startHour)} · {job.service}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${jobStatusClass[job.status]}`}
              >
                {jobStatusLabel[job.status]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
