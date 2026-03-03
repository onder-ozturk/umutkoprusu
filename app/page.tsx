"use client";
import { useState } from "react";

const timelineData = [
  {
    period: "Aralık 2025",
    subtitle: "1. Dönem",
    status: "completed",
    summary: "Proje yönetimi, gereksinim analizi ve temel teknik altyapının kurulumu",
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
          "Danışan/klinisyen wireframe'leri ve WCAG 2.1 + i18n planı tasarlandı",
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
      "MVP yol haritası",
      "Mimari diyagram",
      "CI/CD hattı",
      "KVKK/GDPR değerlendirmesi",
      "Etik başvuru paketi",
      "FHIR Mapping v0.1",
      "Wireframe'ler",
    ],
  },
  {
    period: "Ocak 2026",
    subtitle: "2. Dönem",
    status: "ongoing",
    summary: "",
    completed: [],
    pending: [],
    outputs: [],
  },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const entry = timelineData[selected];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-sm font-medium text-blue-600 mb-1">
            KEREGE Yazılım Bilişim Teknolojileri A.Ş.
          </p>
          <h1 className="text-2xl font-bold text-gray-900">AffectLog-TR</h1>
          <p className="text-gray-500 mt-1">
            Dijital Psikolojik Destek Platformu — Proje İlerleme Zaman Çizelgesi
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span><span className="font-medium">Başlangıç:</span> 05.12.2025</span>
            <span><span className="font-medium">Tahmini Bitiş:</span> 05.12.2027</span>
            <span><span className="font-medium">Yönetici:</span> Önder Öztürk</span>
            <span><span className="font-medium">Bütçe:</span> 4.092.000 TL</span>
          </div>
        </div>
      </header>

      {/* Horizontal Timeline Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-6 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {timelineData.map((item, i) => (
              <div key={i} className="flex items-center">
                {/* Node */}
                <button
                  onClick={() => setSelected(i)}
                  className="flex flex-col items-center group"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                      ${selected === i
                        ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-md"
                        : item.status === "completed"
                        ? "bg-green-100 border-green-400 text-green-700 hover:scale-105"
                        : "bg-gray-100 border-gray-300 text-gray-400 hover:scale-105"
                      }`}
                  >
                    {item.status === "completed" ? "✓" : i + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-semibold whitespace-nowrap ${
                        selected === i ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {item.period}
                    </p>
                    <p className="text-xs text-gray-400">{item.subtitle}</p>
                  </div>
                </button>

                {/* Connector line */}
                {i < timelineData.length - 1 && (
                  <div className="w-24 h-0.5 mx-2 mb-6 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {entry.status === "ongoing" ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-4">
              ⏳
            </div>
            <p className="text-lg font-medium text-gray-500">Devam ediyor</p>
            <p className="text-sm mt-1">{entry.period} dönemi henüz tamamlanmadı.</p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{entry.period}</h2>
                <span className="text-sm text-gray-500">{entry.subtitle}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Tamamlandı
                </span>
              </div>
              <p className="text-gray-600">{entry.summary}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Completed */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">Dönem İçinde Tamamlananlar</h3>
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

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Pending */}
                <div className="bg-white rounded-xl border border-amber-200 overflow-hidden">
                  <div className="px-4 py-3 bg-amber-50 border-b border-amber-200">
                    <h3 className="text-sm font-semibold text-amber-700">Ertelenenler</h3>
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
                    <h3 className="text-sm font-semibold text-gray-700">Dönem Çıktıları</h3>
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
            </div>
          </>
        )}
      </main>
    </div>
  );
}
