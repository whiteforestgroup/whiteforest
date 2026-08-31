import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar };
