---
title: "Plans and releases"
description: "For administrators: publishing a release, the policy every phone follows, plan limits and grants, cloud usage, and the audit log."
sidebar_position: 4
tags: [admin, releases, plans, audit]
keywords: [callvault admin releases, plan limits, grant provenance, audit log]
---

# Plans and releases

Every phone reads the release policy you set here, and every account gets the limits you set here. These screens are admin-only and reached from the admin rail. The server refuses every write from anyone else, and each write lands in the audit log.

## Publish a release

1. Open **Admin · Releases**.
2. Fill **Publish a release** from the GitHub Release and its `SHA256SUMS`: version name, version code, download URL, SHA-256, signing certificate SHA-256 and size in bytes.
3. Set the channel to **Prerelease (device QA)** or **Stable**.
4. Select **Publish release row**.

[The updater](/getting-started/install#how-do-i-update-callvault) refuses any APK whose hash, version code or signer differs from that row, or whose package name differs from the installed app, so publish the row from the release files rather than from memory. A version code is unique within its channel. Rows are never deleted through the API, so retire one by disabling it, which takes it out of the policy immediately.

## Set the release policy

**Release policy** is what every phone is told. It carries the latest release, the minimum supported version code, the mandatory-after date, the offline grace in days (1 to 30, default 14), the check interval in hours (1 to 168, default 24), and whether the policy is enabled.

A phone below the minimum enters updater-only mode. Its library stays readable and new recording pauses until the update is installed, and the phone says so on screen rather than going quiet. Lower the grace with a reason: it is what stands between someone traveling and a paused recorder.

## Change what a plan includes

1. Open **Admin · Plans**.
2. Fill **Create a plan**: plan id, display name, price per month, price per year, cloud storage in GB, per recording in MB, objects, uploads per hour.
3. Select **Save plan**.

The plan id is the immutable key. [The four limits](/user-guide/plans-and-family) on the row are what the server enforces, which is why raising one is an admin edit rather than a release.

## Give one account a plan or a limit

1. **Change a user's plan** takes the account, the plan, the end date and a note that shows in provenance.
2. **Override one user's limits** takes cloud storage and uploads per hour for that one account, with a reason; an empty field keeps the plan's value.
3. **Grant provenance** shows where the account's current plan came from.

Grants on the same plan extend and never shorten. A renewal carrying an earlier end date leaves the later one in place. Family is granted with a seat count: never below 3, and never below the members already in the household.

## Read cloud usage

**Admin · Cloud usage** shows the stored audio across all accounts, then a row for each account carrying the effective limit after its plan and any override. **Adjust limits** opens the plans page with that account already selected.

## Legacy audio

Nothing to do here. **Migrate legacy audio**, on the **Admin · Cloud usage** tab, works in batches of up to 50 across all accounts: it copies each file into private storage, verifies the checksum, deletes the public file and clears the old public link. The migration ran on 2026-09-17, and no public recording file remains.

## Read the audit log

**Admin · Audit log** is append-only. Every privileged write adds one row with the actor, the action, the target and the before and after values, and nothing there can be edited or removed.
