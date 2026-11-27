---
title: CallVault now opens to your own scripts and assistants, read only
description: Access keys, an MCP server for Claude, ChatGPT, Claude Code and Cursor, signed webhooks and two-step sign-in. Outside apps read your recordings' details and never change or delete anything.
slug: callvault-other-apps
authors:
  - name: "The CallVault team"
    url: https://callvault.aoneahsan.com
date: 2026-11-22
---

You can now point your own tools at your CallVault account. A backup script can read your recordings with an access key, Claude or ChatGPT can answer "How many calls did I record last week?", and your server can hear the moment a recording's audio finishes uploading.

<!-- truncate -->

All of it is read only. Nothing outside CallVault can change or delete a recording, a note or a setting. Contact names and phone numbers never leave: a recording reaches an outside app titled by its direction and time, like "Incoming call, 20 Nov, 16:42".

Audio is the one thing we were careful about, because a call holds the other person's voice. An app or assistant gets audio only if you tick **Audio downloads** for it, and then only as a link to one of your own backed-up recordings that stops working after 10 minutes.

Two-step sign-in came with it, on the phone and in the web library. With it on, nobody holding your Google account alone can make a key.

Everything is under **Other apps** and **Security**, in the Android app and now in the web library too. The [developer docs](/developers) cover the API, the assistant setup for each client, webhook signature checks in Node and Python, and two-step sign-in.
