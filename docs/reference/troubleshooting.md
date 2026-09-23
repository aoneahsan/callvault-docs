---
title: "Troubleshooting"
description: "Fixes for missed recordings, a faint other party, backups that aren't happening, oversized files, sign-in, and an empty web library."
sidebar_position: 1
tags: [troubleshooting, support, help]
keywords: [callvault not recording, other party silent, backup not working, sign in issue]
---

# Troubleshooting

Something you expected isn't there: a recording, the other person's voice, a backup, or the web library's list. Find the symptom below; each section says what causes it and what to do.

:::note
Recording laws vary; you are responsible for getting any consent required where you are. This is general information, not legal advice.
:::

## Why are some calls not recorded?

Open **[Capture setup](/getting-started/permissions)**. Each item under **Required access** reads **Allowed** or **Needs action**; the battery exemption and the optional accessibility assist sit apart from them. The status line beneath them reads **Capture is ready** or **Setup is incomplete**. Allow whatever needs action, then make a test call.

Two other causes are ordinary Android behavior:

- After a restart or a force-stop, Android won't let an app start microphone capture in the background. CallVault posts a notification asking you to open it, and opening it re-arms capture.
- A required update pauses new recording until you install it; so does being away from a connection past the offline grace, until the phone connects once. The library stays readable either way.

## The other person is faint or missing

Your phone decides how much of the other side a normal app can hear. An ordinary Android app can't read the phone network's call audio, so CallVault [records through the microphone path](/user-guide/recording) and your own side is the reliable part.

- Turn on the speaker option. On many phones it's the only way the other person comes through clearly.
- Import from your phone maker's recorder if it does better. A stereo file is split into its real channels.
- Read the track labels before you judge the result. CallVault names only the source it actually found.

## Backups aren't happening

- Private cloud backup is off until you [turn it on](/user-guide/sync-backup#turn-it-on): the switch is under **Settings → Storage & sync** on the phone and under **Profile** in the web library.
- Sign in with Google. Backup needs an account.
- Uploads wait for Wi-Fi by default. Allow mobile data in the same settings if you don't want them to wait.
- You may be at your plan's limit, where new backups pause; nothing stored is deleted. A larger plan, or an administrator's raise, lifts the limit.
- Open **Settings → Storage & sync → Backup & sync health** for the queue, the failures and the **Needs attention** list.

## One recording never backs up

It is probably over [the 100 MB per-recording limit](/user-guide/sync-backup#the-100-mb-per-file-cap). A recording that size stays on the phone, is not uploaded and appears under **Needs attention** in **Backup & sync health**. Play it, export it or delete it as usual. The limit applies on every plan.

## Sign-in doesn't do anything

Google is the only sign-in method and it needs a working connection. Recording, playback, search, notes and export all work signed out, so a failed sign-in costs you the backup and the web library, and nothing else. The one exception is the guest limit: new recording pauses at 100, and signing in starts it again. Connect to a network and try again.

## The web app is empty

[The web library](/user-guide/web-app#if-the-list-is-empty) shows only backed-up recordings. Turn the switch on, let an upload finish, or sign in with the phone's account; until then the list stays empty while the phone is full.

Still stuck? Write to aoneahsan@gmail.com with your phone model and Android version.
