---
title: Sync & backup
description: What leaves your device, where it goes, and the safeguards — a 100 MB per-file cap, retry with backoff, and nothing deleted before it is confirmed synced.
sidebar_position: 4
tags: [sync, backup, fileshub, supabase, offline-first]
keywords: [call recording backup, sync recordings, fileshub, supabase metadata, wifi only backup]
---

# Sync & backup

Backup is optional and always secondary to the copy on your phone. The on-device database
is the source of truth; a recording is **never deleted locally before it is confirmed
backed up and verified**.

## What leaves your device

When you're signed in and backup is on, two things go to storage the developer controls:

- **The audio file** goes to **FilesHub** (object storage).
- **The metadata** — number, contact, direction, timestamps, duration, your note and
  favorite flag — goes to **Supabase**, scoped to your account.

Nothing goes to any third-party analytics or ad service. If you stay signed out, CallVault
works fully local-only and nothing leaves the device.

## The safeguards

- **Offline-first.** Recordings are usable immediately; backup happens in the background
  when there's a connection.
- **Retry with backoff.** A failed upload or sync is retried automatically with an
  increasing delay, so a flaky connection sorts itself out.
- **Wi-Fi-only option.** Restrict backups to Wi-Fi in Settings to avoid mobile data.
- **Retention.** Optional cleanup of old local files never removes a file that isn't yet
  confirmed backed up and checksum-verified.

## The 100 MB per-file cap

FilesHub accepts files up to **100 MB**. CallVault checks the size before uploading. A
recording over the cap can't be backed up, so it is marked **"kept on device"** with a
clear reason rather than retrying forever. It stays safe on your phone; only the cloud
copy is skipped.

## Sync health

**Settings → Backup & sync health** shows the queue, retry counts, and per-device
activity. A **"Needs attention"** card lists anything that couldn't be backed up (for
example, an oversized file or a rejected key) with a **Retry all** action, so problems are
visible and actionable in one place. See the [sync pipeline](/architecture/pipeline) for
how a recording moves through each state.
