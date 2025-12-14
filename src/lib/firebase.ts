// Firebase Configuration
// DO NOT commit this file to version control
// Add to .gitignore

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
import { Messaging, getMessaging, isSupported as isMessagingSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCW-NltjIRclutJsxvA2DqyR5yYGIiMh8E",
    authDomain: "topcup-f4a8e.firebaseapp.com",
    projectId: "topcup-f4a8e",
    storageBucket: "topcup-f4a8e.firebasestorage.app",
    messagingSenderId: "515596942266",
    appId: "1:515596942266:web:7f27ad02814b3760743b83",
    measurementId: "G-8HKK1S0ZE4"
};

// Initialize Firebase (only once)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services with proper typing
let analytics: Analytics | undefined = undefined;
let auth: Auth | undefined = undefined;
let messaging: Messaging | undefined = undefined;

// Analytics (only in browser)
if (typeof window !== 'undefined') {
    isSupported().then(yes => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    }).catch(err => {
        console.error('Analytics not supported:', err);
    });
}

// Auth
if (typeof window !== 'undefined') {
    auth = getAuth(app);
}

// Messaging (only in browser and if supported)
if (typeof window !== 'undefined') {
    isMessagingSupported().then(yes => {
        if (yes) {
            messaging = getMessaging(app);
        }
    }).catch(err => {
        console.error('Messaging not supported:', err);
    });
}

export { app, analytics, auth, messaging };
