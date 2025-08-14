"use client";

import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const res = await fetch("/api/wishlist");
    const data = await res.json();
    setWishlist(data.wishlist?.products || []);
  };

  const removeFromWishlist = async (productId) => {
    await fetch("/api/wishlist/remove", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
    fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.productId._id} className="border p-4 rounded">
              <img src={item.productId.image} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-medium">{item.productId.name}</h2>
              <p className="text-gray-600">${item.productId.price}</p>
              <button
                onClick={() => removeFromWishlist(item.productId._id)}
                className="text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
