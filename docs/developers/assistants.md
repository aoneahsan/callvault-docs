---
title: "Assistants (MCP)"
description: "Connect Claude, ChatGPT, Claude Code or Cursor to CallVault over MCP, choose what it may read on the consent page, and see the six read-only tools an assistant can use. Audio stays off unless you tick it."
sidebar_label: Assistants (MCP)
sidebar_position: 4
topics: [developers, mcp, claude, chatgpt, oauth]
keywords: [callvault mcp server, claude call recordings, chatgpt connector callvault, claude code mcp, cursor mcp]
---

# Assistants (MCP)

**Connect Claude, ChatGPT, Claude Code or Cursor to CallVault, then ask about your recordings in plain words, like "How many calls did I record last week?" The assistant can read only what you tick on CallVault's consent page, and it can't change or delete anything.**

Every assistant uses the same address:

```text
https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/mcp
```

Copy it from **Other apps → Assistants** in the app or the [web library](https://callvault.aoneahsan.com/app/other-apps?tab=assistants), which also show these steps.

## Connecting one

### Claude

1. In Claude, open **Settings**, then **Connectors**, and choose **Add custom connector**.
2. Name it CallVault and paste the address above.
3. Choose **Connect**. CallVault opens so you can sign in and pick what Claude may read.

### ChatGPT

1. In ChatGPT, open **Settings**, then **Apps & Connectors**, then **Advanced settings**, and turn on **Developer mode**.
2. Choose **Create**, name it CallVault and paste the address above.
3. Choose **Connect**, sign in to CallVault and pick what ChatGPT may read.

### Claude Code

1. In a terminal, run:

   ```bash
   claude mcp add --transport http callvault https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/mcp
   ```

2. Start Claude Code, type `/mcp`, pick **callvault** and choose **Authenticate**.
3. Your browser opens CallVault so you can sign in and pick what it may read.

### Cursor

1. In Cursor, open **Settings**, then **MCP**, and choose **Add new MCP server**.
2. Paste this into `mcp.json`:

   ```json
   {
     "mcpServers": {
       "callvault": {
         "url": "https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/mcp"
       }
     }
   }
   ```

3. Save, then choose **Connect** next to callvault. CallVault opens so you can sign in and pick what it may read.

## The page that asks you

Connecting opens CallVault's consent page in your browser. It names the assistant and the site you go back to afterwards, shows the Google account you're signed in with, and lists what the assistant may read with a tick beside each. **Audio downloads** is off unless you tick it, because the file is the whole call, including the other person's voice.

With [two-step sign-in](/developers/two-step-sign-in) on, **Allow** asks for a code from your authenticator, unless this browser is remembered. **Don't allow** shares nothing.

If the page says CallVault doesn't know the app, allow it only if you set it up yourself. If you're already at your plan's limit of connected assistants (3 on Free, 10 on Pro, 25 on Family), it says so; disconnect one first.

You get an email naming the assistant, what it may read and whether audio is allowed.

## What an assistant can ask for

| Tool | What it gets | Needs |
|---|---|---|
| `list_recordings` | Your recordings, newest first, with their details. 50 at a time, with a cursor for more. Takes `started_at.gte`, `started_at.lt` and `sort`. | Recording details |
| `get_recordings` | One recording's details, by its `id` | Recording details |
| `get_notes` | The note on one of your recordings | Your notes |
| `get_audio_link` | A 10-minute download link for one of your recordings | Audio downloads |
| `list_plan_and_use` | Your plan, its limits and today's use | Plan and use |
| `list_household` | Your household's name, your role and seats in use | Household |

An assistant sees only the tools you allowed; the rest don't appear in its list. Every tool is marked read only, so a careful client won't stop to ask before using one. None of them change or delete anything, so nothing ever waits for you to confirm a removal.

The fields are the same as the [API's](/developers/api#recordings). Titles look like "Incoming call, 20 Nov, 16:42": no contact name or phone number reaches an assistant, ever. Your note text is passed to the assistant as data, your own words, never as instructions to it.

Each question an assistant asks uses your plan's daily requests, shared with your access keys, and each assistant may ask 120 times a minute.

## What an assistant can't do

- Change, star, rename or delete a recording, a note or anything else.
- Read a recording's audio unless you ticked **Audio downloads**. With it ticked, it gets a link, not a transcript: CallVault doesn't send call audio to an assistant as text.
- See your contacts, another household member's recordings, your keys or your two-step settings.
- Manage keys, webhooks, two-step sign-in or other connections. Those need you, signed in to CallVault.

## Renaming or disconnecting

Connected assistants are listed under **Other apps → Assistants** with the day each connected and when it last asked something. **Rename** changes the name shown in your list. **Disconnect** ends it at once: its next question is refused, and any audio link it asked for stops working. To connect it again, go through the consent page again.

## For people building an MCP client

- **Transport:** Streamable HTTP, stateless, one endpoint. JSON-RPC batches are refused.
- **Discovery:** an unauthenticated request gets `401` with `WWW-Authenticate` pointing at the protected-resource metadata, `https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/mcp/.well-known/oauth-protected-resource`.
- **Authorization:** OAuth 2.1 with PKCE (`S256`) and dynamic client registration, through CallVault's Supabase Auth server, `https://bnlxrjjwawyampjbfqnu.supabase.co/auth/v1`. The person picks permissions on CallVault's own consent page; CallVault checks its own record of that choice on every call, so a disconnect ends a live token at once rather than when it expires.
- **Origins:** browser requests are accepted from `claude.ai`, `chatgpt.com` and `openai.com` and their subdomains, and from `localhost`. A request with no `Origin` header, like a desktop client's, is accepted.
- **Access keys:** an [access key](/developers/authentication) sent as a Bearer token also works here, for a script that wants MCP rather than REST.
