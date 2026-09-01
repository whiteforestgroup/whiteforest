"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createScheduledBooking } from "@/lib/actions";

type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string | null;
};
type Service = {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
};

export function ScheduleBookingDialog({
  date,
  customers,
  services,
  onClose,
}: {
  date: string;
  customers: Customer[];
  services: Service[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [customerId, setCustomerId] = useState("__new__");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.set("date", date);

    startTransition(async () => {
      try {
        await createScheduledBooking(formData);
        toast.success("Job scheduled");
        router.refresh();
        onClose();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Couldn't schedule that job.",
        );
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-card-bg w-full max-w-md rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-fg text-lg font-semibold">
            Schedule a job —{" "}
            {format(new Date(`${date}T00:00:00`), "MMM d, yyyy")}
          </h2>
          <button type="button" onClick={onClose} className="text-fg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-fg-muted text-xs font-semibold tracking-wide uppercase">
              Customer
            </label>
            <select
              name="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="border-card-border bg-card-bg text-fg mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="__new__">+ New customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.phone}
                </option>
              ))}
            </select>
          </div>

          {customerId === "__new__" && (
            <div className="grid grid-cols-2 gap-3">
              <Input name="firstName" placeholder="First name" required />
              <Input name="lastName" placeholder="Last name" />
              <Input
                name="phone"
                placeholder="Phone"
                required
                className="col-span-2"
              />
            </div>
          )}

          <div>
            <label className="text-fg-muted text-xs font-semibold tracking-wide uppercase">
              Service
            </label>
            <select
              name="serviceId"
              required
              defaultValue=""
              className="border-card-border bg-card-bg text-fg mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — ${s.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-fg-muted text-xs font-semibold tracking-wide uppercase">
              Time
            </label>
            <Input name="time" type="time" defaultValue="09:00" required />
          </div>

          <div>
            <label className="text-fg-muted text-xs font-semibold tracking-wide uppercase">
              Address
            </label>
            <Input name="address" placeholder="Service address" />
          </div>

          <div>
            <label className="text-fg-muted text-xs font-semibold tracking-wide uppercase">
              Notes
            </label>
            <textarea
              name="notes"
              rows={2}
              className="border-card-border bg-card-bg text-fg mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Scheduling…" : "Schedule Job"}
          </Button>
        </form>
      </div>
    </div>
  );
}
