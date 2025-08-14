'use client';
import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
