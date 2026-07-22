---
title: Troubleshooting
description: Fixes for the common issues — missed recordings, faint other-party audio, backups that aren't happening, oversized files, and sign-in that isn't wired up.
sidebar_position: 1
tags: [troubleshooting, support, help]
keywords: [callvault not recording, other party silent, backup not working, sign in issue]
---

# Troubleshooting

## Some calls aren't being recorded

Usually the OS is stopping the background service.

- Grant the **battery-optimization exemption** (Settings, or re-run onboarding).
- Allow **background activity** for CallVault in your device's app settings — Samsung's One
  UI is especially aggressive.
- Check **Settings → diagnostics**: it shows whether the OS currently allows background
  activity.
- After a reboot, make sure the boot permission is granted so monitoring re-arms itself.

## The other person is faint or missing

This is the [documented Android limit](/user-guide/recording#why-capture-is-device-dependent)
on a stock phone — an app can only capture what the phone's speaker emits.

- Turn on **auto-speakerphone** (Settings) so the other party is captured better.
- For full both-sides audio, use the [folder-watch track](/user-guide/recording#tracks-c-and-d--folder-watch-optional-rooted)
  on a rooted device.

## Backups aren't happening

- You must be **signed in** for backup to run.
- If **Wi-Fi-only** is on, backups wait for a Wi-Fi connection.
- Check **Settings → Backup & sync health** for the queue and any errors, and use
  **Retry all** on the "Needs attention" card.

## A recording says "kept on device"

The file is over the [100 MB cap](/user-guide/sync-backup#the-100-mb-per-file-cap), so it
can't be backed up. It's safe on your phone; only the cloud copy is skipped. You can still
export or share it locally.

## Sign-in doesn't do anything

Cross-device sign-in depends on the owner having wired up the sign-in provider for the
deployment you're using. Until that's configured, CallVault runs fully **local-only** — it
records and stores everything on the device; only cloud sync is inactive.

## The web app is empty

The [web app](/user-guide/web-app) shows only **backed-up** recordings. If nothing has been
backed up yet (or you're signed into a different account than the phone), the list will be
empty even though the phone has recordings.

Still stuck? Open an issue on
[GitHub](https://github.com/aoneahsan/callvault-docs/issues).
