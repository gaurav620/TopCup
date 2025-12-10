import { NextAuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Check if we're in demo mode (no database)
const DEMO_MODE = !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost');

// Demo users for testing (only used when database is not available)
const DEMO_USERS = [
    {
        id: 'demo-user-1',
        email: 'demo@topcup.in',
        password: '$2a$12$xHBTO2FkiJQ6lj8atT.jgOFts1P9k.M/FrB6TO5xUiVzmfLbOGjra', // "demo1234"
        name: 'Demo User',
        role: 'user',
    },
    {
        id: 'demo-admin-1',
        email: 'admin@topcup.in',
        password: '$2a$12$xHBTO2FkiJQ6lj8atT.jgOFts1P9k.M/FrB6TO5xUiVzmfLbOGjra', // "demo1234"
        name: 'Admin User',
        role: 'admin',
    },
];

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                phone: { label: 'Phone', type: 'tel' },
                otp: { label: 'OTP', type: 'text' },
                loginType: { label: 'Login Type', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                console.log('🔍 AUTH: authorize called', {
                    credentials,
                    DEMO_MODE,
                    MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
                    MONGODB_URI: process.env.MONGODB_URI?.slice(0, 20) + '...'
                });

                // Demo Mode - use hardcoded users
                if (DEMO_MODE) {
                    console.log('🔍 AUTH: In DEMO MODE');
                    const demoUser = DEMO_USERS.find(
                        u => u.email.toLowerCase() === credentials.email?.toLowerCase()
                    );

                    console.log('🔍 AUTH: Demo user found?', !!demoUser, demoUser?.email);

                    if (!demoUser) {
                        throw new Error('Invalid email or password. Try: demo@topcup.in / demo1234');
                    }

                    // Simple plaintext check for demo mode
                    const inputPassword = credentials.password?.trim();
                    console.log('🔍 AUTH: Password check', {
                        inputPassword,
                        expected: 'demo1234',
                        match: inputPassword === 'demo1234'
                    });

                    if (inputPassword !== 'demo1234') {
                        throw new Error('Invalid email or password. Try: demo@topcup.in / demo1234');
                    }

                    return {
                        id: demoUser.id,
                        email: demoUser.email,
                        name: demoUser.name,
                        role: demoUser.role,
                    };
                }

                // Production Mode - use database
                const dbConnect = (await import('@/lib/mongodb')).default;
                const User = (await import('@/models/User')).default;

                await dbConnect();

                // Email/Password Login
                if (credentials.loginType === 'email' || (!credentials.loginType && credentials.email)) {
                    const user = await User.findOne({ email: credentials.email.toLowerCase() });

                    if (!user || !user.password) {
                        throw new Error('Invalid email or password');
                    }

                    const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordMatch) {
                        throw new Error('Invalid email or password');
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                }

                // Phone/OTP Login
                if (credentials.loginType === 'phone' && credentials.phone) {
                    const user = await User.findOne({ phone: credentials.phone });

                    if (!user) {
                        throw new Error('No account found with this phone number');
                    }

                    if (credentials.otp?.length !== 6) {
                        throw new Error('Invalid OTP');
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

