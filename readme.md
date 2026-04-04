# 🏥 Pusat Integrasi Data Digital - PKM Kiarapedes

![Status](https://img.shields.io/badge/Status-Active-emerald)
![Environment](https://img.shields.io/badge/Environment-Production-blue)
![Security](https://img.shields.io/badge/Security-Encrypted-orange)

Portal utama integrasi layanan digital **Puskesmas Kiarapedes** yang menghubungkan berbagai modul administrasi, pelayanan, dan analisis data dalam satu gerbang akses (Single Entry System).

---

## 🌐 Navigasi Sistem

Sistem ini mengintegrasikan beberapa modul utama guna mendukung **Integrasi Layanan Primer (ILP)**:

### 1. 📊 Analisis Data
Sinkronisasi data antar platform (ASIK vs E-Puskesmas) serta pemetaan tren penyakit wilayah kerja.

### 2. 📂 Arsip Digital
Pusat digitalisasi surat, regulasi, dan dokumen akreditasi. Menggunakan klasifikasi **Perbup No. 135 Tahun 2023**.
* **Fitur**: Smart Tooltip, QR Code Scanner, dan Label Generator.

### 3. 👥 Simpeg Digital
Manajemen data SDM dan monitoring masa berlaku STR/SIP tenaga kesehatan.
* **Fitur**: Notifikasi masa berlaku berkas dan arsip kepegawaian.
===Dalam Pengembangan===

### 4. 🛠️ E-Sarpras (Development)
Inventarisasi alat kesehatan dan sarana prasarana secara real-time.
===Dalam Pengembangan===

### 5. 🛠️ Aplikasi Lainnya
Penunjang kinerja Puskesmas Kiarapedes.
===Dalam Pengembangan===

---

## 🛠️ Arsitektur Logika Sistem

Sistem bekerja dengan hirarki sebagai berikut:
1.  **Frontend**: Landing page menggunakan Tailwind CSS untuk akses responsif via HP/Laptop.
2.  **Authentication**: Verifikasi akses menggunakan token enkripsi `SECRET_TOKEN`.
3.  **Data Layer**: Mengintegrasikan **Google Apps Script (GAS)** sebagai jembatan data antara antarmuka web dan database Cloud.
4.  **Security**: Proteksi sesi login berbasis browser untuk menjaga keamanan data sensitif.

---

## ⚙️ Panduan Penggunaan untuk Petugas

1.  **Akses Sistem**: Buka [Link Portal](https://registerpkmkrpds-wq.github.io/pkmkpds-digital-integrasi/index.html).
2.  **Verifikasi**: Klik tombol **Verifikasi Akses** dan masukkan PIN Otorisasi Anda.
3.  **Input & Sinkronisasi**: 
    * Setiap perubahan data di modul (seperti Arsip) wajib menekan tombol **Sync Cloud** agar data tersimpan permanen.
    * Gunakan fitur **Pusat Bantuan** di masing-masing modul untuk instruksi detail.

---

## 📋 Standar Operasional (SOP) Digitalisasi

* **Format File**: Seluruh dokumen wajib diunggah dalam format `.pdf` dengan ukuran maksimal 2MB.
* **Penamaan**: Gunakan format `KODE_PERALATAN/NOMOR/BULAN/TAHUN`.
* **Sinkronisasi**: Data wajib disinkronkan setiap akhir jam kerja untuk menghindari kehilangan data lokal.

---

## 🔒 Privasi dan Keamanan
* Sistem ini mencatat setiap log keamanan sesi.
* Penyalahgunaan akses oleh pihak tidak berwenang akan tercatat secara otomatis pada sistem *back-end*.

---

**Dikembangkan oleh:** Tim IT & Digitalisasi Puskesmas Kiarapedes  
*Copyright © 2026 - Pusat Integrasi Data Digital*
