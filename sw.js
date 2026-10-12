/* =========================================================
   DiarIA — Service Worker
   ========================================================= */
const CACHE_VERSION = 'diaria-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Archivos que se cachean al instalar
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/img/icon-192.png',
  '/img/icon-512.png'
];

// ---------- INSTALL ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ---------- ACTIVATE ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ---------- FETCH ----------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo GET
  if (request.method !== 'GET') return;

  // No cachear APIs dinámicas (siempre red primero)
  const esAPI =
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('newsdata.io') ||
    url.hostname.includes('bluelytics.com.ar') ||
    url.hostname.includes('wttr.in') ||
    url.hostname.includes('ipapi.co') ||
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('docs.google.com');

  if (esAPI) {
    // Network-first: intenta red, si falla devuelve cache si existe
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copia = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, copia));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Navegación: network-first con fallback a offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copia = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, copia));
          return res;
        })
        .catch(() =>
          caches.match(request).then((r) => r || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Recursos estáticos (CSS, JS, imágenes): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        // Solo cachear respuestas válidas del mismo origen o de Google Play icons
        if (
          res.ok &&
          (url.origin === self.location.origin ||
            url.hostname.includes('play-lh.googleusercontent.com') ||
            url.hostname.includes('via.placeholder.com'))
        ) {
          const copia = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(request, copia));
        }
        return res;
      });
    })
  );
});

// ---------- MENSAJE (para forzar update) ----------
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});