---
title: "The CallVault API"
description: "Read your CallVault recordings, notes, audio links, plan and household over REST with an access key: every route with a curl example, the response envelope, errors, pages, rate limits and the OpenAPI document."
sidebar_label: The API
sidebar_position: 3
tags: [developers, api, rest, openapi]
keywords: [callvault rest api, call recordings api, download call recording api, openapi callvault]
---

# The CallVault API

**The CallVault API is a read-only REST API over HTTPS. You send an [access key](/developers/authentication) and get JSON back: your recordings' details, the notes on them, a 10-minute audio link, your plan and your household.** There are no write or delete routes.

Every address below starts with:

```text
https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1
```

The machine-readable description is the [OpenAPI 3.1 document](https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/openapi.json), also served as [Markdown](https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/openapi.md). Both answer without a key, and both are built from the same definition the routes are, so they can't drift apart.

## Routes

| Route | Permission | Answers with |
|---|---|---|
| `GET /recordings` | `recordings:read` | A page of your recordings, newest first |
| `GET /recordings/{id}` | `recordings:read` | One recording's details |
| `GET /notes/{id}` | `notes:read` | The note on one recording |
| `GET /audio_link/{id}` | `audio:read` | One recording's audio facts and a 10-minute download link |
| `GET /plan_and_use` | `account:read` | Your plan, its limits and today's use |
| `GET /household` | `household:read` | The household you belong to, if any |
| `GET /token` | none | What the key you sent may do |
| `GET /openapi.json`, `GET /openapi.md` | none, no key | This API, described |

`{id}` is always a recording's id, the `id` field that `GET /recordings` returns.

## What comes back

A single record arrives as `{ "data": { … } }`. A list arrives as `{ "data": [ … ], "meta": { "next_cursor": …, "limit": … } }`. Responses are never cached (`cache-control: no-store`).

## Errors

An error arrives as:

```json
{
  "error": {
    "code": "scope_required",
    "message": "This credential needs the audio:read permission.",
    "details": { "scope": "audio:read" },
    "correlation_id": "req_4c1f9a0b7e2d6a35"
  }
}
```

| Status | `code` | What happened |
|---|---|---|
| 400 | `invalid_request` | A query value is wrong, like `limit=500`, or the cursor expired |
| 401 | `invalid_token` | The key is missing, mistyped, unknown, expired or turned off |
| 403 | `scope_required` | The key wasn't given the permission this route needs |
| 404 | `not_found` | No such record on your account, or a recording with no note or no uploaded audio |
| 405 | `method_not_allowed` | Anything but `GET` |
| 429 | `rate_limited` | Over 120 a minute for this key, or over your plan's daily requests |
| 500 | `internal` | Our fault. Send us the `correlation_id` and we can find it |

The `message` is written for a person and safe to show. A record that belongs to someone else answers exactly like one that doesn't exist.

## Pages of results

Lists return 20 at a time. Ask for up to 50 with `limit`. When `meta.next_cursor` is not `null`, send it back as `cursor` with the same filters and sort to get the next page:

```bash
curl "https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/recordings?limit=50&cursor=$NEXT" \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

A cursor lasts 15 minutes and only works with the filters and sort it was made for. If it expires, start again without it.

## Rate limits

Every answer carries `ratelimit-limit`, `ratelimit-remaining` and `ratelimit-reset` (seconds until the window resets) for the tighter of your two limits: 120 requests a minute for this key, and your plan's daily allowance across all keys and assistants, which resets at midnight UTC. A `429` also carries `retry-after`. Wait that many seconds before trying again: a refused request still counts, so retrying in a tight loop only keeps you refused.

## Recordings

```bash
curl "https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/recordings?started_at.gte=2026-11-01T00:00:00Z&limit=2" \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

```json
{
  "data": [
    {
      "id": "3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91",
      "title": "Incoming call, 21 Nov, 13:49",
      "started_at": "2026-11-21T13:49:37+00:00",
      "duration_seconds": 734,
      "labels": ["phone_call", "starred", "Pixel 8"],
      "has_audio": true,
      "has_note": true,
      "created_at": "2026-11-21T14:02:05+00:00",
      "updated_at": "2026-11-21T14:02:11+00:00"
    },
    {
      "id": "b81e04d7-52c9-4a3e-8f60-d7c2a91e5b08",
      "title": "Outgoing call, 20 Nov, 16:42",
      "started_at": "2026-11-20T16:42:03+00:00",
      "duration_seconds": 95,
      "labels": ["phone_call", "Pixel 8"],
      "has_audio": false,
      "has_note": false,
      "created_at": "2026-11-20T16:44:18+00:00",
      "updated_at": "2026-11-20T16:44:18+00:00"
    }
  ],
  "meta": { "next_cursor": "eyJyIjoicmVjb3JkaW5ncyIs…", "limit": 2 }
}
```

| Field | Meaning |
|---|---|
| `title` | Made from the direction and the start time in your own time zone. Never a contact name or number. |
| `started_at`, `duration_seconds` | When it started, and how long it is in whole seconds |
| `labels` | `phone_call` or `microphone`, `starred` when you starred it, and the phone it was recorded on |
| `has_audio` | Whether its audio has finished uploading to your private cloud. Only then does `/audio_link` have a file. |
| `has_note` | Whether you saved a note on it |

**Query options:** `started_at.gte` and `started_at.lt` take an ISO 8601 time; `sort` is `-started_at` (the default, newest first) or `started_at`. A recording you asked to delete is gone from every answer at once, before its files are removed.

`GET /recordings/{id}` answers with one of these records.

## Notes

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/notes/3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91 \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

```json
{ "data": { "id": "3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91", "note": "Plumber confirmed Thursday 9 am, quote 240." } }
```

The note is the text you typed, or kept after speaking it. A recording with no note answers `404`; check `has_note` first to save a request.

## Audio links

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/audio_link/3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91 \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

```json
{
  "data": {
    "id": "3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91",
    "asset_kind": "original",
    "mime_type": "audio/mp4",
    "size_bytes": 5873664,
    "duration_seconds": 734,
    "uploaded_at": "2026-11-21T14:02:11+00:00",
    "download_url": "https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/recording-asset-download?link=cvdl_…",
    "expires_at": "2026-11-21T14:22:40+00:00"
  }
}
```

Each request makes a new link to the recording's main audio file. Download it with a plain `GET`; the link itself is the credential, so send no key with it:

```bash
curl -o call.m4a "$DOWNLOAD_URL"
```

The link stops working at `expires_at`, 10 minutes after it was made, or as soon as the key that asked for it is turned off, whichever comes first. A player may fetch it in parts with `Range` requests; after 20 requests the link is used up. Every link you ask for is written to your account's audit log.

`asset_kind` says which file you get: `original` for a single-track recording, or the combined or channel file CallVault keeps as the main one for an imported recording. A recording whose audio hasn't finished uploading answers `404`.

## Plan and use

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/plan_and_use \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

A list with one record, yours: `plan_id` and `plan_name`, `via` (how you have the plan: `grant`, `household`, `override` or `default`), `plan_ends_at`, your private cloud limits and use in bytes and files, the largest file your plan accepts, and the open-platform limits (`access_keys_max`, `api_requests_per_day`, `webhook_addresses_max`, `assistant_connections_max`) beside `requests_today`. A `null` limit means the plan sets none.

## Household

```bash
curl https://bnlxrjjwawyampjbfqnu.supabase.co/functions/v1/api/v1/household \
  -H "Authorization: Bearer $CALLVAULT_KEY"
```

```json
{
  "data": [
    { "id": "e4a7c2f9-3d18-4b6e-9a05-7c1f2b8d6e43", "name": "Harbour Lane", "role": "member", "seat_limit": 5, "seats_used": 4, "created_at": "2026-10-02T08:15:00+00:00" }
  ],
  "meta": { "next_cursor": null, "limit": 20 }
}
```

An empty list means you're not in a [Family household](/user-guide/plans-and-family). The API never says who the other members are, and never reaches their recordings.
