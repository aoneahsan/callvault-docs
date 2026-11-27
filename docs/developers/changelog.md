---
title: "Developer changelog"
description: "Changes to CallVault's API, MCP server, webhooks and two-step sign-in, newest first, with the date each reached the live service."
sidebar_label: Changelog
sidebar_position: 7
topics: [developers, changelog]
keywords: [callvault api changelog, callvault mcp changes, callvault webhooks changes]
---

# Developer changelog

Changes to what outside apps can do with CallVault, newest first. The app's own releases are in the [main changelog](/changelog).

## 22 November 2026

The first release.

- **API v1**, read only: [recordings, notes, audio links, plan and use, household](/developers/api), with cursor pages, the [OpenAPI 3.1 document](https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/openapi.json) and [read-only access keys](/developers/authentication) that stop Never, in 30 days, 90 days or a year.
- **MCP server** for Claude, ChatGPT, Claude Code and Cursor, with six read-only tools and a [consent page](/developers/assistants#the-page-that-asks-you) where audio is off unless ticked.
- **Webhooks**: [`recording.created` and `recording.upload_finished`](/developers/webhooks#events), signed the Standard Webhooks way, with eight tries over about 28 hours.
- **Two-step sign-in** on the phone and in the web library, with ten recovery codes and an optional seven-day remembered phone or browser. [How it works](/developers/two-step-sign-in).
- **Security** and **Other apps** in the web library as well as the Android app.
