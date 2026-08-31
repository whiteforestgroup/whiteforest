"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MobileHeader } from "@/components/mobile/MobileHeader";

const LEAD_SOURCES = ["Referral", "Google", "Website", "Walk-In"];

export default function AddCustomerPage() {
  const router = useRouter();
  const [leadSource, setLeadSource] = useState("Referral");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    toast.success("Customer saved");
    router.push("/mobile/customers");
  }

  return (
    <div>
      <MobileHeader
        title="New Customer"
        back={{ label: "Cancel", href: "/mobile/customers" }}
      />

      <form onSubmit={handleSubmit} className="space-y-4 px-6 pt-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
              First Name
            </label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
              Last Name
            </label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Phone
          </label>
          <input
            type="tel"
            placeholder="(555) 000-0000"
            required
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-300 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Address
          </label>
          <input
            placeholder="Street, City, State"
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-300 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
            Lead Source
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {LEAD_SOURCES.map((source) => (
              <button
                key={source}
                type="button"
                onClick={() => setLeadSource(source)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  leadSource === source
                    ? "bg-amber-500 text-white"
                    : "bg-white text-stone-600 shadow-sm"
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-amber-500 py-3.5 text-center font-semibold text-white shadow-sm"
        >
          Save Customer
        </button>
        <Link
          href="/mobile/customers"
          className="block text-center text-sm text-stone-400"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
