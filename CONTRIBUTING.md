# Contributing to CallVault docs

Thanks for your interest in improving the CallVault documentation. This is a public
repository; contributions are welcome through pull requests.

## Governance

- **`main` is protected.** All changes land through a pull request — nobody, including
  contributors with write access, pushes directly to `main`.
- **A PR needs one approving review and a green CI build** (the GitHub Pages `Build` job:
  `yarn install` + `yarn build`, which also validates every internal link) before it can be
  merged.
- The repository owner ([@aoneahsan](https://github.com/aoneahsan)) is the sole admin and
  the only actor permitted to bypass the ruleset to maintain the branch.

## How to contribute

1. **Fork and PR** — anyone can fork this repo, make changes on a branch, and open a pull
   request. No prior access is required.
2. **Request collaborator access** (optional) — open an issue describing what you'd like to
   help maintain, or email the developer. Access is granted at the owner's discretion, and
   **write access still cannot push to `main`** — review is always required.

## Local development

```bash
corepack enable        # use the pinned Yarn version
yarn install
yarn start             # local dev server
yarn build             # production build — also the link checker; must pass before a PR
```

- **Yarn only** for local work (never npm or pnpm).
- Every documentation page carries front matter with a `title`, a `description`, and
  `tags` — a page without them is invisible to search. Keep new pages consistent.
- Update `sidebars.ts` in the **same change** that adds or moves a page, so nothing is
  orphaned.
- If you move a page, add a redirect rather than leaving a dead URL.

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/) — e.g.
`docs: clarify the microphone track`, `fix: correct a broken link`.

## Support

If CallVault has been useful and you'd like to support its development, you can do so at
**[aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=callvault-docs&project-identifier=com.aoneahsan.callvault)**.
Please do not add GitHub Sponsors, Open Collective, or other donation links.

## Code of conduct

Be respectful and constructive. Report unacceptable behaviour to
[aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).
