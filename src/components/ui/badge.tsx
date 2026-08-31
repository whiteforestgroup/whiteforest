import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-50",
        secondary: "bg-neutral-100 text-neutral-900",
        amber: "bg-amber-100 text-amber-800",
        blue: "bg-blue-100 text-blue-800",
        purple: "bg-purple-100 text-purple-800",
        emerald: "bg-emerald-100 text-emerald-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
