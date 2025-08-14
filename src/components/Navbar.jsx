'use client'; // ← ADD THIS LINE AT THE VERY TOP

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full fixed top-0 z-50 bg-[#0a0a0a] border-b border-[#1f1f1f] shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gold">MartVerse</Link>

        <ul className="flex gap-6 items-center text-white">
          <li><Link href="/products">Shop</Link></li>
          <li><Link href="/wishlist">Wishlist</Link></li>
          <li><Link href="/cart">Cart</Link></li>

          {session?.user ? (
            <>
              <li><Link href="/dashboard/user">Dashboard</Link></li>
              <li>
                <button onClick={() => signOut()} className="text-sm px-2 py-1 bg-red-600 rounded">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
