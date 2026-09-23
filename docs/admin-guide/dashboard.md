---
title: "The admin dashboard"
description: "An Overview of platform totals and recent activity, then six tabs: users, plans, releases, cloud usage, the audit log and roles. Reached at /admin on the web and from Settings in the app."
sidebar_position: 1
tags: [admin, dashboard, stats]
keywords: [callvault admin, admin dashboard, platform totals, user activity]
---

# The admin dashboard

Administrators get an extra surface on top of the ordinary app. Everybody else never sees it, and the server refuses a privileged write from anyone else even if they find the screen.

## Getting in

On the web it is `/admin`. On the phone it is **Settings → Admin panel**. Administrator reach is a grant checked against the server each time you open it, so nobody arrives at it by typing a URL. Somebody without the grant gets a plain "admin access required" panel with a link back to the app, never a raw error and never somebody else's data. There is always a way back to your own recordings, because an administrator is also an ordinary user with a library of their own.

## What you see

The dashboard opens on **Overview**: the number of accounts on the platform, how many were active in the last 14 days, and a chart of recent activity across it.

Six tabs sit beside it, the same six the web rail carries:

- **Overview**, the totals above.
- **Users**: the list of accounts, each one opening its [user detail](/admin-guide/user-management).
- **Plans**, **Releases**, **Cloud usage** and **the audit log**: the administrator tools added in 1.3.0, all covered on [Plans and releases](/admin-guide/plans-and-releases).
- **Roles**: who holds administrator access and how it was granted, on [Roles & access](/admin-guide/roles).

## What an administrator can actually reach

Be plain about this, because the privacy pages are: an administrator can open the private files a user has backed up. There are no public links to any of them, and no way to reach one without that grant, but the grant itself is real reach over real audio.

Every privileged write lands in an append-only audit log carrying the actor, the action, the target, and the before and after values, and nothing in that log can be edited or removed. That log records changes. It is not a record of every time a file is opened. If you hold administrator access, assume your work is on the record, because it is.

## Complete the next step

[Plans and releases](/admin-guide/plans-and-releases) is where the release policy every phone reads, the plan limits the server enforces, individual grants, cloud usage and the audit log all live.
