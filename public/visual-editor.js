"use strict";
(() => {
  const $ = id => document.getElementById(id);
  const frame = $("siteFrame");
  let design = { elements: {}, customButtons: [] };
  let selected = null;
  let selectedSelector = "";
  let frameDoc = null;

  function status(message, error) {
    $("editorStatus").textContent = message;
    $("editorStatus").style.color = error ? "#b42318" : "#647d8e";
  }

  function selectorFor(el) {
    if (el.id) return "#" + CSS.escape(el.id);
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && node !== frameDoc.body) {
      let part = node.tagName.toLowerCase();
      const parent = node.parentElement;
      if (parent) {
        const same = [...parent.children].filter(x => x.tagName === node.tagName);
        if (same.length > 1) part += ":nth-of-type(" + (same.indexOf(node) + 1) + ")";
      }
      parts.unshift(part);
      node = parent;
    }
    return "body > " + parts.join(" > ");
  }

  function writeText(el, value) {
    const direct = [...el.childNodes].find(n => n.nodeType === 3 && n.nodeValue.trim());
    if (direct) direct.nodeValue = value;
    else el.insertBefore(frameDoc.createTextNode(value), el.firstChild);
  }

  function applyDesignToFrame() {
    if (!frameDoc) return;
    Object.entries(design.elements || {}).forEach(([selector, item]) => {
      let el;
      try { el = frameDoc.querySelector(selector); } catch (_) { return; }
      if (!el) return;
      if (typeof item.text === "string") writeText(el, item.text);
      if (item.color) el.style.color = item.color;
      if (item.background) el.style.backgroundColor = item.background;
    });
    renderCustomButtons();
  }

  function renderCustomButtons() {
    if (!frameDoc) return;
    frameDoc.querySelectorAll(".site-custom-buttons").forEach(el => el.remove());
    const grouped = {};
    (design.customButtons || []).forEach(button => {
      (grouped[button.section] ||= []).push(button);
    });
    Object.entries(grouped).forEach(([sectionId, buttons]) => {
      const section = frameDoc.getElementById(sectionId);
      if (!section) return;
      const wrap = frameDoc.createElement("div");
      wrap.className = "site-custom-buttons";
      wrap.style.cssText = "display:flex;flex-wrap:wrap;gap:10px;margin:18px 0";
      buttons.forEach(button => {
        const a = frameDoc.createElement("a");
        a.className = "btn btn-primary";
        a.textContent = button.label;
        a.href = button.url;
        a.dataset.customId = button.id;
        a.style.cssText = "display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:9px;text-decoration:none";
        if (/^https:\/\//i.test(button.url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        wrap.appendChild(a);
      });
      section.appendChild(wrap);
    });
  }

  function selectElement(el) {
    if (!el || !frameDoc.body.contains(el)) return;
    if (selected) selected.style.outline = "";
    selected = el;
    selectedSelector = selectorFor(el);
    selected.style.outline = "2px solid #e28a39";
    $("selectedName").textContent = "Selected: " + el.tagName.toLowerCase() + (el.id ? " #" + el.id : "");
    const directText = [...el.childNodes].find(n => n.nodeType === 3 && n.nodeValue.trim());
    $("editText").value = el.tagName === "SECTION" ? "" : (directText ? directText.nodeValue.trim() : (el.innerText || el.textContent || ""));
    $("editText").disabled = el.tagName === "SECTION";
    $("editText").placeholder = el.tagName === "SECTION" ? "Section selected — change its colors only" : "Edit selected text";
    $("textColor").value = rgbToHex(frame.contentWindow.getComputedStyle(el).color) || "#18364b";
    $("backgroundColor").value = rgbToHex(frame.contentWindow.getComputedStyle(el).backgroundColor) || "#ffffff";
    status("Selected item is ready to edit.");
  }

  function rgbToHex(color) {
    const m = String(color).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return "#" + m.slice(1, 4).map(n => Number(n).toString(16).padStart(2, "0")).join("");
  }

  function setupFrame() {
    try { frameDoc = frame.contentDocument; } catch (_) { status("Preview could not be opened.", true); return; }
    if (!frameDoc || !frameDoc.body) return;
    frameDoc.addEventListener("click", event => {
      const custom = event.target.closest("[data-custom-id]");
      if (custom) event.preventDefault();
      const candidate = event.target.closest("span,strong,small,h1,h2,h3,h4,p,a,button,.section-kicker,section");
      if (!candidate || candidate.closest(".site-header") && candidate.id === "menuToggle") return;
      event.preventDefault();
      event.stopPropagation();
      selectElement(candidate);
    }, true);
    frameDoc.addEventListener("mouseover", event => {
      const candidate = event.target.closest("h1,h2,h3,h4,p,a,button,strong,small,.section-kicker,section");
      if (candidate && !candidate.closest(".site-header")) candidate.style.cursor = "crosshair";
    }, true);
    applyDesignToFrame();
    status("Preview ready. Click an item to select it.");
  }

  async function loadDesign() {
    const response = await fetch("/api/site-design");
    if (!response.ok) throw new Error("Could not load saved website settings.");
    const data = await response.json();
    design = data.design && typeof data.design === "object" ? data.design : { elements: {}, customButtons: [] };
    design.elements ||= {};
    design.customButtons ||= [];
    if (frame.contentDocument && frame.contentDocument.readyState === "complete") setupFrame();
    renderButtonList();
  }

  function renderButtonList() {
    const root = $("customButtonList");
    root.innerHTML = "";
    if (!design.customButtons.length) {
      root.innerHTML = '<p class="help">No custom buttons yet.</p>';
      return;
    }
    design.customButtons.forEach((button, index) => {
      const item = document.createElement("div");
      item.className = "button-item";
      const info = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = button.label;
      const small = document.createElement("small");
      small.textContent = "Section: " + button.section;
      info.append(strong, small);
      const actions = document.createElement("div");
      actions.className = "button-actions";
      const up = document.createElement("button");
      up.type = "button"; up.textContent = "↑"; up.title = "Move up"; up.disabled = index === 0;
      up.onclick = () => moveButton(index, -1);
      const down = document.createElement("button");
      down.type = "button"; down.textContent = "↓"; down.title = "Move down"; down.disabled = index === design.customButtons.length - 1;
      down.onclick = () => moveButton(index, 1);
      const remove = document.createElement("button");
      remove.type = "button"; remove.textContent = "Delete"; remove.onclick = () => {
        design.customButtons.splice(index, 1); renderButtonList(); renderCustomButtons(); status("Button removed from the preview. Save to publish.");
      };
      actions.append(up, down, remove);
      item.append(info, actions);
      root.appendChild(item);
    });
  }

  function moveButton(index, direction) {
    const next = index + direction;
    if (next < 0 || next >= design.customButtons.length) return;
    [design.customButtons[index], design.customButtons[next]] = [design.customButtons[next], design.customButtons[index]];
    renderButtonList(); renderCustomButtons();
    status("Button order changed in the preview. Save to publish.");
  }

  $("applyEdit").onclick = () => {
    if (!selected || !selectedSelector) return status("Click an item in the preview first.", true);
    const item = design.elements[selectedSelector] ||= {};
    const text = $("editText").value;
    if (selected.tagName !== "SECTION" && text.trim()) { item.text = text.slice(0, 600); writeText(selected, item.text); }
    item.color = $("textColor").value;
    item.background = $("backgroundColor").value;
    selected.style.color = item.color;
    selected.style.backgroundColor = item.background;
    status("Changes applied to preview. Click Save changes to publish.");
  };

  $("clearSelection").onclick = () => {
    if (selected) selected.style.outline = "";
    selected = null; selectedSelector = "";
    $("selectedName").textContent = "Nothing selected yet.";
    $("editText").value = "";
    $("editText").disabled = false;
    $("editText").placeholder = "Select text in the preview first";
    status("Selection cleared.");
  };

  $("addButton").onclick = () => {
    const label = $("buttonLabel").value.trim();
    const url = $("buttonUrl").value.trim();
    const section = $("buttonSection").value;
    if (!label || !url) return status("Enter button text and a link first.", true);
    if (!(url.startsWith("#") || (url.startsWith("/") && !url.startsWith("//")) || /^https:\/\//i.test(url) || /^mailto:/i.test(url))) {
      return status("Use a section link, page path, https link, or email link.", true);
    }
    design.customButtons.push({ id: "custom-" + Date.now(), label, url, section });
    $("buttonLabel").value = "";
    renderButtonList(); renderCustomButtons();
    status("Button added to the preview. Save to publish.");
  };

  $("saveAll").onclick = async () => {
    const button = $("saveAll");
    button.disabled = true; button.textContent = "Saving…";
    try {
      const response = await fetch("/api/admin/site-design", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ design })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      design = data.design;
      status("Saved! Your website changes are now published.");
    } catch (error) {
      status(error.message || "Could not save changes.", true);
    } finally {
      button.disabled = false; button.textContent = "Save changes";
    }
  };

  frame.addEventListener("load", () => {
    try { setupFrame(); } catch (_) { status("Preview is still loading…"); }
  });
  loadDesign().catch(error => status(error.message, true));
})();