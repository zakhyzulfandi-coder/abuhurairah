PANDUAN SETUP GITHUB PAGES PWA
SISFO AHIS MTS

URL Apps Script yang sudah dimasukkan:
https://script.google.com/a/~/macros/s/AKfycbytGPvOxJSwIR7tsbPwq2CsgXCvRBOUnU0SbE3acmPjRQs8EIyRa2gYQhjamzwHCAGy/exec

STRUKTUR FILE:
/
├── index.html
├── manifest.webmanifest
├── sw.js
├── offline.html
└── icons/
    ├── icon-192.png
    └── icon-512.png

CARA UPLOAD KE GITHUB:
1. Buat repository baru, misalnya: ahis-mts-pwa
2. Upload seluruh isi folder ini ke repository.
3. Masuk Settings > Pages.
4. Source: Deploy from a branch.
5. Branch: main.
6. Folder: /root.
7. Save.
8. Tunggu 1-5 menit sampai URL GitHub Pages aktif.

CARA INSTALL:
- Android Chrome: buka URL GitHub Pages, lalu pilih Install app/Add to Home screen.
- Laptop Chrome/Edge: klik ikon install di address bar.

CATATAN PENTING:
1. Pastikan deployment Apps Script dapat diakses oleh user aplikasi.
2. Di Code.gs, pastikan doGet() tetap memakai:
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
3. Gunakan URL Apps Script /exec, bukan /dev.
4. PWA wrapper dapat terbuka offline, tetapi data Apps Script tetap membutuhkan internet.
5. Jika update file GitHub, naikkan APP_VERSION di index.html dan CACHE_NAME di sw.js.
