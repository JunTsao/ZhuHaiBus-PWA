workbox.core.setCacheNameDetails({
  prefix: 'sw-tools',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime-cache',
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  /.*api.*details/g,
  workbox.strategies.cacheFirst({
    cacheName: 'details-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);
workbox.routing.registerRoute(
  /.*api.*stations/g,
  workbox.strategies.cacheFirst({
    cacheName: 'stations-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
);
