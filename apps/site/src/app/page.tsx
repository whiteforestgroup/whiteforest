import { BookingForm } from "@/components/BookingForm";
import { Hero } from "@/components/Hero";
import { ServicePackages } from "@/components/ServicePackages";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicePackages />
      <section id="booking" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Book Your Detail
            </h2>
            <p className="mt-3 text-slate-600">
              Fill out the form below and we&apos;ll reach out to confirm your appointment.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
