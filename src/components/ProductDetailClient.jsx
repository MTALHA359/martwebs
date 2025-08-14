// 'use client';
// import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';

// export default function ProductDetailClient({ product }) {
//   const { addToCart } = useCart();
//   const router = useRouter(); // <-- add this

//   const handleAddToCart = () => {
//     addToCart(product);      // Add to cart
//     router.push('/cart');    // Redirect to /cart
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto text-white min-h-screen">
//       <div className="grid md:grid-cols-2 gap-10 items-center">
//         {/* Product Image */}
//         <div className="rounded-xl overflow-hidden border border-gray-800 shadow-xl">
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="space-y-4">
//           <h1 className="text-4xl font-bold text-white">{product.name}</h1>
//           <p className="text-gray-400 text-lg">{product.brand}</p>
//           <p className="text-2xl font-semibold text-yellow-400">
//             ${product.salePrice || product.price}
//           </p>

//           <p className={`text-sm font-medium ${product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
//             {product.countInStock > 0 ? '✅ In stock' : '❌ Out of stock'}
//           </p>

//           <p className="text-gray-300 leading-relaxed">{product.description}</p>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:scale-105 transition"
//             >
//               🛒 Add to Cart
//             </button>

//             <button className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 hover:text-black transition">
//               ❤️ Wishlist
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Added to Wishlist!");
      } else {
        toast.error(data.message || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white min-h-screen">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-400 text-lg">{product.brand}</p>
          <p className="text-2xl font-semibold text-yellow-400">
            ${product.salePrice || product.price}
          </p>

          <p className={`text-sm font-medium ${product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.countInStock > 0 ? '✅ In stock' : '❌ Out of stock'}
          </p>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:scale-105 transition"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="border border-yellow-400 text-yellow-400 px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 hover:text-black transition"
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
