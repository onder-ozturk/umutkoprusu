"use client";
import { useEffect, useState } from "react";
import { timelineDetails, timelineDetailsRich, type Section } from "./timelineDetails";

type UpgradeNote = { category: string; note: string };
type ItemDetail = {
  title: string;
  itemText: string;
  category: string;
  period: string;
  lead: string;
  points: string[];
  tags: string[];
  sections?: Section[];
};

type TimelineEntry = {
  period: string;
  subtitle: string;
  status: "completed" | "ongoing" | "planned";
  phase: string;
  summary: string;
  items: { category: string; items: string[] }[];
  pending: string[];
  outputs: string[];
  upgradeNotes: UpgradeNote[];
};

const phases = [
  { name: "Faz 1 — Temel",                range: "Ara 2025 – Şub 2026" },
  { name: "Faz 2 — Çekirdek Geliştirme",  range: "Mar 2026 – Tem 2026" },
  { name: "Faz 3 — MVP",                  range: "Ağu 2026 – Eki 2026" },
  { name: "Faz 4 — Pilot",                range: "Kas 2026 – Oca 2027" },
  { name: "Faz 5 — Kurumsal Entegrasyon", range: "Şub 2027 – May 2027" },
  { name: "Faz 6 — İhracat & Ölçek",      range: "Haz 2027 – Kas 2027" },
];

const phaseStyle: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  "Faz 1 — Temel":                { bg: "bg-purple-50",  text: "text-purple-700", dot: "bg-purple-500",  border: "border-purple-200" },
  "Faz 2 — Çekirdek Geliştirme":  { bg: "bg-blue-50",    text: "text-blue-700",   dot: "bg-blue-500",    border: "border-blue-200"   },
  "Faz 3 — MVP":                  { bg: "bg-cyan-50",    text: "text-cyan-700",   dot: "bg-cyan-500",    border: "border-cyan-200"   },
  "Faz 4 — Pilot":                { bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-500",   border: "border-green-200"  },
  "Faz 5 — Kurumsal Entegrasyon": { bg: "bg-orange-50",  text: "text-orange-700", dot: "bg-orange-500",  border: "border-orange-200" },
  "Faz 6 — İhracat & Ölçek":      { bg: "bg-rose-50",    text: "text-rose-700",   dot: "bg-rose-500",    border: "border-rose-200"   },
};

const upgradeCategoryStyle: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  "Durum Notu": { bg: "bg-sky-50",     text: "text-sky-800",     border: "border-sky-200",     dot: "bg-sky-400"     },
  "KPI":        { bg: "bg-indigo-50",  text: "text-indigo-800",  border: "border-indigo-200",  dot: "bg-indigo-400"  },
  "Risk":       { bg: "bg-amber-50",   text: "text-amber-800",   border: "border-amber-200",   dot: "bg-amber-400"   },
  "Bağımlılık": { bg: "bg-orange-50",  text: "text-orange-800",  border: "border-orange-200",  dot: "bg-orange-400"  },
  "Sorumluluk": { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", dot: "bg-emerald-400" },
};

const timelineData: TimelineEntry[] = [
  {
    period: "Aralık 2025", subtitle: "1. Dönem", status: "completed", phase: "Faz 1 — Temel",
    summary: "Projenin klinik temelleri, paydaş analizi ve araştırma çerçevesinin oluşturulması",
    items: [
      { category: "Klinik Çerçeve", items: [
        "PHQ-9, GAD-7 ve C-SSRS/ASQ'nun Türk üniversite öğrencileri için kullanım ilkeleri belirlendi",
        "Risk eşik değerleri ve uyarı akışları klinisyen danışmanlarla birlikte taslaklandı",
        "Düşük–orta–yüksek risk için müdahale yolları tanımlandı",
      ]},
      { category: "Paydaş & Kullanıcı Analizi", items: [
        "Hedef gruplar netleştirildi: üniversite öğrencisi, klinisyen, kurum yöneticisi",
        "Kullanıcı akışları ve kullanım senaryoları oluşturuldu",
        "Erişilebilirlik ve çok dilli kullanım ihtiyaçları belirlendi",
      ]},
      { category: "Etik & Düzenleyici Hazırlık", items: [
        "Etik kurul başvurusu için onam formları ve araştırma protokolü hazırlandı",
        "KVKK/GDPR çerçevesinde kişisel sağlık verisi işleme politikası taslaklandı",
        "Veri envanteri ve şifreleme gereksinimleri belirlendi",
      ]},
      { category: "Ürün & Pazar Stratejisi", items: [
        "MVP kapsamı netleştirildi: tarama → triyaj → yönlendirme → uzman paneli",
        "İlk hedef pazar belirlendi: üniversite psikolojik danışmanlık merkezleri",
        "24 aylık proje yol haritası ve kilometre taşları onaylandı",
      ]},
    ],
    pending: [
      "Etik kurul onayı — süreç devam ediyor",
      "Gerçek hasta verisiyle doğrulama — etik onay bekleniyor",
      "FHIR/USVS canlı entegrasyon — kurumsal erişim yetkileri bekleniyor",
    ],
    outputs: ["Araştırma Protokolü v1", "Etik Kurul Başvuru Paketi", "SRS v0.2", "24 Aylık Yol Haritası", "KVKK Politikası", "Kullanıcı Akış Diyagramları"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Tamamlandı. Araştırma Protokolü, SRS v0.2 ve KVKK Politikası teslim edildi. Etik kurul başvurusu Ocak'a devredildi." },
      { category: "KPI", note: "Etik başvuru paketi ✓ | 24 aylık yol haritası onayı ✓ | 4 klinik çerçeve belgesi ✓ | KVKK politikası taslağı ✓" },
      { category: "Risk", note: "Etik kurul gecikmesi (orta) → Şubat lansmanını etkileyebilir. Aksiyon: alternatif klinik protokol hazırlığı başlatıldı." },
      { category: "Sorumluluk", note: "Klinik Lider → etik belgeler | Teknik Lider → veri güvenliği mimarisi | Ürün Sahibi → yol haritası onayı" },
    ],
  },
  {
    period: "Ocak 2026", subtitle: "2. Dönem", status: "ongoing", phase: "Faz 1 — Temel",
    summary: "Klinik içerik geliştirme, uzman danışman ağı kurulumu ve tasarım doğrulama",
    items: [
      { category: "Klinik İçerik Geliştirme", items: [
        "Düşük risk için psikoeğitim içerikleri (anksiyete yönetimi, stres azaltma) hazırlanıyor",
        "Orta risk için CBT tabanlı kısa müdahale modülleri taslaklanıyor",
        "Kriz anında kullanıcıya sunulacak güvenlik planı şablonu oluşturuluyor",
      ]},
      { category: "Uzman Danışman Ağı", items: [
        "Psikiyatri, klinik psikoloji ve ölçme-değerlendirme alanlarında danışmanlar belirleniyor",
        "Üniversite psikolojik danışmanlık merkezi koordinatörleriyle görüşmeler yapılıyor",
        "Klinisyen geri bildirimiyle triyaj eşik değerleri revize ediliyor",
      ]},
      { category: "Kullanıcı Araştırması", items: [
        "Üniversite öğrencileriyle odak grup görüşmeleri (n=15) gerçekleştiriliyor",
        "Mevcut psikolojik destek süreçlerindeki boşluklar analiz ediliyor",
        "Düşük seviye prototip (wireframe) kullanıcı testi yapılıyor",
      ]},
    ],
    pending: [],
    outputs: ["Klinik İçerik Kütüphanesi v0.1", "Danışman Ağı Listesi", "Kullanıcı Araştırma Raporu", "Triyaj Eşik Değer Belgesi v1"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Devam Ediyor (03.03.2026 itibarıyla). Odak grup görüşmeleri aktif; klinik içerik geliştirme son aşamada." },
      { category: "KPI", note: "Odak grubu: n=15 hedef | Danışman ağı: ≥5 klinisyen | Triyaj Eşik Belgesi v1 | İçerik Kütüphanesi v0.1 teslimi" },
      { category: "Risk", note: "Danışman müsaitliği (orta) — üniversite tatil dönemine denk geldi. Bağımlılık: etik onay Şubat'ta bekleniyor." },
      { category: "Sorumluluk", note: "Klinik Lider → içerik & danışmanlar | Ürün Sahibi → kullanıcı araştırması | Kurum Koordinatörü → görüşmeler" },
    ],
  },
  {
    period: "Şubat 2026", subtitle: "3. Dönem", status: "planned", phase: "Faz 1 — Temel",
    summary: "Etik kurul onayı süreci, pilot kurum ortaklıkları ve klinik içeriklerin tamamlanması",
    items: [
      { category: "Etik Süreç", items: [
        "Etik kurul başvurusunun takibi ve gerekli revizyon yanıtları",
        "Bilgilendirilmiş onam sürecinin dijital platforma entegrasyon tasarımı",
        "Veri güvenliği protokolünün etik kurul gereksinimlerine göre güncellenmesi",
      ]},
      { category: "Pilot Kurum Ortaklıkları", items: [
        "En az 3 üniversite psikolojik danışmanlık merkezi ile ön görüşmeler",
        "Pilot protokol ve gizlilik sözleşmesi müzakereleri",
        "Kurum yöneticisi ihtiyaç analizi anketinin uygulanması",
      ]},
      { category: "Klinik İçerik Tamamlama", items: [
        "Psikoeğitim modülleri klinisyen incelemesinden geçirildi",
        "CBT temelli ödevler ve takip egzersizleri hazırlandı",
        "İçerik erişilebilirlik ve okuma düzeyi denetimi yapıldı",
      ]},
    ],
    pending: [],
    outputs: ["Etik Kurul Onayı (beklenen)", "Pilot Kurum Mutabakat Mektupları", "Klinik İçerik Kütüphanesi v1.0", "Kurum İhtiyaç Analizi Raporu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — etik kurul yanıtı bekleniyor; ≥3 pilot kurum ön görüşmesi bu ay tamamlanacak." },
      { category: "KPI", note: "Etik kurul onayı | ≥3 pilot kurum ön görüşmesi tamamlanmış | Klinik İçerik Kütüphanesi v1.0 teslimi" },
      { category: "Risk", note: "Etik kurul reddi/revizyonu (orta) — pilot başlangıcını Mart'ın ötesine öteleyebilir. Alternatif hızlı protokol hazır tutulmalı." },
      { category: "Bağımlılık", note: "Etik onay → sonraki tüm klinik veri toplama faaliyetleri kilitli. Geçit koşulu: onay + pilot mutabakat mektupları." },
    ],
  },
  {
    period: "Mart 2026", subtitle: "4. Dönem", status: "planned", phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Tarama ve triyaj modüllerinin kullanıcıyla doğrulanması, risk rozetleri ve yönlendirme akışı",
    items: [
      { category: "Tarama Modülü Doğrulama", items: [
        "PHQ-9 ve GAD-7 dijital formlarının klinisyen ve kullanıcıyla test edilmesi",
        "Mobil ve web ortamında doldurma süresi ve bırakma noktası analizi",
        "Otomatik puanlama ve renk kodlu geri bildirim tasarımı",
      ]},
      { category: "Triyaj & Yönlendirme", items: [
        "Risk rozetleri ve risk düzeyi açıklamaları (kullanıcı dostu dil)",
        "Düşük risk: öz-yardım içeriğe yönlendirme akışı",
        "Orta risk: randevu talep ve klinisyene bildirim akışı",
        "Yüksek risk: 112 / MHRS / Alo 183'e güvenli yönlendirme akışı",
      ]},
      { category: "İntihar Riski Protokolü", items: [
        "C-SSRS/ASQ akışı psikiyatrist danışmanla gözden geçirildi",
        "Kriz güvenlik planı şablonu platforma entegre edildi",
        "Yüksek risk durumunda klinisyene anlık bildirim protokolü test edildi",
      ]},
    ],
    pending: [],
    outputs: ["Tarama Modülü v1 (Doğrulanmış)", "Triyaj Akış Diyagramı", "Kriz Yönlendirme Protokolü", "Risk Rozeti Tasarım Kılavuzu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Faz 2 ilk ayı. Tarama ve triyaj modüllerinin klinisyen & kullanıcı doğrulaması bu ayın önceliği." },
      { category: "KPI", note: "PHQ-9/GAD-7 form tamamlama süresi ≤5 dk | Bırakma oranı ≤%20 | Kriz protokolü klinisyen onayı ✓" },
      { category: "Risk", note: "Klinisyen müsaitliği (orta); mobil test ortamı gecikmesi (düşük); etik onayın hâlâ gelmemiş olma riski (yüksek)." },
      { category: "Bağımlılık", note: "Etik onay Şubat'ta alınmış olmalı. FHIR test ortamı kurulmuş olmalı. Klinisyen danışman ekibi hazır." },
    ],
  },
  {
    period: "Nisan 2026", subtitle: "5. Dönem", status: "planned", phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Kısa müdahale programlarının klinisyen onayından geçirilmesi ve uzman panelinin tasarımı",
    items: [
      { category: "Kısa Müdahale Programları", items: [
        "4 haftalık psikoeğitim programı (anksiyete): içerik + ödev + takip",
        "4 haftalık depresyon farkındalık programı: içerik + ödev + takip",
        "Programların klinik psikolog ve psikiyatrist onayından geçirilmesi",
      ]},
      { category: "Uzman Paneli", items: [
        "Klinisyen görünümü: danışan risk listesi, geçmiş tarama skorları",
        "Danışanla güvenli mesajlaşma (asenkron) akışı",
        "Seansa notlar ekleme ve takip planı oluşturma",
      ]},
      { category: "Gizlilik & Rıza", items: [
        "Kullanıcı veri rızası ekranları — anlaşılır dil testi yapıldı",
        "Veri paylaşım tercihleri yönetim arayüzü",
        "Kullanıcı verisi silme ve indirme hakkı akışı",
      ]},
    ],
    pending: [],
    outputs: ["Kısa Müdahale Programları v1 (2 Modül)", "Uzman Paneli Prototip", "KVKK Rıza Ekranları"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — CBT müdahale programları klinisyen onayına giriyor; uzman paneli prototip tasarımı tamamlanıyor." },
      { category: "KPI", note: "2 müdahale programı klinisyen onayından geçmeli | Uzman paneli prototip SUS ≥65 | KVKK rıza ekranları onaylı" },
      { category: "Risk", note: "Klinisyen program onay süreci uzayabilir (orta); uzman paneli asenkron mesajlaşma teknik karmaşıklığı." },
      { category: "Sorumluluk", note: "Klinik Lider → program onayı | Ürün Sahibi → uzman paneli UX | Teknik Lider → güvenli mesajlaşma altyapısı" },
    ],
  },
  {
    period: "Mayıs 2026", subtitle: "6. Dönem", status: "planned", phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Görüntülü görüşme altyapısı, kurumsal raporlama ve erişilebilirlik denetimi",
    items: [
      { category: "Görüntülü Görüşme", items: [
        "Klinisyen–danışan görüntülü seans akışı ve kullanılabilirlik testi",
        "Seans öncesi/sonrası otomatik PHQ-9 / GAD-7 hatırlatma",
        "Oturum özeti ve klinisyen notu oluşturma şablonu",
      ]},
      { category: "Kurumsal Raporlama", items: [
        "Üniversite yöneticisi için risk dağılımı ve yönlendirme sayısı gösterge paneli",
        "Klinik etkinlik izleme: puan değişimleri zaman serisi",
        "Anonim aggregat raporlar (bireysel veri paylaşılmaksızın)",
      ]},
      { category: "Erişilebilirlik", items: [
        "WCAG 2.1 AA erişilebilirlik denetimi",
        "Mobil ekran okuyucu uyumluluğu testi",
        "Yalın Türkçe yazı standardı (lise mezunu okuma düzeyi)",
      ]},
    ],
    pending: [],
    outputs: ["Görüntülü Görüşme Modülü", "Kurumsal Gösterge Paneli", "WCAG 2.1 Uyum Raporu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — görüntülü görüşme altyapısı, kurumsal raporlama ve WCAG 2.1 AA erişilebilirlik denetimi bu ayın üç ana hedefi." },
      { category: "KPI", note: "WCAG 2.1 AA tam geçiş | Klinisyen SUS ≥70 (görüntülü görüşme) | Kurumsal panel ≥3 kurum raporlayabilir durumda" },
      { category: "Risk", note: "WebRTC altyapı gecikmesi (orta); WCAG kritik bulgu çıkarsa geliştirme durabilir (yüksek etki). Erken tarama şart." },
      { category: "Sorumluluk", note: "Teknik Lider → video altyapısı | Klinik Lider → seans protokolü | Ürün Sahibi → kurumsal rapor UX tasarımı" },
    ],
  },
  {
    period: "Haziran 2026", subtitle: "7. Dönem", status: "planned", phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Güvenlik, KVKK tam uyum ve sınai mülkiyet başvuru hazırlıkları",
    items: [
      { category: "Güvenlik & Veri Güvencesi", items: [
        "Bağımsız güvenlik denetimi (penetrasyon testi) tamamlandı",
        "Kişisel Sağlık Verisi Etki Değerlendirmesi (DPIA) tamamlandı",
        "ISO 27001 / 27701 uyum boşluk analizi ve eylem planı",
      ]},
      { category: "IP Hazırlığı", items: [
        "Risk-triyaj motoru patent teknik açıklama belgesi tamamlandı",
        "Kriz eskalasyon iş akışı patent belgesi tamamlandı",
        "On-device gizlilik modülü patent belgesi tamamlandı",
      ]},
      { category: "Ticari Marka", items: [
        '"AffectLog-TR" ticari marka Sınıf 9/42 başvurusu — TPE',
        "Özgün GUI ekran düzenleri için tasarım tescili başvurusu",
      ]},
    ],
    pending: [],
    outputs: ["Güvenlik Denetim Raporu", "DPIA Belgesi", "3 Patent Teknik Belgesi", "Ticari Marka Başvurusu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — bağımsız güvenlik denetimi, DPIA ve 3 patent teknik belgesi bu ayın kritik çıktıları." },
      { category: "KPI", note: "Penetrasyon testi kritik bulgu = 0 | DPIA tamamlanmış | 3 patent teknik belgesi hazır | Ticari marka başvurusu gönderilmiş" },
      { category: "Risk", note: "Pentest kritik bulgu çıkarsa release durdurulur (yüksek etki) — erken güvenlik taraması paralelde yapılmalı." },
      { category: "Bağımlılık", note: "Feature freeze → güvenlik denetimi sabit sürüm gerektirir. DPIA → KVKK şartnamesi ve ISO yol haritası." },
    ],
  },
  {
    period: "Temmuz 2026", subtitle: "8. Dönem", status: "planned", phase: "Faz 2 — Çekirdek Geliştirme",
    summary: "Sağlık bilgi sistemleri entegrasyonu ve USVS/SKRS uyumu",
    items: [
      { category: "Sağlık Sistemi Entegrasyonu", items: [
        "USVS alan eşlemesi tamamlandı",
        "SKRS bağlantısı kuruldu",
        "HL7 FHIR köprüsü ile elektronik hasta kaydı veri akışı test edildi",
      ]},
      { category: "Sevk & Yönlendirme Zinciri", items: [
        "e-MHRS entegrasyon fizibilitesi tamamlandı",
        "Psikiyatri polikliniği sevk bildirim akışı tasarlandı",
        "Kurum içi yönlendirme ve geri bildirim döngüsü tamamlandı",
      ]},
    ],
    pending: [],
    outputs: ["USVS/SKRS Entegrasyon Belgesi", "FHIR Mapping v1.0", "Sevk Akış Protokolü"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — USVS/SKRS alan eşlemesi ve HL7 FHIR köprüsü bu ayın teknik önceliği. Faz 2 kapanış ayı." },
      { category: "KPI", note: "USVS alan eşlemesi %100 tamamlanmış | FHIR test ortamı bağlantısı aktif | Sevk akış protokolü belgelenmiş" },
      { category: "Risk", note: "Sağlık Bakanlığı API erişim izni alınamayabilir (yüksek) — en kritik risk. Geçici çözüm: manuel import akışı." },
      { category: "Bağımlılık", note: "SB API erişim izni — kritik geçit. İzin olmadan Ağustos alfa testi FHIR entegrasyonu olmadan yapılacak." },
    ],
  },
  {
    period: "Ağustos 2026", subtitle: "9. Dönem", status: "planned", phase: "Faz 3 — MVP",
    summary: "Tüm modüllerin entegrasyonu, dahili alfa testi ve klinisyen eğitimi",
    items: [
      { category: "Alfa Testi", items: [
        "Proje ekibi ve danışman klinisyenlerle kapalı alfa testi (n=20)",
        "Tarama → triyaj → yönlendirme tam senaryosu uçtan uca test",
        "Kriz senaryosu simülasyonları ve protokol güvenliği doğrulama",
      ]},
      { category: "Klinisyen Eğitimi", items: [
        "Uzman paneli kullanım kılavuzu ve eğitim videoları hazırlandı",
        "Klinisyen onboarding programı (2 saatlik çevrimiçi eğitim)",
        "Kriz müdahale protokolü klinisyen simülasyonu tamamlandı",
      ]},
      { category: "Kullanılabilirlik", items: [
        "SUS (System Usability Scale) başlangıç ölçümü — hedef: ≥75",
        "Alfa kullanıcıları ile derinlemesine görüşmeler",
        "Öncelikli iyileştirme listesi oluşturuldu",
      ]},
    ],
    pending: [],
    outputs: ["MVP Alfa v1.0", "Alfa Test Raporu", "Klinisyen Eğitim Materyali", "SUS Başlangıç Skoru"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Faz 3 MVP ilk ayı. Kapalı alfa n=20, klinisyen eğitimi ve SUS ilk ölçümü bu ayın üç çıktısı." },
      { category: "KPI", note: "Alfa n=20 tamamlanmış | SUS ≥75 | Kriz senaryosu 0 kaçırılan vaka | Klinisyen eğitim tamamlama ≥%90" },
      { category: "Risk", note: "Alfa katılımcı devamsızlığı (orta); kriz simülasyonunda protokol açığı (yüksek) — klinisyen denetimi zorunlu." },
      { category: "Sorumluluk", note: "Klinik Lider → kriz simülasyonu & onay | Teknik Lider → alfa ortamı | Ürün Sahibi → SUS analizi & öncelik listesi" },
    ],
  },
  {
    period: "Eylül 2026", subtitle: "10. Dönem", status: "planned", phase: "Faz 3 — MVP",
    summary: "Geniş beta testi, ön-ölçüm verileri ve mağaza başvuruları",
    items: [
      { category: "Beta Testi", items: [
        "Dış beta (n≥50): üniversite öğrencileri + klinisyenler",
        "T0 PHQ-9 / GAD-7 ön ölçüm verilerinin toplanması",
        "Platforma katılım, tamamlama ve bırakma oranlarının analizi",
      ]},
      { category: "İçerik Kalitesi", items: [
        "Kısa müdahale içeriklerine yönelik kullanıcı geri bildirim analizi",
        "Psikoeğitim modüllerinde güncelleme ve basitleştirme",
        "Anonim beta kullanıcı memnuniyet anketi",
      ]},
      { category: "Yayın Hazırlığı", items: [
        "Apple App Store sağlık uygulaması inceleme başvurusu",
        "Google Play Store başvurusu",
        "Web uygulaması tarayıcı uyumluluk testi",
      ]},
    ],
    pending: [],
    outputs: ["MVP Beta v1.1", "T0 Ön-Ölçüm Veri Seti", "Beta Geri Bildirim Raporu", "App Store Başvuruları"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — açık beta n≥50, T0 ön-ölçüm ve App Store başvuruları. Veri toplama zinciri bu ay başlıyor." },
      { category: "KPI", note: "Beta n≥50 | T0 ölçüm tamamlama ≥%90 | App Store başvurusu gönderilmiş | Bırakma oranı ≤%25" },
      { category: "Risk", note: "App Store red kararı (orta) — sağlık uygulaması inceleme süreci uzun. Paralel web sürümü hazır tutulmalı." },
      { category: "Bağımlılık", note: "Alfa açık sorunlar Ağustos'ta kapatılmış olmalı. Klinik güvenlik onayı App Store başvurusuna eklenmeli." },
    ],
  },
  {
    period: "Ekim 2026", subtitle: "11. Dönem", status: "planned", phase: "Faz 3 — MVP",
    summary: "MVP nihai sürümü, klinik güvenlik son denetimi ve pilot protokolü onayı",
    items: [
      { category: "Klinik Güvenlik Denetimi", items: [
        "Bağımsız klinisyen paneli ile kriz yönlendirme protokolü son denetimi",
        "Klinik içeriklerin psikiyatrist ve klinik psikolog ortak onayı",
        "Güvenlik senaryoları simülasyon raporu hazırlandı",
      ]},
      { category: "Pilot Hazırlığı", items: [
        "2+ üniversite ile pilot katılım anlaşması imzalandı",
        "Klinisyen eğitim seminerleri pilot kurumlarda yapıldı",
        "Katılımcı kayıt ve tarama süreçleri test edildi",
      ]},
      { category: "Ölçüm Araçları", items: [
        "Etki ölçüm planı: ΔPHQ-9 / ΔGAD-7 / SUS protokolü onaylandı",
        "Veri toplama ve analiz metodolojisi dokümante edildi",
      ]},
    ],
    pending: [],
    outputs: ["MVP v1.2 (Production)", "Klinik Güvenlik Onay Belgesi", "Pilot Katılım Anlaşmaları", "Etki Ölçüm Protokolü"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — MVP v1.2 production, klinik güvenlik son denetimi ve 2+ pilot anlaşması. Faz 3 kapanış ayı." },
      { category: "KPI", note: "2+ pilot kurum anlaşması imzalanmış | Klinik güvenlik belgesi tam onaylı | Etki ölçüm protokolü dokümanı tamamlanmış" },
      { category: "Risk", note: "Pilot kurum çekilme riski (orta) — alternatif kurum listesi hazır tutulmalı. Klinik denetimde blokaj (düşük olasılık, yüksek etki)." },
      { category: "Bağımlılık", note: "MVP production hazır → klinik onay şart. Geçit: klinik güvenlik belgesi + ≥2 pilot anlaşması → Kasım lansmanı." },
    ],
  },
  {
    period: "Kasım 2026", subtitle: "12. Dönem", status: "planned", phase: "Faz 4 — Pilot",
    summary: "Çok merkezli pilot lansmanı — tarama, triyaj ve yönlendirme zinciri canlıya alındı",
    items: [
      { category: "Pilot Lansmanı", items: [
        "En az 2 üniversitede platforma erişim açıldı",
        "Katılımcı kayıt kampanyası başlatıldı (hedef: ≥200 öğrenci)",
        "Klinisyen koordinatörlere platform erişimi ve canlı destek sağlandı",
      ]},
      { category: "Tarama & Triyaj (Canlı)", items: [
        "İlk hafta: T0 PHQ-9 / GAD-7 / C-SSRS değerlendirmeleri",
        "Otomatik triyaj ve yönlendirme akışı — ilk vaka takibi başladı",
        "Yüksek risk vakalarında klinisyen müdahale süresi izlendi",
      ]},
      { category: "Pilot İzleme", items: [
        "Haftalık katılım ve tamamlama oranı raporu",
        "Klinisyen panel kullanım yoğunluğu analizi",
        "7/24 teknik ve klinik destek hattı aktive edildi",
      ]},
    ],
    pending: [],
    outputs: ["Pilot Kayıt Raporu (Hafta 1)", "T0 Çok Merkezli Ölçüm Verileri", "Pilot İzleme Paneli"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Faz 4 Pilot lansmanı. ≥200 öğrenci kayıt hedefi; T0 ölçüm zinciri ve 7/24 destek hattı aktive ediliyor." },
      { category: "KPI", note: "1. hafta kayıt ≥50 | T0 tamamlama ≥%80 | Yüksek risk tepki süresi ≤2 saat | Sistem uptime ≥%99.5" },
      { category: "Risk", note: "Düşük katılım (orta); altyapı yük sorunu (yüksek) → load test tamamlanmış olmalı; klinisyen iş yükü yönetimi." },
      { category: "Sorumluluk", note: "Kurum Koordinatörü → kayıt kampanyası | Teknik Lider → uptime & load | Klinik Lider → yüksek risk müdahalesi" },
    ],
  },
  {
    period: "Aralık 2026", subtitle: "13. Dönem", status: "planned", phase: "Faz 4 — Pilot",
    summary: "Pilot orta dönem: müdahale takibi, klinisyen geri bildirimi ve içerik iyileştirme",
    items: [
      { category: "Ara Ölçüm", items: [
        "T1 (6. hafta) PHQ-9 / GAD-7 ara değerlendirmeleri",
        "Kısa müdahale programını tamamlayanlar için ΔPHQ-9 / ΔGAD-7 ara analizi",
        "Katılım ısı haritası: hangi içeriklerin en çok tamamlandığı",
      ]},
      { category: "Klinisyen Deneyimi", items: [
        "Pilot klinisyen geri bildirim odak grubu (n=10)",
        "Uzman panelinde eksik özellik ve iş akışı sorunlarının tespiti",
        "Klinisyen iş yükü ve zaman kazanımı analizi",
      ]},
    ],
    pending: [],
    outputs: ["T1 Ara Ölçüm Raporu", "Klinisyen Deneyim Raporu", "İçerik Revizyon Günlüğü"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — T1 (6. hafta) ara ölçüm ve klinisyen odak grubu. Yılsonu dönemine dikkat: sınav takvimi katılımı düşürebilir." },
      { category: "KPI", note: "T1 tamamlama ≥%70 | ΔPHQ-9 ara hedef ≥-3 | Klinisyen memnuniyeti ≥%80 | İçerik revizyon günlüğü başlatılmış" },
      { category: "Risk", note: "Sınav döneminin T1 katılımını düşürmesi (yüksek) — esnek hatırlatma ve uzatılmış pencere uygulanmalı." },
      { category: "Bağımlılık", note: "Pilot kayıt tamamlanmış & T0 verisi analiz edilebilir durumda olmalı. Klinisyen odak grubu için n=10 müsaatiyeti." },
    ],
  },
  {
    period: "Ocak 2027", subtitle: "14. Dönem", status: "planned", phase: "Faz 4 — Pilot",
    summary: "Pilot tamamlama, etki analizi ve akademik yayın hazırlığı",
    items: [
      { category: "Etki Ölçümü", items: [
        "T2 (12. hafta) son PHQ-9 / GAD-7 / SUS ölçümleri tamamlandı",
        "ΔPHQ-9 ve ΔGAD-7 istatistiksel analizi (paired t-test, Cohen's d)",
        "Yönlendirme etkinliği: yüksek risk vakalarında klinik müdahale oranı",
      ]},
      { category: "Akademik & Raporlama", items: [
        "Çok merkezli pilot araştırma raporu yazıldı",
        "Hakemli dergi için makale taslağı hazırlandı",
        "TÜBİTAK ara raporu teslim edildi",
      ]},
    ],
    pending: [],
    outputs: ["Pilot Etki Analiz Raporu", "Akademik Makale Taslağı", "TÜBİTAK Ara Raporu", "Triyaj Kalibrasyon Raporu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — T2 son ölçüm, istatistiksel etki analizi ve TÜBİTAK ara raporu. Faz 4 kapanış ve Faz 5 geçiş ayı." },
      { category: "KPI", note: "ΔPHQ-9 ≥-4.5 (Cohen's d ≥0.5) | ΔGAD-7 ≥-3.5 | SUS ≥80 | TÜBİTAK ara raporu zamanında teslim" },
      { category: "Risk", note: "Örneklem n<100 ise istatistiksel güç yetersiz kalabilir (orta) — ek katılımcı rezerv planı Kasım'dan itibaren hazır." },
      { category: "Bağımlılık", note: "T2 veri toplama tamamlanmış | İstatistik danışman müsait | TÜBİTAK rapor tarihi sabit (kayma yok)." },
    ],
  },
  {
    period: "Şubat 2027", subtitle: "15. Dönem", status: "planned", phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "Pilot bulgularının ticari sürüme aktarılması ve kurumsal müşteri görüşmeleri",
    items: [
      { category: "Pilot → Ürün", items: [
        "Pilot bulgularına dayalı platform v2.0 öncelikleri belirlendi",
        "Klinik içerik kütüphanesi pilot verileriyle güncellendi",
        "SUS skoru hedef: ≥80",
      ]},
      { category: "Kurumsal Satış Hazırlığı", items: [
        "ROI hesaplama aracı: kurum başına maliyet-etkinlik analizi",
        "Vaka çalışmaları ve pilot sonuç özetleri",
        "B2B SaaS fiyat modeli: kurum lisansı + kullanıcı başı seçenekleri",
      ]},
    ],
    pending: [],
    outputs: ["Platform v2.0 Öncelik Listesi", "ROI Hesaplama Aracı", "Kurumsal Sunum Paketi"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Faz 5 ilk ayı. Pilot bulguları v2.0'a aktarılıyor; kurumsal satış hazırlığı ve ROI aracı bu ayın odağı." },
      { category: "KPI", note: "Platform v2.0 öncelik listesi onaylı | ROI aracı 3 senaryo ile test edilmiş | Kurumsal sunum paketi hazır" },
      { category: "Risk", note: "Pilot bulgularının B2B fiyatlamayı desteklememesi (düşük ama kritik) — düzeltici mesajlaşma ve vaka çalışmaları hazır." },
      { category: "Sorumluluk", note: "Ürün Sahibi → v2.0 öncelik | Klinik Lider → vaka çalışmaları | Ticari Lider → ROI aracı & fiyat modeli" },
    ],
  },
  {
    period: "Mart 2027", subtitle: "16. Dönem", status: "planned", phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "Sağlık Bakanlığı / YÖK görüşmeleri ve ölçeklenebilir barındırma",
    items: [
      { category: "Kamu Kurumu İlişkileri", items: [
        "Sağlık Bakanlığı dijital sağlık birimi tanıtım görüşmesi",
        "YÖK öğrenci psikolojik destek politikası çalışma grubuna katılım",
        "USVS/SKRS canlı entegrasyon onay süreci başlatıldı",
      ]},
      { category: "ISO 27001 Belgelendirme", items: [
        "ISO 27001 / 27701 denetim başvurusu tamamlandı",
        "İç denetim ve düzeltici faaliyetler",
        "Sertifikasyon hedefi: Q2 2027",
      ]},
    ],
    pending: [],
    outputs: ["Kamu Kurumu Toplantı Tutanakları", "ISO 27001 Başvurusu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Sağlık Bakanlığı / YÖK resmi görüşmeleri ve ISO 27001 denetim başvurusu bu ayın iki kritik aksiyonu." },
      { category: "KPI", note: "≥1 resmi kamu kurumu toplantı tutanağı | ISO 27001 başvurusu gönderilmiş | USVS/SKRS onay süreci başlatılmış" },
      { category: "Risk", note: "Kamu kurumu süreç gecikmesi (yüksek) — ISO denetim tarihi ve Bakanlık randevusu paralel takip edilmeli." },
      { category: "Bağımlılık", note: "TÜBİTAK ara raporu teslim edilmiş | Pilot etki raporu Bakanlık sunum materyali olarak hazır." },
    ],
  },
  {
    period: "Nisan 2027", subtitle: "17. Dönem", status: "planned", phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "Patent başvuruları ve sınai mülkiyet portföyünün tamamlanması",
    items: [
      { category: "Patent Başvuruları", items: [
        "Patent 1 — Risk-Triyaj Motoru: TPE başvurusu teslim edildi",
        "Patent 2 — On-device Gizlilik Modülü: TPE başvurusu teslim edildi",
        "Patent 3 — Kriz Eskalasyon İş Akışı: TPE başvurusu teslim edildi",
      ]},
      { category: "Uluslararası IP", items: [
        "PCT başvurusu fizibilite değerlendirmesi",
        "AB ve MENA bölgesi için patent strateji raporu",
        "Açık kaynak politikası yayınlandı",
      ]},
    ],
    pending: [],
    outputs: ["3 Patent Başvurusu (TPE)", "PCT Strateji Raporu", "IP Portföy Envanteri"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — 3 patent TPE'ye teslim edilecek ve PCT fizibilite sonuçlandırılacak. IP portföyünün en yoğun ayı." },
      { category: "KPI", note: "3 patent başvurusu teslim edilmiş | PCT fizibilite sonuçlandırılmış | IP portföy envanteri güncel ve arşivlenmiş" },
      { category: "Risk", note: "Patent reddi veya öncelik hakkı itirazı (orta) — vekil patent avukatı görevlendirilmiş ve teknik açıklamalar onaylı olmalı." },
      { category: "Sorumluluk", note: "Klinik Lider → teknik açıklamalar | Patent Avukatı → başvuru & prosedür | Ürün Sahibi → IP stratejisi & PCT karar" },
    ],
  },
  {
    period: "Mayıs 2027", subtitle: "18. Dönem", status: "planned", phase: "Faz 5 — Kurumsal Entegrasyon",
    summary: "İlk ticari kurumsal satışlar ve ISO 27001 sertifikasyonu",
    items: [
      { category: "Ticari Lansman", items: [
        "İlk 5 üniversite ile B2B SaaS sözleşmesi hedefi",
        "On-premise dağıtım paketi ilk kurumsal müşteriye teslim",
        "Müşteri başarı ve teknik destek süreçleri standartlaştırıldı",
      ]},
      { category: "Akademik Etki", items: [
        "Hakemli dergide makale yayımlandı / kabul alındı",
        "Ulusal psikiyatri kongresinde poster/sunum yapıldı",
      ]},
    ],
    pending: [],
    outputs: ["İlk Ticari Sözleşmeler (≥3)", "ISO 27001 Sertifikası", "Yayımlanan Akademik Makale"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — ≥3 kurumsal sözleşme, ISO 27001 sertifikası ve akademik yayın. Faz 5 kapanış ve en büyük ticari milestone." },
      { category: "KPI", note: "≥3 üniversite B2B sözleşmesi imzalanmış | ISO 27001 sertifikası alınmış | Akademik makale yayımlanmış veya kabul almış" },
      { category: "Risk", note: "Sözleşme müzakere gecikmesi (orta); ISO denetim kritik bulgusu (düşük ama yüksek etki). Her ikisi paralel takip." },
      { category: "Bağımlılık", note: "Platform v2.0 production hazır | ISO ön denetim sorunsuz | Klinik makale hakem sürecinde veya tamamlanmış." },
    ],
  },
  {
    period: "Haziran 2027", subtitle: "19. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "Uluslararası yerelleştirme ve kültürel klinik uyarlama",
    items: [
      { category: "Çok Dilli İçerik", items: [
        "İngilizce (EN): tüm klinik içerik ve arayüz çevirisi tamamlandı",
        "Arapça (AR): sağdan sola (RTL) arayüz ve kültürel uyarlama",
        "Almanca (DE): AB veri mevzuatına uygun sürüm",
      ]},
      { category: "Kültürel Uyarlama", items: [
        "PHQ-9 / GAD-7 yerel norm ve eşik değerleri ülke bazlı kalibre edildi",
        "Kriz yönlendirme kaynakları ülke bazlı güncellendi",
        "Kültürel duyarlılık danışman incelemesi (3 bölge)",
      ]},
    ],
    pending: [],
    outputs: ["Çok Dilli Platform (EN/AR/DE)", "Ülke Bazlı Kriz Kaynak Rehberi", "Kültürel Uyarlama Raporu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — Faz 6 ilk ayı. EN/AR/DE çevirisi ve kültürel klinik uyarlama tamamlanacak. RTL arayüz test edilecek." },
      { category: "KPI", note: "3 dil içerik çevirisi tamamlanmış | Arapça RTL test geçti | Kültürel danışman onayı (3 bölge) | Kriz kaynakları güncel" },
      { category: "Risk", note: "Arapça RTL layout sorunları (orta); yerel kriz kaynakları eksik kalabilir (orta) — ülke bazlı güncelleme şart." },
      { category: "Sorumluluk", note: "Teknik Lider → i18n altyapı & RTL | Klinik Lider → kültürel uyarlama | Çeviri Koordinatörü → içerik & norm" },
    ],
  },
  {
    period: "Temmuz 2027", subtitle: "20. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "MENA ve Türkî Cumhuriyetler pazar girişi hazırlığı",
    items: [
      { category: "Pazar Araştırması", items: [
        "MENA ülkeleri: ruh sağlığı hizmet boşluğu ve ödeme gücü analizi",
        "Türkî Cumhuriyetler: dil yakınlığı ve sağlık sistemi haritası",
        "AB üniversite sağlık merkezleri: GDPR uyum ve pilot fırsat araştırması",
      ]},
      { category: "Ortaklık Geliştirme", items: [
        "Hedef bölgelerde yerel dağıtım / uygulama ortağı görüşmeleri",
        "Uluslararası üniversite işbirliği protokolleri",
        "Ülkede barındırma mimarisi ve hukuki çerçeve",
      ]},
    ],
    pending: [],
    outputs: ["Pazar Giriş Stratejisi (3 Bölge)", "Ortaklık Mutabakat Mektupları"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — MENA, Türkî Cumhuriyetler ve AB pazar araştırması ile ortaklık mutabakat mektupları bu ayın çıktısı." },
      { category: "KPI", note: "3 bölge pazar analizi tamamlanmış | ≥2 ortaklık mutabakat mektubu | Hukuki çerçeve ≥2 ülke için hazır" },
      { category: "Risk", note: "Hedef ülke düzenleyici farklılıkları (yüksek) — yerel hukuk danışmanı her bölge için görevlendirilmiş olmalı." },
      { category: "Bağımlılık", note: "Çok dilli platform (EN/AR/DE) Haziran'da hazır ve test edilmiş olmalı. Ortaklık için referans materyali mevcut." },
    ],
  },
  {
    period: "Ağustos 2027", subtitle: "21. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "SaMD yükseltme değerlendirmesi ve ikinci uluslararası pilot hazırlığı",
    items: [
      { category: "SaMD Değerlendirmesi", items: [
        "IEC 62304 / ISO 13485 / ISO 14971 boşluk analizi tamamlandı",
        "Risk sınıflandırması ve SaMD go/no-go kararı",
        "Düzenleyici danışman ile strateji oturumu yapıldı",
      ]},
      { category: "Uluslararası Pilot", items: [
        "En az 1 uluslararası üniversite ile pilot anlaşması imzalandı",
        "Çok dilli veri toplama ve etki ölçüm protokolü hazırlandı",
      ]},
    ],
    pending: [],
    outputs: ["SaMD Boşluk Analizi", "Düzenleyici Strateji Belgesi", "Uluslararası Pilot Anlaşması"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — SaMD go/no-go kararı ve ≥1 uluslararası pilot anlaşması bu ayın iki kritik milestone'u." },
      { category: "KPI", note: "SaMD go/no-go kararı alınmış | ≥1 uluslararası pilot anlaşması imzalanmış | Boşluk analizi belgelenmiş" },
      { category: "Risk", note: "SaMD yolunun seçilmesi halinde 12–24 ay ek zaman ve ciddi bütçe gerekebilir (yüksek etki) — karar öncesi senaryo analizi şart." },
      { category: "Bağımlılık", note: "ISO 27001 sertifikası alınmış | Düzenleyici danışman raporu hazır | Uluslararası pilot kurum resmi onay vermiş." },
    ],
  },
  {
    period: "Eylül 2027", subtitle: "22. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "Uluslararası pilot canlı ve platform v2.0",
    items: [
      { category: "Uluslararası Pilot (Canlı)", items: [
        "Uluslararası pilot başlatıldı — çok dilli tarama ve triyaj aktif",
        "T0 uluslararası ön-ölçüm verileri toplandı",
        "Bölgeler arası veri karşılaştırma protokolü uygulandı",
      ]},
      { category: "Platform v2.0", items: [
        "Triyaj motoru v2: pilot verileriyle kalibrasyon",
        "Esnek anket kütüphanesi: yeni ölçekler eklenebilir yapı",
        "İşveren sağlık programı modülü beta",
      ]},
    ],
    pending: [],
    outputs: ["Platform v2.0", "Uluslararası T0 Veri Seti", "İşveren Modülü Beta"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — uluslararası pilot canlı; platform v2.0 ve işveren modülü beta lansmanı. Çok bölgeli operasyon başlıyor." },
      { category: "KPI", note: "Uluslararası T0 tamamlama ≥%80 | Triyaj v2 kalibrasyon onaylı | İşveren modülü beta ≥10 test kullanıcısı" },
      { category: "Risk", note: "Uluslararası veri koruma (GDPR/PDPL) uyumsuzluk riski (yüksek); çok kiracılı altyapı yük yönetimi." },
      { category: "Bağımlılık", note: "Çok dilli içerik hazır; uluslararası kurum koordinatörü atanmış; yerel barındırma ve hukuki onay tamamlanmış." },
    ],
  },
  {
    period: "Ekim 2027", subtitle: "23. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "Uluslararası pazar lansmanı ve kurumsal müşteri tabanının genişletilmesi",
    items: [
      { category: "Uluslararası Lansman", items: [
        "İlk uluslararası kurumsal sözleşme (MENA veya Türkî Cumhuriyetler)",
        "Uluslararası psikiyatri konferansında platform tanıtımı",
        "Çok dilli müşteri destek ve onboarding aktif",
      ]},
      { category: "Etki Büyümesi", items: [
        "Türkiye'de toplam erişim: ≥1000 aktif kullanıcı hedefi",
        "Toplam tamamlanan tarama sayısı ve yönlendirme oranı raporlama",
        "Sosyal etki raporu hazırlandı",
      ]},
    ],
    pending: [],
    outputs: ["Uluslararası İlk Sözleşme", "Sosyal Etki Raporu", "Platform Erişim Büyüme Raporu"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — ilk uluslararası kurumsal sözleşme ve Türkiye'de ≥1000 aktif kullanıcı hedefi. Proje zirvesi ayı." },
      { category: "KPI", note: "İlk uluslararası sözleşme imzalanmış | Türkiye aktif kullanıcı ≥1000 | Sosyal etki raporu teslim edilmiş" },
      { category: "Risk", note: "Uluslararası müşteri onboarding karmaşıklığı (orta); farklı zaman dilimleri ve dil desteği yönetimi." },
      { category: "Sorumluluk", note: "Ürün Sahibi → uluslararası sözleşme | Teknik Lider → çok kiracılı altyapı | Klinik Lider → sosyal etki raporu" },
    ],
  },
  {
    period: "Kasım 2027", subtitle: "24. Dönem", status: "planned", phase: "Faz 6 — İhracat & Ölçek",
    summary: "Proje kapanışı, TÜBİTAK final raporu ve sürdürülebilir büyüme planı",
    items: [
      { category: "Proje Kapanışı", items: [
        "TÜBİTAK final raporu: hedef gerçekleşme, harcama ve çıktı özeti",
        "Etki özeti: toplam tarama, yönlendirme, ΔPHQ-9 / ΔGAD-7 ortalaması",
        "Proje IP portföyü tamamlandı ve arşivlendi",
      ]},
      { category: "Sürdürülebilirlik", items: [
        "Post-proje ürün yol haritası 2028–2030 onaylandı",
        "Yatırım/hibe başvuru paketi (Seri A veya AB Ufuk Avrupa) hazırlandı",
        "Üniversite ruh sağlığı politikası katkı belgesi hazırlandı",
      ]},
      { category: "Toplumsal Etki", items: [
        "24 ayda ulaşılan kullanıcı, kurum ve ülke sayısı raporlandı",
        "Platforma erişemeyen risk grupları için sonraki adım önerileri",
      ]},
    ],
    pending: [],
    outputs: ["TÜBİTAK Final Raporu", "Sosyal Etki Belgesi", "2028–2030 Yol Haritası", "Yatırım Paketi", "IP Portföyü (Tam)"],
    upgradeNotes: [
      { category: "Durum Notu", note: "Planlandı — proje kapanış ayı. TÜBİTAK final raporu, 2028-2030 yol haritası ve yatırım paketi bu ayın üç final çıktısı." },
      { category: "KPI", note: "TÜBİTAK final raporu onaylı | Tüm IP portföyü arşivlenmiş | 2028-2030 yol haritası onaylı | Sosyal etki belgesi teslim" },
      { category: "Risk", note: "Proje çıktılarının hedeften sapma riski (orta) — erken ara değerlendirmelerle minimize edildi. Final rapor zamanlaması kritik." },
      { category: "Sorumluluk", note: "Proje Yöneticisi → TÜBİTAK raporu | Klinik Lider → etki belgesi | Ürün Sahibi → yatırım paketi & 2028-2030 yol haritası" },
    ],
  },
];

const statusIcon = (s: TimelineEntry["status"]) =>
  s === "completed" ? "✓" : s === "ongoing" ? "●" : "○";
const statusDotClass = (s: TimelineEntry["status"]) =>
  s === "completed" ? "bg-green-500" : s === "ongoing" ? "bg-yellow-400" : "bg-gray-300";

const statusLabel = (s: TimelineEntry["status"]) =>
  s === "completed" ? "Tamamlandı" : s === "ongoing" ? "Devam Ediyor" : "Planlandı";

const TODAY_STAMP = "03.03.2026";

function NewStamp() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
      🆕 {TODAY_STAMP}
    </span>
  );
}

function getItemDetail(period: string, category: string, item: string): ItemDetail {
  const base = { title: `${period} • ${category}`, itemText: item, category, period };

  // 1) Önce zengin format
  if (timelineDetailsRich[item]) {
    const r = timelineDetailsRich[item];
    return { ...base, lead: r.lead, points: r.points, tags: r.tags, sections: r.sections };
  }

  // 2) Eski string[] formatından dönüştür
  if (timelineDetails[item]) {
    const arr = timelineDetails[item];
    return {
      ...base,
      lead: arr[0],
      points: arr.slice(1),
      tags: [category],
    };
  }

  // 3) Genel fallback
  return {
    ...base,
    lead: "Bu faaliyet dönem hedeflerinin uygulama adımını tanımlar ve sorumlu ekiplerce periyodik olarak doğrulanır.",
    points: [
      "Faaliyet kapsamı, sorumlular ve bağımlılıklar ekip içi görev dağılımıyla netleştirildi.",
      "İlerleme metrikleri ve kabul kriterleri ölçülebilir formatta tanımlandı.",
      "Beklenen çıktılar doğrulanabilir kayıt formatında sisteme işlendi.",
    ],
    tags: [category],
  };
}
export default function Home() {
  const [selected, setSelected] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<ItemDetail | null>(null);
  const [showSections, setShowSections] = useState(false);
  const entry = timelineData[selected];
  const style = phaseStyle[entry.phase];

  const openDetail = (detail: ItemDetail) => {
    setShowSections(false);
    setActiveDetail(detail);
  };
  const closeDetail = () => {
    setShowSections(false);
    setActiveDetail(null);
  };

  useEffect(() => {
    if (!activeDetail) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDetail]);

  const handleMonthSelect = (idx: number) => {
    setSelected(idx);
    setSidebarOpen(false);
    closeDetail();
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* ── MOBİL OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── SIDEBAR ── full height */}
      <aside
        id="sidebar"
        className={`
          fixed z-30 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:shrink-0 md:z-auto
        `}
        aria-label="Proje navigasyonu"
      >
        {/* Sidebar top brand */}
        <div className="px-4 py-4 border-b border-gray-200 shrink-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">AffectLog-TR</p>
            <p className="text-xs text-gray-400 mt-0.5">Proje Zaman Çizelgesi</p>
          </div>
          <button
            className="md:hidden p-1 rounded text-gray-400 hover:text-gray-600"
            onClick={() => setSidebarOpen(false)}
            aria-label="Menüyü kapat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="py-3" aria-label="Proje fazları ve aylar">
            {phases.map((faz) => {
              const s = phaseStyle[faz.name];
              const months = timelineData.filter((d) => d.phase === faz.name);
              return (
                <div key={faz.name} className="mb-1">
                  {/* Phase header */}
                  <div className={`mx-2 px-3 py-2 rounded-lg ${s.bg} border ${s.border}`}>
                    <p className={`text-xs font-bold ${s.text}`}>{faz.name}</p>
                    <p className={`text-xs opacity-70 ${s.text}`}>{faz.range}</p>
                  </div>
                  {/* Months */}
                  <ul className="mt-1 mb-2">
                    {months.map((m) => {
                      const idx = timelineData.indexOf(m);
                      const isActive = selected === idx;
                      return (
                        <li key={idx}>
                          <button
                            onClick={() => handleMonthSelect(idx)}
                            aria-current={isActive ? "page" : undefined}
                            aria-label={`${m.period} — ${statusLabel(m.status)}`}
                            className={`w-full flex items-center gap-2.5 px-5 py-2 text-left transition-colors
                              ${isActive
                                ? `${s.bg} ${s.text} font-semibold`
                                : "text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${statusDotClass(m.status)}`}
                              aria-hidden="true"
                            />
                            <span className="text-sm truncate">{m.period}</span>
                            <span className="ml-auto text-xs opacity-50" aria-hidden="true">{statusIcon(m.status)}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── RIGHT SIDE: header + content + footer ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">

        {/* ── TOP HEADER ── */}
        <header className="bg-white border-b border-gray-200 shrink-0">
          <div className="px-4 md:px-6 py-5 flex flex-wrap items-start justify-between gap-4">
            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden p-2 -ml-1 rounded text-gray-500 hover:bg-gray-100 self-center"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5">
                KEREGE Yazılım Bilişim Teknolojileri A.Ş.
              </p>
              <h1 className="text-xl font-bold text-gray-900">AffectLog-TR</h1>
              <p className="text-sm text-gray-500">Dijital Psikolojik Destek Platformu — 24 Aylık Proje Zaman Çizelgesi</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
              <span><span className="font-medium text-gray-700">Başlangıç:</span> 05.12.2025</span>
              <span><span className="font-medium text-gray-700">Bitiş:</span> 05.12.2027</span>
              <span><span className="font-medium text-gray-700">Yönetici:</span> Önder Öztürk</span>
              <span><span className="font-medium text-gray-700">Bütçe:</span> 4.092.000 TL</span>
            </div>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Period title */}
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{entry.period}</h2>
              <span className="text-sm text-gray-400">{entry.subtitle}</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
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
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" /> Planlandı
                </span>
              )}
            </div>
            <p className="text-gray-500">{entry.summary}</p>
          </div>

          {/* ── DÖNEM NOTLARI (aya özgü) ── */}
          {entry.upgradeNotes.length > 0 && (
            <section className="mb-5 rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-700">Dönem Notları — {entry.period}</h3>
                <NewStamp />
              </div>
              <ul className="divide-y divide-slate-100">
                {entry.upgradeNotes.map((note, i) => {
                  const cs = upgradeCategoryStyle[note.category] ?? {
                    bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-400",
                  };
                  return (
                    <li key={i} className="px-4 py-3 flex flex-wrap items-start gap-3">
                      <span className={`shrink-0 mt-0.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${cs.bg} ${cs.text} border ${cs.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`} />
                        {note.category}
                      </span>
                      <span className="flex-1 text-sm text-slate-700">{note.note}</span>
                      <NewStamp />
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* ── Acil güvenlik notu ── */}
          <section className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-800 flex flex-wrap items-start justify-between gap-2">
              <span>
                Acil güvenlik notu: Bu platform bilgilendirme amaçlı bir proje yol haritası sunar. Acil risk durumunda
                112 veya Alo 183 ile derhal iletişime geçilmelidir.
              </span>
              <NewStamp />
            </p>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Activities */}
            <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">
                  {entry.status === "completed" ? "Dönem İçinde Tamamlananlar" : "Planlanan Faaliyetler"}
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {entry.items.map((cat, j) => (
                  <div key={j} className="px-4 py-4">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${style.text}`}>
                      {cat.category}
                    </p>
                    <ul className="space-y-2">
                      {cat.items.map((item, k) => (
                        <li key={k} className="flex gap-2 text-sm text-gray-700">
                          <span className={`mt-0.5 shrink-0 ${entry.status === "completed" ? "text-green-500" : "text-blue-400"}`}>
                            {entry.status === "completed" ? "✓" : "→"}
                          </span>
                          <div className="flex flex-wrap items-start gap-1.5">
                            <span>{item}</span>
                            <button
                              type="button"
                              onClick={() => openDetail(getItemDetail(entry.period, cat.category, item))}
                              className="cursor-pointer inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-300 bg-sky-50 text-[11px] font-bold text-sky-700 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                              aria-label={`Detayı aç: ${item}`}
                              title="Detayı gör"
                            >
                              ⓘ
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
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

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {entry.status === "completed" ? "Dönem Çıktıları" : "Beklenen Çıktılar"}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 px-4 py-4">
                  {entry.outputs.map((o, j) => (
                    <span key={j} className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset
                      ${entry.status === "completed"
                        ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10"}`}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-2">
                {selected > 0 && (
                  <button onClick={() => {
                    setSelected(selected - 1);
                    closeDetail();
                  }}
                    className="flex-1 py-2 px-3 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    ← {timelineData[selected - 1].period}
                  </button>
                )}
                {selected < timelineData.length - 1 && (
                  <button onClick={() => {
                    setSelected(selected + 1);
                    closeDetail();
                  }}
                    className="flex-1 py-2 px-3 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    {timelineData[selected + 1].period} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-300 shrink-0">
        <div className="px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <span className="text-white font-semibold">KEREGE Yazılım Bilişim Teknolojileri A.Ş.</span>
              <span>Proje: AL-TR-25-DPS-MVP</span>
              <span>Destekleyen: TÜBİTAK / TGB</span>
              <span>Yönetici: Önder Öztürk</span>
              <span>info@kerege.com.tr</span>
            </div>
            <span className="text-xs text-gray-500">© 2025–2027 Tüm hakları saklıdır.</span>
          </div>
        </div>
      </footer>
      </div>{/* end right side */}

      {activeDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Backdrop */}
          <button
            type="button"
            className="detail-backdrop absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-default"
            onClick={() => closeDetail()}
            aria-label="Kapat"
          />

          {/* Modal Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeDetail.itemText}
            className="detail-popup relative z-10 w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl bg-white shadow-[0_32px_72px_-8px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden"
          >
            {/* Gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

            {/* Header */}
            <div className="flex items-start gap-3 px-5 pt-4 pb-3.5 border-b border-slate-100">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-sky-100 text-sky-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    {activeDetail.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{activeDetail.period}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-800 leading-snug">
                  {activeDetail.itemText}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => closeDetail()}
                className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Kapat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 max-h-[65vh] overflow-y-auto space-y-4">
              {/* Lead */}
              <p className="text-sm leading-relaxed text-slate-700 bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 rounded-xl px-4 py-3">
                {activeDetail.lead}
              </p>

              {/* Points */}
              {activeDetail.points.length > 0 && (
                <ul className="space-y-2.5">
                  {activeDetail.points.map((point, i) => {
                    const isExpandable = i === 0 && !!activeDetail.sections?.length;
                    return (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-sky-100">
                          <svg className="w-3 h-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {isExpandable ? (
                          <button
                            type="button"
                            onClick={() => setShowSections(v => !v)}
                            className="flex-1 text-left text-sky-700 font-medium underline decoration-dashed underline-offset-2 hover:text-sky-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{point}</span>
                            <svg
                              className={`w-3.5 h-3.5 shrink-0 transition-transform ${showSections ? "rotate-180" : ""}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-slate-700">{point}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Expanded test sections (PHQ-9 / GAD-7) */}
              {showSections && activeDetail.sections && activeDetail.sections.length > 0 && (
                <div className="space-y-4">
                  {activeDetail.sections.map((sec, si) => (
                    <div key={si} className="rounded-xl border border-indigo-100 bg-indigo-50/50 overflow-hidden">
                      <div className="px-4 py-2.5 bg-indigo-100/70 border-b border-indigo-100">
                        <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wider">{sec.title}</h5>
                        <p className="text-[11px] text-indigo-600 mt-0.5 leading-snug">{sec.description}</p>
                      </div>
                      <ol className="px-4 py-3 space-y-1.5">
                        {sec.items.map((q, qi) => (
                          <li key={qi} className="text-xs text-slate-700 leading-relaxed">{q}</li>
                        ))}
                      </ol>
                      <div className="px-4 py-2 bg-indigo-100/50 border-t border-indigo-100">
                        <p className="text-[11px] font-semibold text-indigo-700">
                          <span className="mr-1 text-indigo-400">Puanlama:</span>{sec.scoring}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {activeDetail.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                  {activeDetail.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 text-slate-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
