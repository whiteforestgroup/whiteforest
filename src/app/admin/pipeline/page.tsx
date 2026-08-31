import { PipelineBoard } from "@/components/PipelineBoard";
import { getBookings } from "@/lib/queries";

export default async function PipelinePage() {
  const bookings = await getBookings();

  const initialBookings = bookings.map((b) => ({
    id: b.id,
    status: b.status,
    price: Number(b.price),
    customer: {
      firstName: b.customer.firstName,
      lastName: b.customer.lastName,
      phone: b.customer.phone,
      address: b.customer.address,
    },
    vehicle: b.vehicle
      ? { year: b.vehicle.year, make: b.vehicle.make, model: b.vehicle.model }
      : null,
    service: b.service ? { name: b.service.name } : null,
  }));

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Pipeline</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Drag jobs between stages as they move through your workflow.
      </p>
      <PipelineBoard initialBookings={initialBookings} />
    </div>
  );
}
