// Case Management System - Service Worker
const CACHE_NAME = 'cms-legal-v47';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './login.html',
  './admin.js',
  './manifest.webmanifest',
  './styles/tokens.css',
  './styles/reset.css',
  './styles/headerNav.css',
  './styles/layout.css',
  './styles/auth.css',
  './styles/components.css',
  './styles/modals.css',
  './styles/print.css',
  './services/supabaseClient.js',
  './services/caseService.js',
  './services/todoService.js',
  './services/ancillaryService.js',
  './utils/dateUtils.js',
  './utils/exportUtils.js',
  './utils/lucideIcons.js',
  './utils/tooltipController.js',
  './utils/uiUtils.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/icon.svg',
  './components/chambers-footer.js',
  './components/custom-calendar.css',
  './components/custom-calendar.js',
  './components/modals/case-modals.html',
  './components/modals/case-modals.js',
  './components/print/print-templates.html',
  './components/print/print-templates.js',
  './components/tabs/about/tab-about.html',
  './components/tabs/about/tab-about.css',
  './components/tabs/about/tab-about.js',
  './components/tabs/add/tab-add.html',
  './components/tabs/add/tab-add.css',
  './components/tabs/add/tab-add.js',
  './components/tabs/all/tab-all.html',
  './components/tabs/all/tab-all.css',
  './components/tabs/all/tab-all.js',
  './components/tabs/calendar/tab-calendar.html',
  './components/tabs/calendar/tab-calendar.css',
  './components/tabs/calendar/tab-calendar.js',
  './components/tabs/causelist/tab-causelist.html',
  './components/tabs/causelist/tab-causelist.css',
  './components/tabs/causelist/tab-causelist.js',
  './components/tabs/courts/tab-courts.html',
  './components/tabs/courts/tab-courts.css',
  './components/tabs/courts/tab-courts.js',
  './components/tabs/delete/tab-delete.html',
  './components/tabs/delete/tab-delete.css',
  './components/tabs/delete/tab-delete.js',
  './components/tabs/detail/tab-detail.html',
  './components/tabs/detail/tab-detail.css',
  './components/tabs/detail/tab-detail.js',
  './components/tabs/disposed/tab-disposed.html',
  './components/tabs/disposed/tab-disposed.css',
  './components/tabs/disposed/tab-disposed.js',
  './components/tabs/hearing/tab-hearing.html',
  './components/tabs/hearing/tab-hearing.css',
  './components/tabs/hearing/tab-hearing.js',
  './components/tabs/helpers/tab-helpers.html',
  './components/tabs/helpers/tab-helpers.css',
  './components/tabs/helpers/tab-helpers.js',
  './components/tabs/home/tab-home.html',
  './components/tabs/home/tab-home.css',
  './components/tabs/home/tab-home.js',
  './components/tabs/livecrud/tab-livecrud.html',
  './components/tabs/livecrud/tab-livecrud.css',
  './components/tabs/livecrud/tab-livecrud.js',
  './components/tabs/manage/tab-manage.html',
  './components/tabs/manage/tab-manage.css',
  './components/tabs/manage/tab-manage.js',
  './components/tabs/newhome/tab-newhome.html',
  './components/tabs/newhome/tab-newhome.css',
  './components/tabs/newhome/tab-newhome.js',
  './components/tabs/paisa/tab-paisa.html',
  './components/tabs/paisa/tab-paisa.css',
  './components/tabs/paisa/tab-paisa.js',
  './components/tabs/settings/tab-settings.html',
  './components/tabs/settings/tab-settings.css',
  './components/tabs/settings/tab-settings.js',
  './components/tabs/todo/tab-todo.html',
  './components/tabs/todo/tab-todo.css',
  './components/tabs/todo/tab-todo.js',
  './components/tabs/transfer/tab-transfer.html',
  './components/tabs/transfer/tab-transfer.css',
  './components/tabs/transfer/tab-transfer.js',
  './components/tabs/undated/tab-undated.html',
  './components/tabs/undated/tab-undated.css',
  './components/tabs/undated/tab-undated.js',
  './components/tabs/upcoming/tab-upcoming.html',
  './components/tabs/upcoming/tab-upcoming.css',
  './components/tabs/upcoming/tab-upcoming.js',
  './components/tabs/update/tab-update.html',
  './components/tabs/update/tab-update.css',
  './components/tabs/update/tab-update.js'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Pre-cache error (non-fatal):', url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network First with Cache Fallback for assets
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and http/https scheme
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  // Supabase or external APIs: bypass cache and go straight to network
  const url = new URL(event.request.url);
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses for local resources
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if offline (ignore ?v= query params so precached assets match)
        return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Default fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

