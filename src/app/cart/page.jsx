// app/cart/page.jsx
import StripeCheckoutButton from '@/components/StripeCheckoutButton';

export default function CartPage() {
  const cartItems = [
    {
      name: 'Luxury Watch',
      image: 'https://example.com/watch.jpg',
      price: 25000,
      quantity: 1,
    },
  ];

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
      {/* Show cart items here */}
      <StripeCheckoutButton cartItems={cartItems} />
    </div>
  );
}
