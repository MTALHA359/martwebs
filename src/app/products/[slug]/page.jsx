import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import ProductDetailClient from '@/components/ProductDetailClient';

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug });
  return {
    title: product ? product.name : 'Product Not Found',
    description: product?.description || 'Luxury product in MartVerse',
  };
}

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}, 'slug');
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return <p className="p-6 text-red-500">Product not found.</p>;
  }

  return <ProductDetailClient product={JSON.parse(JSON.stringify(product))} />;
}
