"use client";

import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import type { getPipelineStagesWithCustomers } from "@/lib/queries";

type Stages = Awaited<ReturnType<typeof getPipelineStagesWithCustomers>>;

export function PipelineStageList({
  stages,
  totalCustomers,
}: {
  stages: Stages;
  totalCustomers: number;
}) {
  const [activeStageId, setActiveStageId] = useState(
    stages[1]?.id ?? stages[0]?.id,
  );
  const stage = stages.find((s) => s.id === activeStageId) ?? stages[0];

  return (
    <div>
      <MobileHeader title="Pipeline" subtitle={`${totalCustomers} customers`} />

      <div className="flex gap-2 overflow-x-auto px-6 pt-4 pb-1">
        {stages.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveStageId(s.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${
              s.id === activeStageId
                ? "bg-amber-500 text-white"
                : "bg-white text-stone-600 shadow-sm"
            }`}
          >
            {s.name} · {s.customers.length}
          </button>
        ))}
      </div>

      <div className="px-6 pt-4">
        <h2 className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
          {stage?.name}
        </h2>
        <div className="space-y-2">
          {stage?.customers.map((c) => {
            const idleDays = differenceInCalendarDays(new Date(), c.updatedAt);
            return (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-stone-900">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-sm text-stone-500">
                    {c.notes ?? c.leadSource ?? "—"}
                  </p>
                </div>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-stone-500">
                  {idleDays === 0 ? "New" : `${idleDays}d idle`}
                </span>
              </div>
            );
          })}
          {stage?.customers.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-400">
              No customers in this stage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
