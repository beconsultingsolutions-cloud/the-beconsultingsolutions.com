# BECS OS — Deployment Setup Checklist

Steps that have to be done by hand in the GitHub, Netlify, Supabase, Square and Resend dashboards.
Tick each box as you go.

Supabase project: `sojnqelvouqkkkckwbmj` — https://sojnqelvouqkkkckwbmj.supabase.co

> **Never paste passwords or secret keys into this file, GitHub, or chat.** They go only into the
> Supabase SQL editor and Netlify's environment variable settings.

---

## 1. Upload the package and connect Netlify

- [ ] Put the updated `deploy/` folder into the `beconsultingsolutions-cloud/becs-os` repo on GitHub
- [ ] In Netlify: **Add new site → Import an existing project → GitHub → becs-os**
- [ ] Write down the Netlify address it gives you (e.g. `https://<name>.netlify.app`). You need it in steps 4 and 5.

Netlify address: `______________________________`

## 2. Database password for `console_api`

Status on 2026-09-24: the `console_api` role exists in Supabase but **cannot log in yet** (`rolcanlogin = false`).
This step fixes that.

- [ ] Make a long random password (a password manager can generate one; 32+ characters, letters and numbers only)
- [ ] Supabase → **SQL Editor**, run:
  ```sql
  alter role console_api login password '<long random>';
  ```
- [ ] Check it worked:
  ```sql
  select rolname, rolcanlogin from pg_roles where rolname = 'console_api';
  -- rolcanlogin should now be true
  ```
- [ ] Put the connection string with that password into Netlify as `HUB_DATABASE_URL` (step 3)

## 3. Netlify environment variables

Netlify → Site → **Site configuration → Environment variables**. The full list is in README step 4 of the deploy package.

| Variable | Where to get it | Done |
|---|---|---|
| `HUB_DATABASE_URL` | Connection string using the `console_api` password from step 2 | [ ] |
| `SUPABASE_URL` | `https://sojnqelvouqkkkckwbmj.supabase.co` | [ ] |
| Supabase anon key | Supabase → Project Settings → API | [ ] |
| Supabase service key | Supabase → Project Settings → API (keep secret) | [ ] |
| Square keys | Square Developer Dashboard → your app → Credentials | [ ] |
| Resend key | Resend → API Keys | [ ] |

- [ ] Checked the names against README step 4 (it has the exact spellings)
- [ ] Redeployed the site after adding them (Deploys → Trigger deploy)

## 4. Supabase Auth settings

- [ ] Supabase → **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up"
- [ ] Supabase → **Authentication → URL Configuration**: set **Site URL** to your Netlify address from step 1

## 5. Square and Resend

- [ ] Square Developer Dashboard → Webhooks: point the webhook at `https://<your-netlify-address>/api/webhooks/square`
- [ ] Put the Square webhook signature key into Netlify if README step 4 lists it
- [ ] Resend: _this step was cut off in the original instructions. Fill it in from the deploy README
      (usually: verify your sending domain and add its DNS records)._

## 6. Final check

- [ ] The site loads at the Netlify address
- [ ] You can log in with your existing account, and a new person **cannot** sign up
- [ ] A test Square payment shows up in the app
- [ ] A test email arrives via Resend
