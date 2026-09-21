const CACHE_NAME = "at-afghanen-app-v28";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=77",
  "./app.js?v=45",
  "./pwa.js?v=11",
  "./manifest.webmanifest",
  "./assets/app-icon.svg",
  "./assets/hero-luxury.webp",
  "./assets/logo.gif"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

self.addEventListener("push", event => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch { payload = { body: event.data?.text() || "" }; }
  const title = payload.title || "AT Afghanen";
  const options = {
    body: payload.body || "یک محصول جدید برای شما منتشر شد",
    icon: payload.icon || "./assets/app-icon.svg",
    badge: payload.badge || "./assets/app-icon.svg",
    image: payload.image,
    data: { url: payload.url || "./#collection" },
    tag: payload.tag || "at-afghanen-update",
    renotify: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "./", self.location.origin).href;
  event.waitUntil(
    clients.matchAll({type:"window",includeUncontrolled:true}).then(windows => {
      const existing = windows.find(client => client.url.startsWith(self.location.origin));
      if (existing) { existing.navigate(target); return existing.focus(); }
      return clients.openWindow(target);
    })
  );
});
