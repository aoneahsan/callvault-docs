/**
 * Every place CallVault is released — the ONLY place a store or surface URL lives in this docs site
 * (standard aoneahsan-cccs-platform-links). Each surface passed its release proof on `verified`:
 * the website answered 200 and the releases page carries a signed universal APK (v1.4.0, an early release). Play-excluded (owner, 2026-11-02):
 * never a Google Play link.
 */
export type PlatformId = 'web' | 'apk' | 'docs';

export interface Platform {
  id: PlatformId;
  /** Store or surface name (a proper name, not copy). */
  name: string;
  href: string;
  /** What this surface is for, in CallVault's words. */
  title: string;
  text: string;
  cta: string;
  primary?: boolean;
  verified: string;
}

export const PLATFORMS: readonly Platform[] = [
  {id: 'apk', name: 'Android app (signed APK)', href: 'https://github.com/aoneahsan/callvault-docs/releases', title: 'On your Android phone', text: 'Records your own calls and keeps them on the phone. A signed APK from the releases page (an early release), not from Google Play.', cta: 'Download the APK', primary: true, verified: '2026-11-20'},
  {id: 'web', name: 'CallVault website', href: 'https://callvault.aoneahsan.com', title: 'In your browser', text: 'Your web library: only the recordings you chose to back up, and nothing else.', cta: 'Open the website', verified: '2026-11-20'},
  {id: 'docs', name: 'Documentation', href: 'https://callvault-docs.aoneahsan.com', title: 'These docs', text: 'Recording, backup, privacy, and the answers people ask first.', cta: 'Read the docs', verified: '2026-11-20'},
];

export const APPS_PAGE = {
  title: 'Get CallVault',
  description: 'Every place CallVault is released: the Android app as a signed APK, the website, and these docs.',
  lead: 'Record on your Android phone, look back from the web library, and keep these docs a tab away.',
} as const;

/** This site is the docs surface. */
export const CURRENT_SURFACE: PlatformId = 'docs';
export const OTHER_PLATFORMS: readonly Platform[] = PLATFORMS.filter((platform) => platform.id !== CURRENT_SURFACE);
export const PRIMARY_PLATFORM: Platform = PLATFORMS.find((platform) => platform.primary) ?? PLATFORMS[0];
export function platformHref(id: PlatformId): string {
  const found = PLATFORMS.find((platform) => platform.id === id);
  if (!found) throw new Error(`Unknown platform: ${id}`);
  return found.href;
}
/** `/apps` changes only when this list does: its sitemap date is the newest proof date. */
export const APPS_LASTMOD: string = PLATFORMS.map((platform) => platform.verified).sort().at(-1) ?? '2026-11-20';
