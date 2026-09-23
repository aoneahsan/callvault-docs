---
title: "Install CallVault"
description: "Download the signed APK from the CallVault releases page, check its SHA-256, finish Capture setup, then test one real call."
sidebar_position: 1
tags: [install, apk, android, updates]
keywords: [install apk android, sideload call recorder, verify sha256 apk, update sideloaded app]
---

# Install CallVault

Download the signed APK from the CallVault releases page, allow your browser to install apps, and open the file. CallVault isn't on Google Play. Google Play does not list apps that record calls the way CallVault does, so it ships as a signed APK you download from the CallVault website. You need an Android phone on 8.0 or newer.

Version 1.3.0 is a prerelease for device testing; the download button on the website appears once a release is marked stable, and until then, take the APK from the releases page below.

:::note
Recording laws vary; you are responsible for getting any consent required where you are. This is general information, not legal advice.
:::

## Get the APK

1. Open the [public releases page](https://github.com/aoneahsan/callvault-docs/releases).
2. Download the APK from the newest release. Its file name carries the build date, time and version.
3. Download the `SHA256SUMS` file from the same release.

## Check what you downloaded

Run this where the download landed:

```bash
sha256sum callvault-*.apk
```

Compare the digest it prints against the line for your file in `SHA256SUMS`. They match, or you downloaded something other than the release. If they differ, don't install it. Download again.

## Install it

1. Open the APK.
2. Allow your browser or files app to install apps when Android asks.
3. Confirm the install.

## First run

Open CallVault and work through **Capture setup**. It lists microphone, phone state and notifications under **Required access**, each one reading **Allowed** or **Needs action**, while the battery exemption and the optional accessibility assist sit apart from them. Allow everything that reads **Needs action**, then read the status line beneath them: it reads **Capture is ready** or **Setup is incomplete**.

Wait for **Capture is ready** before you trust CallVault with anything important. Then make one real call and play it back. That test is the only honest way to learn what your phone gives you.

## How do I update CallVault?

CallVault updates itself from the website release. It checks the release policy, downloads the APK, checks the file's size, SHA-256 and version code against that policy, and confirms that its package name and signing certificate match the app already installed. Only then does it open Android's installer. Nothing installs behind your back. If a check fails, the download is discarded and nothing is installed; the manual path below still works, and if neither installs, write to aoneahsan@gmail.com. Android asks once to allow CallVault to install apps, and that one permission is what the updater needs.

The update screen names the version, the file and its size, with **Download verified APK** and **View release notes**.

When a release becomes required, new recording pauses as soon as the phone learns of it, and the library stays readable until you install. Away from a connection nothing pauses: the phone keeps recording for 14 offline days by default (an administrator can set 1 to 30), counted from its last verified check, and past that it pauses new recording until it connects once. A server outage never uses up those days.

Prefer to do it yourself? Download the newer APK from the releases page and check its SHA-256 again. Then open it exactly as you did the first time. Android replaces an app in place only when the new APK's signing certificate matches the installed one, which is the rule the updater's own signer check mirrors.

## What to do next

Read [Permissions and onboarding](/getting-started/permissions), which covers what each item on Capture setup asks for.
