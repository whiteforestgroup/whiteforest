import Link from "next/link";
import { format, parseISO } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { jobs, jobStatusClass, jobStatusLabel } from "@/lib/mobile-data";

function formatHour(hour: number) {
  const h = Math.floor(hour);
  const m = hour % 1 === 0.5 ? "30" : "00";
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${m} ${period}`;
}

export default function JobsPage() {
  const byDay = new Map<string, typeof jobs>();
  for (const job of [...jobs].sort((a, b) => a.startHour - b.startHour)) {
    const list = byDay.get(job.date) ?? [];
    list.push(job);
    byDay.set(job.date, list);
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
              {format(parseISO(date), "EEE, MMM d").toUpperCase()}
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
        ))}
      </div>
    </div>
  );
}
