# Legal — source of truth for the policy documents

Backup and editing source for the legal pages. The site does **not** read
these files at runtime — they exist so the original text survives outside
Termly, and so edits have a reviewable diff.

## Why this folder exists

Both policies are hardcoded HTML inside the app:

| Page | Served from | Size |
|---|---|---|
| `/privacy` | `app/privacy/privacy-content.ts` (`PRIVACY_POLICY_HTML`) | ~35 KB |
| `/cookie-policy` | `app/cookie-policy/page.tsx` (`COOKIE_POLICY_HTML`) | ~30 KB |

Termly is **not** involved in serving them. The only Termly dependency on
the site is the consent banner (`app.termly.io/resource-blocker/...`) in
`app/layout.tsx`.

The Privacy Policy was deleted from Termly (free plan allows one document,
and the slot is reserved for the Cookie Policy, which must be regenerated
whenever the cookies change — e.g. when GA4 adds `_ga` / `_ga_*`).
Deleting it there is irreversible, so `privacy-policy.html` below is the
only remaining copy of the original.

## Workflow

1. Paste the exported HTML into the matching file below.
2. Fill in the header block (source + date) at the top of the file.
3. Ask Claude to sync it into the app — the HTML has to be escaped for a
   JS template literal (backticks, `${`, and `\` all need handling), so
   do not copy it across by hand.
4. `npm run build`, then deploy.

## Files

| File | Paste here | Status |
|---|---|---|
| `privacy-policy.html` | Privacy Policy exported from Termly before deletion | ✅ saved 2026-09-14 — plain text, verified identical to live |
| `cookie-policy.html` | Cookie Policy, re-exported after each Termly cookie scan | ⬜ empty |

## Reminder — after GA4 goes live

The Cookie Policy currently declares only `_fbp` (Meta). Once GA4 is
live it must be re-scanned in Termly, re-exported into
`cookie-policy.html`, and synced into `app/cookie-policy/page.tsx`.
Cookies set but not declared are the exact mismatch regulators flag.
