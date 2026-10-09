"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { TerminalSquare, X } from "lucide-react"
import { Prompt } from "@/components/term"
import { about, cpProfiles, profile, projects, sections, skills } from "@/lib/data"

const OPEN_EVENT = "open-shell"

export function openShell() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function OpenShellButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={openShell}
      className="inline-flex items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-xs text-dim transition hover:border-green hover:text-green"
      aria-label="Open interactive shell"
    >
      <TerminalSquare className="size-4" aria-hidden />
      {compact ? null : (
        <>
          <span>open shell</span>
          <kbd className="hidden rounded border border-line px-1.5 py-px text-[0.7rem] sm:inline">/</kbd>
        </>
      )}
    </button>
  )
}

type Entry = { id: number; input?: string; output: React.ReactNode }

const sectionIds = sections.map((s) => s.id) as string[]

const commandHelp: [string, string][] = [
  ["help", "show this list"],
  ["whoami", "who I am"],
  ["about", "short bio"],
  ["ls", "list sections"],
  ["cd <section>", "jump to a section, e.g. cd projects"],
  ["projects", "list projects with links"],
  ["skills", "what I work with"],
  ["cp", "competitive programming ratings"],
  ["contact", "ways to reach me"],
  ["theme [dark|light]", "switch colour theme"],
  ["history", "previous commands"],
  ["clear", "clear the screen"],
  ["exit", "close the shell"],
]
const commandNames = [...commandHelp.map(([c]) => c.split(" ")[0]), "cv", "github", "linkedin", "email", "echo", "date", "sudo", "pwd"]

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-cyan underline underline-offset-4 hover:text-green"
    >
      {children}
    </a>
  )
}

const statusColor: Record<string, string> = {
  live: "text-green",
  "in-progress": "text-yellow",
  research: "text-magenta",
  course: "text-blue",
}

export function Shell() {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<Entry[]>([])
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const nextId = useRef(1)
  const { resolvedTheme, setTheme } = useTheme()

  const close = useCallback(() => setOpen(false), [])

  // Open on event, "/" or Ctrl/Cmd+K
  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.closest("input, textarea, select, [contenteditable=true]")
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        onOpen()
      }
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      returnFocus.current?.focus?.()
      return
    }
    if (entries.length === 0) {
      setEntries([
        {
          id: 0,
          output: (
            <p className="text-dim">
              Welcome. Type <span className="text-green">help</span> to see what you can do. Tab completes, ↑/↓ for
              history, Esc to close.
            </p>
          ),
        },
      ])
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    inputRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  const goTo = (id: string) => {
    setOpen(false)
    // wait for the overlay to unmount and scrolling to unlock
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  const run = (raw: string): React.ReactNode | "CLEAR" | null => {
    const [cmd = "", ...args] = raw.trim().split(/\s+/)
    const arg = args.join(" ")
    switch (cmd.toLowerCase()) {
      case "":
        return null
      case "help":
        return (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
            {commandHelp.map(([c, d]) => (
              <div key={c} className="contents">
                <dt className="text-green">{c}</dt>
                <dd className="text-dim">{d}</dd>
              </div>
            ))}
          </dl>
        )
      case "whoami":
        return (
          <p>
            {profile.name}: <span className="text-cyan">{profile.role}</span>, {profile.location}
          </p>
        )
      case "about":
        return <p className="font-sans text-[0.95rem] leading-relaxed">{about[0]}</p>
      case "ls":
        return (
          <p className="flex flex-wrap gap-x-4">
            {sectionIds.map((s) => (
              <span key={s} className="text-blue">
                {s}/
              </span>
            ))}
          </p>
        )
      case "pwd":
        return <p>/home/{profile.handle}</p>
      case "cd": {
        const target = arg.replace(/^~?\/?/, "").replace(/\/$/, "")
        if (!target || target === "~") {
          setOpen(false)
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50)
          return null
        }
        if (sectionIds.includes(target)) {
          goTo(target)
          return null
        }
        return <p className="text-red">cd: no such directory: {arg}. Try ls.</p>
      }
      case "projects":
        return (
          <ul className="space-y-1.5">
            {projects.map((p) => (
              <li key={p.slug}>
                <span className={statusColor[p.status]}>[{p.status}]</span> <span className="text-text">{p.title}</span>
                {p.links.length > 0 && (
                  <span className="text-dim">
                    {" "}
                    ·{" "}
                    {p.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && " "}
                        <Ext href={l.href}>{l.label}</Ext>
                      </span>
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )
      case "skills":
        return (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
            {skills.map((s) => (
              <div key={s.group} className="contents">
                <dt className="text-yellow">{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        )
      case "cp":
        return (
          <ul>
            {cpProfiles.map((p) => (
              <li key={p.name}>
                <Ext href={p.url}>{p.name}</Ext>{" "}
                <span className="text-dim">
                  {p.rank && `${p.rank} · `}max {p.maxRating}
                </span>
              </li>
            ))}
          </ul>
        )
      case "contact":
        return (
          <ul>
            <li>
              email&nbsp;&nbsp;&nbsp; <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
            </li>
            <li>
              github&nbsp;&nbsp; <Ext href={profile.github}>{profile.github.replace("https://", "")}</Ext>
            </li>
            <li>
              linkedin <Ext href={profile.linkedin}>linkedin.com/in/shougata-das</Ext>
            </li>
          </ul>
        )
      case "email":
        return <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
      case "github":
        return <Ext href={profile.github}>{profile.github}</Ext>
      case "linkedin":
        return <Ext href={profile.linkedin}>{profile.linkedin}</Ext>
      case "cv":
        return profile.cvUrl ? (
          <Ext href={profile.cvUrl}>open cv.pdf</Ext>
        ) : (
          <p className="text-dim">cv: being updated. Email me and I&apos;ll send it.</p>
        )
      case "theme": {
        const next = arg === "dark" || arg === "light" ? arg : resolvedTheme === "dark" ? "light" : "dark"
        setTheme(next)
        return <p className="text-dim">theme set to {next}</p>
      }
      case "history":
        return (
          <ol>
            {history.map((h, i) => (
              <li key={i}>
                <span className="text-dim">{String(i + 1).padStart(3)}</span> {h}
              </li>
            ))}
          </ol>
        )
      case "echo":
        return <p>{arg}</p>
      case "date":
        return <p>{new Date().toString()}</p>
      case "sudo":
        return <p className="text-yellow">nice try. this incident will be reported.</p>
      case "clear":
        return "CLEAR"
      case "exit":
        setOpen(false)
        return null
      default:
        return (
          <p className="text-red">
            command not found: {cmd}. Type <span className="text-green">help</span>.
          </p>
        )
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = value
    setValue("")
    setHistoryIndex(null)
    if (input.trim()) setHistory((h) => [...h, input.trim()])
    const output = run(input)
    if (output === "CLEAR") {
      setEntries([])
      return
    }
    setEntries((prev) => [...prev, { id: nextId.current++, input, output }])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault()
      const i = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(i)
      setValue(history[i])
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault()
      const i = historyIndex + 1
      if (i >= history.length) {
        setHistoryIndex(null)
        setValue("")
      } else {
        setHistoryIndex(i)
        setValue(history[i])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const parts = value.split(" ")
      const pool = parts.length > 1 && parts[0] === "cd" ? sectionIds : commandNames
      const word = parts[parts.length - 1]
      const matches = pool.filter((c) => c.startsWith(word))
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0]
        setValue(parts.join(" ") + (parts.length === 1 ? " " : ""))
      } else if (matches.length > 1) {
        setEntries((prev) => [
          ...prev,
          { id: nextId.current++, input: value, output: <p className="text-dim">{matches.join("   ")}</p> },
        ])
      }
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Interactive shell"
        className="flex h-[85svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl border border-line bg-surface shadow-2xl sm:h-[70vh] sm:rounded-xl"
      >
        <div className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-3.5 py-2.5">
          <button
            type="button"
            onClick={close}
            className="size-2.5 rounded-full bg-[#ff5f57]"
            aria-label="Close shell"
          />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate text-xs text-dim">
            {profile.handle}@{profile.host}: ~ — interactive
          </span>
          <button type="button" onClick={close} className="text-dim hover:text-text" aria-label="Close shell">
            <X className="size-4" />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto p-4 text-sm leading-relaxed"
          onClick={() => inputRef.current?.focus()}
          aria-live="polite"
        >
          {entries.map((e) => (
            <div key={e.id}>
              {e.input !== undefined && (
                <p>
                  <Prompt /> {e.input}
                </p>
              )}
              {e.output && <div className="mt-1">{e.output}</div>}
            </div>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2">
            <Prompt />
            <label htmlFor="shell-input" className="sr-only">
              Command
            </label>
            <input
              id="shell-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="min-w-0 flex-1 bg-transparent text-text caret-green outline-none focus-visible:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
