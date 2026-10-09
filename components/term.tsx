import type React from "react"
import { cn } from "@/lib/utils"
import { profile } from "@/lib/data"

/** `shougata@darwin:~/path$` */
export function Prompt({ path = "~", className }: { path?: string; className?: string }) {
  return (
    <span className={cn("select-none whitespace-nowrap", className)} aria-hidden>
      <span className="text-green">
        {profile.handle}@{profile.host}
      </span>
      <span className="text-dim">:</span>
      <span className="text-blue">{path}</span>
      <span className="text-dim">$</span>
    </span>
  )
}

/** Terminal window frame with traffic-light dots and a title. */
export function Window({
  title,
  right,
  children,
  className,
  bodyClassName,
}: {
  title: string
  right?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-surface shadow-[0_1px_0_0_var(--line),0_20px_50px_-30px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-3.5 py-2.5">
        <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 shrink-0 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 shrink-0 rounded-full bg-[#28c840]" />
        <span className="ml-2 min-w-0 flex-1 truncate text-xs text-dim">{title}</span>
        {right}
      </div>
      <div className={cn("p-4 sm:p-6", bodyClassName)}>{children}</div>
    </div>
  )
}

/** A page section headed by the command that "produced" it. */
export function Section({
  id,
  command,
  title,
  children,
}: {
  id: string
  command: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-in mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="mb-2 overflow-x-auto text-xs sm:text-sm">
        <Prompt path={`~/${id}`} /> <span className="text-text">{command}</span>
      </p>
      <h2 id={`${id}-title`} className="mb-8 text-2xl font-semibold tracking-tight sm:mb-10 sm:text-3xl">
        <span className="text-green" aria-hidden>
          #{" "}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

/** Inline link styled like terminal output. */
export function TermLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-green hover:decoration-green",
        className,
      )}
    >
      {children}
    </a>
  )
}
