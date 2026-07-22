---
title: What is CallVault
description: CallVault is a personal Android call-recording app — offline-first, sideloaded, and backed up only to storage you control.
slug: /
sidebar_position: 1
sidebar_label: Introduction
tags: [overview, android, call-recording, offline-first]
keywords: [callvault, android call recorder, sideload apk, offline-first, self-hosted]
---

# What is CallVault

**CallVault is a personal Android call-recording app.** It records your own phone
calls, keeps them offline-first on the device, and — if you want — backs the audio up
to storage you control. There is no third-party analytics and no telemetry: the only
servers CallVault talks to are the developer's own.

CallVault is a single-owner tool, not a multi-tenant service. It ships with a small
admin tier and a web dashboard, but its job is simple: keep a private, searchable
archive of your calls that you fully control.

## The honest reality first

On a stock, non-rooted Android phone in 2026, **an app can reliably record only your
side of a call** (the microphone). Google closed third-party access to the call-audio
stream in Android 10, and Play Store policy bans silent call recorders outright — which
is why CallVault is **not on Google Play**. You install it as a signed APK.

CallVault is transparent about this and about everything else:

- It records via the microphone by default (your voice is clear; the other party is
  best on speakerphone, which the app can enable automatically).
- It can optionally read a rooted device's OEM/BCR recordings for both-sides audio.
- It shows a live banner while recording and a persistent notification — it does **not**
  announce to the other party.

See [Recording](/user-guide/recording) for how capture actually works, and the
[call-recording-law disclaimer](/getting-started/legal-disclaimer) before you rely on it.

## What you get

| | |
|---|---|
| **Offline-first** | The on-device database is the source of truth. Nothing is deleted before it is confirmed backed up. |
| **Your-server-only** | Metadata lives in the developer's Supabase; audio backups live in FilesHub. No ads, no trackers. |
| **A web dashboard** | Browse your backed-up recordings from any browser at [callvault.aoneahsan.com](https://callvault.aoneahsan.com). |
| **Searchable** | Filter and search by number, contact, or note; mark favorites; add notes. |
| **Yours to remove** | Delete a recording locally or everywhere, or delete your whole account and its data yourself. |

## Where to go next

- **New here?** Start with [Install the APK](/getting-started/install).
- **Using the app?** Read the [User guide](/user-guide/recording).
- **Curious how it's built?** See the [Architecture](/architecture/pipeline).
- **Something not working?** Try [Troubleshooting](/reference/troubleshooting) and the [FAQ](/reference/faq).
