---
title: "Moving from BCR to CallVault"
description: "How to move from BCR to CallVault, what changes, and who should stay on BCR. Facts checked 7 November 2026."
sidebar_label: "BCR"
sidebar_position: 4
tags: [compare, moving]
---

# Moving from BCR to CallVault

Basic Call Recorder: an open-source recorder for rooted phones or custom firmware. Facts about it come from <a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">its own page</a>, last checked 7 November 2026. Prices and the wider comparison are on [the CallVault site](https://callvault.aoneahsan.com/compare/bcr).

## Should you move?

Stay on BCR if one of these is you:

- Your phone is rooted or on custom firmware: BCR works at that level, and CallVault runs as an ordinary app.
- You want an app with no network permission at all. Its README says it does not and will never access the network.
- You want to read the source: it is GPL-3.0.

Move if these matter more:

- It runs on a stock phone with no rooting.
- Optional private backup and a web library.
- CallVault can import from a BCR-compatible folder, so you can use both.

## How do you move?

1. [Install CallVault](/getting-started/install) and record one real call. Play it back before you change anything else. What CallVault hears depends on your phone.
2. Keep BCR's recordings where they are until that test call sounds right.
3. To bring old recordings across, [point CallVault at the folder they're in](/user-guide/recording#import-from-another-recorder). CallVault reads those files and never changes them. It's built around phone makers' recorders and BCR-compatible ones, and we haven't tested BCR's files, so try one first.

## How do they differ?

| What it does | CallVault | BCR |
|---|---|---|
| Records phone calls on Android | Yes | Yes (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
| Starts recording by itself | Yes | Yes (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
| Records WhatsApp and other internet calls | No | Not stated on their site |
| The other person is clear without the speaker | Partly | Not stated on their site |
| Announces the recording on the call | No | Not stated on their site |
| Works without rooting the phone | Yes | No (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
| Installs from Google Play | No | Not stated on their site |
| Says recordings stay on the phone | Yes | Yes (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
| Copies recordings off the phone | Yes | No (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
| Plays recordings in a web library | Yes | Not stated on their site |
| Imports recordings other apps made | Yes | Not stated on their site |
| Writes a transcript of the call | No | Not stated on their site |
| Shows no ads | Yes | Not stated on their site |
| Open source | No | Yes (<a href="https://github.com/chenxiaolong/BCR" target="_blank" rel="noopener noreferrer nofollow">source</a>) |
