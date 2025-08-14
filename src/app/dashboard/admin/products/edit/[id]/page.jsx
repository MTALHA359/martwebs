'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then(res => setForm(res.data));
  }, [id]);

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
    await axios.put(`/api/products/${id}`, form);
    router.push('/dashboard/admin/products');
  };

  if (!form) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 rounded" />
        <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full p-2 rounded" />
        <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full p-2 rounded" />
        <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full p-2 rounded" />
        <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full p-2 rounded" />
        <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} className="w-full p-2 rounded" />
        <input type="number" value={form.countInStock} onChange={(e) => setForm({ ...form, countInStock: e.target.value })} className="w-full p-2 rounded" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 rounded" />

        <div className="border p-3 rounded bg-[#1f1f1f] text-white">
          <input type="file" onChange={handleImageUpload} className="text-white" />
          {uploading && <p className="text-sm text-yellow-300">Uploading...</p>}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {form.images.map((url, idx) => (
              <img key={idx} src={url} className="h-24 w-full object-cover rounded" />
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:scale-105 transition">
          Update Product
        </button>
      </form>
    </div>
  );
}
