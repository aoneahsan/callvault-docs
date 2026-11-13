---
title: "Check a CallVault licence"
description: "How to check that a white-label CallVault is licensed, by licence key or by the domain it runs on, and what each answer means."
sidebar_position: 5
tags: [white-label, licensing]
keywords: [verify white label licence, callvault licence check]
---

# Check a CallVault licence

Open the [licence check page](https://callvault.aoneahsan.com/verify-license) and enter a licence key or a domain. Verification is run by our licensing service.

## By key

A key starts with `CALLVAULT-WL-`. The answer is one of:

| Answer | Meaning |
|---|---|
| Valid | The licence is active; the page shows the licensee, its domains and the update end date |
| Waiting for setup | Issued and paid; the deployment isn't finished yet |
| Revoked | The licence no longer covers any deployment |
| Not found | No CallVault licence has this key |

## By domain

The service reads `https://<domain>/.well-known/callvault-white-label-license.json` and checks the key it names. It reports whether the domain runs a licensed CallVault, serves a licence for a different domain, serves a revoked licence, or serves no licence file at all.

## Inside the app

A white-label build checks its own licence once when it starts and again when it comes back to the front, never on a timer. If the licence is revoked or doesn't cover the build's domain, the app shows "This licence is not active" with a link to this check. Nothing on the phone is deleted, and an offline phone keeps working.
