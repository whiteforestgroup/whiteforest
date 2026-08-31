import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getMessages, customerName } from "@/lib/queries";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        Messages
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        SMS conversations synced via Twilio.
      </p>

      <Card className="mt-8 py-0">
        <ul className="divide-y divide-neutral-100">
          {messages.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700">
                {m.customer.firstName[0]}
                {m.customer.lastName[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-neutral-900">
                    {customerName(m.customer)}
                  </p>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {format(m.createdAt, "MMM d, p")}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-neutral-500">
                  {m.direction === "INBOUND" ? (
                    <ArrowDownLeft className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                  )}
                  {m.body}
                </p>
              </div>
              {!m.read && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
