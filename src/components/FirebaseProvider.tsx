'use client';

import { useEffect } from 'react';
import { requestNotificationPermission, onMessageListener, showNotification } from '@/lib/fcm';
import { trackPageView } from '@/lib/analytics';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    icon?: string;
  };
}

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Request notification permission (but don't force it on first visit)
    const hasAskedPermission = localStorage.getItem('notification_permission_asked');

    if (!hasAskedPermission && Notification.permission === 'default') {
      // Show a gentle prompt first
      setTimeout(() => {
        if (confirm('Would you like to receive notifications about your orders and special offers?')) {
          requestNotificationPermission().then((token: string | null) => {
            if (token) {
              // TODO: Send token to backend when user logs in
              console.log('FCM token obtained:', token);
            }
          });
        }
        localStorage.setItem('notification_permission_asked', 'true');
      }, 5000); // Wait 5 seconds before asking
    }

    // Listen for foreground messages
    onMessageListener()
      .then((payload: unknown) => {
        const message = payload as NotificationPayload;
        console.log('Received foreground message:', message);

        const { notification } = message;
        if (notification) {
          // Show toast notification
          toast.custom((t) => (
            <div
              className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={notification.icon || '/logo.png'}
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {notification.body}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          ), {
            duration: 5000,
            position: 'top-right',
          });

          // Also show browser notification if permission granted
          showNotification(
            notification.title || 'TopCup Notification',
            notification.body || '',
            notification.icon
          );
        }
      })
      .catch((err: unknown) => {
        console.error('Error in onMessageListener:', err);
      });
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, document.title);
    }
  }, [pathname]);

  return <>{children}</>;
}
