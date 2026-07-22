import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Explicit, curated sidebar. Categories carry a generated-index landing page so
 * clicking a category header opens a real page instead of a dead node.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Getting started',
        description: 'Install CallVault, grant the permissions it needs, and read the call-recording-law disclaimer.',
        slug: '/getting-started',
      },
      items: [
        'getting-started/install',
        'getting-started/permissions',
        'getting-started/legal-disclaimer',
      ],
    },
    {
      type: 'category',
      label: 'User guide',
      link: {
        type: 'generated-index',
        title: 'User guide',
        description: 'Everything you can do with CallVault on the phone and in the web app.',
        slug: '/user-guide',
      },
      items: [
        'user-guide/recording',
        'user-guide/playback',
        'user-guide/search-favorites',
        'user-guide/sync-backup',
        'user-guide/web-app',
        'user-guide/profile',
        'user-guide/account-deletion',
      ],
    },
    {
      type: 'category',
      label: 'Admin guide',
      link: {
        type: 'generated-index',
        title: 'Admin guide',
        description: 'The web admin dashboard, how roles are granted, and user management.',
        slug: '/admin-guide',
      },
      items: [
        'admin-guide/dashboard',
        'admin-guide/roles',
        'admin-guide/user-management',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      link: {
        type: 'generated-index',
        title: 'Architecture',
        description: 'How CallVault is built: the sync pipeline, the data layer, security, and the web/native split.',
        slug: '/architecture',
      },
      items: [
        'architecture/pipeline',
        'architecture/data-layer',
        'architecture/security-privacy',
        'architecture/web-native-split',
      ],
    },
    {
      type: 'category',
      label: 'Reference & FAQ',
      link: {
        type: 'generated-index',
        title: 'Reference & FAQ',
        description: 'Troubleshooting and frequently asked questions.',
        slug: '/reference',
      },
      items: ['reference/troubleshooting', 'reference/faq'],
    },
    'changelog',
  ],
};

export default sidebars;
