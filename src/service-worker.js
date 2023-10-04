const cacheVersion = 'ccc-v1';
const dynamicCacheName = 'ccc-dynamic-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      const cacheMaxAgeInSeconds = 300; // 5 minutes
      if (response && Date.now() - new Date(response.headers.get('date')) < cacheMaxAgeInSeconds * 1000) {
        return response;
      }
      return fetch(event.request)
        .then(networkResponse => {
          const clonedResponse = networkResponse.clone();
          caches.open(dynamicCacheName)
            .then(cache => cache.put(event.request, clonedResponse));
          return networkResponse;
        })
        .catch(() => {
          return response || caches.match('/offline.html');
        });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== cacheVersion)
          .map(name => caches.delete(name))
      );
    })
  );
});





// const dynamicCacheName = 'your-pwa-dynamic-cache-v1';

// self.addEventListener('install', (event) => {
//   event.waitUntil(self.skipWaiting());
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       const cacheMaxAgeInSeconds = 300; // 5 minutes
//       if (response && Date.now() - new Date(response.headers.get('date')) < cacheMaxAgeInSeconds * 1000) {
//         return response;
//       }
//       return fetch(event.request)
//         .then(networkResponse => {
//           const clonedResponse = networkResponse.clone();
//           caches.open(dynamicCacheName)
//             .then(cache => cache.put(event.request, clonedResponse));
//           return networkResponse;
//         })
//         .catch(() => {
//           return response || caches.match('/offline.html');
//         });
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });



// const CACHE_NAME = 'my-cache-v1';
// const cacheUrls = [
//   '/',
//   '/index.html',
// //   '/styles/main.css',
// //   '/scripts/main.js',
// //   '/images/logo.png'
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(cacheUrls);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).then((fetchResponse) => {
//         if (fetchResponse && fetchResponse.status === 200) {
//           const responseClone = fetchResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseClone);
//           });
//         }
//         return fetchResponse;
//       });
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         })
//       );
//     })
//   );
// });





// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// import { precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { NetworkFirst } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { clientsClaim } from 'workbox-core';

// clientsClaim();

// /*const { precacheAndRoute } = workbox.precaching;
// const { registerRoute } = workbox.routing;
// const { NetworkFirst } = workbox.strategies;*/

// // Define your cache entries as an array of objects with URL and revision info
// const cacheEntries = [
//     { url: '/icons/icon192.png', revision: '12345' },
//     { url: '/path/to/file2', revision: '67890' },
//     // Add more entries as needed
// ];

// precacheAndRoute(cacheEntries);

// // precacheAndRoute(self.__WB_MANIFEST);

// registerRoute(
//     ({ request }) => request.method === 'PUT',
//     new NetworkFirst({
//         cacheName: 'ccc-cache-post',
//         plugins: [
//             new ExpirationPlugin({
//                 maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
//                 maxEntries: 100,
//             }),
//         ],
//     })
// );

