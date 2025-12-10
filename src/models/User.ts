import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
}

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone?: string;
    password?: string;
    image?: string;
    role: 'user' | 'admin';
    addresses: IAddress[];
    wishlist: mongoose.Types.ObjectId[];
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[6-9]\d{9}$/, 'Please provide a valid Indian phone number'],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        addresses: [AddressSchema],
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries (email index already created by unique: true)
UserSchema.index({ phone: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
