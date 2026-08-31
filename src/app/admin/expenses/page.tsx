import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { getExpenses } from "@/lib/queries";

export default async function ExpensesPage() {
  const expenses = await getExpenses();
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Expenses</h1>
      <p className="text-fg-muted mt-1 text-sm">
        ${total.toFixed(2)} tracked this month.
      </p>

      <Card className="mt-8 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="text-fg font-medium">
                  {expense.vendor}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {expense.category}
                </TableCell>
                <TableCell className="text-fg-muted">
                  {expense.date.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-fg">
                  ${Number(expense.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
