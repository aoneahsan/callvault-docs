# Search-console fix log — callvault-docs

Fixed path in every repo (`aoneahsan-cccs-search-issue-remediation`). Newest first. Not published: excluded in
`docusaurus.config.ts`. The audit session retests with the commands under **Retest**.

## callvault-docs#1 — URL-level indexing + AEO fix list · 2026-11-27 · commit: see `git log -- docs/search-consoles/fix-log.md`

Status: boxes 4, 5, 7, 8 and 9 plus the slash switch fixed; 1, 2 and 6 Pending; 3 answered by owner law. `yarn build`
(zero warnings) ends with `yarn seo:contract` (`src/plugins/seo-contract.mts`), which failed on a planted noindex on
the home page, then passed. Rendered `/white-label/faq/` at 1440. Live-verified, google-pending (commit `c927ed5`, gh-pages
`1d4fdc3`, IndexNow 200): `/white-label/faq` → 301 → 200 with FAQPage; Person, Organization and WebSite on every page;
`/updates/archive/` carries no noindex; old tag, author and `/docs/developers` URLs land; 0 unslashed sitemap URLs.

| Box | SA | What was wrong (evidence) | Root fix (file) | Contract | Live proof |
|---|---|---|---|---|---|
| found · slashed URLs 404 | P26 | `trailingSlash: false` wrote `x.html` | `docusaurus.config.ts` `trailingSlash: true`; sitemap dates compare routes slashless (`routeOf`); ignore patterns gain slashed forms; `static/docs/developers.html` (a hand-made redirect that would 404 slashed) replaced by a redirect entry | fails on any `x.html` page, unslashed canonical or sitemap URL | see Retest |
| 4 · 16 tag pages | P32 | thin lists the sidebar already groups — and `src/plugins/structured-data.js` forced `noindex` onto them and the updates archive/author/tag pages, against the link law | tags → `topics:` in 48 docs (the `/sitemap` chips read it); `/tags/*`, `/updates/tags/*`, `/updates/authors/*` redirect to real pages (`src/plugins/seo-redirects.mts`, new dependency `@docusaurus/plugin-client-redirects`); the forced noindex now applies only to `/search/` and the 404 page. Updates posts carry the team inline as author (the author entry was a person; products speak as a team) | each redirect and target checked; no public noindex | see Retest |
| 7, 8 · no publisher entity, no sameAs | AI / SA-P20 | home JSON-LD was a BreadcrumbList only | `docusaurus.config.ts` `headTags`: a `@graph` on every page — Person `https://aoneahsan.com/#person` with the sameAs list aoneahsan.com publishes (GitHub, LinkedIn, npm, Upwork, ORCID) plus aoneahsan.com and zaions.com; Organization Zaions; WebSite with publisher, author and the CallVault SoftwareApplication (`sameAs` its GitHub repo) | JSON-LD must parse | see Retest |
| 9 · FAQ without FAQPage | P30 | `/white-label/faq` showed 7 questions with no FAQPage (`/reference/faq` had one) | `src/plugins/structured-data.js` builds FAQPage for both FAQ pages from the built HTML, each with its own URL | JSON-LD must parse | see Retest |
| 5 · feeds / llms.txt / sitemap | P33 | machine files; no `.md` mirrors | none needed | — | — |
| 3 · white-label pages | P32 | audit asked for noindex | overruled (owner, 2026-11-27: public pages are never noindexed); the pages are CallVault-specific (sideloaded APK, no iPhone build, call-recording specifics) | contract: no noindex | — |

### Pending

| Box | Why not done | Who | Next action |
|---|---|---|---|
| 2 · 11 compare pages | the competitor facts are past the 14-day refresh | `/comparison-hub` refresh | re-read each competitor's own pages |
| 1 · home not indexed | needs a stronger above-the-fold angle (Story Bible copy) | content pass | unique home copy, links in from the app and aoneahsan.com |
| 6 · 22 other pages | quality and authority signal | content pass | a unique angle per page; two inbound links each |
| Google re-crawl and Validate fix | console | daily audit | Validate fix |

### Retest

```bash
H=https://callvault-docs.aoneahsan.com
for p in /white-label/faq /tags/android/ /updates/authors/aoneahsan/ /docs/developers/; do printf '%s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$H$p")"; done
curl -s "$H/white-label/faq/" | grep -oE '"@type":"(FAQPage|Person|Organization)"' | sort -u
curl -s "$H/updates/archive/" | grep -c 'noindex'   # 0
curl -s "$H/sitemap.xml" | grep -oE '<loc>[^<]*</loc>' | grep -vc '/</loc>'   # 0
```
