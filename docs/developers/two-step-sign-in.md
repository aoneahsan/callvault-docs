---
title: "Two-step sign-in"
description: "Turn on two-step sign-in for CallVault on the phone or in the web library: a six-digit authenticator code after Google, ten single-use recovery codes, an optional seven-day remembered phone or browser, and what to do when a phone is lost."
sidebar_label: Two-step sign-in
sidebar_position: 6
topics: [developers, security, two-step, mfa, recovery-codes]
keywords: [callvault two-step sign-in, callvault 2fa, authenticator app callvault, recovery codes, lost phone two-step]
---

# Two-step sign-in

**With two-step sign-in on, signing in to CallVault asks for a six-digit code from an authenticator app as well as your Google account. Someone who gets into your Google account still can't open your recordings.** It's optional for everyone, and required for CallVault's own team.

It lives under **Security**: on the phone at Settings → Privacy & security → Security, and in the [web library](https://callvault.aoneahsan.com/app/security) in the side rail, or the **Security** row on the Profile tab on a narrow screen. Both show the same settings.

## Setting it up

1. Open **Security** and choose **Set up two-step sign-in**.
2. Add CallVault to your authenticator. Google Authenticator, Microsoft Authenticator, 1Password or any app that shows six-digit codes works.
   - **On the phone,** **Open in authenticator app** adds it directly, or scan the QR code from another device.
   - **In the web library,** scan the QR code with your phone. If the camera won't read it, type the key shown below it into the app instead.
3. Type the six-digit code it shows, and choose **Turn on two-step**. Codes change every 30 seconds; type the one showing now.
4. Save your **ten recovery codes**: copy all ten, or download them as `callvault-recovery-codes.txt`. They're shown now and never again, so keep them somewhere away from this phone. Tick **I've put these codes somewhere safe**, then **Finish**.

Two-step is on once the codes are made, and CallVault emails you that it was turned on.

## Signing in

After you sign in with Google, CallVault asks for the six-digit code from your authenticator, on the phone and in the browser alike. Type it and choose **Continue**.

## Remembering a phone or browser for seven days

Under the code there is a box: **Remember this phone for 7 days** in the app, **Remember this browser for 7 days** in the web library. It's unticked every time. Leave it unticked on a shared device.

Ticked, that phone or browser skips the code on sign-in for seven days from that moment. Signing in again doesn't extend it; after seven days it asks once more. Three things still ask for a code on a remembered device:

- showing an [access key](/developers/authentication) or a webhook secret again;
- admin pages;
- turning two-step off or making new recovery codes.

A remembered browser can **Allow** an assistant on the [consent page](/developers/assistants#the-page-that-asks-you) without a code, because an assistant can only read.

**Security → Remembered phones and browsers** lists each one with the day it stops being remembered. **Forget** ends one; **Forget all** ends every one. Signing out on a remembered phone or browser forgets it too.

## Recovery codes

Each of the ten codes signs you in once in place of the six-digit code: choose **Use a recovery code instead**, then type it, with or without the dash. **Security** shows how many are left and warns you when you're running low. **Make new recovery codes** replaces the whole set; it asks for a code from your authenticator and a sign-in within the last 10 minutes, and the old codes stop working as soon as the new ones appear.

Using one emails you, so a code you didn't use stands out.

## If you lose your phone

1. Sign in with Google, choose **Use a recovery code instead**, and type one of your codes. Two-step stays on.
2. Straight away, open **Security** and choose **Moved to a new phone**. You have 10 minutes after the recovery code to start it.
3. Add CallVault to the authenticator on your new phone and type its code. The old phone's codes stop working once the new one is confirmed.

A recovery-code sign-in lasts 12 hours and does less than a normal one: it can't show keys or webhook secrets and can't open admin pages. Setting up the new phone gives you a full sign-in again.

## If you lose your phone and your recovery codes

Write to aoneahsan@gmail.com from the address on your CallVault account. After we've checked it's really you, a CallVault admin resets your two-step sign-in: it turns two-step off, deletes your recovery codes and forgets your remembered phones and browsers. You get an email when it's done, and you can set it up again with your new phone.

An admin's own two-step is never reset this way; only the owner can reset it, on the server.

## Turning it off

**Turn off two-step** asks for a code from your authenticator, and you must have signed in within the last 10 minutes. After it, signing in needs only your Google account, your recovery codes are deleted and remembered phones and browsers are forgotten. CallVault emails you about the change.

Team accounts can't turn it off: admin pages stay locked until two-step is on.

## Recent sign-ins

**Security → Recent sign-ins** lists where your account signed in and how: Google, Google and a code, or Google and a recovery code. **Sign out everywhere else** ends every other session and keeps this one.
