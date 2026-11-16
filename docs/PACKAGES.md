# Packages — CallVault docs

Last Updated: 2026-11-16

Node 26.13.1 LTS (`.nvmrc`, `engines.node >=26.13.1`), Yarn 4 (`packageManager`), classic `node-modules` linker,
`npmMinimalAgeGate: 0`. Upgraded with `npx -y npm-check-updates -u`, latest stable. This file is excluded from the
published site (`docusaurus.config.ts` → docs `exclude`).

| Package | Range | Kind | Purpose |
|---|---|---|---|
| `@docusaurus/core`, `faster`, `plugin-content-docs`, `preset-classic`, `theme-common`, `theme-mermaid` | 3.10.2 | runtime | The site generator, Rspack build, docs/blog, theme and Mermaid diagrams |
| `@easyops-cn/docusaurus-search-local` | ^0.55.3 | runtime | Offline search, no third-party service |
| `@mdx-js/react` | ^3.1.1 | runtime | MDX rendering |
| `clsx` | ^2.1.1 | runtime | Class names in the custom pages |
| `prism-react-renderer` | ^2.4.1 | runtime | Code highlighting themes |
| `react`, `react-dom` | ^19.3.1 | runtime | UI runtime |
| `@docusaurus/module-type-aliases`, `@docusaurus/types` | 3.10.2 | dev | Types for `@site/*`, `@theme/*` and the config |
| `@types/react`, `@types/react-dom` | ^19.3.0 | dev | React types |
| `typescript` | ~7.0.2 | dev | `yarn typecheck`; Docusaurus runs on TS 7 (no typescript-eslint here, so the fleet's 6.0 pin does not apply) |

## Notes

- Build script keeps `NODE_OPTIONS=--no-experimental-webstorage`: Docusaurus' SSG loads through the `eval` package,
  which copies every global and touches Node 26's disabled `localStorage`. Re-check on each Docusaurus minor; drop the
  flag when a build without it prints nothing.

## History

- 2026-11-16: Node pin moved to 26.13.1 (`.nvmrc` added, `engines.node` was `>=18.0`). `ncu -u` found every
  dependency already at latest stable.
