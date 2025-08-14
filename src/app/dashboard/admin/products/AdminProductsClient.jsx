'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminProductsClient() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const handleDelete = async (productId) => {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📦 Admin – Products</h1>
      <Link href="/dashboard/admin/products/new" className="bg-yellow-400 text-black px-4 py-2 rounded inline-block">
        ➕ Add Product
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product._id} className="bg-[#1f1f1f] p-4 rounded">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>${product.price}</p>
            <div className="flex gap-4 mt-2">
              <Link href={`/dashboard/admin/products/edit/${product._id}`} className="text-blue-400">
                Edit
              </Link>
              <button onClick={() => handleDelete(product._id)} className="text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
