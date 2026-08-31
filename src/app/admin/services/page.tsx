import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getServices } from "@/lib/queries";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Services</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Your service catalog and pricing.
      </p>

      <Card className="mt-8 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="text-fg font-medium">
                  {service.name}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {service.durationMinutes} min
                </TableCell>
                <TableCell className="text-fg font-medium">
                  {service.originalPrice && (
                    <span className="text-fg-subtle mr-2 line-through">
                      ${Number(service.originalPrice)}
                    </span>
                  )}
                  ${Number(service.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
