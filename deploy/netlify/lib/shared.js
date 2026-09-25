// Shared helpers for Netlify Functions.
import { getStore } from '@netlify/blobs';
export const env = k => (globalThis.Netlify?.env?.get(k) ?? process.env[k]);
export const json = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
export const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\r\n?/g, '\n').trim().slice(0, max);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

export function guard(request) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method_not_allowed' });
  const allowed = (env('ALLOWED_ORIGINS') || 'https://thebeconsultingsolution.com,https://www.thebeconsultingsolution.com').split(',').map(s => s.trim());
  if (!allowed.includes(request.headers.get('Origin') || '')) return json(403, { ok: false, error: 'forbidden' });
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json(415, { ok: false, error: 'unsupported' });
  return null;
}

export async function rateLimit(bucket, ip, max) {
  try {
    const store = getStore('rate-limit');
    const key = `${bucket}:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
    const n = parseInt(await store.get(key) || '0', 10);
    if (n >= max) return false;
    await store.set(key, String(n + 1));
  } catch (_) {}
  return true;
}

export const agreementStore = () => getStore('agreements');

export async function sendEmail({ to, subject, text, html, replyTo }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env('FROM_EMAIL'), to: [to], subject: subject.slice(0, 150), text, html, ...(replyTo ? { reply_to: replyTo } : {}) })
  });
  // On failure, log Resend's reason (e.g. unverified domain, restricted key). It never contains the key.
  if (!r.ok) console.error('resend rejected', r.status, (await r.text().catch(() => '')).slice(0, 500));
  return r.ok;
}

// Branded email shell. rows = [[label, value]], steps = [string]
export function emailHtml({ kicker, title, intro, rows = [], steps = [], stepsTitle = 'What happens next', footer }) {
  const r = rows.filter(([, v]) => v).map(([k, v]) =>
    `<tr><td style="padding:8px 0;border-bottom:1px solid #E4E6EF;font:600 12px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#5B5F7A;width:34%;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #E4E6EF;font:15px/1.5 Arial,sans-serif;color:#2D2A5F;white-space:pre-wrap">${esc(v)}</td></tr>`).join('');
  const s = steps.map((t, i) =>
    `<tr><td style="width:32px;vertical-align:top;font:700 20px/1.2 Arial,sans-serif;color:#2B287E">${i + 1}</td><td style="padding-bottom:10px;font:15px/1.5 Arial,sans-serif;color:#2D2A5F">${esc(t)}</td></tr>`).join('');
  return `<!doctype html><html><body style="margin:0;background:#F4F7E9;padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #E4E6EF">
<tr><td style="background:#2B287E;padding:28px 28px 22px;border-right:14px solid #8DC63F">
<div style="font:600 11px/1 Arial,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8DC63F">${esc(kicker)}</div>
<div style="margin-top:10px;font:700 26px/1.15 Arial,sans-serif;color:#fff">${esc(title)}</div>
<div style="margin-top:14px;width:48px;height:3px;background:#8DC63F"></div></td></tr>
<tr><td style="padding:24px 28px">
${intro ? `<p style="margin:0 0 18px;font:15px/1.6 Arial,sans-serif;color:#2D2A5F">${esc(intro)}</p>` : ''}
${r ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${r}</table>` : ''}
${s ? `<div style="margin:24px 0 10px;font:600 12px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#2B287E">${esc(stepsTitle)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${s}</table>` : ''}
</td></tr>
<tr><td style="padding:18px 28px;background:#2D2A5F;font:12px/1.6 Arial,sans-serif;color:#C9C7EE">${footer || 'The B.E. Consulting Solutions · 312.535.3466 · beconsultingsolutions@gmail.com<br><span style="letter-spacing:.2em;text-transform:uppercase"><span style="color:#9B98D8">Plan</span> · <span style="color:#8DC63F">Evolve</span> · <span style="color:#fff">Succeed</span></span>'}</td></tr>
</table></body></html>`;
}

// Next steps by inquiry type — keep in sync with nextSteps() in the site.
export const NEXT = {
  'Free discovery call': {
    kind: 'Consult', owner: ['Reply within 1 business day with 2–3 call times.', 'Log the lead in the pipeline as Discovery.', 'After the call, send the right tier or the Reality Check link.'],
    client: ['Brandon replies personally within one business day with times for a free 30-minute call.', 'On the call we talk through where you are, where you want to go, and which starting point fits.', 'You leave with a clear next step, whether or not we work together.'] },
  'P.E.S. Reality Check': {
    kind: 'Booking', owner: ['Send the scheduling link and the Compliance Snapshot link (thebeconsultingsolution.com/compliance-snapshot).', 'Invoice $497 before the session.', 'Verify the Compliance Snapshot documents; confirm Green / Yellow / Red.', 'Deliver written findings, compliance status and the 90-day priority plan.'],
    client: ['Within one business day you receive a scheduling link for your 90-minute session.', 'Before the session: a link to your Compliance Snapshot (ten quick questions, no documents needed yet) at https://thebeconsultingsolution.com/compliance-snapshot, and the $497 invoice.', 'After the session: written findings, your compliance status, and your 90-day priority plan.'] },
  'Foundation Builder': {
    kind: 'Consult', owner: ['Book a discovery call.', 'Confirm Green or Yellow compliance status before build.', 'Send the P.I.P. with scope and the $2,497 investment.', 'Send the agreement link (/agreement); invoice the deposit once it is signed.'],
    client: ['Brandon replies within one business day to book a discovery call.', 'After the call you receive your Partnership Investment Packet (P.I.P.) with scope and investment.', 'You sign the client agreement online, the deposit is invoiced, and the 4–6 week sprint is scheduled.'] },
  'P.E.S. Business Launch': {
    kind: 'Consult', owner: ['Book a discovery call.', 'Confirm Green or Yellow compliance status before build.', 'Send the P.I.P. with scope and the $5,495 investment.', 'Send the agreement link (/agreement); invoice the deposit once it is signed.'],
    client: ['Brandon replies within one business day to book a discovery call.', 'After the call you receive your Partnership Investment Packet (P.I.P.) with scope and investment.', 'You sign the client agreement online, the deposit is invoiced, and the 90-day engagement is scheduled.'] },
  'Career Command Center': {
    kind: 'Confirmation', owner: ['Send the career intake and tier confirmation ($297 / $1,497 / $2,500, or white-label).', 'Invoice once the tier is confirmed.', 'Build the modules and issue the portal login.'],
    client: ['Within one business day you receive a short career intake and a link to confirm your tier.', 'Once confirmed, we build your Command Center modules.', 'You get your portal login and a walkthrough of how to run it each week.'] },
  'À la carte add-ons': {
    kind: 'Consult', owner: ['Review the add-ons they picked.', 'Book a short scoping call to confirm deliverables and price.', 'Send the scope and agreement link to sign.'],
    client: ['Brandon reviews the add-ons on your list and replies within one business day.', 'A short scoping call confirms deliverables, timing and final price.', 'You approve the scope, sign online, and work begins.'] },
  'Compliance Snapshot': {
    kind: 'Snapshot', owner: ['Review answers before the Reality Check.', 'Request copies of the documents they said exist.', 'Confirm Green / Yellow / Red in the session.'],
    client: ['Brandon reviews your answers before your Reality Check.', 'If anything needs a document, he\'ll ask for it by email. No action needed now.', 'You get your Green, Yellow or Red status, and a clear path to Green, in the session.'] },
  'Something else': {
    kind: 'Inquiry', owner: ['Read and reply within 1 business day.', 'Suggest a call if it fits.'],
    client: ['Brandon reads your message and replies personally within one business day.', 'If it makes sense, he suggests a time to talk.', 'No pressure and no obligation.'] }
};
