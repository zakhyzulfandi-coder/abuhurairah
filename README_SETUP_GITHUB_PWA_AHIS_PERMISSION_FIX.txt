PANDUAN SETUP GITHUB PAGES PWA
SISFO AHIS MTS - VERSI PERMISSION FIX

URL Apps Script:
https://script.google.com/a/~/macros/s/AKfycbytGPvOxJSwIR7tsbPwq2CsgXCvRBOUnU0SbE3acmPjRQs8EIyRa2gYQhjamzwHCAGy/exec

PERBAIKAN PADA VERSI INI:
1. iframe sudah diberi allow permission:
   - geolocation
   - notifications
   - camera
   - microphone
   - clipboard-read
   - clipboard-write
   - fullscreen
   - accelerometer
   - gyroscope
   - magnetometer

2. Ditambahkan panel "Izin Aplikasi" di wrapper GitHub:
   - Meminta izin lokasi/GPS
   - Meminta izin notifikasi
   - Mengecek status kamera dan clipboard
   - Menampilkan status Diizinkan / Ditolak / Perlu izin

3. Notifikasi dan geolocation tidak bisa dipaksa aktif otomatis.
   Browser tetap mewajibkan persetujuan pengguna.

STRUKTUR FILE:
/
├── index.html
├── manifest.webmanifest
├── sw.js
├── offline.html
└── icons/
    ├── icon-192.png
    └── icon-512.png

CARA UPDATE DI GITHUB:
1. Hapus/replace file lama di repository.
2. Upload semua isi folder ini.
3. Pastikan GitHub Pages tetap aktif:
   Settings > Pages > Deploy from a branch > main > /root
4. Buka URL GitHub Pages.
5. Jika muncul banner update, klik Update.
6. Jika masih terbaca versi lama, clear cache browser atau buka mode incognito dulu.

CATATAN PENTING:
1. Google Apps Script tetap harus memiliki:
   .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

2. Permission di iframe hanya memberi izin teknis agar aplikasi di dalam iframe boleh meminta akses.
   User tetap harus menekan Allow/Izinkan di browser.

3. Untuk fitur absensi hadir, izin paling penting adalah lokasi/GPS.

4. Untuk notifikasi, beberapa browser membatasi notifikasi dari iframe.
   Karena itu wrapper GitHub juga meminta izin notifikasi dari halaman utama PWA.

5. Jika GPS tetap tidak muncul:
   - Pastikan situs GitHub Pages dibuka via HTTPS.
   - Pastikan izin lokasi browser tidak diblokir.
   - Pastikan GPS HP aktif.
   - Buka pengaturan Chrome > Site Settings > Location > izinkan URL GitHub Pages.
