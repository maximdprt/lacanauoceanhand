import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] [&>svg:last-child]:transition-transform [&>svg:last-child]:duration-200 hover:[&>svg:last-child]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white hover:bg-ocean rounded-full shadow-(--shadow-sm)",
        ocean: "bg-ocean text-white hover:bg-ocean-deep rounded-full shadow-(--shadow-sm)",
        outline: "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-white rounded-full",
        ghost: "text-ink hover:bg-mist rounded-full",
        light: "bg-white text-ink hover:bg-mist rounded-full shadow-(--shadow-sm)",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-[52px] px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  ),
);
Button.displayName = "Button";

export { Button };
