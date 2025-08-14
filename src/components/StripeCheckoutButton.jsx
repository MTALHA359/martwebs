// components/StripeCheckoutButton.jsx
'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeCheckoutButton({ cartItems }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();

    if (data.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert('Error creating Stripe session');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
    >
      Pay with Stripe 💳
    </button>
  );
}
