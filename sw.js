/* Easter Chick Maze — service worker.
 * Cache-first for the app shell (index.html + manifest.json) so the game
 * works offline after one visit. No build step, no dependencies.
 * NOTE: this file must be served from the same origin as index.html —
 * service workers cannot be registered from a Blob URL (the old code
 * tried that, and browsers silently rejected it).
 */
const CACHE_NAME = 'easter-chick-maze-v1';
const APP_SHELL = ['index.html', 'manifest.json', './'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
