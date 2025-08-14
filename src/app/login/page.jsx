'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res.error) router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 space-y-4 bg-white text-black rounded-lg">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Sign In</button>
    </form>
  );
}
