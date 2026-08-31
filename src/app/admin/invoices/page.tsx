import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getInvoices, customerName } from "@/lib/queries";
import { invoiceStatusLabel } from "@/lib/status";

const invoiceBadgeVariant = {
  PAID: "emerald",
  SENT: "blue",
  OVERDUE: "red",
  DRAFT: "secondary",
} as const;

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Invoices</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Track what&apos;s been billed and paid.
      </p>

      <Card className="mt-8 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="text-fg font-medium">
                  {customerName(invoice.customer)}
                </TableCell>
                <TableCell className="text-fg">
                  ${Number(invoice.amount).toFixed(2)}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {invoice.dueDate ? invoice.dueDate.toLocaleDateString() : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={invoiceBadgeVariant[invoice.status]}>
                    {invoiceStatusLabel[invoice.status]}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
