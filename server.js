// FISHY server: pulls Robinhood Chain pools from DexPaprika and scores every token on two questions:
// how much of its volume is real, and how much can you sell before the price breaks. Serves dashboard + JSON + SSE.
// Node 18+, no dependencies.
const http = require("http");
const fs = require("fs");
const path = require("path");
const swaptest = require("./swaptest");
const launchpads = require("./launchpads");

const CFG = {
  port: +process.env.PORT || 8787,
  chain: process.env.CHAIN || "robinhood",
  limit: Math.min(100, +process.env.POOL_LIMIT || 100),
  // DexPaprika pages past the first need a paid key (cursor); without one, stay on page 1
  pages: Math.max(1, +process.env.POOL_PAGES || (process.env.DEXPAPRIKA_API_KEY ? 2 : 1)),
  refreshMs: (+process.env.REFRESH_SECONDS || 60) * 1000,
  minLiq: +process.env.MIN_LIQUIDITY || 1000,
  turnover: +process.env.TURNOVER || 10,
  excludeStocks: process.env.INCLUDE_STOCKS !== "1", // crypto-only by default // max believable daily volume = liquidity x this
  historyMax: +process.env.HISTORY_POINTS || 1440,
  histPoints: +process.env.POOL_HISTORY_POINTS || 1440, // per-pool liquidity samples kept in memory
  quakeMinLiq: +process.env.QUAKE_MIN_LIQUIDITY || 2000,
  quakeMinDrop: +process.env.QUAKE_MIN_DROP || 0.3,
  swapPools: +process.env.SWAP_TEST_POOLS || 4,
  tokenLookups: +process.env.TOKEN_LOOKUPS_PER_REFRESH || 25,
  newTokens: Math.min(100, +process.env.NEW_TOKENS_LIMIT || 60),
  apiBase: process.env.DEXPAPRIKA_BASE || "https://api.dexpaprika.com",
  apiKey: process.env.DEXPAPRIKA_API_KEY || "",
  apiKeyHeader: process.env.DEXPAPRIKA_API_KEY_HEADER || "authorization",
  host: process.env.HOST || "0.0.0.0",
  // demo data is only for local previews; on mainnet set DEMO_FALLBACK=0 so a data outage shows as an outage
  demoFallback: process.env.DEMO_FALLBACK != null ? process.env.DEMO_FALLBACK === "1" : process.env.NODE_ENV !== "production",
  site: {
    name: process.env.SITE_NAME || "FISHY",
    url: (process.env.SITE_URL || "").replace(/\/$/, ""),
    xUrl: process.env.X_URL || "",
    xHandle: process.env.X_HANDLE || "",
    ca: process.env.TOKEN_CA || "",
    symbol: process.env.TOKEN_SYMBOL || "$FISHY",
    explorer: (process.env.EXPLORER_URL || "").replace(/\/$/, ""),
    buyUrl: process.env.BUY_URL || "",
    // {ca} is replaced by the token address; check the format on Pons and change it in Railway if needed
    ponsUrl: process.env.PONS_TOKEN_URL || "https://ponsfamily.com/launchpad/{ca}",
    flapUrl: process.env.FLAP_TOKEN_URL || "https://flap.sh/robinhood/{ca}",
    dexUrl: process.env.DEX_TOKEN_URL || "https://dexpaprika.com/robinhood/token/{ca}",
  },
};

const STABLE = new Set(["USDG", "USDC", "USDT", "DAI", "USDE"]);
const BLUE = new Set(["WETH", "ETH", "WBTC", "CBBTC", "ARB", "LINK", "UNI"]);
const STOCK = new Set((process.env.STOCK_SYMBOLS || "TSLA,NVDA,AAPL,AMZN,SPY,QQQ,HOOD,MSFT,GOOGL,META,COIN,MSTR,AMD,NFLX,PLTR").split(",").map((s) => s.trim().toUpperCase()));
const category = (sym) => { const s = String(sym || "").toUpperCase(); return STABLE.has(s) ? "stable" : BLUE.has(s) ? "blue" : STOCK.has(s) ? "stock" : "meme"; };

const TOKEN_META = new Map(); // address(lowercase) -> {symbol, name}
// Uniswap V4 uses the zero address for native ETH; DexPaprika has no token page for it
TOKEN_META.set("0x0000000000000000000000000000000000000000", { symbol: "ETH", name: "Ether (native)" });
const num = (v) => (v == null || v === "" || isNaN(+v) ? null : +v);

function normalize(p) {
  const t = Array.isArray(p.tokens) ? p.tokens : [];
  if (t.length < 2) return null;
  const tok = (x) => {
    if (typeof x === "string") x = { id: x };
    const id = String(x.id || x.address || x.token_address || "?"), meta = TOKEN_META.get(id.toLowerCase()) || {};
    const short = id.length > 12 ? id.slice(0, 6) + "…" + id.slice(-4) : id;
    const sym = String(x.symbol || meta.symbol || x.name || meta.name || short).slice(0, 16);
    return { id, sym, name: String(x.name || meta.name || sym).slice(0, 48), cat: category(sym), fdv: num(x.fdv) };
  };
  return {
    id: String(p.id),
    dex: p.dex_name || p.dex_id || "",
    a: tok(t[0]),
    b: tok(t[1]),
    vol: num(p.volume_usd_24h ?? p.volume_usd) || 0,
    liq: num(p.liquidity_usd ?? p.liquidity) || 0,
    chg: num(p.price_change_percentage_24h), // price move of tokens[0] in this pool
    price: num(p.price_usd),
    fee: num(p.fee),
    createdBlock: num(p.created_at_block_number),
    created: p.created_at || null,
  };
}

// Constant-product estimate: each pool holds ~liq/2 per side. Selling x into combined reserve R drops price by x/(R+x).
function tokenExits(pools) {
  const map = new Map();
  for (const p of pools) for (const t of [p.a, p.b]) {
    if (!map.has(t.id)) map.set(t.id, { id: t.id, sym: t.sym, cat: t.cat, R: 0, legs: 0, dust: 0, vol: 0, real: 0 });
    const e = map.get(t.id);
    e.vol += p.vol;
    e.real += p.liq < CFG.minLiq ? 0 : Math.min(p.vol, p.liq * CFG.turnover);
    if (p.liq >= CFG.minLiq) { e.R += p.liq / 2; e.legs++; } else e.dust++;
  }
  for (const e of map.values()) {
    const at = (q) => (e.R * q) / (1 - q);
    e.exit1 = at(0.01); e.exit5 = at(0.05); e.exit10 = at(0.1);
    e.door = e.exit5 >= 1e5 ? "wide" : e.exit5 >= 1e4 ? "open" : e.exit5 >= 1e3 ? "narrow" : "shut";
    e.honesty = e.vol > 0 ? e.real / e.vol : 1;
    e.score = 0.5 * e.honesty + 0.5 * Math.min(1, Math.log10(Math.max(1, e.exit5)) / 5);
    e.grade = e.score >= 0.85 ? "A" : e.score >= 0.7 ? "B" : e.score >= 0.5 ? "C" : e.score >= 0.3 ? "D" : "F";
  }
  return map;
}

function chainIndex(pools, exits) {
  const acc = CFG.excludeStocks ? { blue: [0, 0], meme: [0, 0] } : { blue: [0, 0], stock: [0, 0], meme: [0, 0] };
  const best = new Map(); // deepest pool where the token is tokens[0] carries its price move
  for (const p of pools) if (p.chg != null && p.liq >= CFG.minLiq) { const b = best.get(p.a.id); if (!b || p.liq > b.liq) best.set(p.a.id, p); }
  for (const [id, p] of best) { const e = exits.get(id); if (!e || !acc[e.cat]) continue; acc[e.cat][0] += p.chg * e.R; acc[e.cat][1] += e.R; }
  const out = {};
  for (const k in acc) out[k] = acc[k][1] ? acc[k][0] / acc[k][1] : null;
  return out;
}

const headers = () => (CFG.apiKey ? { accept: "application/json", [CFG.apiKeyHeader]: CFG.apiKey } : { accept: "application/json" });

let snapshot = { chain: CFG.chain, updatedAt: null, error: null, pools: [], index: null, history: [] };
const history = [];
const clients = new Set();

let warnedPaging = false;
// fill in symbols for tokens that came back without one (cached; a few lookups per refresh to protect the quota)
async function enrichTokens(raw) {
  const missing = new Set();
  for (const p of raw) for (const x of (Array.isArray(p.tokens) ? p.tokens : [])) {
    const o = typeof x === "string" ? { id: x } : x || {};
    const id = String(o.id || o.address || "").toLowerCase();
    if (!id) continue;
    if (o.symbol) { if (!TOKEN_META.has(id)) TOKEN_META.set(id, { symbol: o.symbol, name: o.name }); continue; }
    if (!TOKEN_META.has(id)) missing.add(id);
  }
  const todo = [...missing].slice(0, CFG.tokenLookups);
  for (let i = 0; i < todo.length; i += 5) {
    await Promise.all(todo.slice(i, i + 5).map(async (id) => {
      try {
        const r = await fetch(`${CFG.apiBase}/networks/${encodeURIComponent(CFG.chain)}/tokens/${encodeURIComponent(id)}`, { headers: headers(), signal: AbortSignal.timeout(10000) });
        if (!r.ok) return;
        const j = await r.json(), t = j.token || j;
        if (t && (t.symbol || t.name)) TOKEN_META.set(id, { symbol: t.symbol, name: t.name });
      } catch (_) {}
    }));
  }
  if (todo.length) console.log(`token lookups: ${todo.length} · known symbols: ${TOKEN_META.size}`);
}
async function dpGet(pathAndQuery) {
  const res = await fetch(`${CFG.apiBase}${pathAndQuery}`, { headers: headers(), signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`DexPaprika ${res.status}`);
  return res.json();
}
// newest pools on the chain (first page, no key needed)
async function fetchNewPools() {
  const j = await dpGet(`/networks/${encodeURIComponent(CFG.chain)}/pools/search?order_by=created_at&sort=desc&limit=100&detailed=true`);
  return j.results || [];
}
// every pool of one token, for "paste a CA" in CHECK
const LOOKUP_CACHE = new Map();
async function lookupToken(addr) {
  const hit = LOOKUP_CACHE.get(addr);
  if (hit && Date.now() - hit.t < 60000) return hit.d;
  const j = await dpGet(`/networks/${encodeURIComponent(CFG.chain)}/pools/search?token_address=${encodeURIComponent(addr)}&order_by=liquidity_usd&sort=desc&limit=25&detailed=true`);
  const raw = j.results || [];
  await enrichTokens(raw);
  const pools = raw.map(normalize).filter(Boolean);
  const d = { address: addr, pools, src: await classifyToken(addr, pools[0] && pools[0].dex), updatedAt: new Date().toISOString() };
  LOOKUP_CACHE.set(addr, { t: Date.now(), d });
  if (LOOKUP_CACHE.size > 300) LOOKUP_CACHE.delete(LOOKUP_CACHE.keys().next().value);
  return d;
}
// where a token was launched: Pons (graduationStatus on the Pons factory/locker), Flap (vanity 8888/7777 addresses, per Flap docs) or straight on a DEX
const PONS_CONTRACTS = (process.env.PONS_CONTRACTS || "0x7ed598bcef8bd9edd8c97a195c6d13f40801ec7e,0xA5aAb3F0c6EeadF30Ef1D3Eb997108E976351feB,0x736D76699C26D0d966744cAe304C000d471f7F35,0x0c37a24F5D23A486FA692d1500881d698B1F77a4,0x31ca5E101941A93A7DD6d0497928700625CF54B5")
  .split(",").map((x) => x.trim()).filter(Boolean);
const GRAD_SEL = swaptest.selector("graduationStatus(address)");
const SRC_CACHE = new Map();
async function classifyToken(addr, dex) {
  const a = String(addr).toLowerCase(), hit = SRC_CACHE.get(a);
  if (hit && (hit.src !== "dex" || Date.now() - hit.t < 30 * 60000)) return hit.src;
  const seen = launchpads.known(a); // spotted launching on-chain by the launchpad scanner
  if (seen) return seen.src;
  let src = "dex";
  if (/pons/i.test(dex || "")) src = "pons";
  else if (/flap/i.test(dex || "") || /(7777|8888)$/.test(a)) src = "flap";
  else if (/^0x[0-9a-f]{40}$/.test(a)) {
    for (const c of PONS_CONTRACTS) {
      try {
        const r = await swaptest.rpc("eth_call", [{ to: c, data: GRAD_SEL + a.slice(2).padStart(64, "0") }, "latest"]);
        if (r && r.length >= 2 + 64 * 3 && BigInt("0x" + r.slice(66, 130)) > 0n) { src = "pons"; break; }
      } catch (_) {}
    }
  }
  SRC_CACHE.set(a, { src, t: Date.now() });
  if (SRC_CACHE.size > 5000) SRC_CACHE.delete(SRC_CACHE.keys().next().value);
  return src;
}
async function classifyAll(list) {
  for (let i = 0; i < list.length; i += 6) await Promise.all(list.slice(i, i + 6).map(async (t) => { t.src = await classifyToken(t.id, t.dex); }));
  return list;
}
// tokens the on-chain scanner saw launch (bonding curves included) + DexPaprika's newest pools, newest first
function mergeLaunches(dexList, pools) {
  const onDex = new Set();
  for (const p of pools) { onDex.add(String(p.a.id).toLowerCase()); onDex.add(String(p.b.id).toLowerCase()); }
  const byId = new Map(dexList.map((t) => [String(t.id).toLowerCase(), t]));
  const priceOf = (addr, sym) => {
    if (!addr) return quoteUsdOf(sym);
    const a = addr.toLowerCase(), p = pools.filter((x) => String(x.a.id).toLowerCase() === a && x.price > 0).sort((x, y) => y.liq - x.liq)[0];
    return p ? p.price : quoteUsdOf(sym);
  };
  for (const l of launchpads.list(priceOf, onDex)) {
    const d = byId.get(l.id);
    if (d) { d.src = l.src; d.srcName = l.srcName; d.status = "dex"; continue; } // graduated: keep DEX numbers, label the launchpad
    byId.set(l.id, l);
  }
  return [...byId.values()].sort((a, b) => Date.parse(b.created || 0) - Date.parse(a.created || 0)).slice(0, CFG.newTokens + 40);
}
function newTokenList(pools) {
  const seen = new Set(), out = [];
  const sorted = pools.slice().sort((a, b) => Date.parse(b.created || 0) - Date.parse(a.created || 0));
  for (const p of sorted) {
    const A = p.a.sym.toUpperCase(), B = p.b.sym.toUpperCase();
    const t = HUBS.has(A) && !HUBS.has(B) ? p.b : p.a, other = t === p.a ? p.b : p.a;
    if (HUBS.has(t.sym.toUpperCase()) || seen.has(t.id.toLowerCase())) continue;
    seen.add(t.id.toLowerCase());
    out.push({ id: t.id, sym: t.sym, name: t.name, mc: t.fdv, created: p.created, pool: p.id, dex: p.dex, pair: other.sym, liq: p.liq, vol: p.vol });
    if (out.length >= CFG.newTokens) break;
  }
  return out;
}
async function fetchPools() {
  const all = [];
  let cursor = "";
  for (let i = 0; i < CFG.pages; i++) {
    // detailed=true makes DexPaprika include token symbol/name in each pool's tokens[]
    const url = `${CFG.apiBase}/pools/search?chains=${encodeURIComponent(CFG.chain)}&order_by=volume_usd_24h&sort=desc&limit=${CFG.limit}&detailed=true${cursor ? "&cursor=" + encodeURIComponent(cursor) : ""}`;
    const res = await fetch(url, { headers: headers(), signal: AbortSignal.timeout(20000) });
    if (!res.ok) {
      // the cursor (page 2+) needs a paid API key: keep page 1 instead of failing the whole refresh
      if (i > 0 && all.length) { if (!warnedPaging) { console.warn(`DexPaprika page ${i + 1} refused (${res.status}); using page 1 only. Set DEXPAPRIKA_API_KEY or POOL_PAGES=1.`); warnedPaging = true; } break; }
      throw new Error(`DexPaprika ${res.status}`);
    }
    const json = await res.json();
    all.push(...(json.results || []));
    if (!json.has_next_page || !json.next_cursor) break;
    cursor = json.next_cursor;
  }
  return all;
}

// ---------- seismograph: liquidity history per pool + quake detection ----------
const HUBS = new Set(["WETH", "ETH", ...STABLE]);
const poolHist = new Map(); // poolId -> [{t, liq, vol, price}]
const quakes = [];
let prevLiq = new Map();
const subject = (p) => (HUBS.has(p.a.sym.toUpperCase()) && !HUBS.has(p.b.sym.toUpperCase()) ? [p.b, p.a] : [p.a, p.b]);
function detectQuakes(pools, now) {
  let moved = 0, total = 0;
  for (const p of pools) {
    const arr = poolHist.get(p.id) || [];
    arr.push({ t: now, liq: p.liq, vol: p.vol, price: p.price });
    while (arr.length > CFG.histPoints) arr.shift();
    poolHist.set(p.id, arr);
    const before = prevLiq.get(p.id);
    if (before != null) { moved += Math.abs(p.liq - before); total += before; }
    if (before != null && before >= CFG.quakeMinLiq && p.liq < before) {
      const drop = 1 - p.liq / before;
      if (drop >= CFG.quakeMinDrop) {
        const lost = before - p.liq, [tok, pair] = subject(p);
        const mag = Math.min(9.9, Math.max(1, Math.log10(Math.max(10, lost)) * drop * 1.6));
        const q = { id: `${p.id}:${now}`, t: new Date(now).toISOString(), pool: p.id, dex: p.dex, token: { id: tok.id, sym: tok.sym, name: tok.name }, pair: pair.sym, before, after: p.liq, drop, lost, mag: +mag.toFixed(1) };
        quakes.unshift(q);
        broadcast("quake", q);
      }
    }
  }
  while (quakes.length > 500) quakes.pop();
  prevLiq = new Map(pools.map((p) => [p.id, p.liq]));
  return total ? moved / total : 0;
}

// ---------- SWAP TEST: real round trips through the Uniswap quoters ----------
const swapCache = new Map();
function quoteUsdOf(sym) {
  const s = String(sym || "").toUpperCase();
  if (STABLE.has(s)) return 1;
  if (s === "WETH" || s === "ETH") {
    const p = snapshot.pools.filter((x) => (x.a.sym.toUpperCase() === "WETH" || x.a.sym.toUpperCase() === "ETH") && STABLE.has(x.b.sym.toUpperCase()) && x.price > 0).sort((a, b) => b.liq - a.liq)[0];
    return p ? p.price : null;
  }
  return null;
}
async function swapTestToken(tokenId, usd) {
  const k = tokenId.toLowerCase() + ":" + usd, c = swapCache.get(k);
  if (c && Date.now() - c.at < 120000) return c.data;
  const pools = snapshot.pools.filter((p) => p.a.id.toLowerCase() === tokenId.toLowerCase() || p.b.id.toLowerCase() === tokenId.toLowerCase())
    .filter((p) => p.liq >= CFG.minLiq).sort((a, b) => b.liq - a.liq).slice(0, CFG.swapPools);
  const results = [];
  for (const p of pools) {
    const quote = p.a.id.toLowerCase() === tokenId.toLowerCase() ? p.b : p.a, qUsd = quoteUsdOf(quote.sym);
    if (!qUsd) { results.push({ pool: p.id, dex: p.dex, quote: quote.sym, error: "no USD price for the quote asset " + quote.sym }); continue; }
    try { results.push(await swaptest.roundTrip(p, tokenId, usd, qUsd)); }
    catch (e) { results.push({ pool: p.id, dex: p.dex, quote: quote.sym, error: String(e.message || e) }); }
  }
  const ok = results.filter((r) => !r.error), best = ok.sort((a, b) => a.lossPct - b.lossPct)[0] || null;
  const data = { token: tokenId, usd, at: new Date().toISOString(), rpc: swaptest.CFG.rpc, best, results: results.sort((a, b) => (a.error ? 1 : 0) - (b.error ? 1 : 0) || (a.lossPct || 0) - (b.lossPct || 0)) };
  swapCache.set(k, { at: Date.now(), data });
  return data;
}

// pool OHLCV proxy with a small cache (price + volume history for autopsies)
const ohlcvCache = new Map();
async function poolOHLCV(id) {
  const c = ohlcvCache.get(id);
  if (c && Date.now() - c.at < 5 * 60 * 1000) return c.data;
  const start = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const url = `${CFG.apiBase}/networks/${encodeURIComponent(CFG.chain)}/pools/${encodeURIComponent(id)}/ohlcv?start=${start}&interval=1h&limit=168`;
  const res = await fetch(url, { headers: headers(), signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`DexPaprika ohlcv ${res.status}`);
  const raw = await res.json();
  const rows = Array.isArray(raw) ? raw : raw.results || raw.data || [];
  const data = rows.map((r) => ({ t: Date.parse(r.time_open || r.time_close || r.timestamp || r.time), o: num(r.open), h: num(r.high), l: num(r.low), c: num(r.close), v: num(r.volume) })).filter((r) => !isNaN(r.t)).sort((a, b) => a.t - b.t);
  ohlcvCache.set(id, { at: Date.now(), data });
  return data;
}

async function refresh() {
  try {
    const raw = await fetchPools();
    let rawNew = [];
    try { rawNew = await fetchNewPools(); } catch (e) { console.warn("new pools:", e.message); }
    await enrichTokens(raw.concat(rawNew));
    const newPools = rawNew.map(normalize).filter(Boolean)
      .filter((p) => !CFG.excludeStocks || (p.a.cat !== "stock" && p.b.cat !== "stock"));
    const ids = new Set(raw.map((p) => String(p.id)));
    const pools = raw.concat(rawNew.filter((p) => !ids.has(String(p.id)))).map(normalize).filter(Boolean)
      .filter((p) => !CFG.excludeStocks || (p.a.cat !== "stock" && p.b.cat !== "stock"));
    if (!pools.length) throw new Error("DexPaprika returned no pools");
    const exits = tokenExits(pools);
    const index = chainIndex(pools, exits);
    const t = new Date().toISOString();
    const activity = detectQuakes(pools, Date.parse(t));
    history.push({ t, index, activity });
    while (history.length > CFG.historyMax) history.shift();
    const newTokens = mergeLaunches(await classifyAll(newTokenList(newPools)), pools);
    snapshot = { chain: CFG.chain, updatedAt: t, error: null, pools, index, history: history.slice(-288), newTokens };
    broadcast("pools", snapshot);
    console.log(`[${t}] ${pools.length} pools · index`, index);
  } catch (e) {
    snapshot.error = String(e.message || e);
    console.error("refresh failed:", snapshot.error);
  }
}

function broadcast(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) res.write(msg);
}

const PUB = path.join(__dirname, "public");
const INDEX = path.join(PUB, "index.html");
const MIME = { ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp4": "video/mp4", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json" };
const publicConfig = () => ({ ...CFG.site, chain: CFG.chain, chainId: 4663, demoFallback: CFG.demoFallback, refreshSeconds: CFG.refreshMs / 1000 });
let INDEX_CACHE = null;
function renderIndex(req) {
  if (!INDEX_CACHE || process.env.NODE_ENV !== "production") INDEX_CACHE = fs.readFileSync(INDEX, "utf8");
  const origin = CFG.site.url || `https://${req.headers["x-forwarded-host"] || req.headers.host || "localhost"}`;
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  return INDEX_CACHE.replace(/\{\{SITE_URL\}\}/g, esc(origin)).replace("/*FISHY_CONFIG*/", `window.FISHY_CONFIG=${JSON.stringify(publicConfig()).replace(/</g, "\\u003c")};`);
}
function send(res, code, body, type = "application/json; charset=utf-8") {
  res.writeHead(code, { "content-type": type, "access-control-allow-origin": "*", "cache-control": "no-store" });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

const SWAP_CACHE = new Map();
let swapBusy = 0;
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/api/pools") return send(res, 200, snapshot);
  if (u.pathname === "/api/index") return send(res, 200, { updatedAt: snapshot.updatedAt, index: snapshot.index, history });
  if (u.pathname.startsWith("/api/token/")) {
    const q = decodeURIComponent(u.pathname.slice(11)).toLowerCase();
    const size = +u.searchParams.get("size") || 1000;
    const exits = tokenExits(snapshot.pools);
    const e = [...exits.values()].filter((x) => x.id.toLowerCase() === q || x.sym.toLowerCase() === q).sort((a, b) => b.R - a.R)[0];
    if (!e) return send(res, 404, { error: "token not in tracked pools", token: q });
    const impact = e.R > 0 ? size / (e.R + size) : 1;
    return send(res, 200, { ...e, size, impact, youGet: size * (1 - impact) * 0.997, updatedAt: snapshot.updatedAt });
  }
  if (u.pathname === "/api/quakes") return send(res, 200, { since: history[0] ? history[0].t : null, quakes, activity: history.slice(-240).map((h) => ({ t: h.t, a: h.activity || 0 })) });
  if (u.pathname.startsWith("/api/history/")) {
    const id = decodeURIComponent(u.pathname.slice(13));
    return send(res, 200, { pool: id, points: poolHist.get(id) || [], quakes: quakes.filter((q) => q.pool === id) });
  }
  if (u.pathname.startsWith("/api/swaptest/")) {
    const id = decodeURIComponent(u.pathname.slice(14)), usd = Math.min(1e6, Math.max(1, +u.searchParams.get("usd") || 100));
    const key = id + "|" + Math.round(usd), hit = SWAP_CACHE.get(key);
    if (hit && Date.now() - hit.t < 60000) return send(res, 200, hit.d);
    if (swapBusy >= 4) return send(res, 429, { error: "busy, try again in a few seconds" });
    swapBusy++;
    swapTestToken(id, usd).then((d) => { SWAP_CACHE.set(key, { t: Date.now(), d }); if (SWAP_CACHE.size > 500) SWAP_CACHE.delete(SWAP_CACHE.keys().next().value); send(res, 200, d); })
      .catch((e) => send(res, 502, { error: String(e.message || e) })).finally(() => swapBusy--);
    return;
  }
  if (u.pathname.startsWith("/api/ohlcv/")) {
    const id = decodeURIComponent(u.pathname.slice(11));
    poolOHLCV(id).then((data) => send(res, 200, { pool: id, data })).catch((e) => send(res, 502, { error: String(e.message || e) }));
    return;
  }
  if (u.pathname === "/api/stream") {
    res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache", connection: "keep-alive", "access-control-allow-origin": "*" });
    res.write(`retry: 5000\n\n`);
    clients.add(res);
    const ping = setInterval(() => res.write(`: ping\n\n`), 25000);
    req.on("close", () => { clearInterval(ping); clients.delete(res); });
    return;
  }
  if (u.pathname === "/api/health") return send(res, 200, { ok: !snapshot.error, updatedAt: snapshot.updatedAt, pools: snapshot.pools.length, error: snapshot.error, clients: clients.size });
  if (u.pathname === "/api/config") return send(res, 200, publicConfig());
  if (u.pathname === "/api/launchpads") return send(res, 200, launchpads.status());
  if (u.pathname === "/api/new") return send(res, 200, { updatedAt: snapshot.updatedAt, tokens: snapshot.newTokens || [] });
  if (u.pathname.startsWith("/api/lookup/")) {
    const addr = decodeURIComponent(u.pathname.slice(12)).trim().toLowerCase();
    if (!/^0x[0-9a-f]{40}$/.test(addr)) return send(res, 400, { error: "send a 0x… contract address (40 hex characters)" });
    lookupToken(addr).then((d) => send(res, 200, d)).catch((e) => send(res, 502, { error: String(e.message || e) }));
    return;
  }
  if (u.pathname === "/" || u.pathname === "/index.html") {
    try { return send(res, 200, renderIndex(req), "text/html; charset=utf-8"); } catch (e) { return send(res, 500, { error: "index missing" }); }
  }
  // static assets from public/ (favicon, og image, optional logo); no directory traversal
  const rel = path.normalize(decodeURIComponent(u.pathname)).replace(/^([/\\.])+/, "");
  const file = path.join(PUB, rel), ext = path.extname(file).toLowerCase();
  if (file.startsWith(PUB + path.sep) && MIME[ext]) {
    return fs.readFile(file, (err, buf) => {
      if (err) return send(res, 404, { error: "not found" });
      res.writeHead(200, { "content-type": MIME[ext], "cache-control": "public, max-age=86400" });
      res.end(buf);
    });
  }
  send(res, 404, { error: "not found" });
});

if (require.main === module) {
  server.listen(CFG.port, CFG.host, () => console.log(`FISHY on http://${CFG.host}:${CFG.port} · chain=${CFG.chain} · demoFallback=${CFG.demoFallback}`));
  const stop = () => { console.log("shutting down"); for (const c of clients) c.end(); server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 3000).unref(); };
  process.on("SIGTERM", stop); process.on("SIGINT", stop);
  refresh();
  setInterval(refresh, CFG.refreshMs);
  // launchpad scanner (needs RPC_URL; set LAUNCHPAD_SCAN=0 to switch off)
  if (process.env.LAUNCHPAD_SCAN !== "0") {
    let busy = false;
    const tick = async () => { if (busy) return; busy = true; try { await launchpads.scan(); } catch (e) { console.warn("launchpad scan:", e.message); } busy = false; };
    tick(); setInterval(tick, +process.env.LAUNCH_SCAN_MS || 20000);
  }
}
module.exports = { normalize, tokenExits, chainIndex, category, swapTestToken };
