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
  // No .catch() here on purpose: if caching the app shell fails, the
  // install must fail so the browser retries later. Swallowing the
  // rejection would activate a worker with an empty cache, and the
  // fetch handler never fills it, so offline loading would stay broken
  // until the worker file changes.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      // Only clean up this game's own old caches. Cache Storage is
      // shared across every service-worker scope on ymll.github.io, so
      // deleting every other key would wipe other project sites' data.
      Promise.all(keys.filter((k) => k.startsWith('easter-chick-maze-') && k !== CACHE_NAME).map((k) => caches.delete(k)))
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
