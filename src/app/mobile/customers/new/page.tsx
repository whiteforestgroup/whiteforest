"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { createCustomer } from "@/lib/actions";

const LEAD_SOURCES = ["Referral", "Google", "Website", "Walk-In"];

export default function AddCustomerPage() {
  const [leadSource, setLeadSource] = useState("Referral");

  return (
    <div>
      <MobileHeader
        title="New Customer"
        back={{ label: "Cancel", href: "/mobile/customers" }}
      />

      <form action={createCustomer} className="space-y-4 px-6 pt-4">
        <input type="hidden" name="leadSource" value={leadSource} />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-fg-subtle text-xs font-semibold tracking-wide uppercase">
              First Name
            </label>
            <input
              name="firstName"
              required
              className="border-card-border bg-card-bg text-fg mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-fg-subtle text-xs font-semibold tracking-wide uppercase">
              Last Name
            </label>
            <input
              name="lastName"
              required
              className="border-card-border bg-card-bg text-fg mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-fg-subtle text-xs font-semibold tracking-wide uppercase">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 000-0000"
            required
            className="border-card-border bg-card-bg text-fg placeholder:text-fg-subtle mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-fg-subtle text-xs font-semibold tracking-wide uppercase">
            Address
          </label>
          <input
            name="address"
            placeholder="Street, City, State"
            className="border-card-border bg-card-bg text-fg placeholder:text-fg-subtle mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-fg-subtle text-xs font-semibold tracking-wide uppercase">
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
                    : "bg-card-bg text-fg-muted shadow-sm"
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
          className="text-fg-subtle block text-center text-sm"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
