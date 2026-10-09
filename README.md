# Portfolio — Shougata Das

My personal portfolio: a terminal-themed site showing my projects, experience and competitive programming.

**Live:** https://portfolio-shougata-das-1xqf.vercel.app/

## Features

- Terminal look with a typed `whoami` / `neofetch` intro (pure CSS, so all content is in the HTML)
- Interactive shell: press `/` or `Ctrl+K` and type `help` (tab completion, history, `cd <section>`)
- Dark and light themes that follow the system setting, plus a toggle
- Responsive from phone to desktop; respects reduced-motion settings
- Live Codeforces rating, refreshed daily from the Codeforces API
- Contact form that emails me through Resend

## Tech stack

Next.js 15 (App Router) · React · TypeScript · Tailwind CSS v4 · next-themes · Resend · Vercel

## Editing content

All content lives in [`lib/data.ts`](lib/data.ts): profile links, bio, skills, projects, experience,
education and competitive programming. The components in `components/` only handle layout.

To show the CV button, put the link in `profile.cvUrl`.

## Project structure

```
app/
  layout.tsx          fonts, metadata, theme provider
  page.tsx            page composition
  globals.css         terminal colour tokens and animations
  api/contact/        contact form endpoint (Resend)
components/
  term.tsx            Prompt, Window and Section primitives
  header.tsx          sticky header with the live path and theme toggle
  hero.tsx            typed intro
  sections.tsx        about, skills, projects, experience, education, CP
  contact.tsx         contact form and footer
  shell.tsx           interactive shell overlay
lib/data.ts           all site content
```

## Run locally

```bash
npm install
npm run dev
```

The contact form needs `RESEND_API_KEY` in `.env.local` (and in the Vercel project settings).

## Connect

[LinkedIn](https://www.linkedin.com/in/shougata-das-b858221b0/) ·
[GitHub](https://github.com/ShougataDas) ·
[Codeforces](https://codeforces.com/profile/siuuu_on_code) ·
[CodeChef](https://www.codechef.com/users/sogu7)
