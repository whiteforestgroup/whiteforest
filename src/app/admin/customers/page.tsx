import { format } from "date-fns";
import { Phone, Mail, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getCustomers, customerName } from "@/lib/queries";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-fg text-2xl font-bold tracking-tight">
            Customers
          </h1>
          <p className="text-fg-muted mt-1 text-sm">
            {customers.length} customers across all locations.
          </p>
        </div>
        <div className="relative">
          <Search className="text-fg-subtle pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search customers..."
            disabled
            className="w-64 pl-9"
          />
        </div>
      </div>

      <Card className="mt-8 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Visit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-card-border text-fg flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">
                      {customer.firstName[0]}
                      {customer.lastName[0]}
                    </div>
                    <span className="text-fg font-medium">
                      {customerName(customer)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-fg-muted">
                  <div className="flex items-center gap-1.5">
                    <Phone className="text-fg-subtle h-3.5 w-3.5" />
                    {customer.phone}
                  </div>
                  {customer.email && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <Mail className="text-fg-subtle h-3.5 w-3.5" />
                      {customer.email}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-fg">
                  {customer.vehicles[0]
                    ? [
                        customer.vehicles[0].year,
                        customer.vehicles[0].make,
                        customer.vehicles[0].model,
                      ]
                        .filter(Boolean)
                        .join(" ")
                    : "—"}
                </TableCell>
                <TableCell className="text-fg">{customer.visits}</TableCell>
                <TableCell className="text-fg font-medium">
                  ${customer.totalSpent.toLocaleString()}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {customer.lastVisit
                    ? format(customer.lastVisit, "yyyy-MM-dd")
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
