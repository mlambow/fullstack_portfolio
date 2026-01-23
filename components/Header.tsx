'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useActiveSection } from "@/lib/hooks/useActiveSession"

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
]

export const Header = () => {
  const activeSection = useActiveSection()

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
        <Link href="/" className="text-lg font-thin">
          Wandile Mlambo
        </Link>

        <nav className="hidden md:flex space-x-8 text-base">
          {links.map(({ label, href, id }) => (
            <Link
              key={id}
              href={href}
              className={cn(
                "text-neutral-500 transition-colors font-thin",
                activeSection === id &&
                  "text-neutral-900 font-semibold"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
