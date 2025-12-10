import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOTP extends Document {
    _id: mongoose.Types.ObjectId;
    identifier: string;
    type: 'phone' | 'email';
    otp: string;
    expiresAt: Date;
    isVerified: boolean;
    attempts: number;
    createdAt: Date;
}

const OTPSchema = new Schema<IOTP>(
    {
        identifier: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['phone', 'email'],
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        attempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
OTPSchema.index({ identifier: 1 });
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
