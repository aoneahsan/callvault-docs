---
title: Security & privacy
description: CallVault's posture — your-server-only with no third-party trackers, HTTPS everywhere, an optional app lock, sensitive files in private storage, and strict database rules.
sidebar_position: 3
tags: [security, privacy, encryption, app-lock]
keywords: [callvault security, privacy, app lock, https only, no telemetry]
---

# Security & privacy

Call recordings are among the most sensitive data a phone holds, and CallVault is built
around that.

## Your-server-only

There is **no third-party analytics, no ad SDK, and no telemetry**. The only network
destinations are the developer's own Supabase (metadata) and FilesHub (audio). If you stay
signed out, nothing leaves the device at all.

## On the device

- Audio files live in **app-private storage**, not a public folder any app can read.
- An optional **app lock** (biometric or PIN) can gate the app before it opens —
  recommended given the content.
- Sensitive tokens are held in the platform's secure, hardware-backed storage — never in
  the plain database or logs.

## In transit

- **HTTPS only**, everywhere. Cleartext traffic is disabled at the platform level.
- Certificate pinning can be enabled for the backup endpoint, since it's the developer's
  own server and the data is private.

## The keys that ship, and the ones that don't

CallVault's app talks to Supabase with a **publishable key that is safe to ship** — it can
do nothing that the database's row-level security rules don't already allow. The FilesHub
key is **origin- and app-restricted**, so it can be used from the app's own surfaces but
not lifted and abused elsewhere. The elevated credentials that could bypass the rules live
only in server-side functions and never in the app.

## Database rules do the real work

Access control isn't a UI trick — it's enforced in the database. Every row is owner-scoped;
admin reach is a separate, live-checked grant; and a disabled account matches no rules, so
it sees nothing. See [Roles & access](/admin-guide/roles).

## Honest limits

- The microphone track's other-party audio is device-dependent (best on speakerphone).
- On-device recording and the app lock can only be fully validated on a physical device.
- The web app shows only backed-up recordings — it has no local database by design.
