'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        
        if (!token) {
          router.push('/Login');
          return;
        }

        const res = await fetch('http://localhost:3001/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('auth-token');
            router.push('/Login');
            return;
          }
          throw new Error('Failed to fetch admin data');
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        setError('Error loading admin panel');
        router.push('/Login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiShoppingBag className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">567</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$12,345</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data from API */}
      {data && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Response</h2>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}