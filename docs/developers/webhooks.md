---
title: "Webhooks"
description: "CallVault sends your server a signed POST when a recording is added or its audio finishes uploading. Every event with a sample payload, signature checks in Node and Python, a message to test against, and the retry schedule."
sidebar_label: Webhooks
sidebar_position: 5
topics: [developers, webhooks, standard-webhooks, signing]
keywords: [callvault webhooks, verify webhook signature, standard webhooks node, standard webhooks python, recording uploaded webhook]
---

# Webhooks

**A webhook tells your own server the moment something happens in CallVault: a recording is added to your account, or its audio finishes uploading. CallVault sends a signed `POST` with the recording's details, never a contact name, a phone number, note text or audio.** Fetch those with an [access key](/developers/api) when you need them.

Messages are signed the [Standard Webhooks](https://www.standardwebhooks.com/) way, so any library that implements it can check them.

## Adding an address

1. Open **Other apps → Webhooks** in the app or the [web library](https://callvault.aoneahsan.com/app/other-apps?tab=webhooks) and choose **Add an address**.
2. Paste an `https://` address. CallVault doesn't send to plain `http`.
3. Under **Send when**, tick one or both events.
4. Choose **Add address**, then copy the **Signing secret** that appears. It starts with `whsec_`.

CallVault checks the address before saving it, and again before every send. It refuses:

- anything but `https`, and ports other than 443 and 8443;
- a username or password inside the address (check the signing secret on your server instead);
- an address longer than 2,048 characters;
- a name that points to a private, local or loopback network;
- CallVault's own servers.

Your plan sets how many addresses you can have: 3 on Free, 20 on Pro, 40 on Family.

The signing secret follows the [10-minute rule](/developers/authentication#showing-a-key-again-the-10-minute-rule): you can show it again only within 10 minutes of signing in, with a code when two-step is on.

## What a message looks like

```http
POST /hooks/callvault HTTP/1.1
content-type: application/json
user-agent: CallVault-Webhooks/1.0
webhook-id: msg_6f1c0e9a4b2d4c7e8a5f3b1d9e0c2a74
webhook-timestamp: 1795269731
webhook-signature: v1,KXfyLaCC7f32HlkcICIKQdzHqNy5ZrCVV+Yuevpl9DY=

{"type":"recording.created","timestamp":"2026-11-21T14:02:11.204Z","data":{…}}
```

| Part | Meaning |
|---|---|
| `webhook-id` | The event's id. It stays the same on every retry and on **Send again**, so use it to ignore a repeat. |
| `webhook-timestamp` | When this attempt was signed, in Unix seconds |
| `webhook-signature` | One or more `v1,<signature>` values separated by spaces |
| `type` | The event, from the list below |
| `timestamp` | When the event happened |
| `data` | The event's details |

## Events

### recording.created

A recording reached your CallVault account: synced from the phone or imported. `data` has the same fields, under the same names, as a recording in the [API](/developers/api#recordings), minus `has_audio` and `has_note`.

```json
{
  "type": "recording.created",
  "timestamp": "2026-11-21T14:02:11.204Z",
  "data": {
    "id": "3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91",
    "title": "Incoming call, 21 Nov, 13:49",
    "started_at": "2026-11-21T13:49:37+00:00",
    "duration_seconds": 734,
    "labels": ["phone_call", "starred", "Pixel 8"]
  }
}
```

### recording.upload_finished

A recording's main audio file finished uploading to your private cloud. From now on `GET /audio_link/{id}` has a file to link to. `id` is the recording's id.

```json
{
  "type": "recording.upload_finished",
  "timestamp": "2026-11-21T14:06:48.517Z",
  "data": {
    "id": "3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91",
    "asset_kind": "original",
    "duration_seconds": 734,
    "size_bytes": 5873664,
    "uploaded_at": "2026-11-21T14:06:47+00:00"
  }
}
```

The two events for one recording can arrive in either order: on a slow connection the audio may finish before the recording's details reach the server. Don't rely on `recording.created` coming first.

### webhook.test

Sent only when you choose **Send a test** on an address, to that address alone.

```json
{ "type": "webhook.test", "timestamp": "2026-11-21T14:10:02.031Z", "data": { "message": "Test event" } }
```

Nothing is sent for a person whose account is being deleted, and a change that fails to save sends nothing: an event is written in the same database step as the change itself.

## Checking the signature

The signature is a base64 HMAC-SHA256 over `{webhook-id}.{webhook-timestamp}.{raw body}`, keyed with the base64-decoded part of your secret after `whsec_`. Check it on the **raw bytes** you received; parsing the JSON and serialising it again changes the bytes and the check fails. Refuse a timestamp more than five minutes from your clock, so an old message replayed later is refused too.

### Node

No dependency; Node 18 or newer.

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

const TOLERANCE_SECONDS = 300;

/** True when a CallVault webhook is genuine. `rawBody` is the request body as a Buffer. */
export function verifyCallVault(secret, headers, rawBody, now = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(now - Number(timestamp)) > TOLERANCE_SECONDS) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.`).update(rawBody).digest();
  return signatures.split(' ').some((part) => {
    const [version, value] = part.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

With Express, read the body raw on that one route:

```js
app.post('/hooks/callvault', express.raw({ type: 'application/json' }), (req, res) => {
  if (!verifyCallVault(process.env.CALLVAULT_WEBHOOK_SECRET, req.headers, req.body)) {
    return res.sendStatus(400);
  }
  const event = JSON.parse(req.body.toString('utf8'));
  res.sendStatus(204);
  handle(event); // after answering, so slow work never runs past the 10-second wait
});
```

### Python

Standard library only; Python 3.9 or newer.

```python
import base64
import hashlib
import hmac
import time

TOLERANCE_SECONDS = 300


def verify_callvault(secret, headers, raw_body, now=None):
    """True when a CallVault webhook is genuine. raw_body is the request body as bytes."""
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now is None else now
    if abs(now - int(timestamp)) > TOLERANCE_SECONDS:
        return False
    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()
    for part in signatures.split(" "):
        version, _, value = part.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

In Flask, pass `request.headers` and `request.get_data()`; in Django, `request.headers` and `request.body`.

### A message to test against

Both functions above return true for this message when `now` is `1795269731`, and false if one byte of the body changes. Use it to check your own code before pointing a real address at it. The secret is an example, not one CallVault ever issued.

| | Value |
|---|---|
| Secret | `whsec_dO3cgGthomKhO8+dbHiKfexif0Uh+oC6f1o5zB6hLQY=` |
| `webhook-id` | `msg_6f1c0e9a4b2d4c7e8a5f3b1d9e0c2a74` |
| `webhook-timestamp` | `1795269731` |
| `webhook-signature` | `v1,KXfyLaCC7f32HlkcICIKQdzHqNy5ZrCVV+Yuevpl9DY=` |

The body, exactly, on one line:

```json
{"type":"recording.created","timestamp":"2026-11-21T14:02:11.204Z","data":{"id":"3f6b2c1e-8d4a-4e7b-9c15-2a0d7e6f4b91","title":"Incoming call, 21 Nov, 13:49","started_at":"2026-11-21T13:49:37+00:00","duration_seconds":734,"labels":["phone_call","starred","Pixel 8"]}}
```

## Answering and retries

Answer with any `2xx` within 10 seconds. Anything else, or no answer, is a failed try, and CallVault tries again after 5 seconds, 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours and 10 hours: eight tries in all, the last about 28 hours after the first. Each try is listed under **Deliveries** for that address with its status and time, and **Send again** resends one with the same `webhook-id`.

Two answers turn an address off:

- **`410 Gone`** turns it off at once. Use it when you retire the receiver.
- **Five days of failed deliveries** turns it off, and CallVault emails you the last answer it got and how many deliveries are waiting.

CallVault never follows a redirect; a `3xx` counts as a failed try. After you fix the receiver, choose **Turn back on**.

## Replacing the secret

**Replace secret** makes a new one. For the next 24 hours every message carries two signatures, the new secret's first, so your check passes with either. Put the new secret on your server within that day.

## Pausing or removing an address

**Pause** stops sending: events that happen while it's paused aren't sent to that address later. **Resume** sends again from that moment. **Remove address** ends it for good.
