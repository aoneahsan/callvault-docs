import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const SITE_URL = 'https://callvault-docs.aoneahsan.com';
const APP_URL = 'https://callvault.aoneahsan.com';
const REPO_URL = 'https://github.com/aoneahsan/callvault-docs';

const config: Config = {
  title: 'CallVault Docs',
  tagline: 'A personal Android call-recording app — offline-first, your-server-only.',
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
          // Re-enable once the repo has commits (CI uses fetch-depth: 0):
          //   showLastUpdateTime: true,
          //   showLastUpdateAuthor: true,
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
          changefreq: 'weekly',
          priority: 0.5,
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
    metadata: [
      {
        name: 'keywords',
        content:
          'callvault, android call recorder, call recording app, offline-first, flutter, supabase, self-hosted, sideload apk',
      },
    ],
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
            { label: 'Updates feed', to: '/updates' },
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
