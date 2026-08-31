import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ComingSoon({
  title,
  description,
  icon: Icon,
  bullets,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
}) {
  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-fg-muted mt-1 text-sm">{description}</p>

      <Card className="mt-8 items-center p-10 text-center">
        <div className="bg-accent/15 text-accent flex h-12 w-12 items-center justify-center rounded-full">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-fg mt-4 font-semibold">Not built yet</p>
        <ul className="text-fg-muted mx-auto mt-3 max-w-sm space-y-1.5 text-left text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-accent">•</span>
              {b}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
