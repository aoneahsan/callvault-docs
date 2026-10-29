---
title: "Deleting recordings & your account"
description: "Delete a recording locally or request cloud removal, and learn how to resume account deletion if it needs another pass."
sidebar_position: 7
tags: [delete, account-deletion, privacy, data]
keywords: [delete call recording, delete account, remove data, self-service deletion]
---

# Deleting recordings & your account

Delete a recording from its detail screen, or start account deletion from **Profile**. For a backed-up recording, CallVault waits for server confirmation before removing any local copy; an account request also remains open if an upload's outcome needs administrator review. Read the steps below.

## Deleting a single recording

From a recording's detail screen you choose the scope:

- **Delete on this phone only**: removes the local file and its row from this phone, and leaves the backed-up copy where it is.
- **Delete everywhere**: asks the server to remove known cloud files and the call's details. For a signed-in recording, the app keeps any local copy and deletion state while the server checks related objects and unfinished uploads; the app removes any local copy only after the server confirms removal. If it says **"Still processing on the server"**, retry from that recording's detail screen. For another error that persists, email **aoneahsan@gmail.com**.

The web library can request **Delete everywhere** from a recording's detail view too. If CallVault shows more available cloud space while deletion is still running, that number does not confirm that every related file is gone. Retry until the server confirms removal.

## Deleting your account

Open **Profile** in the app or the [web library](/user-guide/web-app), choose **Delete account**, and type DELETE. You can start the request yourself. If an upload's outcome is unclear, an administrator may need to check whether a private file exists and reconcile that attempt before the account request can finish.

Account deletion starts removing known cloud recordings and their details. The server records unfinished upload attempts. It works through them before removing your sign-in identity. When the server cannot confirm whether an upload created a private file, an administrator must check what happened to that file before the account request can finish. No email is sent to confirm a deletion you started in the app.

## When it's actually finished

Profile shows a processing state while the app asks the server to remove backed-up files. It then shows success or an error message. If it says **"Still processing on the server"**, reopen **Delete account** from Profile to resume the saved request. For a different error, or if retries still cannot finish, email **aoneahsan@gmail.com** from your account address with the subject **"Delete my CallVault data"** so an administrator can check what happened. An empty file listing is not a completion signal when an upload is unresolved.

Local files already on a phone are removed by the app on that phone. A copy you exported or saved to Downloads lives outside CallVault and is untouched by account deletion, so remove those yourself if you want them gone as well.

:::warning This is permanent
Account deletion can't be undone. If you only want to stop backing up, turn **Private cloud backup** off instead. That keeps every recording on the phone.
:::

## Complete the next step

If you only wanted to store less, [Private cloud backup](/user-guide/sync-backup) covers the switch and what your plan allows.
