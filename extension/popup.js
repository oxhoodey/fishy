const st = document.createElement("style"); st.textContent = window.FISHY_CARD.CSS + ".fx-card{width:100%}"; document.head.appendChild(st);
const out = document.getElementById("out"), input = document.getElementById("ca");
async function run(ca) {
  ca = ca.trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(ca)) { out.replaceChildren(window.FISHY_CARD.render({ error: "input", message: "That doesn't look like a contract address (0x + 40 characters)." }, "")); return; }
  out.textContent = "🐟 checking…";
  const d = await chrome.runtime.sendMessage({ type: "fishy-check", ca });
  out.replaceChildren(window.FISHY_CARD.render(d, ca.toLowerCase()));
}
document.getElementById("f").addEventListener("submit", (e) => { e.preventDefault(); run(input.value); });
input.addEventListener("paste", () => setTimeout(() => run(input.value), 20));
document.getElementById("opts").addEventListener("click", (e) => { e.preventDefault(); chrome.runtime.openOptionsPage(); });
out.addEventListener("click", (e) => {
  if (e.target.closest("[data-fx-options]")) chrome.runtime.openOptionsPage();
  const c = e.target.closest("[data-fx-copy]"); if (c) navigator.clipboard.writeText(c.dataset.fxCopy).then(() => (c.textContent = "COPIED"));
});
input.focus();
