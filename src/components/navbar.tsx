"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Egg } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-earth/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Egg className="h-6 w-6 text-yolk" />
          <span className="text-xl font-bold text-foreground">UltraFresh</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-yolk-dark",
                pathname === link.href ? "text-farm" : "text-earth"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
