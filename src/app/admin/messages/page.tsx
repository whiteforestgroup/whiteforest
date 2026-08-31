import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getMessages, customerName } from "@/lib/queries";

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Messages</h1>
      <p className="text-fg-muted mt-1 text-sm">
        SMS conversations synced via Twilio.
      </p>

      <Card className="mt-8 py-0">
        <ul className="divide-card-border divide-y">
          {messages.map((m) => (
            <li
              key={m.id}
              className="hover:bg-app-bg flex items-center gap-4 px-6 py-4"
            >
              <div className="bg-card-border text-fg flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold">
                {m.customer.firstName[0]}
                {m.customer.lastName[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-fg font-medium">
                    {customerName(m.customer)}
                  </p>
                  <span className="text-fg-subtle shrink-0 text-xs">
                    {format(m.createdAt, "MMM d, p")}
                  </span>
                </div>
                <p className="text-fg-muted mt-0.5 flex items-center gap-1.5 truncate text-sm">
                  {m.direction === "INBOUND" ? (
                    <ArrowDownLeft className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="text-fg-subtle h-3.5 w-3.5 shrink-0" />
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
