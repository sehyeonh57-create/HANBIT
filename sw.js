const CACHE='hanbit-web-050-mobile-1';
const assets=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(assets)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hanbit-web-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;const asset=assets.find(a=>new URL(a,self.registration.scope).href===r.url);if(r.mode==='navigate'||asset)e.respondWith((async()=>{const c=await caches.open(CACHE);const key=r.mode==='navigate'?'./index.html':asset;try{const response=await fetch(r);if(response.ok)await c.put(key,response.clone());return response;}catch{return await c.match(key)||Response.error();}})());});
