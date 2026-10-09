import { ArrowUpRight } from "lucide-react"
import { Section, TermLink, Window } from "@/components/term"
import {
  about,
  codeforcesHandle,
  cpExtra,
  cpProfiles,
  cpResults,
  education,
  experience,
  profile,
  projects,
  skills,
  type ProjectStatus,
} from "@/lib/data"
import { cn } from "@/lib/utils"

/* ----------------------------------- about ----------------------------------- */

export function About() {
  return (
    <Section id="about" command="cat about.md" title="About">
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
        <div className="space-y-5 font-sans text-base leading-relaxed text-text sm:text-lg">
          {about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="font-mono text-sm text-dim">
            <span className="text-yellow">open_to</span> = <span className="text-green">&quot;{profile.openTo}&quot;</span>
          </p>
        </div>
        <Window title="profile.jpg" className="mx-auto w-full max-w-64 md:order-none" bodyClassName="p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Shougata_Das_Linkedin.jpg"
            alt="Portrait of Shougata Das"
            width={596}
            height={1078}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-top"
          />
        </Window>
      </div>
    </Section>
  )
}

/* ----------------------------------- skills ---------------------------------- */

export function Skills() {
  return (
    <Section id="skills" command="tree skills/" title="Skills">
      <Window title="~/skills" bodyClassName="text-sm sm:text-base">
        <p className="text-blue">skills/</p>
        <ul>
          {skills.map((s, i) => {
            const last = i === skills.length - 1
            return (
              <li key={s.group} className="grid grid-cols-[auto_1fr] gap-x-2">
                <span className="text-dim" aria-hidden>
                  {last ? "└──" : "├──"}
                </span>
                <div className="pb-3">
                  <span className="text-blue">{s.group}/</span>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-line bg-surface-2/50 px-2 py-0.5 text-xs text-text sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </Window>
    </Section>
  )
}

/* ---------------------------------- projects --------------------------------- */

const statusStyle: Record<ProjectStatus, { label: string; className: string; dot: string }> = {
  live: { label: "live", className: "text-green border-green/40", dot: "bg-green animate-pulse" },
  "in-progress": { label: "in progress", className: "text-yellow border-yellow/40", dot: "bg-yellow" },
  research: { label: "research", className: "text-magenta border-magenta/40", dot: "bg-magenta" },
  course: { label: "course project", className: "text-blue border-blue/40", dot: "bg-blue" },
}

export function Projects() {
  return (
    <Section id="projects" command="ls -l projects/" title="Projects">
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const status = statusStyle[p.status]
          return (
            <li key={p.slug} className={cn("min-w-0", i === 0 && "md:col-span-2")}>
              <Window
                title={`~/projects/${p.slug}`}
                className="flex h-full flex-col transition-colors hover:border-green/50"
                bodyClassName="flex flex-1 flex-col"
                right={
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.7rem]",
                      status.className,
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", status.dot)} aria-hidden />
                    {status.label}
                  </span>
                }
              >
                <h3 className="text-lg font-semibold text-text sm:text-xl">{p.title}</h3>
                {p.context && <p className="mt-1 text-xs text-dim sm:text-sm">{p.context}</p>}
                <p className="mt-3 font-sans leading-relaxed text-text">{p.summary}</p>
                <ul className={cn("mt-4 space-y-1.5 text-sm", i === 0 && "md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:gap-y-1.5")}>
                  {p.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[auto_1fr] gap-2 font-sans text-dim">
                      <span className="font-mono text-green" aria-hidden>
                        +
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {p.stack.map((t) => (
                      <li key={t} className="text-xs text-cyan">
                        [{t.toLowerCase()}]
                      </li>
                    ))}
                  </ul>
                  {p.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm transition",
                            l.label === "live"
                              ? "border-green bg-green text-primary-foreground hover:opacity-90"
                              : "border-line text-text hover:border-green hover:text-green",
                          )}
                        >
                          {l.label}
                          <ArrowUpRight className="size-3.5" aria-hidden />
                          <span className="sr-only"> ({p.title}, opens in new tab)</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </Window>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-sm text-dim">
        More on <TermLink href={profile.github}>github.com/ShougataDas</TermLink>
      </p>
    </Section>
  )
}

/* --------------------------------- experience -------------------------------- */

export function Experience() {
  return (
    <Section id="experience" command="git log --graph career" title="Experience">
      <ol className="relative">
        {experience.map((e, i) => (
          <li key={e.hash} className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-10 last:pb-0">
            {/* graph line */}
            <span className="flex flex-col items-center" aria-hidden>
              <span className="mt-1.5 size-3 shrink-0 rounded-full border-2 border-green bg-bg" />
              {i < experience.length - 1 && <span className="w-px flex-1 bg-line" />}
            </span>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm">
                <span className="text-yellow">commit {e.hash}</span>
                <span className="text-dim"> · {e.period}</span>
              </p>
              <h3 className="mt-1 text-lg font-semibold text-text">
                {e.role} <span className="text-cyan">@ {e.org}</span>
              </h3>
              <p className="text-sm text-dim">{e.location}</p>
              <ul className="mt-3 space-y-1.5">
                {e.points.map((pt) => (
                  <li key={pt} className="grid grid-cols-[auto_1fr] gap-2 font-sans text-text">
                    <span className="font-mono text-green" aria-hidden>
                      -
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* --------------------------------- education --------------------------------- */

function JsonLine({ k, v, comma = true }: { k: string; v: string; comma?: boolean }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-2 pl-4 sm:pl-6">
      <span className="text-cyan">&quot;{k}&quot;:</span>
      <span className="min-w-0 text-yellow">
        &quot;{v}&quot;{comma && <span className="text-dim">,</span>}
      </span>
    </div>
  )
}

export function Education() {
  return (
    <Section id="education" command="cat education.json" title="Education">
      <Window title="education.json" bodyClassName="text-sm sm:text-base leading-relaxed">
        <span className="text-dim">[</span>
        <ul className="pl-2 sm:pl-4">
          {education.map((e, i) => {
            const rows: [string, string][] = [
              ["degree", e.degree],
              ["school", e.school],
              ["location", e.location],
              ["status", e.status],
              ...(e.note ? ([["note", e.note]] as [string, string][]) : []),
            ]
            return (
              <li key={e.degree} className={cn("py-1", i < 2 && "font-medium")}>
                <span className="text-dim">{"{"}</span>
                {rows.map(([k, v], j) => (
                  <JsonLine key={k} k={k} v={v} comma={j < rows.length - 1} />
                ))}
                <span className="text-dim">
                  {"}"}
                  {i < education.length - 1 && ","}
                </span>
              </li>
            )
          })}
        </ul>
        <span className="text-dim">]</span>
      </Window>
    </Section>
  )
}

/* ------------------------------ competitive prog ----------------------------- */

type CfInfo = { rating?: number; maxRating?: number; rank?: string }

async function getCodeforces(): Promise<CfInfo | null> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`, {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.status === "OK" ? (data.result[0] as CfInfo) : null
  } catch {
    return null
  }
}

export async function CompetitiveProgramming() {
  const cf = await getCodeforces()

  return (
    <Section id="cp" command="./ratings --all" title="Competitive Programming">
      <ul className="grid gap-4 sm:grid-cols-3">
        {cpProfiles.map((p) => {
          const live = p.name === "Codeforces" && cf
          const max = live ? Math.max(cf.maxRating ?? 0, p.maxRating) : p.maxRating
          return (
            <li key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-lg border border-line bg-surface p-5 transition-colors hover:border-green/60"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text">{p.name}</span>
                  <ArrowUpRight className="size-4 text-dim transition group-hover:text-green" aria-hidden />
                </div>
                <p className="mt-4 text-4xl font-bold tabular-nums text-green">{max}</p>
                <p className="text-xs text-dim">max rating</p>
                <p className="mt-3 text-sm text-cyan">
                  {p.rank || "contest"}
                  {live && cf.rating ? <span className="text-dim"> · now {cf.rating}</span> : null}
                </p>
                <p className="mt-1 text-xs text-dim">@{p.handle}</p>
              </a>
            </li>
          )
        })}
      </ul>

      <Window title="results.log" className="mt-6" bodyClassName="text-sm sm:text-base">
        <ul className="space-y-2">
          {cpResults.map((r) => (
            <li key={r.text} className="grid grid-cols-[auto_1fr] gap-3">
              <span className="text-dim">[{r.year}]</span>
              <span className="text-text">{r.text}</span>
            </li>
          ))}
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="text-dim">[total]</span>
            <span className="text-text">
              <span className="text-green">{cpExtra.solved}</span> problems solved on {cpExtra.judges}
            </span>
          </li>
        </ul>
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4 text-sm text-dim">
          <TermLink href={cpExtra.icpcUrl}>ICPC profile</TermLink>
          <TermLink href={cpExtra.solutionsUrl}>contest solutions</TermLink>
        </p>
      </Window>
    </Section>
  )
}
