const CACHE_NAME = "sisfo-ahis-offline-cache-v2026063001";

const APP_SHELL = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./manifest-mobile.webmanifest"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return Promise.allSettled(
          APP_SHELL.map(function (url) {
            return cache.add(url);
          })
        );
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Halaman utama GitHub/Vercel: network first, fallback offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put("./", copy);
          });
          return response;
        })
        .catch(function () {
          return caches.match("./offline.html").then(function (offline) {
            return offline || new Response(
              "<!doctype html><html><body style='font-family:sans-serif;padding:24px'><h1>Anda sedang offline</h1><p>SISFO AHIS akan dimuat ulang otomatis saat internet tersambung.</p><script>window.addEventListener('online',function(){location.href='./'});setInterval(function(){if(navigator.onLine)location.href='./'},2500);</script></body></html>",
              { headers: { "Content-Type": "text/html; charset=utf-8" } }
            );
          });
        })
    );
    return;
  }

  // Asset lokal: cache first, refresh di belakang.
  if (sameOrigin) {
    event.respondWith(
      caches.match(request).then(function (cached) {
        const fetchPromise = fetch(request)
          .then(function (response) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, copy);
            });
            return response;
          })
          .catch(function () {
            return cached;
          });

        return cached || fetchPromise;
      })
    );
  }

  // Google Apps Script di iframe membutuhkan internet.
  // Wrapper index.html yang akan menahan iframe agar tidak menampilkan error browser saat offline.
});
