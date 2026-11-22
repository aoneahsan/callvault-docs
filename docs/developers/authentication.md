---
title: "Access keys"
description: "Make a read-only CallVault access key, choose what it may read and when it stops, send it as a Bearer token, and show it again within 10 minutes of signing in."
sidebar_label: Access keys
sidebar_position: 2
tags: [developers, api, access-keys, security]
keywords: [callvault access key, callvault api key, cv_pat, personal access token, show key again]
---

# Access keys

**An access key lets your own script or tool read your CallVault account through the [API](/developers/api). Every key is read only.** You make it under **Other apps → Access keys**, tick what it may read, and send it in the `Authorization` header of each request.

## Making a key

1. Open **Other apps → Access keys** in the app or the [web library](https://callvault.aoneahsan.com/app/other-apps?tab=keys).
2. Choose **Make an access key**.
3. Give it a name that tells you where it's used, like "Backup script on the NAS".
4. Under **What it may read**, tick at least one thing. The permissions are listed on [the overview](/developers#what-they-can-read).
5. Under **Stops working**, pick **Never**, **In 30 days**, **In 90 days** or **In a year**. Every key is read only, so any of these is allowed. A shorter life is safer.
6. Choose **Make key**, then copy it.

The key is shown in full once, right there. CallVault keeps only a hash to recognise it and a sealed copy for showing it again, and emails you that a key was made.

A key is `cv_pat_`, 43 random characters, an underscore and an eight-character checksum:

```text
cv_pat_7Hq2…_3a9f0c1e
```

`cv_pat_` and the next four characters are what your list shows, so you can tell keys apart without revealing one. The checksum means a mistyped key is refused before CallVault looks it up.

## Sending it

Put the key in the `Authorization` header as a Bearer token:

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/recordings \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

Keep it on a machine you control, in an environment variable or a secrets store, never in a web page or a shared repository. Anyone holding it reads what you ticked until it stops or you turn it off.

## Checking what a key can do

`GET /v1/token` answers with the key's own facts and counts as one request:

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/token \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

```json
{
  "data": {
    "kind": "pat",
    "user_id": "9c2d5e7a-1b3f-4c8d-a6e2-0f4b7d9c1a35",
    "client_id": null,
    "scopes": ["notes:read", "recordings:read"]
  }
}
```

## Showing a key again: the 10-minute rule

You can show a key again with **Show again**, but only within 10 minutes of signing in. Signed in longer ago than that, CallVault asks you to sign in once more and brings you straight back to the key.

With [two-step sign-in](/developers/two-step-sign-in) on, that fresh sign-in must include a code from your authenticator. Two things never show a key, on purpose:

- **A remembered phone or browser.** It skips the code for ordinary sign-ins, not for showing a secret.
- **A recovery code.** It gets you into your account so you can set up a new phone. It does not show keys or webhook secrets.

The rule is there because a session someone else picked up on a shared computer should not be enough to read every key you own.

## Replacing a key

**Replace** makes a new key with the same name and permissions. The old one keeps working for 24 hours, so you can swap the new one into your script without a gap, and then stops. A key that never stops gets a replacement that never stops; a key with an end date gets a replacement that stops in 90 days.

## Turning a key off

**Turn off** ends a key at once. The next request with it is refused with `invalid_token`, and any audio link it asked for stops working too.

## Limits

Your plan sets how many keys you can have at once: 5 on Free, 25 on Pro, 50 on Family. At the limit, **Make an access key** tells you so; turn one off to make another. Requests from every key share your plan's daily allowance, described on [the overview](/developers#limits-on-each-plan).
