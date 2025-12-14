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
import { auth } from './firebase';

let recaptchaVerifier: RecaptchaVerifier | null = null;

// Initialize reCAPTCHA
export const initializeRecaptcha = (containerId: string = 'recaptcha-container') => {
    if (!recaptchaVerifier && auth) {
        recaptchaVerifier = new RecaptchaVerifier(auth as Auth, containerId, {
            size: 'invisible',
            callback: () => {
                console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
                console.log('reCAPTCHA expired');
                recaptchaVerifier = null;
            }
        });
    }
    return recaptchaVerifier;
};

// Send OTP to phone number
export const sendOTP = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
    try {
        if (!auth) {
            throw new Error('Firebase Auth not initialized');
        }

        // Ensure phone number is in E.164 format (+91XXXXXXXXXX for India)
        const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

        // Initialize reCAPTCHA if not already done
        const appVerifier = initializeRecaptcha();

        if (!appVerifier) {
            throw new Error('reCAPTCHA initialization failed');
        }

        // Send OTP
        const confirmationResult = await signInWithPhoneNumber(auth as Auth, formattedPhone, appVerifier);

        console.log('OTP sent successfully');
        return confirmationResult;
    } catch (error: any) {
        console.error('Error sending OTP:', error);

        // Reset reCAPTCHA on error
        recaptchaVerifier = null;

        throw error;
    }
};

// Verify OTP code
export const verifyOTP = async (
    confirmationResult: ConfirmationResult,
    code: string
): Promise<any> => {
    try {
        const result = await confirmationResult.confirm(code);
        console.log('OTP verified successfully');
        return result.user;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};

// Sign in with phone credential (alternative method)
export const signInWithPhoneCredential = async (verificationId: string, code: string) => {
    try {
        if (!auth) {
            throw new Error('Firebase Auth not initialized');
        }

        const credential = PhoneAuthProvider.credential(verificationId, code);
        const result = await signInWithCredential(auth as Auth, credential);

        console.log('Signed in with phone credential');
        return result.user;
    } catch (error) {
        console.error('Error signing in with phone credential:', error);
        throw error;
    }
};

// Reset reCAPTCHA
export const resetRecaptcha = () => {
    recaptchaVerifier = null;
};
