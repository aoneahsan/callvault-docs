---
title: The admin dashboard
description: The /admin dashboard shows platform totals, recent activity, and the user list. It is available on the web and inside the phone app for administrators.
sidebar_position: 1
tags: [admin, dashboard, stats]
keywords: [callvault admin, admin dashboard, platform totals, user activity]
---

# The admin dashboard

Administrators get an extra dashboard on top of the normal app. On the web it lives at
`/admin`; on the phone it's reached from **Settings → Admin**. Everyone else never sees it.

## What it shows

- **Platform totals** — how many users and recordings exist overall.
- **Recent activity** — a rolling chart of recording activity over recent days.
- **Users** — the list of accounts, leading into each [user's detail](/admin-guide/user-management).

## Getting in

The dashboard is gated on your **live** admin status, checked against the server on every
visit — not on anything stored in your sign-in token. A non-administrator who navigates to
`/admin` gets a clean "admin access required" panel with a link back to the app, never a raw
error and never someone else's data.

There's always a **"Back to app"** control so administrators can move between the dashboard
and their own recordings.

How admin access is granted is covered in [Roles & access](/admin-guide/roles).
