// Minimal, safe service worker
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

// No fetch handlers; acts as a placeholder only
