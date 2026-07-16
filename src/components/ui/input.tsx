import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink placeholder:text-ink-soft transition focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/15",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
