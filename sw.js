const CACHE_NAME = 'stc-v30';
const APP_URL = new URL('./index.html', self.registration.scope).href;
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try { await cache.add(new Request(APP_URL, {cache:'reload'})); } catch (e) { console.warn('App shell cache failed', e); }
    const firebaseSdk = [
      'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js',
      'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'
    ];
    await Promise.all(firebaseSdk.map(async url => {
      try {
        const request = new Request(url, {mode:'cors'});
        const response = await fetch(request);
        if (response && response.ok) await cache.put(request, response.clone());
      } catch (e) { console.warn('Firebase SDK could not be cached:', url, e); }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('selim-trade-center-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) await cache.put(APP_URL, fresh.clone());
        return fresh;
      } catch (e) {
        return (await cache.match(req)) || (await cache.match(APP_URL)) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response && (response.ok || response.type === 'opaque')) {
        try { await cache.put(req, response.clone()); } catch (_) {}
      }
      return response;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
