// POST /api/sign (→ /.netlify/functions/sign) — e-signature for Terms, Privacy Notice and Client Services Agreement.
// Disabled until env AGREEMENT_LIVE = "true" (set only after the final documents are legally reviewed).
// Records an audit trail in Netlify Blobs (store: agreements) and emails a signed copy to the signer and to TO_EMAIL.
import { json, clean, EMAIL_RE, guard, rateLimit, sendEmail, emailHtml, env, agreementStore } from '../lib/shared.js';

const sha256 = async s => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map(b => b.toString(16).padStart(2, '0')).join('');

export default async (request, context) => {
  const bad = guard(request); if (bad) return bad;
  if (env('AGREEMENT_LIVE') !== 'true') return json(403, { ok: false, error: 'not_live' });
  const raw = await request.text();
  if (raw.length > 6000) return json(413, { ok: false, error: 'too_large' });
  let b; try { b = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'bad_json' }); }

  const ip = context.ip || request.headers.get('x-nf-client-connection-ip') || 'unknown';
  if (!(await rateLimit('sign', ip, 5))) return json(429, { ok: false, error: 'rate_limited' });

  const d = { name: clean(b.name, 120), email: clean(b.email, 160), business: clean(b.business, 140), engagement: clean(b.engagement, 60), typed: clean(b.typed, 120), documents: clean(b.documents, 600) };
  if (!d.name || !EMAIL_RE.test(d.email)) return json(422, { ok: false, error: 'identity' });
  if (d.typed.toLowerCase() !== d.name.toLowerCase()) return json(422, { ok: false, error: 'signature_mismatch' });
  if (!Array.isArray(b.consents) || b.consents.length !== 3 || !b.consents.every(x => x === true)) return json(422, { ok: false, error: 'consent' });

  const signedAt = new Date().toISOString();
  const ref = 'BECS-' + signedAt.slice(0, 10).replace(/-/g, '') + '-' + crypto.randomUUID().slice(0, 8).toUpperCase();
  const docHash = await sha256(d.documents + '|' + (env('AGREEMENT_VERSION') || 'draft'));
  const record = { ref, ...d, consents: b.consents, signed_at: signedAt, ip, user_agent: (request.headers.get('User-Agent') || '').slice(0, 300), country: context.geo?.country?.code || '', document_hash: docHash, agreement_version: env('AGREEMENT_VERSION') || 'draft' };
  record.record_hash = await sha256(JSON.stringify(record));

  await agreementStore().setJSON(ref, record);
  if (!env('RESEND_API_KEY') || !env('TO_EMAIL') || !env('FROM_EMAIL')) return json(500, { ok: false, error: 'not_configured' });

  const when = new Date(signedAt).toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'long', timeStyle: 'short' }) + ' CT';
  const rows = [['Reference', ref], ['Signed by', d.name], ['Email', d.email], ['Business', d.business], ['Engagement', d.engagement], ['Signature', d.typed], ['Documents', d.documents], ['Signed at', when], ['IP address', ip], ['Document fingerprint', docHash]];

  await sendEmail({ to: d.email, replyTo: env('TO_EMAIL'), subject: `Your signed agreement · ${ref}`,
    html: emailHtml({ kicker: 'Signed copy', title: 'Your agreement is signed.', intro: 'Keep this email for your records. It is your confirmation of what you signed and when.', rows,
      steps: ['Brandon sends your onboarding details and first invoice within one business day.', 'Once the deposit is paid, your engagement hub is set up and your first session is scheduled.'] }),
    text: ['Your agreement is signed.', '', ...rows.filter(r => r[1]).map(([k, v]) => `${k}: ${v}`)].join('\n') });

  await sendEmail({ to: env('TO_EMAIL'), replyTo: d.email, subject: `[Signed] ${d.engagement} · ${d.name} · ${ref}`,
    html: emailHtml({ kicker: 'Agreement signed', title: `${d.name} signed`, rows, stepsTitle: 'Your next steps', steps: ['Send onboarding details and the first invoice.', 'Set up their engagement hub.', 'Schedule the kickoff session.'] }),
    text: ['Agreement signed', '', ...rows.filter(r => r[1]).map(([k, v]) => `${k}: ${v}`)].join('\n') });

  return json(200, { ok: true, ref });
};
