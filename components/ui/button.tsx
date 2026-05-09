import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "default" | "sm" | "lg";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const variants = {
    default: "bg-white text-black hover:bg-zinc-200",
    secondary: "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-800",
    ghost: "text-zinc-300 hover:bg-zinc-900 hover:text-white",
    outline: "border border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-900",
    gradient: "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-violet-500/30"
  };
  const sizes = {
    default: "h-11 px-5 py-2",
    sm: "h-9 px-3",
    lg: "h-12 px-6"
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-base font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
