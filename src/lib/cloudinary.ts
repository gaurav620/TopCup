// Cloudinary Image Upload Service
// For uploading and managing product images

export interface CloudinaryUploadResponse {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = 'topcup-products'; // Create this in Cloudinary dashboard

/**
 * Upload image to Cloudinary
 * @param file - File object or base64 string
 * @param folder - Folder name in Cloudinary (e.g., 'products', 'categories')
 */
export async function uploadToCloudinary(
    file: File | string,
    folder: string = 'products'
): Promise<CloudinaryUploadResponse> {
    try {
        const formData = new FormData();

        if (typeof file === 'string') {
            formData.append('file', file);
        } else {
            formData.append('file', file);
        }

        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', `topcup/${folder}`);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

/**
 * Get optimized image URL from Cloudinary
 * @param publicId - Cloudinary public ID
 * @param width - Desired width
 * @param height - Desired height
 */
export function getCloudinaryUrl(
    publicId: string,
    width?: number,
    height?: number
): string {
    if (!CLOUDINARY_CLOUD_NAME) {
        return publicId; // Fallback to original URL
    }

    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push('c_fill', 'q_auto', 'f_auto');

    const transform = transformations.join(',');

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transform}/${publicId}`;
}

/**
 * Delete image from Cloudinary
 * Requires backend API call with API secret
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
    try {
        const response = await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
        });

        if (!response.ok) {
            throw new Error('Image deletion failed');
        }
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
}
