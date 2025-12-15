// Firebase Cloud Messaging Service - Admin Panel Stub
// Push notification utilities (not used in Admin Panel)

// Request notification permission and get FCM token
export const requestNotificationPermission = async (): Promise<string | null> => {
    console.warn('FCM not configured in Admin Panel');
    return null;
};

// Listen for foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        console.warn('FCM not configured in Admin Panel');
    });

// Show notification
export const showNotification = (title: string, body: string, icon?: string) => {
    console.warn('FCM not configured in Admin Panel');
};

// Send token to backend
export const syncTokenWithBackend = async (token: string, userId: string) => {
    console.warn('FCM not configured in Admin Panel');
};
