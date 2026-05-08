import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <nav className="bg-secondary text-white w-64 h-screen p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      
      <ul className="space-y-4 mb-8">
        <li>
          <Link href="/admin/dashboard" className={`block p-3 rounded ${
            router.pathname === '/admin/dashboard' ? 'bg-primary' : 'hover:bg-primary'
          }`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/menu" className={`block p-3 rounded ${
            router.pathname === '/admin/menu' ? 'bg-primary' : 'hover:bg-primary'
          }`}>
            Manage Menu
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className={`block p-3 rounded ${
            router.pathname === '/admin/orders' ? 'bg-primary' : 'hover:bg-primary'
          }`}>
            Orders
          </Link>
        </li>
        <li>
          <Link href="/admin/qr" className={`block p-3 rounded ${
            router.pathname === '/admin/qr' ? 'bg-primary' : 'hover:bg-primary'
          }`}>
            QR Codes
          </Link>
        </li>
      </ul>
      
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition"
      >
        Logout
      </button>
    </nav>
  );
}
