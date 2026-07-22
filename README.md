# CallVault documentation

The public documentation site for **CallVault** — a personal Android call-recording app
(offline-first, sideloaded, your-server-only). Built with [Docusaurus](https://docusaurus.io/).

- **Live site:** https://callvault-docs.aoneahsan.com
- **The app:** https://callvault.aoneahsan.com

## Develop

```bash
corepack enable     # use the pinned Yarn version (yarn@4.17.1)
yarn install
yarn start          # local dev server
```

## Build

```bash
yarn build          # production build — also validates every internal link
yarn serve          # serve the built site to verify search + rendering
```

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The custom domain is set by
[`static/CNAME`](static/CNAME).

## Structure

- `docs/` — the documentation, in nested topic folders (getting started, user guide, admin
  guide, architecture, reference).
- `blog/` — release announcements; source of the RSS/Atom updates feed.
- `docusaurus.config.ts`, `sidebars.ts` — site configuration and navigation.
- `src/css/custom.css` — brand theme.
- `static/` — assets, `robots.txt`, `llms.txt`, `CNAME`.

## Contributing & support

See [CONTRIBUTING.md](CONTRIBUTING.md). Support the developer at
[aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=callvault-docs&project-identifier=com.aoneahsan.callvault).

Built by Ahsan Mahmood · aoneahsan@gmail.com
