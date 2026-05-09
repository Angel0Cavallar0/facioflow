import { ShieldCheck } from "lucide-react"

export function ShieldCheckIcon({ className, size = 32, strokeWidth = 2.25, ...props }) {
  return (
    <ShieldCheck
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden
      {...props}
    />
  )
}
