# The B.E. Consulting Solutions: website deploy (Netlify)

This folder is the production site. The site files are in the folder itself, and the form backend lives in `netlify/functions`.

## 1. Publish
Pick one:
- **Deploy with Git (recommended).** Push this folder to a GitHub repo, then in Netlify go to Add new site → Import from Git. The build settings come from `netlify.toml`.
- **Netlify CLI.** Inside this folder, run `npx netlify-cli deploy --prod`.

Don't use drag-and-drop to deploy. It skips the functions, so the forms won't send.

## 2. Domain (GoDaddy)
1. In Netlify, go to Domain management → Add a domain → `thebeconsultingsolution.com`.
2. Point GoDaddy at Netlify. Pick one:
   - Switch the nameservers to Netlify DNS.
   - Or keep GoDaddy DNS and add two records:
     - `A @ 75.2.60.5`
     - `CNAME www <your-site>.netlify.app`
3. Once DNS is connected, go to HTTPS → Verify DNS → Provision certificate.

## 3. Environment variables
Add these under Site configuration → Environment variables:
- `RESEND_API_KEY`: your key from resend.com. Verify the domain in Resend and add its DNS records in GoDaddy or Netlify DNS.
- `TO_EMAIL`: `beconsultingsolutions@gmail.com`
- `FROM_EMAIL`: `BECS Website <hello@thebeconsultingsolution.com>`
- `ALLOWED_ORIGINS`: `https://thebeconsultingsolution.com,https://www.thebeconsultingsolution.com`
- `AGREEMENT_LIVE`: `false`. Set it to `true` only after legal review.
- `AGREEMENT_VERSION`: `draft-0.1`
- `CRM_WEBHOOK_URL` (optional): a Zapier, Make or Google Sheets webhook.

Redeploy after adding them.

## Security
- HTTPS is on, with HSTS preload, a strict content security policy, and no framing by other sites.
- The form backend:
  - accepts requests only from your domain
  - limits message size
  - uses a hidden honeypot field to catch bots
  - rejects spam links
  - validates every field and limits its length
  - allows 5 submissions per hour per visitor, tracked in Netlify Blobs
  - sends emails as plain text or escaped HTML
- `/api` is excluded from search engines and never cached.
- `/compliance-snapshot` is also excluded from search engines. It's only sent to clients after they book.

## Form emails
- **Contact form:** each submission sends two emails.
  - To you: a branded alert with every field, tagged Consult, Booking, Confirmation, Snapshot or Inquiry, with your next steps.
  - To the visitor: a confirmation with their next steps.
- **Compliance Snapshot:** you receive the 10 answers and a starting Green, Yellow or Red status.
- **Agreement:** each signature emails a signed copy to the client and an alert to you, with:
  - a reference number
  - the IP address and timestamp
  - a fingerprint of the document version

  Each signature record is stored in Netlify Blobs (store: `agreements`).

## Publishing the real agreement
1. Send the final, legally reviewed text. It replaces the placeholders in `BECS Website v2.dc.html` → `AG`.
2. Bump `AGREEMENT_VERSION`.
3. Turn signing on in two places, or it won't work:
   - in Netlify: set `AGREEMENT_LIVE=true`
   - on the site: set the `agreementLive` prop to `true`
4. Redeploy.

## SEO
- Each page has its own address, title, description, canonical link and social preview.
- Business details are marked up for search engines: ProfessionalService, Person and WebSite.
- `sitemap.xml` includes images, and `robots.txt` points to it.
- Photos have descriptive file names and alt text.

After launch, submit `https://thebeconsultingsolution.com/sitemap.xml` in Google Search Console.

## Google Business Profile checklist
Keep the business name, phone and website **exactly** the same everywhere:
- **Name:** The B.E. Consulting Solutions
- **Phone:** (312) 535-3466
- **Website:** https://thebeconsultingsolution.com
- **Category:** Business management consultant. Secondary: Consultant, Marketing consultant.
- **Service-area business:** hide your street address. Service areas: Chicago IL, Milwaukee WI, Lake County IL, McHenry County IL, Cook County IL, Kenosha WI.
- **Link it to the site:** once the profile is live, send the profile URL. It gets added to `sameAs` in the site's business markup.
