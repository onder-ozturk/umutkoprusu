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
  },
];

const statusIcon = (s: TimelineEntry["status"]) =>
  s === "completed" ? "✓" : s === "ongoing" ? "●" : "○";
const statusDotClass = (s: TimelineEntry["status"]) =>
  s === "completed" ? "bg-green-500" : s === "ongoing" ? "bg-yellow-400" : "bg-gray-300";

const statusLabel = (s: TimelineEntry["status"]) =>
  s === "completed" ? "Tamamlandı" : s === "ongoing" ? "Devam Ediyor" : "Planlandı";

const TODAY_STAMP = "03.03.2026";

const contentUpgradeItems = [
  "03.03.2026 durum özeti eklendi: Aralık 2025 tamamlandı, Ocak 2026 devam ediyor, Şubat 2026 planlandı, Mart 2026 planlandı.",
  "Durum güncelleme standardı tanımlandı: her ay kapanışında dönem statüsü (completed/ongoing/planned) revize edilecek.",
  "KPI zorunluluğu tanımlandı: her dönem en az 1 klinik etki, 1 operasyon ve 1 deneyim metriği ile takip edilecek.",
  "Risk günlüğü standardı eklendi: her dönem için en az 3 risk, aksiyon planı ve sorumlu kişi yazılacak.",
  "Bağımlılık kapıları netleştirildi: Etik kurul onayı, USVS/SKRS/FHIR erişimi ve ISO süreçleri kritik geçit olarak izlenecek.",
  "Sorumluluk matrisi şablonu eklendi: Klinik Lider, Ürün Sahibi, Teknik Lider ve Kurum Koordinatörü bazında sahiplik atanacak.",
  "Kanıt bağlantısı standardı eklendi: dönem çıktıları belge sürümü ve tarih bilgisiyle doğrulanacak.",
];

function NewStamp() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
      🆕 {TODAY_STAMP}
    </span>
  );
}

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const entry = timelineData[selected];
  const style = phaseStyle[entry.phase];

  const handleMonthSelect = (idx: number) => {
    setSelected(idx);
    setSidebarOpen(false);
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

          <section className="mb-5 rounded-xl border border-sky-200 bg-sky-50/80 overflow-hidden">
            <div className="px-4 py-3 border-b border-sky-200 bg-sky-100/70 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-sky-900">İçerik Güçlendirme Notları</h3>
              <NewStamp />
            </div>
            <ul className="divide-y divide-sky-100">
              {contentUpgradeItems.map((item) => (
                <li key={item} className="px-4 py-3 text-sm text-sky-900 flex flex-wrap items-start justify-between gap-2">
                  <span>{item}</span>
                  <NewStamp />
                </li>
              ))}
            </ul>
          </section>

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
                  <button onClick={() => setSelected(selected - 1)}
                    className="flex-1 py-2 px-3 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    ← {timelineData[selected - 1].period}
                  </button>
                )}
                {selected < timelineData.length - 1 && (
                  <button onClick={() => setSelected(selected + 1)}
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
    </div>
  );
}
