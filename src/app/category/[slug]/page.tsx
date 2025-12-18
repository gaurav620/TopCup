import { getProductsByCategory } from '@/lib/db/actions';
import CategoryClient from './CategoryClient';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const products = await getProductsByCategory(params.slug);

    return <CategoryClient initialProducts={products} category={params.slug} />;
}
