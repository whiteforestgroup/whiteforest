import { Camera } from "lucide-react";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { expenses, expensesThisMonth } from "@/lib/mobile-data";

export default function ExpensesPage() {
  return (
    <div className="relative min-h-[550px]">
      <MobileHeader
        title="Expenses"
        subtitle={`$${expensesThisMonth.toFixed(0)} this month`}
        back={{ label: "More", href: "/mobile/more" }}
      />

      <div className="space-y-2 px-6 pt-4 pb-20">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-stone-900">{expense.vendor}</p>
              <p className="text-sm text-stone-500">
                {expense.category} · {expense.date}
              </p>
            </div>
            <p className="font-semibold text-stone-900">
              ${expense.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute right-6 bottom-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg"
      >
        <Camera className="h-5 w-5" />
      </button>
    </div>
  );
}
