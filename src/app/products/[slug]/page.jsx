import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import ProductDetailClient from '@/components/ProductDetailClient';

export const dynamic = 'force-dynamic'; // disable static generation

export async function generateMetadata({ params }) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug });
    return {
      title: product ? product.name : 'Product Not Found',
      description: product?.description || 'Luxury product in MartVerse',
    };
  } catch (err) {
    console.error('Metadata fetch error:', err);
    return {
      title: 'Product Not Found',
      description: 'Error loading product',
    };
  }
}

export default async function ProductDetailPage({ params }) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug }).lean();

    if (!product) {
      return <p className="p-6 text-red-500">Product not found.</p>;
    }

    return <ProductDetailClient product={JSON.parse(JSON.stringify(product))} />;
  } catch (err) {
    console.error('Page fetch error:', err);
    return <p className="p-6 text-red-500">Error loading product.</p>;
  }
}
