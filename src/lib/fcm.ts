// Firebase Cloud Messaging Service
// Push notification utilities

import { getToken, onMessage, Messaging } from 'firebase/messaging';
import { messaging } from './firebase';

// Request notification permission and get FCM token
export const requestNotificationPermission = async (): Promise<string | null> => {
    try {
        if (!messaging) {
            console.warn('Firebase Messaging is not supported in this environment');
            return null;
        }

        // Request permission
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            console.log('Notification permission granted');

            // Get FCM token
            const token = await getToken(messaging as Messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            });

            console.log('FCM Token:', token);

            // Store token in localStorage for backend sync
            localStorage.setItem('fcm_token', token);

            return token;
        } else {
            console.log('Notification permission denied');
            return null;
        }
    } catch (error) {
        console.error('Error getting notification permission:', error);
        return null;
    }
};

// Listen for foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        if (!messaging) {
            return;
        }

        onMessage(messaging as Messaging, (payload) => {
            console.log('Message received in foreground:', payload);
            resolve(payload);
        });
    });

// Show notification
export const showNotification = (title: string, body: string, icon?: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: icon || '/logo.png',
            badge: '/logo.png',
        });
    }
};

// Send token to backend
export const syncTokenWithBackend = async (token: string, userId: string) => {
    try {
        await fetch('/api/user/fcm-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, userId })
        });
    } catch (error) {
        console.error('Error syncing FCM token:', error);
    }
};
