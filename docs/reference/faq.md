---
title: "FAQ"
description: "Straight answers about CallVault: why it isn't on Google Play, what it can hear, what leaves your device, cloud storage, and the Family plan."
sidebar_position: 2
tags: [faq, questions, help]
keywords: [callvault faq, is call recording legal, both sides recording, call recorder cloud storage]
---

# Frequently asked questions

CallVault records your own Android calls and keeps them on the phone unless you turn on private cloud backup.

## Why isn't CallVault on Google Play?

Google Play does not list apps that record calls the way CallVault does, so it ships as a signed APK you download from the CallVault website. [Install CallVault](/getting-started/install) walks through it.

## Does CallVault record both sides of a call?

It records what your phone's microphone path exposes. On many phones the other person is [clear only on speaker](/reference/troubleshooting#the-other-person-is-faint-or-missing), and an optional setting turns the speaker on for calls. Every track is labeled with its real source, and no track is called "caller" or "other party" unless that is verified.

## Is recording my calls legal?

Recording laws vary; you are responsible for getting any consent required where you are. This is general information, not legal advice. Read the [disclaimer](/getting-started/legal-disclaimer) before you rely on a recording for anything beyond your own memory.

## Does it announce that the call is being recorded?

No. CallVault is visible on your phone, with a banner in the app and a persistent notification while it records, and it says nothing to the other person.

## What leaves my device?

Nothing, unless you sign in and turn on [private cloud backup](/user-guide/sync-backup#what-leaves-my-device). Then audio uploads as private files that only you and a CallVault administrator can reach, with no public links; the web library shows that recording to you on any browser you sign into. There are no third-party analytics or advertising SDKs.

## Is there an iOS version?

No. CallVault is Android only, on 8.0 and newer.

## Can I use CallVault without signing in?

Yes. Guests keep up to 100 recordings on the phone, and signing in with Google removes the count limit. At 100, new recording pauses. Nothing is deleted, and playback, search, notes and export keep working.

## Why is a recording capped at 100 MB?

Every plan caps one recording at [100 MB for cloud backup](/user-guide/sync-backup#the-100-mb-per-file-cap). A longer call stays on the phone and works normally there; only the cloud copy is skipped. The cap is a field on the plan row rather than something fixed in the app.

## How much cloud storage do I get?

Free includes 2 GB, Pro 20 GB and Family 30 GB for each member; an administrator can raise a limit. [Plans and Family](/user-guide/plans-and-family) has the prices.

## How does the Family plan work?

One person owns the household, invites up to 4 others by email, and every member gets [the Family limits](/user-guide/plans-and-family#how-does-the-family-plan-work); Family is bought with at least 3 seats.

## How do I delete my data?

Delete a recording from its detail screen, or [delete the account](/user-guide/account-deletion) from **Profile**. Deleting the account removes your cloud recordings too, and it finishes only when every cloud file is gone; the app shows progress until then. Wait for it to finish.

## How do I update CallVault?

[The app checks for a new version](/getting-started/install#how-do-i-update-callvault), verifies the download's SHA-256 and signing certificate, and opens the Android installer for you, so an update never arrives without you confirming it. Android asks once to allow CallVault to install apps. You can also take a newer APK from the [releases page](https://github.com/aoneahsan/callvault-docs/releases) and open it yourself.
