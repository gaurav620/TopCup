export interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
    averageRating: number;
    totalReviews: number;
    isBestseller?: boolean;
    isFeatured?: boolean;
    weight?: string;
    shortDescription?: string;
}
