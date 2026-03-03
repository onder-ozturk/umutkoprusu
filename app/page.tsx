"use client";
import { useState } from "react";

type TimelineEntry = {
  period: string;
  subtitle: string;
  status: "completed" | "ongoing" | "planned";
  phase: string;
  summary: string;
  items: { category: string; items: string[] }[];
  pending: string[];
  outputs: string[];
};

const timelineData: TimelineEntry[] = [
  /* ─── AY 1 ─── */
  {
    period: "Aralık 2025",
    subtitle: "1. Dönem",
    status: "completed",
    phase: "Faz 1 — Temel",
    summary: "Proje yönetimi, gereksinim analizi ve temel teknik altyapının kurulumu",
    items: [
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
          "PHQ-9, GAD-7, C-SSRS/ASQ kullanım ilkeleri ve eşik değer mantığı taslaklandı",
          "Etik kurul başvurusu için onam formları ve protokol özeti hazırlandı",
          "Danışan/klinisyen wireframe'leri ve WCAG 2.1 + i18n planı tasarlandı",
        ],
      },
      {
        category: "Veri Bilimi",
        items: [
          "Risk sınıflandırma için AUROC/AUPRC taban çizgisi yaklaşımı belirlendi",
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
    outputs: ["SRS v0.2", "MVP Yol Haritası", "Mimari Diyagram", "CI/CD Hattı", "KVKK/GDPR Değerlendirmesi", "Etik Başvuru Paketi", "FHIR Mapping v0.1", "Wireframe'ler"],
  },

  /* ─── AY 2 ─── */
  {
    period: "Ocak 2026",
    subtitle: "2. Dönem",
    status: "ongoing",
    phase: "Faz 1 — Temel",
    summary: "Detaylı teknik tasarım, veritabanı şeması ve geliştirme ortamlarının tamamlanması",
    items: [
      {
        category: "Teknik Tasarım",
        items: [
          "PostgreSQL şeması tasarımı: alan şifreleme, rol tabanlı erişim",
          "API kontrat tanımları (OpenAPI 3.0) ve servis sınırları",
          "OIDC kimlik yönetimi entegrasyon planı",
        ],
      },
      {
        category: "Geliştirme Ortamı",
        items: [
          "Docker Compose ile yerel geliştirme ortamı standartlaştırma",
          "Test altyapısı: birim, entegrasyon ve e2e katmanları",
          "Kod kalite kuralları ve PR süreçleri",
        ],
      },
      {
        category: "Etik & Düzenleyici",
        items: [
          "Etik kurul başvurusu teslim edilmesi",
          "KVKK Aydınlatma Metni ve Açık Rıza formları taslağı",
        ],
      },
    ],
    pending: [],
    outputs: ["DB Şema v1", "OpenAPI Spec v1", "Geliştirme Ortamı Kılavuzu"],
  },

  /* ─── AY 3 ─── */
  {
    period: "Şubat 2026",
    subtitle: "3. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Tarama modülleri ve kullanıcı kimlik doğrulama altyapısının geliştirilmesi",
    items: [
      {
        category: "Tarama Modülleri",
        items: [
          "PHQ-9 değerlendirme formu — web ve mobil",
          "GAD-7 değerlendirme formu — web ve mobil",
          "Otomatik puanlama ve eşik mantığı",
        ],
      },
      {
        category: "Kimlik & Erişim",
        items: [
          "OIDC tabanlı kayıt / giriş akışı",
          "Rol yönetimi: danışan, uzman, yönetici",
          "Oturum yönetimi ve güvenli token işleme",
        ],
      },
      {
        category: "Arka Uç",
        items: [
          "NestJS temel modül yapısı",
          "Değerlendirme sonucu kayıt API'leri",
          "Birim test kapsamı ≥ %70",
        ],
      },
    ],
    pending: [],
    outputs: ["PHQ-9 / GAD-7 Modülü v1", "Auth Servisi v1", "Test Raporu"],
  },

  /* ─── AY 4 ─── */
  {
    period: "Mart 2026",
    subtitle: "4. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "İntihar riski taraması (C-SSRS) ve risk triyaj motorunun ilk sürümü",
    items: [
      {
        category: "C-SSRS Modülü",
        items: [
          "C-SSRS / ASQ kısa formu akış tasarımı",
          "Kriz eşik mantığı ve yüksek-risk uyarı tetikleyicileri",
          "Güvenli yönlendirme: 112, MHRS, Alo 183 entegrasyonu",
        ],
      },
      {
        category: "Risk Triyaj Motoru v1",
        items: [
          "PHQ-9 + GAD-7 + C-SSRS skorlarını birleştiren kompozit risk hesabı",
          "Düşük / Orta / Yüksek risk sınıflandırması",
          "Geçmiş eğilim analizi (trend bazlı uyarı)",
        ],
      },
      {
        category: "IP Temeli",
        items: [
          "Patent adayı 1 (Risk-Triyaj Motoru) için teknik açıklama belgesi",
          "Ön patent araştırması başlatılması",
        ],
      },
    ],
    pending: [],
    outputs: ["C-SSRS Modülü v1", "Triyaj Motoru v1", "Patent Teknik Belgesi Taslağı"],
  },

  /* ─── AY 5 ─── */
  {
    period: "Nisan 2026",
    subtitle: "5. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Kısa müdahale içerikleri, bildirim sistemi ve mobil uygulama temeli",
    items: [
      {
        category: "Müdahale İçerikleri",
        items: [
          "Düşük–orta risk için kanıta dayalı kısa müdahale modülleri (CBT tabanlı)",
          "İçerik yönetim altyapısı (klinisyen tarafından düzenlenebilir)",
          "İçerik telif ve lisanslama belgesi",
        ],
      },
      {
        category: "Mobil Uygulama",
        items: [
          "React Native temel proje yapısı (iOS + Android)",
          "Tarama modüllerinin mobil adaptasyonu",
          "Push bildirim altyapısı",
        ],
      },
      {
        category: "Bildirim Sistemi",
        items: [
          "Otomatik hatırlatma ve takip bildirimleri",
          "Yüksek-risk alarm bildirimi (uzman paneline)",
        ],
      },
    ],
    pending: [],
    outputs: ["Müdahale İçerik Kütüphanesi v1", "React Native Temel Yapısı", "Bildirim Servisi v1"],
  },

  /* ─── AY 6 ─── */
  {
    period: "Mayıs 2026",
    subtitle: "6. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Uzman paneli, WebRTC görüntülü görüşme altyapısı ve kriz eskalasyon iş akışı",
    items: [
      {
        category: "Uzman Paneli",
        items: [
          "Klinisyen gösterge paneli: danışan listesi, risk rozetleri",
          "Değerlendirme geçmişi görüntüleme ve notlar",
          "Vaka atama ve öncelik sıralama",
        ],
      },
      {
        category: "WebRTC Görüntülü Görüşme",
        items: [
          "Jitsi/Janus SFU kurulumu (kurum içi barındırma)",
          "Şifreli görüşme odaları ve erişim kontrolü",
          "Görüşme kayıt / özet altyapısı (opsiyonel)",
        ],
      },
      {
        category: "Kriz Eskalasyon",
        items: [
          "Çok adımlı kriz iş akışı: uyarı → onaylama → yönlendirme",
          "Patent adayı 3 (Kriz Eskalasyon İş Akışı) için teknik belge",
        ],
      },
    ],
    pending: [],
    outputs: ["Uzman Paneli v1", "WebRTC SFU Altyapısı", "Kriz Eskalasyon Modülü v1"],
  },

  /* ─── AY 7 ─── */
  {
    period: "Haziran 2026",
    subtitle: "7. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Güvenlik sertleştirme, KVKK tam uyum ve on-device gizlilik modülü",
    items: [
      {
        category: "Güvenlik Sertleştirme",
        items: [
          "Penetrasyon testi (harici) ve bulgular düzeltme",
          "OWASP Top 10 taraması ve kapatma raporu",
          "ISO 27001 / 27701 uyum boşluk analizi",
        ],
      },
      {
        category: "KVKK Tam Uyum",
        items: [
          "Veri akış diyagramları ve DPIA (Veri Koruma Etki Değerlendirmesi)",
          "Veri silme / anonimleştirme prosedürleri",
          "İlgili kişi başvuru mekanizması",
        ],
      },
      {
        category: "Gizlilik Modülü",
        items: [
          "Patent adayı 2: on-device değerlendirme ve anonimleştirme hattı geliştirme",
          "Veri minimizasyonu uygulaması",
        ],
      },
    ],
    pending: [],
    outputs: ["Penetrasyon Testi Raporu", "DPIA Belgesi", "ISO 27001 Boşluk Analizi", "Gizlilik Modülü v1"],
  },

  /* ─── AY 8 ─── */
  {
    period: "Temmuz 2026",
    subtitle: "8. Dönem",
    status: "planned",
    phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "FHIR/USVS entegrasyonu, kurumsal raporlama ve sistem entegrasyon testleri",
    items: [
      {
        category: "FHIR & USVS Entegrasyonu",
        items: [
          "HL7 FHIR köprüsü tamamlama (FHIR Mapping v1.0)",
          "USVS/SKRS alan eşlemesi canlı entegrasyon",
          "Gerçek FHIR sandbox testi (etik onay sonrası)",
        ],
      },
      {
        category: "Kurumsal Raporlama",
        items: [
          "Kurum yöneticisi için aggregat istatistik paneli",
          "PDF/CSV rapor dışa aktarma",
          "Denetim günlükleri (audit log) modülü",
        ],
      },
      {
        category: "Entegrasyon Testleri",
        items: [
          "Uçtan uca test senaryoları (tarama → triyaj → yönlendirme)",
          "Yük testi ve performans profili",
        ],
      },
    ],
    pending: [],
    outputs: ["FHIR Mapping v1.0", "Kurumsal Raporlama Modülü", "Entegrasyon Test Raporu"],
  },

  /* ─── AY 9 ─── */
  {
    period: "Ağustos 2026",
    subtitle: "9. Dönem",
    status: "planned",
    phase: "Faz 3 — MVP",
    summary: "Alfa sürümü yayını, dahili kullanıcı testleri ve hata giderme",
    items: [
      {
        category: "Alfa Yayını",
        items: [
          "MVP tüm modülleri birleştirildi: tarama, triyaj, yönlendirme, uzman paneli",
          "Dahili (ekip + danışman) alfa testi başlatıldı",
          "SUS (System Usability Scale) ölçümü başlangıç",
        ],
      },
      {
        category: "Hata Giderme",
        items: [
          "Alfa test geri bildirimleri ile bug backlog oluşturuldu",
          "Kritik P0/P1 hataları kapatıldı",
          "Performans optimizasyonu (API yanıt süreleri)",
        ],
      },
      {
        category: "Dokümantasyon",
        items: [
          "Kullanıcı kılavuzu (danışan, uzman, yönetici)",
          "API dokümantasyonu (Swagger/OpenAPI)",
        ],
      },
    ],
    pending: [],
    outputs: ["MVP Alfa v1.0", "Bug Raporu", "Kullanıcı Kılavuzu", "API Dokümantasyonu"],
  },

  /* ─── AY 10 ─── */
  {
    period: "Eylül 2026",
    subtitle: "10. Dönem",
    status: "planned",
    phase: "Faz 3 — MVP",
    summary: "Beta testi, erişilebilirlik denetimi ve pilot hazırlık",
    items: [
      {
        category: "Beta Testi",
        items: [
          "Dış beta kullanıcıları (≥30 kişi: öğrenci + klinisyen)",
          "ΔPHQ-9 / ΔGAD-7 ön ölçüm alınması",
          "Geri bildirim analizi ve öncelikli iyileştirmeler",
        ],
      },
      {
        category: "Erişilebilirlik",
        items: [
          "WCAG 2.1 AA tam uyum denetimi",
          "i18n altyapısı hazırlığı (EN/AR/DE için çevirme kancaları)",
          "Sağ-sol (RTL) dil desteği testi",
        ],
      },
      {
        category: "Pilot Hazırlık",
        items: [
          "Pilot kurum seçimi ve protokol anlaşmaları",
          "Etik kurul onaylı araştırma protokolü güncelleme",
        ],
      },
    ],
    pending: [],
    outputs: ["MVP Beta v1.1", "WCAG Uyum Raporu", "Pilot Protokolü", "Ön Ölçüm Verileri"],
  },

  /* ─── AY 11 ─── */
  {
    period: "Ekim 2026",
    subtitle: "11. Dönem",
    status: "planned",
    phase: "Faz 3 — MVP",
    summary: "MVP nihai sürüm, AppStore/PlayStore başvuruları ve pilot lansman hazırlığı",
    items: [
      {
        category: "MVP Nihai Sürüm",
        items: [
          "Beta geri bildirim iyileştirmeleri tamamlandı",
          "Güvenlik son denetimi ve imzalama",
          "MVP v1.2 sürümü donduruldu",
        ],
      },
      {
        category: "Mağaza Başvuruları",
        items: [
          "Apple App Store inceleme başvurusu",
          "Google Play Store inceleme başvurusu",
          "Sağlık uygulaması içerik uyumluluk beyanı",
        ],
      },
      {
        category: "Marka & IP",
        items: [
          '"AffectLog-TR" ticari marka Sınıf 9/42 başvurusu (TPE)',
          "Tasarım tescili başvurusu: özgün GUI ekran düzenleri",
        ],
      },
    ],
    pending: [],
    outputs: ["MVP v1.2 (Production)", "App Store Başvuruları", "Ticari Marka Başvurusu"],
  },

  /* ─── AY 12 ─── */
  {
    period: "Kasım 2026",
    subtitle: "12. Dönem",
    status: "planned",
    phase: "Faz 4 — Pilot",
    summary: "Çok merkezli pilot çalışması başlangıcı (≥200 katılımcı)",
    items: [
      {
        category: "Pilot Lansmanı",
        items: [
          "En az 2 üniversite ile pilot anlaşması imzalandı",
          "Katılımcı kayıt süreci başlatıldı (hedef ≥200)",
          "Klinisyen eğitim seminerleri yapıldı",
        ],
      },
      {
        category: "Ölçüm Protokolü",
        items: [
          "T0 (başlangıç) PHQ-9 / GAD-7 / C-SSRS ölçümleri",
          "SUS kullanılabilirlik anketi T0",
          "Veri toplama altyapısı izleme",
        ],
      },
      {
        category: "Destek & İzleme",
        items: [
          "7/24 kriz hattı koordinasyonu",
          "Haftalık pilot ilerleme raporları",
        ],
      },
    ],
    pending: [],
    outputs: ["Pilot Kayıt Raporu", "T0 Ölçüm Verileri", "Klinisyen Eğitim Materyali"],
  },

  /* ─── AY 13 ─── */
  {
    period: "Aralık 2026",
    subtitle: "13. Dönem",
    status: "planned",
    phase: "Faz 4 — Pilot",
    summary: "Pilot orta dönem izleme, platform optimizasyonu ve veri analizi",
    items: [
      {
        category: "Pilot İzleme",
        items: [
          "T1 (6. hafta) PHQ-9 / GAD-7 ara ölçümleri",
          "Katılım ve tutma oranı analizi",
          "Kriz eskalasyon vakalarının incelenmesi",
        ],
      },
      {
        category: "Platform İyileştirme",
        items: [
          "Kullanıcı geri bildirimine dayalı UX iyileştirmeleri",
          "Performans darboğazları giderilmesi",
          "Mobil uygulama güncellemesi (v1.3)",
        ],
      },
    ],
    pending: [],
    outputs: ["T1 Ara Ölçüm Raporu", "Katılım Analizi", "MVP v1.3"],
  },

  /* ─── AY 14 ─── */
  {
    period: "Ocak 2027",
    subtitle: "14. Dönem",
    status: "planned",
    phase: "Faz 4 — Pilot",
    summary: "Pilot tamamlanma ve etki ölçümü analizi",
    items: [
      {
        category: "Etki Ölçümü",
        items: [
          "T2 (son) PHQ-9 / GAD-7 / SUS ölçümleri tamamlandı",
          "ΔPHQ-9 / ΔGAD-7 etki büyüklüğü hesaplandı",
          "İstatistiksel analiz (paired t-test, Cohen's d)",
        ],
      },
      {
        category: "Pilot Raporlama",
        items: [
          "Çok merkezli pilot raporu yazıldı",
          "Akademik yayın taslağı (hakemli dergi hedefi)",
          "TÜBİTAK ara raporu hazırlandı",
        ],
      },
    ],
    pending: [],
    outputs: ["Pilot Etki Analiz Raporu", "Akademik Yayın Taslağı", "TÜBİTAK Ara Raporu"],
  },

  /* ─── AY 15 ─── */
  {
    period: "Şubat 2027",
    subtitle: "15. Dönem",
    status: "planned",
    phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "Kurumsal entegrasyon modülleri ve ölçeklenebilir barındırma altyapısı",
    items: [
      {
        category: "Kurumsal Entegrasyon",
        items: [
          "Üniversite öğrenci bilgi sistemleri ile SSO entegrasyonu",
          "Hastane HIS / HBYS entegrasyon adaptörü",
          "Kurumsal SLA ve veri işleme sözleşme şablonları",
        ],
      },
      {
        category: "Ölçeklenebilir Barındırma",
        items: [
          "Türkiye veri merkezlerinde Kubernetes cluster kurulumu",
          "Yüksek erişilebilirlik (HA) ve felaket kurtarma planı",
          "Otomatik ölçekleme politikaları",
        ],
      },
    ],
    pending: [],
    outputs: ["Kurumsal Entegrasyon Adaptörü", "Kubernetes Altyapısı", "DR Planı"],
  },

  /* ─── AY 16 ─── */
  {
    period: "Mart 2027",
    subtitle: "16. Dönem",
    status: "planned",
    phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "USVS/SKRS canlı entegrasyon, denetim altyapısı ve ISO 27001 belgelendirme",
    items: [
      {
        category: "USVS/SKRS Entegrasyonu",
        items: [
          "USVS vaka bildirim modülü canlı bağlantı",
          "SKRS e-reçete / sevk entegrasyonu",
          "Sağlık Bakanlığı test ortamı onayı",
        ],
      },
      {
        category: "ISO 27001 Belgelendirme",
        items: [
          "ISO 27001 / 27701 denetim başvurusu",
          "İç denetim ve düzeltici faaliyetler",
          "Sertifikasyon hedefi: Q2 2027",
        ],
      },
    ],
    pending: [],
    outputs: ["USVS/SKRS Entegrasyon Belgesi", "ISO 27001 Başvurusu", "İç Denetim Raporu"],
  },

  /* ─── AY 17 ─── */
  {
    period: "Nisan 2027",
    subtitle: "17. Dönem",
    status: "planned",
    phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "B2B SaaS ticari modeli, fiyatlandırma ve ilk kurumsal satış hazırlığı",
    items: [
      {
        category: "Ticari Model",
        items: [
          "B2B SaaS fiyat planları: lisans + kullanıcı başı",
          "On-premise dağıtım paket tanımı",
          "Profesyonel hizmetler kataloğu",
        ],
      },
      {
        category: "Satış & Pazarlama",
        items: [
          "Pilot bulgularına dayalı ROI hesaplama aracı",
          "Ürün tanıtım materyalleri (demo ortamı, vaka çalışmaları)",
          "İlk 5 kurum satış hedefi pipeline'ı",
        ],
      },
    ],
    pending: [],
    outputs: ["SaaS Fiyat Planı", "Satış Materyalleri", "Demo Ortamı"],
  },

  /* ─── AY 18 ─── */
  {
    period: "Mayıs 2027",
    subtitle: "18. Dönem",
    status: "planned",
    phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "Patent başvuruları ve sınai mülkiyet portföyünün tamamlanması",
    items: [
      {
        category: "Patent Başvuruları",
        items: [
          "Patent 1 — Risk-Triyaj Motoru: TR başvurusu teslim",
          "Patent 2 — On-device Gizlilik Modülü: TR başvurusu teslim",
          "Patent 3 — Kriz Eskalasyon İş Akışı: TR başvurusu teslim",
        ],
      },
      {
        category: "IP Portföyü",
        items: [
          "PCT başvurusu değerlendirmesi (uluslararası genişleme)",
          "Ticari marka tescil sonucu takibi",
          "Açık kaynak politikası yayınlandı (MIT/Apache-2.0 bileşenler)",
        ],
      },
    ],
    pending: [],
    outputs: ["3 Patent Başvurusu (TR)", "PCT Değerlendirme Raporu", "Açık Kaynak Politika Belgesi"],
  },

  /* ─── AY 19 ─── */
  {
    period: "Haziran 2027",
    subtitle: "19. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "Uluslararası yerelleştirme: İngilizce, Arapça ve Almanca dil desteği",
    items: [
      {
        category: "Yerelleştirme",
        items: [
          "EN (İngilizce) tam çeviri ve klinik ölçek uyarlaması",
          "AR (Arapça) RTL desteği ve çeviri",
          "DE (Almanca) çeviri ve AB veri mevzuatı uyumu",
        ],
      },
      {
        category: "Klinik Uyarlama",
        items: [
          "Yerel normlar için ölçek eşik değer ayarları",
          "Kültürel uyum değerlendirmesi (danışman psikologlar ile)",
        ],
      },
    ],
    pending: [],
    outputs: ["Çok Dilli Platform (EN/AR/DE)", "Kültürel Uyum Raporu"],
  },

  /* ─── AY 20 ─── */
  {
    period: "Temmuz 2027",
    subtitle: "20. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "Orta Doğu/Kuzey Afrika ve Türkî Cumhuriyetler pazar girişi hazırlığı",
    items: [
      {
        category: "Hedef Pazar Analizi",
        items: [
          "MENA bölgesi: ülke bazlı düzenleyici gereksinim haritası",
          "Türkî Cumhuriyetler: yerel ortak değerlendirmesi",
          "AB üniversite sağlık merkezleri: pilot fırsat araştırması",
        ],
      },
      {
        category: "Teknik Hazırlık",
        items: [
          "Ülkede barındırma (country hosting) mimarisi hazırlığı",
          "HL7 FHIR köprüsü uluslararası uyarlaması",
        ],
      },
    ],
    pending: [],
    outputs: ["Pazar Giriş Stratejisi", "Uluslararası FHIR Uyarlama Belgesi"],
  },

  /* ─── AY 21 ─── */
  {
    period: "Ağustos 2027",
    subtitle: "21. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "SaMD (Tıbbi Cihaz Yazılımı) yükseltme yol haritası değerlendirmesi",
    items: [
      {
        category: "SaMD Değerlendirmesi",
        items: [
          "IEC 62304 / ISO 13485 / ISO 14971 boşluk analizi",
          "Risk sınıflandırması ve SaMD kararı (go/no-go)",
          "Düzenleyici danışman ile strateji oturumu",
        ],
      },
      {
        category: "Klinik Kanıt",
        items: [
          "Pilot verilerinin SaMD kanıt dosyası için hazırlanması",
          "Klinik güvenlik istatistikleri derlenmesi",
        ],
      },
    ],
    pending: [],
    outputs: ["SaMD Boşluk Analizi", "Klinik Kanıt Dosyası Taslağı"],
  },

  /* ─── AY 22 ─── */
  {
    period: "Eylül 2027",
    subtitle: "22. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "İkinci pilot çalışması (uluslararası) ve platform v2.0 hazırlığı",
    items: [
      {
        category: "Uluslararası Pilot",
        items: [
          "En az 1 uluslararası kurum ile pilot protokolü imzalandı",
          "Çok dilli veri toplama altyapısı aktive edildi",
        ],
      },
      {
        category: "Platform v2.0",
        items: [
          "Triyaj Motoru v2: ML destekli risk modeli (sentetik + pilot verisi)",
          "Anket kütüphanesi genişletme (yeni ölçekler eklenebilir yapı)",
          "API marketplace hazırlığı (3. taraf entegrasyonlar)",
        ],
      },
    ],
    pending: [],
    outputs: ["Uluslararası Pilot Protokolü", "Triyaj Motoru v2", "Platform v2.0 Beta"],
  },

  /* ─── AY 23 ─── */
  {
    period: "Ekim 2027",
    subtitle: "23. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "Ticari lansmanı ve kurumsal satış büyütme",
    items: [
      {
        category: "Ticari Lansman",
        items: [
          "Türkiye'de ≥5 kurumsal müşteri ile SaaS sözleşmesi",
          "Basın bülteni ve sektör konferansı sunumu",
          "Bağımsız danışman/akademisyen referans programı",
        ],
      },
      {
        category: "Ölçek",
        items: [
          "Müşteri destek ve onboarding süreci otomasyonu",
          "Yatırımcı/hibe sunumu güncelleme (pilot kanıtlı veriler ile)",
        ],
      },
    ],
    pending: [],
    outputs: ["İlk Ticari Sözleşmeler", "Basın Bülteni", "Yatırımcı Sunumu v2"],
  },

  /* ─── AY 24 ─── */
  {
    period: "Kasım 2027",
    subtitle: "24. Dönem",
    status: "planned",
    phase: "Faz 6 — İhracat & Ölçek",
    summary: "Proje kapanışı, TÜBİTAK final raporu ve sürdürülebilir büyüme planı",
    items: [
      {
        category: "Proje Kapanışı",
        items: [
          "TÜBİTAK final raporu ve proje hesap kapatma",
          "Tüm IP dosyalarının tamamlanması ve arşivlenmesi",
          "Ekip yetkinlik belgesi ve kariyer planlaması",
        ],
      },
      {
        category: "Sürdürülebilirlik",
        items: [
          "Post-proje ürün yol haritası (2028–2030)",
          "Kurum içi Ar-Ge kapasitesi sürdürme planı",
          "Uluslararası iş ortaklığı mutabakat tutanakları",
        ],
      },
    ],
    pending: [],
    outputs: ["TÜBİTAK Final Raporu", "IP Portföyü (Tam)", "2028–2030 Yol Haritası"],
  },
];

const phaseColors: Record<string, string> = {
  "Faz 1 — Temel": "bg-purple-100 text-purple-700",
  "Faz 2 — Çekirdek Geliştirme": "bg-blue-100 text-blue-700",
  "Faz 3 — MVP": "bg-cyan-100 text-cyan-700",
  "Faz 4 — Pilot": "bg-green-100 text-green-700",
  "Faz 5 — Kurumsal Entegrasyon": "bg-orange-100 text-orange-700",
  "Faz 6 — İhracat & Ölçek": "bg-rose-100 text-rose-700",
};

const phaseNodeColors: Record<string, string> = {
  "Faz 1 — Temel": "bg-purple-500 border-purple-500",
  "Faz 2 — Çekirdek Geliştirme": "bg-blue-500 border-blue-500",
  "Faz 3 — MVP": "bg-cyan-500 border-cyan-500",
  "Faz 4 — Pilot": "bg-green-500 border-green-500",
  "Faz 5 — Kurumsal Entegrasyon": "bg-orange-500 border-orange-500",
  "Faz 6 — İhracat & Ölçek": "bg-rose-500 border-rose-500",
};

export default function Home() {
  const [selected, setSelected] = useState(0);
  const entry = timelineData[selected];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-sm font-medium text-blue-600 mb-1">
            KEREGE Yazılım Bilişim Teknolojileri A.Ş.
          </p>
          <h1 className="text-2xl font-bold text-gray-900">AffectLog-TR</h1>
          <p className="text-gray-500 mt-1">
            Dijital Psikolojik Destek Platformu — 24 Aylık Proje Zaman Çizelgesi
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span><span className="font-medium">Başlangıç:</span> 05.12.2025</span>
            <span><span className="font-medium">Bitiş:</span> 05.12.2027</span>
            <span><span className="font-medium">Yönetici:</span> Önder Öztürk</span>
            <span><span className="font-medium">Bütçe:</span> 4.092.000 TL</span>
          </div>

          {/* Phase legend */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(phaseColors).map(([phase, cls]) => (
              <span key={phase} className={`text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
                {phase}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Horizontal Timeline Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex items-end min-w-max gap-0">
            {timelineData.map((item, i) => {
              const nodeColor =
                item.status === "completed"
                  ? "bg-green-500 border-green-500 text-white"
                  : item.status === "ongoing"
                  ? "bg-yellow-400 border-yellow-400 text-white"
                  : `${phaseNodeColors[item.phase]} text-white opacity-50`;
              const selectedStyle = selected === i ? "ring-2 ring-offset-2 ring-gray-400 opacity-100 scale-110" : "";

              return (
                <div key={i} className="flex items-end">
                  <button
                    onClick={() => setSelected(i)}
                    className="flex flex-col items-center group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${nodeColor} ${selectedStyle}`}>
                      {item.status === "completed" ? "✓" : item.status === "ongoing" ? "●" : i + 1}
                    </div>
                    <div className="mt-1.5 text-center">
                      <p className={`text-xs font-semibold whitespace-nowrap ${selected === i ? "text-gray-900" : "text-gray-500"}`}>
                        {item.period}
                      </p>
                    </div>
                  </button>
                  {i < timelineData.length - 1 && (
                    <div className="w-8 h-0.5 mb-6 bg-gray-200 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Period header */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">{entry.period}</h2>
          <span className="text-sm text-gray-500">{entry.subtitle}</span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${phaseColors[entry.phase]}`}>
            {entry.phase}
          </span>
          {entry.status === "completed" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Tamamlandı
            </span>
          )}
          {entry.status === "ongoing" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" /> Devam Ediyor
            </span>
          )}
          {entry.status === "planned" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Planlandı
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-6">{entry.summary}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main items */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">
                {entry.status === "completed" ? "Dönem İçinde Tamamlananlar" : "Planlanan Faaliyetler"}
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {entry.items.map((cat, j) => (
                <div key={j} className="px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    {cat.category}
                  </p>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, k) => (
                      <li key={k} className="flex gap-2 text-sm text-gray-700">
                        <span className={`mt-0.5 shrink-0 ${entry.status === "completed" ? "text-green-500" : "text-blue-400"}`}>
                          {entry.status === "completed" ? "✓" : "→"}
                        </span>
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
            {/* Pending (only for completed) */}
            {entry.status === "completed" && entry.pending.length > 0 && (
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
            )}

            {/* Outputs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">
                  {entry.status === "completed" ? "Dönem Çıktıları" : "Beklenen Çıktılar"}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 px-4 py-4">
                {entry.outputs.map((output, j) => (
                  <span
                    key={j}
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset
                      ${entry.status === "completed"
                        ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10"
                      }`}
                  >
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
