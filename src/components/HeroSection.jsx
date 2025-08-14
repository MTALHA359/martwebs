'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-[#0a0a0a] text-white px-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold mb-4 text-gold"
      >
        Elevate Your Shopping Experience
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl max-w-2xl"
      >
        Discover luxury fashion, jewelry, and lifestyle products – reimagined with elegance.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8"
      >
        <Link
          href="/products"
          className="px-6 py-3 text-lg font-semibold bg-gold text-black rounded shadow-glow hover:scale-105 transition-all duration-300"
        >
          Explore Now
        </Link>
      </motion.div>
    </section>
  );
}
