const CACHE_NAME = 'onestop-pwa-v3';

// Cache core assets for offline usage
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/standalone.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.jpg'
];

// Install Event - Pre-cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA Service Worker] Pre-caching offline assets');
      return Promise.allSettled(
        PRECACHE_ASSETS.map(url => 
          cache.add(url).catch(err => console.warn('[PWA Service Worker] Failed to cache asset:', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[PWA Service Worker] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate / Cache-first strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Same-origin (Local App Assets)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version immediately and update cache in background
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
            }
          }).catch(() => {/* Offline background update ignore */});
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/standalone.html') || caches.match('/index.html');
          }
        });
      })
    );
  } else {
    // External resources (CDNs, Fonts, React, Tailwind)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => {
          // If offline and request is an image or script, try cached fallback
          return caches.match(event.request);
        });
      })
    );
  }
});

// Listen for skipWaiting command
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
