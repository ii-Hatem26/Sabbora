const CACHE_NAME = 'sabbora-cache-v1';
const ASSETS_TO_CACHE = [
  '/AssignOrg/',
  '/AssignOrg/index.html',
  '/AssignOrg/manifest.json',
  '/AssignOrg/icon-512.png'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل الـ Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// جلب الملفات من التخزين المحلي في حال عدم وجود إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
