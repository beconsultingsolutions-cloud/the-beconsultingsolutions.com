# The B.E. Consulting Solutions: website deploy

This folder is the production site. It's built for **Cloudflare Pages**, which is free, includes HTTPS, and runs the contact form backend.

## 1. Publish
1. Create a free Cloudflare account. Go to Workers & Pages → Create → Pages → **Upload assets**, and upload this `deploy/` folder. You get a `yourproject.pages.dev` address.
2. Connect the GoDaddy domain using Option A or Option B below.

### Option A (recommended): move DNS to Cloudflare
This is the only way the bare domain (no `www`) works on Pages. The domain stays registered at GoDaddy.
1. In Cloudflare → **Add a site** → `thebeconsultingsolution.com` → Free plan. Cloudflare imports your existing GoDaddy records.
2. Review the imported records. Keep any **MX, TXT and CNAME** records you use, such as email or Google verification.
3. Cloudflare shows 2 nameservers, like `xxx.ns.cloudflare.com`.
4. In GoDaddy → My Products → the domain → **DNS** → **Nameservers** → Change → **I'll use my own nameservers** → paste both → Save.
5. Wait for the Cloudflare "site active" email. It usually takes under an hour and can take up to 24.
6. Pages → project → **Custom domains** → add `thebeconsultingsolution.com`, then `www.thebeconsultingsolution.com`. The records and SSL certificate are created for you.
7. Turn off GoDaddy Website Builder or Forwarding on the domain, if either is on.

### Option B: keep DNS at GoDaddy
Only `www` can point at Pages this way.
1. Pages → Custom domains → add `www.thebeconsultingsolution.com`.
2. GoDaddy → DNS → delete any existing `www` record → **Add** CNAME, Name `www`, Value `yourproject.pages.dev`, TTL 1 hour.
3. GoDaddy → **Forwarding** → forward `thebeconsultingsolution.com` to `https://www.thebeconsultingsolution.com` (Permanent 301).
4. `www` then becomes the main address. Every `https://thebeconsultingsolution.com` in `index.html`, `sitemap.xml` and `robots.txt` must change to the `www` version. `_redirects` also has to change, because it currently sends `www` to the bare domain and the site would loop between the two. Ask and this will be updated.

### Email records for the contact form
Resend gives you 3–4 DNS records (TXT for SPF/DKIM, and sometimes an MX on a `send` subdomain). Add them wherever your DNS lives: Cloudflare for Option A, GoDaddy for Option B. Don't delete existing MX records.

### Check it's live
- The site loads over https with the padlock.
- `/services` and `/about` load directly.
- A test form submission reaches your inbox.

## 2. Connect the contact form (backend)
The form posts to `/api/contact` (`functions/api/contact.js`), which emails you each lead.
1. Sign up at resend.com, verify your domain, and create an API key.
2. In Pages → Settings → Environment variables, add:
   - `RESEND_API_KEY`: your Resend key
   - `TO_EMAIL`: `beconsultingsolutions@gmail.com`
   - `FROM_EMAIL`: `BECS Website <hello@thebeconsultingsolution.com>`
   - `CRM_WEBHOOK_URL` (optional): Zapier, Make or Google Sheets webhook, to log every lead
3. Optional: add rate limiting. Create a KV namespace, then bind it as `RATE_LIMIT` (Settings → Functions → KV bindings).

## 3. Turn on bot protection
1. In Cloudflare → Turnstile, add a site for your domain.
2. Put the **secret key** in the env var `TURNSTILE_SECRET`.
3. Put the **site key** into the page. In `index.html`, find the `data-props` JSON and set `"turnstileSiteKey"` → `"default"`. Or send the key and it'll be set for you.

## Security already in place
- HTTPS only, with HSTS preload.
- A content security policy and clickjacking protection (no framing).
- Checks on the form server:
  - Only requests from your own domain are accepted.
  - Message size is limited.
  - A hidden honeypot field catches bots.
  - Spam links are rejected.
  - Every field is validated and has a length limit.
  - Emails are sent as plain text only.
  - Replies go to the visitor's address.
- `/api` is excluded from search engines and never cached.

## SEO already in place
- Each page has its own address, for example `/services`, `/about` and `/case-studies/apparel-agency`.
- Each page has its own title, description, canonical link and social preview.
- Business details are marked up for search engines as a ProfessionalService, a Person and a WebSite: name, phone, service area, founder and offers.
- `sitemap.xml` includes images, and `robots.txt` points to it.
- Every photo is a real image with a descriptive file name and alt text, lazy-loaded.

After launch, submit `https://thebeconsultingsolution.com/sitemap.xml` in Google Search Console.

## Google Business Profile checklist
Keep the business name, phone and website **exactly** the same everywhere:
- **Name:** The B.E. Consulting Solutions
- **Phone:** (312) 535-3466
- **Website:** https://thebeconsultingsolution.com
- **Category:** Business management consultant. Secondary: Consultant, Marketing consultant.
- **Service-area business:** hide your street address. Service areas: Chicago IL, Milwaukee WI, Lake County IL, McHenry County IL, Cook County IL, Kenosha WI.
- **Services:** add P.E.S. Reality Check ($497), Foundation Builder ($2,497), P.E.S. Business Launch ($5,495).
- **Photos:** upload the headshot and logo. Name the files descriptively before uploading.
- **Link it to the site:** once the profile is live, send the profile URL. It gets added to `sameAs` in the site's business markup, which links the website and the profile in Google's eyes.
