const cacheName = 'aomikage-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/games/flappy/index.html',
  '/games/flappy/style.css',
  '/games/flappy/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
