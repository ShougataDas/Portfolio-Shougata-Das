import type React from "react"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { Prompt, Window } from "@/components/term"
import { OpenShellButton } from "@/components/shell"
import { profile, cpProfiles } from "@/lib/data"

/** One typed command. Timing is driven by CSS custom properties. */
function Cmd({ text, delay, dur = 0.6 }: { text: string; delay: number; dur?: number }) {
  return (
    <p className="reveal" style={{ "--delay": `${delay}s` } as React.CSSProperties}>
      <Prompt /> <span className="type" style={{ "--n": text.length, "--delay": `${delay}s`, "--dur": `${dur}s` } as React.CSSProperties}>
        {text}
      </span>
    </p>
  )
}

function Out({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={`reveal ${className ?? ""}`} style={{ "--delay": `${delay}s` } as React.CSSProperties}>
      {children}
    </div>
  )
}

const cf = cpProfiles[0]

const fetchRows: [string, string][] = [
  ["role", profile.role],
  ["study", "Master of IT (AI) · Charles Darwin University"],
  ["prev", "BSc CSE · East Delta University"],
  ["location", profile.location],
  ["langs", "Python, C++, TypeScript"],
  ["cf", `${cf.rank} (max ${cf.maxRating})`],
  ["open_to", "Internships, grad roles, research"],
]

const links = [
  ...(profile.cvUrl ? [{ label: "cv.pdf", href: profile.cvUrl, icon: Download, primary: true }] : []),
  { label: "github", href: profile.github, icon: Github },
  { label: "linkedin", href: profile.linkedin, icon: Linkedin },
  { label: "email", href: `mailto:${profile.email}`, icon: Mail },
]

export function Hero() {
  return (
    <section className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <Window title={`${profile.handle}@${profile.host}: ~ — zsh`} bodyClassName="space-y-3 text-sm sm:text-[0.95rem] leading-relaxed">
        <Cmd text="whoami" delay={0.2} dur={0.4} />
        <Out delay={0.7}>
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-6xl">{profile.name}</h1>
          <p className="mt-2 text-base text-dim sm:text-lg">
            <span className="text-cyan">{profile.role}</span> · Competitive Programmer
          </p>
        </Out>

        <Cmd text="neofetch" delay={1.1} dur={0.5} />
        <Out delay={1.7}>
          <div className="rounded-md border border-line bg-surface-2/40 p-3 sm:p-4">
            <p className="text-green">
              {profile.handle}@{profile.host}
            </p>
            <p className="text-dim" aria-hidden>
              ----------------
            </p>
            <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              {fetchRows.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-yellow">{k}</dt>
                  <dd className="min-w-0 text-text">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex gap-1" aria-hidden>
              {["bg-red", "bg-yellow", "bg-green", "bg-cyan", "bg-blue", "bg-magenta", "bg-dim"].map((c) => (
                <span key={c} className={`h-3 w-5 rounded-sm ${c}`} />
              ))}
            </div>
          </div>
        </Out>

        <Cmd text="ls links/" delay={2.1} dur={0.5} />
        <Out delay={2.7}>
          <ul className="flex flex-wrap gap-2">
            {links.map(({ label, href, icon: Icon, ...rest }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    "primary" in rest
                      ? "inline-flex items-center gap-2 rounded-md border border-green bg-green px-3 py-1.5 font-medium text-primary-foreground transition hover:opacity-90"
                      : "inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-text transition hover:border-green hover:text-green"
                  }
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Out>

        <Out delay={3.0}>
          <p>
            <Prompt /> <span className="cursor" aria-hidden />
          </p>
        </Out>
      </Window>

      <div className="reveal mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-dim sm:text-sm" style={{ "--delay": "3.1s" } as React.CSSProperties}>
        <a href="#about" className="transition-colors hover:text-green">
          ↓ cd ~/about
        </a>
        <OpenShellButton />
      </div>
    </section>
  )
}
