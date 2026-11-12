import { db } from 'hatchable';

export const access = 'user';

export default async function (req, res) {
  const user = req.user;
  const { rows } = await db.query(
    "SELECT role, is_active FROM app_user_roles WHERE user_id = $1 AND lower(email) = lower($2) LIMIT 1",
    [String(user.id), user.email]
  );
  if (!rows.length || !rows[0].is_active || rows[0].role !== 'SUPER_ADMIN') {
    return res.status(403).send('<!doctype html><html><body style="font-family:Arial;padding:40px"><h1>Access denied</h1><p>Super Admin access is required.</p><a href="/">Return to Health Finder</a></body></html>');
  }

  return res.send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Edit Website — Health Finder</title>
<style>
:root{--navy:#16466d;--blue:#2479b6;--ink:#18364b;--muted:#647d8e;--line:#dce8ef;--soft:#f3f8fb}
*{box-sizing:border-box}body{margin:0;background:var(--soft);color:var(--ink);font:14px/1.5 Arial,sans-serif}
.top{height:66px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 22px;gap:12px}
.brand{font-weight:800;color:var(--navy);font-size:17px}.brand small{display:block;font-size:10px;letter-spacing:1.2px;color:var(--muted)}
.top-actions{display:flex;gap:8px;align-items:center}button,a.btn{border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--navy);font-weight:700;padding:9px 13px;text-decoration:none;cursor:pointer}
.primary{background:var(--blue)!important;color:#fff!important;border-color:var(--blue)!important}.layout{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:16px;padding:16px;height:calc(100vh - 66px)}
.preview{background:#dce8ef;border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;min-height:0}
.preview-head{padding:10px 14px;background:#fff;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:10px;color:var(--muted);font-size:12px}
iframe{border:0;background:white;width:100%;height:100%;flex:1}
.panel{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;overflow:auto}
h1{font-size:20px;margin:0 0 5px;color:var(--navy)}h2{font-size:15px;margin:22px 0 10px;color:var(--navy)}
.help{color:var(--muted);font-size:12px;margin:0 0 14px}
label{display:block;font-size:12px;font-weight:700;color:var(--muted);margin:12px 0 5px}
input,select{width:100%;height:40px;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font:inherit;color:var(--ink);background:#fff}
input[type=color]{padding:3px;height:42px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.actions button{flex:1}
.status{font-size:12px;color:var(--muted);min-height:20px;margin-top:9px}
.rule{border:0;border-top:1px solid var(--line);margin:18px 0}
.button-list{display:grid;gap:7px}.button-item{border:1px solid var(--line);border-radius:9px;padding:9px;display:grid;grid-template-columns:1fr auto;gap:7px;align-items:center}.button-item strong{display:block;font-size:13px}.button-item small{color:var(--muted)}
.button-actions{display:flex;gap:4px}.button-actions button{padding:6px 8px;font-size:11px}
.note{background:#f2f8fc;border:1px solid var(--line);padding:10px;border-radius:9px;color:var(--muted);font-size:12px;margin-top:14px}
@media(max-width:850px){.layout{height:auto;grid-template-columns:1fr}.preview{height:65vh}.panel{overflow:visible}.top{padding:0 12px}.brand{font-size:14px}.top-actions button{padding:8px;font-size:12px}}
</style>
</head>
<body>
<header class="top"><div class="brand">＋ Health Finder<small>VISUAL WEBSITE EDITOR</small></div><div class="top-actions"><a class="btn" href="/admin">Admin dashboard</a><a class="btn" href="/">View website</a><button id="saveAll" class="primary">Save changes</button></div></header>
<main class="layout">
<section class="preview"><div class="preview-head"><strong>Live preview</strong><span>Click text or a section in the preview to select it</span></div><iframe id="siteFrame" title="Health Finder website preview" src="/"></iframe></section>
<aside class="panel">
<h1>Edit your website</h1><p class="help">Select an item in the preview, then change its text or colors here. Save when finished.</p>
<div id="selectedName" class="help">Nothing selected yet.</div>
<label for="editText">Text</label><textarea id="editText" rows="3" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:9px;font:inherit;resize:vertical" placeholder="Select text in the preview first"></textarea>
<div class="row"><div><label for="textColor">Text color</label><input id="textColor" type="color" value="#18364b"></div><div><label for="backgroundColor">Background</label><input id="backgroundColor" type="color" value="#ffffff"></div></div>
<div class="actions"><button id="applyEdit" class="primary">Apply to preview</button><button id="clearSelection">Clear selection</button></div>
<div class="status" id="editorStatus" role="status"></div>
<hr class="rule">
<h2>Add a button</h2><p class="help">Create an extra button and choose which section it appears in. Existing search and navigation buttons stay protected.</p>
<label for="buttonLabel">Button text</label><input id="buttonLabel" maxlength="60" placeholder="e.g. Contact us">
<label for="buttonUrl">Button link</label><input id="buttonUrl" maxlength="500" value="#contact" placeholder="#contact or https://...">
<label for="buttonSection">Place in section</label><select id="buttonSection"><option value="home">Home</option><option value="find">Find care</option><option value="philhealth">PhilHealth</option><option value="services">Services</option><option value="programs">Health programs</option><option value="about">About</option><option value="contact">Contact</option></select>
<div class="actions"><button id="addButton" class="primary">＋ Add button</button></div>
<h2>Your added buttons</h2><div id="customButtonList" class="button-list"><p class="help">No custom buttons yet.</p></div>
<div class="note">This editor changes supported text and colors, and lets you add, remove, and reorder your own buttons. Core search, facility results, and system controls are protected so the directory keeps working.</div>
</aside>
</main>
<script src="/visual-editor.js" defer></script>
</body></html>`);
}