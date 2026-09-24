# BECS OS — Deployment Setup Checklist

Steps that have to be done by hand in the GitHub, Netlify, Supabase, Square and Resend dashboards.
Tick each box as you go.

Supabase project: `sojnqelvouqkkkckwbmj` — https://sojnqelvouqkkkckwbmj.supabase.co

> **Never paste passwords or secret keys into this file, GitHub, or chat.** They go only into the
> Supabase SQL editor and Netlify's environment variable settings.

---

## 0. Public website (thebeconsultingsolution.com) → Cloudflare Pages

The site lives in this repo's `deploy/` folder. It was tested on Cloudflare's local server on 2026-09-24: all pages, direct page links, mobile layout, contact-form checks and rate limit passed.

- [ ] Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → pick `the-beconsultingsolutions.com`
  - Production branch: `claude/deployment-setup-checklist-f544xv` (switch to `main` later if you create one)
  - Framework preset: **None** · Build command: *(leave empty)* · Build output directory: `.` · **Root directory: `deploy`**
- [ ] Project → **Settings → Variables and Secrets** (Production): add `RESEND_API_KEY` as a *Secret*
      (`TO_EMAIL`, `FROM_EMAIL`, `ALLOWED_ORIGINS` already come from `deploy/wrangler.toml`)
- [ ] Project → **Settings → Bindings → KV namespace**: name `RATE_LIMIT` → `becs-contact-rate-limit` (if not picked up automatically)
- [ ] Open the `*.pages.dev` address and click through the site
- [ ] Cloudflare → **Add a domain** → `thebeconsultingsolution.com` → Free plan → review imported DNS records:
  - keep every **MX** and **TXT** record (email)
  - keep the **`app`** record (BE University on Netlify) and set it to **DNS only (grey cloud)**
- [ ] GoDaddy → domain → **Nameservers → I'll use my own** → paste Cloudflare's two nameservers
- [ ] After the "site active" email: Pages project → **Custom domains** → add `thebeconsultingsolution.com` and `www.thebeconsultingsolution.com`
- [ ] Add Resend's DNS records in Cloudflare, then send a test message from `/contact`
- [ ] Check `https://app.thebeconsultingsolution.com` still loads
- [ ] Delete the old Netlify `besolutions` project

## 1. Upload the package and connect Netlify

- [ ] Put the updated `deploy/` folder into the `beconsultingsolutions-cloud/becs-os` repo on GitHub
- [x] New Netlify project created: **`becs-os`** → https://becs-os.netlify.app (site ID `de37c79e-7734-4219-80a6-04cb5504007c`)
- [ ] Link it to GitHub: Netlify → becs-os → **Project configuration → Build & deploy → Link repository → GitHub → becs-os**
      (build settings come from the repo's `netlify.toml`: `npm ci && npm run build:client`, publish `dist/public`)
- [ ] Confirm the first deploy is green, then delete the old project

Netlify address: `https://becs-os.netlify.app`

> The becs-os repo on GitHub today is the **static app only**. It has no `/api/...` functions, so
> `/api/webhooks/square` won't answer until the updated `deploy/` package (with its functions) is in the repo.

## 2. Database password for `console_api`

Status on 2026-09-24 (checked twice): the `console_api` role exists in Supabase but **cannot log in yet** (`rolcanlogin = false`).
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

- [ ] Square Developer Dashboard → Webhooks: point the webhook at `https://becs-os.netlify.app/api/webhooks/square`
- [ ] Put the Square webhook signature key into Netlify if README step 4 lists it
- [ ] Resend: _this step was cut off in the original instructions. Fill it in from the deploy README
      (usually: verify your sending domain and add its DNS records)._

## 6. Final check

- [ ] The site loads at the Netlify address
- [ ] You can log in with your existing account, and a new person **cannot** sign up
- [ ] A test Square payment shows up in the app
- [ ] A test email arrives via Resend
