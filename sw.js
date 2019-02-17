var CACHE_NAME = 'my-site-cache';
var urlsToCache = [
  '/',
  '/style.css'
];

self.onmessage = function(e){
  console.log(e.data);
  if( e.data == 'request' ){
     self.postMessage({name:'Mai Chan'});
  }
}



self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
      .then(function(response) {
        // Cache hit - return response
        console.log(response)
        if (response) {
          return response;
        }

        return fetch(e.request).then(
          function(response) {

            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(e.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});