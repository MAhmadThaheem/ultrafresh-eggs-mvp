import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-yolk text-yolk-foreground": variant === "default",
          "border-transparent bg-earth/10 text-earth": variant === "secondary",
          "border-transparent bg-red-500 text-white": variant === "destructive",
          "text-foreground": variant === "outline",
          "border-transparent bg-farm text-white": variant === "success",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
