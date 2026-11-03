// Shared: renders a FISHY verdict card (used by the popup and by the in-page bubble). Plain DOM, no innerHTML from data.
(function (root) {
  const GRADE = { A: ["LOOKS HEALTHY", "#2E9E5B"], B: ["MOSTLY OK", "#3E8ED0"], C: ["BE CAREFUL", "#E8A33A"], D: ["RISKY", "#E8723A"], F: ["FISHY", "#D7263D"] };
  const money = (v) => (v == null ? "?" : v >= 1e6 ? "$" + (v / 1e6).toFixed(2) + "M" : v >= 1e3 ? "$" + (v / 1e3).toFixed(1) + "K" : "$" + Math.round(v));
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function render(d, ca) {
    const box = el("div", "fx-card");
    if (!d || d.error) {
      box.appendChild(el("div", "fx-title", "FISHY"));
      box.appendChild(el("p", "fx-msg", (d && d.message) || "Something went wrong."));
      if (d && (d.error === "setup" || d.error === "network")) { const b = el("button", "fx-btn", "OPEN SETTINGS"); b.dataset.fxOptions = "1"; box.appendChild(b); }
      return box;
    }
    const top = el("div", "fx-top");
    const g = d.officialFishy ? ["OFFICIAL FISHY", "#2E9E5B"] : d.fakeFishy ? ["FAKE FISHY", "#D7263D"] : d.grade ? GRADE[d.grade] : d.launchpad ? ["ON A BONDING CURVE", "#8B5A2B"] : ["NO POOL FOUND", "#8B5A2B"];
    const badge = el("div", "fx-grade", d.officialFishy ? "✓" : d.fakeFishy ? "!" : d.grade || "?"); badge.style.background = g[1];
    const head = el("div", "fx-head");
    head.appendChild(el("b", "fx-sym", d.symbol || (ca.slice(0, 6) + "…" + ca.slice(-4))));
    head.appendChild(el("span", "fx-verdict", g[0]));
    if (d.name && d.name !== d.symbol) head.appendChild(el("span", "fx-name", d.name));
    top.appendChild(badge); top.appendChild(head); box.appendChild(top);
    const facts = el("div", "fx-facts");
    const fact = (k, v) => { const f = el("div", "fx-fact"); f.appendChild(el("i", null, k)); f.appendChild(el("b", null, v)); facts.appendChild(f); };
    if (d.grade) { fact("REAL VOLUME", d.realVolume + "%"); fact("LIQUIDITY", money(d.liquidity)); fact("SELLABLE −5%", money(d.sellable5)); }
    if (d.launchpad) fact("LAUNCHPAD", (d.launchpad.name || d.launchpad.src || "").toUpperCase() + (d.launchpad.status === "bonding" && d.launchpad.progress != null ? " · " + Math.round(d.launchpad.progress * 100) + "%" : d.launchpad.status === "dex" ? " · GRADUATED" : ""));
    fact("LARP", d.larp && d.larp.score >= 35 ? "LIKELY COPY" : "LOOKS ORIGINAL");
    box.appendChild(facts);
    if (d.flags && d.flags.length) { const ul = el("ul", "fx-flags"); d.flags.forEach((f) => ul.appendChild(el("li", null, "⚠ " + f))); box.appendChild(ul); }
    else box.appendChild(el("div", "fx-ok", "✓ no red flags found"));
    const row = el("div", "fx-row");
    const open = el("a", "fx-btn", "OPEN IN FISHY ↗"); open.href = (d.siteBase || "") + "/?ca=" + ca; open.target = "_blank"; open.rel = "noopener noreferrer"; row.appendChild(open);
    const copy = el("button", "fx-btn fx-ghost", "COPY CA"); copy.dataset.fxCopy = ca; row.appendChild(copy);
    box.appendChild(row);
    box.appendChild(el("div", "fx-foot", "Estimates from public pool data · not financial advice"));
    return box;
  }
  const CSS = `.fx-card{font:13px/1.4 ui-monospace,Menlo,Consolas,monospace;color:#3B2416;background:#FFF6DC;border:3px solid #241527;border-radius:8px;box-shadow:0 0 0 3px #8B5A2B,4px 5px 0 3px rgba(40,24,12,.35);padding:12px;width:300px;box-sizing:border-box}
.fx-title{font-weight:800;letter-spacing:.08em}.fx-msg{margin:6px 0 10px}
.fx-top{display:flex;gap:10px;align-items:center}.fx-grade{flex:0 0 46px;height:46px;border:3px solid #241527;border-radius:6px;display:grid;place-items:center;color:#fff;font:800 24px ui-monospace,monospace;text-shadow:2px 2px 0 rgba(0,0,0,.3)}
.fx-head{display:flex;flex-direction:column;min-width:0}.fx-sym{font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fx-verdict{font-weight:700;font-size:11px;letter-spacing:.06em}.fx-name{color:#8B5A2B;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fx-facts{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin:10px 0}.fx-fact i{display:block;font-style:normal;font-size:10px;color:#8B5A2B}.fx-fact b{font-size:12px}
.fx-flags{list-style:none;margin:0 0 10px;padding:0;display:flex;flex-direction:column;gap:4px}.fx-flags li{background:#FFE1DA;color:#9E1B2E;border:2px solid #D7263D;border-radius:4px;padding:3px 6px;font-size:12px}.fx-ok{color:#2E7D46;margin:0 0 10px}
.fx-row{display:flex;gap:6px}.fx-btn{flex:1;text-align:center;font:700 11px ui-monospace,monospace;background:#3E8E5E;color:#FFF6DC;border:2px solid #241527;border-radius:4px;padding:7px 6px;cursor:pointer;text-decoration:none}.fx-ghost{background:#BDF4FF;color:#0A1640}
.fx-foot{margin-top:8px;font-size:10px;color:#8B5A2B}`;
  root.FISHY_CARD = { render, CSS };
})(typeof window !== "undefined" ? window : self);
