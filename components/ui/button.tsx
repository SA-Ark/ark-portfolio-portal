import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "default" | "sm" | "lg";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  const variants = {
    default: "bg-white text-black hover:bg-zinc-200",
    secondary: "border border-white/[0.08] bg-white/[0.04] text-zinc-100 backdrop-blur-xl hover:border-cyan-400/30 hover:bg-cyan-400/10",
    ghost: "text-zinc-300 hover:bg-white/[0.05] hover:text-white",
    outline: "border border-white/[0.12] bg-transparent text-zinc-100 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100",
    gradient: "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:shadow-violet-500/30"
  };
  const sizes = {
    default: "h-11 px-5 py-2",
    sm: "h-9 px-3",
    lg: "h-12 px-6"
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl text-base font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
