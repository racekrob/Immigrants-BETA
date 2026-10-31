const CACHE='immigrants-beta-v40';
const FILES=["./", "index.html", "manifest.json", "bill-1000.jpg", "bill-10000.jpg", "bill-2000.jpg", "bill-500.jpg", "bill-5000.jpg", "board.jpg", "card-air-lines.jpg", "card-alabama.jpg", "card-arizona.jpg", "card-arkansas.jpg", "card-back-special.jpg", "card-back-state.jpg", "card-california.jpg", "card-chief.jpg", "card-colorado.jpg", "card-commander.jpg", "card-connecticut.jpg", "card-delaware.jpg", "card-double-label.jpg", "card-federal-highways.jpg", "card-florida.jpg", "card-free-movement.jpg", "card-georgia.jpg", "card-idaho.jpg", "card-illinois.jpg", "card-independent-label.jpg", "card-indiana.jpg", "card-iowa.jpg", "card-kansas.jpg", "card-kentucky.jpg", "card-louisiana.jpg", "card-mafia.jpg", "card-maine.jpg", "card-maryland.jpg", "card-massachusetts.jpg", "card-michigan.jpg", "card-minnesota.jpg", "card-mississippi.jpg", "card-missouri.jpg", "card-montana.jpg", "card-nebraska.jpg", "card-nevada.jpg", "card-new-hampshire.jpg", "card-new-jersey.jpg", "card-new-mexico.jpg", "card-new-york.jpg", "card-north-carolina.jpg", "card-north-dakota.jpg", "card-ohio.jpg", "card-oklahoma.jpg", "card-oregon.jpg", "card-pennsylvania.jpg", "card-rhode-island.jpg", "card-sea-lines.jpg", "card-second-national-bank.jpg", "card-shareholder-10.jpg", "card-shareholder-20a.jpg", "card-shareholder-20b.jpg", "card-south-carolina.jpg", "card-south-dakota.jpg", "card-special-label.jpg", "card-tennessee.jpg", "card-texas.jpg", "card-utah.jpg", "card-vermont.jpg", "card-virginia.jpg", "card-washington-dc.jpg", "card-washington.jpg", "card-west-virginia.jpg", "card-wisconsin.jpg", "card-wyoming.jpg", "fb-app.js", "fb-auth.js", "fb-db.js", "flag-independent.jpg", "icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable.png", "title.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isPage=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/')||url.pathname.endsWith('.json');
  if(isPage){
    // nejdřív síť (aby se nová verze projevila hned), bez internetu z mezipaměti
    e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})
      .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return res;})));
});
