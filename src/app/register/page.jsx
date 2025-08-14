'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', form);
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 space-y-4 bg-white text-black rounded-lg">
      <h2 className="text-xl font-bold">Register</h2>
      <input type="text" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}
