'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1cf85106e59bd64959a915c64e2a82b4",
"assets/AssetManifest.bin.json": "2e520143677e685b22fb71758d14315c",
"assets/AssetManifest.json": "d2a42d3cba28d1707afd1059463d1604",
"assets/assets/1.png": "d84363e6a1524abe548aeabfc05df998",
"assets/assets/1.webp": "1d14291432dd6c6baa9ec140db6da0ed",
"assets/assets/2.jpg": "ace848fdca27dae64df1231580fa0aba",
"assets/assets/2.webp": "ff5ec700758100915f983fe4675bbc4d",
"assets/assets/3.webp": "c85f0b37dda719d189ef56d105c2fd4e",
"assets/assets/4.jpg": "1826d74e9366c2f074885d834ea20e1b",
"assets/assets/5.jpg": "19151b58ea6957bdc69490ff955dec6e",
"assets/assets/bgVideo.gif": "79927bcb24007a5775f37e5c96391bce",
"assets/assets/c-letter.svg": "f3ed941bffdaea6dec1f55377fb31bf9",
"assets/assets/c-plusplus.svg": "eba02f327ce65110fb21ffb9e964d9f0",
"assets/assets/code.svg": "0b0b54f7411924726b8c0685433b162f",
"assets/assets/dart.svg": "e8f7e9dd5dfc0fa8b5b4af6adbe66aba",
"assets/assets/fb.jpeg": "ad5b7e6a3085dc50038d321c2ea2e18a",
"assets/assets/file-type-kotlin.svg": "60cd665422dc02f2de69fd6ad8c63366",
"assets/assets/firebase.svg": "608de85fa2b12cc17325eee532357713",
"assets/assets/flutter.svg": "fb9e82f4de3bbd9bbf23f8af17199313",
"assets/assets/github.svg": "66f2ecc454208218685593f6df122bbe",
"assets/assets/google.jpeg": "7eb9878532f49237cb68220fe24b358f",
"assets/assets/instagram.jpeg": "7940b23ea5b8ca820a6d04b58bd09780",
"assets/assets/java-original.svg": "66517ded2b3a6bef72a9c7fc9a1fc931",
"assets/assets/linkedin.jpeg": "bbecfafe45dbb7a87b9295852a01a6eb",
"assets/assets/logo.png": "ac6718ffabd8848b3c88164f3ee26c3a",
"assets/assets/logowithname.png": "817a6a1f308df36d9b99a4ee9d5a8860",
"assets/assets/playstore.png": "5814df439fa6704e646a2db01cd6ff35",
"assets/assets/react.svg": "7ceb0e4046b15c7ec1620ba8a9ce0483",
"assets/assets/snapchat.jpeg": "4973e9b29a2d11a66f10cf7bb1297d06",
"assets/assets/sql.svg": "690b33c2180b2ad1905d893a8622ebbe",
"assets/assets/telegram.jpeg": "87ab0906044b0702a88c86bca313c34d",
"assets/assets/twitter.jpeg": "68aec46bc05ee1c9616bdd0c74c55cc4",
"assets/assets/V.png": "0b27f84882e83114927a4788ad09d398",
"assets/assets/whatsapp.jpeg": "33ed92b396c4a5ff22f16a108711128b",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4ee5eafcd7ae7fdc4d951ec153262536",
"assets/NOTICES": "862a5d988b6d8e25334f6f9fca4c03f1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6c89cc9326a7dcb0f7ff159fd7b1512c",
"/": "6c89cc9326a7dcb0f7ff159fd7b1512c",
"main.dart.js": "64a101e2bb7deecdf632546840e89f79",
"manifest.json": "e74af8957b5899dc6da961caee768ec9",
"version.json": "009c9e65172e010890f7f65fde438006"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
