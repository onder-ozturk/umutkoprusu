const timelineData = [
  {
    period: "Ocak 2026",
    subtitle: "1. Dönem — Aralık 2025",
    status: "completed",
    summary:
      "Proje yönetimi, gereksinim analizi ve temel teknik altyapının kurulumu",
    completed: [
      {
        category: "Proje Yönetimi",
        items: [
          "Klinik, danışan ve yönetici rollerini kapsayan paydaş analizi tamamlandı",
          "Kapsam, teslimatlar ve MVP sınırları netleştirildi",
          "SRS v0.1–v0.2 yazıldı; kritik kullanıcı senaryoları ve kabul kriterleri belirlendi",
        ],
      },
      {
        category: "Teknik Altyapı",
        items: [
          "Mimari karar: Next.js + iOS/Android + Node/NestJS + PostgreSQL",
          "Git depo yapısı kuruldu, temel CI/CD hattı devreye alındı",
          "Staging ortamında otomatik derleme/test akışı çalışır hâle getirildi",
        ],
      },
      {
        category: "Güvenlik & Uyum",
        items: [
          "KVKK/GDPR çerçevesinde ön değerlendirme başlatıldı",
          "Veri envanteri iskeleti çıkarıldı",
          "Şifreleme, erişim rolleri ve günlükleme ilk kontrolleri uygulandı",
        ],
      },
      {
        category: "Klinik Çerçeve",
        items: [
          "PHQ-9, GAD-7, C-SSRS/ASQ kullanım ilkeleri, eşik değer mantığı ve uyarı akışları taslaklandı",
          "Etik kurul başvurusu için onam formları ve protokol özeti hazırlandı",
          "Danışan/klinisyen wireframe'leri ve WCAG 2.1 erişilebilirlik + i18n planı tasarlandı",
        ],
      },
      {
        category: "Veri Bilimi",
        items: [
          "Risk sınıflandırma için taban çizgisi yaklaşımı ve AUROC/AUPRC metrikleri belirlendi",
          "Sentetik veri üretim kuralları yazıldı",
          "FHIR Mapping v0.1 hazırlandı",
        ],
      },
    ],
    pending: [
      "Gerçek hasta verisi entegrasyonu — etik kurul onayı bekleniyor",
      "FHIR sandbox entegrasyonu — erişim yetkileri tanımlanmadı",
      "Konuşma işleme modülü — lisanslı veri tedariki ertelendi",
    ],
    outputs: [
      "SRS v0.2",
      "MVP yol haritası & yüksek seviye zamanlama",
      "Hedef mimari diyagramı",
      "Çalışan CI/CD hattı",
      "KVKK/GDPR ön değerlendirmesi",
      "Etik başvuru paketi",
      "FHIR Mapping v0.1",
      "Danışan/klinisyen wireframe'leri",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-sm font-medium text-blue-600 mb-1">
            KEREGE Yazılım Bilişim Teknolojileri A.Ş.
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            AffectLog-TR
          </h1>
          <p className="text-gray-500 mt-1">
            Dijital Psikolojik Destek Platformu — Proje İlerleme Zaman Çizelgesi
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span>
              <span className="font-medium">Başlangıç:</span> 05.12.2025
            </span>
            <span>
              <span className="font-medium">Tahmini Bitiş:</span> 05.12.2027
            </span>
            <span>
              <span className="font-medium">Yönetici:</span> Önder Öztürk
            </span>
            <span>
              <span className="font-medium">Bütçe:</span> 4.092.000 TL
            </span>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

          {timelineData.map((entry, i) => (
            <div key={i} className="relative pl-14 pb-12">
              {/* Dot */}
              <div className="absolute left-3.5 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-500" />

              {/* Period badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold text-gray-900">
                  {entry.period}
                </span>
                <span className="text-sm text-gray-500">{entry.subtitle}</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Tamamlandı
                </span>
              </div>

              <p className="text-gray-600 mb-6">{entry.summary}</p>

              {/* Completed work */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Dönem İçinde Tamamlananlar
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {entry.completed.map((cat, j) => (
                    <div key={j} className="px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        {cat.category}
                      </p>
                      <ul className="space-y-1.5">
                        {cat.items.map((item, k) => (
                          <li key={k} className="flex gap-2 text-sm text-gray-700">
                            <span className="mt-0.5 shrink-0 text-green-500">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending */}
              <div className="bg-white rounded-xl border border-amber-200 overflow-hidden mb-4">
                <div className="px-4 py-3 bg-amber-50 border-b border-amber-200">
                  <h3 className="text-sm font-semibold text-amber-700">
                    Ertelenen / Tamamlanamayan Faaliyetler
                  </h3>
                </div>
                <ul className="divide-y divide-amber-50">
                  {entry.pending.map((item, j) => (
                    <li key={j} className="flex gap-2 px-4 py-3 text-sm text-gray-700">
                      <span className="mt-0.5 shrink-0 text-amber-400">⏳</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outputs */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Dönem Çıktıları
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-4">
                  {entry.outputs.map((output, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Future placeholder */}
          <div className="relative pl-14">
            <div className="absolute left-3.5 top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white ring-2 ring-gray-300" />
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-400">
                Şubat 2026
              </span>
              <span className="text-sm text-gray-400">2. Dönem</span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                Devam ediyor
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
