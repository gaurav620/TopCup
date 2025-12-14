// Firebase Cloud Messaging Service Worker
// Handles background push notifications

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in service worker
firebase.initializeApp({
    apiKey: "AIzaSyCW-NltjIRclutJsxvA2DqyR5yYGIiMh8E",
    authDomain: "topcup-f4a8e.firebaseapp.com",
    projectId: "topcup-f4a8e",
    storageBucket: "topcup-f4a8e.firebasestorage.app",
    messagingSenderId: "515596942266",
    appId: "1:515596942266:web:7f27ad02814b3760743b83",
    measurementId: "G-8HKK1S0ZE4"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'TopCup Notification';
    const notificationOptions = {
        body: payload.notification?.body || 'You have a new notification',
        icon: payload.notification?.icon || '/logo.png',
        badge: '/logo.png',
        data: payload.data,
        actions: [
            { action: 'open', title: 'View' },
            { action: 'close', title: 'Dismiss' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification click:', event);

    event.notification.close();

    if (event.action === 'open' || !event.action) {
        // Open the app or specific page
        const urlToOpen = event.notification.data?.url || '/';

        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    // Check if app is already open
                    for (const client of clientList) {
                        if (client.url === urlToOpen && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Open new window if app not open
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen);
                    }
                })
        );
    }
});
