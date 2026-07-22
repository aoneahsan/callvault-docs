---
title: Install the APK
description: CallVault is not on Google Play. Install it as a signed APK from GitHub Releases and keep it updated by sideloading.
sidebar_position: 1
tags: [install, sideload, apk, android]
keywords: [sideload callvault, install apk, github releases, android install]
---

# Install the APK

CallVault ships as a signed Android APK, not through Google Play. (Play policy bans
silent call recorders — see [What is CallVault](/).) You install it directly and update
it the same way.

## Requirements

- An Android phone on **Android 8.0 (API 26) or newer**.
- Room to sideload an app from outside the Play Store.
- Optional, for both-sides recording: a rooted device running BCR — see [Recording](/user-guide/recording).

## Install

1. Open the [GitHub Releases page](https://github.com/aoneahsan/callvault/releases) and
   pick the latest release.
2. Download the APK attached to that release — the universal `app-release.apk` works on
   any device; the per-ABI APKs are smaller if you know your CPU architecture.
3. Open the downloaded file. Android will ask you to allow installing from this source —
   grant it for your browser or files app, then confirm the install.
4. Launch CallVault and follow the first-run [onboarding](/getting-started/permissions).

## Updating

There is no in-app auto-update — that would need a backend and would undercut the
no-telemetry stance. You pull updates yourself:

1. Download the newer APK from a later GitHub Release.
2. Install it **over the top** of the existing app.

Because every release is signed with the same key, installing over the top **preserves
your data**. Installing an APK signed with a different key would force an uninstall and
lose local recordings, so only ever update from the official releases.

:::tip Keep the universal APK
If you are unsure which ABI your phone uses, always grab the universal
`app-release.apk` — it installs anywhere.
:::
