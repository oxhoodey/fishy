// Adds a small 🐟 button after every contract address (0x + 40 hex) on the page. Click it to see FISHY's verdict.
(() => {
  const RE = /0x[0-9a-fA-F]{40}/g;
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "NOSCRIPT", "CODE"]);
  let host, shadow, open = null;
  function ensureHost() {
    if (host) return;
    host = document.createElement("div"); host.id = "fishy-ext-root"; host.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none";
    document.documentElement.appendChild(host); shadow = host.attachShadow({ mode: "open" });
    const st = document.createElement("style"); st.textContent = window.FISHY_CARD.CSS + `.fx-pop{position:absolute;pointer-events:auto}.fx-load{font:12px ui-monospace,monospace;background:#FFF6DC;border:3px solid #241527;border-radius:8px;padding:10px 12px}`; shadow.appendChild(st);
    shadow.addEventListener("click", (e) => {
      const o = e.target.closest("[data-fx-options]"); if (o) { chrome.runtime.sendMessage({ type: "fishy-open-options" }); return; }
      const c = e.target.closest("[data-fx-copy]"); if (c) { navigator.clipboard.writeText(c.dataset.fxCopy).then(() => { c.textContent = "COPIED"; }); }
    });
    document.addEventListener("click", (e) => { if (open && !host.contains(e.target) && !e.target.closest?.(".fishy-ext-btn")) close(); }, true);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }
  function close() { if (open) { open.remove(); open = null; } }
  function show(btn, ca) {
    ensureHost(); close();
    const r = btn.getBoundingClientRect(), pop = document.createElement("div"); pop.className = "fx-pop";
    const left = Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - 316);
    pop.style.left = Math.max(window.scrollX + 8, left) + "px"; pop.style.top = window.scrollY + r.bottom + 6 + "px";
    const load = document.createElement("div"); load.className = "fx-load"; load.textContent = "🐟 FISHY is checking…"; pop.appendChild(load);
    shadow.appendChild(pop); open = pop;
    chrome.runtime.sendMessage({ type: "fishy-check", ca }, (d) => { if (open !== pop) return; pop.replaceChildren(window.FISHY_CARD.render(d, ca.toLowerCase())); });
  }
  function makeBtn(ca) {
    const b = document.createElement("button"); b.type = "button"; b.className = "fishy-ext-btn"; b.textContent = "🐟"; b.title = "Is this token fishy? (FISHY)";
    b.style.cssText = "all:unset;cursor:pointer;margin:0 2px 0 4px;font-size:.95em;line-height:1;display:inline-block;vertical-align:baseline;filter:drop-shadow(0 1px 0 rgba(0,0,0,.25))";
    b.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); show(b, ca); });
    return b;
  }
  function scan(rootNode) {
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, { acceptNode(n) {
      const p = n.parentElement; if (!p || SKIP.has(p.tagName) || p.isContentEditable || p.closest("#fishy-ext-root,.fishy-ext-done,[contenteditable='true']")) return NodeFilter.FILTER_REJECT;
      RE.lastIndex = 0; return RE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } });
    const hits = []; let n; while ((n = walker.nextNode()) && hits.length < 200) hits.push(n);
    for (const node of hits) {
      const text = node.nodeValue, frag = document.createDocumentFragment(); let last = 0; RE.lastIndex = 0; let m;
      while ((m = RE.exec(text))) {
        frag.appendChild(document.createTextNode(text.slice(last, m.index + m[0].length)));
        const wrap = document.createElement("span"); wrap.className = "fishy-ext-done"; wrap.appendChild(makeBtn(m[0])); frag.appendChild(wrap);
        last = m.index + m[0].length;
      }
      frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    }
  }
  let pending = false;
  const schedule = () => { if (pending) return; pending = true; setTimeout(() => { pending = false; scan(document.body); }, 400); };
  scan(document.body);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
