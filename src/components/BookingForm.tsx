"use client";

import { useState, type FormEvent } from "react";
import { servicePackages } from "@/lib/services";
import { tenant } from "@/lib/tenant";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error ?? "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">
          Request received!
        </h3>
        <p className="mt-2 text-slate-600">
          Thanks for booking with {tenant.businessName}. We&apos;ll text or call
          you at the number you provided to confirm a time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold underline"
          style={{ color: tenant.colors.primary }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="name"
        >
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="phone"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="packageId"
        >
          Package
        </label>
        <select
          id="packageId"
          name="packageId"
          required
          defaultValue=""
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        >
          <option value="" disabled>
            Select a package
          </option>
          {servicePackages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} &mdash; ${pkg.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="preferredDate"
        >
          Preferred date
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="address"
        >
          Service address
        </label>
        <input
          id="address"
          name="address"
          required
          placeholder="Where should we come detail your vehicle?"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="notes"
        >
          Vehicle details / notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Year, make, model, and anything else we should know"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 sm:col-span-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60 sm:col-span-2"
        style={{ backgroundColor: tenant.colors.primary }}
      >
        {status === "submitting" ? "Sending..." : "Request Booking"}
      </button>
    </form>
  );
}
