// Pure presentation helpers safe to import from Client Components — no
// database import here, unlike queries.ts.

export function vehicleLabel(
  vehicle: {
    year: number | null;
    make: string | null;
    model: string | null;
  } | null,
) {
  if (!vehicle) return "No vehicle on file";
  return [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
}

export function customerName(customer: {
  firstName: string;
  lastName: string;
}) {
  return `${customer.firstName} ${customer.lastName}`;
}
