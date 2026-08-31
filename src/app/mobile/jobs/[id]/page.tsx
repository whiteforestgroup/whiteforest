"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Check, Camera } from "lucide-react";
import { toast } from "sonner";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { jobs } from "@/lib/mobile-data";

function formatHour(hour: number) {
  const h = Math.floor(hour);
  const m = hour % 1 === 0.5 ? "30" : "00";
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${m} ${period}`;
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = jobs.find((j) => j.id === id);
  const [beforePhoto, setBeforePhoto] = useState(job?.beforePhoto ?? false);
  const [afterPhoto, setAfterPhoto] = useState(job?.afterPhoto ?? false);

  if (!job) return notFound();

  return (
    <div>
      <MobileHeader
        title={job.customerName}
        subtitle={`${job.address}, ${job.city}`}
        back={{ label: "Jobs", href: "/mobile/jobs" }}
      />

      <div className="px-6 pt-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-500">Service</span>
            <span className="font-medium text-stone-900">{job.service}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-500">Time</span>
            <span className="font-medium text-stone-900">
              {formatHour(job.startHour)}
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-500">Price</span>
            <span className="font-medium text-stone-900">
              ${job.price.toFixed(2)}
            </span>
          </div>
        </div>

        <h2 className="mt-6 mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
          Before &amp; After Photos
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setBeforePhoto((v) => !v)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-6 shadow-sm ${
              beforePhoto
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-500"
            }`}
          >
            {beforePhoto ? (
              <Check className="h-6 w-6" />
            ) : (
              <Camera className="h-6 w-6" />
            )}
            <span className="text-sm font-semibold">
              {beforePhoto ? "Before added" : "Add before"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setAfterPhoto((v) => !v)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-6 shadow-sm ${
              afterPhoto ? "bg-amber-500 text-white" : "bg-white text-stone-500"
            }`}
          >
            {afterPhoto ? (
              <Check className="h-6 w-6" />
            ) : (
              <Camera className="h-6 w-6" />
            )}
            <span className="text-sm font-semibold">
              {afterPhoto ? "After added" : "Add after"}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.success(`${job.customerName}'s job marked complete`)
          }
          className="mt-8 w-full rounded-full bg-amber-500 py-3.5 text-center font-semibold text-white shadow-sm"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}
