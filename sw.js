/* as taught at Wittr App */

/**
 * Opening New cache
 */

var staticCacheName = 'restaurant-review-v8';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/restaurant.html',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'data/restaurants.json'
      ]);
    }).catch(function(error) {
      console.log(error);
    })
  );
});

/**
 *Activating New Cache and Deleting the older version(s)
 */

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-review-') &&
            cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/**
 * Respond with Cache
 */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
