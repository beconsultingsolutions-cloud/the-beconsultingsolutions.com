// POST /api/contact (→ /.netlify/functions/contact) — site contact form.
// Sends (1) an alert to TO_EMAIL with full details + owner next steps, (2) a confirmation to the visitor with their next steps.
import { json, clean, EMAIL_RE, guard, rateLimit, sendEmail, emailHtml, NEXT, env } from '../lib/shared.js';

const MAX_BODY = 16_000;
const CLIM = { legal: 200, state: 60, entity: 30, ein: 20, bank: 20, sell: 600, license: 800, insurance: 300, pages: 20, products: 20, tax: 20, tm: 20 };
const LIMITS = { interest: 60, name: 100, email: 160, phone: 30, business: 120, meeting: 20, preferred_contact: 20, add_ons: 1200, message: 4000 };

export default async (request, context) => {
  const bad = guard(request); if (bad) return bad;
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'too_large' });
  let body; try { body = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'bad_json' }); }
  if (body.website) return json(200, { ok: true }); // honeypot

  const ip = context.ip || request.headers.get('x-nf-client-connection-ip') || 'unknown';
  if (!(await rateLimit('contact', ip, 5))) return json(429, { ok: false, error: 'rate_limited' });

  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = clean(body[k], max);
  if (!NEXT[d.interest]) d.interest = 'Something else';
  if (!d.name) return json(422, { ok: false, error: 'name' });
  if (!EMAIL_RE.test(d.email)) return json(422, { ok: false, error: 'email' });
  if (!d.message && d.interest !== 'Compliance Snapshot') return json(422, { ok: false, error: 'message' });
  if (body.consent !== true) return json(422, { ok: false, error: 'consent' });
  if (d.phone && !/^[0-9+().\-\s]{7,30}$/.test(d.phone)) d.phone = '';
  if (/(https?:\/\/|www\.)/i.test(d.name + d.business)) return json(200, { ok: true });
  let comp = null;
  if (body.compliance && typeof body.compliance === 'object') {
    comp = {}; for (const [k, max] of Object.entries(CLIM)) comp[k] = clean(body.compliance[k], max);
    const formed = comp.entity && comp.entity !== 'Not yet formed';
    comp.status = !formed ? 'Red' : (comp.ein === 'Yes' && comp.bank === 'Yes' && comp.pages === 'Yes' && comp.tm === 'Yes' && comp.license && comp.insurance && !/none yet/i.test(comp.insurance) && ['Yes', 'Not required'].includes(comp.tax)) ? 'Green' : comp.ein === 'Yes' ? 'Yellow' : 'Red';
  }
  if (!env('RESEND_API_KEY') || !env('TO_EMAIL') || !env('FROM_EMAIL')) return json(500, { ok: false, error: 'not_configured' });

  const n = NEXT[d.interest], when = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' });
  const rows = [['Interested in', d.interest], ['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Business', d.business],
    ['Meeting', d.meeting || 'Either'], ['Best way to reach', d.preferred_contact || 'Email'], ['Add-ons', d.add_ons], ['Message', d.message], ['Received', `${when} CT`]];
  if (comp) rows.push(['Compliance Snapshot', `Preliminary status: ${comp.status} (self-reported, unverified)`],
    ['1 · Legal name / state', comp.legal], ['2 · Entity type', comp.entity], ['3 · EIN in business name', comp.ein], ['4 · Separate bank account', comp.bank],
    ['5 · What / where you sell', comp.sell], ['6 · Licenses & expirations', comp.license], ['7 · Insurance', comp.insurance], ['8 · Terms / privacy / refund pages', comp.pages],
    ['9 · Products · sales tax', [comp.products, comp.tax].filter(Boolean).join(' · ')], ['10 · Trademark search', comp.tm]);

  const ownerOk = await sendEmail({
    to: env('TO_EMAIL'), replyTo: d.email,
    subject: `[${n.kind}]${comp ? ' [' + comp.status + ']' : ''} ${d.interest} · ${d.name}${d.business ? ' · ' + d.business : ''}`,
    html: emailHtml({ kicker: `New ${n.kind.toLowerCase()} · website`, title: `${d.name} — ${d.interest}`, intro: 'Reply to this email to respond directly.', rows, steps: n.owner, stepsTitle: 'Your next steps' }),
    text: [`New ${n.kind} — ${d.interest}`, '', ...rows.filter(r => r[1]).map(([k, v]) => `${k}: ${v}`), '', 'Your next steps:', ...n.owner.map((s, i) => `${i + 1}. ${s}`)].join('\n')
  });
  if (!ownerOk) return json(502, { ok: false, error: 'send_failed' });

  await sendEmail({
    to: d.email, replyTo: env('TO_EMAIL'),
    subject: `We got your message · ${d.interest}`,
    html: emailHtml({ kicker: 'The B.E. Consulting Solutions', title: `Thanks, ${d.name.split(' ')[0]}.`, intro: `We received your request about ${d.interest}. Here's what happens next. If anything changes, just reply to this email.`, steps: n.client,
      rows: [['Your request', d.interest], ['Meeting preference', d.meeting || 'Either'], ['We\'ll reach you by', d.preferred_contact || 'Email']] }),
    text: [`Thanks, ${d.name}.`, '', `We received your request about ${d.interest}.`, '', 'What happens next:', ...n.client.map((s, i) => `${i + 1}. ${s}`), '', 'The B.E. Consulting Solutions · 312.535.3466'].join('\n')
  }).catch(() => {});

  if (env('CRM_WEBHOOK_URL')) {
    await fetch(env('CRM_WEBHOOK_URL'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...d, compliance: comp, kind: n.kind, source: 'website', submitted_at: new Date().toISOString() }) }).catch(() => {});
  }
  return json(200, { ok: true });
};
