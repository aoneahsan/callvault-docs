# CallVault Documentation Site Guide

**Last Updated:** 2026-09-24

| Guidance | Value |
|---|---|
| Context Budget Last Verified | 2026-09-15 — CLAUDE.md 2,860 B / no PENDING-TASKS.md; re-check due 2026-10-15 |

This public repository builds the CallVault Docusaurus documentation site. `CLAUDE.md` and `AGENTS.md`
are mirrors; read only the file native to the active agent. Product source and internal engineering records
live in the sibling `../callvault/` repository.

## Start narrowly

Read README headings, then the smallest relevant documentation page, blog post, configuration file, or CSS
section. Consult the sibling app's `docs/PROJECT-CONTEXT.md` only when a product fact is not established in
this repository. Never preload all pages or the app's internal planning set.

| Path | Purpose |
|---|---|
| `docs/` | User, admin, architecture, getting-started, and reference source pages |
| `blog/` | Release announcements and feed source |
| `src/css/custom.css` | Brand theme |
| `src/pages/sitemap.tsx`, `src/pages/feed.tsx` | Human `/sitemap` and `/feed` pages, fed by the `callvault-discovery` plugin data |
| `static/` | Source images, CNAME, robots, and llms files |
| `docusaurus.config.ts`, `sidebars.ts` | Site metadata, plugins, and navigation; inline `callvault-discovery` plugin publishes page data and copies `updates/rss.xml` to `/feed.xml` |

## Repository rules

- Use the pinned Yarn 4 package manager. Do not run npm or pnpm locally.
- This repository is public. Never add secrets, private environment values, test passwords, service keys, or
  internal-only records.
- User-visible prose follows the project's story, copywriting, Markdown, SEO/AEO, and humanization workflows.
  Verify every product claim against the app source or approved project context; mark missing facts
  `NEEDS DECISION`.
- Docs-site Markdown/MDX uses Docusaurus front matter and admonitions. Keep navigation, links, searchable
  metadata, and visible content consistent.
- Public README headings follow the repository Markdown anchor/TOC rules. Internal agent guides do not need
  public-document anchor ceremony.
- Do not start `yarn start` or `yarn serve`. Do not publish or deploy from a sub-agent. Pushing `main`
  triggers the existing GitHub Pages workflow.

## Generated and excluded paths

Do not read or edit `node_modules/`, `build/`, `.docusaurus/`, Yarn caches, generated search indexes,
or binary images for general context. Rebuild them from source. Do not inspect the entire app repository to
write one documentation page.

## One-shot verification

```bash
corepack enable
yarn install --immutable
yarn typecheck
yarn build
```

Run the checks proportionate to the changed source. The production build is the link and Docusaurus
integration gate; it must complete without broken internal links.

## Context-audit cadence

The fleet record is `/home/ahsan/Documents/01-code/docs/tracking/project-context-budget-tracker.json`.
Skip another context-management pass until 30 full days after this verification. Ordinary documentation and
feature work is not a context audit.
