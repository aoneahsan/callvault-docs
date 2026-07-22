---
title: Permissions & onboarding
description: What CallVault asks for on first run, why each permission is needed, and how it degrades gracefully if you decline the optional ones.
sidebar_position: 2
tags: [permissions, onboarding, privacy, android]
keywords: [callvault permissions, record audio permission, battery optimization, onboarding]
---

# Permissions & onboarding

CallVault requests the smallest set of permissions it can. Onboarding explains each one
*before* the system dialog appears, and lets you skip the optional ones.

## First run

1. **What CallVault does** — a one-line summary of recording and backup.
2. **The recording reality** — an honest note about what your device can and can't
   capture (see [Recording](/user-guide/recording)), plus the optional auto-speakerphone
   toggle.
3. **Permissions, one at a time** — each request is preceded by a short card explaining
   why it's needed. Optional permissions can be skipped.
4. **Backup setup** — sign in to enable cross-device sync, or skip and stay local-only.
   On the microphone track you're also prompted to exempt CallVault from battery
   optimization.

## Permissions (microphone track)

| Permission | Required | Why | If you decline |
|---|---|---|---|
| Record audio | Yes | Capture audio during a call | The app can't record |
| Phone state | Yes | Detect call start/end and direction | Recording can't start automatically |
| Foreground service (microphone) | Yes | Keep recording while the app is in the background | Recording is killed |
| Notifications | Yes (Android 13+) | Required for the recording foreground-service notification | The service can't run |
| Boot completed | Recommended | Re-arm recording after a reboot | Reopen the app after each restart |
| Call log | Optional | Label a call's number when the system omits it | Some calls show "Unknown number" |
| Contacts | Optional | Show contact names instead of numbers | Numbers only |

The BCR/folder-watch track is the cleanest footprint: it needs **no microphone
permission** at all — only notifications and read access to the recordings folder you
point it at.

## Battery optimization

Some manufacturers (Samsung especially) aggressively stop background services, which can
make CallVault miss a recording. To prevent that:

1. Grant the battery-optimization exemption when onboarding offers it.
2. Leave the persistent recording notification enabled.
3. If your phone still restricts background activity, allow it in your device's app
   settings — CallVault's **Settings → diagnostics** row shows whether the OS currently
   allows background activity.

:::note Rationale before request
CallVault never fires all the system permission dialogs at once, and never asks for the
optional call-log or contacts permissions unless you turn on contact labelling.
:::
