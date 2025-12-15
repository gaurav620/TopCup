// Firebase Phone Authentication with OTP
// For phone number verification and login

import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult,
    PhoneAuthProvider,
    signInWithCredential,
    Auth
} from 'firebase/auth';

// Stub auth object for Admin Panel (Firebase not configured)
const auth: Auth | undefined = undefined;

let recaptchaVerifier: RecaptchaVerifier | null = null;

// Initialize reCAPTCHA
export const initializeRecaptcha = (containerId: string = 'recaptcha-container') => {
    console.warn('Firebase Phone Auth not configured in Admin Panel');
    return null;
};

// Send OTP to phone number
export const sendOTP = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
    throw new Error('Firebase Phone Auth not configured in Admin Panel');
};

// Verify OTP code
export const verifyOTP = async (
    confirmationResult: ConfirmationResult,
    code: string
): Promise<any> => {
    throw new Error('Firebase Phone Auth not configured in Admin Panel');
};

// Sign in with phone credential (alternative method)
export const signInWithPhoneCredential = async (verificationId: string, code: string) => {
    throw new Error('Firebase Phone Auth not configured in Admin Panel');
};

// Reset reCAPTCHA
export const resetRecaptcha = () => {
    recaptchaVerifier = null;
};
