---
title: Recording your calls
description: How CallVault captures calls — the microphone track that works on any phone, and the optional folder-watch track for rooted devices with both-sides audio.
sidebar_position: 1
tags: [recording, capture, microphone, bcr, tracks]
keywords: [record calls android, both sides call recording, mic recording, bcr folder watch]
---

# Recording your calls

CallVault has a pluggable capture engine with two "tracks". The rest of the app — the
list, search, backup, sync — is identical whichever track you use. Only how the audio is
captured differs.

## Why capture is device-dependent

Android reserves the actual call-audio stream (both uplink and downlink) for
system-privileged apps. A normal sideloaded app can never hold that permission, no
matter what it prompts for. So a stock, non-rooted phone can capture **your side clearly
and the other party only as much as the phone's speaker emits**. This is the honest
ceiling, and CallVault says so during onboarding rather than pretending otherwise.

## Track B — microphone (default, no root)

Works on any supported phone, including stock Samsung. When a call starts, a foreground
service records from the microphone and stops when the call ends.

- **Your voice:** captured clearly.
- **The other party:** best on speakerphone; muffled or absent otherwise. CallVault can
  **auto-enable speakerphone** at call start (a setting) to improve this, though some
  devices block that.
- **Automatic**, no announcement, no root.

This is the recommended default for most people.

## Tracks C and D — folder watch (optional, rooted)

If you run a dedicated recorder such as **BCR (Basic Call Recorder)** — which on a rooted
device can capture both sides at full fidelity with no announcement — CallVault can watch
that recorder's output folder and import each new recording, reading its metadata for
number, direction, timestamps, and SIM slot.

- **Track D** consumes another recorder's output; CallVault itself needs no microphone
  permission at all — the cleanest privacy footprint.
- Set it up under **Settings → connect a recordings folder** and grant read access to the
  folder your recorder writes to.

CallVault reads those files; it does not modify or replace your recorder.

## What gets captured for each call

Every completed recording is stored with its number, direction (incoming/outgoing),
contact name (if available), SIM slot, start time, duration, size, and audio format. From
there it enters the [sync pipeline](/architecture/pipeline) for optional backup.

| Requirement | Microphone (Track B) | Folder watch, rooted (Track D) |
|---|---|---|
| Records every call automatically | Yes | Yes |
| Your side captured | Yes | Yes |
| Other party captured | Speaker only | Yes |
| No announcement | Yes | Yes |
| Needs root | No | Yes (for the recorder) |
