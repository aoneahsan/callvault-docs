---
title: "Setting up a white-label CallVault"
description: "The steps from a white-label request to your users' first download: details, domain, branding, the signed build and the download page."
sidebar_position: 3
tags: [white-label, licensing]
keywords: [white label app setup, rebrand android app domain]
---

# Setting up a white-label CallVault

1. **Send the request.** Use the form on the [pricing page](https://callvault.aoneahsan.com/white-label/pricing). Card payment isn't open for CallVault yet, so we reply by email with the quote and these steps.
2. **Send your branding.** Your app name, an icon as an SVG or a large PNG, your colours, and the domain your users will download from.
3. **Point your domain.** We send the DNS record to add. The download page, the web library and the licence file are served from that domain.
4. **We build and sign your APK.** It carries your name and package name and its own licence key. We publish it with its `SHA256SUMS` file on your download page.
5. **Test one real call.** Install it on a phone you use and make a test call before you tell your users about it.
6. **Your update period starts** on the day you paid, not the day the build went live.

Each deployment serves its licence at `/.well-known/callvault-white-label-license.json`, so anyone can [check it](./verify.md).
