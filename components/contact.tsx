"use client"

import type React from "react"
import { useState } from "react"
import { Section, TermLink, Window } from "@/components/term"
import { profile } from "@/lib/data"

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string }

const fields = [
  { id: "name", label: "name", type: "text", autoComplete: "name", placeholder: "Ada Lovelace" },
  { id: "email", label: "email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
  { id: "subject", label: "subject", type: "text", autoComplete: "off", placeholder: "Graduate role at …" },
] as const

const empty = { name: "", email: "", subject: "", message: "", company: "" }

export function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ kind: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Failed to send message")
      setStatus({ kind: "ok" })
      setForm(empty)
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Failed to send message" })
    }
  }

  const inputClass =
    "w-full min-w-0 border-0 border-b border-line bg-transparent px-0 py-1.5 text-text placeholder:text-dim/60 transition-colors focus:border-green focus:outline-none focus-visible:outline-none"

  return (
    <Section id="contact" command="./contact.sh" title="Contact">
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-6">
          <p className="font-sans text-base leading-relaxed text-text sm:text-lg">
            I&apos;m open to internships, graduate roles and research collaborations in ML and AI engineering. The
            quickest way to reach me is email.
          </p>
          <dl className="space-y-2 text-sm">
            {[
              ["email", <TermLink key="e" href={`mailto:${profile.email}`}>{profile.email}</TermLink>],
              ["github", <TermLink key="g" href={profile.github}>ShougataDas</TermLink>],
              ["linkedin", <TermLink key="l" href={profile.linkedin}>shougata-das</TermLink>],
              ...(profile.cvUrl ? [["cv", <TermLink key="cv" href={profile.cvUrl}>view CV</TermLink>]] : []),
              ["location", <span key="loc">{profile.location}</span>],
            ].map(([k, v]) => (
              <div key={k as string} className="grid grid-cols-[5.5rem_1fr] gap-2">
                <dt className="text-yellow">{k}</dt>
                <dd className="min-w-0 break-words text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Window title="send_message.sh">
          <form onSubmit={onSubmit} className="space-y-4 text-sm sm:text-base" noValidate={false}>
            {fields.map((f) => (
              <div key={f.id} className="grid grid-cols-[auto_1fr] items-baseline gap-3">
                <label htmlFor={f.id} className="w-[8.5ch] text-green">
                  {f.label}:
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required
                  maxLength={f.id === "subject" ? 150 : 100}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={form[f.id]}
                  onChange={onChange}
                  className={inputClass}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="text-green">
                message:
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                placeholder="Hi Shougata, …"
                value={form.message}
                onChange={onChange}
                className={`${inputClass} mt-1 resize-y rounded-md border px-3 py-2`}
              />
            </div>
            {/* Honeypot: hidden from people, often filled in by bots */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={onChange} />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="rounded-md border border-green bg-green px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                {status.kind === "sending" ? "sending…" : "$ send"}
              </button>
              <p role="status" aria-live="polite" className="text-sm">
                {status.kind === "ok" && <span className="text-green">✓ sent. I&apos;ll reply soon.</span>}
                {status.kind === "error" && (
                  <span className="text-red">
                    ✗ {status.message}. You can also email me directly.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Window>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="text-green">$</span> exit 0 <span className="mx-2">·</span> © {new Date().getFullYear()}{" "}
          {profile.name}
        </p>
        <p>
          Built with Next.js & Tailwind ·{" "}
          <TermLink href="https://github.com/ShougataDas/Portfolio-Shougata-Das">source</TermLink>
        </p>
      </div>
    </footer>
  )
}
