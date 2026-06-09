import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[130px] w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 transition focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/15",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
