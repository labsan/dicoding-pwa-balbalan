// Import Workbox CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log('Workbox berhasil dimuat!.');

 // Precaching App Shell
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' }, 
        { url: 'index.html', revision: '1' },
        { url: 'manifest.json', revision: '1' },
        { url: 'index.js', revision: '1' },
        { url: 'serviceworker.js', revision: '1' },
        { url: 'push.js', revision: '1' },

        { url: 'styles/libs/materialize.min.css', revision: '1' },
        { url: 'styles/custom.css', revision: '1' },

        { url: 'scripts/libs/materialize.min.js', revision: '1' },
        { url: 'scripts/libs/idb.min.js', revision: '1' },
        
        { url: 'scripts/utils/register-notif.js', revision: '1' },
        { url: 'scripts/utils/register-sw.js', revision: '1' },
        { url: 'scripts/utils/initiator-drawer.js', revision: '1' },
        { url: 'scripts/utils/urlBase64ToUint8Array.js', revision: '1' },

        { url: 'scripts/routes/route.js', revision: '1' },
        { url: 'scripts/routes/parse-url.js', revision: '1' },
        
        { url: 'scripts/view/App.js', revision: '1' },
        { url: 'scripts/view/pages/favorit-klub.js', revision: '1' },
        { url: 'scripts/view/pages/info-klub.js', revision: '1' },
        { url: 'scripts/view/pages/klasemen.js', revision: '1' },
        { url: 'scripts/view/pages/klub.js', revision: '1' },
        { url: 'scripts/view/pages/pertandingan.js', revision: '1' },
        
        { url: 'scripts/data/data-favorit-klub.js', revision: '1' },
        { url: 'scripts/data/data-klasemen.js', revision: '1' },
        { url: 'scripts/data/data-klub.js', revision: '1' },
        { url: 'scripts/data/data-pertandingan.js', revision: '1' },

        { url: 'images/maskable_icon-16x16-v2.png', revision: '1' },
        { url: 'images/maskable_icon-32x32-v2.png', revision: '1' },
        { url: 'images/maskable_icon-96x96-v2.png', revision: '1' },
        { url: 'images/maskable_icon-192x192-v2.png', revision: '1' },
        { url: 'images/maskable_icon_apple-192x192-v2.png', revision: '1' },
        { url: 'images/maskable_icon-512x512-v2.png', revision: '1' },
        { url: 'images/icon-mola-tv.png', revision: '1' }
    ]);

    // Management caching API google fonts data storage in browser
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-google-fonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [200]
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                }),
            ]
        })
    );

    // Management caching API football data storage in browser
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-football-data',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [200]
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                }),
            ]
        })
    );

    // Management caching API image team data storage in browser
    workbox.routing.registerRoute(
        new RegExp('https://crests.football-data.org/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-api-image-team-football',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [200]
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                }),
            ]
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
            icon: 'images/maskable_icon-192x192-v2.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        })
    )
})
