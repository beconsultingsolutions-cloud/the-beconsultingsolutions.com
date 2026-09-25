// Netlify Function — POST /api/contact (port of functions/api/contact.js, which is the Cloudflare version)
// Env vars (Netlify → Project configuration → Environment variables):
//   RESEND_API_KEY     required  API key from resend.com
//   TO_EMAIL           required  where inquiries go (e.g. beconsultingsolutions@gmail.com)
//   FROM_EMAIL         required  verified sender, e.g. "BECS Website <hello@thebeconsultingsolution.com>"
//   TURNSTILE_SECRET   optional  Cloudflare Turnstile secret (enables bot check)
//   ALLOWED_ORIGINS    optional  comma list; defaults to the production domains
//   CRM_WEBHOOK_URL    optional  also POST the lead as JSON (Zapier, Make, Google Apps Script, HubSpot…)
// Rate limit: 5 submissions / hour / IP, kept in the Netlify Blobs store "contact-rate-limit".
import { getStore } from '@netlify/blobs';

const MAX_BODY = 10_000;
const LIMITS = { interest: 60, name: 100, email: 160, phone: 30, business: 120, meeting: 20, preferred_contact: 20, add_ons: 1200, message: 4000 };
const INTERESTS = ['Free discovery call', 'P.E.S. Reality Check', 'Foundation Builder', 'P.E.S. Business Launch', 'Career Command Center', 'À la carte add-ons', 'Something else'];

const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\r\n?/g, '\n').trim().slice(0, max);

export default async (request, context) => {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' });
  const env = (k) => Netlify.env.get(k);

  const allowed = (env('ALLOWED_ORIGINS') || 'https://thebeconsultingsolution.com,https://www.thebeconsultingsolution.com').split(',').map(s => s.trim());
  const origin = request.headers.get('Origin') || '';
  if (!allowed.includes(origin)) return json(403, { ok: false, error: 'forbidden' });
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json(415, { ok: false, error: 'unsupported' });

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'too_large' });
  let body; try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'bad_json' }); }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (body.website) return json(200, { ok: true });

  const ip = context.ip || 'unknown';

  // Rate limit. If Blobs is unavailable the form still works, just without the limit.
  try {
    const store = getStore('contact-rate-limit');
    const key = `rl:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
    const n = parseInt(await store.get(key) || '0', 10);
    if (n >= 5) return json(429, { ok: false, error: 'rate_limited' });
    await store.set(key, String(n + 1));
  } catch (e) { console.warn('rate limit skipped:', e.message); }

  if (env('TURNSTILE_SECRET')) {
    const form = new FormData();
    form.append('secret', env('TURNSTILE_SECRET'));
    form.append('response', String(body.turnstile_token || ''));
    form.append('remoteip', ip);
    const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form }).then(r => r.json()).catch(() => ({}));
    if (!v.success) return json(400, { ok: false, error: 'captcha' });
  }

  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = clean(body[k], max);
  if (!INTERESTS.includes(d.interest)) d.interest = 'Something else';
  if (!d.name) return json(422, { ok: false, error: 'name' });
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(d.email)) return json(422, { ok: false, error: 'email' });
  if (!d.message) return json(422, { ok: false, error: 'message' });
  if (d.phone && !/^[0-9+().\-\s]{7,30}$/.test(d.phone)) d.phone = '';
  if (/(https?:\/\/|www\.)/i.test(d.name + d.business)) return json(200, { ok: true }); // link spam

  const text = [
    `New website inquiry — ${d.interest}`, '',
    `Name: ${d.name}`, `Email: ${d.email}`, d.phone ? `Phone: ${d.phone}` : null, d.business ? `Business: ${d.business}` : null,
    `Meeting preference: ${d.meeting || 'Either'}`, `Best way to reach: ${d.preferred_contact || 'Email'}`,
    d.add_ons ? `Add-ons: ${d.add_ons}` : null, '', 'Message:', d.message, '',
    `Submitted ${new Date().toISOString()} · IP ${ip}`
  ].filter(x => x != null).join('\n');

  if (!env('RESEND_API_KEY') || !env('TO_EMAIL') || !env('FROM_EMAIL')) return json(500, { ok: false, error: 'not_configured' });
  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env('FROM_EMAIL'), to: [env('TO_EMAIL')], reply_to: d.email, subject: `Website inquiry · ${d.interest} · ${d.name}`.slice(0, 150), text })
  });
  if (!sent.ok) return json(502, { ok: false, error: 'send_failed' });

  if (env('CRM_WEBHOOK_URL')) {
    await fetch(env('CRM_WEBHOOK_URL'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...d, source: 'website', submitted_at: new Date().toISOString() }) }).catch(() => {});
  }
  return json(200, { ok: true });
};

export const config = { path: '/api/contact' };
