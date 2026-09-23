---
title: "Recording your calls"
description: "CallVault records through the phone's microphone path, and it can import recordings your phone's own recorder or a BCR-compatible recorder already made. Every track carries the source CallVault actually found."
sidebar_position: 1
tags: [recording, capture, microphone, bcr, tracks]
keywords: [record calls android, both sides call recording, mic recording, bcr folder watch]
---

# Recording your calls

CallVault records through the phone's microphone path, and it can import recordings another recorder already made. The list, the search, the notes and the backup are the same either way. Only how the audio reached the phone differs.

:::note
Recording laws vary; you are responsible for getting any consent required where you are. This is general information, not legal advice.
:::

## Why capture is device-dependent

An ordinary Android app can't read the phone network's call audio, whatever any app promises. CallVault records through the phone's microphone path instead, so your own side is the reliable part, and the other person is only as clear as the phone's speaker makes them. An optional setting turns the speaker on when a call starts. Results depend on the phone.

## The microphone path

This is the default and needs nothing unusual from the phone. A call starts, CallVault records, and the recording ends when the call does. A banner shows inside the app and a persistent notification stays visible throughout. CallVault does not announce the recording to the other person.

Two things interrupt it, both Android's rule rather than a bug. After a restart or a force-stop, Android won't let an app start microphone capture in the background, so CallVault notifies you to open it again. And a recording that comes back looking silent is flagged, not filed quietly.

## Make one test call, then decide

Nothing on this page tells you what your phone will do. One real call does.

Record one and play it back. If both sides are clear enough, the microphone path is your path and you are done. If the other person is faint, turn the speaker option on and try again. Still faint, and your phone maker ships its own recorder? That recorder may reach audio an ordinary app cannot, because the phone maker wrote it and is allowed to, and the next section is for you.

## Import from another recorder

If your phone maker's own recorder does better, or you run a BCR-compatible one, point CallVault at the folder that recorder writes to. CallVault imports each new file it finds there. It reads those files. It never modifies or replaces your recorder. A stereo import splits into its real channels.

An import can also carry a contact name, when the recorder that made it saved one. That is the only way a name reaches CallVault, which never reads your address book and never asks to.

## What the labels mean

Every track carries the source CallVault actually found. A track is never labeled "caller" or "other party" unless that is verified, which is why some tracks read as a channel and not as a person.

Where a call has at least two audible tracks whose files are still on the phone, you can ask for a combined recording: one playable mix, made on request. A one-track call has none, and nothing on the screen pretends otherwise. Read the labels before you judge the result.

## What gets captured for each call

Alongside the audio, CallVault stores the call's details: the number, the direction, when it started, how long it ran, which SIM handled it, the audio format and the file size. [Data layer](/architecture/data-layer) has the full list. Nothing else is kept. A recording then enters the [sync pipeline](/architecture/pipeline), but only if you signed in and turned private cloud backup on.

## Complete the next step

Heard what you needed? [Playback and export](/user-guide/playback) covers the tracks and the combined mix. Heard a problem? [Troubleshooting](/reference/troubleshooting) starts with the faint-other-side case.
