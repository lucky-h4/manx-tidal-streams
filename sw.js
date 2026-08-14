/* Manx Tidal Streams - service worker.
   Bump VERSION whenever index.html, the panels or the icons change,
   otherwise installed phones keep serving the cached copy. */
const VERSION = "v2";
const SHELL = "shell-" + VERSION;
const DATA  = "data-" + VERSION;

const HOURS = ["-06","-05","-04","-03","-02","-01","+00","+01","+02","+03","+04","+05","+06"];

const SHELL_FILES = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png",
  "./icons/maskable-512.png", "./icons/apple-touch-icon.png",
  ...HOURS.map(h => `./panels/hw${h}.jpg`)
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL)
      .then(c => c.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== DATA).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* The digitiser is a desktop working tool where a stale copy would be
     confusing, and it is never needed offline. Leave it to the network. */
  if (url.pathname.endsWith("digitise.html")) return;

  /* Tide times: network first, falling back to the last copy when there is no signal. */
  if (url.pathname.endsWith("tides.json") || url.pathname.endsWith("streams.json")) {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(DATA).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req))
    );
    return;
  }

  /* Everything else: cache first, so the app opens instantly and works with no signal. */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(SHELL).then(c => c.put(req, copy));
      return res;
    }))
  );
});
