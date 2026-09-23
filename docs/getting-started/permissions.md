---
title: "Permissions & onboarding"
description: "What Capture setup asks for, what each row on it means, and what \"Capture is ready\" actually confirms."
sidebar_position: 2
tags: [permissions, onboarding, privacy, android]
keywords: [callvault permissions, record audio permission, battery optimization, onboarding]
---

# Permissions & onboarding

CallVault asks for the smallest set of permissions it can. **Capture setup** shows the five that need a decision from you, each with its current state; the full list the app declares is further down this page.

## Capture setup

Open it on first run, and again any time a call goes missing. It lists three rows under **Required access**, which are the microphone, the phone state and notifications, each reading **Allowed** or **Needs action**. Below them sit two rows that are not required: the battery exemption, reading **Allowed** or **Allow**, and the optional accessibility assist, reading **Allowed** or **Open accessibility settings**.

Beneath the rows is the status line that decides everything: **Capture is ready**, or **Setup is incomplete**. Read that line, not the rows. "Capture is ready" means the three required rows are allowed. It does not mean every row on the screen reads Allowed, and it never will if you skip the optional ones on purpose.

## What each permission is for

Three of these are the **Required access** rows on Capture setup, and two more (the battery exemption and the accessibility assist) are its optional rows. The rest are declared by the app and granted by Android without asking you anything.

| Permission | Status | Why |
|---|---|---|
| Microphone | Required | Record audio while a call is running |
| Phone state | Required | Know when a call starts and when it ends |
| Notifications | Required | Show the notification the recording service must display |
| Foreground service (microphone) | Declared | Keep recording while you're in another app. Android grants this to the recording service; there is no prompt to answer |
| Run at startup | Recommended | Remind you to re-arm recording after a restart |
| Ignore battery optimizations | Requested | Stop the system killing the recorder in the background |
| Modify audio settings | Used | Turn the speaker on when you enabled that option |
| Install packages | Used | Open Android's installer for a verified update |
| Biometric | Optional | The app lock |
| Wake lock | Used | Keep the upload worker running |
| Internet and network state | Used | Backup and update checks |
| Storage write, Android 9 and older | Used | Export to Downloads |

## The accessibility assist

This one is off unless you turn it on in Android's accessibility settings, and it is worth knowing exactly what it is. It is a declared Android accessibility service called **Call monitoring aid**. It receives window-state change events. Nothing else. It can't retrieve window content, read what's on your screen, perform gestures, or reach call audio the platform doesn't hand out. It exists so CallVault stays available for call-state signals. That is all it does.

## Battery restrictions

Some manufacturers stop background services hard enough to lose a recording. Allow the battery exemption when Capture setup offers it, leave the recording notification on, and if the phone still restricts CallVault, allow it in Android's own app settings too.

## Complete the next step

Wait for **Capture is ready**, then make one real call and play it back. [Recording your calls](/user-guide/recording) explains what you're likely to hear when you do.
