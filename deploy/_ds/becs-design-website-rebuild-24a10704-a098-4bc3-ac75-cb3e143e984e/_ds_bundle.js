/* @ds-bundle: {"format":4,"namespace":"BECSDesignSystem_24a107","components":[{"name":"BrandMark","sourcePath":"components/brand/BrandMark.jsx"},{"name":"Eyebrow","sourcePath":"components/brand/Eyebrow.jsx"},{"name":"LimeRule","sourcePath":"components/brand/LimeRule.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"DeepPanel","sourcePath":"components/core/DeepPanel.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"DocumentCard","sourcePath":"components/engagement/DocumentCard.jsx"},{"name":"MilestoneTimeline","sourcePath":"components/engagement/MilestoneTimeline.jsx"},{"name":"TaskCard","sourcePath":"components/engagement/TaskCard.jsx"},{"name":"SectionShell","sourcePath":"components/layout/SectionShell.jsx"},{"name":"StatTile","sourcePath":"components/layout/StatTile.jsx"},{"name":"ApprovalPill","sourcePath":"components/status/ApprovalPill.jsx"},{"name":"Pill","sourcePath":"components/status/Pill.jsx"},{"name":"StatusPill","sourcePath":"components/status/StatusPill.jsx"}],"sourceHashes":{"components/brand/BrandMark.jsx":"7f35155a5f39","components/brand/Eyebrow.jsx":"22de14fe098b","components/brand/LimeRule.jsx":"eb580ba658b8","components/core/Button.jsx":"e77f632c3662","components/core/Card.jsx":"4c6f2cb73431","components/core/DeepPanel.jsx":"33f9e1f2bdbd","components/core/Input.jsx":"0e995a7caaaf","components/engagement/DocumentCard.jsx":"64a92d52fdba","components/engagement/MilestoneTimeline.jsx":"4aad5a3ec8aa","components/engagement/TaskCard.jsx":"6020f5380595","components/layout/SectionShell.jsx":"196e094f7227","components/layout/StatTile.jsx":"8750167f28b4","components/status/ApprovalPill.jsx":"7fbfc836b272","components/status/Pill.jsx":"ae2300b1f292","components/status/StatusPill.jsx":"a94faf7c76fd","site/assets/clarity.js":"97d09648b47e","site/assets/config.js":"6c19121c062f","site/assets/site.js":"0cb1dab41f15","ui_kits/client-hub/Screens.jsx":"c640b2e0de4c","ui_kits/client-hub/Sidebar.jsx":"a3da0dddda6d","ui_kits/client-hub/data.js":"8d9ebf67c033"},"inlinedExternals":[],"unexposedExports":[{"name":"toneFor","sourcePath":"components/status/StatusPill.jsx"}]} */

(() => {

const __ds_ns = (window.BECSDesignSystem_24a107 = window.BECSDesignSystem_24a107 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandMark.jsx
try { (() => {
const DEFAULT_SRC = "assets/logos/becs-monogram.png";
/** B/E monogram on a white tile + wordmark + P.E.S. tagline. */
function BrandMark({
  compact,
  onLight,
  src,
  className
}) {
  const logo = src || typeof window !== "undefined" && window.BECS_MONOGRAM_SRC || DEFAULT_SRC;
  return /*#__PURE__*/React.createElement("div", {
    className: ["becs-mark", onLight && "becs-on-light", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("img", {
    className: "becs-mark-logo",
    src: logo,
    alt: compact ? "BE Consulting Solutions" : "",
    width: 44,
    height: 44
  }), compact ? null : /*#__PURE__*/React.createElement("span", {
    className: "becs-mark-words"
  }, /*#__PURE__*/React.createElement("span", {
    className: "becs-mark-name"
  }, "BE Consulting Solutions"), /*#__PURE__*/React.createElement("span", {
    className: "becs-mark-tag"
  }, "Plan \xB7 Evolve \xB7 Succeed")));
}
Object.assign(__ds_scope, { BrandMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Eyebrow.jsx
try { (() => {
/** Uppercase mono kicker. */
function Eyebrow({
  tone = "indigo",
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    className: ["becs-eyebrow", tone !== "indigo" && "becs-eyebrow-" + tone, className].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/brand/LimeRule.jsx
try { (() => {
/** 48×3 lime bar under section titles. */
function LimeRule({
  className
} = {}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["becs-rule", className].filter(Boolean).join(" "),
    "aria-hidden": "true"
  });
}
Object.assign(__ds_scope, { LimeRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LimeRule.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Primary purple, cream secondary, outline, ghost, link, destructive. */
function Button({
  variant = "default",
  size = "default",
  className,
  href,
  type,
  ...rest
}) {
  const cls = ["becs-btn", "becs-btn-" + variant, size !== "default" && "becs-btn-" + size, className].filter(Boolean).join(" ");
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: cls
  }, rest));
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type || "button",
    className: cls
  }, rest));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** White card-soft panel; lift adds shadow-lift. */
function Card({
  lift,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["becs-card", lift && "becs-card-lift", className].filter(Boolean).join(" ")
  }, rest));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/DeepPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The deep-surface gradient panel (purple → navy → deep end) with white text. */
function DeepPanel({
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["becs-deep", className].filter(Boolean).join(" ")
  }, rest));
}
Object.assign(__ds_scope, { DeepPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DeepPanel.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional mono label. */
function Input({
  label,
  className,
  ...rest
}) {
  const el = /*#__PURE__*/React.createElement("input", _extends({
    className: ["becs-input", className].filter(Boolean).join(" ")
  }, rest));
  if (!label) return el;
  return /*#__PURE__*/React.createElement("label", {
    className: "becs-field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "becs-label"
  }, label), el);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionShell.jsx
try { (() => {
/** Section header: label, display title, lime rule, intro, body. */
function SectionShell({
  eyebrow,
  title,
  intro,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "becs"
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-label"
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "becs-h becs-section-title"
  }, title), /*#__PURE__*/React.createElement(__ds_scope.LimeRule, {
    className: "becs-rule-gap"
  }), intro ? /*#__PURE__*/React.createElement("p", {
    className: "becs-section-intro"
  }, intro) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "becs-section-body"
  }, children) : null);
}
Object.assign(__ds_scope, { SectionShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionShell.jsx", error: String((e && e.message) || e) }); }

// components/layout/StatTile.jsx
try { (() => {
/** One figure in the dashboard stat rail. */
function StatTile({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    className: "becs-stat"
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-label"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "becs-stat-value"
  }, value));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/status/Pill.jsx
try { (() => {
/** Base uppercase mono pill. */
function Pill({
  tone,
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: ["becs-pill", tone && "becs-tone-" + tone, className].filter(Boolean).join(" ")
  }, children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Pill.jsx", error: String((e && e.message) || e) }); }

// components/status/ApprovalPill.jsx
try { (() => {
const LABELS = {
  pending: "Awaiting approval",
  approved: "Approved",
  changes_requested: "Changes requested"
};
const TONES = {
  pending: "not_started",
  approved: "complete",
  changes_requested: "overdue"
};
/** Milestone approval state. */
function ApprovalPill({
  state,
  className
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    tone: TONES[state] || "not_started",
    className: className
  }, LABELS[state] || state);
}
Object.assign(__ds_scope, { ApprovalPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/ApprovalPill.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusPill.jsx
try { (() => {
function toneFor(status) {
  const v = String(status || "").toLowerCase();
  if (["paid", "signed", "complete", "completed", "done", "delivered"].includes(v)) return "complete";
  if (["overdue", "past_due", "late"].includes(v)) return "overdue";
  if (["in_progress", "in progress", "sent", "current", "draft_review"].includes(v)) return "in_progress";
  return "not_started";
}
const LABELS = {
  not_started: "Not started",
  in_progress: "In progress",
  unpaid: "Unpaid",
  paid: "Paid",
  draft: "Draft",
  sent: "Sent",
  signed: "Signed",
  complete: "Complete",
  proposed: "Proposed",
  overdue: "Overdue"
};
/** Any hub status string → tone + label. */
function StatusPill({
  status,
  className
}) {
  const s = String(status || "");
  return /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    tone: toneFor(s),
    className: className
  }, LABELS[s.toLowerCase()] || s);
}
Object.assign(__ds_scope, { toneFor, StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/engagement/DocumentCard.jsx
try { (() => {
function Meta({
  items
}) {
  const rows = items.filter(it => it && it[1]);
  if (!rows.length) return null;
  return /*#__PURE__*/React.createElement("dl", {
    className: "becs-meta"
  }, rows.map(it => /*#__PURE__*/React.createElement("div", {
    key: it[0]
  }, /*#__PURE__*/React.createElement("dt", null, it[0] + " "), /*#__PURE__*/React.createElement("dd", null, it[1]))));
}
const TYPE_LABELS = {
  contract: "Agreement",
  sow: "Scope of work",
  addendum: "Addendum",
  nda: "NDA",
  schedule: "Schedule",
  agenda: "Agenda",
  invoice: "Invoice",
  letter: "Letter",
  guide: "Guide"
};
/** Document library card. */
function DocumentCard({
  document: d = {},
  signature: sig
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    className: "becs becs-doc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "becs-doc-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "becs-label"
  }, TYPE_LABELS[d.type] || d.type), /*#__PURE__*/React.createElement("h3", {
    className: "becs-h becs-doc-title"
  }, d.title)), /*#__PURE__*/React.createElement(__ds_scope.StatusPill, {
    status: d.status
  })), /*#__PURE__*/React.createElement(Meta, {
    items: [["Version", d.version], ["Signed", d.signed_date || "—"]]
  }), sig ? /*#__PURE__*/React.createElement("div", {
    className: "becs-signed"
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-label"
  }, "Executed electronically"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, sig.signer_name), sig.signer_title ? ", " + sig.signer_title : "", /*#__PURE__*/React.createElement("br", null), sig.signed_at)) : null, /*#__PURE__*/React.createElement("div", {
    className: "becs-doc-actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "outline"
  }, "Download"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "outline"
  }, "Preview"), sig ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm"
  }, "Download signed PDF") : d.signature_required ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm"
  }, "Sign here") : null));
}
Object.assign(__ds_scope, { DocumentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/engagement/DocumentCard.jsx", error: String((e && e.message) || e) }); }

// components/engagement/MilestoneTimeline.jsx
try { (() => {
function Meta({
  items
}) {
  const rows = items.filter(it => it && it[1]);
  if (!rows.length) return null;
  return /*#__PURE__*/React.createElement("dl", {
    className: "becs-meta"
  }, rows.map(it => /*#__PURE__*/React.createElement("div", {
    key: it[0]
  }, /*#__PURE__*/React.createElement("dt", null, it[0] + " "), /*#__PURE__*/React.createElement("dd", null, it[1]))));
}
const isDone = s => ["complete", "completed", "done"].includes(String(s).toLowerCase());
/** Vertical engagement timeline. */
function MilestoneTimeline({
  milestones = []
}) {
  if (!milestones.length) return /*#__PURE__*/React.createElement("p", {
    className: "becs-count"
  }, "Milestones appear here once the engagement is scheduled.");
  const done = milestones.filter(m => isDone(m.status)).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "becs"
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-count"
  }, done, " of ", milestones.length, " milestones complete"), /*#__PURE__*/React.createElement("ol", {
    className: "becs-tl"
  }, milestones.map((m, i) => {
    const complete = isDone(m.status);
    const current = ["in_progress", "current"].includes(String(m.status).toLowerCase());
    const last = i === milestones.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: m.id || i,
      className: "becs-tl-item"
    }, last ? null : /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "becs-tl-line" + (complete ? " is-done" : "")
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "becs-tl-dot" + (complete ? " is-done" : current ? " is-current" : "")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "becs-label"
    }, [m.code, m.phase, m.week_range].filter(Boolean).join(" · ")), /*#__PURE__*/React.createElement("div", {
      className: "becs-tl-head"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "becs-h becs-tl-title"
    }, m.title), /*#__PURE__*/React.createElement(__ds_scope.StatusPill, {
      status: m.status
    }), m.approval_state ? /*#__PURE__*/React.createElement(__ds_scope.ApprovalPill, {
      state: m.approval_state
    }) : null), m.detail ? /*#__PURE__*/React.createElement("p", {
      className: "becs-tl-detail"
    }, m.detail) : null, /*#__PURE__*/React.createElement(Meta, {
      items: [["Target", m.target], ["Started", m.started], ["Completed", m.completed], ["Approved", m.approved]]
    })));
  })));
}
Object.assign(__ds_scope, { MilestoneTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/engagement/MilestoneTimeline.jsx", error: String((e && e.message) || e) }); }

// components/engagement/TaskCard.jsx
try { (() => {
const PRIORITY_TONE = {
  urgent: "overdue",
  high: "in_progress",
  normal: "not_started",
  low: "low"
};
/** Task row from the TaskBoard. */
function TaskCard({
  task = {},
  open,
  onToggle
}) {
  const pr = task.priority || "normal";
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    className: "becs becs-task"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-task-title"
  }, task.title), task.detail ? /*#__PURE__*/React.createElement("p", {
    className: "becs-task-detail"
  }, task.detail) : null, /*#__PURE__*/React.createElement("p", {
    className: "becs-task-meta"
  }, task.assignee ? /*#__PURE__*/React.createElement("span", null, "Owner \xB7 ", task.assignee) : null, task.milestone ? /*#__PURE__*/React.createElement("span", null, task.milestone) : null, task.due_date ? /*#__PURE__*/React.createElement("span", null, "Due ", task.due_date) : null, task.confirmed ? /*#__PURE__*/React.createElement("span", null, "Confirmed") : null)), /*#__PURE__*/React.createElement("div", {
    className: "becs-task-side"
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    tone: PRIORITY_TONE[pr] || "not_started"
  }, pr), /*#__PURE__*/React.createElement(__ds_scope.StatusPill, {
    status: task.status
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: open ? "default" : "outline",
    onClick: onToggle
  }, open ? "Close" : "Open task box")));
}
Object.assign(__ds_scope, { TaskCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/engagement/TaskCard.jsx", error: String((e && e.message) || e) }); }

// site/assets/clarity.js
try { (() => {
// Clarity Finder — the P.E.S. Mode Finder engine (weights + score math unchanged from becs-hub/src/lib/pes.ts),
// re-routed to recommend a ladder entry point. Field names match becs-hub hub_leads for export without remap.
(function () {
  const QUESTIONS = [{
    key: "businessAge",
    col: "business_age",
    q: "How long have you been in business?",
    opts: [["0-2", "Under 2 years", "Just getting established", 1], ["2-5", "2 to 5 years", "Growing", 2], ["5+", "Over 5 years", "Established", 3]]
  }, {
    key: "revenueBand",
    col: "revenue_band",
    q: "Where is monthly revenue today?",
    opts: [["pre_10k", "Pre-revenue to $10K / month", "", 1], ["10k_50k", "$10K to $50K / month", "", 2], ["50k_plus", "$50K+ / month", "", 3]]
  }, {
    key: "existingSystems",
    col: "existing_systems",
    q: "What do your systems look like?",
    opts: [["none", "No real systems yet", "It lives in my head", 1], ["basic", "Basic systems, inconsistent", "Some tools, not connected", 2], ["established", "Established systems", "Ready to automate", 3]]
  }, {
    key: "urgency",
    col: "urgency",
    q: "How soon do you want to start?",
    opts: [["low", "Exploring", "No fixed timeline", 1], ["medium", "Within the next couple of months", "", 2], ["high", "Urgent", "I need to move now", 3]]
  }, {
    key: "budgetBand",
    col: "budget_band",
    q: "What investment range fits right now?",
    opts: [["explore", "Just exploring", "Under $500", 1], ["audit", "Ready for an audit", "$1,500–$5,000", 2], ["build", "Ready to build", "$4,500+", 3], ["partnership", "Ready for ongoing partnership", "$2,500+/month", 3]]
  }];
  const w = (key, v) => (QUESTIONS.find(q => q.key === key).opts.find(o => o[0] === v) || [,,, 1])[3];
  const TIER_BY_REVENUE = {
    pre_10k: "foundation",
    "10k_50k": "growth",
    "50k_plus": "scale"
  };
  function score(a) {
    const age = w("businessAge", a.businessAge),
      rev = w("revenueBand", a.revenueBand),
      sys = w("existingSystems", a.existingSystems),
      urg = w("urgency", a.urgency),
      bud = w("budgetBand", a.budgetBand);
    const maturity = (age + rev + sys) / 3;
    const mode = maturity >= 2.5 ? "succeed" : maturity >= 1.7 ? "evolve" : "plan";
    const total = age + rev + sys + urg + bud;
    let path = "nurture";
    if (total >= 9 && urg === 3) path = "premium";else if (total >= 7 && bud >= 2) path = "conversion";else if (total >= 5 && urg >= 2) path = "qualification";
    let step,
      tier = null;
    if (a.budgetBand === "explore" || maturity < 1.7 && (urg === 1 || bud === 1)) step = "clarity";else if (a.budgetBand === "partnership" && urg === 3 && a.existingSystems === "established") step = "succeed";else if ((a.budgetBand === "build" || a.budgetBand === "partnership") && a.existingSystems === "established" && maturity >= 1.7) step = "evolve";else {
      step = "plan";
      tier = TIER_BY_REVENUE[a.revenueBand] || "foundation";
    }
    return {
      mode,
      score: total,
      path,
      step,
      tier
    };
  }
  const WHY = {
    clarity: "You’re early, or not sure yet where things stand. That’s what this session is for. It’s the front door to everything else, and the fee comes back to you if you go on to the Audit.",
    plan: "You have traction, but the brand and the systems haven’t caught up. The Audit shows exactly where that’s costing you, and what to fix first.",
    evolve: "Your systems exist and you’re ready to invest. Next is rebuilding the brand and wiring the systems together so the business runs without you in the middle.",
    succeed: "You’re established and moving fast. You don’t need another project. You need an operator keeping the systems running and improving every month."
  };
  const el = document.getElementById("finder");
  if (!el) return;
  const ans = {},
    who = {
      name: "",
      email: "",
      company: "",
      goal: ""
    };
  let i = 0;
  const total = QUESTIONS.length + 1;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[c]);
  const bar = () => `<div class="progress" aria-hidden="true">${Array.from({
    length: total
  }, (_, k) => `<i class="${k < i ? "on" : k === i ? "cur" : ""}"></i>`).join("")}</div>`;
  function render() {
    if (i < QUESTIONS.length) {
      const Q = QUESTIONS[i];
      el.innerHTML = `${bar()}<fieldset class="stack g24"><div class="stack g12"><span class="qcount">Question ${i + 1} of ${QUESTIONS.length}</span><legend class="qtitle">${Q.q}</legend></div>
      <div class="choices">${Q.opts.map(o => `<label class="choice"><input type="radio" name="q" value="${o[0]}" ${ans[Q.key] === o[0] ? "checked" : ""}><span class="dot"></span><span class="t">${o[1]}${o[2] ? `<small>${o[2]}</small>` : ""}</span></label>`).join("")}</div>
      <div class="fnav"><button type="button" class="linkbtn" data-back ${i === 0 ? "hidden" : ""}>← Back</button><span class="qcount">Pick one to continue</span></div></fieldset>`;
      el.querySelectorAll("input[name=q]").forEach(r => r.addEventListener("change", () => {
        ans[Q.key] = r.value;
        setTimeout(() => {
          i++;
          render();
        }, 160);
      }));
    } else {
      el.innerHTML = `${bar()}<form class="stack g24" novalidate><div class="stack g12"><span class="qcount">Last step</span><h2 class="qtitle">Where should I send your result?</h2><p class="muted">Your answers go to Brandon, not a drip sequence.</p></div>
      <div class="two"><div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required value="${esc(who.name)}"></div>
      <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required value="${esc(who.email)}"></div></div>
      <div class="field"><label for="f-co">Business name <span class="opt">optional</span></label><input id="f-co" name="company" type="text" autocomplete="organization" value="${esc(who.company)}"></div>
      <div class="field"><label for="f-goal">The one thing you most need fixed <span class="opt">optional</span></label><textarea id="f-goal" name="goal" rows="3">${esc(who.goal)}</textarea></div>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="err" role="alert"></p>
      <div class="fnav"><button type="button" class="linkbtn" data-back>← Back</button><button type="submit" class="btn btn-primary">Show my starting point <span class="arrow">→</span></button></div></form>`;
      const f = el.querySelector("form");
      f.addEventListener("input", () => {
        who.name = f.name.value;
        who.email = f.email.value;
        who.company = f.company.value;
        who.goal = f.goal.value;
      });
      f.addEventListener("submit", submit);
    }
    const b = el.querySelector("[data-back]");
    if (b) b.addEventListener("click", () => {
      i--;
      render();
    });
  }
  async function submit(e) {
    e.preventDefault();
    const f = e.target,
      err = f.querySelector(".err");
    if (f.website.value) return;
    if (!who.name.trim() || !/^\S+@\S+\.\S+$/.test(who.email.trim())) {
      err.textContent = "Add your name and a valid email.";
      return;
    }
    const r = score(ans),
      btn = f.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Scoring…";
    const row = {
      contact_name: who.name.trim(),
      email: who.email.trim(),
      company: who.company.trim() || null,
      source: "website_clarity_finder",
      source_page: location.pathname,
      primary_goal: who.goal.trim() || null,
      pes_score: r.score,
      pes_mode: r.mode,
      routing_path: r.path,
      recommended_step: r.step,
      audit_tier: r.tier,
      business_size: r.tier
    };
    QUESTIONS.forEach(Q => row[Q.col] = ans[Q.key]);
    try {
      await BECS.submitLead(row, null);
    } catch (x) {
      err.textContent = "That didn’t send. Try again in a moment.";
      btn.disabled = false;
      btn.textContent = "Show my starting point →";
      return;
    }
    showResult(r);
  }
  function showResult(r) {
    const s = BECS.LADDER[r.step],
      t = r.tier ? BECS.TIERS[r.tier] : null;
    const price = t ? t.price : s.price,
      unit = t ? `${t.name} tier · 2 weeks` : s.unit;
    const qs = new URLSearchParams({
      step: r.step,
      from: "finder",
      name: who.name,
      email: who.email,
      company: who.company
    });
    if (r.tier) qs.set("tier", r.tier);
    el.innerHTML = `<div class="stack g32"><div class="result-head"><span class="eyebrow">Your starting point · Step ${s.n}</span><h2>${s.phase !== "Start here" ? s.phase + ": " : ""}${s.name}</h2>
      <div class="result-price"><span class="amt">${price}</span><span class="unit">${unit}</span></div></div>
      <p class="why">${WHY[r.step]}</p>
      ${t ? `<p class="muted">Tier matched to your revenue: <strong style="color:var(--brand-navy)">${t.name}</strong>, ${t.fits}.</p>` : ""}
      <div class="stack g12"><span class="legend">What’s included</span><ul class="incl">${s.includes.map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="row g16"><a class="btn btn-lime" href="contact.html?${qs}">Book the ${s.name} <span class="arrow">→</span></a><a class="btn btn-outline" href="services.html">See the full ladder</a></div>
      ${r.step !== "clarity" ? `<p class="muted" style="font-size:15px">Not sure yet? <a href="contact.html?step=clarity&from=finder&name=${encodeURIComponent(who.name)}&email=${encodeURIComponent(who.email)}">Start with a Clarity Session</a> for $297, credited toward the Audit.</p>` : ""}
      <p class="demo-note" data-demo-note ${BECS.live ? "hidden" : ""}>Demo mode: this result was saved in your browser only. Add Supabase keys in assets/config.js to go live.</p></div>`;
    window.scrollTo({
      top: el.getBoundingClientRect().top + scrollY - 120,
      behavior: "smooth"
    });
  }
  window.BECS_CLARITY = {
    score,
    QUESTIONS
  };
  render();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/assets/clarity.js", error: String((e && e.message) || e) }); }

// site/assets/config.js
try { (() => {
// Public Supabase settings. The anon key is safe to ship: RLS only allows INSERT on leads/bookings.
// Leave blank to run in demo mode (submissions are kept in this browser's localStorage).
window.BECS_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  HUB_LOGIN_URL: "" // e.g. the becs-hub client login URL; footer link is hidden while blank
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/assets/config.js", error: String((e && e.message) || e) }); }

// site/assets/site.js
try { (() => {
(function () {
  const cfg = window.BECS_CONFIG || {};
  const live = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const db = live ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false
    }
  }) : null;
  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  async function insert(table, row) {
    if (!live) {
      const k = "becs_demo_" + table;
      const all = JSON.parse(localStorage.getItem(k) || "[]");
      all.push({
        ...row,
        created_at: new Date().toISOString()
      });
      localStorage.setItem(k, JSON.stringify(all));
      console.info("[BECS demo] " + table, row);
      return;
    }
    const {
      error
    } = await db.from(table).insert(row);
    if (error) throw new Error(error.message);
  }

  // Lead + optional booking. Returns the lead id.
  async function submitLead(lead, booking) {
    const id = uuid();
    await insert("leads", {
      id,
      stage: "new",
      ...lead
    });
    if (booking) await insert("bookings", {
      lead_id: id,
      status: "requested",
      ...booking
    });
    return id;
  }
  const TIERS = {
    foundation: {
      name: "Foundation",
      price: "$1,500",
      fits: "Under $250K revenue, 1–5 people"
    },
    growth: {
      name: "Growth",
      price: "$2,500",
      fits: "$250K–$1M, 6–15 people or regulated"
    },
    scale: {
      name: "Scale",
      price: "$5,000",
      fits: "$1M+, 15+ people, multi-location or regulated"
    }
  };
  const LADDER = {
    clarity: {
      n: "01",
      phase: "Start here",
      name: "Clarity Session",
      price: "$297",
      unit: "45 minutes",
      includes: ["A focused 45-minute working session on your brand and operations", "Where things actually break, named plainly", "The next right step, and whether it’s with me", "$297 credited in full toward an Audit booked within 30 days"]
    },
    plan: {
      n: "02",
      phase: "Plan",
      name: "Brand Systems Audit",
      price: "$1,500–$5,000",
      unit: "2 weeks · by tier",
      includes: ["7-instrument audit of your brand and operations", "Findings with a dollar cost attached to each", "A prioritized roadmap: what to fix first, and why", "Founder rate: 30% off for the first 3 clients"]
    },
    evolve: {
      n: "03",
      phase: "Evolve",
      name: "Brand That Runs",
      price: "From $4,500",
      unit: "Project",
      includes: ["Identity refresh", "Booking, intake and client systems, built and connected", "Documented SOPs your team can follow", "Audit fee credited if signed within 30 days"]
    },
    succeed: {
      n: "04",
      phase: "Succeed",
      name: "Operator Partnership",
      price: "$2,500/mo",
      unit: "3-month minimum",
      includes: ["Ongoing maintenance of your systems", "One improvement project every month", "A monthly recap: what changed, what’s next"]
    }
  };
  window.BECS = {
    live,
    submitLead,
    LADDER,
    TIERS
  };
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".menu-btn"),
      nav = document.querySelector(".nav");
    if (btn && nav) btn.addEventListener("click", () => {
      const o = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", o);
      btn.textContent = o ? "Close" : "Menu";
    });
    const here = location.pathname.split("/").pop().replace(".html", "") || "index";
    document.querySelectorAll(".nav a[data-page]").forEach(a => {
      if (a.dataset.page === here) a.setAttribute("aria-current", "page");
    });
    document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());
    document.querySelectorAll("[data-hub-login]").forEach(a => {
      if (cfg.HUB_LOGIN_URL) a.href = cfg.HUB_LOGIN_URL;else a.closest("li").remove();
    });
    if (!live) document.querySelectorAll("[data-demo-note]").forEach(e => e.hidden = false);
    initContact();
  });
  function initContact() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const q = new URLSearchParams(location.search);
    const step = q.get("step"),
      tier = q.get("tier");
    if (step) {
      const r = form.querySelector(`input[name=want][value="${step}"]`);
      if (r) r.checked = true;
    }
    if (tier) {
      const r = form.querySelector(`input[name=size][value="${tier}"]`);
      if (r) r.checked = true;
    }
    if (q.get("name")) form.name.value = q.get("name");
    if (q.get("email")) form.email.value = q.get("email");
    if (q.get("company")) form.company.value = q.get("company");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const err = form.querySelector(".err");
      err.textContent = "";
      if (form.website.value) return; // honeypot
      const d = new FormData(form);
      const want = d.get("want"),
        size = d.get("size");
      if (!d.get("name") || !d.get("email")) {
        err.textContent = "Name and email are required.";
        return;
      }
      if (!want) {
        err.textContent = "Pick what you want to start with.";
        return;
      }
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Sending…";
      try {
        await submitLead({
          contact_name: d.get("name").trim(),
          email: d.get("email").trim(),
          company: (d.get("company") || "").trim() || null,
          phone: (d.get("phone") || "").trim() || null,
          business_size: size || null,
          source: q.get("from") === "finder" ? "website_clarity_finder" : "website_contact",
          source_page: location.pathname,
          notes: (d.get("message") || "").trim() || null,
          recommended_step: want === "general" ? null : want,
          audit_tier: want === "plan" && size && size !== "unsure" ? size : null
        }, want === "general" ? null : {
          service_step: want,
          audit_tier: want === "plan" && size && size !== "unsure" ? size : null
        });
        const ok = document.getElementById("contact-success");
        ok.querySelector("[data-what]").textContent = want === "general" ? "your note" : "your " + LADDER[want].name + " request";
        form.hidden = true;
        ok.hidden = false;
      } catch (x) {
        err.textContent = "That didn’t send. Try again in a moment, or email directly.";
        btn.disabled = false;
        btn.textContent = "Send request";
      }
    });
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/assets/site.js", error: String((e && e.message) || e) }); }

// ui_kits/client-hub/Screens.jsx
try { (() => {
const {
  SectionShell,
  StatTile,
  MilestoneTimeline,
  TaskCard,
  DocumentCard,
  Card,
  Button,
  Eyebrow,
  LimeRule,
  DeepPanel,
  Input
} = window.BECSDesignSystem_24a107;
const D = window.HUB_DATA;
function Overview({
  onNav
}) {
  const done = D.milestones.filter(m => m.status === "complete").length;
  const open = D.tasks.filter(t => t.status !== "complete").length;
  return /*#__PURE__*/React.createElement(SectionShell, {
    eyebrow: D.client,
    title: "Your operations build",
    intro: "Plans that get built, systems that get used, and results you can measure. Here's where the engagement stands today."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Milestones",
    value: done + " / " + D.milestones.length
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Open tasks",
    value: open
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Documents",
    value: D.documents.length
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Next review",
    value: "Oct 6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)",
      gap: "var(--space-6)",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "becs-h",
    style: {
      fontSize: "1.25rem"
    }
  }, "Current milestone"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    onClick: () => onNav("milestones")
  }, "View timeline")), /*#__PURE__*/React.createElement(MilestoneTimeline, {
    milestones: [D.milestones[1]]
  })), /*#__PURE__*/React.createElement(DeepPanel, {
    style: {
      padding: "var(--space-6)",
      borderRadius: "var(--radius-md)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "lime"
  }, "Needs you"), /*#__PURE__*/React.createElement("h3", {
    className: "becs-h",
    style: {
      color: "#fff",
      fontSize: "1.25rem"
    }
  }, D.tasks[0].title), /*#__PURE__*/React.createElement(LimeRule, null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "0.875rem",
      lineHeight: 1.625,
      color: "var(--sidebar-foreground)"
    }
  }, D.tasks[0].detail), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNav("tasks")
  }, "Open task box")))));
}
function Milestones() {
  return /*#__PURE__*/React.createElement(SectionShell, {
    eyebrow: "P.E.S. \xB7 Plan \xB7 Evolve \xB7 Succeed",
    title: "Milestones",
    intro: "Every engagement runs the same disciplined intake \u2014 so scope is clear and launch day actually arrives."
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(MilestoneTimeline, {
    milestones: D.milestones
  })));
}
function Tasks() {
  const [openIdx, setOpen] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const list = D.tasks.filter(t => filter === "all" || (filter === "open" ? t.status !== "complete" : t.status === "complete"));
  return /*#__PURE__*/React.createElement(SectionShell, {
    eyebrow: "Task board",
    title: "Tasks",
    intro: "What's on your plate, what's on ours."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginBottom: "var(--space-5)"
    }
  }, ["all", "open", "complete"].map(f => /*#__PURE__*/React.createElement(Button, {
    key: f,
    size: "sm",
    variant: filter === f ? "default" : "outline",
    onClick: () => setFilter(f)
  }, f[0].toUpperCase() + f.slice(1)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, list.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t.title
  }, /*#__PURE__*/React.createElement(TaskCard, {
    task: t,
    open: openIdx === t.title,
    onToggle: () => setOpen(openIdx === t.title ? null : t.title)
  }), openIdx === t.title ? /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: "var(--space-2)",
      padding: "var(--space-5)",
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Add a note",
    placeholder: "Anything we should know?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "Mark complete"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost",
    onClick: () => setOpen(null)
  }, "Cancel"))) : null))));
}
function Documents() {
  return /*#__PURE__*/React.createElement(SectionShell, {
    eyebrow: "Document library",
    title: "Documents",
    intro: "Agreements, scopes, invoices and guides \u2014 signed and stored in one place."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
      gap: "var(--space-4)"
    }
  }, D.documents.map(d => /*#__PURE__*/React.createElement(DocumentCard, {
    key: d.doc.title,
    document: d.doc,
    signature: d.sig
  }))));
}
Object.assign(window, {
  HubOverview: Overview,
  HubMilestones: Milestones,
  HubTasks: Tasks,
  HubDocuments: Documents
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client-hub/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client-hub/Sidebar.jsx
try { (() => {
const {
  BrandMark
} = window.BECSDesignSystem_24a107;
const HUB_NAV = [["overview", "Overview"], ["milestones", "Milestones"], ["tasks", "Tasks"], ["documents", "Documents"]];
function HubSidebar({
  page,
  onNav
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "15rem",
      flexShrink: 0,
      background: "var(--sidebar)",
      color: "var(--sidebar-foreground)",
      display: "flex",
      flexDirection: "column",
      padding: "var(--space-6) var(--space-4)",
      gap: "var(--space-8)",
      minHeight: "100vh",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement(BrandMark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "grid",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "becs-label",
    style: {
      color: "var(--brand-lavender)",
      padding: "0 var(--space-3)",
      marginBottom: "var(--space-2)"
    }
  }, "Engagement hub"), HUB_NAV.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onNav(id),
    style: {
      textAlign: "left",
      border: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-2) var(--space-3)",
      fontFamily: "var(--font-body)",
      fontSize: "0.875rem",
      fontWeight: 500,
      background: page === id ? "var(--sidebar-accent)" : "transparent",
      color: page === id ? "var(--sidebar-accent-foreground)" : "var(--sidebar-foreground)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: page === id ? "var(--sidebar-primary)" : "transparent"
    }
  }), label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      fontSize: "0.75rem",
      lineHeight: 1.5,
      color: "var(--brand-lavender)"
    }
  }, "Questions? Talk to Brandon directly."));
}
window.HubSidebar = HubSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client-hub/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client-hub/data.js
try { (() => {
window.HUB_DATA = {
  client: "Northshore Pet Care",
  milestones: [{
    id: "m1",
    code: "M1",
    phase: "Plan",
    week_range: "Wk 1–2",
    title: "Discovery & systems audit",
    status: "complete",
    approval_state: "approved",
    detail: "Reality Check completed; strengths and gaps named and ranked.",
    target: "Sep 8, 2026",
    completed: "Sep 7, 2026",
    approved: "Sep 8, 2026"
  }, {
    id: "m2",
    code: "M2",
    phase: "Evolve",
    week_range: "Wk 3–6",
    title: "Operations hub build",
    status: "in_progress",
    approval_state: "pending",
    detail: "Intake, scheduling and payment flows rebuilt in one hub.",
    target: "Oct 6, 2026",
    started: "Sep 9, 2026"
  }, {
    id: "m3",
    code: "M3",
    phase: "Succeed",
    week_range: "Wk 7–8",
    title: "Handoff & training",
    status: "not_started",
    approval_state: "pending",
    target: "Oct 20, 2026"
  }],
  tasks: [{
    title: "Share current intake form",
    detail: "Export the form you use today so we can map every field.",
    assignee: "Client",
    milestone: "M2",
    due_date: "Sep 26",
    priority: "urgent",
    status: "overdue"
  }, {
    title: "Approve scheduling rules",
    detail: "Confirm buffer times and service durations.",
    assignee: "Client",
    milestone: "M2",
    due_date: "Sep 30",
    priority: "high",
    status: "in_progress"
  }, {
    title: "Connect payment processor",
    assignee: "Brandon",
    milestone: "M2",
    due_date: "Oct 2",
    priority: "normal",
    status: "not_started"
  }, {
    title: "Review 90-day roadmap",
    assignee: "Client",
    milestone: "M1",
    due_date: "Sep 8",
    priority: "low",
    status: "complete",
    confirmed: true
  }],
  documents: [{
    doc: {
      type: "contract",
      title: "Master Services Agreement",
      status: "signed",
      version: "v2",
      signed_date: "Sep 2, 2026"
    },
    sig: {
      signer_name: "Jordan Lee",
      signer_title: "Owner",
      signed_at: "Sep 2, 2026 · 10:14 AM"
    }
  }, {
    doc: {
      type: "sow",
      title: "Scope of work — Business Build",
      status: "sent",
      version: "v1",
      signature_required: true
    }
  }, {
    doc: {
      type: "invoice",
      title: "Invoice #1042",
      status: "paid",
      version: "—"
    }
  }, {
    doc: {
      type: "guide",
      title: "Partnership Investment Packet",
      status: "draft",
      version: "v3"
    }
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client-hub/data.js", error: String((e && e.message) || e) }); }

__ds_ns.BrandMark = __ds_scope.BrandMark;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.LimeRule = __ds_scope.LimeRule;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DeepPanel = __ds_scope.DeepPanel;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.DocumentCard = __ds_scope.DocumentCard;

__ds_ns.MilestoneTimeline = __ds_scope.MilestoneTimeline;

__ds_ns.TaskCard = __ds_scope.TaskCard;

__ds_ns.SectionShell = __ds_scope.SectionShell;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.ApprovalPill = __ds_scope.ApprovalPill;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.StatusPill = __ds_scope.StatusPill;

})();
