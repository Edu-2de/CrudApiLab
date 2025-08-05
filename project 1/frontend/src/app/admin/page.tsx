'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('auth-token'); // ← TOKEN, não 'user'
        
        if (!token) {
          router.push('/Login');
          return;
        }

        const res = await fetch('http://localhost:5000/admin', {
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
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1>Admin Panel</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}