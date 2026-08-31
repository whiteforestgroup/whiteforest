import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "bg-accent/15 text-accent flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar };
