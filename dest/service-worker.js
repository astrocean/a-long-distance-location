//service-worker的作用域与service-worker.js存放的位置有关
var cacheName = 'a-long-distance-location-2';
var dataCacheName='a-long-distance-location-data';
var filesToCache = [
  '/',
  '/index.html',
  '/js/main.js',
  '/css/styles.css',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/icon.png'
];
self.addEventListener('install',function(e){
  console.log('ServiceWorker Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log('ServiceWorker Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
//当 service worker 开始启动时，这将会发射activate事件
self.addEventListener('activate',function(e){
  console.log('ServiceWorker Activate');
  e.waitUntil(caches.keys().then(function(keyList){
    return Promise.all(keyList.map(function(key){
      if(key!=cacheName && key !== dataCacheName){
        console.log('ServiceWorker Removing old cache',key);
        return caches.delete(key);
      }
    }));
  }));
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch',function(e){
  // console.log('ServiceWorker fetch',e);
   var dataUrl = '-----';
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache){
        return fetch(e.request).then(function(response){
          cache.put(e.request.url,response.clone());
          return response;
        });
    }));
  }else{
    e.respondWith(
      caches.match(e.request).then(function(response){
        return response || fetch(e.request);
      })
    );
  }
});