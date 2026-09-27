// Service worker : réseau d'abord (toujours la dernière version),
// cache en secours pour que l'appli s'ouvre sans connexion.
// Aucune donnée du carnet ne passe ici : elles restent dans le navigateur.
var CACHE = "carnet-v1";
var FICHIERS = ["./", "index.html", "manifest.json", "static/icone.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FICHIERS); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copie = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copie); });
      return r;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("./"); });
    })
  );
});
