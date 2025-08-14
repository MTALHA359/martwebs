'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    slug: '',
    brand: '',
    category: '',
    price: '',
    salePrice: '',
    countInStock: '',
    description: '',
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setForm({ ...form, images: [...form.images, data.url] });
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/products', form);
    router.push('/dashboard/admin/products');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="w-full p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Sale Price"
          value={form.salePrice}
          onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
          className="w-full p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.countInStock}
          onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
          className="w-full p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 rounded"
        />

        <div className="border p-3 rounded bg-[#1f1f1f] text-white">
          <label>Upload Product Images:</label>
          <input type="file" onChange={handleImageUpload} className="text-white" />
          {uploading && <p className="text-sm text-yellow-300">Uploading...</p>}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {form.images.map((url, idx) => (
              <img key={idx} src={url} className="h-24 w-full object-cover rounded" />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-gold text-black px-6 py-2 rounded hover:scale-105 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
