---
title: "Security & privacy"
description: "Recordings sit in app-private storage no other app can read, uploads go over HTTPS only, and there is no end-to-end encryption. The limits are here beside the promises."
sidebar_position: 3
tags: [security, privacy, encryption, app-lock]
keywords: [callvault security, privacy, app lock, https only, no telemetry]
---

# Security & privacy

Call recordings are among the most sensitive things a phone holds. CallVault is built around that, and the limits are on this page beside the promises.

## What CallVault doesn't collect

There is no third-party analytics and no advertising SDK in the app; while private cloud backup is off, which is its state until you turn it on, nothing about a call leaves the phone at all. Stay signed out and the phone keeps working exactly the same.

## On the phone

Recordings are written to app-private internal storage. No other app on the phone can read them, and nothing puts them in the shared media folders where a gallery or a file manager would find them. What you export to Downloads yourself is a copy you have chosen to move out.

An optional **app lock** puts your fingerprint, your face or the device PIN in front of the app. The biometric data never leaves the phone; Android holds it and answers yes or no.

## In transit

The app refuses plaintext HTTP entirely. Cleartext traffic is disabled app-wide at the platform level, so a misconfigured endpoint fails rather than falling back, and CallVault trusts only the system certificate store. A certificate a user or a proxy has installed on the phone is not trusted, which means an intercepting proxy cannot quietly sit between the app and its uploads.

CallVault does not pin certificates. Trusting the system store and refusing user-installed ones is the boundary it actually enforces, and it is stated here rather than implied.

## Who can see what

Every recording and every call detail belongs to the account that made it. Administrator reach is a separate grant on top of that, checked against the server each time the dashboard is opened rather than remembered from a previous visit. [Roles & access](/admin-guide/roles) covers how that grant is given and taken away, and every privileged write lands in an append-only audit log described on [Plans and releases](/admin-guide/plans-and-releases).

## Honest limits

- **There is no end-to-end encryption.** If that is your requirement, this is the wrong tool for you, and you should read that as the hard limit it is.
- **A CallVault administrator can reach the audio you back up.** There are no public links to a recording, so nothing is one forwarded URL away from a stranger, but the grant itself is real reach over real audio, and a service that can reach your audio should say so.
- **The web library shows only backed-up recordings.** It keeps no library of its own. That is by design.
- **Deleting your account finishes only when every cloud file is gone**, and the app shows progress until then.

## Complete the next step

[Private cloud backup](/user-guide/sync-backup) covers what the switch turns on, and [Deleting recordings and your account](/user-guide/account-deletion) covers taking it all back.
