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
                : "bg-card-bg text-fg-muted shadow-sm"
            }`}
          >
            {s.name} · {s.customers.length}
          </button>
        ))}
      </div>

      <div className="px-6 pt-4">
        <h2 className="text-fg-subtle mb-2 text-xs font-semibold tracking-wide uppercase">
          {stage?.name}
        </h2>
        <div className="space-y-2">
          {stage?.customers.map((c) => {
            const idleDays = differenceInCalendarDays(new Date(), c.updatedAt);
            return (
              <div
                key={c.id}
                className="bg-card-bg flex items-center justify-between rounded-2xl p-4 shadow-sm"
              >
                <div>
                  <p className="text-fg font-semibold">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-fg-muted text-sm">
                    {c.notes ?? c.leadSource ?? "—"}
                  </p>
                </div>
                <span className="bg-card-border text-fg-muted rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap">
                  {idleDays === 0 ? "New" : `${idleDays}d idle`}
                </span>
              </div>
            );
          })}
          {stage?.customers.length === 0 && (
            <div className="border-card-border text-fg-subtle rounded-2xl border border-dashed p-6 text-center text-sm">
              No customers in this stage.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
