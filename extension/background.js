// FISHY extension: all network calls happen here, against the FISHY server the user configured.
const cache = new Map(); // ca -> {t, data}
async function apiBase() {
  const { api } = await chrome.storage.sync.get({ api: "" });
  return String(api || "").replace(/\/+$/, "");
}
async function check(ca) {
  ca = String(ca).toLowerCase();
  const hit = cache.get(ca);
  if (hit && Date.now() - hit.t < 60000) return hit.data;
  const base = await apiBase();
  if (!base) return { error: "setup", message: "Set your FISHY site address in the extension options first." };
  try {
    const r = await fetch(`${base}/api/check/${ca}`, { cache: "no-store" });
    const data = await r.json();
    if (!r.ok) return { error: "api", message: data.error || `FISHY answered ${r.status}` };
    data.siteBase = base;
    cache.set(ca, { t: Date.now(), data });
    if (cache.size > 300) cache.delete(cache.keys().next().value);
    return data;
  } catch (e) {
    return { error: "network", message: "Couldn't reach FISHY. Check the site address in the extension settings." };
  }
}
chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg && msg.type === "fishy-check" && /^0x[0-9a-fA-F]{40}$/.test(msg.ca || "")) { check(msg.ca).then(reply); return true; }
  if (msg && msg.type === "fishy-open-options") { chrome.runtime.openOptionsPage(); }
  return false;
});
chrome.runtime.onInstalled.addListener(async (d) => { if (d.reason === "install" && !(await apiBase())) chrome.runtime.openOptionsPage(); });
