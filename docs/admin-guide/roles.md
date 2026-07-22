---
title: Roles & access
description: CallVault has two roles — user and admin. Admin reach is granted by database row-level security and enforced live, with privileged actions handled server-side.
sidebar_position: 2
tags: [admin, roles, security, rls]
keywords: [callvault roles, admin role, row level security, access control]
---

# Roles & access

CallVault keeps its access model simple and defends it in depth.

## Two roles

- **User** — sees and manages only their own recordings.
- **Admin** — additionally sees the [admin dashboard](/admin-guide/dashboard) and can
  manage other users.

Your role lives on your profile. You can edit your own display name, but **you cannot
change your own role or account status** — those are locked and can only be changed by a
privileged, server-side action.

## How admin reach works

CallVault's apps talk to the database with an ordinary, publicly-shippable key. What an
admin can additionally see is granted by the database's **row-level security** rules — an
admin's queries are allowed to reach every user's rows, while a normal user's queries
match only their own. The check uses a live "is this caller an admin?" test on the server,
not anything baked into the sign-in token, so revoking admin takes effect immediately.

## Privileged actions are server-side

Changing a role, disabling an account, or deleting another user is never done directly by
the app. Those run through dedicated **server-side functions** that verify the caller is an
admin before acting. The app never holds the elevated credentials that could bypass the
rules.

## Disabled accounts

A disabled account matches no data rules at all, so it sees zero rows — and the web app
routes it to a clear "account disabled" screen rather than an empty app.
