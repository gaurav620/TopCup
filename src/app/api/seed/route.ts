import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Product from '@/models/Product';

const initialProducts = [
    // CAKES
    { name: 'Chocolate Truffle Cake', slug: 'chocolate-truffle-cake', price: 899, discountPrice: 749, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 156, isBestseller: true, weight: '1 kg', description: 'Rich chocolate truffle cake made with premium cocoa.', inStock: true },
    { name: 'Red Velvet Delight', slug: 'red-velvet-delight', price: 999, discountPrice: 849, images: ['https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 98, weight: '1 kg', description: 'Classic red velvet cake with cream cheese frosting.', inStock: true },
    { name: 'Black Forest Cake', slug: 'black-forest-cake', price: 799, images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 89, weight: '1 kg', description: 'Traditional Black Forest cake with cherries and cream.', inStock: true },
    { name: 'Vanilla Strawberry Cake', slug: 'vanilla-strawberry-cake', price: 849, images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 76, weight: '1 kg', description: 'Light vanilla cake with fresh strawberries.', inStock: true },
    { name: 'Pineapple Fresh Cake', slug: 'pineapple-fresh-cake', price: 749, images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500'], category: 'cakes', averageRating: 4.5, totalReviews: 67, weight: '1 kg', description: 'Fresh pineapple cake with whipped cream.', inStock: true },
    { name: 'Butterscotch Crunch Cake', slug: 'butterscotch-crunch-cake', price: 799, discountPrice: 699, images: ['https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500'], category: 'cakes', averageRating: 4.6, totalReviews: 82, weight: '1 kg', description: 'Butterscotch cake with crunchy caramel bits.', inStock: true },
    { name: 'Mango Delight Cake', slug: 'mango-delight-cake', price: 899, images: ['https://images.unsplash.com/photo-1519869325930-281384150729?w=500'], category: 'cakes', averageRating: 4.7, totalReviews: 54, weight: '1 kg', description: 'Tropical mango cake made with fresh mango pulp.', inStock: true },
    { name: 'Coffee Mocha Cake', slug: 'coffee-mocha-cake', price: 949, discountPrice: 849, images: ['https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500'], category: 'cakes', averageRating: 4.8, totalReviews: 123, isBestseller: true, weight: '1 kg', description: 'Mocha cake infused with aromatic coffee.', inStock: true },

    // GIFTS
    { name: 'Premium Gift Hamper', slug: 'premium-gift-hamper', price: 1999, discountPrice: 1499, images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 67, isFeatured: true, description: 'A premium assortment of gourmet treats.', inStock: true },
    { name: 'Luxury Chocolate Gift Set', slug: 'luxury-chocolate-gift-set', price: 1299, discountPrice: 999, images: ['https://images.unsplash.com/photo-1511381939415-e44015466834?w=500'], category: 'gifts', averageRating: 4.8, totalReviews: 112, isBestseller: true, description: 'Exquisite luxury chocolates in a gift box.', inStock: true },
    { name: 'Anniversary Gift Basket', slug: 'anniversary-gift-basket', price: 2999, discountPrice: 2499, images: ['https://images.unsplash.com/photo-1549490349-8643362247b5?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 54, isFeatured: true, description: 'Perfect basket for anniversary celebrations.', inStock: true },
    { name: 'Birthday Surprise Box', slug: 'birthday-surprise-box', price: 1599, discountPrice: 1299, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'], category: 'gifts', averageRating: 4.7, totalReviews: 89, description: 'A box full of birthday surprises.', inStock: true },
    { name: 'Thank You Gift Pack', slug: 'thank-you-gift-pack', price: 999, discountPrice: 799, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'gifts', averageRating: 4.6, totalReviews: 45, description: 'Say thank you with this thoughtful gift pack.', inStock: true },
    { name: 'Diwali Special Hamper', slug: 'diwali-special-hamper', price: 2499, discountPrice: 1999, images: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500'], category: 'gifts', averageRating: 4.9, totalReviews: 156, isBestseller: true, description: 'Festive hamper for Diwali celebrations.', inStock: true },

    // SNACKS
    { name: 'Assorted Cookies Box', slug: 'assorted-cookies-box', price: 499, discountPrice: 399, images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 234, isBestseller: true, weight: '500g', description: 'Box of assorted gourmet cookies.', inStock: true },
    { name: 'Gourmet Brownie Box', slug: 'gourmet-brownie-box', price: 599, discountPrice: 449, images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 178, weight: '400g', description: 'Rich and fudgy gourmet brownies.', inStock: true },
    { name: 'Dry Fruits Premium Box', slug: 'dry-fruits-premium-box', price: 899, discountPrice: 799, images: ['https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 132, weight: '500g', description: 'Premium selection of dry fruits.', inStock: true },
    { name: 'Chocolate Chip Cookies', slug: 'chocolate-chip-cookies', price: 349, discountPrice: 299, images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'], category: 'snacks', averageRating: 4.5, totalReviews: 198, weight: '300g', description: 'Classic chocolate chip cookies.', inStock: true },
    { name: 'Almond Biscotti Pack', slug: 'almond-biscotti-pack', price: 449, images: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=500'], category: 'snacks', averageRating: 4.6, totalReviews: 87, weight: '250g', description: 'Crunchy almond biscotti.', inStock: true },
    { name: 'Mixed Nuts Jar', slug: 'mixed-nuts-jar', price: 699, discountPrice: 599, images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500'], category: 'snacks', averageRating: 4.8, totalReviews: 165, weight: '500g', description: 'Healthy jar of mixed nuts.', inStock: true },
    { name: 'Chocolate Truffle Box', slug: 'chocolate-truffle-box', price: 549, discountPrice: 449, images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500'], category: 'snacks', averageRating: 4.7, totalReviews: 213, isBestseller: true, weight: '250g', description: 'Box of decadent chocolate truffles.', inStock: true },

    // COMBOS
    { name: 'Birthday Celebration Box', slug: 'birthday-celebration-box', price: 2499, discountPrice: 1999, images: ['https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 45, isFeatured: true, description: 'Everything needed for a birthday celebration.', inStock: true },
    { name: 'Party Pack Combo', slug: 'party-pack-combo', price: 3499, discountPrice: 2999, images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500'], category: 'combos', averageRating: 4.8, totalReviews: 67, description: 'Ultimate party pack combo.', inStock: true },
    { name: 'Family Treat Combo', slug: 'family-treat-combo', price: 1999, discountPrice: 1699, images: ['https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500'], category: 'combos', averageRating: 4.7, totalReviews: 89, description: 'Treats for the whole family.', inStock: true },
    { name: 'Romantic Date Night', slug: 'romantic-date-night', price: 2299, discountPrice: 1899, images: ['https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500'], category: 'combos', averageRating: 4.9, totalReviews: 112, isBestseller: true, description: 'Combo for a romantic date night.', inStock: true },
];

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const force = searchParams.get('force') === 'true';

        const count = await Product.countDocuments();

        if (count > 0 && !force) {
            return NextResponse.json({ message: 'Database already seeded', count });
        }

        if (force) {
            await Product.deleteMany({});
        }

        await Product.insertMany(initialProducts);
        return NextResponse.json({ message: 'Database seeded successfully', count: initialProducts.length });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
