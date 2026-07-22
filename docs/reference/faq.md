---
title: FAQ
description: Straight answers about CallVault — why it isn't on Google Play, whether it records both sides, what leaves your device, iOS support, and more.
sidebar_position: 2
tags: [faq, questions, help]
keywords: [callvault faq, is call recording legal, both sides recording, ios support]
---

# Frequently asked questions

### Why isn't CallVault on Google Play?

Google Play policy bans silent call recorders, so a call-recording app like CallVault can't
be listed. It ships as a signed APK you [sideload](/getting-started/install) instead.

### Does it record both sides of the call?

On a stock, non-rooted phone, reliably only **your side** — Android reserves the call-audio
stream for system-privileged apps. The other party is captured best on speakerphone. Full
both-sides audio is possible on a **rooted** device via the
[folder-watch track](/user-guide/recording#tracks-c-and-d--folder-watch-optional-rooted).
See [Recording](/user-guide/recording).

### Is recording my calls legal?

It depends on your jurisdiction and whether you're a participant. CallVault records **your
own** calls for **personal** use, which is generally the most defensible case — but this is
not legal advice. Read the [disclaimer](/getting-started/legal-disclaimer) before relying on
a recording beyond your own reference.

### Does it announce that the call is being recorded?

No audible announcement. CallVault is transparent on **your** device (a live banner and a
persistent notification) but does not beep or announce to the other party.

### What leaves my device?

Only if you're signed in with backup on: the **audio** goes to FilesHub and the **metadata**
goes to Supabase — both storage the developer controls. No third-party analytics or ads,
ever. Signed out, nothing leaves the device. See [Security & privacy](/architecture/security-privacy).

### Is there an iOS version?

No. iOS has no call-recording API for third-party apps, so CallVault is **Android-only**.

### Can I use it without signing in?

Yes. CallVault works fully **local-only** — it records, plays back, and searches on the
device. Sign-in only adds cloud backup and cross-device sync.

### Why is a recording capped at 100 MB?

That's the per-file limit of the backup storage. Recordings over it are
[kept on the device](/user-guide/sync-backup#the-100-mb-per-file-cap) and simply not backed
up, rather than retried forever.

### How do I delete my data?

Delete a single recording locally or everywhere, or delete your whole account yourself from
**Profile → danger zone**. See [Deleting recordings & your account](/user-guide/account-deletion).

### How do I get updates?

Download the newer APK from a [GitHub Release](https://github.com/aoneahsan/callvault/releases)
and install over the top — your data is preserved because it's the same signing key.
