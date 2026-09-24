import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './sitemap.module.css';

type Entry = { title: string; description: string; permalink: string; tags: string[] };
type Group = { label: string; permalink?: string; entries: Entry[] };
type Discovery = { docGroups: Group[]; updates: (Entry & { date: string })[] };

const APP_URL = 'https://callvault.aoneahsan.com';

/** True when every word of the query appears in the entry's title, description or tags. */
function matches(entry: Entry, query: string): boolean {
  const haystack = [entry.title, entry.description, ...entry.tags].join(' ').toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

function EntryCard({ entry }: { entry: Entry }): React.JSX.Element {
  return (
    <Link to={entry.permalink} className={`card padding--md ${styles.card}`}>
      <strong>{entry.title}</strong>
      {entry.description && <p className="margin-bottom--none margin-top--sm">{entry.description}</p>}
      {entry.tags.length > 0 && (
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className="badge badge--secondary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

/** Human sitemap: every doc and update, grouped by the docs sidebar, filterable through `?q=`. */
export default function Sitemap(): React.JSX.Element {
  const { docGroups, updates } = usePluginData('callvault-discovery') as Discovery;
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search).get('q') ?? '';

  const groups = useMemo(() => {
    const all: Group[] = [...docGroups, { label: 'Updates', permalink: '/updates', entries: updates }];
    return all
      .map((group) => ({ ...group, entries: group.entries.filter((e) => matches(e, query)) }))
      .filter((group) => group.entries.length > 0);
  }, [docGroups, updates, query]);

  const onSearch = (value: string): void => {
    const params = new URLSearchParams(location.search);
    if (value) params.set('q', value);
    else params.delete('q');
    const search = params.toString();
    history.replace({ search: search ? `?${search}` : '' });
  };

  return (
    <Layout title="Sitemap" description="Every CallVault documentation page and update.">
      <main className="container margin-vert--xl">
        <h1>Sitemap</h1>
        <ul>
          <li>
            <Link to="pathname:///sitemap.xml">sitemap.xml</Link>
          </li>
          <li>
            <Link to="/feed">Feed</Link>
          </li>
          <li>
            <Link href={APP_URL}>CallVault</Link>
          </li>
        </ul>
        <input
          type="search"
          className={styles.search}
          aria-label="Filter pages"
          placeholder="Filter pages"
          value={query}
          onChange={(event) => onSearch(event.target.value)}
        />
        {groups.length === 0 && <p>No pages match “{query}”.</p>}
        {groups.map((group) => (
          <section key={group.label}>
            <h2>{group.permalink ? <Link to={group.permalink}>{group.label}</Link> : group.label}</h2>
            <div className={styles.grid}>
              {group.entries.map((entry) => (
                <EntryCard key={entry.permalink} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
