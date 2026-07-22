---
title: User management
description: From a user's detail screen an admin can change their role, disable or re-enable the account, or delete the user and all their data.
sidebar_position: 3
tags: [admin, users, moderation]
keywords: [manage users callvault, disable account, delete user, change role]
---

# User management

Open any account from the [admin dashboard](/admin-guide/dashboard) user list to reach its
detail screen, where the account's activity and controls live.

## What an admin can do

- **Change role** — promote a user to admin or demote back to user.
- **Disable / re-enable** — a disabled user is immediately locked out (they see no data and
  the web app sends them to the "account disabled" screen). Re-enabling restores access.
- **Delete the user** — removes the account, its profile, all of its recording metadata,
  and its backed-up audio.

## Safeguards

Every one of these runs through a server-side function that first confirms the caller is a
current administrator, then performs the change with elevated privileges the app itself
never holds. The confirmation dialogs name the exact action (for example, **Disable**
rather than a generic "confirm") so there's no ambiguity about what you're about to do.

Deletion of a user is permanent — the same shape as a user
[deleting their own account](/user-guide/account-deletion).
