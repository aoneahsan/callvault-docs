---
title: "CallVault for developers"
description: "What your own script, an assistant such as Claude or ChatGPT, or your own server can read from your CallVault account, the addresses they use and what each plan allows. Everything outside CallVault is read only."
sidebar_label: Overview
sidebar_position: 1
slug: /developers
topics: [developers, api, mcp, webhooks, two-step]
keywords: [callvault api, callvault mcp, call recorder api, callvault webhooks, call recording claude]
---

# CallVault for developers

**A script with an access key, an AI assistant you connect, or your own server can read parts of your CallVault account. None of them can change or delete anything.** They read recording details, your own notes, your plan and household, and, only if you tick it, a 10-minute download link to one of your own recordings. Contact names and phone numbers never leave CallVault.

You set each one up under **Other apps**:

- **Android app:** Settings → Privacy & security → Other apps.
- **Web library:** [Other apps](https://callvault.aoneahsan.com/app/other-apps) in the side rail on a wide screen, or the **Other apps** row on the Profile tab on a narrow one.

Both show the same list. A key you turn off on the phone is off in the browser too.

## Three ways in

| You want | Use | Page |
|---|---|---|
| A script, a backup job or a spreadsheet to read your recordings | An access key and the REST API | [Access keys](/developers/authentication), [The API](/developers/api) |
| To ask Claude, ChatGPT, Claude Code or Cursor about your calls | A connected assistant over MCP | [Assistants](/developers/assistants) |
| Your server to hear the moment a recording arrives | A webhook address | [Webhooks](/developers/webhooks) |

Each one acts as you and sees only your own account, and only the parts you ticked for it. Your account's row-level rules decide every answer, the same rules the app runs under.

## What they can read

You tick these one by one when you make a key or connect an assistant.

| Tick | Permission | What it reads |
|---|---|---|
| Recording details | `recordings:read` | Title, date, length and labels. The title is made from the direction and time, like "Incoming call, 20 Nov, 16:42". Labels are `phone_call` or `microphone`, `starred`, and the phone it was recorded on. |
| Your notes | `notes:read` | The text of a note you spoke or typed on one of your own recordings. |
| Audio downloads | `audio:read` | A link that downloads one of your own recordings and stops working after 10 minutes. |
| Plan and use | `account:read` | Your plan, its limits and how much of them you've used. |
| Household | `household:read` | Its name, your role and how many seats are in use. |

:::warning Audio is the whole call
An audio file is the call as it was recorded, including the other person's voice. Tick **Audio downloads** only for an app you trust. It is off on the consent page unless you tick it.
:::

Audio exists outside the phone only for recordings that finished uploading to [private cloud backup](/user-guide/sync-backup). With backup off, an outside app can read the details and notes of what you backed up before, and no audio at all.

## What they can never reach

- Changing or deleting anything: recordings, notes, labels, your plan, your household or your settings.
- Your contacts. Names and phone numbers stay with your recordings in CallVault and are never sent out.
- Recordings made by other people in your household.
- Your keys, webhook secrets, recovery codes and two-step settings.
- Another person's account, or the admin pages.

## The addresses

| What | Address |
|---|---|
| REST API | `https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1` |
| OpenAPI 3.1 document | [`/v1/openapi.json`](https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/openapi.json), or as Markdown at [`/v1/openapi.md`](https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/openapi.md) |
| MCP server for assistants | `https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/mcp` |
| Consent page | `https://callvault.aoneahsan.com/oauth/consent` (an assistant opens it for you) |

Both OpenAPI addresses answer without a key, so a code generator or an agent can read them directly.

## Limits on each plan

| Plan | Access keys at once | Requests a day | Webhook addresses | Connected assistants |
|---|---|---|---|---|
| Free | 5 | 5,000 | 3 | 3 |
| Pro | 25 | 50,000 | 20 | 10 |
| Family | 50 | 100,000 | 40 | 25 |

Family limits apply to each member's own account. Requests a day count every key and assistant on your account together and reset at midnight UTC. Separately, each key or assistant may make 120 requests a minute, which stops a runaway loop from spending the day in a few seconds. **Other apps → Use** shows where you stand. The plans themselves are on [Plans and Family](/user-guide/plans-and-family).

## Two-step sign-in

Anyone who can sign in to your Google account could otherwise make a key. [Two-step sign-in](/developers/two-step-sign-in) adds a six-digit code from an authenticator app, and with it on, showing a key again always needs a fresh code.

## Every change is emailed

CallVault emails you when a key is made, when an assistant connects, when two-step is turned on or off, when a recovery code is used and when a webhook address is turned off after failing. Each email names where the change came from, like "CallVault app on an Android phone", so one you didn't make stands out.
