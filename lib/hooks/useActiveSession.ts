'use client'

import { useEffect, useState } from "react"

const sectionIds = ["about", "skills", "projects", "contact"]

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}