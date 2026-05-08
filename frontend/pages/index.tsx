import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">🍗 AJ Chicken</h1>
        <p className="text-xl text-gray-200 mb-8">QR Menu System</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/menu">
            <button className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              View Menu
            </button>
          </Link>
          <Link href="/admin">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
