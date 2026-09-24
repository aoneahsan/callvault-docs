import fs from 'node:fs/promises';
import path from 'node:path';
import type { Config, Plugin } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const structuredData = require('./src/plugins/structured-data.js');

const SITE_URL = 'https://callvault-docs.aoneahsan.com';
const APP_URL = 'https://callvault.aoneahsan.com';
const REPO_URL = 'https://github.com/aoneahsan/callvault-docs';

/** Shape published to `/sitemap` and `/feed` through `usePluginData('callvault-discovery')`. */
type DiscoveryEntry = { title: string; description: string; permalink: string; tags: string[] };
type DiscoveryGroup = { label: string; permalink?: string; entries: DiscoveryEntry[] };
type DiscoveryUpdate = DiscoveryEntry & { date: string };

/** The fields read from the docs and blog plugins' loaded content. */
type LoadedDoc = Omit<DiscoveryEntry, 'tags'> & { id: string; unlisted?: boolean; tags: { label: string }[] };
type SidebarItem = {
  type: string;
  id?: string;
  label?: string;
  items?: SidebarItem[];
  link?: { type: string; id?: string; permalink?: string };
};
type LoadedDocs = {
  loadedVersions: { docs: LoadedDoc[]; sidebars: Record<string, SidebarItem[]> }[];
};
type LoadedBlog = {
  blogPosts: {
    metadata: {
      title: string;
      description: string;
      permalink: string;
      date: Date | string;
      unlisted?: boolean;
      tags: { label: string }[];
    };
  }[];
};

/**
 * Resolves once the blog plugin has finished writing its RSS file.
 *
 * Why: Docusaurus core runs every plugin's `postBuild` concurrently (`Promise.all` in
 * `executePluginsPostBuild`, core 3.10.2), and the blog writes `rss.xml` in its own `postBuild`
 * with a non-atomic `outputFile`, last after its XSL files. There is no supported hook ordering and
 * no option to emit the feed at the site root. Re-check on every Docusaurus upgrade; remove this
 * wait (and copy directly) once core orders `postBuild` or the blog can write a root feed path.
 * Fails the build rather than shipping without `/feed.xml`.
 */
async function waitForBlogRss(file: string, timeoutMs = 60_000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const body = await fs.readFile(file, 'utf8').catch(() => '');
    if (body.trimEnd().endsWith('</rss>')) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`callvault-discovery: ${file} was not written within ${timeoutMs} ms`);
}

/**
 * Feeds the human `/sitemap` and `/feed` pages from the docs and blog plugins' own data, so neither
 * page keeps a list that can drift, and publishes the updates RSS at the root `/feed.xml`.
 */
function discoveryPlugin(): Plugin {
  return {
    name: 'callvault-discovery',
    async allContentLoaded({ allContent, actions }) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default as LoadedDocs | undefined;
      const blogContent = allContent['docusaurus-plugin-content-blog']?.default as LoadedBlog | undefined;

      const version = docsContent?.loadedVersions[0];
      const docs = new Map((version?.docs ?? []).filter((d) => !d.unlisted).map((d) => [d.id, d]));
      const toEntry = (doc: LoadedDoc): DiscoveryEntry => ({
        title: doc.title,
        description: doc.description,
        permalink: doc.permalink,
        tags: doc.tags.map((t) => t.label),
      });
      const placed = new Set<string>();
      const take = (items: SidebarItem[] = []): DiscoveryEntry[] =>
        items.flatMap((item) => {
          const doc = item.type === 'doc' && item.id ? docs.get(item.id) : undefined;
          if (!doc) return item.type === 'category' ? take(item.items) : [];
          placed.add(doc.id);
          return [toEntry(doc)];
        });

      const general: DiscoveryEntry[] = [];
      const groups: DiscoveryGroup[] = [];
      for (const item of Object.values(version?.sidebars ?? {}).flat()) {
        if (item.type === 'category') {
          groups.push({ label: item.label ?? '', permalink: item.link?.permalink, entries: take(item.items) });
        } else {
          general.push(...take([item]));
        }
      }
      const unplaced = [...docs.values()].filter((d) => !placed.has(d.id)).map(toEntry);
      const docGroups: DiscoveryGroup[] = [
        { label: 'Overview', entries: [...general, ...unplaced] },
        ...groups,
      ].filter((g) => g.entries.length > 0);

      const updates: DiscoveryUpdate[] = (blogContent?.blogPosts ?? [])
        .filter((post) => !post.metadata.unlisted)
        .map(({ metadata }) => ({
          title: metadata.title,
          description: metadata.description,
          permalink: metadata.permalink,
          tags: metadata.tags.map((t) => t.label),
          date: new Date(metadata.date).toISOString(),
        }))
        .sort((a, b) => b.date.localeCompare(a.date));

      actions.setGlobalData({ docGroups, updates });
    },
    async postBuild({ outDir }) {
      // Root `/feed.xml` is the updates RSS. Its XSL and CSS travel with it so the relative
      // `rss.xsl` / `rss.css` references still resolve from the site root.
      const source = path.join(outDir, 'updates');
      await waitForBlogRss(path.join(source, 'rss.xml'));
      for (const file of ['rss.xml', 'rss.xsl', 'rss.css']) {
        const target = file === 'rss.xml' ? 'feed.xml' : file;
        await fs.copyFile(path.join(source, file), path.join(outDir, target));
      }
    },
  };
}

const config: Config = {
  title: 'CallVault Docs',
  tagline:
    'CallVault records your own Android calls and keeps them on the phone unless you turn on private cloud backup.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'aoneahsan',
  projectName: 'callvault-docs',

  future: {
    v4: true,
    faster: true,
  },

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  markdown: {
    mermaid: true,
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // JSON-LD read back out of the rendered pages; plugin data for /sitemap and /feed, plus /feed.xml.
  plugins: [structuredData, discoveryPlugin],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      // Public product-docs pattern: bundled local search (no external service).
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: `${REPO_URL}/tree/main/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          routeBasePath: 'updates',
          blogTitle: 'CallVault updates',
          blogDescription: 'Release notes and announcements for CallVault.',
          showReadingTime: true,
          blogSidebarTitle: 'Recent updates',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'CallVault updates',
            description: 'Release notes and announcements for CallVault.',
            copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood.`,
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        sitemap: {
          lastmod: 'date',
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/callvault-social.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'CallVault',
      logo: {
        alt: 'CallVault logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/changelog', label: 'Changelog', position: 'left' },
        { to: '/updates', label: 'Updates', position: 'left' },
        {
          href: APP_URL,
          label: 'Open the app',
          position: 'right',
        },
        {
          href: REPO_URL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting started', to: '/' },
            { label: 'User guide', to: '/user-guide/recording' },
            { label: 'Architecture', to: '/architecture/pipeline' },
            { label: 'FAQ', to: '/reference/faq' },
          ],
        },
        {
          title: 'CallVault',
          items: [
            { label: 'Open the app', href: APP_URL },
            { label: 'Privacy policy', href: `${APP_URL}/privacy-policy` },
            { label: 'Terms', href: `${APP_URL}/terms` },
            { label: 'Data deletion', href: `${APP_URL}/data-deletion` },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: REPO_URL },
            { label: 'Updates', to: '/updates' },
            { label: 'Feed', to: '/feed' },
            { label: 'Sitemap', to: '/sitemap' },
            {
              label: 'Support the developer',
              href: 'https://aoneahsan.com/payment?project-id=callvault-docs&project-identifier=com.aoneahsan.callvault',
            },
          ],
        },
      ],
      copyright: `Built by Ahsan Mahmood (aoneahsan@gmail.com). CallVault © ${new Date().getFullYear()}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'dart', 'kotlin', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
