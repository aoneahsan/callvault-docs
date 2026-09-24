import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';

type Update = { title: string; description: string; permalink: string; tags: string[]; date: string };

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

/** Human feed: every update, newest first, with the machine-readable feeds linked above it. */
export default function Feed(): React.JSX.Element {
  const { updates } = usePluginData('callvault-discovery') as { updates: Update[] };

  return (
    <Layout title="Feed" description="CallVault updates, newest first, with RSS and Atom feeds.">
      <main className="container container--fluid margin-vert--xl" style={{ maxWidth: '48rem' }}>
        <h1>Feed</h1>
        <ul>
          <li>
            <Link to="pathname:///feed.xml">feed.xml</Link> (RSS)
          </li>
          <li>
            <Link to="pathname:///updates/rss.xml">updates/rss.xml</Link> (RSS)
          </li>
          <li>
            <Link to="pathname:///updates/atom.xml">updates/atom.xml</Link> (Atom)
          </li>
        </ul>
        {updates.map((update) => (
          <article key={update.permalink} className="margin-vert--lg">
            <h2 className="margin-bottom--xs">
              <Link to={update.permalink}>{update.title}</Link>
            </h2>
            <time dateTime={update.date} className="text--secondary">
              {dateFormat.format(new Date(update.date))}
            </time>
            {update.description && <p className="margin-top--sm">{update.description}</p>}
          </article>
        ))}
      </main>
    </Layout>
  );
}
