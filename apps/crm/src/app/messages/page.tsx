import { messages } from "@/lib/mock-data";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export default function MessagesPage() {
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
              <Avatar>
                {m.customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-neutral-900">
                    {m.customerName}
                  </p>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {m.timestamp}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-neutral-500">
                  {m.direction === "inbound" ? (
                    <ArrowDownLeft className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                  )}
                  {m.preview}
                </p>
              </div>
              {m.unread && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
