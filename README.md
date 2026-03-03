# umutköprüsü — AffectLog-TR Proje Zaman Çizelgesi

Canlı site: **[umutköprüsü.com](https://xn--umutkprs-r4a6db.com)**

---

## Proje Hakkında

Bu site, **AffectLog-TR** projesinin 24 aylık yol haritasını görsel ve interaktif bir zaman çizelgesiyle sunar. AffectLog-TR; Türkiye'de ruh sağlığı hizmetlerine erişimi artırmayı hedefleyen, yapay zeka destekli dijital psikolojik destek platformudur.

### Zaman Çizelgesi — 6 Faz

| Faz | Ad | Dönem |
|-----|----|-------|
| Faz 1 | Temel | Ara 2025 – Şub 2026 |
| Faz 2 | Çekirdek Geliştirme | Mar 2026 – Tem 2026 |
| Faz 3 | MVP | Ağu 2026 – Eki 2026 |
| Faz 4 | Pilot | Kas 2026 – Oca 2027 |
| Faz 5 | Kurumsal Entegrasyon | Şub 2027 – May 2027 |
| Faz 6 | İhracat & Ölçek | Haz 2027 – Kas 2027 |

---

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS |
| Derleme | Static Export (`output: "export"`) |
| Barındırma | GitHub Pages |
| CI/CD | GitHub Actions |
| DNS | Cloudflare |
| Alan Adı | GoDaddy → umutköprüsü.com |

---

## Alan Adı ve DNS Yapılandırması

### Süreç

1. **GoDaddy** üzerinde `umutköprüsü.com` alan adı alındı
2. GoDaddy nameserver'ları Cloudflare'e yönlendirildi:
   - `dorthy.ns.cloudflare.com`
   - `joaquin.ns.cloudflare.com`
3. **Cloudflare DNS** kayıtları eklendi:
   - 4 × A kaydı → GitHub Pages IP'leri (`185.199.108-111.153`)
   - CNAME `www` → `onder-ozturk.github.io`
4. GitHub Pages **IDN (Uluslararası Alan Adı)** kabul etmediği için punycode kullanıldı:
   - `umutköprüsü.com` → `xn--umutkprs-r4a6db.com`
5. GitHub alan adı doğrulaması için Cloudflare'e TXT kaydı eklendi:
   - `_github-pages-challenge-onder-ozturk.xn--umutkprs-r4a6db.com`
6. `public/CNAME` dosyasına punycode alan adı yazıldı

---

## Proje Dosya Yapısı

```
umutkoprusu/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions CI/CD iş akışı
├── app/
│   ├── globals.css           # Global stiller
│   ├── layout.tsx            # Kök layout
│   └── page.tsx              # Ana sayfa — 24 aylık interaktif timeline
├── public/
│   └── CNAME                 # GitHub Pages özel alan adı (punycode)
├── next.config.ts            # Next.js statik export yapılandırması
├── package.json
├── tsconfig.json
└── README.md
```

---

## GitHub Actions — Otomatik Dağıtım

`.github/workflows/deploy.yml` dosyası, `main` dalına her push'ta otomatik olarak çalışır:

```
push to main
    ↓
actions/checkout@v4
    ↓
Setup Node.js 20 + npm ci
    ↓
npm run build  (→ ./out/ klasörü oluşur)
    ↓
actions/upload-pages-artifact@v3
    ↓
actions/deploy-pages@v4
    ↓
https://xn--umutkprs-r4a6db.com  ✓
```

---

## Sayfa Düzeni

```
┌──────────────┬────────────────────────────────────┐
│              │  Header (başlık + durum göstergesi) │
│  Sol Menü    ├────────────────────────────────────┤
│  (Faz + Ay   │                                    │
│   linkleri)  │  Ana İçerik (seçili aya ait        │
│              │  klinik & araştırma detayları)     │
│  tam yüksek- │                                    │
│  likte sabit ├────────────────────────────────────┤
│  kaydırılabi-│  Footer (şirket bilgileri)         │
│  lir menü    │                                    │
└──────────────┴────────────────────────────────────┘
```

- Sol sidebar: `w-64 h-full flex-col` — fazlar renkli başlıklarla, altında ay linkleri
- Sağ panel: `flex-col flex-1 h-full overflow-hidden` — header + scrollable main + footer
- Footer: tek satır, tam genişlik, kompakt

---

## Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (hot-reload)
npm run dev
# → http://localhost:3000

# Statik derleme (GitHub Pages çıktısı)
npm run build
# → ./out/ klasörüne HTML/CSS/JS üretir
```

---

## Yapılan İşlemler (Özet)

- [x] GoDaddy alan adını Cloudflare'e bağlama
- [x] Cloudflare DNS kayıtlarını GitHub Pages için yapılandırma
- [x] IDN/punycode dönüşümü (`umutköprüsü.com` → `xn--umutkprs-r4a6db.com`)
- [x] GitHub alan adı doğrulaması (TXT kaydı)
- [x] Next.js projesi oluşturma ve statik export yapılandırması
- [x] GitHub Pages aktifleştirme (workflow kaynağı)
- [x] GitHub Actions CI/CD iş akışı kurma
- [x] 24 aylık AffectLog-TR zaman çizelgesi içeriği yazma (klinik & araştırma odaklı)
- [x] Tam sayfa düzeni: sol sidebar menü + sağda header/içerik/footer
- [x] Sidebar: h-screen içinde bağımsız kaydırma
- [x] Footer: kompakt tek satır, tam genişlik

---

## Repo

GitHub: [onder-ozturk/umutkoprusu](https://github.com/onder-ozturk/umutkoprusu)
