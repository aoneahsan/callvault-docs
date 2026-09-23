const fs = require('fs');
const path = require('path');

/**
 * Generates JSON-LD from the pages Docusaurus actually rendered, after the build.
 *
 * Nothing here restates content by hand: each block is read back out of the built HTML,
 * so a page edit changes its schema on the next build and the two can never drift.
 *
 *  - `reference/faq.html`         -> FAQPage, one Question per rendered H2.
 *  - `getting-started/install.html` -> HowTo, one step per leading H2 whose section renders
 *    a numbered list or a command block, stopping at the first H2 that renders neither.
 */

const SITE = 'https://callvault-docs.aoneahsan.com';

const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  middot: '·',
  rarr: '→',
};

function decodeEntities(input) {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X'
          ? parseInt(body.slice(2), 16)
          : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return Object.prototype.hasOwnProperty.call(NAMED, body) ? NAMED[body] : match;
  });
}

function textOf(html) {
  return decodeEntities(
    html
      .replace(/<a\b[^>]*class=(["']?)[^"'>]*hash-link[^"'>]*\1[^>]*>[\s\S]*?<\/a>/g, '')
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/​/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])/g, '$1')
    .trim();
}

/** The rendered article body, without the navigation and footer chrome around it. */
function articleOf(html) {
  const start = html.indexOf('theme-doc-markdown markdown');
  if (start === -1) return null;
  const from = html.indexOf('>', start) + 1;
  const end = html.indexOf('<footer', from);
  return html.slice(from, end === -1 ? html.length : end);
}

/** [{heading, html}] for every rendered H2, in document order. */
function h2Sections(article) {
  const heading = /<h2\b[^>]*>([\s\S]*?)<\/h2>/g;
  const sections = [];
  let match;
  const marks = [];
  while ((match = heading.exec(article)) !== null) {
    marks.push({title: textOf(match[1]), start: heading.lastIndex});
  }
  marks.forEach((mark, i) => {
    const stop = i + 1 < marks.length ? article.lastIndexOf('<h2', marks[i + 1].start) : article.length;
    sections.push({heading: mark.title, html: article.slice(mark.start, stop)});
  });
  return sections;
}

function faqPage(html) {
  const article = articleOf(html);
  if (!article) return null;
  const questions = h2Sections(article)
    .map((section) => ({name: section.heading, text: textOf(section.html)}))
    .filter((q) => q.name && q.text);
  if (!questions.length) return null;
  const title = textOf((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: title,
    url: `${SITE}/reference/faq`,
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: {'@type': 'Answer', text: q.text},
    })),
  };
}

function howTo(html) {
  const article = articleOf(html);
  if (!article) return null;
  const steps = [];
  for (const section of h2Sections(article)) {
    const procedural = /<ol\b/.test(section.html) || /<pre\b/.test(section.html);
    if (!procedural) break;
    const text = textOf(section.html);
    if (!text) break;
    steps.push({'@type': 'HowToStep', name: section.heading, text});
  }
  if (steps.length < 2) return null;
  const title = textOf((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const description = decodeEntities(
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '',
  );
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    url: `${SITE}/getting-started/install`,
    step: steps,
  };
  if (description) data.description = description;
  return data;
}

const PAGES = [
  ['reference/faq.html', faqPage],
  ['getting-started/install.html', howTo],
];

module.exports = function structuredDataPlugin() {
  return {
    name: 'callvault-structured-data',
    async postBuild({outDir}) {
      for (const [file, build] of PAGES) {
        const full = path.join(outDir, file);
        if (!fs.existsSync(full)) continue;
        const html = fs.readFileSync(full, 'utf8');
        const data = build(html);
        if (!data) continue;
        const json = JSON.stringify(data).replace(/</g, '\\u003C');
        const tag = `<script type="application/ld+json">${json}</script>`;
        fs.writeFileSync(full, html.replace('</head>', `${tag}</head>`), 'utf8');
      }
    },
  };
};
