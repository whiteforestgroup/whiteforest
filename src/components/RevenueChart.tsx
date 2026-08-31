"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO } from "date-fns";

export function RevenueChart({
  data,
}: {
  data: { date: string; revenue: number }[];
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tickFormatter={(value: string) => format(parseISO(value), "MMM d")}
            tick={{ fontSize: 12, fill: "var(--color-fg-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => `$${value}`}
            tick={{ fontSize: 12, fill: "var(--color-fg-muted)" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
            labelFormatter={(value) =>
              typeof value === "string"
                ? format(parseISO(value), "EEEE, MMM d")
                : value
            }
            contentStyle={{
              borderRadius: 8,
              borderColor: "#e5e5e5",
              fontSize: 13,
            }}
          />
          <Bar dataKey="revenue" fill="#171717" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
