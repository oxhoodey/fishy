const api = document.getElementById("api"), msg = document.getElementById("msg");
chrome.storage.sync.get({ api: "" }).then((v) => (api.value = v.api));
document.getElementById("save").addEventListener("click", async () => {
  let v = api.value.trim().replace(/\/+$/, "");
  if (!/^https:\/\/[^/]+/.test(v)) { msg.className = "bad"; msg.textContent = "Use the full https:// address of the FISHY site."; return; }
  await chrome.storage.sync.set({ api: v });
  msg.className = ""; msg.textContent = "Testing…";
  try { const r = await fetch(v + "/api/health", { cache: "no-store" }); const j = await r.json(); msg.className = r.ok ? "ok" : "bad"; msg.textContent = r.ok ? `✓ Connected: ${j.pools} pools tracked.` : "FISHY answered with an error."; }
  catch (e) { msg.className = "bad"; msg.textContent = "Saved, but the site didn't answer. Check the address."; }
});
