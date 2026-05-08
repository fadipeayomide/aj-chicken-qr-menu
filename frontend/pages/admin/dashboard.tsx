import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminNav from '@/components/AdminNav';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0 });
  const [token, setToken] = useState('');

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
      return;
    }
    setToken(adminToken);
    fetchStats(adminToken);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      localStorage.removeItem('adminToken');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <AdminNav />
      <div className="flex-1 p-8 bg-light">
        <h1 className="text-3xl font-bold text-primary mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-primary mt-2">{stats.orders}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold text-accent mt-2">₦{stats.revenue}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Customers</h3>
            <p className="text-3xl font-bold text-secondary mt-2">{stats.customers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
