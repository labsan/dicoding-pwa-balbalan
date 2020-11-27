// Import Workbox CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat!.');

    // Precaching App Shell
    workbox.precaching.precacheAndRoute([{
        url: '/',
        revision: '1'
    }, {
        url: '/manifest.json',
        revision: '1'
    }, {
        url: '/index.html',
        revision: '1'
    }, {
        url: '/index.js',
        revision: '1'
    }, {
        url: '/push.js',
        revision: '1'
    }, {
        url: '/styles/libs/materialize.min.css',
        revision: '1'
    }, {
        url: '/styles/custom.css',
        revision: '1'
    }, {
        url: '/images/icon-mola-tv.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon-16x16-v2.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon-32x32-v2.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon-96x96-v2.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon-192x192-v2.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon_apple-192x192-v2.png',
        revision: '1'
    }, {
        url: '/images/maskable_icon-512x512-v2.png',
        revision: '1'
    }, {
        url: '/scripts/libs/materialize.min.js',
        revision: '1'
    }, {
        url: '/scripts/libs/idb.min.js',
        revision: '1'
    }, {
        url: '/scripts/data/data-klasemen.js',
        revision: '1'
    }, {
        url: '/scripts/data/data-klub.js',
        revision: '1'
    }, {
        url: '/scripts/data/data-favorit-klub.js',
        revision: '1'
    }, {
        url: '/scripts/routes/route.js',
        revision: '1'
    }, {
        url: '/scripts/routes/parse-url.js',
        revision: '1'
    }, {
        url: '/scripts/utils/initiator-drawer.js',
        revision: '1'
    }, {
        url: '/scripts/utils/register-notif.js',
        revision: '1'
    }, {
        url: '/scripts/utils/register-sw.js',
        revision: '1'
    }, {
        url: '/scripts/utils/urlBase64ToUint8Array.js',
        revision: '1'
    }, {
        url: '/scripts/view/App.js',
        revision: '1'
    }, {
        url: '/scripts/view/pages/klasemen.js',
        revision: '1'
    }, {
        url: '/scripts/view/pages/klub.js',
        revision: '1'
    }, {
        url: '/scripts/view/pages/favorit-klub.js',
        revision: '1'
    }, {
        url: '/scripts/view/pages/info-klub.js',
        revision: '1'
    }]);

    // Routing styles folder
    workbox.routing.registerRoute(
        new RegExp('/styles/'),
        workbox.strategies.cacheFirst({
            cacheName: 'local-styles'
        })
    );

    // Routing images folder
    workbox.routing.registerRoute(
        new RegExp('/images/'),
        workbox.strategies.cacheFirst({
            cacheName: 'local-images'
        })
    );

    // Routing pages folder
    workbox.routing.registerRoute(
        new RegExp('/scripts/view/pages/'),
        workbox.strategies.cacheFirst({
            cacheName: 'local-pages'
        })
    );

    // Route for setting image files storage [saved cache]
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'storage-images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60
                }),
            ],
        }),
    );

    // Route for setting API google fonts data storage [saved cache]
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'storage-api-google-fonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                }),
            ]
        })
    );

    // Caching styles folder
    workbox.routing.registerRoute(
        new RegExp('/styles/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-style-files'
        })
    );

    // Caching images folder
    workbox.routing.registerRoute(
        new RegExp('/images/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-image-files'
        })
    );

    // Caching pages folder
    workbox.routing.registerRoute(
        new RegExp('/scripts/view/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-page-files'
        })
    );

    // Caching API google fonts
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-google-fonts'
        })
    );

    // Caching API football data
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-football-data'
        })
    );

    // Caching API image team football
    workbox.routing.registerRoute(
        new RegExp('https://crests.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-image-team-football'
        })
    );

} else {
    console.log('Workbox gagal dimuat!');
}

// Push Notification Event
self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Pesan push tidak ada payload!';
    }

    event.waitUntil(
        self.registration.showNotification('Notifikasi Push', {
            body: body,
            icon: './images/maskable_icon-192x192-v2.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        })
    )
})