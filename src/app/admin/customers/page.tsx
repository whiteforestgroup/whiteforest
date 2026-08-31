import { customers } from "@/lib/mock-data";
import { Phone, Mail, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Customers
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {customers.length} customers across all locations.
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
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
                    <Avatar>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <span className="font-medium text-neutral-900">
                      {customer.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-neutral-400" />
                    {customer.phone}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-neutral-400" />
                    {customer.email}
                  </div>
                </TableCell>
                <TableCell className="text-neutral-700">
                  {customer.vehicle}
                </TableCell>
                <TableCell className="text-neutral-700">
                  {customer.visits}
                </TableCell>
                <TableCell className="font-medium text-neutral-900">
                  ${customer.totalSpent}
                </TableCell>
                <TableCell className="text-neutral-500">
                  {customer.lastVisit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
