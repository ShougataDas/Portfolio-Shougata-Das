"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"
import { OpenShellButton } from "@/components/shell"
import { profile, sections } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Header() {
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      if (window.scrollY < 200) setActive(null)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (items) => {
        for (const item of items) if (item.isIntersecting) setActive(item.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const path = active ? `~/${active}` : "~"
  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors",
        scrolled || menuOpen ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <a href="#" className="min-w-0 shrink truncate text-sm" aria-label="Back to top">
          <span className="text-green">
            {profile.handle}
            <span className="hidden sm:inline lg:hidden xl:inline">@{profile.host}</span>
          </span>
          <span className="text-dim">:</span>
          <span className="text-blue">{path}</span>
          <span className="text-dim">$</span>
          <span className="cursor ml-1 !h-[0.9em] !w-[0.5em]" aria-hidden />
        </a>

        <nav aria-label="Sections" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={cn(
                    "rounded px-2 py-1 transition-colors hover:text-green",
                    active === s.id ? "text-green" : "text-dim",
                  )}
                >
                  ./{s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <OpenShellButton compact />
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center rounded-md border border-line p-1.5 text-dim transition hover:border-green hover:text-green"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center rounded-md border border-line p-1.5 text-dim transition hover:border-green hover:text-green lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line lg:hidden">
          <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-1 px-4 py-3 text-sm sm:grid-cols-4 sm:px-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded px-2 py-2 transition-colors hover:bg-surface-2 hover:text-green",
                    active === s.id ? "text-green" : "text-text",
                  )}
                >
                  <span className="text-dim">cd </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
