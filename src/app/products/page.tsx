import { getAllProducts } from '@/lib/db/actions';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
    // Fetch products on the server - this is much faster as it happens before the page is sent to client
    // and eliminates the waterfall effect.
    const products = await getAllProducts();

    return <ProductsClient initialProducts={products} />;
}
