'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('/api/products').then(res => setProducts(res.data));
  }, []);

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">🛍️ Explore Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded w-full md:w-1/3"
        />
        <select onChange={(e) => setSort(e.target.value)} className="p-2 rounded">
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
        <select onChange={(e) => setCategory(e.target.value)} className="p-2 rounded">
          <option value="">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div key={product._id} className="bg-[#1f1f1f] p-4 rounded text-white hover:scale-105 transition-all duration-300 shadow-glow group">
            <div className="overflow-hidden rounded mb-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.category}</p>
            <p className="text-xl mt-2">${product.salePrice || product.price}</p>
            <a href={`/products/${product.slug}`} className="inline-block mt-3 text-gold underline">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
}


