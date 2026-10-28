# FISHY

*Is this token fishy?*

Satu cek, dua jawaban untuk setiap token kripto di Robinhood Chain (token saham tidak dihitung):

1. **Real volume**: berapa persen volume yang asli (Honesty / H).
2. **Exit**: berapa yang bisa dijual sebelum harga turun 1%, 5%, atau 10%.

Kedua jawaban digabung menjadi grade A–F.

## Jalankan

Node 18 atau lebih baru, tanpa dependensi.

```bash
node server.js
# buka http://localhost:8787
```

Secara lokal, kalau data DexPaprika belum masuk, halaman otomatis berjalan dengan data demo (label DEMO di header). Di mainnet, set `DEMO_FALLBACK=0`.

## Deploy ke Railway (mainnet)

FISHY adalah satu server Node 18+ **tanpa dependensi**. Server ini sekaligus menyajikan halaman web, API JSON, dan SSE live.

### 1. Upload ke GitHub
```bash
cd fishy
git init
git add .
git commit -m "FISHY mainnet"
git branch -M main
git remote add origin https://github.com/USERNAME/fishy.git
git push -u origin main
```
File `.env` sudah masuk `.gitignore`, jadi API key tidak ikut ter-upload.

### 2. Buat service di Railway
1. Buka railway.com, lalu pilih **New Project → Deploy from GitHub repo**, dan pilih repo `fishy`.
2. Railway membaca `railway.json`: start `node server.js`, healthcheck `/api/health`, dan restart otomatis kalau crash.
3. Buka **Settings → Networking → Generate Domain**, atau sambungkan domainmu sendiri.
4. Buka **Variables**, lalu isi variabel dari `.env.example` (lihat tabel di bawah). Railway otomatis me-redeploy setiap kali variabel berubah.

`PORT` jangan diisi, karena Railway mengisinya sendiri. Server mendengarkan di `0.0.0.0`.

### 3. Variabel yang wajib atau sebaiknya kamu isi

| Variabel | Contoh | Keterangan |
|---|---|---|
| `NODE_ENV` | `production` | |
| `DEMO_FALLBACK` | `0` | **Wajib 0 di mainnet.** Kalau DexPaprika gagal, muncul layar "The lake is frozen" yang otomatis mencoba lagi setiap 30 detik, bukan data demo. |
| `SITE_URL` | `https://fishy.up.railway.app` | Dipakai untuk link preview (og:image) saat dibagikan di X |
| `X_URL` | `https://x.com/handle_kamu` | Tombol X di navbar |
| `X_HANDLE` | `handle_kamu` | Ditampilkan sebagai @handle |
| `TOKEN_CA` | `0x…` | Alamat kontrak token. Kalau kosong, tampil "COMING SOON". |
| `TOKEN_SYMBOL` | `$FISHY` | |
| `EXPLORER_URL` | URL explorer Robinhood Chain | Kalau diisi, CA bisa diklik ke `EXPLORER_URL/address/<CA>` |
| `DEXPAPRIKA_BASE` | `https://api.dexpaprika.com` | Biarkan default |
| `DEXPAPRIKA_API_KEY` | – | Hanya kalau memakai paket berbayar DexPaprika |
| `DEXPAPRIKA_API_KEY_HEADER` | `authorization` | Nama header untuk API key. Sesuaikan dengan dokumentasi paket DexPaprika-mu. |
| `CHAIN` | `robinhood` | Network id DexPaprika |
| `RPC_URL` | `https://rpc.mainnet.chain.robinhood.com` | Dipakai SWAP TEST. Ganti dengan RPC privat kalau trafik tinggi. |

Variabel lain (`POOL_PAGES`, `REFRESH_SECONDS`, `MIN_LIQUIDITY`, …) sudah punya default yang aman. Daftar lengkapnya ada di tabel **Env** di bawah.

### 4. Cek setelah deploy
- `https://domainmu/api/health` harus mengembalikan `"ok": true` dan jumlah `pools` > 0.
- Di halaman, indikator di kiri header harus berubah dari **DEMO** menjadi **LIVE**.
- `https://domainmu/api/config` menampilkan X, CA, dan pengaturan lain yang dipakai navbar.

Catatan:
- Histori SHARK WATCH (serangan) disimpan di memori, jadi akan kosong lagi setiap redeploy atau restart. Untuk histori permanen, nanti perlu database (misalnya Railway Postgres).
- `/api/swaptest` sudah diberi cache 60 detik dan batas 4 permintaan bersamaan, supaya RPC publik tidak dibanjiri.
- Tanpa API key, DexPaprika hanya memberi halaman pertama (100 pool teratas), jadi default-nya `POOL_PAGES=1`. Halaman berikutnya (`cursor`) butuh paket berbayar.
- Simbol token diambil lewat `detailed=true`. Kalau ada yang masih kosong, server mengambilnya dari endpoint token DexPaprika, maksimal `TOKEN_LOOKUPS_PER_REFRESH` (default 25) per refresh, dan menyimpannya di cache.
- Dengan default (1 halaman, `REFRESH_SECONDS=60`), pemakaiannya sekitar 43 ribu request per bulan, ditambah beberapa lookup token di awal.

### Jalankan lokal
```bash
npm run dev     # pakai data demo kalau DexPaprika tidak bisa dihubungi
npm start       # sama seperti produksi
```

## Token baru + paste CA (CHECK)

- **Paste CA:** kotak pencarian di CHECK menerima alamat kontrak (`0x…`, 40 karakter). Kalau token itu belum ada di pool yang dipantau, server mengambil semua pool-nya dari DexPaprika (`/networks/robinhood/pools/search?token_address=…`, cache 60 detik), lalu CHECK langsung menilainya.
- **Chip 🔥 TOP / 🆕 NEW** di atas adegan: TOP menampilkan 12 token dengan volume terbesar, sedangkan NEW menampilkan 12 token terbaru beserta umurnya (klik untuk mengecek). Pilihannya diingat di browser.
- **Panel NEW TOKENS · ROBINHOOD CHAIN** (di bawah adegan danau): pool terbaru di chain, diambil di setiap refresh dengan `order_by=created_at`. Setiap baris berisi:
  - simbol dan nama token, dengan label **NEW** kalau umurnya di bawah 1 jam
  - umur, market cap (FDV dari DexPaprika), dan likuiditas
  - CA dengan tombol **COPY**
  - tombol **CHECK** untuk membuka token itu di CHECK
  - tombol **asal token**, yang menyesuaikan dari mana token itu diluncurkan:
    - **PONS ↗** (kuning): server memanggil `graduationStatus(token)` di kontrak factory/locker Pons. Kalau hasilnya valid, token itu diluncurkan lewat Pons.
    - **FLAP ↗** (ungu): menurut dokumentasi Flap, token Flap di Robinhood Chain memakai alamat vanity yang berakhiran `8888` (standar) atau `7777` (tax token).
    - **DEX ↗** (biru): selain dua di atas, membuka halaman token di DexPaprika.
    - Hasil deteksi disimpan di cache. Hasil "DEX" dicek ulang setiap 30 menit.
- Template link (`{ca}` diganti alamat token):
  - `PONS_TOKEN_URL` = `https://ponsfamily.com/launchpad/{ca}`
  - `FLAP_TOKEN_URL` = `https://flap.sh/robinhood/{ca}` (**belum dipastikan**: cek satu token di Flap, lalu sesuaikan di Railway)
  - `DEX_TOKEN_URL` = `https://dexpaprika.com/robinhood/token/{ca}`
  - `PONS_CONTRACTS` = daftar kontrak Pons yang dicek (default: factory dan locker aktif serta lama, dari dokumentasi Mobula)
### Scanner launchpad on-chain (Pons, Flap, dan launchpad lain)

DexPaprika hanya mengindeks Uniswap V2/V3/V4 di Robinhood Chain, jadi token yang masih di bonding curve launchpad tidak pernah muncul di sana. Karena itu server juga membaca chain langsung lewat `RPC_URL` (file `launchpads.js`), setiap 20 detik:

- **Pons V2**: event `TokenLaunched` di factory `0x7ed598bc…7ec7e`, lalu `CurveBuy`/`CurveSell` di kontrak curve tiap token. Dari situ FISHY menghitung harga, market cap (dalam USD lewat harga WETH dari DexPaprika) dan progres menuju graduation (`BONDING 25%`).
- **Flap dan launchpad lain** (hood.fun, LaunchHood, Virtuals, Klik, Doppler, Ape.store, Bags, Clanker, pools.trade, trench): token ERC-20 baru yang di-mint ke kontrak launchpad, atau di transaksi yang dikirim ke kontrak launchpad (aturan yang sama dipakai Bitquery). Token Flap juga dikenali dari alamat vanity `8888`/`7777`.
- Token yang sudah punya pool di DexPaprika ditandai **GRADUATED**, tapi tombolnya tetap ke launchpad asalnya.
- Saat start, scanner membaca mundur `LAUNCH_BACKFILL_BLOCKS` blok (default 60.000). Ukuran range `eth_getLogs` otomatis mengecil kalau RPC menolak range besar.
- Status scanner: `GET /api/launchpads` (blok terakhir, jumlah token, error terakhir). Kalau `tracked` tetap 0 dan ada `lastError`, RPC publik kemungkinan membatasi `eth_getLogs`: pakai RPC privat (Alchemy/QuickNode/dll) di `RPC_URL`.
- Tombol launchpad lain (oranye, misalnya `HOOD.FUN ↗`) membuka halaman token di explorer (`EXPLORER_URL`), atau DexPaprika kalau explorer tidak diisi.

| Variabel | Default | |
|---|---|---|
| `LAUNCHPAD_SCAN` | `1` | `0` = matikan scanner |
| `LAUNCH_SCAN_MS` | `20000` | jeda antar scan |
| `LAUNCH_BACKFILL_BLOCKS` | `60000` | berapa blok ke belakang saat start |
| `LAUNCH_MAX_RANGE` | `20000` | range awal `eth_getLogs` |
| `PONS_V2_FACTORY` | `0x7ed598bcef8bd9edd8c97a195c6d13f40801ec7e` | factory Pons V2 |
| `LAUNCHPADS_JSON` | – | tambah/ganti launchpad: `[{"key":"x","name":"X","addrs":["0x…"]}]` |

- API: `GET /api/new` → daftar token terbaru · `GET /api/lookup/<CA>` → semua pool token itu.
- Kuota: ada 1 request tambahan per refresh untuk pool terbaru (sekitar 43 ribu per bulan dengan `REFRESH_SECONDS=60`), ditambah lookup CA dari pengguna.

| Variabel | Default | |
|---|---|---|
| `PONS_TOKEN_URL` | `https://ponsfamily.com/launchpad/{ca}` | link tombol PONS |
| `FLAP_TOKEN_URL` | `https://flap.sh/robinhood/{ca}` | link tombol FLAP (cek formatnya) |
| `DEX_TOKEN_URL` | `https://dexpaprika.com/robinhood/token/{ca}` | link tombol DEX |
| `NEW_TOKENS_LIMIT` | 60 | jumlah token baru yang ditampilkan |

## Tampilan

Seluruh UI bergaya game pixel RPG: panel kayu dengan isi perkamen, judul berupa tab hijau, tombol pixel, dan font Pixelify Sans / Press Start 2P.

**CHECK · Robin memancing di danau pegunungan.** Tokohnya Robin Hood dari legenda rakyat (berjanggut, topi hijau berbulu merah), bukan logo Robinhood. Latarnya gunung bersalju, bukit, pohon, dan air danau.
- **Kedalaman dasar laut** = berapa yang bisa dijual sebelum harga turun 5%. Tiang dermaga di kanan menjadi penggaris ($10 sampai $10M). **Gosong pasir** berarti tidak ada jalan keluar.
- **Ikan** = volume asli. Semakin banyak ikan, semakin besar volume aslinya. Setiap ikan mewakili satu pool: **ikan besar** berarti pool yang membawa ≥25% volume asli token itu, **ikan kecil** berarti pool yang lebih kecil. Ikan yang melompat juga menandakan volume asli.
- **Label di adegan** (tombol **LABELS ON/OFF** di kotak "How to read") menunjuk langsung ke air, dasar danau, ikan besar dan kecil, bebek, kail, dan penggaris, lengkap dengan angkanya. Pilihan on/off diingat di browser. **Bebek karet** = volume palsu.
- **Kail** turun sampai kedalaman ukuran jualmu (slider "probe"). Gelembung "!" muncul saat ikan tertangkap. Saat kail ditarik, permukaan laut turun sesuai dampak harga. Kalau kail mentok di dasar, ukuran jualmu **terlalu besar**.
- **Robin bergerak mengikuti siklus memancing:** joran diayun lalu dicambukkan saat melempar, melengkung dan Robin kaget saat ikan menggigit, Robin bersandar dengan gulungan berputar saat menarik, lalu mengangkat ikan tangkapan dengan kilauan. Kalau ukuran jualnya terlalu besar, joran melengkung keras dan Robin gemetar berkeringat.
- Garis arus samar di dalam laut memisahkan pool-pool token itu.
- **Kolam di pantai bawah** = token lain dengan skala yang sama. Klik untuk memeriksanya.
- **Kotak dialog Robin** merangkum hasil cek. **RANK** = grade A–F.

**SWAP TEST · di danau.** Robin melempar koin dari perahu, menangkap ikan token, lalu membawa hasilnya ke peti di dermaga. 🐦 Camar menyambar LP fee, 🪙 koin yang tenggelam = dampak harga, dan 🦀 kepiting di tiang dermaga mencuri potongan hook.

## Badge Robinhood Chain

Di kanan atas ada badge **BUILT ON ROBINHOOD CHAIN · ID 4663** dengan ikon rantai pixel buatan sendiri. Logo resmi Robinhood Chain tidak disertakan karena itu merek milik Robinhood.

Kalau kamu punya izin memakai logo resminya (cek pedoman merek Robinhood), simpan file logonya sebagai `public/robinhood-chain-logo.svg`. Logo itu akan otomatis tampil di dalam badge. Kalau file-nya tidak ada, slot itu disembunyikan.

## Animasi (GSAP)

Animasi bagian HTML memakai GSAP 3.12.5 dari cdnjs: intro logo dan tab, panel yang muncul berurutan saat pindah tab, ilustrasi yang memantul, tombol yang memantul saat ditekan, angka yang berkedip saat berubah, baris tabel yang meluncur masuk, dan cap AUTOPSY yang dihentakkan.

Kalau GSAP gagal dimuat (misalnya offline) atau pengguna memilih *reduce motion* di sistemnya, halaman tetap berjalan normal tanpa animasi itu.

## Modul LARP SCAN

Tab **LARP SCAN** menjawab pertanyaan: *apakah token ini berpura-pura jadi sesuatu yang bukan dirinya?* Semua sinyal dihitung dari data DexPaprika saja (simbol, nama, alamat kontrak, umur pool, kedalaman).

"Original" sebuah ticker adalah token dengan likuiditas terdalam, lalu yang tertua.

| Sinyal | Poin | Kapan menyala |
|---|---|---|
| Same ticker as a deeper token | +55 | ticker sama dengan token lain yang ≥3× lebih dalam |
| Ticker shared, no clear original | +20 | beberapa kontrak memakai ticker sama tanpa pemenang jelas |
| One letter away from a bigger token | +25 | beda 1 huruf dari token yang ≥20× lebih dalam |
| Look-alike characters | +15 | angka dipakai sebagai huruf (R0BIN, FR0G) |
| Uses a famous name | +35 | nama/ticker memuat merek (Robinhood, Hood, Uniswap, …) |
| Calls itself "official"/"real" | +20 | nama memuat OFFICIAL, REAL, AIRDROP |
| Brand-new and hyped | +10 | umur < 3 hari, volume > $200K, volume asli < 50% |

Skor 0–100. ≥ 60 = **LIKELY LARP**, 35–59 = **SUSPICIOUS**.

- **Gel identitas (seperti tes DNA)**: satu jalur per token. Jalur pertama adalah token asli, atau node BRAND kalau mereknya tidak punya token resmi. Setiap baris adalah satu ciri: TICKER, SPELLING, NAME, BRAND (ciri "tampilan"), serta CONTRACT, AGE, DEPTH, REAL VOL (ciri "substansi"). Pita yang tepat di garis referensi berarti ciri itu ditiru (=), pita yang menyimpang berarti berbeda (≠). LARP biasanya meniru tampilannya, tapi substansinya berbeda.
- **Panel**: Evidence (sinyal + poin), Fingerprint (token ini vs original), dan Clone Registry (semua token yang ditandai di chain).
- Tambahkan `#larp` di akhir URL untuk langsung membuka tab ini.

Catatan: ini heuristik. Token yang memakai merek tidak otomatis penipuan, tapi namanya belum terverifikasi sebagai resmi.

## Modul SHARK WATCH

Penjaga sungai yang mencatat setiap penarikan likuiditas mendadak. Modul ini dulu bernama SEISMOGRAPH.

- Setiap refresh (default 60 detik), server membandingkan likuiditas tiap pool dengan snapshot sebelumnya.
- Pool yang kehilangan **≥30%** likuiditasnya dalam satu kali refresh tercatat sebagai serangan.
- Magnitudo: `M = log₁₀(USD hilang) × persentase turun × 1,6`, maksimal 9,9. Magnitudo menentukan predatornya:
  - 🐟 M1–3, minnow: penarikan biasa
  - 🐊 M4–5, gator: holder besar keluar
  - 🦈 M6–7, shark: kemungkinan rug
  - 🐙 M8+, kraken: pool dikosongkan
- **Cara membaca adegan:**
  - Sungai adalah garis waktu: kiri = lebih lama, kanan = sekarang (menara jaga Robin di dermaga).
  - Posisi horizontal predator = kapan kejadiannya. Kedalaman dan ukurannya = magnitudo, dengan penggaris M2–M8 di kiri.
  - **Perairan merah** di bawah garis M6 = zona bahaya.
  - Pelampung di permukaan menandai pool yang diserang. Gelembung naik dari predator ke pelampungnya.
- Serangan baru memainkan animasi: predator naik, menyambar pelampung, lalu tenggelam lagi. Untuk M6+, lonceng di menara berdering, layar berkedip merah, dan muncul banner **SHARK ATTACK!** atau **KRAKEN ATTACK!**.
- Klik predator untuk memilih tokennya. Token yang sedang dipilih diberi panah kuning "YOURS".
- Panel: Shark Sightings (dengan tombol AUTOPSY), Watchtower, dan Predator Scale. Rentang waktu bisa diganti: 15 menit, 2 jam, atau 24 jam.
- Server juga mengirim serangan baru lewat SSE (event `quake`).

Keterbatasan:
- Serangan hanya tercatat sejak server berjalan.
- Hanya pool yang masuk daftar teratas yang ditarik (`POOL_PAGES × 100`) yang diawasi.
- Di mode demo, serangan adalah contoh ilustrasi, dan sesekali muncul serangan demo baru supaya sungainya terlihat hidup.

## Modul AUTOPSY

"Surat kematian" untuk token yang mati. Linimasa kasus berisi harga, likuiditas, dan volume. Untuk pool teratas sebuah token, datanya diambil dari OHLCV pool DexPaprika dan histori likuiditas di server.

Penyebab kematian ditentukan sebagai berikut:

| Penyebab | Aturan |
|---|---|
| LIQUIDITY PULLED | likuiditas turun ≥80% dalam satu pembacaan (atau serangan ≥ M6 dengan penurunan ≥80%) |
| DUMPED | harga ≥70% di bawah puncaknya |
| BORN DEAD | likuiditas tidak pernah mencapai $1.000 |
| ABANDONED | volume di seperempat terakhir linimasa < 5% dari puncaknya |
| ALIVE | tidak ada tanda keruntuhan |

Panel: sertifikat dengan cap penyebab ("probable, not proof of intent"), Findings (gabungan temuan dari CHECK, LARP SCAN, dan SHARK WATCH), Vital Signs, dan Case Files.

Di mode demo, kasus kematian dan serangan adalah contoh ilustrasi.

URL langsung ke tab: `#larp`, `#seis`, `#aut`, `#swap`, `#road`.

## Modul SWAP TEST

Simulasi **beli lalu jual kembali** lewat quoter Uniswap yang asli di Robinhood Chain (`eth_call`, hanya membaca, tanpa wallet). Hasilnya menunjukkan berapa uang yang benar-benar hilang, termasuk potongan **hook** Uniswap V4 yang tidak terhitung oleh rumus perkiraan di CHECK.

- **V4:** PoolKey (currency, fee, tickSpacing, hook) dibaca dari event `Initialize` di PoolManager, lalu dua kali `V4Quoter.quoteExactInputSingle`.
- **V3:** `QuoterV2.quoteExactInputSingle`. **V2:** `UniswapV2Router02.getAmountsOut`.
- **Izin hook** dibaca dari 14 bit terbawah alamat hook. `beforeSwapReturnsDelta` / `afterSwapReturnsDelta` berarti hook bisa memotong setiap swap; `beforeSwap` / `beforeRemoveLiquidity` berarti hook bisa mengubah atau memblokir.
- **Pajak hook (perkiraan)** = rugi round trip − (2 × LP fee + dampak harga dari rumus pool).
- **Verdict:**
  - **HOOK TRAP**: rugi ≥ 50% di pool ber-hook
  - **NO EXIT**: rugi ≥ 50% tanpa hook
  - **HOOK TAX**: pajak hook ≥ 10%
  - **EXPENSIVE**: rugi ≥ 10%
  - **CLEAN**: di bawah itu
- Setiap hasil menyertakan `eth_call` lengkap yang bisa disalin dan dijalankan ulang di RPC mana pun.

Alamat kontrak diambil dari [Uniswap deployments chain 4663](https://github.com/Uniswap/contracts/blob/main/deployments/4663.md): PoolManager `0x8366…0951`, V4Quoter `0x8dc1…8f94`, QuoterV2 `0x33e8…a9e7`, V2Router02 `0x89e5…9eba`.

Keterbatasan:
- Pajak transfer token tidak ikut dalam quote.
- Hasil bisa berubah antar blok.
- Fee V3 dibaca dari field `fee` DexPaprika, yang satuannya belum dipastikan.

`GET /api/swaptest/:tokenId?usd=100` → hasil per pool (maksimal `SWAP_TEST_POOLS`, default 4).

## Rumus

- `real = min(volume, likuiditas × 10)`. Pool dengan likuiditas di bawah $1.000 dianggap volumenya 0.
- `H = real / reported`
- `R = Σ likuiditas/2` dari pool yang bukan debu
- `Δp(x) = x / (R + x)`, perkiraan dampak harga constant-product. Pool V3/V4 bisa lebih dalam atau lebih tipis dari perkiraan ini.
- `exit₅ = R × 0,05 / 0,95`
- `grade = ½·H + ½·log₁₀(exit₅)/5` → A ≥ 0,85 · B ≥ 0,7 · C ≥ 0,5 · D ≥ 0,3 · F

## Env

| Variabel | Default | |
|---|---|---|
| `PORT` | 8787 | |
| `CHAIN` | robinhood | network id DexPaprika |
| `POOL_PAGES` | 2 | 100 pool per halaman |
| `REFRESH_SECONDS` | 60 | 2 halaman/menit ≈ 86 ribu request/bulan (kuota gratis 200 ribu) |
| `MIN_LIQUIDITY` | 1000 | batas pool debu |
| `TURNOVER` | 10 | batas putaran harian yang wajar |
| `STOCK_SYMBOLS` | TSLA,NVDA,… | simbol token saham yang dibuang |
| `INCLUDE_STOCKS` | – | isi `1` kalau mau token saham ikut dihitung lagi |
| `QUAKE_MIN_DROP` | 0.3 | penurunan minimum agar tercatat sebagai serangan |
| `QUAKE_MIN_LIQUIDITY` | 2000 | likuiditas minimum pool sebelum serangan dihitung |
| `POOL_HISTORY_POINTS` | 1440 | jumlah titik histori per pool di memori |
| `RPC_URL` | rpc.mainnet.chain.robinhood.com | RPC untuk SWAP TEST |
| `V4_QUOTER` · `V4_POOL_MANAGER` · `V3_QUOTER` · `V2_ROUTER` | alamat resmi Uniswap | ganti kalau perlu |
| `SWAP_TEST_POOLS` | 4 | pool per token yang diuji |
| `DEXPAPRIKA_API_KEY` | – | opsional |
| `DEXPAPRIKA_API_KEY_HEADER` | authorization | nama header API key |
| `DEMO_FALLBACK` | 1 lokal, 0 kalau `NODE_ENV=production` | pakai data demo saat DexPaprika gagal |
| `HOST` | 0.0.0.0 | |
| `SITE_URL` · `X_URL` · `X_HANDLE` · `TOKEN_CA` · `TOKEN_SYMBOL` · `EXPLORER_URL` · `BUY_URL` | – | info di navbar dan link preview |

## API

- `GET /api/token/:simbol_atau_alamat?size=1000` → honesty, grade, exit1/5/10, door, impact, youGet
- `GET /api/pools` · `GET /api/index` · `GET /api/stream` (SSE: `pools`, `quake`) · `GET /api/health`
- `GET /api/quakes` → daftar serangan + aktivitas likuiditas
- `GET /api/history/:poolId` → histori likuiditas/volume/harga pool sejak server berjalan
- `GET /api/ohlcv/:poolId` → OHLCV 7 hari (per jam) dari DexPaprika, cache 5 menit
