# CallVault documentation

The public documentation site for **CallVault** — a personal Android call-recording app
(offline-first, sideloaded, your-server-only). Built with [Docusaurus](https://docusaurus.io/).

- **Live site:** https://callvault-docs.aoneahsan.com
- **The app:** https://callvault.aoneahsan.com

<a id="develop"></a>
## 🛠️ Develop&nbsp;[#](#develop)

```bash
corepack enable     # use the pinned Yarn version (yarn@4.18.1)
yarn install --immutable
yarn start          # local dev server
```

<a id="build"></a>
## 📦 Build&nbsp;[#](#build)

```bash
yarn typecheck
yarn build          # production build — also validates every internal link
yarn serve          # serve the built site to verify search + rendering
```

<a id="deploy"></a>
## 🚀 Deploy&nbsp;[#](#deploy)

Publish a locally verified build to the `gh-pages` branch. The custom domain comes from
[`static/CNAME`](static/CNAME). Run these commands from this repository on `main` after its source changes
have been committed and pushed:

```bash
set -e
test "$(git branch --show-current)" = main
test -z "$(git status --porcelain)"
git fetch origin main
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)"
yarn typecheck
yarn build
test -f build/CNAME && test -f build/.nojekyll
CALLVAULT_PAGES_TEMP="$(mktemp -d)"
git clone git@github.com:aoneahsan/callvault-docs.git "$CALLVAULT_PAGES_TEMP/site"
if git -C "$CALLVAULT_PAGES_TEMP/site" show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  git -C "$CALLVAULT_PAGES_TEMP/site" switch --track origin/gh-pages
else
  git -C "$CALLVAULT_PAGES_TEMP/site" switch --orphan gh-pages
fi
rsync -a --delete --exclude='.git/' build/ "$CALLVAULT_PAGES_TEMP/site/"
git -C "$CALLVAULT_PAGES_TEMP/site" add -A
if ! git -C "$CALLVAULT_PAGES_TEMP/site" diff --cached --quiet; then
  git -C "$CALLVAULT_PAGES_TEMP/site" commit -m "Deploy CallVault Docs from $(git rev-parse --short HEAD)"
  git -C "$CALLVAULT_PAGES_TEMP/site" push origin gh-pages
fi
```

The push is an ordinary fast-forward push. If it is rejected because `gh-pages` moved, rerun the commands
against the latest branch; do not force-push. After the first publish, set GitHub Pages to **Deploy from a
branch → gh-pages → /(root)** and keep `callvault-docs.aoneahsan.com` as its custom domain with HTTPS.

<a id="structure"></a>
## 🗂️ Structure&nbsp;[#](#structure)

- `docs/` — the documentation, in nested topic folders (getting started, user guide, admin
  guide, architecture, reference).
- `blog/` — release announcements; source of the RSS/Atom updates feed.
- `docusaurus.config.ts`, `sidebars.ts` — site configuration and navigation.
- `src/css/custom.css` — brand theme.
- `src/pages/sitemap.tsx`, `src/pages/feed.tsx` — the `/sitemap` and `/feed` pages; `/feed.xml` is
  copied from `updates/rss.xml` at build time.
- `static/` — assets, `robots.txt`, `llms.txt`, `CNAME`, and `.nojekyll`.

<a id="contributing"></a>
## 🤝 Contributing&nbsp;[#](#contributing)

See [CONTRIBUTING.md](CONTRIBUTING.md).

Built by Ahsan Mahmood · aoneahsan@gmail.com
